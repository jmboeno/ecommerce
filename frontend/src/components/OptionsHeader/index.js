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

const options = ["CATEGORIAS", "FAVORITOS", "MINHA ESTANTE"];

const OptionsHeader = () => (
    <Options>
        {options.map((text, index) => (
            <Link to={`/${text.toLowerCase()}`}>
                <Option key={index}>
                    <p>{text}</p>
                </Option>
            </Link>
        ))}
    </Options>
);

export default OptionsHeader;