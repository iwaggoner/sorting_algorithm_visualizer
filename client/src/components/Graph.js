import React from 'react'

const Graph = ( props) => {

  const bars = props.array.map((element,index) => {
    const style = {
      height: `${element/3}px`,
      backgroundColor: props.arrColors[index]
    }
    return <div key={index} className="bar" style={style}></div>
  })

  return (
    <div className="flexContainer">
      {bars}
    </div>
  )
}

export default Graph