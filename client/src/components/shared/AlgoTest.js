import React, { useState, Fragment } from 'react'
// import React, { useState, Fragment } from 'react'
import Graph from '../Graph'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'


const AlgoTest = (props) => {

    // const [answers, setAnswers] = useState([])
    // State for size of number array
    const [size, setSize] = useState('100')
    // State for number array
    const [array, setArray] = useState(regenerate(size,5,1000))
    // State for colors array
    const [arrColors, setArrColors] = useState(new Array(size).fill('pink'))

    function regenerate(length, min = 0, max = 1000){
        let array = []
        for(let i=0; i<length; i++){
          array.push(Math.floor(Math.random()*(max-min) + min))
        }
        return array
    }
   

    // const questionArry = [<div></div>]


    // const currentQuestion = () =>{
    //     return (<div></div>)
    // }
    // const displayQuestion = Math.random()
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

    return (
        <>  
            <div style={container}>
                <h2 style={title}>Algo Test</h2>
                <h3 style={subtitle}>Question 1</h3>
                <p style={question}>Watch the animation and guess the sort?</p>
                <Graph array={array} arrColors={arrColors}/>
                <div className='flexContainer'>
                    <Form>
                        <Form.Group column='true' className="mb-3" controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Merge Sort" />
                            <Form.Check type="checkbox" label="Bubble Sort" />
                            <Form.Check type="checkbox" label="Quick Sort" />
                            <Form.Check type="checkbox" label="Heap Sort" />
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