import Atlas, { AtlasParseError, CONNECTION_SYMBOLS } from './Atlas'
import TileInfo, { CONNECTIONS } from './TileInfo'

const validA =
`o *|   |***|ooo| o 
o *|   |***|ooo| o 
o *|   |***|ooo| o 
-------------------
o *|   |***|ooo| o 
o *|   |***|ooo| o 
o *|   |***|ooo| o `
  .split('\n')
const validB =
`o *
***
 o `
  .split('\n')

test('Atlas._removeEmptyLines should remove empty lines', () => {
  const noEmptyLines =
`no    

\t\t   
   \t\t
    emptylines    `
  .split('\n')
  const noEmptyLinesExpected = [...noEmptyLines]

  const startEmptyLine = `
  content
    \t    

    other content   `
    .split('\n')
  const startEmptyLineExpected = [
'  content',
'    \t    ',
'',
'    other content   '
  ]

  const endEmptyLine =
`\tlkjl\tlkjlkj

\t\tlklkjl   lkjlkj    
`
    .split('\n')
  const endEmptyLineExpected = [
'\tlkjl\tlkjlkj',
'',
'\t\tlklkjl   lkjlkj    '
  ]

  const multipleEmpties = `
\t\t    
     \t    

 
     cooooontent   \t\t

       

blah     cooooontent   \t\t
\t\t\t\t


\t   \t   
   \t   \t   
`
    .split('\n')
  const multipleEmptiesExpected = [
'     cooooontent   \t\t',
'',
'       ',
'',
'blah     cooooontent   \t\t'
  ]

  expect(Atlas._removeEmptyLines(noEmptyLines)).toEqual(noEmptyLinesExpected)
  expect(Atlas._removeEmptyLines(startEmptyLine)).toEqual(startEmptyLineExpected)
  expect(Atlas._removeEmptyLines(endEmptyLine)).toEqual(endEmptyLineExpected)
  expect(Atlas._removeEmptyLines(multipleEmpties)).toEqual(multipleEmptiesExpected)
  expect(Atlas._removeEmptyLines(multipleEmpties)).toEqual(multipleEmptiesExpected)
})

test('Atlas._validate should throw errors when stuff ins\'t valid', () => {
  const empty = []
  const wrongLineCountA =
`o *|   |***|ooo| o 
o *|   |***|ooo| o 
o *|   |***|ooo| o 
-------------------`
    .split('\n')
  const wrongLineCountB =
`o *|   |***|ooo| o 
o *|   |***|ooo| o 
o *|   |***|ooo| o 
-------------------
o *|   |***|ooo| o 
o *|   |***|ooo| o 
o *|   |***|ooo| o 
-------------------
o *|   |***|ooo| o `
    .split('\n')
  const wrongCharCount =
`o *|   |***|o oo| o 
o *|   |***|o oo| o 
o *|   |***|o oo| o 
-------------------
o *|   |***|o oo| o 
o *|   |***|o oo| o 
o *|   |***|o oo| o `
    .split('\n')
  const wrongLine =
`o *|   |***|ooo| o 
o *|   |***|ooo| o 
o *|   |***|oooo| o 
-------------------
o *|   |***|ooo| o 
o *|   |***|ooo| o 
o *|   |***|ooo| o `
    .split('\n')
  const wrongHorSepA =
`o *|   |***|ooo| o 
o *|   |***|ooo| o 
o *|   |***|ooo| o 
------------- -----
o *|   |***|ooo| o 
o *|   |***|ooo| o 
o *|   |***|ooo| o `
    .split('\n')
  const wrongHorSepB =
`o *|   |***|ooo| o 
o *|   |***|ooo| o 
o *|   |***|ooo| o 
o *|   |***|ooo| o 
-------------------
o *|   |***|ooo| o 
o *|   |***|ooo| o `
    .split('\n')
  const wrongCharA =
`o *|   |***|ooo| o 
o *|   |***|ooa| o 
o *|   |***|ooo| o 
-------------------
o *|   |**|*ooo| o 
o *|   |***|ooo| o 
o *|   |***|ooo| o `
    .split('\n')
  const wrongCharB =
`o *|   |***|ooo| o 
o *|   |***|oo | o 
o *|   |***|ooo| o 
-------------------
o *|   |**|*ooo| o 
o *|   |***|ooo| o 
o *|   |***|ooo| o `
    .split('\n')

    expect(Atlas._validate(validA)).toBeUndefined()
    expect(Atlas._validate(validB)).toBeUndefined()
    expect(() => Atlas._validate(empty)).toThrowWithMessage(AtlasParseError, 'Atlas file is empty')
    expect(() => Atlas._validate(wrongLineCountA)).toThrowWithMessage(AtlasParseError, 'Malformed rows: invalid number of lines (whitespace only lines preceding or following content ok)')
    expect(() => Atlas._validate(wrongLineCountB)).toThrowWithMessage(AtlasParseError, 'Malformed rows: invalid number of lines (whitespace only lines preceding or following content ok)')
    expect(() => Atlas._validate(wrongCharCount)).toThrowWithMessage(AtlasParseError, 'Malformed columns: invalid number of characters (whitespace only lines preceding or following content ok)')
    expect(() => Atlas._validate(wrongLine)).toThrowWithMessage(AtlasParseError, 'Malformed column: more or less characters than other lines: line 3')
    expect(() => Atlas._validate(wrongLine)).toThrowWithMessage(AtlasParseError, 'Malformed column: more or less characters than other lines: line 3')
    expect(() => Atlas._validate(wrongHorSepA)).toThrowWithMessage(AtlasParseError, 'Malformed row, expecting separator line (a bunch of hyphens -------): line 4')
    expect(() => Atlas._validate(wrongHorSepB)).toThrowWithMessage(AtlasParseError, 'Malformed row, expecting separator line (a bunch of hyphens -------): line 4')
    expect(() => Atlas._validate(wrongCharA)).toThrowWithMessage(AtlasParseError, 'Malformed row, unexpected chars: line 2')
    expect(() => Atlas._validate(wrongCharB)).toThrowWithMessage(AtlasParseError, 'Malformed row, unexpected chars: line 5')
})

