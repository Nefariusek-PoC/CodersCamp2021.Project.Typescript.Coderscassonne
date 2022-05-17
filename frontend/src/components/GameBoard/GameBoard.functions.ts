import Locations from '../../constants/locations';
import Tile from '../../model/Tile';
import { Edges } from '../../model/Tile';
import _ from 'lodash';
import rootStore, { boardState } from '../../stores/RootStore';
import Project from '../../model/Project';
import TileState from '../../constants/tileState';

export const manageProjects = (row: number, column: number) => {
  const existingLocations: Locations[] = [];
  updateExistingProjects(existingLocations, row, column);
  createNewProjects(existingLocations);
  mergeProjects();
};

// TODO: remove boardState from context and move to separate store

function mergeProjects() {
  const allProjects = rootStore.projectStore.allProjects;
  const currentTileProjects = allProjects.filter((project) => project.tiles.includes(rootStore.gameStore.tileInHand!));
  const oldRoadProjects = getProjectsOfType(Locations.ROAD, currentTileProjects);
  const oldCityProjects = getProjectsOfType(Locations.ROAD, currentTileProjects);
  const projectsToRemove = [...oldRoadProjects, ...oldCityProjects];
  const mergedRoadProject = createMergedProject(Locations.ROAD, currentTileProjects);
  const mergedCityProject = createMergedProject(Locations.CITY, currentTileProjects);

  _.remove(allProjects, () => projectsToRemove.length);
  allProjects.push(mergedCityProject, mergedRoadProject);
}

function createMergedProject(type: Locations, projects: Project[]) {
  const joinedProjectOfType = new Project(type);
  const tilesOfType = getTilesToMerge(type, projects);
  joinedProjectOfType.tiles.push(...tilesOfType);
  return joinedProjectOfType;
}

function getTilesToMerge(type: Locations, projects: Project[]) {
  const projectsOfType = getProjectsOfType(type, projects);
  const arrayOfTiles: Tile[] = [];
  projectsOfType.forEach((project: Project) => {
    arrayOfTiles.push(...project.tiles);
  });
  const tilesOfType = new Set<Tile>(arrayOfTiles);
  return tilesOfType.values();
}

function getProjectsOfType(type: Locations, projects: Project[]) {
  return projects.filter((project) => project.type === type);
}

function getAdjacentTiles(row: number, column: number): Map<keyof Edges, Tile | undefined> {
  const adjacentTiles = new Map<keyof Edges, Tile | undefined>();
  adjacentTiles.set('top', getAdjacentTopTile(row, column));
  adjacentTiles.set('right', getAdjacentRightTile(row, column));
  adjacentTiles.set('bottom', getAdjacentBottomTile(row, column));
  adjacentTiles.set('left', getAdjacentLeftTile(row, column));

  return adjacentTiles;
}

export function validateTilePlacement(row: number, column: number): boolean {
  const upperTile = boardState.find((tile) => tile.column === column && tile.row === row - 1);
  if (
    upperTile &&
    upperTile.state === TileState.TAKEN &&
    upperTile.tile?.edges.bottom !== rootStore.gameStore.tileInHand?.edges.top
  ) {
    return false;
  }

  const lowerTile = boardState.find((tile) => tile.column === column && tile.row === row + 1);
  if (
    lowerTile &&
    lowerTile.state === TileState.TAKEN &&
    lowerTile.tile?.edges.top !== rootStore.gameStore.tileInHand?.edges.bottom
  ) {
    return false;
  }

  const rightTile = boardState.find((tile) => tile.column === column + 1 && tile.row === row);
  if (
    rightTile &&
    rightTile.state === TileState.TAKEN &&
    rightTile.tile?.edges.left !== rootStore.gameStore.tileInHand?.edges.right
  ) {
    return false;
  }

  const leftTile = boardState.find((tile) => tile.column === column - 1 && tile.row === row);
  if (
    leftTile &&
    leftTile.state === TileState.TAKEN &&
    leftTile.tile?.edges.right !== rootStore.gameStore.tileInHand?.edges.left
  ) {
    return false;
  }
  return true;
}

