import Storage from './Storage'

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
    lastAtlas: null
  })
  Storage.write({
    lastAtlas: fakeContent
  })
  expect(Storage.read()).toEqual({
    lastAtlas: fakeContent
  })
})

beforeEach(() => {
  const mockStorage = new MockLocalStorage()
  global.localStorage = mockStorage
})

afterEach(() => {
  global.localStorage = null
})