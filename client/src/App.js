import './App.css';
import Graph from './components/Graph'
import { useState } from 'react'

function App() {

  // create funtion for generating array
  const regenerate = (length, min = 0, max = 1000) => {
    let array = []
    for(let i=0; i<length; i++){
      array.push(Math.floor(Math.random()*(max-min) + min))
    }
    console.log(array)
    return array
  }
  
  // create function for regenerating array on button click
  const redoRandomArray = () => {
    setArray(regenerate(100,5,1000))
  }

  // State for array
  const [array, setArray] = useState(regenerate(100,5,1000))


  return (
    <div className="App">
      <button onClick={redoRandomArray}>Regenerate Array</button>
      <button>Merge Sort</button>

      <Graph array={array}/>
    </div>
  );
}

export default App;
