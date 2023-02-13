import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
// import Data from '../../JsonDatas/JsonData'1

const ShopByOccasions = () => {
  return (
    <div className='shopbyocca'>
      <Container fluid>
            <Row>
                <Col md={12}>
                    <div className='heading_text'>
                        <h3>Shop By Occasions</h3>
                    </div>
                </Col>
                <Col md={6}>
                    <div className=''>

                    </div>
                </Col>
                <Col md={6}>
                    <div className='overlay position-relative'>
                        <img src="../../../images/one.png" className='img-fluid' alt="" />
                        <div className='twobandata'>
                            <h4>Birthday <br /> Celebration</h4>
                            <a href="/">Explore</a>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    </div>
  )
}

export default ShopByOccasions
