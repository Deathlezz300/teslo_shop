import { FC, useState } from 'react';
import { UIContexto } from './UIContext';

interface props{
    children:JSX.Element | JSX.Element[]
}

export const UIProvider: FC<props> = ({ children }) => {
  
  const [ShowMenu,SetShowMenu]=useState<boolean>(false);

  const [ShowSearch,SetSearch]=useState<boolean>(false);

  const ChangeMenu=()=>{
    SetShowMenu(!ShowMenu);
  }

  const ChangeSearch=()=>{
    SetSearch(!ShowSearch)
  }

  return (
    <UIContexto.Provider value={{ShowMenu,ChangeMenu,ChangeSearch,ShowSearch}}>
        {children}
    </UIContexto.Provider>
  );
};