test('Atlas._getTileOffset should return the right tile offset', () => {
  expect(Atlas._getTileOffset(0, 0)).toEqual({charIndex: 0, rowIndex: 0})
  expect(Atlas._getTileOffset(1, 0)).toEqual({charIndex: 4, rowIndex: 0})
  expect(Atlas._getTileOffset(0, 1)).toEqual({charIndex: 0, rowIndex: 4})
  expect(Atlas._getTileOffset(21, 3)).toEqual({charIndex: 84, rowIndex: 12})
})

test('Atlas._getCharAt should return the right character', () => {
  expect(Atlas._getCharAt(validA, 0, 0)).toBe('o')
  expect(Atlas._getCharAt(validA, 18, 6)).toBe(' ')
  expect(Atlas._getCharAt(validA, 11, 2)).toBe('|')
})

test('Atlas._getDimensions should return the right dimensions', () => {
  expect(Atlas._getDimensions(validA)).toEqual({columns: 5, rows: 2})
  expect(Atlas._getDimensions(validB)).toEqual({columns: 1, rows: 1})
})

test('Atlas._isConnectionChar should return true if given char is a connection char', () => {
  expect(Atlas._isConnectionChar(CONNECTION_SYMBOLS.CONNECTION)).toBe(true)
  expect(Atlas._isConnectionChar(CONNECTION_SYMBOLS.ACTIVE_CONNECTION)).toBe(true)
  expect(Atlas._isConnectionChar(CONNECTION_SYMBOLS.NONE)).toBe(false)
})

test('Atlas._setExitPair should set the exit pairs on tile info correctly', () => {
  const tileInfo = new TileInfo(0,0)
  const {LEFT_TOP,LEFT_RIGHT,LEFT_BOTTOM,TOP_RIGHT,TOP_BOTTOM,RIGHT_BOTTOM} = CONNECTIONS
  Atlas._setExitPair(tileInfo, CONNECTION_SYMBOLS.CONNECTION, LEFT_RIGHT)
  Atlas._setExitPair(tileInfo, CONNECTION_SYMBOLS.ACTIVE_CONNECTION, TOP_RIGHT)
  Atlas._setExitPair(tileInfo, CONNECTION_SYMBOLS.NONE, LEFT_TOP)
  expect(tileInfo.exitPairs).toIncludeSameMembers([LEFT_RIGHT, TOP_RIGHT])
})

