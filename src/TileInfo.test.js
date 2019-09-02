import TileInfo, { CONNECTIONS } from './TileInfo'

test('containsExitPair method', () => {
  const {LEFT_TOP,LEFT_RIGHT,LEFT_BOTTOM,TOP_RIGHT,TOP_BOTTOM,RIGHT_BOTTOM} = CONNECTIONS
  let tileInfo = new TileInfo(0,0)
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

test('addExitPair should remove existing pairs that match', () => {
  const {LEFT_TOP,LEFT_RIGHT,LEFT_BOTTOM,TOP_RIGHT,TOP_BOTTOM,RIGHT_BOTTOM} = CONNECTIONS
  let tileInfo = new TileInfo(0,0)
  tileInfo.addExitPair(LEFT_TOP)
  tileInfo.addExitPair(TOP_RIGHT)
  tileInfo.addExitPair(LEFT_BOTTOM)
  tileInfo.addExitPair(TOP_RIGHT)
  tileInfo.addExitPair(LEFT_TOP)

  expect(tileInfo.exitPairs[0]).toBe(LEFT_BOTTOM)
  expect(tileInfo.exitPairs[1]).toBe(TOP_RIGHT)
  expect(tileInfo.exitPairs[2]).toBe(LEFT_TOP)
  expect(tileInfo.exitPairs.length).toBe(3)
})

test('replaceLast should remove existing pairs that match', () => {
  const {LEFT_TOP,LEFT_RIGHT,LEFT_BOTTOM,TOP_RIGHT,TOP_BOTTOM,RIGHT_BOTTOM} = CONNECTIONS
  let tileInfo = new TileInfo(0,0)
  tileInfo.addExitPair(LEFT_TOP)
  tileInfo.addExitPair(TOP_RIGHT)
  tileInfo.addExitPair(LEFT_BOTTOM)
  tileInfo.addExitPair(TOP_RIGHT)
  tileInfo.replaceLast(LEFT_TOP)

  expect(tileInfo.exitPairs[0]).toBe(LEFT_BOTTOM)
  expect(tileInfo.exitPairs[1]).toBe(LEFT_TOP)
  expect(tileInfo.exitPairs.length).toBe(2)
})