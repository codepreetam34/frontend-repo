// MenuItem.jsx
import React, { useState } from 'react';

const MenuItem = ({ item, depth, handleToggle }) => {
    const [isOpen, setIsOpen] = useState(false); // Local state for each menu item
    const hasChildren = item.children && item.children.length > 0;

    const toggleOpen = () => {
        setIsOpen(prevOpen => !prevOpen);
    };

    return (
        <li key={item.label} aria-label={item.label}>
            {hasChildren && (
                <span className={`toggle ${depth === 0 ? "parent" : (depth === 1 ? "firstChild" : "secondChild")} ${isOpen ? "open" : ""}`} ga-data-title={item.label} onClick={() => {toggleOpen(); handleToggle(item.label)}}>
                    {item.label}
                </span>
            )}
            {!hasChildren && (
                <a href={item.href} data-sbnavmenu={item.label} className="anchor">
                    {item.label}
                    {item.icon && <span className='ps-2' style={{ color: "#801317" }}>{item.icon}</span>}
                </a>
            )}
            {hasChildren && isOpen && (
                <ul className={`inner ${isOpen ? "innerDisplay" : ""}`} data-ga-category={`Header_Left_CategoryMenu_Level_${depth}`}>
                    {item.children.map((childItem, index) => (
                        <MenuItem key={index} item={childItem} depth={depth + 1} handleToggle={handleToggle} />
                    ))}
                </ul>
            )}
        </li>
    );
};

export default MenuItem;
