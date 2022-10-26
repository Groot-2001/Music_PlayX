import GradientLayout from "../../components/gradientLayout";
import SongTable from "../../components/songsTable";
import { validateToken } from "../../lib/auth";
import prisma from "../../lib/prisma";


const getBGcolor =(id)=>{
    const colors =[
        "yellow",
        "green",
        "red",
        "orange",
        "purple",
        "gray",
        "teal",
        "blue",
        "pink"
    ];

    return colors[id -1] || colors[Math.floor(Math.random() * colors.length)]
}


const Playlist =({playlist})=>{
    const color = getBGcolor(playlist.id);
   return (
   <GradientLayout 
        color={color} 
        title={`${playlist.name}`} 
        subtitle={`playlist`}
        description={`${playlist.songs.length} Songs`} 
        image={`https://picsum.photos/400?random=${playlist.id}`} 
        roundedImage={false} 
    >
    <SongTable songs={playlist.songs}/>
   </GradientLayout>);
}

export const getServerSideProps = async({query,req})=>{
    let user;
    try {
         user = validateToken(req.cookies.TURING_ACCESS_TOKEN);
    } catch (error) {
        return {
           redirect:{
            permanent:false,
            destination:'/signin',
           }
        }
    }
    const [playlist] =  await prisma.playlist.findMany({
        where:{
            id: +query.id,
            userId:user.id,
        },
        include:{
            songs:{
               include:{
                artist:{
                    select:{
                        name:true,
                        id:true,
                    }
                }
               }
            }
        }
    })

    return {
        props:{playlist}
    }
}

export default Playlist;