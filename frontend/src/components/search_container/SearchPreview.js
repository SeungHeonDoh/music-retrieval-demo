import React, { useContext } from "react";
import { TypeCell, EntityCell, SearchDiv, PreviewContainer, Types, Entity } from '../../styles/component';
import { MetaContext } from '../../hook/DataManger'
const SearchPreview = ({previewData}) => {
	let artist_name;
	if (previewData.type === "track"){
		artist_name = " - " + previewData.artist_name
	} else {
		artist_name = null;
	}
	const mainContext = useContext(MetaContext);
	const {previewClick} = mainContext;
	return (
		<SearchDiv onClick={() => previewClick(previewData.name, previewData.msd_id, previewData.type)}>
			<tbody>
				<PreviewContainer>
					<TypeCell>
						<Types>{previewData.type}</Types>
					</TypeCell>
					<EntityCell>
						<Entity>{previewData.name}{artist_name}</Entity>
					</EntityCell>
				</PreviewContainer>
			</tbody>
		</SearchDiv>
	  );
};

export default SearchPreview;