import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Options = styled.ul`
    display: flex;
`;

const Option = styled.li`
    font-size: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    height: 100%;
    padding: 0 5px;
    cursor: pointer;
    min-width: 120px;
`;

const OptionText = styled.p`
    color: #fff
`;

const options = ["RECARGAS", "APPS PARA DOWNLOAD", "TROCAS E DEVOLUÇÕES"];

const OptionsHeader = () => (
    <Options>
        {options.map((text, index) => (
            <Link to={`/${text.toLowerCase()}`} style={{textDecoration: "none"}}>
                <Option key={index}>
                    <OptionText>{text}</OptionText>
                </Option>
            </Link>
        ))}
    </Options>
);

export default OptionsHeader;