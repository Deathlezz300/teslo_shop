import { createContext } from "react";

interface UIProps{
    ShowMenu:boolean,
    ChangeMenu:()=>void
}

export const UIContexto=createContext({}as UIProps);