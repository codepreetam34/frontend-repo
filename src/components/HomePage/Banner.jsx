import React, { useState } from 'react'   
import Slider from 'react-slick-slider';
import { Container, Row, Col } from 'react-bootstrap';
import BData from '../../JsonDatas/BannerData'

const Banner = () => {

    const [bannerdata, setBannerData] = useState (BData)

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        draggable: true,
        Margin: '100px',
        autoplay: false,
        arrows: false,
        slidesToShow: 1,
        slidesToScroll: 1
    };
      
    
  return (
    <div className='banner_slider'>
        <Container fluid>
            <Row>
                <Col md={12}>
                    <Slider {...settings}>
                        {bannerdata.map((bd, i) => (
                            <div className='banner_img' key={bd.id}> 
                                <img src={bd.thumbnailUrl} className='img-fluid' alt="" /> 
                                <div className='banner_content'> 
                                    <h3>{bd.title}</h3>
                                    <p>Cake | Flowers | Personalized Gift | Hampers</p>
                                    <a href="/">Gift Now</a>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </Col>
            </Row>  
        </Container> 
    </div>
  )
}

export default Banner