/**
 * A pure function that will compare two scalar arrays.
 * It will return true if the arrays are equal and false otherwise
 * Note: 'scalar' here means values that can be compared directly using === . So:
 * numbers, strings, objects by reference, functions by reference. See the MDN
 * reference(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Comparison_Operators)
 * for more info about the comparison operators
 * @param {Array1} array The first array to be compared
 * @param {Array2} array The seccond array to be compared
 * @returns {Boolean}
 */
function arraysAreEqual(array1:any[], array2:any[]){
    if(array1.length === array2.length && array1.every((value, index) => value === array2[index])){
        return true;
    } else {
        return false;
    }
}

const useArraysAreEqual= () => {
    return arraysAreEqual 
}

export default useArraysAreEqual