import { CheckUserEmailPassword, registerUser } from "@/database/DbUsers";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GithubProvider from 'next-auth/providers/github'

declare module 'next-auth'{
    interface Session{
        accessToken?:string;
    }
}

export default NextAuth({
    providers:[
        Credentials({
            name:'Custom login',
            credentials:{
                email:{label:'Correo',type:'email',placeholder:'correo@google.com'},
                password:{label:'Contraseña',type:'password',placeholder:'Contraseña'}
            },
            async authorize(credentials){
                return await CheckUserEmailPassword(credentials!.email,credentials!.password);
            }
        }),
        GithubProvider({
            clientId:process.env.GITHUB_ID!,
            clientSecret:process.env.GITHUB_SECRET!
        })
    ],
    pages:{
        signIn:'/auth/login',
        newUser:'/auth/register'
    },
    session:{
        maxAge:2592000,
        strategy:'jwt',
        updateAge:86400
    },
    callbacks:{
        async jwt({token,account,user}){

            if(account){
                token.accessToken=account.access_token;

                switch(account.type){

                    case 'oauth':
                        token.user=await registerUser(user.email || '',user.name || '')
                    break;

                    case 'credentials':
                        token.user=user;
                    break;

                }

            }
            
            return token;
        },
        async session({session,token,user}){

            session.accessToken=token.accessToken as any;
            session.user=token.user as any;
            return session;
        }
    }
})