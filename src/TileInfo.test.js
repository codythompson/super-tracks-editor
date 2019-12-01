import TileInfo, { CONNECTIONS } from './TileInfo'

test('TileInfo.split', () => {
  const splitNone = TileInfo.split(CONNECTIONS.NONE)
  expect(splitNone.length).toBe(0)

  const splitSingle = TileInfo.split(CONNECTIONS.LEFT)
  expect(splitSingle.length).toBe(1)
  expect(splitSingle).toContain(CONNECTIONS.LEFT)

  const splitDouble = TileInfo.split(CONNECTIONS.TOP_RIGHT)
  expect(splitDouble.length).toBe(2)
  expect(splitDouble).toContain(CONNECTIONS.TOP)
  expect(splitDouble).toContain(CONNECTIONS.RIGHT)

  const splitTriple = TileInfo.split(CONNECTIONS.LEFT_TOP_BOTTOM)
  expect(splitTriple.length).toBe(3)
  expect(splitTriple).toContain(CONNECTIONS.BOTTOM)
  expect(splitTriple).toContain(CONNECTIONS.LEFT)
  expect(splitTriple).toContain(CONNECTIONS.TOP)

  const splitQuadruple = TileInfo.split(CONNECTIONS.LEFT_TOP_RIGHT_BOTTOM)
  expect(splitQuadruple.length).toBe(4)
  expect(splitQuadruple).toContain(CONNECTIONS.BOTTOM)
  expect(splitQuadruple).toContain(CONNECTIONS.LEFT)
  expect(splitQuadruple).toContain(CONNECTIONS.TOP)
  expect(splitQuadruple).toContain(CONNECTIONS.RIGHT)
})

test('TileInfo.splitIntoPairs', () => {
  const splitNone = TileInfo.splitIntoPairs(CONNECTIONS.NONE)
  expect(splitNone.length).toBe(0)

  const splitSingle = TileInfo.splitIntoPairs(CONNECTIONS.LEFT)
  expect(splitSingle.length).toBe(0)

  const splitDouble = TileInfo.splitIntoPairs(CONNECTIONS.TOP_RIGHT)
  expect(splitDouble.length).toBe(1)
  expect(splitDouble).toContain(CONNECTIONS.TOP_RIGHT)

  const splitTriple = TileInfo.splitIntoPairs(CONNECTIONS.LEFT_TOP_BOTTOM)
  expect(splitTriple.length).toBe(3)
  expect(splitTriple).toContain(CONNECTIONS.LEFT_TOP)
  expect(splitTriple).toContain(CONNECTIONS.LEFT_BOTTOM)
  expect(splitTriple).toContain(CONNECTIONS.TOP_BOTTOM)

  const splitQuadruple = TileInfo.splitIntoPairs(CONNECTIONS.LEFT_TOP_RIGHT_BOTTOM)
  expect(splitQuadruple.length).toBe(6)
  expect(splitQuadruple).toContain(CONNECTIONS.LEFT_TOP)
  expect(splitQuadruple).toContain(CONNECTIONS.LEFT_RIGHT)
  expect(splitQuadruple).toContain(CONNECTIONS.LEFT_BOTTOM)
  expect(splitQuadruple).toContain(CONNECTIONS.TOP_RIGHT)
  expect(splitQuadruple).toContain(CONNECTIONS.TOP_BOTTOM)
  expect(splitQuadruple).toContain(CONNECTIONS.RIGHT_BOTTOM)
})

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

test('merge', () => {
  const {LEFT_TOP,LEFT_RIGHT,LEFT_BOTTOM,TOP_RIGHT,TOP_BOTTOM,RIGHT_BOTTOM} = CONNECTIONS
  let mergedInto = new TileInfo(0,0)
  let mergingIn = new TileInfo(0,0)
  mergedInto.addExitPair(TOP_BOTTOM)
  mergedInto.addExitPair(LEFT_TOP)
  mergedInto.addExitPair(TOP_RIGHT)
  mergingIn.addExitPair(LEFT_BOTTOM)
  mergingIn.addExitPair(TOP_RIGHT)
  mergingIn.addExitPair(LEFT_TOP)
  let result = mergedInto.merge(mergingIn)

  expect(result).not.toBe(mergedInto)
  expect(result).not.toBe(mergingIn)
  expect(result.exitPairs[0]).toBe(TOP_BOTTOM)
  expect(result.exitPairs[1]).toBe(LEFT_BOTTOM)
  expect(result.exitPairs[2]).toBe(TOP_RIGHT)
  expect(result.exitPairs[3]).toBe(LEFT_TOP)
  expect(result.exitPairs.length).toBe(4)

  mergedInto = new TileInfo(0,0)
  mergingIn = new TileInfo(0,0)
  mergedInto.addExitPair(LEFT_RIGHT)
  mergingIn.addExitPair(LEFT_BOTTOM)
  result = mergedInto.merge(mergingIn)
  expect(result.exitPairs[0]).toBe(LEFT_RIGHT)
  expect(result.exitPairs[1]).toBe(LEFT_BOTTOM)
})