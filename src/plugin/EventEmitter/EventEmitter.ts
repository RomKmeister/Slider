import { NewCoordinate, ExtendedOptions } from '../interfaces';

import { Observer } from './EventEmitterInterfaces';

class EventEmitter implements EventEmitter {
  private observers: Observer[] = [];

  attach(observer: Observer): void {
    this.observers.push(observer);
  }

  detach(observer: Observer): void {
    this.observers = this.observers.filter((item) => item !== observer);
  }

  notify(data?: ExtendedOptions | NewCoordinate | Partial<ExtendedOptions>, event?: string): void {
    this.observers.forEach((item) => item.update(data, event));
  }
}

export default EventEmitter;
