const CONNECTION_SYMBOLS = {
  NONE: ' ',
  CONNECTION: 'o',
  ACTIVE_CONNECTION: '*'
}

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
export { CONNECTION_SYMBOLS }