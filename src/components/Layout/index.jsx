import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    layout: {
        opacity: 0,
        transition: `opacity ${theme.transitions.duration.standard}ms ${theme.transitions.easing.easeInOut}`,
    },
    loaded: {
        opacity: 1,
    },
}));

const Layout = ({ title, description, children }) => {
    const defaultDescription = 'Web site created using create-react-app'; // Set your default description here
    const defaultTitle = 'Vibezter';
    const classes = useStyles();
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        // Simulate the loading process
        setTimeout(() => {
            setLoaded(true);
        }, 1000);
    }, []); // Run the effect only once on mount

    return (
        <div className={`${classes.layout} ${loaded ? classes.loaded : ''}`}>
            <Helmet>
                <title>{title || defaultTitle}</title>
                <meta name="description" content={description || defaultDescription} />
            </Helmet>
            {children}
        </div>
    );
};

export default Layout;
