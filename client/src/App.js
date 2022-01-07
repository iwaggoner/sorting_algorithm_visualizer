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


  // State for array
  const [array, setArray] = useState(regenerate(100,5,1000))
  // useEffect(() => {
  //   console.log(array)
  // }, [array])


  return (
    <div className="App">
      <button onClick={redoRandomArray}>Regenerate Array</button>
      <button onClick={()=>bubbleSort(array, array.length)}>Bubble Sort</button>
      <button>Quick Sort</button>
      <button>Merge Sort</button>

      <Graph array={array}/>
    </div>
  );
}

export default App;
