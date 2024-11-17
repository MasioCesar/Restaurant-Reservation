import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';

const useAuth = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push('/login');  // Redireciona se o usuário não estiver autenticado
      } else {
        setUser(user);  // Define o usuário se autenticado
      }
    });

    return () => unsubscribe();
  }, [router]);

  return user;  // Retorna o usuário ou null
};

export default useAuth;  // Certifique-se de exportar como default
