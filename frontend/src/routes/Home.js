import styled from "styled-components";
import Search from "../components/Search";
import LatestReleases from "../components/LatestReleases";

const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: linear-gradient(90deg, #002f52 35%, #326589 160%);
`;

function Home() {
  return (
    <AppContainer>
      <Search />
      <LatestReleases />
    </AppContainer>
  );
}

export default Home;
