import NextImage from 'next/image';
import NextLink from 'next/link';
import{
Box,
List,
ListItem,
ListIcon,
Divider,
Center,
LinkBox,
LinkOverlay
} from '@chakra-ui/layout';

import { 
    MdHome,
    MdSearch,
    MdLibraryMusic,
    MdPlaylistAdd,
    MdFavorite
 } from "react-icons/md";
import { usePlaylist } from '../lib/hooks';

const navMenu =[
    {
        name:'Home',
        icon:MdHome,
        route:'/'
    },
    {
        name:'Search',
        icon:MdSearch,
        route:'/search'
    },
    {
        name:'Your Library',
        icon:MdLibraryMusic,
        route:'/library'
    },
    
];

const MenuList = [
    {
        name:'Create PlayList',
        icon:MdPlaylistAdd,
        route:'/'
    },
    {
        name:'Favorites',
        icon:MdFavorite,
        route:'/favorites'
    },
    
];

// const PlayList = new Array(30).fill(1).map((_,i)=>(`PlayList ${i+1}`));

const Sidebar = () =>{
    const {playlists} = usePlaylist();
    return(
        <Box 
            width="100%"
            height="calc(100vh - 100px)" 
            bg="black"
            color="gray"
            paddingX="5px"
            >
            <Box paddingY="20px" height="100%">
                <Box width="120px" marginBottom="20px" paddingX="20px" >
                    <NextImage src="/logo.svg" width={120} height={60}color={"white"}/>
                </Box>
                <Box marginBottom={"20px"}>
                    <List spacing={2}>
                        {
                            navMenu.map(menu =>(
                                <ListItem paddingX={"20px"} fontSize="16px" key={menu.name}>
                                    <LinkBox>
                                        <NextLink href={menu.route} passHref>
                                         <LinkOverlay>
                                            <ListIcon
                                                as={menu.icon}
                                                color="white"
                                                marginRight={"20px"}
                                            />
                                            {menu.name}
                                         </LinkOverlay>
                                        </NextLink>
                                    </LinkBox>
                                </ListItem>
                            ))
                        }
                    </List>
                </Box>
                <Box  marginBottom={"10px"}>
                <List spacing={2}>
                        {
                            MenuList.map(menu =>(
                                <ListItem paddingX={"20px"} fontSize="16px" key={menu.name}>
                                    <LinkBox>
                                        <NextLink href={menu.route} passHref>
                                         <LinkOverlay>
                                            <ListIcon
                                                as={menu.icon}
                                                color="white"
                                                marginRight={"20px"}
                                            />
                                            {menu.name}
                                         </LinkOverlay>
                                        </NextLink>
                                    </LinkBox>
                                </ListItem>
                            ))
                        }
                    </List>
                </Box>
                <Divider />
                <Box 
                    height={"56%"}
                    overflowY="auto"
                    paddingY="20px"
                    css={{
                        '&::-webkit-scrollbar': {
                          width: '4px',
                        },
                        '&::-webkit-scrollbar-track': {
                          width: '6px',
                        },
                        '&::-webkit-scrollbar-thumb': {
                          background: "dodgerblue",
                          borderRadius: '24px',
                        },
                      }}
                >
                    <List spacing={2}>
                        {playlists.map((playlist)=>(
                            <ListItem paddingX={"20px"} key={playlist.id}>
                                <LinkBox>
                                    <NextLink href={{
                                        pathname:"/playlist/[id]",
                                        query:{id:playlist.id},
                                    }} passHref>
                                        <LinkOverlay>
                                            {playlist.name}
                                        </LinkOverlay>
                                    </NextLink>
                                </LinkBox>
                            </ListItem>
                        ))

                        }
                    </List>
                </Box>
            </Box>
        </Box>
    );
}

export default Sidebar;