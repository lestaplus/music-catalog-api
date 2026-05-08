import { EventTranslator } from "../acl/EventTranslator.js";

export class OnUserRegisteredHandler {
  async handle(event) {
    console.log(
      "[Analytics Module] Received event from core-module. Launch ACL...",
    );

    const metric = EventTranslator.toRegistrationMetric(event);

    console.log(
      `[Analytics Module] Metric saved!
      Id: ${metric.metricId}
      Email: ${metric.userEmail}
      RecordedAt: ${metric.recordedAt}`,
    );
  }
}
