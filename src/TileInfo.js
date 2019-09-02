const CONNECTIONS = {
                              // 8421
                              // BRTL
  NONE                  : 0,  // 0000
  LEFT                  : 1,  // 0001
  TOP                   : 2,  // 0010
  RIGHT                 : 4,  // 0100
  BOTTOM                : 8,  // 1000

  LEFT_TOP              : 3,  // 0011
  LEFT_RIGHT            : 5,  // 0101
  LEFT_BOTTOM           : 9,  // 1001
  TOP_RIGHT             : 6,  // 0110
  TOP_BOTTOM            : 10, // 1010
  RIGHT_BOTTOM          : 12, // 1100

  LEFT_TOP_RIGHT        : 7,  // 0111
  LEFT_TOP_BOTTOM       : 11, // 1011
  LEFT_RIGHT_BOTTOM     : 13, // 1101
  TOP_RIGHT_BOTTOM      : 14, // 1110

  LEFT_TOP_RIGHT_BOTTOM : 15 // 1111
}

const CONNECTION_NAMES = {
  [CONNECTIONS.NONE]: 'NONE',
  [CONNECTIONS.LEFT]: 'LEFT',
  [CONNECTIONS.TOP]: 'TOP',
  [CONNECTIONS.RIGHT]: 'RIGHT',
  [CONNECTIONS.BOTTOM]: 'BOTTOM',

  [CONNECTIONS.LEFT_TOP]: 'LEFT_TOP',
  [CONNECTIONS.LEFT_RIGHT]: 'LEFT_RIGHT',
  [CONNECTIONS.LEFT_BOTTOM]: 'LEFT_BOTTOM',
  [CONNECTIONS.TOP_RIGHT]: 'TOP_RIGHT',
  [CONNECTIONS.TOP_BOTTOM]: 'TOP_BOTTOM',
  [CONNECTIONS.RIGHT_BOTTOM]: 'RIGHT_BOTTOM',

  [CONNECTIONS.LEFT_TOP_RIGHT]: 'LEFT_TOP_RIGHT',
  [CONNECTIONS.LEFT_TOP_BOTTOM]: 'LEFT_TOP_BOTTOM',
  [CONNECTIONS.LEFT_RIGHT_BOTTOM]: 'LEFT_RIGHT_BOTTOM',
  [CONNECTIONS.TOP_RIGHT_BOTTOM]: 'TOP_RIGHT_BOTTOM',

  [CONNECTIONS.LEFT_TOP_RIGHT_BOTTOM]: 'LEFT_TOP_RIGHT_BOTTOM'
}

class TileInfoError extends Error {}

class TileInfo {
  constructor(i, j) {
    this.i = i
    this.j = j
    this.exitPairs = []
    this.activeExitIndex = 0
  }

  containsExitPair(exitPair) {
    for(let thisExitPair of this.exitPairs) {
      if (exitPair === thisExitPair) return true
    }
    return false
  }

  get activeExitPair() {
    return this.exitPairs[this.activeExitIndex]
  }
  set activeExitPair(value) {
    for (let i = 0; i < this.exitPairs.length; i++) {
      if (this.exitPairs[i] === value) {
        this.activeExitIndex = i
        return
      }
    }
    // if reached, exit pair was not found
    throw new TileInfoError(`[TileInfo][set activeExitPair] exit pair ${CONNECTION_NAMES[value]} is not one of this tiles exit pairs`)
  }

  get leftTop() {
    return this.containsExitPair(CONNECTIONS.LEFT_TOP)
  }
  get leftRight() {
    return this.containsExitPair(CONNECTIONS.LEFT_RIGHT)
  }
  get leftBottom() {
    return this.containsExitPair(CONNECTIONS.LEFT_BOTTOM)
  }
  get topBottom() {
    return this.containsExitPair(CONNECTIONS.TOP_BOTTOM)
  }
  get topRight() {
    return this.containsExitPair(CONNECTIONS.TOP_RIGHT)
  }
  get rightBottom() {
    return this.containsExitPair(CONNECTIONS.RIGHT_BOTTOM)
  }

  get leftTopActive() {
    return this.activeExitPair === CONNECTIONS.LEFT_TOP
  }
  get leftRightActive() {
    return this.activeExitPair === CONNECTIONS.LEFT_RIGHT
  }
  get leftBottomActive() {
    return this.activeExitPair === CONNECTIONS.LEFT_BOTTOM
  }
  get topBottomActive() {
    return this.activeExitPair === CONNECTIONS.TOP_BOTTOM
  }
  get topRightActive() {
    return this.activeExitPair === CONNECTIONS.TOP_RIGHT
  }
  get rightBottomActive() {
    return this.activeExitPair === CONNECTIONS.RIGHT_BOTTOM
  }

  addExitPair(exitPair) {
    this.exitPairs = this.exitPairs
      .filter(existingExitPair => existingExitPair !== exitPair)
    this.exitPairs.push(exitPair)
  }

  replaceLast(exitPair) {
    this.exitPairs = this.exitPairs.slice(0, this.exitPairs.length-1)
    this.addExitPair(exitPair)
  }

  clone() {
    const clone = new TileInfo(this.i, this.j)
    clone.exitPairs = [...this.exitPairs]
    clone.activeExitIndex = this.activeExitIndex
    return clone
  }
}

export default TileInfo
export { CONNECTIONS }
