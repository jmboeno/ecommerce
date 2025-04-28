import React from "react";
import profile from "../../images/perfil.svg";
import cart from "../../images/sacola.svg";
import styled from "styled-components";

const Icon = styled.li`
    margin-right: 40px;
    width: 25px;
`;

const Icons = styled.ul`
    display: flex;
    align-items: center;
`;

const icons = [profile, cart];

const IconsHeader = () => (
    <Icons>
        {icons.map((icon, index) => (
            <Icon key={index}>
                <img src={icon} alt="" className="icon"/>
            </Icon>
        ))}
    </Icons>
);

export default IconsHeader;