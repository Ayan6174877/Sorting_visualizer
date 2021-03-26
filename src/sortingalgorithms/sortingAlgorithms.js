// Algorithm for quick sort using recursion
export const quickSort = array => {
   // const animations = [];
    if (array.length <= 1){
        return array;
    }

    const pivot = array[array.length - 1]; // pick the last element
    const leftArray = [];
    const rightarray = [];
    for (const el of array.slice(0,array.length - 1)){
        el < pivot ? leftArray.push(el) : rightarray.push(el)
    }
    return [...quickSort(leftArray), pivot, ...quickSort(rightarray)];
}

// Algorithm for merge sort
// const merge = (leftArray, rightArray) => {
//     const outputArray = [];
  
//     while(leftArray.length && rightArray.length){
//         if(leftArray[0] < rightArray[0]){
//             outputArray.push(leftArray.shift());
//         }
//         else{
//             outputArray.push(rightArray.shift());
//         }
//     }

//     return outputArray.concat(leftArray.slice()).concat(rightArray.slice());
// }

// export const mergeSort = array => {
//     // edge case
//     if(array.length <= 1){
//         return array;
//     }

//     const midddleIndex = Math.floor(array.length/2);
//     const leftArray = array.slice(0, midddleIndex);
//     const rightArray = array.slice(midddleIndex);

//     return merge(
//         mergeSort(leftArray),
//         mergeSort(rightArray)
//     );
// }

export function getMergeSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    const auxiliaryArray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
    return animations;
  }
  
  function mergeSortHelper(
    mainArray,
    startIdx,
    endIdx,
    auxiliaryArray,
    animations,
  ) {
    if (startIdx === endIdx) return;
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
    mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
    doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
  }
  
  function doMerge(
    mainArray,
    startIdx,
    middleIdx,
    endIdx,
    auxiliaryArray,
    animations,
  ) {
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;
    while (i <= middleIdx && j <= endIdx) {
      // These are the values that we're comparing; we push them once
      // to change their color.
      animations.push([i, j]);
      // These are the values that we're comparing; we push them a second
      // time to revert their color.
      animations.push([i, j]);
      if (auxiliaryArray[i] <= auxiliaryArray[j]) {
        // We overwrite the value at index k in the original array with the
        // value at index i in the auxiliary array.
        animations.push([k, auxiliaryArray[i]]);
        mainArray[k++] = auxiliaryArray[i++];
      } else {
        // We overwrite the value at index k in the original array with the
        // value at index j in the auxiliary array.
        animations.push([k, auxiliaryArray[j]]);
        mainArray[k++] = auxiliaryArray[j++];
      }
    }
    while (i <= middleIdx) {
      // These are the values that we're comparing; we push them once
      // to change their color.
      animations.push([i, i]);
      // These are the values that we're comparing; we push them a second
      // time to revert their color.
      animations.push([i, i]);
      // We overwrite the value at index k in the original array with the
      // value at index i in the auxiliary array.
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    }
    while (j <= endIdx) {
      // These are the values that we're comparing; we push them once
      // to change their color.
      animations.push([j, j]);
      // These are the values that we're comparing; we push them a second
      // time to revert their color.
      animations.push([j, j]);
      // We overwrite the value at index k in the original array with the
      // value at index j in the auxiliary array.
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  
