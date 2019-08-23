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
    return this
  }
  setActiveExitIndex(exitIndex) {
    this.activeExitIndex = exitIndex
    return this
  }
}

export default TileInfo
export { CONNECTIONS }
