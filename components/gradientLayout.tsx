import {Image} from '@chakra-ui/react';
import {Box,Flex,Text} from '@chakra-ui/layout';

const GradientLayout =({
    title,
    subtitle,
    description,
    image,
    color,
    roundedImage,
    children,
}) =>{

    return (
        <Box 
            height={"100%"} 
            overflowY="auto" 
            bgGradient={`linear(${color}.500 0%,${color}.600 15%,${color}.700 40% ,rgba(0,0,0,0.95) 75%)`}
            css={{
                '&::-webkit-scrollbar': {
                  width: '8px',
                },
                '&::-webkit-scrollbar-track': {
                  width: '6px',
                },
                '&::-webkit-scrollbar-thumb': {
                  background: "pink",
                  borderRadius: '24px',
                },
              }}
            >
            <Flex bg={`${color}.600`} padding={"40px"} align="end">
                <Box>
                    <Image
                        boxSize={"160px"}
                        boxShadow="2xl"
                        src={image}
                        borderRadius={roundedImage?"100%" : "3px"}
                    />
                </Box>
                <Box padding={"20px"} lineHeight={"40px"}>
                    <Text 
                        fontSize={"x-small"}
                        color={"white"}
                        casing="uppercase"
                        fontWeight={"bold"}
                    >{subtitle}</Text>
                    <Text fontSize={"6xl"} color="whatsapp.100">{title}</Text>
                    <Text fontSize={"xs"} fontWeight="semibold" color={"AppWorkspace"}>{description}</Text>
                </Box>
            </Flex>
            <Box paddingY={"20px"}>{children}</Box>
        </Box>
    )

};

export default GradientLayout