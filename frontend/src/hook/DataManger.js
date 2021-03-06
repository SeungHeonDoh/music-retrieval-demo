import axios from 'axios';
import React, { useState, useEffect } from 'react';

const MetaContext = React.createContext()

const MetaProvider = (props) => {
	// Contents Level
	const [previewRender, setPreviewRender] = useState(false)
	const [searchpreview, setSearchPreview] = useState([])
	const [tagmap, setTagmap] = useState('')
	const [keyword, setKeyword] = useState('')
	const [msdids, setMSDIDs] = useState([])
	const [replace, setReplace] = useState([])
	const [backendinput, setBackEndInput] = useState('')

	const [loading, setLoading] = useState(true)
	const [songdata, setSongdata] = useState([])
	const [tagdata, setTagdata] = useState([])
	const [artistdata, setArtistdata] = useState([])
	// User Level
	const [selectSong, setSelectSong] = useState('')

	// Audio Level
	const [audioPlayer, setAudioPlayer] = useState(new Audio())
	const [currentTrackIndex, setCurrentTrackIndex] = useState()
	const [currentTrackData, setCurrentTrackData] = useState("")
	const [isPlaying, setIsPlaying] = useState()

	// server data
	const fetchData = async() => {
		try {
			const nomalize_to_display = await axios("http://mac-daftpunk.kaist.ac.kr:7777/static/dataset/nomalize_to_display.json");
			setTagmap(nomalize_to_display.data);
			setLoading(false);
		} catch (e) {
			if (e) {
				console.log(e.message, 'Sorry Error!')
			}
		}
	}

	const filterQuery = async(searchInput) => {
		if (searchInput !== "") {
			setPreviewRender(true)
			try {
				const filterData = await axios(`http://143.248.249.166:7777/filter?search=${searchInput}`);
				setSearchPreview(filterData.data.search_result);
			} catch (e) {
				console.log(e.message);
			}
		}
	}
	

	const getServerData = async(query) => {
		setPreviewRender(false);
		setLoading(true);
		resetPlay();
		try{
			const serverData = await axios(`http://mac-daftpunk.kaist.ac.kr:7777/?query=${query}`)
			setArtistdata(serverData.data.sim_artist.slice(0,3));
			const displayTag = getDisplayTag(serverData.data.sim_tag.slice(0,5));
			setTagdata(displayTag);
			setSongdata(serverData.data.sim_track);
			setSelectSong(serverData.data.sim_track[0]);
			setLoading(false);
		} catch (e) {
			if (e) {
				console.log(e.message, "Sorry Error!")
			}
		}
	}

	const updateField = e => {
		filterQuery(e.target.value)		
		setKeyword(e.target.value)
	};

	const previewClick = (name, msd_id, type) => {
		if (type === "artist"){
			setKeyword(`'${name}'`)
			setReplace(`'${name}'`)
			setMSDIDs(msd_id)
		} else if (type === "track") {
			setKeyword(`"${name}"`)
			setReplace(`"${name}"`)
			setMSDIDs(msd_id)
		} else {
			setKeyword(name)
		}
		setPreviewRender(false);
	}
	
	const onSearchSubmit = e => {
		e.preventDefault();
		var serverInput = keyword
		getServerData(serverInput.replace(replace, msdids));
	};

	const tagQuery = async(e) => {
		const selectID = e.currentTarget.getAttribute('data-tag');
		setKeyword(selectID)
		getServerData(selectID);
	};

	const artistQuery = async(e) => {
		const artistName = e.currentTarget.getAttribute('id');
		const artistID = e.currentTarget.getAttribute('data-tag');
		setKeyword(artistName)
		getServerData(artistID)
	};

	function getDisplayTag(tag_list){
		const new_tag = []
		tag_list.map(function(old_tag){
			if (old_tag in tagmap){
				new_tag.push(tagmap[old_tag])
			} else {
				new_tag.push(old_tag)
			} return null;
		}
		);
		return new_tag;
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

	function resetPlay(){
		setCurrentTrackIndex(-1)
		setCurrentTrackData("")
		setIsPlaying(false);
		audioPlayer.pause();
		setAudioPlayer(new Audio())
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
			keyword,
			setKeyword,
			searchpreview,
			updateField,
			previewClick,
			onSearchSubmit,
			previewRender,
			loading,	
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
			tagQuery,
			artistQuery,
			getDisplayTag
		}}>
			{props.children}
		</MetaContext.Provider>
	)
}

const MetaConsumer = MetaContext.Consumer
export { MetaProvider, MetaConsumer, MetaContext }