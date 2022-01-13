import Graph from '../components/Graph'
import React, { useState, Fragment } from 'react'

// Bootstrap Components
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack'
import Cards from './homeComponents/Cards'
import CarouselImage from './homeComponents/Carousel'

const Home = (props) => {

  //----- STATE VARIABLES -----
  // State for size of number array
  const [size, setSize] = useState('100')

  function changeSize(e){
    setSize(e.target.value)
  }
  const container = {
    marginTop: '100px'
  }
  const title = {
    frontSize: '40px',
    textAlign: 'center',
    margin: '50px'
  }
  const subtitle = {
    fontSize: '20px',
    textAlign: 'center',
    width: '550px',
    margin: '0 auto',
    paddingBottom: '20px'
  }
  
  const graph = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '400px',
    overflowX: 'auto',
    overflowY: 'auto',
    border: '5px solid black'
  }
  
	return (
		<>
			<div style={container}>
				<h2 style={title}>Algo Views</h2>
				<p style={subtitle}>This App was built to help you study and learn more on sorting algrithms</p>
        <br></br>
        <br></br>
        <Stack > 
          <div  className="flexContainer">
          <Button className='stackbutton'
            variant='secondary' 
            onClick={()=>props.setArray(props.regenerate(size,5,1000))}>
            Regenerate Array
          </Button>
            <label id='graph' for='nArraySize'>Array Size: </label>
            <input type='number' 
              id='nArraySize'
              value={size}
              onChange={changeSize}
              className='arrayinput'/>
                <div class="slidecontainer">
                  <label hmtlFor="animationSpeed">Animation Speed:</label>
                  <input onChange={props.changeDelay} type="range" min="1" max="100" value={props.delay} class="slider" id="animationSpeed"/>
                </div>
            </div>
            <div style={graph} className='flexContainer'>
              <Graph array={props.array} arrColors={props.arrColors}/>
            </div>
            <div className="flexContainer">
              <Button className='stackbutton' variant='secondary' onClick={()=>props.bubbleSort(props.array, props.array.length, false)}>Bubble Sort</Button>
              <Button className='stackbutton' variant='secondary' onClick={()=>props.quickSort(props.array, false)}>Quick Sort</Button>
              <Button className='stackbutton' variant='secondary' onClick={()=>props.mergeSort(props.array, false)}>Merge Sort</Button>
              <Button className='stackbutton' variant='secondary' onClick={()=>props.heapSort(props.array, false)}>Heap Sort</Button>
            </div>
          </Stack>
        
        <CarouselImage/>
        <h2 style={title}>Study Sorts</h2>
        <Cards/>
      </div>
		
		</>
	)
}

export default Home
