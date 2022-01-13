import React, { useEffect, useState, Fragment } from 'react'


// import React, { useState, Fragment } from 'react'
import Graph from '../Graph'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'


const AlgoTest = (props) => {

    //----- STATE VARIABLES -----
    const [currentQuestion, setCurrentQuestion] = useState(1)
    const [arraySorted, setArraySorted] = useState(false)
    const [userScore, setuserScore] = useState({})

    useEffect(() => {
        runAgain()
    },[arraySorted]);

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
    const question = {
        fontSize: '15px',
        textAlign: 'center',
        width: '550px',
        margin: '0 auto',
        paddingBottom: '20px'
    }

    async function runAgain(){
        if(currentQuestion === 1){
            await props.heapSort(props.array, true)
            await props.setArray(props.regenerate(200,5,1000))
            setArraySorted(!arraySorted)
        }
        if(currentQuestion === 2){
            await props.mergeSort(props.array, true)
            await props.setArray(props.regenerate(200,5,1000))
            setArraySorted(!arraySorted)
        }
        if(currentQuestion === 3){
            await props.bubbleSort(props.array, props.array.length, true)
            // await props.setArray(props.regenerate(200,5,1000))
            setArraySorted(!arraySorted)
        }
        if(currentQuestion === 4){
            await props.quickSort(props.array, true)
            await props.setArray(props.regenerate(200,5,1000))
            setArraySorted(!arraySorted)
        }

    }

    function submitQuestion (e) {
        e.preventDefault()
        if(currentQuestion === 1){
            if(e.target[3].checked === true){
                setuserScore({...userScore, bHeap: true})
            } else {
                setuserScore({...userScore, bHeap: false}) 
            }
        }
        if(currentQuestion === 2){
            if(e.target[0].checked === true){
                setuserScore({...userScore, bMerge: true})
            } else {
                setuserScore({...userScore, bMerge: false}) 
            }
        }
        if(currentQuestion === 3){
            if(e.target[1].checked === true){
                setuserScore({...userScore, bBubble: true})
            } else {
                setuserScore({...userScore, bBubble: false}) 
            }
        }
        if(currentQuestion === 4){
            if(e.target[2].checked === true){
                setuserScore({...userScore, bQuick: true})
            } else {
                setuserScore({...userScore, bQuick: false}) 
            }
        }
        setCurrentQuestion(currentQuestion+1)
    }

    return (
        <>  
            <div style={container}>
                <h2 style={title}>Algo Test</h2>
                <h3 style={subtitle}>Question {currentQuestion}</h3>
                <p style={question}>Watch the animation and guess the sort?</p>
                <Graph array={props.array} arrColors={props.arrColors}/>
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
        </>
    )
}

export default AlgoTest