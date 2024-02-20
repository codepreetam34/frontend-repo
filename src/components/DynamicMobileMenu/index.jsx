import React, { useState } from 'react';
import MenuItem from './MenuItem';
import "./style.css";
import LogoutIcon from '@mui/icons-material/Logout';
import { FAQ, ORDER_PAGE } from 'Routes/Routes';
import { CircularProgress } from '@mui/material';

const DynamicMobileMenu = ({ categoryList, pincodeData, logoutHandler }) => {
    const [openParentState, setOpenParentState] = useState({});
    const [openFirstChildState, setOpenFirstChildState] = useState({});
    const [openSecondChildState, setOpenSecondChildState] = useState({});


    if (!categoryList || categoryList == undefined || categoryList == "") {
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "300px",
            }}
        >
            <CircularProgress color="primary" />
        </div>
    }

    const handleToggle = (label, level) => {
        if (level === 'parent') {
            setOpenParentState(prevState => {
                const newState = { [label]: !prevState[label] };

                Object.keys(prevState).forEach(key => {
                    if (key !== label) {
                        newState[key] = false;
                    }
                });

                setOpenFirstChildState({});
                setOpenSecondChildState({});
                return newState;
            });
        } else if (level === 'firstChild') {
            setOpenFirstChildState(prevState => ({ ...prevState, [label]: !prevState[label] }));
            setOpenSecondChildState({});
            Object.keys(openFirstChildState).forEach(key => {
                if (key !== label) {
                    setOpenFirstChildState(prevState => ({ ...prevState, [key]: false }));
                }
            });
        } else if (level === 'secondChild') {
            setOpenSecondChildState(prevState => ({ ...prevState, [label]: !prevState[label] }));
            Object.keys(openSecondChildState).forEach(key => {
                if (key !== label) {
                    setOpenSecondChildState(prevState => ({ ...prevState, [key]: false }));
                }
            });
        }
    };


    const menuItems = [
        {
            label: "Shop By Category & Tags",
            
            className: "parent-name",
            children: categoryList?.map(category => ({
                label: category.name,
                href: `/category-page/${category?._id}`,
                children: category?.tags.map(tag => ({
                    label: tag?.tagType,
                    children: tag?.names?.map(name => ({
                        label: name,
                        href: `/product-page/${category?._id}/${pincodeData}/${name}`
                    }))
                }))
            })),
        },
<<<<<<< HEAD
        // {
        //     label: "Shop By Category",
            
        //     className: "parent-name",
        //     children: categoryList?.map(category => ({
        //         label: category?.name,
        //         href: `/category-page/${category?._id}`,
        //     })),
        // },
=======
>>>>>>> ccf574029e75a70f9acf9a64a419d06757411b62

        {
            label: "My Orders",
            href: ORDER_PAGE,
            className: "parent-name"
        },
        {
            label: "Contact Us",
            href: "/contact-us",
            className: "parent-name"
        },
        {
            label: "FAQ",
            href: FAQ,
            className: "parent-name"
        },
        {
            label: "Log Out",
            icon: <LogoutIcon />,
            handleClick: logoutHandler,
            className: "parent-name"
        },
    ];

    return (
        <ul className="customLeftNav" data-ga-category="Header_Left_CategoryMenu">
            {menuItems.map((item, index) => (
                <>
                    <MenuItem
                        key={index}
                        item={item}
                        depth={0}
                        isOpen={{ ...openParentState, ...openFirstChildState, ...openSecondChildState }}
                        handleToggle={handleToggle}
                    />
                    {/* <div className='nav-bar-divider'/> */}
                </>
            ))}

        </ul>
    );
}

export default DynamicMobileMenu;
