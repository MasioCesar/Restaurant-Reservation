"use client"
import { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '@/lib/firebase'; // Certifique-se de que este caminho esteja correto
import { onAuthStateChanged } from 'firebase/auth'; // Importação da função onAuthStateChanged

// Contexto de usuário
const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Estado de carregamento para aguardar a verificação do auth

  useEffect(() => {
    // Observador de mudanças de autenticação
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user); // Atualiza o usuário autenticado
      setLoading(false); // Atualiza o estado de carregamento após a verificação
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
