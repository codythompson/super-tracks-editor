import Atlas, { AtlasParseError } from './Atlas'

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

test('Atlas.getCharAt should return the right character', () => {
  expect(Atlas._getCharAt(validA, 0, 0)).toBe('o')
  expect(Atlas._getCharAt(validA, 18, 6)).toBe(' ')
  expect(Atlas._getCharAt(validA, 11, 2)).toBe('|')
})

test('Atlas._getDimensions should return the right dimensions', () => {
  expect(Atlas._getDimensions(validA)).toEqual({columns: 5, rows: 2})
  expect(Atlas._getDimensions(validB)).toEqual({columns: 1, rows: 1})
})
