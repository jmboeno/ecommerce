import styled from "styled-components";
import Sidebar from "../components/Sidebar";
import Table from "../components/Table";
import { useCallback, useState } from "react";
import { CenterContent } from "../components/CenterContent";
import { Button } from "../components/Button";

const AppContainer = styled.div`
  position: absolute;
  width: 100%;
  height: calc(100vh - 100px);
  display: flex;
`;

const Toolbar = styled.div`
  width: 100%;
  height: 50px;
`;

function Dashboard() {
  const [isAdmin, setIsAdmin] = useState(true);
  const [activeId, setActiveId] = useState(1);

  const handleActiveId = useCallback((id) => setActiveId(id), []);

  return (
    <AppContainer>
      <Sidebar isAdmin={isAdmin} activeId={activeId} setActiveId={handleActiveId} />
      <CenterContent>
        <Toolbar><Button color={"success"}>Criar</Button></Toolbar>
        <Table isAdmin={isAdmin} activeId={activeId} />
      </CenterContent>
    </AppContainer>
  );
}

export default Dashboard;