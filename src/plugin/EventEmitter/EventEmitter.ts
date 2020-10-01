import { Observer } from './EventEmitterInterfaces';

class EventEmitter {
  private observers: Observer[] = [];

  attach(observer: Observer): void {
    this.observers.push(observer);
  }

  detach(observer: Observer): void {
    this.observers = this.observers.filter((item) => item !== observer);
  }

  notify<T>(data?: T, event?: string): void {
    this.observers.forEach((item) => item.update(data, event));
  }
}

export default EventEmitter;
