import { Observer, NewOption, Options } from '../interfaces';

class EventEmitter implements EventEmitter {
  private observers: Observer[] = [];

  attach(observer: Observer): void {
    this.observers.push(observer);
  }

  detach(observer: Observer): void {
    this.observers = this.observers.filter((item) => item !== observer);
  }

  notify(data?: Options | NewOption, event?: string): void {
    this.observers.forEach((item) => item.update(data, event));
  }
}

export default EventEmitter;
