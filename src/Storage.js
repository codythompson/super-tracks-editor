import defaultsDeep from 'lodash/defaultsDeep'

import Atlas from './Atlas'

export const STORAGE_KEY = 'SUPER_TRACKS_EDITOR'

const DEFAULT_CONTENTS = {
  lastAtlas: null,
  atlasDefaults: {
    width: 8,
    height: 8
  }
}

const read = function() {
  const contents = window.localStorage.getItem(STORAGE_KEY)
  if (typeof contents === 'undefined' || contents === null) {
    return DEFAULT_CONTENTS
  } else {
    return JSON.parse(contents)
  }
}

const write = function(newContents) {
  const existingContents = read()
  const contents = defaultsDeep(newContents, existingContents)
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(contents))
}

const readAtlas = function() {
  const {lastAtlas, atlasDefaults} = read()
  if (lastAtlas === null) {
    const atlas = new Atlas(atlasDefaults.width, atlasDefaults.height)
    atlas.fill()
    return atlas
  } else {
    return Atlas.parseAtlasContent(lastAtlas)
  }
}

const writeAtlas = function(atlas) {
  write({lastAtlas: atlas.getContentString()})
}

export default {
  read,
  write,
  readAtlas,
  writeAtlas
}