test('Atlas._getTileInfo should return the right TileInfo', () => {
  const testAtlasContent =
`   |   |o  
   |o o|   
  o|o o|   
-----------
  o|   |   
   |* *|o o
   |o o|   
-----------
   |o *|   
   |o o|o o
  o|   |   `
    .split('\n')

  const t01 = Atlas._getTileInfo(testAtlasContent,0,1)
  const t11 = Atlas._getTileInfo(testAtlasContent,1,1)
  const t12 = Atlas._getTileInfo(testAtlasContent,1,2)

  const {LEFT_TOP,LEFT_RIGHT,LEFT_BOTTOM,TOP_RIGHT,TOP_BOTTOM,RIGHT_BOTTOM} = CONNECTIONS
  expect(t01.i).toBe(0)
  expect(t01.j).toBe(1)
  expect(t01.exitPairs).toIncludeSameMembers([TOP_RIGHT])
  expect(t01.activeExitIndex).toBe(0)
  expect(t11.i).toBe(1)
  expect(t11.j).toBe(1)
  expect(t11.exitPairs).toIncludeSameMembers([LEFT_RIGHT,LEFT_BOTTOM,RIGHT_BOTTOM])
  expect(t11.activeExitPair).toBe(LEFT_RIGHT)
  expect(t12.i).toBe(1)
  expect(t12.j).toBe(2)
  expect(t12.exitPairs).toIncludeSameMembers([LEFT_TOP,LEFT_RIGHT,TOP_RIGHT])
  expect(t12.activeExitPair).toBe(TOP_RIGHT)
})

test('Atlas.parseAtlasContent should parse stuff correctly', () => {
  const testAtlasContent = `
   |   |o  
   |o o|   
  o|o o|   
-----------
  o|   |   
   |   |o o
   |o o|   
-----------
   |o o|   
   |o o|o o
  o|   |   
  `

  const {LEFT_TOP,LEFT_RIGHT,LEFT_BOTTOM,TOP_RIGHT,TOP_BOTTOM,RIGHT_BOTTOM} = CONNECTIONS
  const testAtlas = Atlas.parseAtlasContent(testAtlasContent)
  expect(testAtlas.get(0,0).exitPairs).toIncludeSameMembers([RIGHT_BOTTOM])
  expect(testAtlas.get(1,0).exitPairs).toIncludeSameMembers([LEFT_RIGHT,LEFT_BOTTOM,RIGHT_BOTTOM])
  expect(testAtlas.get(2,0).exitPairs).toIncludeSameMembers([LEFT_TOP])
  expect(testAtlas.get(0,1).exitPairs).toIncludeSameMembers([TOP_RIGHT])
  expect(testAtlas.get(1,1).exitPairs).toIncludeSameMembers([LEFT_BOTTOM,RIGHT_BOTTOM])
  expect(testAtlas.get(2,1).exitPairs).toIncludeSameMembers([LEFT_RIGHT])
  expect(testAtlas.get(0,2).exitPairs).toIncludeSameMembers([RIGHT_BOTTOM])
  expect(testAtlas.get(1,2).exitPairs).toIncludeSameMembers([LEFT_TOP,LEFT_RIGHT,TOP_RIGHT])
  expect(testAtlas.get(2,2).exitPairs).toIncludeSameMembers([LEFT_RIGHT])
})

test('_getUncachedCoords', () => {
  const atlas = new Atlas(3, 4)
  atlas.fill()
  expect(atlas._getUncachedCoords(0, 0)).toEqual({i: 0, j: 0})
  expect(atlas._getUncachedCoords(0, 2)).toEqual({i: 0, j: 2})
  expect(atlas._getUncachedCoords(3, 2)).toEqual({i: 3, j: 2})
  expect(atlas._getUncachedCoords(3, 4)).toEqual({i: 3, j: 4})
  atlas.setColumns(4)
  atlas.setRows(5)
  expect(atlas._getUncachedCoords(0, 0)).toEqual({i: 0, j: 0})
  expect(atlas._getUncachedCoords(0, 2)).toEqual({i: 0, j: 2})
  expect(atlas._getUncachedCoords(4, 2)).toEqual({i: 4, j: 2})
  expect(atlas._getUncachedCoords(3, 5)).toEqual({i: 3, j: 5})
  atlas.setColumnsOriginRight(2)
  atlas.setRowsOriginBottom(3)
  expect(atlas._getUncachedCoords(2, 2)).toEqual({i: 0, j: 0})
  expect(atlas._getUncachedCoords(2, 4)).toEqual({i: 0, j: 2})
  expect(atlas._getUncachedCoords(3, 4)).toEqual({i: 1, j: 2})
})

