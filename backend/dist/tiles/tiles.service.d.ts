export declare class TilesService {
  getTiles(): {
    id: string;
    edges: {
      top: import('../constants/locations').default;
      right: import('../constants/locations').default;
      bottom: import('../constants/locations').default;
      left: import('../constants/locations').default;
    };
    middle: import('../constants/locations').default[];
    isSpecial: boolean;
  }[];
  getSingleTile(id: string): {
    id: string;
    edges: {
      top: import('../constants/locations').default;
      right: import('../constants/locations').default;
      bottom: import('../constants/locations').default;
      left: import('../constants/locations').default;
    };
    middle: import('../constants/locations').default[];
    isSpecial: boolean;
  };
}
