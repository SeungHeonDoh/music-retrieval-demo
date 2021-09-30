import axios from 'axios';
import React, { useState, useEffect } from 'react';

const MetaContext = React.createContext()

const MetaProvider = (props) => {
	// Contents Level
    const [searchitem, setSearchItem] = useState([])
	const [searchresult, setSearchResult] = useState([])
	const [keyword, setKeyWord] = useState('')

	const [loading, setLoading] = useState(true)
	const [songdata, setSongdata] = useState([])
	const [tagdata, setTagdata] = useState([])
	const [artistdata, setArtistdata] = useState([])
	const [query, setQuery] = useState('')

	// User Level
	const [selectSong, setSelectSong] = useState('')
	const [rootSong, setRootSong] = useState('')

	// Audio Level
	const [audioPlayer, setAudioPlayer] = useState(new Audio())
	const [currentTrackIndex, setCurrentTrackIndex] = useState()
	const [currentTrackData, setCurrentTrackData] = useState("")
	const [isPlaying, setIsPlaying] = useState()

	// server data
	const fetchData = async() => {
		try {
			const baseData = await axios("http://mac-daftpunk.kaist.ac.kr:7777/static/collections/search_item.json");            
			setSearchItem(baseData);
			setLoading(false);
		} catch (e) {
			if (e) {
				console.log(e.message, 'Sorry Error!')
			}
		}
	}

	const getServerData = async(query) => {
		setLoading(true);
		try{
			const serverData = await axios(`http://mac-daftpunk.kaist.ac.kr:7777/?query=${query.toLowerCase()}`)
			setArtistdata(serverData.data.sim_artist.slice(0,3));
			setTagdata(serverData.data.sim_tag.slice(0,3));
			setSongdata(serverData.data.sim_track);
			setSelectSong(serverData.data.sim_track[0]);
			setLoading(false);
		} catch (e) {
			if (e) {
				console.log(e.message, "Sorry Error!")
			}
		}
	}

	const onSearchChange = event => {
		const {
		  target: { value }
		} = event;
		setKeyWord(value);
	  };

	const onSearchSubmit = event => {
		event.preventDefault();
		getServerData(keyword)
	};

	const handleQuery = async(e) => {
		const selectIndex = e.currentTarget.getAttribute('data-tag')
		const selectInstance = songdata[selectIndex]
		console.log(selectInstance)
		// setSelectSong(selectInstance)
		// setQuery(selectIndex)
		// const fname = selectSong.fname.replace('.mp3', '.json')
		// const musicdata = `http://mac-chopin5.kaist.ac.kr:8301/static/vectors/feature/${fname}`;
		// const features = await axios(musicdata);
		// setFeature(features.data)
	}

	// handle music data
	function playTrack(index){
		if (index === currentTrackIndex){
			togglePlay();
		} else {
			audioPlayer.pause();
			const NewAudioPlayer = new Audio(`http://mac-daftpunk.kaist.ac.kr:7777/static/dataset/songs/${songdata[index].audio_path}`)
			NewAudioPlayer.play()
			setAudioPlayer(NewAudioPlayer)
			setCurrentTrackIndex(index)
			setCurrentTrackData(songdata[index])
			setIsPlaying(true)
		}
	}

	function togglePlay(){
		if (isPlaying){
			audioPlayer.pause()
		} else {
			audioPlayer.play()
		}
		setIsPlaying(!isPlaying)
	}

	function playPreviousTrack(){
		const newIndex = ((currentTrackIndex + -1) % songdata.length + songdata.length) % songdata.length;
		playTrack(newIndex);
	}

	function playNextTrack(){
		const newIndex = (currentTrackIndex + 1) % songdata.length;
		playTrack(newIndex);
	}

	useEffect(() => {
		fetchData()
	}, [])

	return (
		<MetaContext.Provider value={{
			searchresult,
			keyword,
			handleQuery,
			onSearchChange,
			onSearchSubmit,
			loading,
			query,
            searchitem,
			rootSong,
			selectSong,
			songdata,
			tagdata,
			artistdata,
			currentTrackData,
			audioPlayer,
			playTrack,
			togglePlay,
			isPlaying,
			playPreviousTrack,
			playNextTrack,
		}}>
			{props.children}
		</MetaContext.Provider>
	)
}

const MetaConsumer = MetaContext.Consumer
export { MetaProvider, MetaConsumer, MetaContext }