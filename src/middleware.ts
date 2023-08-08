import {  NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {jwtVerify} from 'jose'
import {getToken} from 'next-auth/jwt';

export async function middleware(req:NextRequest){

  const previousPage = req.nextUrl.pathname;
  
  const session:any=await getToken({req,secret:process.env.NEXTAUTH_SECRET})

  if (previousPage.startsWith("/checkout")) {

    // const token = req.cookies.get("token")?.value;
    if(!session){

      const url=req.nextUrl.clone();
      url.pathname='/auth/login';
      url.search=`?p=${previousPage}`

      return NextResponse.redirect(url)
    }


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

  const validRoles=['admin','super-user','SEO'];

  if(!session){
      const url=req.nextUrl.clone();
      url.pathname='/auth/login';
      url.search=`?p=${previousPage}`

      if(previousPage.startsWith('/api/admin')){
        return NextResponse.json({error:'No esta autorizado'},{status:401});  
      }

      return NextResponse.redirect(url);

  }

  if(previousPage.startsWith('/admin')){

      const url=req.nextUrl.clone();
      url.pathname='/'

      if(!validRoles.includes(session?.user?.role)){
        return NextResponse.redirect(url)
      }

  }


  if(previousPage.startsWith('/api/admin') && !validRoles.includes(session?.user?.role)){

      return NextResponse.json({error:'No esta autorizado'},{status:401});

  }

  return NextResponse.next();

}

export const config={
    matcher:[
      '/checkout/:path*',
      '/admin/:path*',
      '/api/admin/:path*'
    ]
};