// import React, { Component, Fragment } from 'react'
import React, { useState, Fragment } from "react";
import { Route, Routes } from "react-router-dom";

// import AuthenticatedRoute from './components/shared/AuthenticatedRoute'
import Header from "./components/shared/Header";
import RequireAuth from "./components/shared/RequireAuth";
import Home from "./components/Home";
import SignUp from "./components/auth/SignUp";
import SignIn from "./components/auth/SignIn";
import SignOut from "./components/auth/SignOut";
import ChangePassword from "./components/auth/ChangePassword";
// import Data Pages
import AlgoTest from "./components/AlgoTest";
import MyScores from "./components/MyScores";

const App = () => {
  const [user, setUser] = useState(null);

  const clearUser = () => {
    setUser(null);
  };

  //----- STATE VARIABLES -----
  // State for busy doing one of the sorts
  const [busy, setBusy] = useState(false);
  // State for number array
  const [arrayHome, setArrayHome] = useState(generate(200, 5, 1000));
  const [arrayTestQuick, setArrayTestQuick] = useState(generate(100, 5, 1000));
  const [arrayTestBubble, setArrayTestBubble] = useState(
    generate(100, 5, 1000)
  );
  const [arrayTestMerge, setArrayTestMerge] = useState(generate(100, 5, 1000));
  const [arrayTestHeap, setArrayTestHeap] = useState(generate(100, 5, 1000));
  // State for animation delay
  const [delay, setDelay] = useState(20);

  function changeDelay(e) {
    setDelay(e.target.value);
  }

  // funtion for regenerating random number array
  function generate(length, min = 0, max = 1000) {
    let array = [];
    for (let i = 0; i < length; i++) {
      array.push(Math.floor(Math.random() * (max - min) + min));
    }
    return array;
  }
  // funtion for regenerating random number array
  function regenerate() {
    // let array = []
    // for(let i=0; i<length; i++){
    //   array.push(Math.floor(Math.random()*(max-min) + min))
    // }
    window.location.reload(false);
    // return array
  }

  // helper function for swapping items in an array
  function swap(array, index1, index2) {
    let temp = array[index1];
    array[index1] = array[index2];
    array[index2] = temp;
  }

  // async helper function for sleeping before swapping items in an array
  async function sleepThenSwap(array, index1, index2) {
    // Pause x milliseconds
    await sleep(delay);
    swap(array, index1, index2);
  }

  // async helper function for waiting so many milliseconds
  async function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // Bubble sort when press button
  async function bubbleSort(array, n, bTest) {
    if (!bTest) setBusy(true);
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
    // Base case
    if (n === 1) return;
    // After each pass, the largest element is pushed to the end
    for (let i = 0; i < n - 1; i++)
      if (array[i] > array[i + 1]) {
        // swap arr[i] and arr[i+1]
        await sleepThenSwap(array, i, i + 1);
        if (bTest) {
          setArrayTestBubble([...array]);
        } else {
          setArrayHome([...array]);
        }
      }

    // Largest element is moved to end, recur for remaining array
    bubbleSort(array, n - 1, bTest);
  }

  async function quickSort(array, bTest) {
    if (!bTest) setBusy(true);
    // function for sorting each half of array
    async function partition(subArray, leftIndex, rightIndex) {
      let pivot = subArray[Math.floor((leftIndex + rightIndex) / 2)]; //middle element
      let i = leftIndex;
      let j = rightIndex;
      while (i <= j) {
        while (subArray[i] < pivot) {
          i++; //move i to the right until that element is greater than pivot (first element greater than pivot)
        }
        while (subArray[j] > pivot) {
          j--; //move j to the left until that element is less than pivot (first element less than pivot from left)
        }
        if (i <= j) {
          await sleepThenSwap(subArray, i, j); //swap the two elements
          if (bTest) {
            await setArrayTestQuick([...subArray]);
          } else {
            await setArrayHome([...subArray]);
          }
          i++;
          j--;
        }
      }
      return i; //return pivot position
    }
    // recursive function to sort each half of array over and over
    // this is typically labeled 'quickSort'
    async function divideAndConquer(subArray, left, right) {
      if (subArray.length > 1) {
        let index = await partition(subArray, left, right);
        if (left < index - 1) {
          divideAndConquer(subArray, left, index - 1);
        }
        if (index < right) {
          divideAndConquer(subArray, index, right);
        }
      }
      return subArray;
    }
    //Go
    divideAndConquer(array, 0, array.length - 1);
  }

  async function mergeSort(array, bTest) {
    if (!bTest) setBusy(true);
    // Constant space version of merge (as opposed to linear space so this was is better)
    async function merge(arr, beg, mid, end, maxele) {
      let i = beg;
      let j = mid + 1;
      let k = beg;
      while (i <= mid && j <= end) {
        if (arr[i] % maxele <= arr[j] % maxele) {
          arr[k] = arr[k] + (arr[i] % maxele) * maxele;
          k++;
          i++;
        } else {
          arr[k] = arr[k] + (arr[j] % maxele) * maxele;
          k++;
          j++;
        }
      }
      while (i <= mid) {
        arr[k] = arr[k] + (arr[i] % maxele) * maxele;
        k++;
        i++;
      }
      while (j <= end) {
        arr[k] = arr[k] + (arr[j] % maxele) * maxele;
        k++;
        j++;
      }

      // Obtaining actual values
      for (i = beg; i <= end; i++) {
        arr[i] = Math.floor(arr[i] / maxele);
      }
      await sleep(delay);
      if (bTest) {
        await setArrayTestMerge([...arr]);
      } else {
        await setArrayHome([...arr]);
      }
    }

    // Recursive merge sort with extra parameter, maxele
    async function mergeSortRec(arr, beg, end, maxele) {
      if (beg < end) {
        let mid = Math.floor((beg + end) / 2);
        await mergeSortRec(arr, beg, mid, maxele);
        await mergeSortRec(arr, mid + 1, end, maxele);
        await merge(arr, beg, mid, end, maxele);
      }
    }

    // This functions finds max element and calls recursive merge sort.
    async function mergeSort(arr, n) {
      let maxele = Math.max(...arr) + 1;
      await mergeSortRec(arr, 0, n - 1, maxele);
    }
    //Go
    await mergeSort(array, array.length);
  }

  async function heapSort(array, bTest) {
    if (!bTest) setBusy(true);
    // sets n to length of array
    let tempArray = array;
    let n = array.length;
    // This loop sets the entire array into a heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      await heapify(tempArray, n, i);
      if (bTest) {
        await setArrayTestHeap([...tempArray]);
      } else {
        await setArrayHome([...tempArray]);
      }
    }

    // This for loop swaps the first and last elements of the array
    for (let i = n - 1; i > 0; i--) {
      swap(tempArray, i, 0);
      await heapify(tempArray, i, 0);
      if (bTest) {
        await setArrayTestHeap([...tempArray]);
      } else {
        await setArrayHome([...tempArray]);
      }
    }
  }
  // function is used to turn an array into a heap
  async function heapify(arr, n, i) {
    // sets the largest to i the parent of the heap
    let largest = i;
    // sets the childern for heap
    let l = 2 * i + 1;
    let r = 2 * i + 2;

    // test two childern to see if larger than head
    if (l < n && arr[l] > arr[largest]) largest = l;

    if (r < n && arr[r] > arr[largest]) largest = r;

    // if largest is not i then switch its location
    if (largest !== i) {
      await sleepThenSwap(arr, i, largest);
      // run heapify untill this if statement is not true
      await heapify(arr, n, largest);
    }
  }

  return (
    <Fragment>
      <Header user={user} />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              user={user}
              array={arrayHome}
              setArray={setArrayHome}
              regenerate={regenerate}
              bubbleSort={bubbleSort}
              quickSort={quickSort}
              mergeSort={mergeSort}
              heapSort={heapSort}
              delay={delay}
              changeDelay={changeDelay}
              busy={busy}
            />
          }
        />
        <Route
          path="/algo-test"
          element={
            <AlgoTest
              user={user}
              bubbleArray={arrayTestBubble}
              quickArray={arrayTestQuick}
              heapArray={arrayTestHeap}
              mergeArray={arrayTestMerge}
              setArrayBubble={setArrayTestBubble}
              setArrayQuick={setArrayTestQuick}
              setArrayHeap={setArrayTestHeap}
              setArrayMerge={setArrayTestMerge}
              bubbleSort={bubbleSort}
              quickSort={quickSort}
              mergeSort={mergeSort}
              heapSort={heapSort}
            />
          }
        />
        <Route path="/sign-up" element={<SignUp setUser={setUser} />} />
        <Route path="/sign-in" element={<SignIn setUser={setUser} />} />
        <Route
          path="/sign-out"
          element={
            <RequireAuth user={user}>
              <SignOut clearUser={clearUser} user={user} />
            </RequireAuth>
          }
        />
        <Route
          path="/change-password"
          element={
            <RequireAuth user={user}>
              <ChangePassword user={user} />
            </RequireAuth>
          }
        />
        <Route path="/my-scores" element={<MyScores user={user} />} />
      </Routes>
    </Fragment>
  );
};

export default App;
