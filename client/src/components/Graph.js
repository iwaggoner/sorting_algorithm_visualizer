import React from 'react'
// import { useEffect } from 'react'

const Graph = ( props) => {

  const bars = props.array.map((element,index) => {
    return <div key={index} className="bar" style={{height:`${element/3}px`}}></div>
  })

  // useEffect(() => {
  //   // console.log(props.array)
  // }, [props.array])

  return (
    <div className="flexContainer">
      {bars}
    </div>
  )
}

export default Graph