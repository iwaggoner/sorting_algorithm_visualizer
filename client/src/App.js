// import React, { Component, Fragment } from 'react'
import React, { useState, Fragment } from 'react'
import { Route, Routes } from 'react-router-dom'
import { v4 as uuid } from 'uuid'

// import AuthenticatedRoute from './components/shared/AuthenticatedRoute'
import AutoDismissAlert from './components/shared/AutoDismissAlert/AutoDismissAlert'
import Header from './components/shared/Header'
import RequireAuth from './components/shared/RequireAuth'
import Home from './components/Home'
import SignUp from './components/auth/SignUp'
import SignIn from './components/auth/SignIn'
import SignOut from './components/auth/SignOut'
import ChangePassword from './components/auth/ChangePassword'
import Graph from './components/Graph'
// Bootstrap Components
import Button from 'react-bootstrap/Button';

const App = () => {

  const [user, setUser] = useState(null)
  const [msgAlerts, setMsgAlerts] = useState([])

  console.log('user in app', user)
  console.log('message alerts', msgAlerts)
  const clearUser = () => {
    console.log('clear user ran')
    setUser(null)
  }

	const deleteAlert = (id) => {
		setMsgAlerts((prevState) => {
			return (prevState.filter((msg) => msg.id !== id) )
		})
	}

	const msgAlert = ({ heading, message, variant }) => {
		const id = uuid()
		setMsgAlerts(() => {
			return (
				[{ heading, message, variant, id }]
      )
		})
	}
	//----- STATE VARIABLES -----
  // State for size of number array
  const [size, setSize] = useState('100')
  // State for number array
  const [array, setArray] = useState(regenerate(size,5,1000))

  function chanageSize (e) {
    setSize(e.target.value)
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
    // Pause 10 ms
    await sleepIsaac(10)
    let temp = array[index1]
    array[index1] = array[index2]
    array[index2] = temp
  }

  // helper function to delay any line (helps for animation)
  function sleep(milliseconds){
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }

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

  function quickSort(array){
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
    function divideAndConquer(subArray, left, right){
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

  async function mergeSort(array){

    //helper function for merging 2 sorted arrays
    async function merge(arrLeft, arrRight){
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
      await sleepIsaac()
      await setArray([...arrSorted, ...arrLeft, ...arrRight])
      return 
      // returns sorted array length that of arrLeft + arrRight
    }
    //function for recursively splitting array into smaller and smaller pieces and then merging the pieces back together sorted
    // this is typically labeled 'mergeSort'
    function divideAndConquer(array){
      // Base case
      if(array.length < 2) return array//singly sorted array
      
      const halfLength = array.length / 2
      //split array into arrLeft and array (Right half of original)
      const arrLeft = array.splice(0, halfLength)
      // recurse down the array splitting the array in half and
      // merging doubly large subArrays until the
      // left half and right half of the original array are finally merged the same
      return merge(divideAndConquer(arrLeft),divideAndConquer(array))
    }
    
    //Go
    setArray(divideAndConquer(array))
    // divideAndConquer(array)
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
      let temp = tempArray[0]
      tempArray[0] = tempArray[i]
      tempArray[i] = temp
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
		<Fragment>
			<Header user={user} />
			<Routes>
				<Route path='/' element={<Home msgAlert={msgAlert} user={user} />} />
				<Route
					path='/sign-up'
					element={<SignUp msgAlert={msgAlert} setUser={setUser} />}
				/>
				<Route
					path='/sign-in'
					element={<SignIn msgAlert={msgAlert} setUser={setUser} />}
				/>
				<Route
					path='/sign-out'
					element={
						<RequireAuth user={user}>
							<SignOut msgAlert={msgAlert} clearUser={clearUser} user={user} />
						</RequireAuth>
					}
				/>
				<Route
					path='/change-password'
					element={
						<RequireAuth user={user}>
							<ChangePassword msgAlert={msgAlert} user={user} />
						</RequireAuth>}
				/>
			</Routes>
			{msgAlerts.map((msgAlert) => (
				<AutoDismissAlert
					key={msgAlert.id}
					heading={msgAlert.heading}
					variant={msgAlert.variant}
					message={msgAlert.message}
					id={msgAlert.id}
					deleteAlert={deleteAlert}
				/>
			))}


			<Button variant='secondary' onClick={()=>bubbleSort(array, array.length)}>Bubble Sort</Button>
      <Button variant='secondary' onClick={()=>quickSort(array)}>Quick Sort</Button>
      <Button variant='secondary' onClick={()=>mergeSort(array)}>Merge Sort</Button>
      <Button variant='secondary' onClick={()=>heapSort(array)}>Heap Sort</Button>
      <br></br>
      <Button variant='secondary' onClick={()=>setArray(regenerate(size,5,1000))}>Regenerate Array</Button>
      <label for='nArraySize'>Array Size: </label>
      <input type='number' id='nArraySize' onChange={chanageSize}/>
      
      <Graph array={array}/>
		</Fragment>
	)
}

export default App
