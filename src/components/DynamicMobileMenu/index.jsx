import React, { useState } from 'react';
import MenuItem from './MenuItem'; // Assuming MenuItem component is defined in a separate file
import "./style.css";

const DynamicMobileMenu = () => {
    const [openStates, setOpenStates] = useState([false, false, false]);

    const handleToggle = (index) => {
        const newOpenStates = [...openStates];
        newOpenStates[index] = !newOpenStates[index];
        setOpenStates(newOpenStates);
    };

    const menuItems = [
        {
            label: "Shop By Category",
            children: [
                {
                    label: "Cakes",
                    children: [
                        {
                            label: "By Featured",
                            children: [
                                { label: "All Cake", href: "/all-cakes-lp?promo=cakesmenu_hm" },
                                { label: "Best Sellers", href: "/cakes-bestsellers-lp?promo=cakesmenu_hm" },
                                { label: "Same Day Delivery", href: "/cakes-same-day-delivery-lp?promo=cakesmenu_hm" },
                                { label: "New Arrivals", href: "/new-arrival-cakes-lp?promo=cakesmenu_hm" },
                                { label: "Midnight Delivery", href: "/cakes-midnight-delivery-lp?promo=cakesmenu_hm" },
                                { label: "Flowers N Cakes", href: "/flowers-n-cakes-lp?promo=cakesmenu_hm" }
                            ]
                        }
                    ]
                }
            ]
        }
    ];

    return (
        <ul className="customLeftNav" data-ga-category="Header_Left_CategoryMenu">
            {menuItems.map((item, index) => (
                <MenuItem key={index} item={item} depth={0} openStates={openStates} handleToggle={handleToggle} />
            ))}
        </ul>
    );
};

export default DynamicMobileMenu;
