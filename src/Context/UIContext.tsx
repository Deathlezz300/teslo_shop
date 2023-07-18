import { createContext } from "react";

interface UIProps{
    ShowMenu:boolean,
    ShowSearch:boolean,
    ChangeMenu:()=>void,
    ChangeSearch:()=>void
}

export const UIContexto=createContext({}as UIProps);