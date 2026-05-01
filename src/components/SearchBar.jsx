import React, { useEffect, useRef } from "react";

function SearchBar({ search, onSearchChange }) {
  const inputRef = useRef(null);

  
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <input
      ref={inputRef}
      type="text"
      placeholder="Kullanıcı ara..."
      value={search}
      onChange={(e) => onSearchChange(e.target.value)}
      style={{
        padding: "8px",
        width: "250px",
        borderRadius: "5px",
        border: "1px solid #ccc",
      }}
    />
  );
}
console.log("SearchBar render oldu");

export default React.memo(SearchBar);