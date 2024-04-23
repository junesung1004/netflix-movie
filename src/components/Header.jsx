import React from "react";
import { Link } from "react-router-dom";
import { RiNetflixFill } from "react-icons/ri";
import styled from "styled-components";
import Navigation from "./Navigation";
import Search from "./Search";

export default function Header() {
  return (
    <>
      <HeaderContainer>
        <h1 className="logo">
          <Link to="/">
            <RiNetflixFill /> {/* 이 태그 자체가 path 속성이다. */}
          </Link>
        </h1>
        <Navigation />
        <HeaderRight>
          <Search />
        </HeaderRight>
      </HeaderContainer>
    </>
  );
}

const HeaderContainer = styled.header`
  position: fixed;
  top: 0px;
  left: 0px;
  display: flex;
  box-sizing: border-box;
  background-color: black;
  width: 100%;
  gap: 60px;
  .logo {
    font-size: 30px;
    a {
      display: flex;
      align-items: center;
    }
    path {
      color: red;
    }
  }
`;

const HeaderRight = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
`;
