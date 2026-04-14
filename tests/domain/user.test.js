import { User } from "../../src/domain/models/User.js";
import { DomainError } from "../../src/domain/errors/DomainError.js";

describe("Domain: User Model", () => {
  test("Should be successfully created with valid data", () => {
    const user = new User({
      id: 1,
      email: "test@example.com",
      password: "hashedpassword123",
    });

    expect(user.email).toBe("test@example.com");
    expect(user.password).toBe("hashedpassword123");
  });

  test("Should throw an error if email is in the wrong format", () => {
    expect(() => {
      new User({ email: "wrong-format", password: "hashedpassword123" });
    }).toThrow(DomainError);
  });

  test("Should throw an error if password is missing", () => {
    expect(() => {
      new User({ email: "test@gmail.com", password: null });
    }).toThrow(DomainError);
  });
});
