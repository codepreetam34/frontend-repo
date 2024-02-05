import React from 'react';

const MenuItem = ({ item, depth, isOpen, handleToggle }) => {
    const hasChildren = item.children && item.children.length > 0;

    // Check if the current item is open
    const isCurrentOpen = isOpen && isOpen[item.label];

    const toggleOpen = () => {
        handleToggle(item.label);
    };

    return (
        <li key={item.label} aria-label={item.label}>
            {hasChildren && (
                <span className={`toggle ${depth === 0 ? "parent" : (depth === 1 ? "firstChild" : "secondChild")} ${isCurrentOpen ? "open" : ""}`} ga-data-title={item.label} onClick={toggleOpen}>
                    {item.label}
                </span>
            )}
            {!hasChildren && (
                <a href={item.href} data-sbnavmenu={item.label} className="anchor">
                    {item.label}
                    {item.icon && <span className='ps-2' style={{ color: "#801317" }}>{item.icon}</span>}
                </a>
            )}
            {hasChildren && isCurrentOpen && (
                <ul className={`inner ${isCurrentOpen ? "innerDisplay" : ""}`} data-ga-category={`Header_Left_CategoryMenu_Level_${depth}`}>
                    {item.children.map((childItem, index) => (
                        <MenuItem key={index} item={childItem} depth={depth + 1} isOpen={isOpen} handleToggle={handleToggle} />
                    ))}
                </ul>
            )}
        </li>
    );
};

export default MenuItem;
