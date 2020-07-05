/**
 * A pure version of Array.prototype.splice
 * It will return a new array rather than mutate the array
 * See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
 * @param {Array} array The target array
 * @param {number} start Index at which to start changing the array
 * @param {number} deleteCount An integer indicating the number of old array elements to remove
 * @param {any} items The elements to add to the array, beginning at the start index
 * @returns {Array}
 */
function pureSplice(array:[], start = 0, deleteCount = 0, ...items:any) {
    const arrayLength = array.length
    const _deleteCount = (deleteCount < 0) ? 0 : deleteCount
    let _start
    if (start < 0) {
      if (Math.abs(start) > arrayLength) {
        _start = 0
      } else {
        _start = arrayLength + start
      }
    } else if (start > arrayLength) {
      _start = arrayLength
    } else {
      _start = start
    }
    return [
      ...array.slice(0, _start),
      ...items,
      ...array.slice((_start + _deleteCount), arrayLength),
    ]
}

export default pureSplice;