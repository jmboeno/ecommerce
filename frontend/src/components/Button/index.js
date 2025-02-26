import styled from "styled-components";

const buttonColors = {
    info: {
        backgroundColor: "#63b5fb",
        borderColor: "#a6d4fb",
        hoverColor: "#3798ec"
    },
    danger: {
        backgroundColor: "#ec5d5d",
        borderColor: "#ff7f7f",
        hoverColor: "#d83131"
    },
    success: {
        backgroundColor: "#13bc60",
        borderColor: "#19e777",
        hoverColor: "#229f5b"
    }
};

const buttonSizes = {
    small: {
        width: "56px",
        height: "20px"
    },
    medium: {
        width: "80px",
        height: "36px"
    },
    large: {
        width: "120px",
        height: "130px"
    }
}

const fontSizes = {
    small: "12px",
    medium: "14px",
    large: "16px"
}

export const Button = styled.button`
    background: ${props => buttonColors[props.color].backgroundColor};
    border: 1px solid ${props => buttonColors[props.color].borderColor};
    width: ${props => buttonSizes[props.size || 'medium'].width};
    height: ${props => buttonSizes[props.size || 'medium'].height};
    font-size: ${props => fontSizes[props.size || 'medium']};
    cursor: pointer;
    color: #fff;
    border-radius: 6px;
    font-weight: 600;
    &:hover {
        background: ${props => buttonColors[props.color].hoverColor};
    }
`;