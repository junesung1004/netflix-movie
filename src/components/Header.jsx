import { Link } from "react-router-dom";
import { RiNetflixFill } from "react-icons/ri";
import styled from 'styled-components';
import Navigation from "./Navigation";
import Search from "./Search";

export default function Header() {
    return (
        <HeaderContainer>
            <h1 className="logo">
                <Link to='/'>
                    <RiNetflixFill />
                </Link>
            </h1>
            <Navigation/>

            <HeaderRight>
                <Search/>
            </HeaderRight>

        </HeaderContainer>
    )
}

const HeaderContainer = styled.header`
    position: fixed;
    top: 0px;
    left: 0px;
    display: flex;
    padding: 12px 24px;
    box-sizing: border-box;
    background: black;
    width: 100%;
    gap: 60px;
    z-index: 999;
    .logo{
        font-size : 30px;
        a{
            display: flex;
            align-items: center;
        }
        path{
            color :red
        }
    }
`

const HeaderRight = styled.div`
    margin-left: auto;
    display: flex;
    align-items : center;
`