test('_getCacheCoords', () => {
  const atlas = new Atlas(3, 4)
  atlas.fill()
  expect(atlas._getCacheCoords(0, 0)).toEqual({i: 0, j: 0})
  expect(atlas._getCacheCoords(0, 2)).toEqual({i: 0, j: 2})
  expect(atlas._getCacheCoords(3, 2)).toEqual({i: 3, j: 2})
  expect(atlas._getCacheCoords(3, 4)).toEqual({i: 3, j: 4})

  atlas.setColumnsOriginRight(2)
  atlas.setRowsOriginBottom(3)
  expect(atlas._getCacheCoords(0, 0)).toEqual({i: 1, j: 1})
  expect(atlas._getCacheCoords(0, 1)).toEqual({i: 1, j: 2})
  expect(atlas._getCacheCoords(1, 1)).toEqual({i: 2, j: 2})
  expect(atlas._getCacheCoords(2, 2)).toEqual({i: 3, j: 3})

  atlas.setColumns(4)
  expect(atlas._getCacheCoords(0, 0)).toEqual({i: 1, j: 1})
  expect(atlas._getCacheCoords(0, 1)).toEqual({i: 1, j: 2})
  expect(atlas._getCacheCoords(1, 1)).toEqual({i: 2, j: 2})
  expect(atlas._getCacheCoords(2, 2)).toEqual({i: 3, j: 3})
  expect(atlas._getCacheCoords(3, 2)).toEqual({i: 4, j: 3})

  atlas.setRows(4)
  expect(atlas._getCacheCoords(0, 0)).toEqual({i: 1, j: 1})
  expect(atlas._getCacheCoords(0, 1)).toEqual({i: 1, j: 2})
  expect(atlas._getCacheCoords(1, 1)).toEqual({i: 2, j: 2})
  expect(atlas._getCacheCoords(2, 2)).toEqual({i: 3, j: 3})
  expect(atlas._getCacheCoords(2, 3)).toEqual({i: 3, j: 4})
})

test('setColumnsOriginRight', () => {
  const atlas = Atlas.parseAtlasContent(`
o  |   | o |   |  o|   
   |o o|   |   |   |   
   |   | o |o  |   |  o
-----------------------
   |   |   |   |   |   
   |   |   |   |   |   
   |   |   |   |   |   
  `)

  const {NONE, LEFT_TOP, LEFT_RIGHT, TOP_BOTTOM, LEFT_BOTTOM, TOP_RIGHT, RIGHT_BOTTOM} = CONNECTIONS

  atlas.setColumnsOriginRight(3)
  expect(atlas.get(0,0).activeExitPair).toBe(LEFT_BOTTOM)
  expect(atlas.get(2,0).activeExitPair).toBe(RIGHT_BOTTOM)
  expect(atlas.get(0,0).i).toBe(0)
  expect(atlas.get(2,0).i).toBe(2)
  atlas.setColumnsOriginRight(6)
  expect(atlas.get(0,0).activeExitPair).toBe(LEFT_TOP)
  expect(atlas.get(2,0).activeExitPair).toBe(TOP_BOTTOM)
  expect(atlas.get(0,0).i).toBe(0)
  expect(atlas.get(2,0).i).toBe(2)
  expect(atlas.get(5,0).i).toBe(5)
  atlas.setColumns(4)
  expect(atlas.get(0,0).activeExitPair).toBe(LEFT_TOP)
  expect(atlas.get(2,0).activeExitPair).toBe(TOP_BOTTOM)
  expect(atlas.get(0,0).i).toBe(0)
  expect(atlas.get(2,0).i).toBe(2)
  expect(atlas.get(3,0).i).toBe(3)
  atlas.setColumnsOriginRight(5)
  expect(atlas.get(0,0).activeExitPair).toBe(NONE)
  expect(atlas.get(1,0).activeExitPair).toBe(LEFT_TOP)
  expect(atlas.get(2,0).activeExitPair).toBe(LEFT_RIGHT)
  expect(atlas.get(0,0).i).toBe(0)
  expect(atlas.get(2,0).i).toBe(2)
  expect(atlas.get(4,0).i).toBe(4)
  atlas.setColumns(6)
  expect(atlas.get(0,0).activeExitPair).toBe(NONE)
  expect(atlas.get(1,0).activeExitPair).toBe(LEFT_TOP)
  expect(atlas.get(2,0).activeExitPair).toBe(LEFT_RIGHT)
  expect(atlas.get(5,0).activeExitPair).toBe(TOP_RIGHT)
  expect(atlas.get(0,0).i).toBe(0)
  expect(atlas.get(2,0).i).toBe(2)
  expect(atlas.get(5,0).i).toBe(5)
  atlas.setColumnsOriginRight(7)
  expect(atlas.get(0,0).activeExitPair).toBe(NONE)
  expect(atlas.get(1,0).activeExitPair).toBe(NONE)
  expect(atlas.get(2,0).activeExitPair).toBe(LEFT_TOP)
  expect(atlas.get(6,0).activeExitPair).toBe(TOP_RIGHT)
  expect(atlas.get(0,0).i).toBe(0)
  expect(atlas.get(2,0).i).toBe(2)
  expect(atlas.get(6,0).i).toBe(6)
})

