import { Input } from "antd";
import React from "react";

const { Search } = Input;

const SEARCH_PROPS = {
    allowClear: true,
    enterButton: true,
    required: true,
};

const SearchBar = ({ placeholder = "Search...", onSearch }) => {
    return (
        <div className="mb-4">
            <Search
                {...SEARCH_PROPS}
                placeholder={placeholder}
                onSearch={onSearch}
            />
        </div>
    );
};

export default React.memo(SearchBar);
