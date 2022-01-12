import React from 'react'
import { Card, CardGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const cardstyle = {
    margin: '25px',
    height: '400px'
}
const image = {
    height: '80%',
    objectFit: 'cover'
}
const text = {
    textAlign: 'center',
    textDecoration: 'none',
    color: 'black',
    fontSize: '25px'
}

const Cards = () => {

    return (
        <div>
            <CardGroup >
                <Card style={cardstyle}>
                    <Card.Img variant="top" style={image} />
                    <Card.Body>
                        <Card.Text style={text}>
                            <Link to="/bubble-sort" scr='' style={text}>Bubble Sort</Link>
                        </Card.Text>
                    </Card.Body>
                </Card>
                <br />
                <Card style={cardstyle}>
                    <Card.Img variant="top" style={image} />
                    <Card.Body>
                        <Card.Text style={text}>
                            <Link to="/heap-sort" style={text}>Heap Sort</Link>
                        </Card.Text>
                    </Card.Body>
                </Card>
                <br />
                <Card style={cardstyle}>
                    <Card.Img variant="top" style={image} />
                    <Card.Body>
                        <Card.Text style={text}>
                            <Link to="/merge-sort" style={text}>Merge Sort</Link>
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Card style={cardstyle}>
                    <Card.Img variant="top" style={image} />
                    <Card.Body>
                        <Card.Text style={text}>
                            <Link to="/quick-sort" style={text}>Quick Sort</Link>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </CardGroup>
        </div>
    )
}

export default Cards