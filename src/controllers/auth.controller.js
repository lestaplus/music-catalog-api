import prisma from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secret-key";

export const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { email, password: hashedPassword },
    });

    res.status(201).json({ user_id: user.user_id, email: user.email });
  } catch (error) {
    if (error.code === "P2002") {
      return res
        .status(409)
        .json({ error: "The email address is already taken" });
    }
    res.status(500).json({ error: "Registration error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    const comparePassword = await bcrypt.compare(password, user.password);

    if (!user || !comparePassword) {
      return res.status(401).json({ error: "Incorrect email or password" });
    }

    const token = jwt.sign({ userId: user.user_id }, JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: "Login error" });
  }
};
