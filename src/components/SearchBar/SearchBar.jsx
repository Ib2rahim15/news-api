import React from 'react'
import './SearchBar.css'
const SearchBar = ({GetRuslt}) => {

  const [searchValue, setSearchValue] = React.useState("");
  
  const handleChange = (event) => {
    setSearchValue(event.target.value);
    GetRuslt(event.target.value);
  }

  return (
    <>
      <div className='Search_Bar'>
        <div className='SuperSearchCon'>
          <div className="containerSearch">
            <input type="text" placeholder="Search..." value={searchValue} onChange={handleChange} />
            <div className="search" />
          </div>
        </div>
      </div>
    </>
  )
}

export default SearchBar
