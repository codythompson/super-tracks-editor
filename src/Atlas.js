import TileInfo, { CONNECTIONS } from './TileInfo'

const CONNECTION_SYMBOLS = {
  NONE: ' ',
  CONNECTION: 'o',
  ACTIVE_CONNECTION: '*'
}

class AtlasParseError extends Error {}
class AtlasRangeError extends Error {}

class Atlas {
  static _removeEmptyLines(atlasContentArray) {
    let i = 0;
    while (atlasContentArray.length > i && atlasContentArray[i].trim().length === 0) {
      i++
    }
    atlasContentArray = atlasContentArray.slice(i)

    i = atlasContentArray.length-1
    while (i > 0 && atlasContentArray[i].trim().length === 0) {
      i--
    }
    atlasContentArray = atlasContentArray.slice(0, i+1)

    return atlasContentArray
  }

  static _validate(atlasContentArray) {
    if (atlasContentArray.length === 0) {
      throw new AtlasParseError('Atlas file is empty')
    }
    if (atlasContentArray.length % 4 !== 3) {
      throw new AtlasParseError('Malformed rows: invalid number of lines (whitespace only lines preceding or following content ok)')
    }
    if (atlasContentArray[0].length % 4 !== 3) {
      throw new AtlasParseError('Malformed columns: invalid number of characters (whitespace only lines preceding or following content ok)')
    }
    let charWidth = atlasContentArray[0].length
    let horSepTest = /^-+$/
    let lineCharTest = /^((o| |\*){3}\|{1})*((o| |\*){3}){1}$/
    for (let i = 0; i < atlasContentArray.length; i++) {
      let line = atlasContentArray[i]
      if (line.length !== charWidth) {
        throw new AtlasParseError(`Malformed column: more or less characters than other lines: line ${i+1}`)
      }
      if (i % 4 === 3 && !horSepTest.test(line)) {
        throw new AtlasParseError(`Malformed row, expecting separator line (a bunch of hyphens -------): line ${i+1}`)
      }
      if (i % 4 !== 3 && !lineCharTest.test(line)) {
        throw new AtlasParseError(`Malformed row, unexpected chars: line ${i+1}`)
      }
    }
  }

  static _getTileOffset(columnI, rowJ) {
    return {
      charIndex: columnI*4,
      rowIndex: rowJ*4
    }
  }

  static _getCharAt(atlasContentArray, charIndex, rowIndex) {
    return atlasContentArray[rowIndex][charIndex]
  }

  static _getDimensions(atlasContentArray) {
    return {
      columns: Math.ceil(atlasContentArray[0].length / 4),
      rows: Math.ceil(atlasContentArray.length / 4)
    }
  }

  static _isConnectionChar(char) {
    return char === CONNECTION_SYMBOLS.CONNECTION ||
        char === CONNECTION_SYMBOLS.ACTIVE_CONNECTION
  }

  static _setExitPair(tileInfo, char, potentialExitPair) {
    if (Atlas._isConnectionChar(char)) {
      tileInfo.addExitPair(potentialExitPair)
      if (char === CONNECTION_SYMBOLS.ACTIVE_CONNECTION) {
        tileInfo.activeExitPair = potentialExitPair
      }
    }
  }

  static _getTileInfo(atlasContent, columnI, rowJ) {
    const { charIndex:cIX, rowIndex:rIX } = Atlas._getTileOffset(columnI, rowJ)

    const lt  = Atlas._getCharAt(atlasContent, cIX+0,rIX+0)
    const lrA = Atlas._getCharAt(atlasContent, cIX+0,rIX+1)
    const lrB = Atlas._getCharAt(atlasContent, cIX+2,rIX+1)
    const lb  = Atlas._getCharAt(atlasContent, cIX+0,rIX+2)
    const tbA = Atlas._getCharAt(atlasContent, cIX+1,rIX+0)
    const tbB = Atlas._getCharAt(atlasContent, cIX+1,rIX+2)
    const tr  = Atlas._getCharAt(atlasContent, cIX+2,rIX+0)
    const rb  = Atlas._getCharAt(atlasContent, cIX+2,rIX+2)

    if (Atlas._isConnectionChar(lrA) && !Atlas._isConnectionChar(lrB)) {
      throw new AtlasParseError(`tile ${columnI},${rowJ} is missing a matching LEFT_RIGHT connection symbol (needs to be "o o" or "* *")`)
    }
    if (Atlas._isConnectionChar(tbA) && !Atlas._isConnectionChar(tbB)) {
      throw new AtlasParseError(`tile ${columnI},${rowJ} is missing a matching TOP_BOTTOM connection symbol (needs to be two 'o' or two '*' aligned vertically with a space in betwen)`)
    }

    const tileInfo = new TileInfo(columnI, rowJ)
    const {LEFT_TOP,LEFT_RIGHT,LEFT_BOTTOM,TOP_RIGHT,TOP_BOTTOM,RIGHT_BOTTOM} = CONNECTIONS
    Atlas._setExitPair(tileInfo, lt, LEFT_TOP)
    Atlas._setExitPair(tileInfo, lrA, LEFT_RIGHT)
    Atlas._setExitPair(tileInfo, lb, LEFT_BOTTOM)
    Atlas._setExitPair(tileInfo, tbA, TOP_BOTTOM)
    Atlas._setExitPair(tileInfo, tr, TOP_RIGHT)
    Atlas._setExitPair(tileInfo, rb, RIGHT_BOTTOM)

    return tileInfo
  }

