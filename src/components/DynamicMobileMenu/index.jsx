import React, { useState } from 'react';
import "./style.css"
import { useMediaQuery } from '@mui/material';


const MenuItem = ({ item }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };


    return (
        <li aria-label={item.label}>
            <span className={`toggle ${isOpen ? "parent open" : ""} ${item.firstChild ? 'firstChild' : item.secondChild ? 'secondChild' : ''}`} onClick={handleToggle}>{item.label}</span>
            {isOpen && item.children && (
                <ul className={`inner ${isOpen ? "innerDisplay" : ""}`}>
                    {item.children.map(child => (
                        <MenuItem key={child.label} item={child} />
                    ))}
                </ul>
            )}
        </li>
    );
};

const DynamicMobileMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);
    const [isOpen3, setIsOpen3] = useState(false);
    const [isOpen4, setIsOpen4] = useState(false);
    const [isOpen5, setIsOpen5] = useState(false);
    const [isOpen6, setIsOpen6] = useState(false);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };
    const handleToggle2 = () => {
        setIsOpen2(!isOpen2);
    };
    const handleToggle3 = () => {
        setIsOpen3(!isOpen3);
    };
    const handleToggle4 = () => {
        setIsOpen4(!isOpen4);
    };
    const handleToggle5 = () => {
        setIsOpen5(!isOpen5);
    };
    const handleToggle6 = () => {
        setIsOpen6(!isOpen6);
    };

    const menuData = [
        {
            label: 'Shop By Category',
            children: [
                {
                    label: 'Cakes',
                    firstChild: true,
                    children: [
                        {
                            label: 'By Featured',
                            secondChild: true,
                            children: [
                                { label: 'All Cake', href: '/all-cakes-lp?promo=cakesmenu_hm' },
                                { label: 'Best Sellers', href: '/cakes-bestsellers-lp?promo=cakesmenu_hm' },
                                // Add more items as needed
                            ]
                        },
                        // Add more subcategories as needed
                    ]
                },
                {
                    label: 'Flowers',
                    firstChild: true,
                    children: [
                        {
                            label: 'By Featured',
                            secondChild: true,
                            children: [
                                { label: 'All Flowers', href: '/all-flowers-lp?promo=flowersmenu_hm' },
                                { label: 'Best Sellers', href: '/flowers-bestsellers-lp?promo=flowersmenu_hm' },
                                // Add more items as needed
                            ]
                        },
                        // Add more subcategories as needed
                    ]
                },
                // Add more top-level categories as needed
            ]
        }
    ];

    return (
        <ul className="customLeftNav" data-ga-category="Header_Left_CategoryMenu">
            <li aria-label="Shop By Category">
                <span class={`toggle ${isOpen ? "parent open" : ""}`} tabindex="1" ga-data-title="Shop By Category" onClick={handleToggle}>Shop By Category</span>
                <ul class={`inner ${isOpen ? "innerDisplay" : ""}`} data-ga-category="Header_Left_CategoryMenu_Shop By Category">
                    <li aria-label="Cakes">
                        <span class={`toggle firstChild ${isOpen2 ? "open" : ""}`} ga-data-title="Cakes" onClick={handleToggle2}>Cakes</span>
                        <ul class={`inner  ${isOpen2 ? "innerDisplay" : ""}`} data-ga-category="Header_Left_CategoryMenu_Cakes">
                            <li aria-label="By Featured">
                                <span class={`toggle secondChild ${isOpen3 ? "open" : ""}`} ga-data-title="By Featured" onClick={handleToggle3}>By Featured</span>
                                <ul class={`inner  ${isOpen3 ? "innerDisplay" : ""}`}>
                                    <li>
                                        <a data-sbnavmenu="Shop By Category~Cakes~By Featured~All Cakes~1" href="/all-cakes-lp?promo=cakesmenu_hm">All Cake</a>
                                    </li>
                                    <li>
                                        <a data-sbnavmenu="Shop By Category~Cakes~By Featured~Best Sellers~2" href="/cakes-bestsellers-lp?promo=cakesmenu_hm">Best Sellers</a>
                                    </li>
                                    <li>
                                        <a data-sbnavmenu="Shop By Category~Cakes~By Featured~Same Day Delivery~3" href="/cakes-same-day-delivery-lp?promo=cakesmenu_hm">Same Day Delivery</a>
                                    </li>
                                    <li>
                                        <a data-sbnavmenu="Shop By Category~Cakes~By Featured~New Arrivals~4" href="/new-arrival-cakes-lp?promo=cakesmenu_hm">New Arrivals</a>
                                    </li>
                                    <li>
                                        <a data-sbnavmenu="Shop By Category~Cakes~By Featured~Midnight Delivery~5" href="/cakes-midnight-delivery-lp?promo=cakesmenu_hm">Midnight Delivery</a>
                                    </li>
                                    <li>
                                        <a data-sbnavmenu="Shop By Category~Cakes~By Featured~Flowers N Cakes~6" href="/flowers-n-cakes-lp?promo=cakesmenu_hm">Flowers N Cakes</a>
                                    </li>

                                </ul>
                            </li>
                            <li aria-label="By Occasion">
                                <span class={`toggle secondChild ${isOpen4 ? "open" : ""}`} ga-data-title="By Featured" onClick={handleToggle4}>By Occasion</span>
                                <ul class={`inner  ${isOpen4 ? "innerDisplay" : ""}`}>
                                    <li>
                                        <a data-sbnavmenu="Shop By Category~Cakes~By Featured~All Cakes~1" href="/all-cakes-lp?promo=cakesmenu_hm">All Cake</a>
                                    </li>
                                    <li>
                                        <a data-sbnavmenu="Shop By Category~Cakes~By Featured~Best Sellers~2" href="/cakes-bestsellers-lp?promo=cakesmenu_hm">Best Sellers</a>
                                    </li>
                                    <li>
                                        <a data-sbnavmenu="Shop By Category~Cakes~By Featured~Same Day Delivery~3" href="/cakes-same-day-delivery-lp?promo=cakesmenu_hm">Same Day Delivery</a>
                                    </li>
                                    <li>
                                        <a data-sbnavmenu="Shop By Category~Cakes~By Featured~New Arrivals~4" href="/new-arrival-cakes-lp?promo=cakesmenu_hm">New Arrivals</a>
                                    </li>
                                    <li>
                                        <a data-sbnavmenu="Shop By Category~Cakes~By Featured~Midnight Delivery~5" href="/cakes-midnight-delivery-lp?promo=cakesmenu_hm">Midnight Delivery</a>
                                    </li>
                                    <li>
                                        <a data-sbnavmenu="Shop By Category~Cakes~By Featured~Flowers N Cakes~6" href="/flowers-n-cakes-lp?promo=cakesmenu_hm">Flowers N Cakes</a>
                                    </li>

                                </ul>
                            </li>
                            <li aria-label="By Flavours">
                                <span class={`toggle secondChild ${isOpen5 ? "open" : ""}`} ga-data-title="By Featured" onClick={handleToggle5}>By Flavours</span>
                                <ul class={`inner  ${isOpen5 ? "innerDisplay" : ""}`}>
                                    <li>
                                        <a data-sbnavmenu="Shop By Category~Cakes~By Featured~All Cakes~1" href="/all-cakes-lp?promo=cakesmenu_hm">All Cake</a>
                                    </li>
                                    <li>
                                        <a data-sbnavmenu="Shop By Category~Cakes~By Featured~Best Sellers~2" href="/cakes-bestsellers-lp?promo=cakesmenu_hm">Best Sellers</a>
                                    </li>
                                    <li>
                                        <a data-sbnavmenu="Shop By Category~Cakes~By Featured~Same Day Delivery~3" href="/cakes-same-day-delivery-lp?promo=cakesmenu_hm">Same Day Delivery</a>
                                    </li>
                                    <li>
                                        <a data-sbnavmenu="Shop By Category~Cakes~By Featured~New Arrivals~4" href="/new-arrival-cakes-lp?promo=cakesmenu_hm">New Arrivals</a>
                                    </li>
                                    <li>
                                        <a data-sbnavmenu="Shop By Category~Cakes~By Featured~Midnight Delivery~5" href="/cakes-midnight-delivery-lp?promo=cakesmenu_hm">Midnight Delivery</a>
                                    </li>
                                    <li>
                                        <a data-sbnavmenu="Shop By Category~Cakes~By Featured~Flowers N Cakes~6" href="/flowers-n-cakes-lp?promo=cakesmenu_hm">Flowers N Cakes</a>
                                    </li>

                                </ul>
                            </li>
                            <li aria-label="By Types">
                                <span class={`toggle secondChild ${isOpen6 ? "open" : ""}`} ga-data-title="By Featured" onClick={handleToggle6}>By Types</span>
                                <ul class={`inner  ${isOpen6 ? "innerDisplay" : ""}`}>
                                    <li>
                                        <a data-sbnavmenu="Shop By Category~Cakes~By Featured~All Cakes~1" href="/all-cakes-lp?promo=cakesmenu_hm">All Cake</a>
                                    </li>
                                    <li>
                                        <a data-sbnavmenu="Shop By Category~Cakes~By Featured~Best Sellers~2" href="/cakes-bestsellers-lp?promo=cakesmenu_hm">Best Sellers</a>
                                    </li>
                                    <li>
                                        <a data-sbnavmenu="Shop By Category~Cakes~By Featured~Same Day Delivery~3" href="/cakes-same-day-delivery-lp?promo=cakesmenu_hm">Same Day Delivery</a>
                                    </li>
                                    <li>
                                        <a data-sbnavmenu="Shop By Category~Cakes~By Featured~New Arrivals~4" href="/new-arrival-cakes-lp?promo=cakesmenu_hm">New Arrivals</a>
                                    </li>
                                    <li>
                                        <a data-sbnavmenu="Shop By Category~Cakes~By Featured~Midnight Delivery~5" href="/cakes-midnight-delivery-lp?promo=cakesmenu_hm">Midnight Delivery</a>
                                    </li>
                                    <li>
                                        <a data-sbnavmenu="Shop By Category~Cakes~By Featured~Flowers N Cakes~6" href="/flowers-n-cakes-lp?promo=cakesmenu_hm">Flowers N Cakes</a>
                                    </li>

                                </ul>
                            </li>


                        </ul>
                    </li>
                </ul>
            </li>
        </ul>
    );
};

export default DynamicMobileMenu;
