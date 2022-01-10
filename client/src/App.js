import './App.css';
import Graph from './components/Graph'
import { useState } from 'react'
import { acceptsArray } from 'expres/utils';

function App() {

  // create funtion for generating random number array
  const regenerate = (length, min = 0, max = 1000) => {
    let array = []
    for(let i=0; i<length; i++){
      array.push(Math.floor(Math.random()*(max-min) + min))
    }
    return array
  }
  // helper function for swapping items in an array
  const swap = (array, index1, index2) => {
    let temp = array[index1]
    array[index1] = array[index2]
    array[index2] = temp
  }
  // helper function to delay any line (helps for animation)
  function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }

  // Bubble sort when press button
  const bubbleSort = (array, n) => {
    // Iterative Solution
    // let swapped = false
    // let tempArray = array
    // for(let i=0; i<tempArray.length; i++){
    //   swapped = false
    //   for(let j=0; j<tempArray.length-i-1; j++){
    //     if(tempArray[j] > tempArray[j+1]){
    //       let temp = tempArray[j]
    //       tempArray[j] = tempArray[j+1]
    //       tempArray[j+1] = temp
    //       swapped = true
    //     }
    //   }
    //   if(!swapped){break}
    // }
    // console.log(tempArray)

    // Recursive Solution
    let tempArray = array
    // Base case
    if (n===1) return
    // After each pass, the largest element is pushed to the end
    for(let i=0; i<n-1; i++)
      setTimeout(()=>{
        if(tempArray[i] > tempArray[i+1]){
          // swap arr[i] and arr[i+1]
          swap(tempArray,i,i+1)
          // let temp = tempArray[i]
          // tempArray[i] = tempArray[i+1]
          // tempArray[i+1] = temp
          setArray([...tempArray])
        }
      }, 100)
    
    // Largest element is moved to end, recur for remaining array
    bubbleSort(tempArray, n-1)
  }

  const quickSort = (array) => {
    // function for sorting each half of array
    const partition = (subArray, leftIndex, rightIndex) => {
      let pivot = subArray[Math.floor((leftIndex + rightIndex)/2)]//middle element
      let i = leftIndex
      let j = rightIndex
      // setTimeout(()=>{
        while(i <= j){
          while(subArray[i] < pivot){
            i++//move i to the right until that element is greater than pivot (first element greater than pivot)
          }
          while(subArray[j] > pivot){
            j--//move j to the left until that element is less than pivot (first element less than pivot from left)
          }
          if(i <= j){
            swap(subArray, i, j)//swap the two elements
            setArray([...subArray])
            i++
            j--
          }
        }
      // }, 100)
      return i//return pivot position
    }
    // recursive function to sort each half of array over and over
    // this is typically labeled 'quickSort'
    const divideAndConquer = (subArray, left, right) => {
      if(subArray.length > 1){
        let index = partition(subArray, left, right)
        if(left < index - 1){
          divideAndConquer(subArray, left, index-1)
        }
        if(index < right){
          divideAndConquer(subArray, index, right)
        }
      }
      return subArray
    }
    //Go
    divideAndConquer(array, 0, array.length - 1)
  }

  const mergeSort = (array) => {

    //helper function for merging 2 sorted arrays
    function merge(arrLeft, arrRight){
      let arrSorted = []
      //Loop until one of the arrays is empty
      while(arrLeft.length && arrRight.length){
        //arrLeft and arrRight are sorted so we only have to look at [0] at a time
        if(arrLeft[0] < arrRight[0]){
          arrSorted.push(arrLeft.shift())
        } else {
          arrSorted.push(arrRight.shift())
        }
      }
      // Only 1 of arrLeft or arrRight will be nonempty, so add it on and return
      return [...arrSorted, ...arrLeft, ...arrRight]
      // returns sorted array length that of arrLeft + arrRight
    }
    //function for recursively splitting array into smaller and smaller pieces and then merging the pieces back together sorted
    // this is typically labeled 'mergeSort'
    // let bool = true
    function divideAndConquer(array){
      // Base case
      if(array.length < 2) return array//singly sorted array
      
      const halfLength = array.length / 2
      //split array into arrLeft and array (Right half of original)
      const arrLeft = array.splice(0, halfLength)
      // if(bool){
      //   console.log('Left: ',arrLeft)
      //   console.log('\nRight: ',array)
      //   bool = false
      // }
      // recurse down the array splitting the array in half and
      // merging doubly large subArrays until the
      // left half and right half of the original array are finally merged the same
      return merge(divideAndConquer(arrLeft),divideAndConquer(array))
    }
    
    //Go
    setArray(divideAndConquer(array))
    // divideAndConquer(array)
  }


  //----- STATE VARIABLES -----
  // State for number array
  // const [array, setArray] = useState(regenerate(500,5,1000))
const [array, setArray] = useState(regenerate(300,5,1000))

  return (
    <div className="App">
      <button onClick={()=>setArray(regenerate(400,5,1000))}>Regenerate Array</button>
      <button onClick={()=>bubbleSort(array, array.length)}>Bubble Sort</button>
      <button onClick={()=>quickSort(array)}>Quick Sort</button>
      <button onClick={()=>mergeSort(array)}>Merge Sort</button>
      <button>Heap Sort</button>
      <label for='nArraySize'>Array Size: </label>
      <input type='number' id='nArraySize' value='400'/>

      <Graph array={array}/>
    </div>
  );
}

export default App;
