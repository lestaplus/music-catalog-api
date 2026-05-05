export class EventBus {
  constructor() {
    this.handlers = {};
  }

  subscribe(eventName, handler) {
    if (!this.handlers[eventName]) {
      this.handlers[eventName] = [];
    }
    this.handlers[eventName].push(handler);
  }

  publish(event) {
    const eventName = event.constructor.name;
    const eventHandlers = this.handlers[eventName] || [];

    for (const handler of eventHandlers) {
      handler(event).catch((err) => {
        console.error(
          `[EventBus] Event handling error ${eventName}:`,
          err.message,
        );
      });
    }
  }
}
