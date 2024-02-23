import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import {
    Typography,
    Grid,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
    Card,
    CardContent,
    Box,
} from '@mui/material';
import Footer from 'components/Footer/Footer';
import Header from 'components/SearchBar/Header';
import {

    Facebook, // Add this import for Facebook icon
    Twitter, // Add this import for Twitter icon
    Instagram, // Add this import for Instagram icon
    LinkedIn, // Add this import for LinkedIn iconOpenInNew
    OpenInNew,
} from '@mui/icons-material'; // Change the import statement to use @mui/icons-material

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(4),
        paddingBottom: "1rem",
    },
    contactDetails: {
        paddingRight: theme.spacing(4),
    },
    contactHeading: {
        marginBottom: theme.spacing(2),
    },
    contactText: {
        marginBottom: theme.spacing(4),
    },
    formControl: {
        marginBottom: theme.spacing(2),
    },
    contactBtn: {
        marginTop: theme.spacing(2),
    },
    socialLinksContainer: {
        marginTop: 'auto',
    },
    socialLink: {
        marginRight: theme.spacing(2),
        transition: 'color 0.3s ease',
        cursor:"pointer",
        '&:hover': {
            color: '#801317',  
        },
    },

}));

const ContactUs = () => {
    const classes = useStyles();
    const [query, setQuery] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [message, setMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleQueryChange = (event) => {
        setQuery(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission, e.g., sending data to backend
        // For demonstration purpose, just console.log the data
        console.log({ query, name, email, mobile, message });
        // Reset form fields and show confirmation message
        setQuery('');
        setName('');
        setEmail('');
        setMobile('');
        setMessage('');
        setSubmitted(true);
    };

    const handleNewRequest = () => {
        setSubmitted(false);
    };

    return (
        <>  <Header />
            <div className={classes.root}>

                <Grid container spacing={4}>
                    <Grid item xs={12} sm={6} className={classes.contactDetails}>
                        <Card>
                            <CardContent>
                                <Typography variant="h4" className={classes.contactHeading}>Contact Info</Typography>
                                <Typography variant="body1" className={classes.contactText}>
                                    It is very important to us to keep in touch with you, so we are always ready to answer any question that interests you. Shoot!
                                </Typography>

                                <div style={{
                                    paddingLeft: "20px",
                                    borderLeft: "4px solid rgb(221, 39, 69)",
                                    color: "rgb(0, 0, 0)",
                                    margin: "1rem 0"
                                }}>
                                    <Typography variant="body1">
                                        <strong>Email:</strong> support@vibezter.com
                                    </Typography>
                                </div>

                                <div style={{
                                    paddingLeft: "20px",
                                    borderLeft: "4px solid rgb(221, 39, 69)",
                                    color: "rgb(0, 0, 0)",
                                    margin: "1rem 0"
                                }}>
                                    <Typography variant="body1">
                                        <strong>Phone:</strong> +91-(22)4343-3333, +91-(22) 3965-0300
                                    </Typography>
                                </div>
                                <div className="addresses">
                                    <h4>Our Offices</h4>
                                    <div style={{
                                        paddingLeft: "20px",
                                        borderLeft: "4px solid rgb(221, 39, 69)",
                                        color: "rgb(0, 0, 0)",
                                        margin: "1rem 0"
                                    }}>
                                        <div className="address">
                                            <Typography variant="body1">
                                                <strong>Grugram Branch</strong></Typography>
                                            <p>2nd Floor, Plot No. 4, Minarch Tower, Sector-44, Haryana-122003</p>
                                        </div>
                                    </div>
                                    <p><a href="https://maps.app.goo.gl/hRVdTKwaXqFo8RSK6" target="_blank">View on map <OpenInNew/></a></p>
                                    <div style={{
                                        paddingLeft: "20px",
                                        borderLeft: "4px solid rgb(221, 39, 69)",
                                        color: "rgb(0, 0, 0)",
                                        margin: "1rem 0"
                                    }}>
                                        <div className="address">
                                            <Typography variant="body1">
                                                <strong>Delhi Branch (HQ)</strong></Typography>
                                            <p>319, Aggarwal Millennium Tower 1, above bittu tikki wala, Netaji Subhash Place, Pitam Pura, New Delhi, Delhi 110034</p>
                                        </div>
                                    </div>
                                </div>

                                <Box className={classes.socialLinksContainer}>
                                    <Typography variant="h6" className={classes.contactHeading}>Socials:</Typography>
                                    <div>
                                        <Facebook className={classes.socialLink} />
                                        <Twitter className={classes.socialLink} />
                                        <Instagram className={classes.socialLink} />
                                        <LinkedIn className={classes.socialLink} />
                                    </div>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Card>
                            <CardContent>
                                {submitted ? (
                                    <div>
                                        <Typography variant="h5">Thanks for contacting us.</Typography>
                                        <Typography variant="body1">Your message has been received and our customer care team will reach out to you soon.</Typography>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            className={classes.contactBtn}
                                            onClick={handleNewRequest}
                                        >
                                            Send a new Request
                                        </Button>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "1rem"
                                    }}>
                                        <Typography variant="h4" className={classes.contactHeading}>Send us a message</Typography>
                                        <FormControl variant="outlined" fullWidth className={classes.formControl}>
                                            <InputLabel>Type of Query *</InputLabel>
                                            <Select
                                                value={query}
                                                onChange={handleQueryChange}
                                                label="Type of Query *"
                                            >
                                                <MenuItem value="">Please select an option</MenuItem>
                                                <MenuItem value="Payment Related">Payment Related</MenuItem>
                                                <MenuItem value="I want to place a new order">I want to place a new order</MenuItem>
                                                <MenuItem value="Complaint">Complaint</MenuItem>
                                                <MenuItem value="Other">Other</MenuItem>
                                                <MenuItem value="Website Tech Issues">Website Tech Issues</MenuItem>
                                                <MenuItem value="Order Related">Order Related</MenuItem>
                                            </Select>
                                        </FormControl>
                                        <TextField
                                            required
                                            label="Full Name"
                                            variant="outlined"
                                            fullWidth
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className={classes.formControl}
                                        />
                                        <TextField
                                            required
                                            label="Email"
                                            type="email"
                                            variant="outlined"
                                            fullWidth
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className={classes.formControl}
                                        />
                                        <TextField
                                            required
                                            label="Mobile Number"
                                            variant="outlined"
                                            fullWidth
                                            value={mobile}
                                            onChange={(e) => setMobile(e.target.value)}
                                            className={classes.formControl}
                                        />
                                        <TextField
                                            required
                                            label="Message"
                                            multiline
                                            rows={4}
                                            variant="outlined"
                                            fullWidth
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                            className={classes.formControl}
                                        />
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            color="primary"
                                            className={classes.contactBtn}
                                        >
                                            Send request
                                        </Button>
                                    </form>
                                )}
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

            </div>
            <Footer />
        </>

    );
};

export default ContactUs;