export const activateAdjacentTiles = (row: number, column: number) => {
  const upperTile = boardState.find((tile) => tile.column === column && tile.row === row - 1);
  if (upperTile && upperTile.state === TileState.IDLE) {
    upperTile.state = TileState.ACTIVE;
  }

  const lowerTile = boardState.find((tile) => tile.column === column && tile.row === row + 1);
  if (lowerTile && lowerTile.state === TileState.IDLE) {
    lowerTile.state = TileState.ACTIVE;
  }

  const rightTile = boardState.find((tile) => tile.column === column + 1 && tile.row === row);
  if (rightTile && rightTile.state === TileState.IDLE) {
    rightTile.state = TileState.ACTIVE;
  }

  const leftTile = boardState.find((tile) => tile.column === column - 1 && tile.row === row);
  if (leftTile && leftTile.state === TileState.IDLE) {
    leftTile.state = TileState.ACTIVE;
  }
};

export const getAdjacentTopTile = (row: number, column: number): Tile | undefined => {
  return boardState.find((tile) => tile.column === column && tile.row === row - 1)?.tile;
};

export const getAdjacentBottomTile = (row: number, column: number): Tile | undefined => {
  return boardState.find((tile) => tile.column === column && tile.row === row + 1)?.tile;
};

export const getAdjacentRightTile = (row: number, column: number): Tile | undefined => {
  return boardState.find((tile) => tile.column === column + 1 && tile.row === row)?.tile;
};

export const getAdjacentLeftTile = (row: number, column: number): Tile | undefined => {
  return boardState.find((tile) => tile.column === column - 1 && tile.row === row)?.tile;
};

function updateExistingProjects(existingLocations: Locations[], row: number, column: number) {
  const adjacentTiles = getAdjacentTiles(row, column);
  adjacentTiles.forEach((adjacentTile, edge) => {
    if (adjacentTile) {
      const adjacentTileProject = rootStore.projectStore.allProjects.find(
        (project) =>
          project.tiles.includes(adjacentTile) && project.type === rootStore.gameStore.tileInHand?.edges[edge],
      );
      if (adjacentTileProject) {
        adjacentTileProject.tiles.push(adjacentTile);
        existingLocations.push(adjacentTileProject.type);
      }
    }
  });
}

function createNewProjects(existingLocations: Locations[]) {
  const tileInHand = rootStore.gameStore.tileInHand!;
  const addNewProject = (l: Locations, t: Tile) => rootStore.projectStore.addNewProject(l, t);
  if (!existingLocations.includes(Locations.ROAD) && tileInHand.middle.includes(Locations.ROAD)) {
    const roadProject = addNewProject(Locations.ROAD, tileInHand);
    existingLocations.push(roadProject.type);
  }

  if (!existingLocations.includes(Locations.CITY) && tileInHand.middle.includes(Locations.CITY)) {
    const cityProject = addNewProject(Locations.CITY, tileInHand);
    existingLocations.push(cityProject.type);
  }

  if (tileInHand.middle === Locations.MONASTERY) {
    const monasteryProject = addNewProject(Locations.MONASTERY, tileInHand);
    existingLocations.push(monasteryProject.type);
  }
  const edges = Object.values(tileInHand.edges);

  edges.filter((edge) => !existingLocations.includes(edge)).forEach((edge) => addNewProject(edge, tileInHand));
}
export const extendBoard = (row: number, column: number) => {
  let bottomRow = _.maxBy(boardState, 'row')!.row;
  let topRow = _.minBy(boardState, 'row')!.row;
  let leftColumn = _.minBy(boardState, 'column')!.column;
  let rightColumn = _.maxBy(boardState, 'column')!.column;
  if (row === bottomRow) {
    for (let col = leftColumn; col <= rightColumn; col++) {
      boardState.push({ row: row + 1, column: col, state: TileState.IDLE });
    }
    bottomRow += 1;
  }

  if (row === topRow) {
    for (let col = leftColumn; col <= rightColumn; col++) {
      boardState.unshift({ row: row - 1, column: col, state: TileState.IDLE });
    }
    topRow -= 1;
  }
  if (column === rightColumn) {
    for (let row = topRow; row <= bottomRow; row++) {
      boardState.push({ row: row, column: column + 1, state: TileState.IDLE });
    }
    rightColumn += 1;
  }
  if (column === leftColumn) {
    for (let row = topRow; row <= bottomRow; row++) {
      boardState.push({ row: row, column: column - 1, state: TileState.IDLE });
    }
    leftColumn -= 1;
  }
};
