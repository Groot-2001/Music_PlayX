import {Box,Flex,Text} from '@chakra-ui/layout';
import Player from './player';
import {useStoreState} from 'easy-peasy';

const PlayerBar =()=>{
    const songs = useStoreState((state:any)=>state.activeSongs)
    const activeSong = useStoreState((state:any)=>state.activeSong)
    return (
        <Box
        bg={"gray.900"}
        width={"100vw"}
        height={"100px"}
        color="white"
        padding={"0.5em"}
        >
            <Flex align={"center"}>
                {activeSong?(<Box padding={"1em"}
                 width="20%"
                >
                    <Text fontSize={"large"}
                        color="gray.200"
                    >{activeSong.name}</Text>
                    <Text fontSize={"sm"} 
                        color="gray.300"
                        >{activeSong.artist.name}</Text>
                </Box>):null}
                <Box padding={"1em"}  
                    width="60%"
                    textAlign={"center"}
                    >
                   {activeSong?(<Player songs={songs} activeSong={activeSong}/>):null}
                </Box>
                <Box padding={"1em"}  
                    width="20%" 
                    float={"right"}
                    textAlign={"right"}
                    >
                    <Text fontSize={"large"}
                        color="gray.200"
                    ></Text>
                    <Text fontSize={"sm"} 
                        color="gray.300"
                        ></Text>
                </Box>
            </Flex>
        </Box>
    )
}

export default PlayerBar;