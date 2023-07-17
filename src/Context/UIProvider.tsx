import { FC, useState } from 'react';
import { UIContexto } from './UIContext';


interface props{
    children:JSX.Element | JSX.Element[]
}

export const UIProvider: FC<props> = ({ children }) => {
  
  const [ShowMenu,SetShowMenu]=useState<boolean>(false);

  const ChangeMenu=()=>{
    SetShowMenu(!ShowMenu);
  }

  return (
    <UIContexto.Provider value={{ShowMenu,ChangeMenu}}>
        {children}
    </UIContexto.Provider>
  );
};