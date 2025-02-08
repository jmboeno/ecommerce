import React, { useCallback, useEffect, useState } from "react";
import Input from "../Input";
import styled from "styled-components";
import { getUsers } from "../../services/users";

const SearchContainer = styled.section`
    background: rgb(0 0 0 / 45%);
    color: #FFF;
    text-align: center;
    padding: 85px 0;
    height: calc(100% - (85px* 2));
    width: 100%;
`;

const Title = styled.h2`
    color: #FFF;
    font-size: 36px;
    text-align: center;
    width: 100%;
`;

const SubTitle = styled.h3`
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 40px;
`;

const ResultSearch = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
    cursor: pointer;

    p {
        width: 200px;
    }

    img {
        width: 100px;
    }

    &:hover {
        border: 1px solid white;
    }
`;

const Search = () => {
    const [searchBooks, setSearchBooks] = useState([]);
    const [users, setUsers] = useState([]);

    const fetchUsers = useCallback(async() => {
        const users = await getUsers();
        setUsers(users);
    }, []);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const handleSearch = useCallback(
        (event) => {
            const searchTerm = event.target.value;
            const resultBooks = users.filter(book => book.name.includes(searchTerm));

            setSearchBooks(resultBooks);
        }, [users]
    ); 

    return (
        <SearchContainer>
            <Title>Facilidade e rapidez na sua recarga!</Title>
            <SubTitle>Adquira sua recarga para TV por assinatura de forma segura e sem complicações.</SubTitle>
            <Input
                placeholder="Escreva sua próxima leitura"
                onBlur={handleSearch}
            />
            { searchBooks.map(book => (
                <ResultSearch key={book.id}>
                    <p>{book.name}</p>
                    <img src={book.src}/>
                </ResultSearch>
            )) }
        </SearchContainer>
    )
};

export default Search;