import React, { useState } from 'react';
import MenuItem from './MenuItem';
import "./style.css";
import LogoutIcon from '@mui/icons-material/Logout';

const DynamicMobileMenu = ({ categoryList, pincodeData }) => {
    // Initialize open state for the entire menu
    const [openState, setOpenState] = useState({});

    // Toggle the open state of a specific menu item// Toggle the open state of a specific menu item
// Toggle the open state of a specific menu item
const handleToggle = (label) => {
    setOpenState(prevOpenState => {
        const newState = { ...prevOpenState };

        // Close all items at the same depth level
        Object.keys(prevOpenState).forEach(itemLabel => {
            if (itemLabel !== label && itemLabel.startsWith(label.split('.')[0])) {
                newState[itemLabel] = false;
            }
        });

        // Toggle the state of the clicked menu item
        newState[label] = !prevOpenState[label];

        return newState;
    });
};


    // Define menu items
    const menuItems = [
        {
            label: "Shop By Category",
            children: categoryList.map(category => ({
                label: category.name,
                href: `/category-page/${category._id}`,
                children: category.tags.map(tag => ({
                    label: tag.tagType,
                    children: tag.names.map(name => ({
                        label: name,
                        href: `/product-page/${category._id}/${pincodeData}/${name}`
                    }))
                }))
            })),
        },
        {
            label: "My Orders",
            href: "/my-orders",
        },
        {
            label: "Contact Us",
            href: "/contact",
        },
        {
            label: "FAQ",
            href: "/faq",
        },
        {
            label: "Log Out",
            icon: <LogoutIcon />,
            href: "/logout",
        },
    ];

    // Render menu items
    console.log("Open state:", openState);
    return (
        <ul className="customLeftNav" data-ga-category="Header_Left_CategoryMenu">
            {menuItems.map((item, index) => (
                <MenuItem key={index} item={item} depth={0} isOpen={openState} handleToggle={handleToggle} />
            ))}

        </ul>
    );
}

export default DynamicMobileMenu;
