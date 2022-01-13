import React, { useState, Fragment } from 'react'
// import React, { useState, Fragment } from 'react'
import Graph from '../Graph'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'


const AlgoTest = (props) => {

    //----- STATE VARIABLES -----
    // const [answers, setAnswers] = useState([])

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
                <Graph array={props.array} arrColors={props.arrColors}/>
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