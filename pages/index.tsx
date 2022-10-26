import { Box,Flex} from '@chakra-ui/layout';
import GradientLayout from '../components/gradientLayout';
import prisma from '../lib/prisma';
import { Image, Text } from '@chakra-ui/react'
import { useMe } from '../lib/hooks';
const Home = ({Artist})=>{
  const {user} = useMe();
  return (
   <GradientLayout color="gray"
    subtitle={"profile"} 
    title={`${user?.firstName} ${user?.lastName}`}
    description={`${user?.playlistsCount} public playlists`}
    image={"https://tinted-gym-f99.notion.site/image/https%3A%2F%2Fdl.dropboxusercontent.com%2Fs%2Fbgiv0ssz3xpotz9%2Fpeep.png%3Fdl%3D0?table=block&id=33f9771b-0e6f-4a72-832c-69ed2d41f290&spaceId=511cd811-5561-4a61-b550-c4086b4afafb&width=2000&userId=&cache=v2"}
    roundedImage
   >
      <Box color={"white"} paddingLeft={"20px"}>
        <Box >
          <Text fontSize={"20px"} fontWeight="semibold">Top Artists of the  month</Text>
          <Text fontSize={"sm"} color={"gray"}>This is only visible to you</Text>
        </Box>
        <Flex gap={"5"} fontWeight="semibold" paddingY={"5px"}>
         {Artist.map((artist)=>(
         <Box paddingX={"10px"} width="20%">
           <Box bg={"gray.700"} borderRadius="5px" padding={"10px"} width="100%">
            <Image 
                   src="http://placekitten.com/300/300"
                   borderRadius={"100%"}
                   />
            <Box  paddingLeft={"10px"} marginTop="20px">
              <Text>{artist.name}</Text>
              <Text fontSize={"sm"} color="gray.400">Artist</Text>
            </Box>
          </Box>
         </Box>
         ))}
        </Flex>
      </Box>
   </GradientLayout>
  )
}

export async function getServerSideProps(){
    const res = await prisma.artist.findMany({});
    return {
      props: {
        Artist: res
      }
    }
}
export default Home;