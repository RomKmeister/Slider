import {
  NewCoordinate, ExtendOptions, ExternalOption,
} from '../interfaces';

export interface EventEmitter {
  attach(observer: Observer): void;
  detach(observer: Observer): void;
  notify(data?: ExtendOptions | NewCoordinate | ExternalOption, event?: string): void;
}

export interface Observer {
  update(data: ExtendOptions | NewCoordinate | ExternalOption, event: string): void;
}