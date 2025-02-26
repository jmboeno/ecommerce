import React from "react";
import styled from "styled-components";

const LogoConatiner = styled.div`
    display: flex;
    font-size: 30px;
`;

const LogoText = styled.p`
    color: #fff;
`;

const Logo = () => (
    <LogoConatiner>
        <LogoText><strong>Smart</strong>Recarga</LogoText>
    </LogoConatiner>
);

export default Logo;