import './App.css';
import Graph from './components/Graph'
import { useState, useEffect } from 'react'

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
    
    // Largest element is fixed, recur for remaining array
    bubbleSort(tempArray, n-1)
  }

  const quickSort = (array) => {
    // function for sorting each half of array
    const partition = (subArray, leftIndex, rightIndex) => {
      let pivot = subArray[Math.floor((leftIndex + rightIndex)/2)]//middle element
      let i = leftIndex
      let j = rightIndex
      while(i <= j){
        while(subArray[i] < pivot){
          i++//move i to the right until that element is greater than pivot (first element greater than pivot)
        }
        while(subArray[j] > pivot){
          j--//move j to the left until that element is less than pivot (first element less than pivot from left)
        }
        if(i <= j){
          swap(subArray, i, j)//swap the two elements
          i++
          j--
        }
      }
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
    // run on input array
    setArray([...divideAndConquer(array, 0, array.length - 1)])
  }


  // State for array
  const [array, setArray] = useState(regenerate(100,5,1000))
  // useEffect(() => {
  //   console.log(array)
  // }, [array])


  return (
    <div className="App">
      <button onClick={()=>setArray(regenerate(100,5,1000))}>Regenerate Array</button>
      <button onClick={()=>bubbleSort(array, array.length)}>Bubble Sort</button>
      <button onClick={()=>quickSort(array)}>Quick Sort</button>
      <button>Merge Sort</button>
      <button>Heap Sort</button>

      <Graph array={array}/>
    </div>
  );
}

export default App;
