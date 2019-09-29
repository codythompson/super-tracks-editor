export const STORAGE_KEY = 'SUPER_TRACKS_EDITOR'

const BLANK_STORAGE = {
  lastAtlas: null
}

const read = function() {
  const contents = window.localStorage.getItem(STORAGE_KEY)
  if (typeof contents === 'undefined' || contents === null) {
    return BLANK_STORAGE
  } else {
    return JSON.parse(contents)
  }
}

const write = function(contents) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(contents))
}

export default {
  read,
  write
}