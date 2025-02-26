import { FaUser, FaCode, FaUsers, FaMoneyBill, FaShoppingCart } from "react-icons/fa";
import styled from "styled-components";

const SidebarContainer = styled.div`
  width: 300px;
  background: rgb(224 224 224);
  border-right: 1px solid #cdcdcd;
  display: flex;
  flex-direction: column;
  padding: 20px 0;
`;

const SidebarItem = styled.div`
  padding: 10px 26px;
  color: #888888;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  background: ${(props) => (props.isActive ? "#f0f0f0" : "transparent")};
  &:hover {
    background: #f0f0f0;
  }
`;

const adminOptions = [
  { icon: <FaUsers />, label: "Clientes", id: 1 },
  { icon: <FaMoneyBill />, label: "Recargas", id: 2 },
  { icon: <FaShoppingCart />, label: "Pagamentos", id: 3 },
];

const userOptions = [
  { icon: <FaUser />, label: "Dados", id: 1 },
  { icon: <FaCode />, label: "Meus Códigos", id: 2},
];

function Sidebar({ isAdmin, activeId, setActiveId }) {
  const options = isAdmin ? adminOptions : userOptions;
  
  return (
    <SidebarContainer>
      {options.map((option, index) => (
        <SidebarItem
          key={index}
          onClick={() => setActiveId(option.id)}
          isActive={activeId === option.id}
        >
          {option.icon} {option.label}
        </SidebarItem>
      ))}
    </SidebarContainer>
  );
}

export default Sidebar;