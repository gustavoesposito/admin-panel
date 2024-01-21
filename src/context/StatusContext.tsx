'use client'

import { createContext, useContext, useState } from "react";

enum UserStatus {
  Ativo = "Ativo",
  Inativo = "Inativo",
}

type User = {
  id: number;
  status: UserStatus;
};

type Context = {
  userStatus: User[];
  toggleStatus: (userId: number) => void;
};

const AppContext = createContext<Context>({
  userStatus: [],
  toggleStatus: () => { },
});

export function AppWrapper({ children }: { children: React.ReactNode }) {
  const [userStatus, setUsers] = useState<User[]>([]);

  const toggleStatus = (userId: number) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => {
        if (user.id === userId) {
          const newStatus =
            user.status === UserStatus.Ativo
              ? UserStatus.Inativo
              : UserStatus.Ativo;
          return { ...user, status: newStatus };
        }
        return user;
      })
    );
  };

  return (
    <AppContext.Provider value={{ userStatus, toggleStatus }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
