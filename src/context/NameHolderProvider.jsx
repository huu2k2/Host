import React, { createContext, useContext, useState } from 'react';

const Context = createContext();

const NameHolderProvider = ({ children }) => {
    const [getName, setName] = useState('');

    return (
        <Context.Provider value={{ getName, setName }}>
            {children}
        </Context.Provider>
    );
};

export default  NameHolderProvider
export const useGetName = () => {

    return useContext(Context);
  };