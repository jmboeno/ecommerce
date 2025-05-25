import React, { useEffect, useState } from 'react'
import { toast } from "react-toastify"
import http from "../../http"
import styled from "@emotion/styled"
import { Button } from '../Button/Button'
import { Input } from '../Input/Input'
import Select from '../Select/Select'

const TableWrapper = styled.div`
	width: 100%;
	margin-top: 20px;
	border-radius: 8px;
	box-shadow: 0 2px 8px rgba(0,0,0,0.1);
	overflow: scroll;
	max-height: calc(100vh - 240px);
`

const Table = styled.table`
	width: 100%;
	border-collapse: separate;
	border-spacing: 0;
`

const TableHead = styled.thead`
	background-color: ${({ theme }) => theme.colors.primary.a};
`

const TableHeaderRow = styled.tr`
	background-color: ${({ color }) => color || "transparent"};
	cursor: default;
`

const TableRow = styled.tr`
	background-color: ${({ color }) => color};
	transition: background-color 0.3s ease;
	cursor: ${({ hoverable }) => (hoverable ? "pointer" : "default")};

	&:hover {
		background-color: ${({ theme, hoverable }) =>
			hoverable ? theme.colors.opacity.a : "inherit"};
	}
`

const TableHeaderCell = styled.th`
	padding: 14px 16px;
	text-align: left;
	color: white;
	font-weight: 600;
	font-size: 16px;
	border-bottom: 1px solid ${({ theme }) => theme.colors.opacity.a};
`

const TableBody = styled.tbody`
	color: #333;
`

const TableCell = styled.td`
	padding: 14px 16px;
	text-align: left;
	font-size: 14px;
	border-bottom: 1px solid ${({ theme }) => theme.colors.opacity.a};
`

const PaginationWrapper = styled.div`
	width: 100%;
	margin-top: 20px;
	border-radius: 8px;
	display: flex;
	justify-content: end;
	gap: 8px;
	align-items: center;
`

const SearchWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 10px;
	margin: 20px 0;
	justify-content: left;
`

const LoadingWrapper = styled.div`
	text-align: center;
	margin: 40px 0;
	font-size: 18px;
	font-weight: 500;
`

const getFieldValueByType = (value, { type, listField }) => {
	if (!type) return value

	if (type === "date") return new Date(value).toLocaleString().split(",").join(" -")

	if (type === "boolean") return value ? "Sim" : "Não"

	if (type === "list") {
		return value?.length && listField
			? value.map(item => item[listField]).join(", ")
			: <i>Não preenchido</i>
	}

	return value
}

const TableContent = ({ fetchTrigger, search, route, defaultSort, mapping, limit }) => {
	const [data, setData] = useState([])
	const [loading, setLoading] = useState(true)
	const [currentPage, setCurrentPage] = useState(1)
	const [totalPages, setTotalPages] = useState(0)

	const handleTotalPages = (totalCount) => {
		setTotalPages(Math.max(1, Math.ceil(totalCount / limit)))
	}

	const fetchData = () => {
		const [sortField, sortOrder] = defaultSort ? Object.entries(defaultSort)[0] : []

		setLoading(true)

		const queryParams = [
			`limit=${limit}`,
			`offset=${(currentPage - 1) * limit}`,
			search ? `search=${encodeURIComponent(search)}` : null,
			sortField ? `orderBy=${sortField}` : null,
			sortOrder ? `orderDirection=${sortOrder}` : null
		].filter(Boolean).join("&")

		http.get(`${route}?${queryParams}`)
			.then(response => {
				setData(response.data.data)
				handleTotalPages(response.data.total)
			})
			.catch(error => {
				console.error(error)
				toast.error("Erro ao carregar registros.")
			})
			.finally(() => setLoading(false))
	}

	useEffect(() => {
		setCurrentPage(1)
	}, [search])

	useEffect(() => {
		fetchData()
	}, [currentPage, fetchTrigger])

	const handlePrevious = () => {
		if (currentPage > 1) {
			setCurrentPage(prev => prev - 1)
		}
	}

	const handleNext = () => {
		if (currentPage < totalPages) {
			setCurrentPage(prev => prev + 1)
		}
	}

	if (loading) {
		return <LoadingWrapper>Carregando...</LoadingWrapper>
	}

	return (
		<>
			<TableWrapper>
				<Table>
					<TableHead>
						<TableHeaderRow>
							{mapping.map(({ title }) => (
								<TableHeaderCell key={title}>{title}</TableHeaderCell>
							))}
						</TableHeaderRow>
					</TableHead>
					<TableBody>
						{data.map((item, idx) => (
							<TableRow key={item.id} hoverable color={idx % 2 === 1 ? "#f9f9f9" : "#fff"}>
								{mapping.map(({ field, ...otherProps }) => (
									<TableCell key={`${item.id}_${field}`}>
										{getFieldValueByType(item[field], otherProps)}
									</TableCell>
								))}
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableWrapper>
			<PaginationWrapper>
				<span>Página {currentPage} de {totalPages}</span>
				<Button onClick={handlePrevious} disabled={currentPage === 1} size="small">
					Anterior
				</Button>
				<Button onClick={handleNext} disabled={currentPage === totalPages} size="small">
					Próximo
				</Button>
			</PaginationWrapper>
		</>
	)
}

const TablePresentation = ({ placeholder, route, defaultSort, mapping }) => {
	const [search, setSearch] = useState("")
	const [limit, setLimit] = useState(10)
	const [fetchTrigger, setFetchTrigger] = useState(0)

	const handleSearch = () => {
		setFetchTrigger(prev => prev + 1)
	}

	return (
		<>
			<div style={{ display: "flex", margin: "20px 0", justifyContent: "space-between" }}>
				<div style={{ display: "flex", gap: "10px" }}>
					<Input
						type="text"
						placeholder={placeholder}
						value={search}
						onChange={(e) => setSearch(e.target.value)}
					/>
					<Button onClick={handleSearch}>Pesquisar</Button>
				</div>
				<div>
					<Select
						options={Array.from({ length: 10 }, (_, i) => {
							const value = (i + 1) * 10
							return { name: String(value), value }
						})}
						onChange={setLimit}
					/>
				</div>
			</div>
			<TableContent
				search={search}
				route={route}
				mapping={mapping}
				defaultSort={defaultSort}
				fetchTrigger={fetchTrigger}
				limit={limit}
			/>
		</>
	)
}

export default TablePresentation
