import { ReducerUser } from "@/interfaces/User";
import { IStatus } from "@/interfaces/User";


type ActionType=
    | {type:'SET-USER',payload:ReducerUser}
    | {type:'SET-ERRORS',payload:string | null}
    | {type:'LOG-OUT'}
    | {type:'SET-STATUS',payload:IStatus}

export interface ReducerState{
    status:IStatus,
    user:ReducerUser,
    token:string,
    errors:string | null
}

export const AuthReducer=(state:ReducerState,action:ActionType):ReducerState=>{

    switch(action.type){

        case 'SET-USER':
            return {
                ...state,
                user:{
                    email:action.payload.email,
                    name:action.payload.name,
                    role:action.payload.role
                },
                token:action.payload.token as string,
                status:'authenticated'
            }

        case 'SET-ERRORS':
            return {
                ...state,
                errors:action.payload,
                status:'not-authenticated'
            }

        case 'LOG-OUT':
            return {
                status:'not-authenticated',
                user:{} as ReducerUser,
                token:'',
                errors:null
            }

        case 'SET-STATUS':
            return {
                ...state,
                status:'loading'
            }
        
        default:
            return state;

    }

}