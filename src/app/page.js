"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '@/lib/firebase';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push('/restaurants'); // Usuário autenticado
      } else {
        router.push('/login'); // Usuário não autenticado
      }
    });

    return () => unsubscribe();
  }, [router]);

  return null;
}
