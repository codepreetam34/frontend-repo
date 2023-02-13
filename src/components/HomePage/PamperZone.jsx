import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';

const PamperZone = () => {
  return (
    <div className='pamperzone'>
      <Container fluid>
            <Row>
                <Col md={12}>
                    <div className='heading_text'>
                        <h3>Pamper Zone</h3>
                    </div>
                </Col>
                <Col md={6}>
                    <div className='position-relative'>
                        <img src="../../../images/her.png" className='img-fluid' alt="" />
                        <div className='twobandata'>
                            <h4>Gift For Her</h4>
                            <a href="/">Shop Now</a>
                        </div>
                    </div>
                </Col>
                <Col md={6}>
                    <div className='position-relative'>
                        <img src="../../../images/him.png" className='img-fluid' alt="" />
                        <div className='twobandata'>
                            <h4>Gift For Him</h4>
                            <a href="/">Shop Now</a>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    </div>
  )
}

export default PamperZone
