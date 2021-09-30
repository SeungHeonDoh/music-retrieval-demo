import React, { useContext, Fragment } from 'react';
import { MetaContext } from '../../hook/DataManger'
import { Clickdiv, Table } from '../../styles/component'

import MusicContainer from './music_item'
const MusicTable = () => {
    const mainContext = useContext(MetaContext);
    const {songdata, handleQuery} = mainContext;
    return (
        <>
            {songdata.map((song,index) => (
                <>
                    <Clickdiv key={index} data-tag={index} onClick = {handleQuery}>
                        <MusicContainer
                            index = {index}
                            songAttribute ={song}
                        />
                    </Clickdiv>
                </>
            ))}
        </>
    );
};

export default MusicTable;