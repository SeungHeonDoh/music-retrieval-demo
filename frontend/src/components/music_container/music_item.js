import React, {useContext} from "react";
import { MetaContext } from "../../hook/DataManger";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlay, faPause} from "@fortawesome/free-solid-svg-icons";
import { SongButton } from '../../styles/block';
import { AudioCell, Cell, RowDiv, ColumnsDiv, ArtistName, Title, ClickTypoGary} from "../../styles/component";

function MusicContainer({ index, songAttribute }){
    const mainContext = useContext(MetaContext)
    const {playTrack, currentTrackData ,isPlaying, tagQuery, artistQuery, getDisplayTag} = mainContext
    const {msd_id, title, artist_name, artist_id, all_tags, lastfm_tag} = songAttribute
    let allmusicTag
    let allmusicDisplay
    let lastfmTag
    let lastfmDisplay

    if (all_tags !== ""){
        allmusicDisplay = getDisplayTag(all_tags)
        allmusicTag = allmusicDisplay.map((allmusic, index) => (<ClickTypoGary key={index} id={allmusic} data-tag={allmusic} onClick={tagQuery}>{allmusic}</ClickTypoGary>))
        if (allmusicTag.length > 12) {
            allmusicTag = getDisplayTag(allmusicTag.slice(0,12))
        }
    } else {
        allmusicTag = ""
    }
    if (lastfm_tag !== ""){
        lastfmDisplay = getDisplayTag(lastfm_tag)
        lastfmTag = lastfmDisplay.map((lasftfm, index) => (<ClickTypoGary key={index} id={lasftfm} data-tag={lasftfm} onClick={tagQuery}>{lasftfm}</ClickTypoGary>))
        if (lastfmTag.length > 12) {
            lastfmTag = lastfmTag.slice(0,12)
        }
    } else {
        lastfmTag = ""
    }
    return (
        <div>
            <RowDiv>
                <AudioCell>
                    <SongButton onClick={() => playTrack(index)}>
                        {currentTrackData.msd_id === msd_id && isPlaying ? <FontAwesomeIcon icon={faPause}/> : <FontAwesomeIcon icon={faPlay}/>}
                    </SongButton>
                </AudioCell>

                <ColumnsDiv>
                    <Cell>
                        <Title id={title} data-tag={msd_id} onClick={artistQuery}>{title}</Title>
                        <ArtistName id={artist_name} data-tag={artist_id} onClick={artistQuery}>{artist_name}</ArtistName>
                    </Cell>

                    <Cell>
                        <ArtistName>AllMusic Tag: {allmusicTag} </ArtistName>
                        <ArtistName>Last.fm Tag: {lastfmTag} </ArtistName>
                    </Cell>
                </ColumnsDiv>
            </RowDiv>
        </div>
    );
}

export default MusicContainer;