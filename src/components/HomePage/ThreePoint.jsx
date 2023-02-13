import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';

const ThreePoint = () => {
  return (
    <div className='threepoint'>
      <Container>
        <Row>
            <Col md={4} className="text-center">
                <div className=''>
                  <img src="../../../images/world.png" className='img-fluid' alt="" />
                  <h3>Worldwide Delevery</h3>
                  <p>We deliver gifts to over 70 Countries</p>
                </div>
            </Col>
            <Col md={4} className="text-center">
                <img src="../../../images/diff-user.png" className='img-fluid' alt="" />
                <h3>100% Safe & Secure Payments</h3>
                <p>Pay using secure payment methods</p>
            </Col>
            <Col md={4} className="text-center">
                <div className=''>
                  <img src="../../../images/question.png" className='img-fluid' alt="" />
                  <h3>Dedicated Help Center</h3>
                  <p>Call us +91 9212422000 | 8:00AM-10:30PM</p>
                </div>
            </Col>
        </Row>
      </Container>
    </div>
  )
}

export default ThreePoint
