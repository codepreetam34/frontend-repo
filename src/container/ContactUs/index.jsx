import React, { useEffect } from "react";
import { Card, CardContent, useMediaQuery } from "@mui/material";
import { Col, Container, Row } from "react-bootstrap";
import Header from "components/SearchBar/Header";
import Footer from "components/Footer/Footer";
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    contactUsContainer: {
        padding: "40px 100px",
        [theme.breakpoints.down("sm")]: {
          padding: "20px 20px",
        }
      },
}));


const ContactUs = () => {
    const classes = useStyles();
    const isMobile = useMediaQuery("(max-width:600px)");


    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, []);

    return (
        <>
            <Header />
            <Container fluid>
                <Row className={classes.contactUsContainer}>
                    <Card variant="outlined">
                        <CardContent sx={{ padding: isMobile ? "1rem" : "1rem 2rem" }}>

                            <div className="form-section">

                                <div className="left-sections">
                                    <h2>Contact Details</h2>

                                    <div className="contact-details phone">
                                        +917827291387 
                                        <span>&nbsp; Timings: 7:00 AM to 1:00 AM</span>
                                    </div>
                                    <div className="contact-details email">
                                        <a href="mailto:info@thewebgross.com">info@thewebgross.com</a>
                                        <br />
                                        <a href="mailto:thewebgross@gmail.com">thewebgross@gmail.com</a>
                                    </div>
                                    <div className="wedding-enquiry">
                                        <h2>For Media Enquiries</h2>
                                        <div className="address">
                                            <p><a href="mailto:pr@vibezter.com">pr@vibezter.com</a></p>
                                        </div>
                                    </div>
                                    <div className="wedding-enquiry">
                                        <h2>For Corporate Bulk Orders</h2>
                                        <div className="address">
                                            <p><a href="mailto:sale@vibezter.com">sale@vibezter.com</a></p>
                                        </div>
                                    </div>
                                    <div className="addresses">
                                        <h2>Our Offices</h2>
                                        <div className="address">
                                            <h4>Gurugram Branch</h4>
                                            <p>2nd Floor, Plot No. 4, Minarch Tower, Sector-44, Haryana-122003</p>
                                            <p><a href="https://maps.app.goo.gl/hRVdTKwaXqFo8RSK6" target="_blank">View on map</a></p>
                                        </div>
                                        <div className="address">
                                            <h4>Delhi Branch (HQ)</h4>
                                            <p>319, Aggarwal Millennium Tower 1, above bittu tikki wala, Netaji Subhash Place, Pitam Pura, New Delhi, Delhi 110034</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </Row>
            </Container >
            <Footer />
        </>
    );
};

export default ContactUs;
