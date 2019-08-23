import Atlas from './Atlas'

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
o *|   |***|ooo| o `
    .split('\n')
})