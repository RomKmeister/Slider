import { NewCoordinate, ExtendedOptions } from '../interfaces';

export interface EventEmitter {
  attach(observer: Observer): void;
  detach(observer: Observer): void;
  notify(data?: ExtendedOptions | NewCoordinate | Partial<ExtendedOptions>, event?: string): void;
}

export interface Observer {
  update(data: ExtendedOptions | NewCoordinate | Partial<ExtendedOptions>, event: string): void;
}
