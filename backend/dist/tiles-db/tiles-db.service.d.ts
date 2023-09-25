import { Model } from 'mongoose';
import { Tile } from './tile.model';
export declare class TilesDbService {
  private readonly tileModel;
  constructor(tileModel: Model<Tile>);
  getTiles(): Promise<
    {
      id: string;
      edges: {
        top: import('./tile.model').Locations;
        right: import('./tile.model').Locations;
        bottom: import('./tile.model').Locations;
        left: import('./tile.model').Locations;
      };
      middle: import('./tile.model').Locations;
      isSpecial: boolean;
    }[]
  >;
  getSingleTile(id: string): Promise<{
    id: string;
    edges: {
      top: import('./tile.model').Locations;
      right: import('./tile.model').Locations;
      bottom: import('./tile.model').Locations;
      left: import('./tile.model').Locations;
    };
    middle: import('./tile.model').Locations;
    isSpecial: boolean;
  }>;
  private findTile;
}
