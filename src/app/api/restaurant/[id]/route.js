import { db } from '../../../../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { NextResponse } from 'next/server';
import { collection, getDocs } from 'firebase/firestore';

export async function GET(request, { params }) {
    const { id } = params;

    if (!id) {
        return NextResponse.json({ error: 'ID não fornecido' }, { status: 400 });
    }

    try {
        const restaurantRef = doc(db, 'restaurant', id);
        const restaurantSnap = await getDoc(restaurantRef);

        if (restaurantSnap.exists()) {
            const data = restaurantSnap.data();
            const restaurant = {
                abre: data.abre,
                fecha: data.fecha,
                mesas: [],
                cardapio: data.cardapio,
            };

            const mesasRef = collection(db, 'restaurant', id, 'mesas');
            const mesasSnapshot = await getDocs(mesasRef);
            
            mesasSnapshot.forEach((doc) => {
                const mesaData = doc.data();
                const orderedMesaData = {
                    number: mesaData.number,
                    reservations: mesaData.reservations,
                    id: doc.id, // Adiciona o ID do documento ao objeto mesa
                };
                restaurant.mesas.push(orderedMesaData);
            });
            
            restaurant.mesas.sort((a, b) => a.number - b.number);

            return NextResponse.json(restaurant);
        } else {
            return NextResponse.json({ error: 'Restaurante não encontrado' }, { status: 404 });
        }
    } catch (error) {
        return NextResponse.json({ error: 'Erro ao buscar o documento' }, { status: 500 });
    }
}
