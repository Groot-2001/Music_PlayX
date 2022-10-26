import {Box} from '@chakra-ui/layout';
import {Table,Tr,Td,Thead,Tbody,Th,IconButton} from '@chakra-ui/react';
import {BsFillPlayFill} from 'react-icons/bs';
import {AiOutlineClockCircle} from 'react-icons/ai';
import relativeDays from '../lib/formatter';
import convertMsToTime from '../lib/Timeformatter';

const SongTable =({songs})=>{
    return (
         <Box bg={"transparent"}>
            <Box padding={"10px"}>
               <Box>
               <IconButton
                    icon={<BsFillPlayFill />}
                    isRound
                    colorScheme={"purple"}
                    size="lg" 
                    aria-label={'Play'}
                    />
               </Box>
            </Box>
            <Table variant={"unstyled"} 
                color={"white"}
                >
                <Thead  
                    borderBottom="1px solid gray" 
                    borderColor={"rgba(255,255,255,0.2)"}
                >
                    <Tr color={"rgba(176, 224, 230,0.8)"} fontFamily="cursive">
                        <Td>
                            #
                        </Td>
                        <Td>
                            Title
                        </Td>
                        <Td>
                            Date Added
                        </Td>
                        <Td>
                            <AiOutlineClockCircle/>
                        </Td>
                    </Tr>
                </Thead>
                <Tbody>
                    {songs.map((song ,i)=>(
                        <Tr
                        sx={{
                            transition:'all 0.3s ',
                            '&:hover':{
                                bg:'rgba(255,255,255,0.1)',
                            }
                        }}
                        key={song.id}
                        cursor="pointer"
                        >
                            <Td>{i+1}</Td>
                            <Td>{song.name}</Td>
                            <Td>{relativeDays(song.createdAt)}</Td>
                            <Td>{convertMsToTime(song.duration)}</Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
         </Box>
    )
}

export default SongTable;