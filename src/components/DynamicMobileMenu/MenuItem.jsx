import React from 'react';

const MenuItem = ({ item, depth, isOpen, handleToggle }) => {
    const hasChildren = item.children && item.children.length > 0;
    const isCurrentOpen = isOpen && isOpen[item.label];

    const toggleOpen = (level) => {
        handleToggle(item.label, level);
    };

    return (
        <li key={item.label} aria-label={item.label}>
            {hasChildren && (
                <span className={`toggle ${depth === 0 ? "parent" : (depth === 1 ? "firstChild" : "secondChild")} ${isCurrentOpen ? "open" : ""}`} onClick={() => toggleOpen(depth === 0 ? 'parent' : (depth === 1 ? 'firstChild' : 'secondChild'))}>
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
