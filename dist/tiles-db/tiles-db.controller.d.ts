import { TilesDbService } from './tiles-db.service';
export declare class TilesDbController {
    private readonly tilesDbService;
    constructor(tilesDbService: TilesDbService);
    getAllTiles(): Promise<{
        id: string;
        edges: {
            top: import("./tile.model").Locations;
            right: import("./tile.model").Locations;
            bottom: import("./tile.model").Locations;
            left: import("./tile.model").Locations;
        };
        middle: import("./tile.model").Locations;
        isSpecial: boolean;
    }[]>;
    getTile(tileId: string): Promise<{
        id: string;
        edges: {
            top: import("./tile.model").Locations;
            right: import("./tile.model").Locations;
            bottom: import("./tile.model").Locations;
            left: import("./tile.model").Locations;
        };
        middle: import("./tile.model").Locations;
        isSpecial: boolean;
    }>;
}
