import Locations from '../../constants/locations';
import Tile from '../../model/Tile';

test('new Tile is created', () => {
  const newTile = new Tile({
    bottom: Locations.CITY,
    left: Locations.FIELD,
    right: Locations.MONASTERY,
    top: Locations.ROAD,
  });
  expect(newTile.edges.left).toBe(Locations.FIELD);
  expect(newTile.edges.right).toBe(Locations.MONASTERY);
  expect(newTile.edges.top).toBe(Locations.ROAD);
  expect(newTile.edges.bottom).toBe(Locations.CITY);
});

test('Tile is rotated left', () => {
  const newTile = new Tile({
    bottom: Locations.CITY,
    left: Locations.FIELD,
    right: Locations.MONASTERY,
    top: Locations.ROAD,
  });
  newTile.rotateLeft();
  expect(newTile.edges.left).toBe(Locations.ROAD);
  expect(newTile.edges.right).toBe(Locations.CITY);
  expect(newTile.edges.top).toBe(Locations.MONASTERY);
  expect(newTile.edges.bottom).toBe(Locations.FIELD);
});

test('Tile is rotated right', () => {
  const newTile = new Tile({
    bottom: Locations.CITY,
    left: Locations.FIELD,
    right: Locations.MONASTERY,
    top: Locations.ROAD,
  });
  newTile.rotateRight();
  expect(newTile.edges.left).toBe(Locations.CITY);
  expect(newTile.edges.right).toBe(Locations.ROAD);
  expect(newTile.edges.top).toBe(Locations.FIELD);
  expect(newTile.edges.bottom).toBe(Locations.MONASTERY);
});
