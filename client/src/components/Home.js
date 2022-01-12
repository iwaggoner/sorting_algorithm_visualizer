import { Carousel } from 'react-bootstrap'
import Graph from '../components/Graph'
import React, { useState, Fragment } from 'react'

// Bootstrap Components
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack'
import Cards from './homeComponents/Cards'
import CarouselImage from './homeComponents/Carousel'

// React Spring Components


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

const Home = (props) => {
	// const { msgAlert, user } = props
	console.log('props in home', props)


  //----- STATE VARIABLES -----
  // State for size of number array
  const [size, setSize] = useState('100')
  // State for number array
  const [array, setArray] = useState(regenerate(size,5,1000))
  // State for animation speed
  const [speed, setSpeed] = useState(20)

  function changeSize(e){
    setSize(e.target.value)
  }
  function changeSpeed(e){
    setSpeed(e.target.value)
  }

  // funtion for generating random number array
  function regenerate(length, min = 0, max = 1000){
    let array = []
    for(let i=0; i<length; i++){
      array.push(Math.floor(Math.random()*(max-min) + min))
    }
    return array
  }

  // helper function for swapping items in an array
  function swap(array, index1, index2){
    let temp = array[index1]
    array[index1] = array[index2]
    array[index2] = temp
  }

  // async helper function for sleeping before swapping items in an array
  async function sleepThenSwap(array, index1, index2){
    // Pause x milliseconds
    await sleepIsaac(speed)
    let temp = array[index1]
    array[index1] = array[index2]
    array[index2] = temp
  }

  // helper function to delay any line (helps for animation)
  // function sleep(milliseconds){
  //   const date = Date.now();
  //   let currentDate = null;
  //   do {
  //     currentDate = Date.now();
  //   } while (currentDate - date < milliseconds);
  // }

  // Trying to create different sleep funciton
  // found from video or stackover flow
  async function sleepIsaac(ms){
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  // Bubble sort when press button
  async function bubbleSort(array, n){
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

    // Recursive Solution
    let tempArray = array
    // Base case
    if (n===1) return
    // After each pass, the largest element is pushed to the end
    for(let i=0; i<n-1; i++)
        if(tempArray[i] > tempArray[i+1]){
          // swap arr[i] and arr[i+1]
          await sleepThenSwap(tempArray,i,i+1)
          // let temp = tempArray[i]
          // tempArray[i] = tempArray[i+1]
          // tempArray[i+1] = temp
          setArray([...tempArray])
        }
    
    // Largest element is moved to end, recur for remaining array
    bubbleSort(tempArray, n-1)
  }

  async function quickSort(array){
    // function for sorting each half of array
    async function partition(subArray, leftIndex, rightIndex){
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
            await sleepThenSwap(subArray, i, j)//swap the two elements
            await setArray([...subArray])
            i++
            j--
          }
        }
      // }, 100)
      return i//return pivot position
    }
    // recursive function to sort each half of array over and over
    // this is typically labeled 'quickSort'
    async function divideAndConquer(subArray, left, right){
      if(subArray.length > 1){
        let index = await partition(subArray, left, right)
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

  async function mergeSort(array){
    async function merge(arr,beg,mid,end,maxele){
      let i = beg
      let j = mid + 1
      let k = beg
      while (i <= mid && j <= end){
        if (arr[i] % maxele <= arr[j] % maxele){
          arr[k] = arr[k] + (arr[i] % maxele) * maxele
          k++
          i++
        } else {
          arr[k] = arr[k] + (arr[j] % maxele) * maxele
          k++
          j++
        }
      }
      while (i <= mid){
        arr[k] = arr[k] + (arr[i] % maxele) * maxele
        k++
        i++
      }
      while (j <= end){
        arr[k] = arr[k] + (arr[j] % maxele) * maxele
        k++
        j++
      }
  
      // Obtaining actual values
      for (i = beg; i <= end; i++){
        arr[i] = Math.floor(arr[i] / maxele)
      }
      await sleepIsaac(speed)
      await setArray([...arr])
    }
     
    // Recursive merge sort with extra parameter, maxele
    async function mergeSortRec(arr,beg,end,maxele){
      if (beg < end){
        let mid = Math.floor((beg + end) / 2)
        await mergeSortRec(arr, beg, mid, maxele)
        await mergeSortRec(arr, mid + 1, end, maxele)
        await merge(arr, beg, mid, end, maxele)
      }
    }
     
    // This functions finds max element and calls recursive merge sort.
    async function mergeSort(arr,n){
      let maxele = Math.max(...arr) + 1
      await mergeSortRec(arr, 0, n - 1, maxele)
    }
    //Go
    await mergeSort(array,array.length)
    // await setArray(array)
  }

  async function heapSort (array) {
    // sets n to length of array
    let tempArray = array
    let n = array.length
    // This loop sets the entire array into a heap
    for(let i=Math.floor(n/2)-1;i >=0; i-- ){
      await heapify(tempArray, n, i) 
      await setArray([...tempArray])
    }

    // This for loop swaps the first and last elements of the array
    for(let i = n-1; i > 0; i--){
      // let temp = tempArray[0]
      // tempArray[0] = tempArray[i]
      // tempArray[i] = temp
      swap(tempArray,i,0)
      await heapify(tempArray, i, 0)
      await setArray([...tempArray])
    }
    setArray([...tempArray])
  }
  // function is uesed to turn an arry into a heap
  async function heapify(arr, n, i){
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
    if(largest !== i){
      await sleepThenSwap(arr, i, largest)
      // run heapify untill this if statement is not true
      await heapify(arr, n, largest)
 
    }
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
            onClick={()=>setArray(regenerate(size,5,1000))}>
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
                  <input onChange={changeSpeed} type="range" min="1" max="100" value={speed} class="slider" id="animationSpeed"/>
                </div>
            </div>
            <div style={graph} className='flexContainer'>
              <Graph array={array}/>
            </div>
            <div className="flexContainer">
              <Button className='stackbutton' variant='secondary' onClick={()=>bubbleSort(array, array.length)}>Bubble Sort</Button>
              <Button className='stackbutton' variant='secondary' onClick={()=>quickSort(array)}>Quick Sort</Button>
              <Button className='stackbutton' variant='secondary' onClick={()=>mergeSort(array)}>Merge Sort</Button>
              <Button className='stackbutton' variant='secondary' onClick={()=>heapSort(array)}>Heap Sort</Button>
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
