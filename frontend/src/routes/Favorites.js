import styled from "styled-components";

const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: linear-gradient(90deg, #002f52 35%, #326589 160%);
`;

function Favorites() {
  return (
    <AppContainer>
      <p>favoritos</p>
    </AppContainer>
  );
}

export default Favorites;
