import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const TwoBanner = () => {
  return (
    <div className='twobannersection'>
        <Container fluid>
            <Row>
                <Col md={6}>
                    <div className='overlay position-relative'>
                        <img src="../../../images/one.png" className='img-fluid' alt="" />
                        <div className='twobandata'>
                            <h4>The Anniversary Edit</h4>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi, alias!</p>
                            <a href="/">Gift Now</a>
                        </div>
                    </div>
                </Col>
                <Col md={6}>
                    <div className='overlay position-relative'>
                        <img src="../../../images/two.png" className='img-fluid' alt="" />
                        <div className='twobandata'>
                            <h4>The Anniversary Edit</h4>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi, alias!</p>
                            <a href="/">Gift Now</a>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    </div>
  )
}

export default TwoBanner