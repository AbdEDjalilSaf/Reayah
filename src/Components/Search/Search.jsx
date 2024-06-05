import React from "react";
import { useLocation } from "react-router";
function useQuery() {
    return new URLSearchParams(useLocation().search);
}
function Search() {
    const query = useQuery();
    const searchQuery = query.get("q");
    return <div>Search Query: {searchQuery}</div>;
}

export default Search;