// import React, { Component, Fragment } from 'react'
import React, { useState, Fragment } from 'react'
import { v4 as uuid } from 'uuid'
import { Route, Routes } from 'react-router-dom'

// import AuthenticatedRoute from './components/shared/AuthenticatedRoute'
import Header from './components/shared/Header'
import RequireAuth from './components/shared/RequireAuth'
import Home from './components/Home'
import SignUp from './components/auth/SignUp'
import SignIn from './components/auth/SignIn'
import SignOut from './components/auth/SignOut'
import ChangePassword from './components/auth/ChangePassword'
// import Sorts
import HeapSort from './components/Sorts/HeapSort'
import QuickSort from './components/Sorts/QuickSort'
import MergeSort from './components/Sorts/MergeSort'
import BubbleSort from './components/Sorts/BubbleSort'
// import Data Pages
import AlgoTest from './components/shared/AlgoTest'
import Community from './components/shared/Community'
// Bootstrap Components
// import Button from 'react-bootstrap/Button';
// import Stack from 'react-bootstrap/Stack'

const App = () => {

  const [user, setUser] = useState(null)

  const clearUser = () => {
    console.log('clear user ran')
    setUser(null)
  }

	return (
		<Fragment>
			<Header user={user}/>
			<Routes>
				<Route
          path='/'
          element={<Home user={user} />}
        />
				<Route
					path='/sign-up'
					element={<SignUp setUser={setUser} />}
				/>
				<Route
					path='/sign-in'
					element={<SignIn setUser={setUser} />}
				/>
				<Route
					path='/sign-out'
					element={
						<RequireAuth user={user}>
							<SignOut clearUser={clearUser} user={user} />
						</RequireAuth>
					}
				/>
				<Route
					path='/change-password'
					element={
						<RequireAuth user={user}>
							<ChangePassword user={user} />
						</RequireAuth>}
				/>
        <Route
					path='/algo-test'
					element={<AlgoTest user={user} />}
				/>
        <Route
					path='/community'
					element={
							<Community user={user} />}
				/>
        <Route
					path='/merge-sort'
					element={
							<MergeSort user={user} />}
				/>
        <Route
					path='/bubble-sort'
					element={
							<BubbleSort user={user} />}
				/>
        <Route
					path='/heap-sort'
					element={
							<HeapSort user={user} />}
				/>
        <Route
					path='/quick-sort'
					element={
							<QuickSort user={user} />}
				/>
			</Routes>
      

      {/* <Stack> 
        <div className="flexContainer">
          <Button className='stackbutton'
            variant='secondary' 
            onClick={()=>setArray(regenerate(size,5,1000))}>
              Regenerate Array
          </Button>
          <label for='nArraySize'>Array Size: </label>
          <input type='number' 
            id='nArraySize' 
            onChange={chanageSize}
            className='arrayinput'/>
        </div>
        <div>
          <Graph array={array}/>
        </div>
        <div className="flexContainer">
          <Button className='stackbutton' variant='secondary' onClick={()=>bubbleSort(array, array.length)}>Bubble Sort</Button>
          <Button className='stackbutton' variant='secondary' onClick={()=>quickSort(array)}>Quick Sort</Button>
          <Button className='stackbutton' variant='secondary' onClick={()=>mergeSort(array)}>Merge Sort</Button>
          <Button className='stackbutton' variant='secondary' onClick={()=>heapSort(array)}>Heap Sort</Button>
        </div>
      </Stack> */}
		</Fragment>
	)
}

export default App