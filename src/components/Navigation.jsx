import { Link } from "react-router-dom";
import styled from 'styled-components';

export default function Navigation() {
    return (
        <Nav>
            <ul>
                <li><Link to='/'>홈</Link></li>
                <li><Link to='/'>TV 프로그램</Link></li>
                <li><Link to='/'>영화</Link></li>
                <li><Link to='/'>최신 콘텐츠</Link></li>
                <li><Link to='/'>내가 찜한 콘텐츠</Link></li>
            </ul>
        </Nav>
    )
}
const Nav = styled.nav`
    display: flex;
    align-items: center;
    ul{
        display:flex;
        gap: 24px;
        align-items: center;
        li{
            a{
                color: rgba(255,255,255,0.6);
                transition: 500ms;
                font-size : 14px;
                &:hover{
                    color : rgba(255,255,255,1);
                }
            }
        }
    }
`