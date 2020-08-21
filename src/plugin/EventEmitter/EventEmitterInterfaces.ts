import {
  NewCoordinate, ExtendedOptions, ExternalOption,
} from '../interfaces';

export interface EventEmitter {
  attach(observer: Observer): void;
  detach(observer: Observer): void;
  notify(data?: ExtendedOptions | NewCoordinate | ExternalOption, event?: string): void;
}

export interface Observer {
  update(data: ExtendedOptions | NewCoordinate | ExternalOption, event: string): void;
}
