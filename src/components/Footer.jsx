import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import styled from "styled-components";

export default function Footer(){
    return(
        <FooterContainer>
            <ul className="footer-social">
                <li><a href="#" target="_blank"><FaFacebookF/></a></li>
                <li><a href="#" target="_blank"><FaInstagram/></a></li>
                <li><a href="#" target="_blank"><FaYoutube/></a></li>
            </ul>

            <ul className="footer-links">
                <li><a href="#" target="_blank">화면해설</a></li>
                <li><a href="#" target="_blank">고객센터</a></li>
                <li><a href="#" target="_blank">기프트카드</a></li>
                <li><a href="#" target="_blank">미디어센터</a></li>
                <li><a href="#" target="_blank">투자 정보(IR)</a></li>
                <li><a href="#" target="_blank">입사정보</a></li>
                <li><a href="#" target="_blank">이용 약관</a></li>
                <li><a href="#" target="_blank">개인정보</a></li>
                <li><a href="#" target="_blank">법적고지</a></li>
                <li><a href="#" target="_blank">쿠키 설정</a></li>
                <li><a href="#" target="_blank">회사 정보</a></li>
                <li><a href="#" target="_blank">문의하기</a></li>
            </ul>

            <div className="footer-info">
                <p>넷플릭스서비스코리아 유한회사 통신판매업신고번호 : 111-111-111 전화번호 : 02-111-1111(수신자 부담)</p>
                <p>대표 : 레지널드 숀 톰프슨</p>
                <p>이메일 주소 : aaa@aaa.com</p>
                <p>주소 : 대한민국 서울특별시 종로</p>
                <p>사업자 번호 : 111-111-111111</p>
                <p>클라우드 호스팅 : Amazon Web Service Inc.</p>
                <p><a href="#" target="_blank">공정거래위원회 사이트</a></p>
            </div>
        </FooterContainer>
    )
}

const FooterContainer = styled.footer`
    max-width: 920px;
    width: 100%;
    margin: 100px auto 0px;
    display: flex;
    flex-direction: column;
    gap: 30px;

    .footer-social{
        display: flex;
        font-size: 16px;
        gap: 20px;
        path{
            color: #fff;
        }
    }
    .footer-links{
        display: flex;
        flex-wrap: wrap;
        gap: 20px 0px;
        li{
            width: 25%;
            a{
                color: gray;
                display: block;
                font-size: 14px;
                &:hover{
                    text-decoration: underline;
                }
            }
        }
    }

    .footer-info{
        display: flex;
        flex-direction: column;
        gap: 10px;
        p{
            color: gray;
            font-size: 12px;
            a{
                color: gray;
                &:hover{
                    text-decoration: underline;
                }
            }
        }
    }
`