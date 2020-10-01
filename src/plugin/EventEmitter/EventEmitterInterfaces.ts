import { NewCoordinate, ExtendedOptions } from '../interfaces';

export interface Observer {
  update(data: ExtendedOptions | NewCoordinate | Partial<ExtendedOptions>, event: string): void;
}
