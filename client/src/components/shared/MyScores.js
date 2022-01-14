import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'

const MyScores = (props) => {

    const [reset, setReset] = useState(false)
    // Fetch user's scores when page loads
    const [myScores, setMyScores] = useState([])
    useEffect(() => {
		const requestOptions = {
		  headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${props.user.token}`
		  },
		}
        fetch(`http://localhost:8000/scores/user/${props.user._id}`, requestOptions)
        .then(res => res.json())
        .then(foundObject=>{
            // Sets API data to state myScores
            console.log(foundObject)
            setMyScores(foundObject.myScores)
        })
    }, [reset])

    // Delete that score when they press Delete btn
    const deleteScore = (e) => {
        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${props.user.token}`
            },
        }
        fetch(`http://localhost:8000/scores/${e.target.id}`, requestOptions)
        .then(resBody => {
            setReset(!reset)
        })
    }

    // Style Objects
    const container = {
        margin: '100px'
      }
    const scoreStyle = {
        display: 'flex'
    }
    const columnStyle = {
        width: '200px'
    }
    const greenText = {
        color: 'green'
    }
    const redText = {
        color: 'red'
    }
    let arrDiv = <h3>No Scores Yet... Time to Test Your Knowledge!</h3>
    if(myScores[0]){
        arrDiv = myScores.map(score => {
            return <div style={scoreStyle}>
                <span style={columnStyle}>Bubble Sort: <span style={score.bBubble ? greenText:redText}>{score.bBubble ? 'Correct!' : 'Incorrect...'}</span></span>
                <span style={columnStyle}>Quick Sort: <span style={score.bQuick ? greenText:redText}>{score.bQuick ? 'Correct!' : 'Incorrect...'}</span></span>
                <span style={columnStyle}>Merge Sort: <span style={score.bMerge ? greenText:redText}>{score.bMerge ? 'Correct!' : 'Incorrect...'}</span></span>
                <span style={columnStyle}>Heap Sort: <span style={score.bHeap ? greenText:redText}>{score.bHeap ? 'Correct!' : 'Incorrect...'}</span></span>
                <span style={columnStyle}>Percentage: {score.percent}</span>
                <Button variant="danger" type="goBack" onClick={deleteScore} id={score._id}>
                    Delete
                </Button>
            </div>
        })
    }

    return (
        <div style={container}>
            <h1>MyScores</h1>
            {arrDiv}
        </div>
    )
}

export default MyScores