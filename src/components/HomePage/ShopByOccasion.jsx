import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';

const ShopByOccasion = () => {
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
                    <Row>
                        <Col md={3}>
                            <div className='heighautoimg'>
                                <a href="/" className='overlay'>
                                    <img src="../../../images/one.png" className='img-fluid' alt="" />
                                    <p>Wedding</p>
                                </a>
                            </div>
                            <div className='heighautoimg'>
                                <a href="/" className='overlay'>
                                    <img src="../../../images/one.png" className='img-fluid' alt="" />
                                    <p>Wedding</p>
                                </a>
                            </div>
                            <div className='heighautoimg'>
                                <a href="/" className='overlay'>
                                    <img src="../../../images/one.png" className='img-fluid' alt="" />
                                    <p>Wedding</p>
                                </a>
                            </div>
                        </Col>
                        <Col md={3}>
                            <div className='heighautoimg second_row '>
                                <a href="/" className='overlay'>
                                    <img src="../../../images/one.png" className='img-fluid' alt="" />
                                    <p>Wedding</p>
                                </a>
                            </div>
                            <div className='heighautoimg second_row'>
                                <a href="/" className='overlay'>
                                    <img src="../../../images/one.png" className='img-fluid' alt="" />
                                    <p>Wedding</p>
                                </a>
                            </div>
                            <div className='heighautoimg second_row'>
                                <a href="/" className='overlay'>
                                    <img src="../../../images/one.png" className='img-fluid' alt="" />
                                    <p>Wedding</p>
                                </a>
                            </div>
                        </Col>
                        <Col md={3}>
                            <div className='heighautoimg'>
                                <a href="/" className='overlay'>
                                    <img src="../../../images/one.png" className='img-fluid' alt="" />                                    
                                    <p>Wedding</p>
                                </a>
                            </div>
                            <div className='heighautoimg'>
                                <a href="/" className='overlay'>
                                    <img src="../../../images/one.png" className='img-fluid' alt="" />
                                    <p>Wedding</p>
                                </a>
                            </div>
                            <div className='heighautoimg'>
                                <a href="/" className='overlay'>
                                    <img src="../../../images/one.png" className='img-fluid' alt="" />
                                    <p>Wedding</p>
                                </a>
                            </div>
                        </Col>
                        <Col md={3}>
                            <div className='heighautoimg forth_row'>
                                <a href="/" className='overlay'>
                                    <img src="../../../images/one.png" className='img-fluid' alt="" />
                                    <p>Wedding</p>
                                </a>
                            </div>
                            <div className='heighautoimg forth_row'>
                                <a href="/" className='overlay'>
                                    <img src="../../../images/one.png" className='img-fluid' alt="" />
                                    <p>Wedding</p>
                                </a>
                            </div>
                        </Col>
                    </Row>
                </Col>
                <Col md={6}>
                    <div className='overlay position-relative'>
                        <img src="../../../images/one.png" alt="" />
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

export default ShopByOccasion
