"use client";
import React, {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";

type UserType = {
  userId: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
};

interface ContextProps {
  userData: UserType[];
  setUserData: Dispatch<SetStateAction<UserType[]>>;
}

const GlobalContext = createContext<ContextProps>({
  userData: [],
  setUserData: (): UserType[] => [],
});

export const GlobalContextProvider = ({ children }: any) => {
  const [userData, setUserData] = useState<[] | UserType[]>([]);

  return (
    <GlobalContext.Provider value={{ userData, setUserData }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
