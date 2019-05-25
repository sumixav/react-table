import React, { useContext } from 'react'
import { UserContext } from '../context';


const Search = () => {
    const context = useContext(UserContext)
    const { handleSearch } = context;

    const handleChange = (e) => {
        handleSearch(e.target.value)
    }
    return (
        <input name="text"
            className="searchinput"
            type="text"
            placeholder="Search by First Name"
            onChange={handleChange}
        />
    )
}

export default Search
