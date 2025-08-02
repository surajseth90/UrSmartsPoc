import React, { useState, useEffect, useRef } from "react";

const SearchableDropdown = ({
  options = [],
  searchKey = "label",
  onSelect,
  onNoOptionFound,
  placeholder = "Search...",
  disabled = false,
  defaultValue
}) => {

    console.log("defaultValue", defaultValue);
    

    console.log("disabled", disabled);
    
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const filtered = options.filter((opt) =>
      String(opt[searchKey]).toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredOptions(filtered);

    // if (
    //   searchTerm &&
    //   filtered.length === 0 &&
    //   typeof onNoOptionFound === "function"
    // ) {
    //   onNoOptionFound(searchTerm);
    // }
  }, [searchTerm, options, searchKey]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="position-relative w-100" ref={containerRef}>
      <input
        type="text"
        className="form-control"
        placeholder={placeholder}
        value={defaultValue || searchTerm}
        onFocus={() => setShowDropdown(true)}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setShowDropdown(true);
        }}
        disabled={disabled}
      />

      {showDropdown && (
        <ul
          className="list-group position-absolute w-100 mt-1 shadow"
          style={{ zIndex: 1000, maxHeight: "200px", overflowY: "auto" }}
        >
          {filteredOptions.length > 0 ? (
            filteredOptions.map((opt, idx) => (
              <li
                key={idx}
                className="list-group-item list-group-item-action cursor-pointer"
                onClick={() => {
                  if (disabled) return;
                  onSelect(opt);
                  setSearchTerm(opt[searchKey]);
                  setShowDropdown(false);
                }}
              >
                {opt[searchKey]}
              </li>
            ))
          ) : (
            <>
              <li className="list-group-item text-muted">No option found</li>
              {onNoOptionFound && typeof onNoOptionFound == "function" && (
                <li className="list-group-item text-muted">
                  <button onClick={onNoOptionFound}>Add Employee</button>
                </li>
              )}
            </>
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchableDropdown;
