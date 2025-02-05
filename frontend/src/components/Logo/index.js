import React from "react";
import logo from "../../images/logo.svg";
import styled from "styled-components";

const LogoConatiner = styled.div`
    display: flex;
    font-size: 30px;
`;

const LogoImage = styled.img`
    margin-right: 10px;
`;

const Logo = () => (
    <LogoConatiner>
        <LogoImage
            src={logo}
            alt="logo"
        />
        <p><strong>Alura</strong>Books</p>
    </LogoConatiner>
);

export default Logo;