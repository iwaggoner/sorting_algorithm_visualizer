import React, { useState } from "react"
import { Carousel } from "react-bootstrap"
import { Link } from 'react-router-dom'


const carstyle = {
  maxHeight: '400px',
  maxWidth: '100%',
  objectFit: 'cover',
  marginTop: '50px'
}

const CarouselImage = () => {
  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex)
  }

  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          style={carstyle}
          src="https://cdn2.opendemocracy.net/media/images/blackbox_key-visual_q9WYPIc.width-800.jpg"
          alt="First slide"
      />
      <Carousel.Caption>
        <h3>Visulizer</h3>
        <p>Click the link below or scroll down to find our easy to use sort visulizer </p>
        <Link to="/visulizer">Link</Link>
      </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          style={carstyle}
          src="https://cdn2.opendemocracy.net/media/images/blackbox_key-visual_q9WYPIc.width-800.jpg"
          alt="Second slide"
        />

      <Carousel.Caption>
        <h3>Community</h3>
        <p>Click the link below to find our page where users can share and save their faviorte sorting algrithm links</p>
        <Link to="/community">Link</Link>
      </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
        className="d-block w-100"
        style={carstyle}
        src="https://cdn2.opendemocracy.net/media/images/blackbox_key-visual_q9WYPIc.width-800.jpg"
        alt="Third slide"
        />

      <Carousel.Caption>
        <h3>Test</h3>
        <p>Click the link below to take our sorting algrithm test and sign in to save you score</p>
        <Link to="/algo-test">Link</Link>
      </Carousel.Caption>
    </Carousel.Item>
  </Carousel>
  )
}

export default CarouselImage