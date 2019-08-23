const CONNECTION_SYMBOLS = {
  NONE: ' ',
  CONNECTION: 'o',
  ACTIVE_CONNECTION: '*'
}

class AtlasParseError extends Error {}

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

  // TODO: getTileObj(atlasContent, column, row)

  /**
   * takes the contents of an atlas file and returns an Atlas instance.
   * @param {string|Array.<string>} altasContent the contents of and atlas file
   */
  static parseAtlasContent(altasContent) {
    if (!Array.isArray(altasContent)) {
      altasContent.split('\n')
    }
  }
}

export default Atlas
export { CONNECTION_SYMBOLS, AtlasParseError }