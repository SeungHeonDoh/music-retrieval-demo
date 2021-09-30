import React, {useContext, Fragment} from "react";
import { MetaContext } from "../../hook/DataManger";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlay, faPause} from "@fortawesome/free-solid-svg-icons";
import { SongButton } from '../../styles/block';
import { AudioCell, Cell, RowDiv, ColumnsDiv, ArtistName, Title} from "../../styles/component";

function MusicContainer({ index, songAttribute }){
    const mainContext = useContext(MetaContext)
    const {playTrack, currentTrackData ,isPlaying} = mainContext
    const {msd_id, title, artist_name, release, all_tags, lastfm_tag} = songAttribute
    let allmusicTag
    let lastfmTag
    if (all_tags !== ""){
        allmusicTag = all_tags.map((allmusic) => (<span>{allmusic}, </span>))
        if (allmusicTag.length > 8) {
            allmusicTag = allmusicTag.slice(0,8)
        }
    } else {
        allmusicTag = ""
    }
    if (lastfm_tag !== ""){
        lastfmTag = lastfm_tag.map((lastfm) => (<span>{lastfm}, </span>))
        if (lastfmTag.length > 8) {
            lastfmTag = lastfmTag.slice(0,8)
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
                        <Title>{title}</Title>
                        <ArtistName>{artist_name}</ArtistName>
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