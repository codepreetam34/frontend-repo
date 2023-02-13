import React, {useState} from 'react'
import Slider from 'react-slick-slider';
import { Container, Row, Col } from 'react-bootstrap';
import Data from '../../JsonDatas/JsonData'

const TopCategory = () => {

    const [idata, setIdata] = useState (Data);

    const category_settings = {
        dots: false,
        infinite: true,
        speed: 500,
        draggable: true,
        Margin: '100px',
        centerMode: true,
        centerPadding: '0px',
        autoplay: false,
        arrows: true,
        slidesToShow: 6,
        slidesToScroll: 1
    };
    
  return (
    <div className='topcategory samecard'>
       <Container fluid>
            <Row>
                <Col md={12}>
                    <div className='heading_text'>
                        <h3>Top Categories</h3>
                    </div>
                </Col>
                <Col md={12}>
                    <Slider {...category_settings}>
                        {idata.map((idata, i) => (
                            <div className='banner_img text-center' key={idata.id}> 
                                <a href="/">
                                    <img src={idata.thumbnailUrl} className='img-fluid' alt="" /> 
                                    <div className='card_name'>
                                        <h4>Decoration</h4>
                                        <p>start from INR 2999</p>
                                    </div>
                                </a>
                            </div>
                        ))}
                    </Slider>
                </Col>
            </Row>
        </Container>
    </div>
  )
}

export default TopCategory
