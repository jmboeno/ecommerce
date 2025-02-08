import styled from "styled-components";
import Search from "../components/Search";

const AppContainer = styled.div`
  width: 100vw;
  height: calc(100vh - 100px);
  background-image: linear-gradient(90deg, #7125eb 35%, #6d32896b 160%);;
`;

function Home() {
  return (
    <AppContainer>
      <Search />
    </AppContainer>
  );
}

export default Home;
