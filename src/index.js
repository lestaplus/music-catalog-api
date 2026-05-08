import express from "express";
import { EventBus } from "./infrastructure/events/EventBus.js";

import { authRoutes, artistRoutes, trackRoutes } from "./modules/core/api.js";
import { OnUserRegisteredHandler } from "./modules/analytics/application/OnUserRegisteredHandler.js";
import { NotificationService } from "./modules/core/infrastructure/services/NotificationService.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const eventBus = new EventBus();
const notificationService = new NotificationService();
const analyticsHandler = new OnUserRegisteredHandler();

eventBus.subscribe("UserRegisteredEvent", async (event) => {
  await notificationService.sendWelcomeEmail(event.email, event.userId);
});

eventBus.subscribe("UserRegisteredEvent", async (event) => {
  await analyticsHandler.handle(event);
});

app.use("/api/auth", authRoutes(eventBus));
app.use("/api/artists", artistRoutes);
app.use("/api/tracks", trackRoutes);

app.get("/", (req, res) => {
  res.send("Ok");
});

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
  });
}

export default app;
