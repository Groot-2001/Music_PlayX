import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import prisma from '../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req:NextApiRequest,res:NextApiResponse) =>{
    const salt = bcrypt.genSaltSync()
    
    const {email,password} =req.body

    let user 

    try {
        user = await prisma.user.create({
            data:{
                email,
                password:bcrypt.hashSync(password,salt),
            },
        })
    } catch (error) {
        res.status(401).json({
            err:'User Already Exist'
        });
        return
    }

    //create json web token now

    let token = jwt.sign({
        email:user.email,
        id:user.id,
        time:Date.now()
    },'shiva',{expiresIn:'8h'});

    //set the cookie 

    res.setHeader(
        'Set-Cookie',
        cookie.serialize('TURING_ACCESS_TOKEN',token,{
            httpOnly:true,
            maxAge: 8* 60*60,
            path:'/',
            sameSite:'lax',
            secure:process.env.NODE_ENV == "production",
        })
    )

    res.json(user)
}