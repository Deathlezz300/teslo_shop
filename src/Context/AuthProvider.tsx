import { AuthContext } from "./AuthContext";
import {FC,useReducer,useEffect} from 'react'
import { AuthReducer, ReducerState } from "./AuthReducer";
import { ReducerUser} from "@/interfaces/User";
import tesloApi from "@/api/teslo_api";
import Cookie from 'js-cookie';

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

    const [state,dispatch]=useReducer(AuthReducer,inital_state);

    const startAuthenticating=async()=>{
        try{

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

    const startLogin=async(email:string,password:string)=>{
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

        }catch(error:any){
            dispatch({type:'SET-ERRORS',payload:error.response.data.message});
            setTimeout(()=>{
                dispatch({type:'SET-ERRORS',payload:null})
            },3000)            
        }

    }

    const startRegister=async(email:string,password:string,name:string)=>{
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

        }catch(error:any){
            dispatch({type:'SET-ERRORS',payload:error.response.data.message});
            setTimeout(()=>{
                dispatch({type:'SET-ERRORS',payload:null})
            },3000)            
        }

    }

    return(
        <AuthContext.Provider value={{...state,startLogin,startRegister}}>
            {children}
        </AuthContext.Provider>
    )

}