import Storage from './Storage'
import Atlas from './Atlas'

class MockLocalStorage {
  constructor() {
    this.items = {}
  }

  setItem(key, value) {
    this.items[key] = value
  }

  getItem(key) {
    return key in this.items? this.items[key] : null
  }

  removeItem(key) {
    delete this.items[key]
  }
}

test('Storage.read,Storage.write', () => {
  const fakeContent = `
  a line

another line
  `

  expect(Storage.read()).toEqual({
    lastAtlas: null,
    atlasDefaults: {
      width: 8,
      height: 8
    }
  })
  Storage.write({
    lastAtlas: fakeContent,
    atlasDefaults: {
      width: 9
    }
  })
  expect(Storage.read()).toEqual({
    lastAtlas: fakeContent,
    atlasDefaults: {
      width: 9,
      height: 8
    }
  })
})

test('Storage.readAtlas,writeAtlas', () => {
  const atlasContent = `
  *| o |   
   |* *|   
   | o |*  
-----------
   |  o|*  
   |* *|   
   |   |   
  `

  let atlas = new Atlas(8, 8)
  atlas.fill()
  expect(Storage.readAtlas().getRowArray()).toEqual(atlas.getRowArray())
  atlas = Atlas.parseAtlasContent(atlasContent)
  Storage.writeAtlas(atlas)
  expect(Storage.readAtlas().getRowArray()).toEqual(atlas.getRowArray())
})

beforeEach(() => {
  const mockStorage = new MockLocalStorage()
  Object.defineProperty(window, 'localStorage', {
    value: mockStorage
  })
})

afterEach(() => {
  delete window.localStorage
})