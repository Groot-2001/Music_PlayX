import jwt from 'jsonwebtoken';
import {NextApiRequest,NextApiResponse} from 'next';
import prisma from './prisma';

export const validateRoute = (handler) =>{
    return async (req:NextApiRequest,res:NextApiResponse)=>{
        const token = req.cookies.TURING_ACCESS_TOKEN

        if(token){
            let user;
            try {
                const {id} = jwt.verify(token,'shiva');

                user = await prisma.user.findUnique({
                    where:{id},
                })

                if(!user){
                    throw new Error('user is not found');
                }
            } catch (error) {
                res.status(401).json({err:"UnAuthorized"});
                return
            }
            return handler(req,res,user);
        }
        res.status(401).json({err:"UnAuthorized"});
    }
}

export const validateToken =(token)=>{
    const user =jwt.verify(token,'shiva');
    return user;
}