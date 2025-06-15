import React, { useCallback } from "react"
import { Input } from "../../Input/Input"
import { Button } from "../../Button/Button"
import Select from "../../Select/Select"

const Toolbar = ({ setLimit, search, setFetchTrigger, setSearch, onCreateClick, actions, enabledBulkActions, handleDelete }) => {
	const handleSearch = useCallback(() => setFetchTrigger(prev => prev + 1), [setFetchTrigger]);

	return (
		<div style={{ display: "flex", margin: "20px 0", justifyContent: "space-between" }}>
			<div style={{ display: "flex", gap: "10px" }}>
				<Input
					type="text"
					placeholder={"Pesquisar"}
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>
				<Button variant={"primary"} onClick={handleSearch}>Pesquisar</Button>
				{ actions.CREATE && <Button variant={"primary"} onClick={onCreateClick}>Criar</Button> }
				{ actions.DELETE && <Button variant={"danger"} disabled={!enabledBulkActions} onClick={handleDelete}>Deletar</Button> }
			</div>
			<div>
				<Select
					options={Array.from({ length: 10 }, (_, i) => {
						const value = (i + 1) * 10;
						return { name: String(value), value };
					})}
					onChange={setLimit}
				/>
			</div>
		</div>
	);
};

export default Toolbar
