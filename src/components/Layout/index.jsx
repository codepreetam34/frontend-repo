import React from 'react';
import { Helmet } from 'react-helmet';

const Layout = ({ title, description, children }) => {
    const defaultDescription = 'Web site created using create-react-app'; // Set your default description here
    const defaultTitle = 'Vibezter';

    return (
        <div>
            <Helmet>
                <title>{title || defaultTitle}</title>
                <meta name="description" content={description || defaultDescription} />
            </Helmet>
            {children}
        </div>
    );
};

export default Layout;
