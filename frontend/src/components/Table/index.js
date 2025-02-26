import { useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { getUsers } from "../../services/users";
import { getRecharges } from "../../services/recharges";
import { getPayments } from "../../services/payments";
import { Button } from "../Button";

const TableContent = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

const Th = styled.th`
  background: #7125eb;
  color: white;
  padding: 10px;
`;

const Td = styled.td`
  padding: 10px;
  border: 1px solid #ddd;
  text-align: center;
`;

const ActionTd = styled(Td)`
  width: 120px;
`;

const ActionGroupButton = styled.div`
  display: flex;
  justify-content: space-between;
`;

const adminFeatures = {
  1: getUsers,
  2: getRecharges,
  3: getPayments
};

const userFeatures = {};

function Table({ isAdmin, activeId }) {
  const [data, setData] = useState([]);
  const options = useMemo(() => isAdmin ? adminFeatures : userFeatures, [isAdmin]);
  const headers = useMemo(() => data.length && Object.keys(data[0]), [data]);

  const fetchData = useCallback(async () => {
    const data = await options[activeId]();
    setData(data);
  }, [activeId, options]);

  useEffect(() => {
    if (activeId) {
      fetchData();
    }
  }, [fetchData, activeId]);

  if (data.length === 0) {
    return <p>Nenhum dado encontrado.</p>;
  }

  return (
      <TableContent>
        <thead>
          <tr>
            {headers.map((header) => (
              <Th key={header}>{header}</Th>
            ))}
            <Th>Ações</Th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              {headers.map((header) => (
                <Td key={header}>{item[header]}</Td>
              ))}
              <ActionTd>
                <ActionGroupButton>
                    <Button color={"info"} size={"small"} onClick={() => handleEdit(item.id)}>Editar</Button>
                    <Button color={"danger"} size={"small"} onClick={() => handleDelete(item.id)}>Apagar</Button>
                </ActionGroupButton>
              </ActionTd>
            </tr>
          ))}
        </tbody>
      </TableContent>
  );
}

function handleEdit(id) {
  console.log("Editar item com ID:", id);
  // Lógica para editar o item
}

function handleDelete(id) {
  console.log("Apagar item com ID:", id);
  // Lógica para apagar o item
}

export default Table;