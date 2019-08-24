import TileInfo, { CONNECTIONS } from './TileInfo'

test('containsExitPair method', () => {
  const {LEFT_TOP,LEFT_RIGHT,LEFT_BOTTOM,TOP_RIGHT,TOP_BOTTOM,RIGHT_BOTTOM} = CONNECTIONS
  let tileInfo = new TileInfo()
  tileInfo.addExitPair(LEFT_TOP)
  tileInfo.addExitPair(TOP_BOTTOM)
  tileInfo.addExitPair(LEFT_BOTTOM)
  expect(tileInfo.containsExitPair(LEFT_TOP)).toBe(true)
  expect(tileInfo.containsExitPair(LEFT_RIGHT)).toBe(false)
  expect(tileInfo.containsExitPair(LEFT_BOTTOM)).toBe(true)
  expect(tileInfo.containsExitPair(TOP_RIGHT)).toBe(false)
  expect(tileInfo.containsExitPair(TOP_BOTTOM)).toBe(true)
  expect(tileInfo.containsExitPair(RIGHT_BOTTOM)).toBe(false)
})