
import React, { useState, useRef, useEffect } from 'react';
import './styles.scss'; // Import custom CSS

const MultiSelectDropdown = ({ items, label = "Select items", selectedItems, setSelectedItems }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleSelectAll = () => {
        if (selectedItems.size === items.length) {
            setSelectedItems(new Set());
        } else {
            setSelectedItems(new Set(items));
        }
    };

    const handleItemToggle = (item) => {
        const newSelectedItems = new Set(selectedItems);
        if (newSelectedItems.has(item)) {
            newSelectedItems.delete(item);
        } else {
            newSelectedItems.add(item);
        }
        setSelectedItems(newSelectedItems);
    };

    const isAllSelected = items.length > 0 && selectedItems.size === items.length;
    const isIndeterminate = selectedItems.size > 0 && selectedItems.size < items.length;

    // Get display text for button
    const getButtonText = () => {
        if (selectedItems.size === 0) return label;
        if (selectedItems.size === 1) return Array.from(selectedItems)[0];
        if (selectedItems.size === items.length) return `All ${items.length} selected`;
        return `${selectedItems.size} selected`;
    };

    return (
        <div className="multiselect-dropdown" ref={dropdownRef}>
            <button className="dropdown-button" onClick={toggleDropdown}>
                {getButtonText()}
                <span className={`dropdown-arrow ${isOpen ? 'open' : ''}`}>▼</span>
            </button>

            {isOpen && (
                <div className="dropdown-menu show">
                    <label className="dropdown-item select-all">
                        <input
                            type="checkbox"
                            checked={isAllSelected}
                            ref={(input) => {
                                if (input) input.indeterminate = isIndeterminate;
                            }}
                            onChange={handleSelectAll}
                        />
                        <span>Select All</span>
                    </label>

                    {items.map((item, index) => (
                        <label key={index} className="dropdown-item">
                            <input
                                type="checkbox"
                                checked={selectedItems.has(item)}
                                onChange={() => handleItemToggle(item)}
                            />
                            <span>{item}</span>
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MultiSelectDropdown;