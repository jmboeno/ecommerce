import styled from "styled-components";
import { books } from "./dataLatestReleases";
import { Title } from "../Title";

const LatestReleasesContainer = styled.section`
    background-color: #EBECEE;
    padding-bottom: 20px;
    display: flex;
    flex-direction: column;
`

const NewBooksContainer = styled.div`
    margin-top: 30px;
    display: flex;
    width: 100%;
    justify-content: center;
`;

const LatestReleases = () => {
    return (
        <LatestReleasesContainer>
            <Title
                fontSize="36px"
                color="#EB9B00"
                align="center"
            >ÚLTIMOS LANÇAMENTOS</Title>
            <NewBooksContainer>
                { books.map(book => (
                    <img key={book.id} src={book.src}/>
                ))}
            </NewBooksContainer>
        </LatestReleasesContainer>
    )
}

export default LatestReleases;