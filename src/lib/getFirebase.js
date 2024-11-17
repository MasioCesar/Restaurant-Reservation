"use client"
import { createContext } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "./firebase";
import { signOut } from "firebase/auth";

export const GetContext = createContext(null);

export const GetProvider = ({ children }) => {
    const getUserDetails = async () => {
        const ref = doc(db, "users", auth.currentUser.uid);
        const data = await getDoc(ref)
        
        return data.data();
    }

    const getReservations = async (setComandas) => {
        try {
            const userRef = doc(db, "users", auth.currentUser.uid);
            const userDoc = await getDoc(userRef);

            if (userDoc.exists()) {
                const reservations = userDoc.data().reservations || [];
                setComandas(reservations)
            } else {
                console.warn("Documento do usuário não encontrado.");
            }
        } catch (error) {
            console.error("Erro ao buscar reservas:", error);
        }
    };

    const cancelReservation = async (reservationIndex) => {
        try {
            const userRef = doc(db, "users", auth.currentUser.uid);
            const userDoc = await getDoc(userRef);

            if (userDoc.exists()) {
                const reservations = userDoc.data().reservations || [];
                reservations.splice(reservationIndex, 1); // Remove a reserva do array
                await updateDoc(userRef, {
                    reservations: reservations
                });
            } else {
                console.warn("Documento do usuário não encontrado.");
            }
        } catch (error) {
            console.error("Erro ao cancelar a reserva:", error);
        }
    };

    const logoutUser = async () => {
        try {
            await signOut(auth); 
            localStorage.removeItem("restaurantId");
            console.log("Usuário desconectado");
            console.log("restaurantId removido do localStorage");
        } catch (error) {
            console.error("Erro ao fazer logout:", error);
        }
    };

    return (
        <GetContext.Provider
            value={{
                getUserDetails,
                getReservations,
                cancelReservation,
                logoutUser
            }}
        >
            {children}
        </GetContext.Provider>
    );
}
