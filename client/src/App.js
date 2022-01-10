import './App.css';
import Graph from './components/Graph'
import { useState, useEffect } from 'react'

function App() {

  // create funtion for generating array
  const regenerate = (length, min = 0, max = 1000) => {
    let array = []
    for(let i=0; i<length; i++){
      array.push(Math.floor(Math.random()*(max-min) + min))
    }
    // console.log(array)
    return array
  }
  
  // create function for regenerating array on button click
  const redoRandomArray = () => {
    setArray(regenerate(100,5,1000))
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
          let temp = tempArray[i]
          tempArray[i] = tempArray[i+1]
          tempArray[i+1] = temp
          setArray([...tempArray])
        }
      }, 100)
    
    // Largest element is fixed, recur for remaining array
    bubbleSort(tempArray, n-1)
  }

  const quickSort = () => {
    let tempArray = array
  }

  const heapSort = (array) => {
    // sets n to lenght of array
    let tempArray = array
    let n = array.length

    // This loop sets the entire array into a heap
    for(let i=Math.floor(n/2)-1;i >=0; i-- ){
      setTimeout(()=>{
      heapify(tempArray, n, i)
      }, 100)
      setArray([...tempArray])
    }

    // This for loop swaps the first and last elements of the array
    for(let i = n-1; i > 0; i--){
      setTimeout(()=>{
      let temp = tempArray[0]
      tempArray[0] = tempArray[i]
      tempArray[i] = temp
      heapify(tempArray, i, 0)
      setArray([...tempArray])
      }, 1000)
    }
    setArray([...tempArray])
  }

  // function is uesed to turn an arry into a heap
  function heapify(arr, n, i){
    // sets the largest to i the parent of the heap
    let largest = i;
    // sets the childern for heap
    let l = 2*i+1
    let r = 2*i+2
    
    // test two childern to see if larger than head
    if(l < n && arr[l] > arr[largest])
      largest = l

    if(r < n && arr[r] > arr[largest])
      largest = r

    // if largest is not i then switch its location
    if(largest != i){
      let swap = arr[i]
      arr[i] = arr[largest]
      arr[largest] = swap
      // run heapify untill this if statement is not true
      heapify(arr, n, largest)
 
    }
  }


  // State for array
  const [array, setArray] = useState(regenerate(100,5,1000))
  useEffect(() => {
    console.log(array)
  }, [array])


  return (
    <div className="App">
      <button onClick={redoRandomArray}>Regenerate Array</button>
      <button onClick={()=>bubbleSort(array, array.length)}>Bubble Sort</button>
      <button onClick={quickSort}>Quick Sort</button>
      <button>Merge Sort</button>
      <button onClick={()=>heapSort(array)}>Heap Sort</button>

      <Graph array={array}/>
    </div>
  );
}

export default App;
