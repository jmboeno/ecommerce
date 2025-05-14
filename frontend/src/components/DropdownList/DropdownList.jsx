import React from 'react'
import styled from "@emotion/styled";
import { useState } from "react";
import { StyledDropdownListItem } from "./StyledDropdownListItem";

const StyledLabel = styled.label`
	display: block;
	width: 100%;
	box-sizing: border-box;
	font-weight: 400;
	font-size: 20px;
	line-height: 24px;
	position: relative;
`;

const StyledButton = styled.button`
	cursor: pointer;
	display: block;
	height: 40px;
	width: 100%;
	font-size: 18px;
	outline: none;
	box-sizing: border-box;
	display: flex;
	align-items: center;
	justify-content: space-between;
	font-weight: 400;
	border-radius: 18px;
	border-bottom-left-radius: ${props => props.isOpen ? '0' : '18px'};
	border-bottom-right-radius: ${props => props.isOpen ? '0' : '18px'};
	margin-top: ${props => props.theme.spacings.xs};
	padding: ${props => props.theme.spacings.s};
	background: ${props => props.theme.colors.white};
	border: 1px solid ${props => props.theme.colors.neutral.a};
	&:focus {
		border-color: ${props => props.theme.colors.focus};
	}
`;

export const DropdownList = ({ title, options, value, onChange }) => {
	const [isOpen, toggleVisibility] = useState(false);
	const [focusedOption, setFocusedOption] = useState(null);

	const handleKeyboardEvent = (event) => {
		toggleVisibility(true);
		switch (event.key) {
		case 'ArrowDown':
			event.preventDefault();
			setFocusedOption(prevFocus => {
				if (prevFocus == null) {
					return 0;
				}
				if (prevFocus === (options.length - 1)) {
					return options.length - 1;
				}
				return prevFocus + 1;
			});
			break;
		case 'ArrowUp':
			event.preventDefault();
			setFocusedOption(prevFocus => {
				if (!prevFocus) {
					return 0;
				}
				return prevFocus - 1;
			});
			break;
		case 'Enter':
			event.preventDefault();
			setFocusedOption(null);
			toggleVisibility(false);
			onChange(options[focusedOption]);
			break;
		case 'Tab':
			setFocusedOption(null);
			toggleVisibility(false);
			break;
		case 'Escape':
			event.preventDefault();
			setFocusedOption(null);
			toggleVisibility(false);
			break;
		default:
			break;
		}
	};

	return (
		<StyledLabel>
			{title}
			<StyledButton
				isOpen={isOpen}
				onClick={() => toggleVisibility(!isOpen)}
				onKeyDown={handleKeyboardEvent}
				type="button"
			>
				<div>
					{value ? value.text : 'Select'}
				</div>
				<div>
					<span>{isOpen ? '▲' : '▼'}</span>
				</div>
			</StyledButton>
			{isOpen && options.map((option, index) => (
				<StyledDropdownListItem
					key={option.value}
					isActive={index === focusedOption}
					onClick={() => onChange(option)}
				>
					{option.text}
				</StyledDropdownListItem>
			))}
		</StyledLabel>
	);
};
