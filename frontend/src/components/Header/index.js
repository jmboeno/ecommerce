import React from "react";
import Icons from "../IconsHeader";
import Logo from "../Logo";
import Options from "../OptionsHeader";
import styled from "styled-components";
import { Link } from "react-router-dom";

const HeaderContainer = styled.header`
    display: flex;
    justify-content: center;
    background-color: rgb(113 37 235);
`;

const Header = () => (
    <HeaderContainer>
        <Link to="/" style={{ textDecoration: "none" }}>
            <Logo />
        </Link>
        <Options />
        <Icons />
    </HeaderContainer>
);

export default Header;