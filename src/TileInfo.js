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
  constructor() {
    this.exitPairs = []
    this.activeExitIndex = 0
  }

  contains(connection) {
    for(let exitPair of this.exitPairs) {
      if (exitPair & connection > 0) return true
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
    return contains(CONNECTIONS.LEFT_TOP)
  }
  get leftRight() {
    return contains(CONNECTIONS.LEFT_RIGHT)
  }
  get leftBottom() {
    return contains(CONNECTIONS.LEFT_BOTTOM)
  }
  get topBottom() {
    return contains(CONNECTIONS.TOP_BOTTOM)
  }
  get topRight() {
    return contains(CONNECTIONS.TOP_RIGHT)
  }
  get rightBottom() {
    return contains(CONNECTIONS.RIGHT_BOTTOM)
  }

  addExitPair(exitPair) {
    this.exitPairs.push(exitPair)
  }
}

export default TileInfo
export { CONNECTIONS }