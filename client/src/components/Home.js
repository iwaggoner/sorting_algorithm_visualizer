import Graph from '../components/Graph'
import React from 'react'

// Bootstrap Components
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack'

const Home = (props) => {

  const container = {
    marginTop: '100px'
  }
  const title = {
    frontSize: '40px',
    textAlign: 'center',
  }
  const subtitle = {
    fontSize: '20px',
    textAlign: 'center',
    width: '650px',
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
				<h1 style={title}>AlgoViews</h1>
				<p style={subtitle}>This App was built to help you study and learn more on sorting algrithms</p>
        <br></br>
        <br></br>
        <Stack > 
          <div  className="inputContainer">
            <Button className='stackbutton'
              variant='secondary' 
              onClick={()=>props.setArray(props.regenerate())}>
              Regenerate Array
            </Button>
            <div className="slidecontainer">
              <label hmtlFor="animationSpeed">Animation Speed:</label>
              <input onChange={props.changeDelay} type="range" min="1" max="100" value={props.delay} className="slider" id="animationSpeed"/>
            </div>
          </div>
          <div style={graph} className='flexContainer'>
            <Graph array={props.array} arrColors={props.arrColors}/>
          </div>
          <div className="flexContainer">
            <Button disabled={props.busy} className='stackbutton' variant='secondary' onClick={()=>props.bubbleSort(props.array, props.array.length, false)}>Bubble Sort</Button>
            <Button disabled={props.busy} className='stackbutton' variant='secondary' onClick={()=>props.quickSort(props.array, false)}>Quick Sort</Button>
            <Button disabled={props.busy} className='stackbutton' variant='secondary' onClick={()=>props.mergeSort(props.array, false)}>Merge Sort</Button>
            <Button disabled={props.busy} className='stackbutton' variant='secondary' onClick={()=>props.heapSort(props.array, false)}>Heap Sort</Button>
          </div>
        </Stack>
        
      </div>
		
		</>
	)
}

export default Home
