import React, { useCallback, useEffect, useState } from "react";
import Input from "../Input";
import styled from "styled-components";
import { getUsers } from "../../services/users";

const SearchContainer = styled.section`
    background-image: linear-gradient(90deg, #002F52 35%, #326589 165%);
    color: #FFF;
    text-align: center;
    padding: 85px 0;
    height: 470px;
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
            <Title>Já sabe por onde começar?</Title>
            <SubTitle>Encontre seu livro na nossa estante.</SubTitle>
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