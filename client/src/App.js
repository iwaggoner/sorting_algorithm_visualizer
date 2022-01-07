import { shallowCopyFromList } from 'ejs/lib/utils';
import { acceptsArray } from 'expres/utils';
import './App.css';

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
  // populate an array with random digits on page load
  let array = regenerate(100,5,1000)
  // create function for regenerating array on button click
  const redoRandomArray = () => {
    array = regenerate(100,5,1000)
  }

  return (
    <div className="App">
      <button onClick={redoRandomArray}>Regenerate Array</button>
      
      <button>Merge Sort</button>
    </div>
  );
}

export default App;
