import React from "react";
import styled from "@emotion/styled"

const StyledSelect = styled.select`
  padding: 8px 12px;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 16px;
  cursor: pointer;
  
  &:focus {
    border-color: ${({ theme }) => theme.colors.opacity.a};
    outline: none;
  }
`;

const Select = ({ options, onChange }) => {
	const handleChange = (e) => {
		onChange(e.target.value);
	};

	return (
		<StyledSelect onChange={handleChange}>
			{options.map(({ name, value }) => (
				<option key={value} value={value}>
					{name}
				</option>
			))}
		</StyledSelect>
	);
};

export default Select;