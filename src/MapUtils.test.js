import {getMapOffsets} from './MapUtils'

test('getMapOffsets().endIndex', () => {
  expect(getMapOffsets(1, 1, 0, 0, 0).endIndex).toBe(1)
  expect(getMapOffsets(1, 2, 0, 0, 0).endIndex).toBe(0)
  expect(getMapOffsets(1, 2, 1, 0, 0).endIndex).toBe(2)
  expect(getMapOffsets(10, 2, 0, 0, 0).endIndex).toBe(5)
  expect(getMapOffsets(11, 2, 0, 0, 0).endIndex).toBe(5)
  expect(getMapOffsets(11, 2, 3, 0, 0).endIndex).toBe(11)
})

test('getMapOffsets().startIndex', () => {
  expect(getMapOffsets(80, 20, 0, 0, 0).startIndex).toBe(0)
  expect(getMapOffsets(80, 20, 0, 0, 19.5).startIndex).toBe(0)
  expect(getMapOffsets(80, 20, 0, 0, 20).startIndex).toBe(1)
  expect(getMapOffsets(80, 20, 3, 0, 0).startIndex).toBe(-3)
  expect(getMapOffsets(80, 20, 3, 0, 19.5).startIndex).toBe(-3)
  expect(getMapOffsets(80, 20, 3, 0, 20).startIndex).toBe(-2)

  expect(getMapOffsets(82.3, 20, 0, 1, 0).startIndex).toBe(1)
  expect(getMapOffsets(82.3, 20, 0, 1, 19.5).startIndex).toBe(1)
  expect(getMapOffsets(82.3, 20, 0, 1, 20).startIndex).toBe(2)
  expect(getMapOffsets(82.3, 20, 1, 1, 0).startIndex).toBe(0)
  expect(getMapOffsets(82.3, 20, 1, 1, 19.5).startIndex).toBe(0)
  expect(getMapOffsets(82.3, 20, 1, 1, 20).startIndex).toBe(1)

  expect(getMapOffsets(30683, 305, 2, 3, 991.25).startIndex).toBe(4)
  expect(getMapOffsets(30683, 305, 2, 6, 76.25).startIndex).toBe(4)
})

test('getMapOffsets().scrollOffset', () => {
  expect(getMapOffsets(80, 20, 0, 0, 0).scrollOffset).toBe(0)
  expect(getMapOffsets(80, 20, 0, 0, 19.5).scrollOffset).toBe(19.5)
  expect(getMapOffsets(80, 20, 0, 0, 20).scrollOffset).toBe(0)
  expect(getMapOffsets(80, 20, 3, 0, 0).scrollOffset).toBe(60)
  expect(getMapOffsets(80, 20, 3, 0, 19.5).scrollOffset).toBe(79.5)
  expect(getMapOffsets(80, 20, 3, 0, 20).scrollOffset).toBe(60)

  expect(getMapOffsets(82.3, 20, 0, 1, 0).scrollOffset).toBe(0)
  expect(getMapOffsets(82.3, 20, 0, 1, 19.5).scrollOffset).toBe(19.5)
  expect(getMapOffsets(82.3, 20, 0, 1, 20).scrollOffset).toBe(0)
  expect(getMapOffsets(82.3, 20, 1, 1, 0).scrollOffset).toBe(20)
  expect(getMapOffsets(82.3, 20, 1, 1, 19.5).scrollOffset).toBe(39.5)
  expect(getMapOffsets(82.3, 20, 1, 1, 20).scrollOffset).toBe(20)

  expect(getMapOffsets(30683, 305, 2, 3, 991.25).scrollOffset).toBe(686.25)
  expect(getMapOffsets(30683, 305, 2, 6, 76.25).scrollOffset).toBe(686.25)
})