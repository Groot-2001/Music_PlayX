import {Box,Flex,Input,Button} from '@chakra-ui/react';
import {useRouter} from 'next/router';
import {useSWRConfig} from 'swr';
import { auth } from '../lib/mutation';
import {useState} from 'react';
import NextImg from 'next/image';

const AuthForm = ({mode})=>{
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [isLoading,setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) =>{
        e.preventDefault();
        setIsLoading(true);
        const user = await auth(mode ,{email,password});
        setIsLoading(false);
        router.push('/');
    }

    return (
        <Box height="100vh" width="100vw" bg="black" color={"white"}>
            <Flex justify="center" align="center" height="100px"
                borderBottom={"white 1px solid"}
            >
              <NextImg src="/logo.svg" width={120} height={60} />
            </Flex>
            <Flex justify="center" align="center" height="calc(100vh - 100px)">
               <Box 
                    padding={"50px"}
                    bg="gray.900"
                    borderRadius={"6px"}
                >
                    <form onSubmit={handleSubmit}>
                        <Input
                            placeholder='email'
                            type={'email'}
                            onChange={(e)=>setEmail(e.target.value)}
                            margin={"1rem"}
                        />
                        <Input
                        placeholder='password'
                        type={'password'}
                        onChange={(e)=>setPassword(e.target.value)}
                        margin={"1rem"}
                        />
                            <Button type='submit' bg={"green.500"} isLoading={isLoading} 
                            sx={{
                                '&:hover':{
                                    bg:'green.400'
                                }
                            }}
                            >
                                {mode}
                            </Button>
                    </form>

               </Box>
            </Flex>
        </Box>
    )


}

export default AuthForm;

