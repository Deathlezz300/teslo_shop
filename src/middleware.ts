import {  NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {jwtVerify} from 'jose'
import {getToken} from 'next-auth/jwt';

export async function middleware(req:NextRequest){

  const previousPage = req.nextUrl.pathname;
 

  if (previousPage.startsWith("/checkout")) {

    // const token = req.cookies.get("token")?.value;

    const session=await getToken({req,secret:process.env.NEXTAUTH_SECRET})

    if(!session){
      return NextResponse.redirect(
        new URL(`/auth/login?p=${previousPage}`)
      )
    }

    return NextResponse.next();

    // if (!token) {
    //     return NextResponse.redirect(
    //         new URL(`/auth/login?p=${previousPage}`, req.url)
    //     );
    // }

    // try {
    //     await jwtVerify(token,new TextEncoder().encode(process.env.JWT_SECRET_SEED))
    //     return NextResponse.next();
    // } catch (error) {
    //   return NextResponse.redirect(
    //     new URL(`/auth/login?p=${previousPage}`, req.url)
    //   );
    // }
  }

}

export const config={
    matcher:[
      '/checkout/:path*'
    ]
};