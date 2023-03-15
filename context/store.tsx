"use client";
import React, {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";

type UserType = {
  user: {
    _id: string;
    firstName: string;
    lastName: string;
    username: string;
    password: string;
  };
  token: string;
};

interface ContextProps {
  userData: UserType;
  setUserData: any;
}

const GlobalContext = createContext<any>({
  userData: {},
  setUserData: (): UserType[] => [],
});

export const GlobalContextProvider = ({ children }: any) => {
  const [userData, setUserData] = useState<{} | UserType>({});

  return (
    <GlobalContext.Provider value={{ userData, setUserData }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
