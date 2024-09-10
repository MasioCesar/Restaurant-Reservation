"use client"
import { Header } from "@/components/header";
import { Menu } from "@/components/menu";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function MenuSchedule() {
    const router = useRouter();

    const [arrivalTime, setArrivalTime] = useState("19:00");
    const [orders, setOrders] = useState([
    ]);

    const [selectedItem, setSelectedItem] = useState(null);
    const [popoverTime, setPopoverTime] = useState("19:00");
    const [showPopover, setShowPopover] = useState(false);
    const openPopover = (item) => {
        setSelectedItem(item);
        setShowPopover(true);
    };

    const confirmOrder = () => {
        if (selectedItem) {
            const newOrder = { item: selectedItem, time: popoverTime };
            setOrders([...orders, newOrder]);
            setShowPopover(false);
            setPopoverTime("19:00");
        }
    };

    const calculateTotalPrice = () => {
        return orders.reduce((total, order) => total + order.price, 0);
    };

    const finalizeReservation = () => {
        setReservationDone(true);
        setTimeout(() => {
            router.push("/tables");
        }, 2000);
    };

    const [showConfirmation, setShowConfirmation] = useState(false);
    const [reservationDone, setReservationDone] = useState(false);

    return (
        <div className="flex flex-col h-screen w-full bg-[#231013]">
            {/* Parte de cima */}
            <Header />

            <div>
                <div className="flex items-center justify-center w-full h-[90vh] text-white">
                    <div className="flex justify-between px-[10%] py-4 h-full gap-8 w-full">
                        {/* Parte esquerda - Horários e Pedidos */}
                        <div className="bg-[#621519] p-6 rounded-lg w-2/4 flex flex-col justify-between shadow-lg">
                            <div>
                                {/* Título - Horário de chegada */}
                                <h2 className="text-2xl font-bold mb-6 text-center text-[#f3f3f3] tracking-wide">
                                    Horário de chegada: {arrivalTime}
                                </h2>

                                {/* Lista de Pedidos */}
                                <div className="space-y-4 bg-[#4b0e10] p-4 rounded-md">
                                    {orders.length > 0 ? (
                                        orders.map((order, index) => (
                                            <div
                                                className="flex justify-between p-2 rounded-md shadow-sm hover:bg-[#a75457] transition-all duration-300"
                                                key={index}
                                            >
                                                <span className="font-semibold text-[#f3f3f3]">{order.item}</span>
                                                <span className="font-semibold text-[#f3f3f3]">{order.time}</span>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-center text-[#f3f3f3]">Nenhum pedido adicionado.</p>
                                    )}
                                </div>
                            </div>

                            {/* Botão de Finalizar Pedido */}
                            <button
                                className="bg-[#c7a740] hover:bg-[#d3b35a] text-white font-semibold py-3 px-10 rounded self-center mt-8 shadow-md transition-transform duration-300 hover:scale-105"
                                onClick={() => setShowConfirmation(true)}
                            >
                                Finalizar Pedido
                            </button>
                        </div>

                        {/* Parte direita - Cardápio com scroll e interação */}
                        <Menu addOrder={openPopover} />
                    </div>

                    {/* Popover para selecionar o horário */}
                    {showPopover && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                            <div className="bg-[#4b0e10] text-white p-6 rounded-lg">
                                <h3 className="text-lg font-semibold mb-4">
                                    Escolha o horário para servir a {selectedItem}
                                </h3>
                                <input
                                    type="time"
                                    className="border rounded-md p-2 mb-4 w-full text-black"
                                    value={popoverTime}
                                    onChange={(e) => setPopoverTime(e.target.value)}
                                />
                                <div className="flex justify-between">
                                    <button
                                        className="bg-gray-300 hover:bg-gray-400 text-black font-semibold py-2 px-4 rounded"
                                        onClick={() => setShowPopover(false)}
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        className="bg-[#c7a740] hover:bg-[#d3b35a] text-black font-semibold py-2 px-4 rounded"
                                        onClick={confirmOrder}
                                    >
                                        Confirmar
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {showConfirmation && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                            <div className="bg-[#4b0e10] text-white p-6 rounded-lg">
                                <div className="text-xl font-bold mb-4">Confirmar Pedido</div>
                                {/*
                                <div className="space-y-2">
                                    {orders.map((order, index) => (
                                        <div key={index} className="flex justify-between">
                                            <span>{order.item}</span>
                                            <span>R$ {order.price}</span>
                                        </div>
                                    ))}
                                </div>
                                
                                <div className="mt-4 text-lg font-semibold">
                                    Total: R$ {calculateTotalPrice()}
                                </div>*/}
                                <div className="flex justify-between mt-6 gap-2">
                                    <button
                                        className="bg-gray-300 hover:bg-gray-400 text-black font-semibold py-2 px-4 rounded"
                                        onClick={() => setShowConfirmation(false)}
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        className="bg-[#c7a740] hover:bg-[#d3b35a] text-black font-semibold py-2 px-4 rounded"
                                        onClick={finalizeReservation}
                                    >
                                        Confirmar
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Mensagem de Reserva Feita */}
                    {reservationDone && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                            <div className="bg-[#4b0e10] text-white p-6 rounded-lg">
                                <div className="text-2xl font-bold">Reserva Feita!</div>
                                <div className="mt-4">Você será redirecionado para a página de mesas...</div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}