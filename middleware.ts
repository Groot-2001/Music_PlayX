import {NextRequest, NextResponse } from 'next/server';

const signedinPages = ['/','/playlist','/library'];

export default function middleware(request:NextRequest){
    let url = request.nextUrl.clone();
    if(signedinPages.find((p)=> p === url.pathname)){
        const token = request.cookies.get("TURING_ACCESS_TOKEN");
        if(!token){
            url.pathname = '/signin';
            return NextResponse.rewrite(url);
        }
    }
}


