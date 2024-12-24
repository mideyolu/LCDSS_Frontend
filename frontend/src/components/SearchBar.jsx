import React from "react";
import { Input } from "antd";

const { Search } = Input;

const SearchBar = ({ placeholder, onSearch }) => {
    return (
        <div className="mb-4">
            <Search
                placeholder={placeholder || "Search..."}
                allowClear
                onSearch={onSearch}
                enterButton
            />
        </div>
    );
};

export default SearchBar;
