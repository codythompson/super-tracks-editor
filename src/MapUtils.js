export function getMapOffsets(visibleLength, tileLength, bufferCount, currentStartIndex, currentScrollOffset) {
  const scrollOffset = (currentScrollOffset%tileLength)+(bufferCount*tileLength)
  const startIndex = currentStartIndex + ((currentScrollOffset-scrollOffset)/tileLength)
  const endIndex = Math.trunc(visibleLength/tileLength)+bufferCount*2
  return {
    scrollOffset,
    startIndex,
    endIndex
  }
}
