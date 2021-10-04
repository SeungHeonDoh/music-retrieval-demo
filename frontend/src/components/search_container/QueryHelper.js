import React, { useContext } from "react";
import { MetaContext } from '../../hook/DataManger'
import { ArtistName, ClickTypo } from "../../styles/component";


const QueryHelper = () => {
	const mainContext = useContext(MetaContext);
	const {tagdata,artistdata, tagQuery, artistQuery} = mainContext;
    let Tag = tagdata.map((tag, index) => (<ClickTypo key={index} id={tag} data-tag={tag} onClick={tagQuery}>{tag}</ClickTypo>))
    let Artist = artistdata.map((artist, index) => (<ClickTypo key={index} id={artist.artist_name} data-tag={artist.artist_id} onClick={artistQuery}>{artist.artist_name}</ClickTypo>))
	return (
		<div>
            <ArtistName>Similar Tag | {Tag} </ArtistName>
            <ArtistName>Similar Artist | {Artist}</ArtistName>
		</div>
	);
};

export default QueryHelper;