test('setRowsOriginBottom', () => {
  const atlas = Atlas.parseAtlasContent(`
o  |   
   |   
   |   
-------
   |   
o o|   
   |   
-------
 o |   
   |   
 o |   
-------
   |   
   |   
o  |   
-------
  o|   
   |   
   |   
-------
   |   
   |   
  o|   
  `)

  const {NONE, LEFT_TOP, LEFT_RIGHT, TOP_BOTTOM, LEFT_BOTTOM, TOP_RIGHT, RIGHT_BOTTOM} = CONNECTIONS

  atlas.setRowsOriginBottom(3)
  expect(atlas.get(0, 0).activeExitPair).toBe(LEFT_BOTTOM)
  expect(atlas.get(0, 2).activeExitPair).toBe(RIGHT_BOTTOM)
  expect(atlas.get(0, 0).j).toBe(0)
  expect(atlas.get(0, 2).j).toBe(2)
  atlas.setRowsOriginBottom(6)
  expect(atlas.get(0, 0).activeExitPair).toBe(LEFT_TOP)
  expect(atlas.get(0, 2).activeExitPair).toBe(TOP_BOTTOM)
  expect(atlas.get(0, 0).j).toBe(0)
  expect(atlas.get(0, 2).j).toBe(2)
  expect(atlas.get(0, 5).j).toBe(5)
  atlas.setRows(4)
  expect(atlas.get(0, 0).activeExitPair).toBe(LEFT_TOP)
  expect(atlas.get(0, 2).activeExitPair).toBe(TOP_BOTTOM)
  expect(atlas.get(0, 0).j).toBe(0)
  expect(atlas.get(0, 2).j).toBe(2)
  expect(atlas.get(0, 3).j).toBe(3)
  atlas.setRowsOriginBottom(5)
  expect(atlas.get(0, 0).activeExitPair).toBe(NONE)
  expect(atlas.get(0, 1).activeExitPair).toBe(LEFT_TOP)
  expect(atlas.get(0, 2).activeExitPair).toBe(LEFT_RIGHT)
  expect(atlas.get(0, 0).j).toBe(0)
  expect(atlas.get(0, 2).j).toBe(2)
  expect(atlas.get(0, 4).j).toBe(4)
  atlas.setRows(6)
  expect(atlas.get(0, 0).activeExitPair).toBe(NONE)
  expect(atlas.get(0, 1).activeExitPair).toBe(LEFT_TOP)
  expect(atlas.get(0, 2).activeExitPair).toBe(LEFT_RIGHT)
  expect(atlas.get(0, 5).activeExitPair).toBe(TOP_RIGHT)
  expect(atlas.get(0, 0).j).toBe(0)
  expect(atlas.get(0, 2).j).toBe(2)
  expect(atlas.get(0, 5).j).toBe(5)
  atlas.setRowsOriginBottom(7)
  expect(atlas.get(0, 0).activeExitPair).toBe(NONE)
  expect(atlas.get(0, 1).activeExitPair).toBe(NONE)
  expect(atlas.get(0, 2).activeExitPair).toBe(LEFT_TOP)
  expect(atlas.get(0, 6).activeExitPair).toBe(TOP_RIGHT)
  expect(atlas.get(0, 0).j).toBe(0)
  expect(atlas.get(0, 2).j).toBe(2)
  expect(atlas.get(0, 6).j).toBe(6)
})