  /**
   * takes the contents of an atlas file and returns an Atlas instance.
   * @param {string|Array.<string>} atlasContent the contents of and atlas file
   */
  static parseAtlasContent(atlasContent) {
    if (!Array.isArray(atlasContent)) {
      atlasContent = atlasContent.split('\n')
    }
    atlasContent = Atlas._removeEmptyLines(atlasContent)

    const {columns, rows} = Atlas._getDimensions(atlasContent)
    const atlas = new Atlas(columns, rows)
    for (let i = 0; i < columns; i++) {
      for (let j = 0; j < rows; j++) {
        atlas.set(Atlas._getTileInfo(atlasContent, i, j), i, j)
      }
    }

    return atlas
  }

  constructor(columns, rows) {
    if (columns <= 0 || rows <= 0) {
      throw new AtlasRangeError('[Atlas][constructor] there must be at least one column and one row')
    }
    this._lastColumn = columns-1
    this._lastRow = rows-1
    this.rowArray = []
    for (let j = 0; j < rows; j++) {
      let row = []
      this.rowArray.push(row)
      for (let i = 0; i < columns; i++) {
        row.push(null)
      }
    }
  }

  get columns() {
    return this._lastColumn+1;
  }

  get cachedColumns() {
    return this.rowArray[0].length
  }

  get rows() {
    return this._lastRow+1;
  }

  get cachedRows() {
    return this.rowArray.length
  }

  rangeCheck(i, j, methodName) {
    if (i < 0 || i >= this.columns || j < 0 || j >= this.rows) {
      throw new AtlasRangeError(`[Atlas][${methodName}] args out of range: ${i},${j}`)
    }
  }

  columnRangeCheck(i, methodName) {
    if (i < 0 || i >= this.columns) {
      throw new AtlasRangeError(`[Atlas][${methodName}] column index out of range: ${i}`)
    }
  }

  rowRangeCheck(j, methodName) {
    if (j < 0 || j >= this.rows) {
      throw new AtlasRangeError(`[Atlas][${methodName}] row index out of range: ${j}`)
    }
  }

  set(tileInfo, i, j) {
    this.rangeCheck(i, j, 'set')
    this.rowArray[j][i] = tileInfo
  }

  get(i, j) {
    this.rangeCheck(i, j, 'get')
    return this.rowArray[j][i]
  }

  addColumn() {
    if (this.columns == this.cachedColumns) {
      for (let j = 0; j < this.cachedRows; j++) {
        this.rowArray[j].push(new TileInfo(this.rowArray[j].length, j))
      }
    }
    this._lastColumn++
  }


  resetRow(j) {
    this.rowRangeCheck(j, 'resetRow')
    for (let i = 0; i < this.cachedColumns; i++) {
      this.set(new TileInfo(i, j), i, j)
    }
  }

  reset() {
    for(let j = 0; j < this.cachedRows; j++) {
      this.resetRow(j)
    }
  }

  fill() {
    this.reset()
  }

  removeColumn() {
    if (this.columns === 1) {
      throw new AtlasRangeError('[Atlas][removeColumn] must have at least one column')
    }
    this._lastColumn--
  }

  setColumns(columnCount) {
    if (columnCount < 1) {
      throw new AtlasRangeError(`[Atlas][setColumns] columnCount must be >= 1`)
    }
    while (columnCount > this.columns) {
      this.addColumn()
    }
    while (columnCount < this.columns) {
      this.removeColumn()
    }
  }

  getColumn(i) {
    this.columnRangeCheck(i, 'getColumn')
    const column = []
    for (let j = 0; j < this.rows; j++) {
      column.push(this.get(i,j))
    }
    return column
  }


  addRow() {
    if (this.rows === this.cachedRows) {
      const newRow = []
      for (let i = 0; i < this.cachedColumns; i++) {
        newRow.push(new TileInfo(i, this.rowArray.length))
      }
      this.rowArray.push(newRow)
    }
    this._lastRow++
  }

  removeRow() {
    if (this.rows === 1) {
      throw new AtlasRangeError('[Atlas][removeRow] must have at least one row')
    }
    this._lastRow--
  }

  setRows(rowCount) {
    if (rowCount < 1) {
      throw new AtlasRangeError(`[Atlas][setRows] rowCount must be >= 1`)
    }
    while (rowCount > this.rows) {
      this.addRow()
    }
    while (rowCount < this.rows) {
      this.removeRow()
    }
  }
  getRow(j) {
    this.rowRangeCheck(j, 'getRow')
    return this.rowArray[j]
  }

  mapColumns(func) {
    let result = []
    for(let i = 0; i < this.columns; i++) {
      result.push(func(this.getRow(i), i))
    }
    return result
  }

  mapRows(func) {
    let result = []
    for(let j = 0; j < this.rows; j++) {
      result.push(func(this.getRow(j), j))
    }
    return result
  }

  getStateObject() {
    return {
      rows: this.mapRows(row => [...row]),
      get columnsWide() {
        return this.rows[0].length
      },
      get rowsTall() {
        return this.rows.length
      }
    }
  }

  mergeInto(otherAtlas) {
    this.mapRows((row, j) => {
      row.forEach((tileInfo, i) => {
        this.set(tileInfo.merge(otherAtlas.get(i,j)),i,j)
      })
    })
  }
}

export default Atlas
export { CONNECTION_SYMBOLS, AtlasParseError }