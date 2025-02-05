import React from "react";
import Icons from "../IconsHeader";
import Logo from "../Logo";
import Options from "../OptionsHeader";
import styled from "styled-components";
import { Link } from "react-router-dom";

const HeaderContainer = styled.header`
    display: flex;
    justify-content: center;
    background-color: #fff;
`;

const Header = () => (
    <HeaderContainer>
        <Link to="/">
            <Logo />
        </Link>
        <Options />
        <Icons />
    </HeaderContainer>
);

export default Header;