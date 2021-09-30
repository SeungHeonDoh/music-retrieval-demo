import React, { useContext } from "react";
import { Form, Input } from '../../styles/component';
import { MetaContext } from '../../hook/DataManger'
const SearchBar = () => {
	const mainContext = useContext(MetaContext);
	const {keyword,onSearchChange,onSearchSubmit} = mainContext;
	return (
		<Form onSubmit={onSearchSubmit}>
			<Input
				placeholder="Genre, Mood, Style, Inst, Artist, Brand... whatever you want"
				autoFocus={true}
				value={keyword}
				onChange={onSearchChange}
			/>
		</Form>
	);
};

export default SearchBar;