test('setColumns and setRows should add and remove columns and rows without deleting their contents', () => {
  const atlas = new Atlas(2, 3)
  atlas.fill()
  expect(atlas.columns).toBe(2)
  expect(atlas.rows).toBe(3)
  expect(atlas.cachedColumns).toBe(2)
  expect(atlas.cachedRows).toBe(3)
  for(const [j, row] of atlas.rowArray.entries()) {
    for(const [i, tileInfo] of row.entries()) {
      expect(tileInfo.i).toBe(i)
      expect(tileInfo.j).toBe(j)
    }
  }

  atlas.setColumns(3)
  expect(atlas.columns).toBe(3)
  expect(atlas.rows).toBe(3)
  expect(atlas.cachedColumns).toBe(3)
  expect(atlas.cachedRows).toBe(3)
  for(const [j, row] of atlas.rowArray.entries()) {
    for(const [i, tileInfo] of row.entries()) {
      expect(tileInfo.i).toBe(i)
      expect(tileInfo.j).toBe(j)
    }
  }

  atlas.setColumns(1)
  expect(atlas.columns).toBe(1)
  expect(atlas.rows).toBe(3)
  expect(atlas.cachedColumns).toBe(3)
  expect(atlas.cachedRows).toBe(3)
  for(const [j, row] of atlas.rowArray.entries()) {
    for(const [i, tileInfo] of row.entries()) {
      expect(tileInfo.i).toBe(i)
      expect(tileInfo.j).toBe(j)
    }
  }

  atlas.setRows(2)
  expect(atlas.columns).toBe(1)
  expect(atlas.rows).toBe(2)
  expect(atlas.cachedColumns).toBe(3)
  expect(atlas.cachedRows).toBe(3)
  for(const [j, row] of atlas.rowArray.entries()) {
    for(const [i, tileInfo] of row.entries()) {
      expect(tileInfo.i).toBe(i)
      expect(tileInfo.j).toBe(j)
    }
  }

  atlas.setRows(4)
  expect(atlas.columns).toBe(1)
  expect(atlas.rows).toBe(4)
  expect(atlas.cachedColumns).toBe(3)
  expect(atlas.cachedRows).toBe(4)
  for(const [j, row] of atlas.rowArray.entries()) {
    for(const [i, tileInfo] of row.entries()) {
      expect(tileInfo.i).toBe(i)
      expect(tileInfo.j).toBe(j)
    }
  }
})

test('getStateObject', () => {
  const testAtlasContent = `
   |   
   |o o
  o|o o
-------
  o|   
   |   
   |o o
-------
   |o o
   |o o
  o|   
  `

  const atlas = Atlas.parseAtlasContent(testAtlasContent)
  const stateObj = atlas.getStateObject()
  expect(stateObj.columnsWide).toBe(2)
  expect(stateObj.rowsTall).toBe(3)
  expect(stateObj.rows).toBeArray()
  expect(stateObj.rows[0].length).toBe(2)
  expect(stateObj.rows[1].length).toBe(2)
  expect(stateObj.rows[2].length).toBe(2)
})

test('merge', () => {
  const original = `
   |   |o  
   |o o|   
  o|   |   
-----------
   |o  |   
   |   |   
   |   |   
  `
  const incoming = `
   |   | o 
   |   |o o
  o|o  | o 
-----------
 o |   |   
   |   |   
 o |   |   
  `

  const {LEFT_TOP,LEFT_RIGHT,LEFT_BOTTOM,TOP_RIGHT,TOP_BOTTOM,RIGHT_BOTTOM} = CONNECTIONS
  const originalAtlas = Atlas.parseAtlasContent(original)
  const incomingAtlas = Atlas.parseAtlasContent(incoming)
  originalAtlas.mergeInPlace(incomingAtlas)
  expect(originalAtlas.get(0,0).exitPairs).toEqual([RIGHT_BOTTOM])
  expect(originalAtlas.get(1,0).exitPairs).toEqual([LEFT_RIGHT, LEFT_BOTTOM])
  expect(originalAtlas.get(2,0).exitPairs).toEqual([LEFT_TOP, LEFT_RIGHT, TOP_BOTTOM])
  expect(originalAtlas.get(0,1).exitPairs).toEqual([TOP_BOTTOM])
  expect(originalAtlas.get(1,1).exitPairs).toEqual([LEFT_TOP])
  expect(originalAtlas.get(2,1).exitPairs).toEqual([])
})
