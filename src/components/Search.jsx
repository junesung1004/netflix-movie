import React from "react";
import { BiSearch } from "react-icons/bi";
import styled from "styled-components";

export default function Search() {
  return (
    <>
      <SearchForm>
        <button className="search-btn">
          <BiSearch />
        </button>
      </SearchForm>
    </>
  );
}

const SearchForm = styled.form`
  display: flex;
  position: relative;
  top: 0px;
  left: 0px;
  .search-btn {
    color: white;
    font-size: 30px;
    display: flex;
    align-items: center;
  }
`;
