import { TilesService } from './tiles.service';
export declare class TilesController {
    private readonly tilesService;
    constructor(tilesService: TilesService);
    getAllTiles(): Promise<{
        id: string;
        edges: {
            top: import("../constants/locations").default;
            right: import("../constants/locations").default;
            bottom: import("../constants/locations").default;
            left: import("../constants/locations").default;
        };
        middle: import("../constants/locations").default[];
        isSpecial: boolean;
    }[]>;
    getTile(tileId: string): {
        id: string;
        edges: {
            top: import("../constants/locations").default;
            right: import("../constants/locations").default;
            bottom: import("../constants/locations").default;
            left: import("../constants/locations").default;
        };
        middle: import("../constants/locations").default[];
        isSpecial: boolean;
    };
}
