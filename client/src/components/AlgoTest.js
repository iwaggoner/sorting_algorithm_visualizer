import React, { useEffect, useState, Fragment } from 'react'
import { useNavigate } from 'react-router';


// import React, { useState, Fragment } from 'react'
import Graph from '../components/Graph'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'

const AlgoTest = (props) => {

    //----- STATE VARIABLES -----
    const [currentQuestion, setCurrentQuestion] = useState(1)
    const [userScore, setUserScore] = useState({})
    const [userPercent, setUserPercent] = useState(0)

    const navigate = useNavigate()

    useEffect(()=>{
        setUserPercent(0)
    }, [])

    useEffect(()=>{
        setUserScore({...userScore, precent: userPercent})
    }, [userPercent])

    useEffect(() => {
        runAgain()
    },[currentQuestion]);

    const container = {
        marginTop: '100px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
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
    const question = {
        fontSize: '15px',
        textAlign: 'center',
        width: '550px',
        margin: '0 auto',
        paddingBottom: '20px'
    }
    const button = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }

    function runAgain(){
        if(currentQuestion === 1){
            props.heapSort(props.heapArray, true)
        }
        if(currentQuestion === 2){
            props.mergeSort(props.mergeArray, true)   
        }
        if(currentQuestion === 3){
            props.quickSort(props.quickArray, true)   
        }
        if(currentQuestion === 4){
            props.bubbleSort(props.bubbleArray, props.bubbleArray.length, true)   
        }
        // if(currentQuestion > 4){
        //     props.setArrayBubble(props.regenerate(100,5,1000))
        // }
    }

    function submitQuestion (e) {
        e.preventDefault()
        console.log(userPercent)
        if(currentQuestion === 1){
            if(e.target[3].checked === true){
                setUserPercent(userPercent+25)
                setUserScore({...userScore, bHeap: 'true'})
            } else {
                setUserScore({...userScore, bHeap: 'false'})
            }
        }
        if(currentQuestion === 2){
            if(e.target[0].checked === true){
                setUserPercent(userPercent+25)
                setUserScore({...userScore, bMerge: 'true'})
            } else {
                setUserScore({...userScore, bMerge: 'false'}) 
            }
        }
        if(currentQuestion === 3){
            if(e.target[2].checked === true){
                setUserPercent(userPercent+25)
                setUserScore({...userScore, bQuick: 'true'})
            } else {
                setUserScore({...userScore, bQuick: 'false'}) 
            }
        }
        if(currentQuestion === 4){
            if(e.target[1].checked === true){
                setUserPercent(userPercent+25)
                setUserScore({...userScore, bBubble: 'true'})
            } else {
                setUserScore({...userScore, bBubble: 'false'}) 
            }
        }
        setCurrentQuestion(currentQuestion+1)
    }

    const postScore = (e) => {
        e.preventDefault()
        console.log(userScore.percent+'')
        let preJSONBody = {
          bHeap: userScore.bHeap,
          bMerge: userScore.bMerge,
          bQuick: userScore.bQuick,
          bBubble: userScore.bBubble,
          percent: userPercent,
          userId: props.user._id
        }
        const requestOptions = {
          method: 'POST',
          body: JSON.stringify(preJSONBody),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${props.user.token}`
          },
        }
        console.log(requestOptions.body)
        fetch('http://localhost:8000/scores', requestOptions)
          .then(postedScore=> {
            navigate('/my-scores')
          })
          .catch(err => console.error(err))
    }

    const body = () =>{

        if(currentQuestion < 5){
            return (
                <div style={container}>
                    <h2 style={title}>Algo Test</h2>
                    <h3 style={subtitle}>Question {currentQuestion}</h3>
                    <p style={question}>Watch the animation and guess the sort?</p>
                    <Graph array={currentQuestion == 1 ? props.heapArray : 
                                        (currentQuestion == 2 ? props.mergeArray : 
                                            (currentQuestion == 3 ? props.quickArray : 
                                                (currentQuestion == 4 ? props.bubbleArray : [])))} 
                                arrColors={props.arrColors}/>
                    <div className='flexContainer'>
                        <Form onSubmit={submitQuestion}>
                            <Form.Group column='true' className="mb-3" controlId="formBasicCheckbox">
                                <Form.Check type="radio" name="Value1" label="Merge Sort" />
                                <Form.Check type="radio" name="Value1" label="Bubble Sort" />
                                <Form.Check type="radio" name="Value1" label="Quick Sort" />
                                <Form.Check type="radio" name="Value1" label="Heap Sort" />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                        
                    </div>
                </div>  
            )
        } else{
            return (
                <div style={container}>
                    <h2 style={title}>Algo Test Completed</h2>
                    <h3 style={subtitle}>You got merge sort {userScore.bMerge? 'right' : 'wrong'}</h3>
                    <h3 style={subtitle}>You got quick sort {userScore.bQuick? 'right' : 'wrong'}</h3>
                    <h3 style={subtitle}>You got bubble sort {userScore.bBubble? 'right' : 'wrong'}</h3>
                    <h3 style={subtitle}>You got heap sort {userScore.bHeap? 'right' : 'wrong'}</h3>
                    {props.user ?<Button style={button} onClick={postScore}>Save Score</Button> : <p style={question}>Make sure you are signed in or you score will not be saved</p>}
                    <h1 style={title}>{userScore.precent}% was your score</h1>
                </div>
            )
        }
        
    }

    return (
        <>  
        {body()}
        </>
    )
}

export default AlgoTest