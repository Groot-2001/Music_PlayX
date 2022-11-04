import {
    ButtonGroup,
    Box,
    IconButton,
    RangeSlider,
    RangeSliderFilledTrack,
    RangeSliderTrack,
    RangeSliderThumb,
    Center,
    Flex,
    Text
} from '@chakra-ui/react';

import ReactHowler from 'react-howler';

import {
    useEffect,
    useRef,
    useState
} from 'react';

import {
    MdShuffle,
    MdSkipNext,
    MdSkipPrevious,
    MdOutlinePlayCircleFilled,
    MdOutlinePauseCircleFilled,
    MdOutlineRepeat
} from 'react-icons/md';
import {useStoreActions} from 'easy-peasy';
import { formatTime } from '../lib/formatter';


const Player =({songs,activeSong})=>{
    const [playing,setPlaying] = useState(true);
    const [index , setIndex] = useState(
        songs.findIndex((s)=> s.id === activeSong.id)
    );
    const [seek,setSeek] = useState(0.0);
    const [isSeeking,setIsSeeking] = useState(false);
    const [repeat,setRepeat] = useState(false);
    const [shuffle,setShuffle] = useState(false);
    const [duration,setDuration] = useState(0.0);
    const soundRef = useRef(null);
    const repeatRef = useRef(repeat);
    const setActiveSong = useStoreActions((state:any)=> state.changeActiveSong);

    const setPlayState = (value) =>{
        setPlaying(value);
    }
    const setShuffleState = (state) =>{
        setShuffle((state)=>!state);
    }
    const setRepeatState = (state) =>{
        setRepeat((state)=>!state);
    }

    const prevSong=()=>{
        setIndex((state)=>{
            return state? state-1: songs.length - 1
        })
    }
    const nextSong=()=>{
        setIndex((state)=>{
           if(shuffle){
                const next = Math.floor(Math.random() * songs.length);

                //if next songs is same 
                if(next === state){
                    return nextSong();
                } 

                return next;

           }else{
            return  state === songs.length -1 ? 0 : state + 1;
           }
        })
    }

    const onEnd = () =>{
        if(repeatRef.current){
            setSeek(0);
            soundRef.current.seek(0);
        }else{
            nextSong();
        }
    }
    const onLoad = () =>{
        const songDuration = soundRef.current.duration();
        setDuration(songDuration);
    }

    const onSeek = (e) =>{
        setSeek(parseFloat(e[0]));
        soundRef.current.seek(e[0]);
    }

    useEffect(()=>{
        let timerId;
        if(playing && !isSeeking){
            const f = () =>{
                setSeek(soundRef.current.seek());
                timerId = requestAnimationFrame(f);
            }
            timerId = requestAnimationFrame(f);
            return ()=>cancelAnimationFrame(timerId);
        }
        cancelAnimationFrame(timerId);
    },[playing,isSeeking]);

    useEffect(()=>{
        setActiveSong(songs[index])
    },[index , setActiveSong , songs])

    useEffect(()=>{
        repeatRef.current = repeat;
    },[repeat])
    return (
        <Box>
           <Box> 
                <ReactHowler 
                 playing={playing}
                 src={activeSong?.url}
                 ref={soundRef}
                 onLoad={onLoad}
                 onEnd={onEnd}
                 /> 
            </Box>
           <Center>
            <ButtonGroup>
                <IconButton
                outline={"none"}
                variant="link"
                icon={<MdShuffle/>}
                aria-label ="play"
                fontSize={"24px"}
                color={shuffle?"white":"gray.600"}
                onClick={()=>setShuffleState(true)}
                />
                <IconButton
                outline={"none"}
                variant="link"
                icon={<MdSkipPrevious/>}
                onClick={prevSong}
                aria-label ="play"
                fontSize={"24px"}
                />
                {playing?(<IconButton
                outline={"none"}
                variant="link"
                color={"white"}
                icon={<MdOutlinePauseCircleFilled/>}
                aria-label ="play"
                fontSize={"30px"}
                onClick={()=>setPlayState(false)}
                />):(<IconButton
                    outline={"none"}
                    variant="link"
                    color={"white"}
                    icon={<MdOutlinePlayCircleFilled/>}
                    aria-label ="play"
                    fontSize={"30px"}
                    onClick={()=>setPlayState(true)}
                    />)

                }
                <IconButton
                outline={"none"}
                variant="link"
                icon={<MdSkipNext/>}
                onClick={nextSong}
                aria-label ="play"
                fontSize={"24px"}
                />
                <IconButton
                outline="none"
                textDecoration={"none"}
                variant="link"
                icon={<MdOutlineRepeat/>}
                aria-label ="play"
                fontSize={"24px"}
                color={repeat?"white":"gray.600"}
                onClick={()=>setRepeatState(true)}
                />
            
            </ButtonGroup>
           </Center>
           <Box>
            <Flex justify={"center"} align="center">
                <Box width={"10%"}>
                    <Text color={"gray.400"}>{formatTime(seek)}</Text>
                </Box>
                <Box width={"80%"}>
                    <RangeSlider
                        aria-label={['min','max']}
                        step={0.1}
                        max={duration ? duration.toFixed(2) : 0}
                        min={0}
                        id="player-range"
                        value={[seek]}
                        onChange={onSeek}
                        onChangeStart={()=>setIsSeeking(true)}
                        onChangeEnd ={()=>setIsSeeking(false)}
                    >
                    <RangeSliderTrack  bg={"gray.800"}>
                    <RangeSliderFilledTrack bg={"purple.600"}/>    
                    </RangeSliderTrack>
                    <RangeSliderThumb index={0}/>
                    </RangeSlider>
                </Box>
                <Box width={"10%"} textAlign={"right"}>
                    <Text
                     color={"gray.400"}
                     >{formatTime(duration)}</Text>
                </Box>
            </Flex>
           </Box>
        </Box>
    )
}

export default Player;