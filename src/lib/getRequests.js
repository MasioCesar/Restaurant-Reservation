import { useContext, useEffect, useState } from "react";
import { GetContext } from "./getFirebase";

export const useUserDetails = () => {
    const getContext = useContext(GetContext);
    const [userDetails, setUserDetails] = useState(null);

    useEffect(() => {
        getContext.getUserDetails().then((value) => {
            setUserDetails(value);
        }).catch(console.error);
    }, [getContext]);

    return userDetails;
};


export const Reservations = (setComandas) => {
    const getContext = useContext(GetContext);
    const [isLoaded, setIsLoaded] = useState(false);

    const fetchReservations = () => {
        getContext.getReservations(setComandas);
        setIsLoaded(true)
    };

    useEffect(() => {
        if (!isLoaded) {
            fetchReservations();
        }
    }, [isLoaded]);
};

export const AllRanking = (setRanking) => {
    const getContext = useContext(GetContext);
    const [isLoaded, setIsLoaded] = useState(false);

    const Ranking = () => {
        getContext.getRanking(setRanking);
        setIsLoaded(true);
    }

    useEffect(() => {
        if (!isLoaded) {
            Ranking();
        }
    }, [isLoaded]);
}
