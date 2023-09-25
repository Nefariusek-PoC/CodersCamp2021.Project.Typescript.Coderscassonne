import * as mongoose from 'mongoose';
export declare enum Locations {
    FIELD = "FIELD",
    ROAD = "ROAD",
    CITY = "CITY",
    GARDEN = "GARDEN",
    MONASTERY = "MONASTERY",
    TAVERN = "TAVERN"
}
export declare type Edges = {
    bottom: Locations;
    left: Locations;
    right: Locations;
    top: Locations;
};
export declare const TileSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any>, {}, {}>;
export interface Tile extends mongoose.Document {
    tileId: string;
    edges: {
        top: Locations;
        right: Locations;
        bottom: Locations;
        left: Locations;
    };
    middle: Locations;
    isSpecial: boolean;
}
