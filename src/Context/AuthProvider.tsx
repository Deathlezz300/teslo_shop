import { AuthContext } from "./AuthContext";
import {FC,useReducer,useEffect} from 'react'
import { AuthReducer, ReducerState } from "./AuthReducer";
import { ReducerUser} from "@/interfaces/User";
import tesloApi from "@/api/teslo_api";
import Cookie from 'js-cookie';
import { useRouter } from "next/router";

interface props{
    children:JSX.Element | JSX.Element[]
}

const inital_state:ReducerState={
    status:'not-authenticated',
    user:{} as ReducerUser,
    errors:null,
    token:''
}

export const AuthProvider:FC<props> =({children})=>{

    const router=useRouter();

    const [state,dispatch]=useReducer(AuthReducer,inital_state);

    const startAuthenticating=async()=>{
        try{

            if(!Cookie.get('token')) return ;


            const {data}=await tesloApi.get('/auth/validate-token');        
    
            const {user,token}=data;
    
            const userToReducer:ReducerUser={
                ...user,
                token
            }
    
            Cookie.set('token',token);
    
            dispatch({type:'SET-USER',payload:userToReducer});

        }catch(error:any){
            dispatch({type:'SET-ERRORS',payload:error.response.data.message})
            setTimeout(()=>{
                dispatch({type:'SET-ERRORS',payload:null})
            },3000)
        }
    }

    useEffect(()=>{
        startAuthenticating();
    },[])

    const startLogin=async(email:string,password:string):Promise<boolean>=>{
        dispatch({type:'SET-STATUS',payload:'loading'});
        try{

            const {data}=await tesloApi.post('/auth/login',{email,password});

            const {user,token}=data;

            const userToReducer:ReducerUser={
                ...user,
                token
            }

            Cookie.set('token',token);

            dispatch({type:'SET-USER',payload:userToReducer});

            return true;

        }catch(error:any){
            dispatch({type:'SET-ERRORS',payload:error.response.data.message});
            setTimeout(()=>{
                dispatch({type:'SET-ERRORS',payload:null})
            },3000)
            return false;            
        }

    }

    const startRegister=async(email:string,password:string,name:string):Promise<boolean>=>{
        dispatch({type:'SET-STATUS',payload:'loading'});
        try{

            const {data}=await tesloApi.post('/auth/register',{email,password,name});

            const {user,token}=data;

            const userToReducer:ReducerUser={
                ...user,
                token
            }

            Cookie.set('token',token);

            dispatch({type:'SET-USER',payload:userToReducer});

            return true;

        }catch(error:any){
            dispatch({type:'SET-ERRORS',payload:error.response.data.message});
            setTimeout(()=>{
                dispatch({type:'SET-ERRORS',payload:null})
            },3000)
            
            return false;
        }

    }

    const startLogOut=()=>{
        dispatch({type:'LOG-OUT'});
        Cookie.remove('token');
        Cookie.remove('cart');
        //Recargar la aplicacion como si se diese f5
        router.reload();
    }

    return(
        <AuthContext.Provider value={{...state,startLogin,startRegister,startLogOut}}>
            {children}
        </AuthContext.Provider>
    )

}