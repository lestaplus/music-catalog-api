export class NotificationService {
  async sendWelcomeEmail(email, userId) {
    console.log(
      `[NotificationService] Start sending welcome email to ${email}...`,
    );

    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log(
      `[NotificationService] Successfully sent welcome email to user ${userId}!`,
    );
    return true;
  }
}
