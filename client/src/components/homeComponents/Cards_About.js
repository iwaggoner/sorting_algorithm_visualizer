import React from 'react'
import { Card, CardGroup } from 'react-bootstrap'

const cardstyle = {
    margin: '25px',
    height: '400px',
    border: "none"
}
const image = {
    // height: '80%',
    objectFit: 'cover',
    borderRadius: '50%'
}
const text = {
    textAlign: 'center',
    textDecoration: 'none',
    color: 'black',
    fontSize: '25px'
}
const link = {
    color: '#74AFA3'
}

const Cards = () => {

    return (
        <div>
            <CardGroup >
                <Card style={cardstyle}>
                    <Card.Img variant="top" src='https://media-exp1.licdn.com/dms/image/C4E03AQErywh-ObhcXQ/profile-displayphoto-shrink_400_400/0/1636826946318?e=1645056000&v=beta&t=G5y-uvS5AhnP4P1Fj9Nz3OmDREfyO_G4hfsvAonOVHE' style={image} />
                    <Card.Body>
                        <Card.Text style={text}>
                            <h4>Mackenzie Miller</h4>
                            <h6><a href="https://github.com/Mackmiller" style={link} target="_blank">Github</a></h6>
                            <h6><a href="https://www.linkedin.com/in/mackmiller-dev/" style={link} target="_blank">LinkedIn</a></h6>
                        </Card.Text>
                    </Card.Body>
                </Card>
                <br />
                <Card style={cardstyle}>
                    <Card.Img variant="top" src='https://media-exp1.licdn.com/dms/image/C4D03AQEM60PeYsCnsg/profile-displayphoto-shrink_400_400/0/1602781791357?e=1645056000&v=beta&t=W2DP_TTwjo5JI6OkQamqUxPY-6QNaityvsD3qpRIlXo' style={image} />
                    <Card.Body>
                        <Card.Text style={text}>
                            <h4>Isaac Newman</h4>
                            <h6><a href="https://github.com/isaac8069" style={link} target="_blank">Github</a></h6>
                            <h6><a href="https://www.linkedin.com/in/lonewman/" style={link} target="_blank">LinkedIn</a></h6>
                        </Card.Text>
                    </Card.Body>
                </Card>
                <br />
                <Card style={cardstyle}>
                    <Card.Img variant="top" src='https://media-exp1.licdn.com/dms/image/C4D03AQEWHHbxAv5cug/profile-displayphoto-shrink_400_400/0/1597330190093?e=1645056000&v=beta&t=nH70b6DiDZHY1iLqXRAlCypkTJKWFPMiqM_X74qi8og' style={image} />
                    <Card.Body>
                        <Card.Text style={text}>
                            <h4>Isaac Waggoner</h4>
                            <h6><a href="https://github.com/iwaggoner" style={link} target="_blank">Github</a></h6>
                            <h6><a href="https://www.linkedin.com/in/iwaggoner/" style={link} target="_blank">LinkedIn</a></h6>
                            </Card.Text>
                    </Card.Body>
                </Card>
                <br />
                <Card style={cardstyle}>
                    <Card.Img variant="top" src='https://media-exp1.licdn.com/dms/image/C5603AQHhWAYMpDoD9Q/profile-displayphoto-shrink_400_400/0/1581896475156?e=1645056000&v=beta&t=w90-0-fqvToz6iOUDf21Zmqo2IRlMml696PaFuagKrk' style={image} />
                    <Card.Body>
                        <Card.Text style={text}>
                            <h4>Michael Kohlberg</h4>
                            <h6><a href="https://github.com/mgkdn9" style={link} target="_blank">Github</a></h6>
                            <h6><a href="https://www.linkedin.com/in/michaelkohlberg/" style={link} target="_blank">LinkedIn</a></h6>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </CardGroup>
        </div>
    )
}

export default Cards