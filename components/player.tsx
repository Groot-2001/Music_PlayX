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

const Player =({songs,activeSong})=>{
    const [playing,setPlaying] = useState(true);
    const [index , setIndex] = useState(0);
    const [seek,setSeek] = useState(0.0);
    const [repeat,setRepeat] = useState(false);
    const [shuffle,setShuffle] = useState(false);
    const [duration,setDuration] = useState(0.0);

    const setPlayState = (value) =>{
        setPlaying(value);
    }
    const setShuffleState = (state) =>{
        setShuffle((state)=>!state);
    }
    const setRepeatState = (state) =>{
        setRepeat((state)=>!state);
    }

    return (
        <Box>
           <Box> 
                <ReactHowler 
                 playing={playing}
                 src={activeSong?.url}
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
                    <Text color={"gray.400"}>0:11</Text>
                </Box>
                <Box width={"80%"}>
                    <RangeSlider
                        aria-label={['min','max']}
                        step={0.1}
                        min={0}
                        max={321}
                        id="player-range"
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
                     >3:21</Text>
                </Box>
            </Flex>
           </Box>
        </Box>
    )
}

export default Player;