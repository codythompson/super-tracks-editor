import TileInfo from './TileInfo'

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

  static _getTileOffset(columnJ, rowI) {
    return {
      charIndex: columnJ*4,
      rowIndex: rowI*4
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

  /**
   * takes the contents of an atlas file and returns an Atlas instance.
   * @param {string|Array.<string>} altasContent the contents of and atlas file
   */
  static parseAtlasContent(altasContent) {
    if (!Array.isArray(altasContent)) {
      altasContent.split('\n')
    }
  }

  constructor(columns, rows) {
    this._lastColumn = columns-1
    this._lastRow = rows-1
    this._columns = []
    for (let i = 0; i < columns; i++) {
      let column = []
      this._columns.push(column)
      for (let j = 0; j < rows; j++) {
        column.push(null)
      }
    }
  }

  get columns() {
    return this._lastColumn+1;
  }

  get cachedColumns() {
    return this._columns.length
  }

  get rows() {
    return this._lastRow+1;
  }

  get cachedRows() {
    return this._columns[0].length
  }

  rangeCheck(i, j, methodName) {
    if (i < 0 || i >= this.columns || j < 0 || j >= this.rows) {
      throw new AtlasRangeError(`[Atlas][${methodName}] args out of range: ${i},${j}`)
    }
  }

  set(tileInfo, i, j) {
    this.rangeCheck()
    this._columns[i][j] = tileInfo
  }

  get(i, j) {
    this.rangeCheck()
    return this.columns[i][j]
  }

  addColumn() {
    if (this.columns === this.cachedColumns) {
      const newColumn = []
      for (let j = 0; j < this.cachedRows; j++) {
        newColumn.push(new TileInfo())
      }
      this._columns.push(newColumn)
    }
    this._lastColumn++
  }

  resetColumn(i) {
    if (i < 0 || i >= this.columns) {
      throw new AtlasRangeError(`[Atlas][resetColumn] column index out of range: ${i}`)
    }
    for (let j = 0; j < this.cachedColumns; j++) {
      this.set(new TileInfo(), i, j)
    }
  }

  reset() {
    for(let i = 0; i < this.cachedColumns; i++) {
      this.resetColumn(i)
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

  addRow() {
    if (this.rows == this.cachedRows) {
      for (let i = 0; i < this.cachedColumns; i++) {
        this._columns[i].push(new TileInfo())
      }
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
}

export default Atlas
export { CONNECTION_SYMBOLS, AtlasParseError }