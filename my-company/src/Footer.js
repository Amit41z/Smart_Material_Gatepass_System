import React from 'react';
import styled from 'styled-components';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaYoutube, FaInstagram } from 'react-icons/fa';

const Footer = () => {
    return (
        <FooterContainer>
            <TopSection>
                <Links>
                    <StyledLink href="#">Disclaimer</StyledLink>|
                    <StyledLink href="#">Privacy Policy</StyledLink>|
                    <StyledLink href="#">Cookie Policy</StyledLink>|
                    <StyledLink href="#">Sitemap</StyledLink>
                </Links>
                <Social>
                    <FollowUs>FOLLOW US ON</FollowUs>
                    <a href="https://www.facebook.com/TataSteelLtd/" target="_blank" rel="noopener noreferrer">
                        <FaFacebookF color="#1877F2" />
                    </a>
                    <a href="https://x.com/Tatasteelltd" target="_blank" rel="noopener noreferrer">
                        <FaTwitter color="#1DA1F2" />
                    </a>
                    <a href="https://www.linkedin.com/company/tatasteelltd/mycompany/verification/" target="_blank" rel="noopener noreferrer">
                        <FaLinkedinIn color="#0077B5" />
                    </a>
                    <a href="https://www.youtube.com/user/Thetatasteel" target="_blank" rel="noopener noreferrer">
                        <FaYoutube color="#FF0000" />
                    </a>
                    <a href="https://www.instagram.com/tatasteelltd/" target="_blank" rel="noopener noreferrer">
                        <FaInstagram color="#C13584" />
                    </a>
                </Social>
            </TopSection>
            <BottomSection>
                <Copyright>© Copyright Tata Steel 2024. All rights reserved.</Copyright>
            </BottomSection>
        </FooterContainer>
    );
};

const FooterContainer = styled.footer`
    background-color: #333;
    color: #fff;
    padding: 10px 20px;
    margin-top: auto;
    width: 100%;
    box-sizing: border-box;
`;

const TopSection = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    width: 100%;
`;

const Links = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 10px;
    font-size:18px;
`;

const StyledLink = styled.a`
    color: #fff;
    margin: 0 10px;
    text-decoration: none;
    position: relative;
    transition: text-decoration 0.2s;

    &:hover {
        text-decoration: underline;
    }
`;

const Social = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex-wrap: nowrap;
    width: auto;

    a {
        margin: 0 5px;
        font-size: 25px;
    }
`;

const FollowUs = styled.span`
    margin-right: 10px;
`;

const BottomSection = styled.div`
    text-align: center;
    margin-top: 10px;
`;

const Copyright = styled.div``;

export default Footer;
