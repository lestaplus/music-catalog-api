import { RegistrationMetric } from "../domain/RegistrationMetric.js";

export class EventTranslator {
  static toRegistrationMetric(event) {
    return new RegistrationMetric({
      metricId: `metric_${Date.now()}`,
      userEmail: event.email,
      recordedAt: event.happenedAt,
    });
  }
}
