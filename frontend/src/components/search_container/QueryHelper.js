import React, { useContext } from "react";
import { Form } from '../../styles/component';
import { MetaContext } from '../../hook/DataManger'
import { ArtistName, ClickTypo} from "../../styles/component";


const QueryHelper = () => {
	const mainContext = useContext(MetaContext);
	const {tagdata,artistdata, onSearchSubmit} = mainContext;
    let Tag = tagdata.map((tag) => (<ClickTypo>{tag},</ClickTypo>))
    let Artist = artistdata.map((artist) => (<ClickTypo>{artist.artist_name},  </ClickTypo>))
	return (
		<Form onSubmit={onSearchSubmit}>
            <ArtistName>Similar Tag | {Tag} </ArtistName>
            <ArtistName>Similar Artist | {Artist}</ArtistName>
		</Form>
	);
};

export default QueryHelper;