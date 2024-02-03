import React from 'react';

const MenuItem = ({ item, depth, openStates, handleToggle }) => {
    const isOpen = openStates[depth];
    const hasChildren = item.children && item.children.length > 0;
    return (
        <li key={item.label} aria-label={item.label}>
            {hasChildren && (
                <span className={`toggle ${depth === 0 ? "parent" : (depth === 1 ? "firstChild" : "secondChild")} ${isOpen ? "open" : ""}`} ga-data-title={item.label} onClick={() => handleToggle(depth)}>
                    {item.label}
                </span>
            )}
            {!hasChildren && (
                <a href={item.href} data-sbnavmenu={item.label} className="anchor">{item.label}</a>
            )}
            {hasChildren && isOpen && (
                <ul className={`inner ${isOpen ? "innerDisplay" : ""}`} data-ga-category={`Header_Left_CategoryMenu_Level_${depth}`}>
                    {item.children.map((childItem, index) => (
                        <MenuItem key={index} item={childItem} depth={depth + 1} openStates={openStates} handleToggle={handleToggle} />
                    ))}
                </ul>
            )}
        </li>
    );
};

export default MenuItem;
