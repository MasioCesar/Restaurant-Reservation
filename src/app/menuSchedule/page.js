"use client"
import { useState } from "react";
import { Header } from "@/components/header";
import { Menu } from "@/components/menu";
import { useRouter } from "next/navigation";
import { Box } from "@mui/material";

const convertPriceStringToNumber = (priceString) => {
    const numericString = priceString.replace('R$ ', '').replace(',', '.');
    return parseFloat(numericString).toFixed(2);
};

export default function MenuSchedule() {
    const router = useRouter();

    const [arrivalTime, setArrivalTime] = useState("19:00");
    const [orders, setOrders] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [popoverTime, setPopoverTime] = useState("19:00");
    const [showPopover, setShowPopover] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [selectedPrice, setSelectedPrice] = useState(0);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [reservationDone, setReservationDone] = useState(false);
    const [showPopUpP, setShowPopUpP] = useState(false);

    const openPopover = (item) => {
        console.log("Opening popover for item:", item);
        setSelectedItem(item.nome);
        setSelectedPrice(convertPriceStringToNumber(item.preco));
        setQuantity(1);
        setShowPopover(true);
    };

    const confirmOrder = () => {
        console.log("Confirming order with item:", selectedItem);
        if (selectedItem) {
            const existingOrderIndex = orders.findIndex(
                (order) => order.item === selectedItem && order.time === popoverTime
            );

            if (existingOrderIndex !== -1) {
                const updatedOrders = [...orders];
                updatedOrders[existingOrderIndex] = {
                    ...updatedOrders[existingOrderIndex],
                    quantity: updatedOrders[existingOrderIndex].quantity + quantity,
                    price: updatedOrders[existingOrderIndex].price,
                };
                setOrders(updatedOrders);
            } else {
                const newOrder = { item: selectedItem, time: popoverTime, quantity: quantity, price: selectedPrice };
                setOrders([...orders, newOrder]);
            }

            setShowPopover(false);
            setPopoverTime("19:00");
        }
    };

    const calculateTotalPrice = () => {
        return orders.reduce((total, order) => total + (order.price * order.quantity), 0).toFixed(2);
    };

    const finalizeReservation = () => {
        setReservationDone(true);
        setTimeout(() => {
            router.push("/account?section=reservas");
        }, 2000);
    };

    return (
        <div className="flex flex-col h-screen w-full bg-[#231013] overflow-hidden">
            <Header />
            <div className="flex flex-1 items-center justify-center overflow-hidden relative">
                <div className="flex flex-1 flex-col lg:flex-row justify-center px-4 py-4 md:px-8  xl:px-[15%] gap-8 h-[86vh] w-[90vw] overflow-hidden">
                    <div className="hide-on-small flex flex-col bg-[rgba(84,19,19,0.7)] p-4 md:p-6 lg:p-8 rounded-lg  md:rounded-2xl shadow-lg flex-grow max-w-full max-h-full justify-between">
                        <div>

                            <h2 className="text-lg xl:text-xl 2xl:text-2xl font-bold mb-6 text-center text-[#CA9A55]">
                                Horário de chegada: {arrivalTime}
                            </h2>
                            <div className="space-y-2 md:space-y-3 min-w-[380px]">
                                {orders.length > 0 ? (
                                    orders.map((order, index) => (
                                        <div
                                            className="flex flex-row justify-between items-center pb-2 text-center"
                                            key={index}
                                        >
                                            <span className="text-base xl:text-lg 2xl:text-xl bg-[#4D1616] font-semibold text-[#f3f3f3] rounded-xl px-4 py-2 min-w-[220px] inline-block itens-center truncate">
                                                {order.item}
                                            </span>

                                            <span className="text-base xl:text-lg 2xl:text-xl font-semibold text-[#f3f3f3] px-2 w-5">:</span>

                                            <span className="text-base xl:text-lg 2xl:text-xl bg-[#4D1616] font-semibold text-[#f3f3f3] rounded-xl px-4 py-2 min-w-[100px] inline-block itens-center truncate">
                                                {order.time}
                                            </span>

                                            <span className="text-base xl:text-lg 2xl:text-xl  text-center font-semibold text-[#f3f3f3] w-10">
                                                x{order.quantity}
                                            </span>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-base xl:text-lg 2xl:text-xl text-[#ffffff] bg-[#4D1616] font-semibold text-center rounded-xl px-8 py-4">
                                        Nenhum pedido adicionado.
                                    </p>
                                )}
                            </div>
                        </div>


                        <button
                            className={`text-lg xl:text-xl 2xl:text-2xl bg-[#CA9A55] text-white font-semibold py-2 px-6 rounded mt-4 shadow-md ${orders.length > 0 ? 'hover:bg-[#c69c61] transition-transform duration-300 hover:scale-105' : 'cursor-not-allowed'}`}
                            onClick={orders.length > 0 ? () => setShowConfirmation(true) : undefined}
                        >
                            Finalizar Pedido
                        </button>
                    </div>
                    <Box className="w-full">
                        <Menu addOrder={openPopover} />
                    </Box>
                    <div className=" text-center">
                        {!showPopUpP && (
                            <button
                                className="lg:hidden w-[90%] text-lg bg-[#CA9A55] text-white p-3 md:mb-6 rounded-full shadow-lg"
                                onClick={() => setShowPopUpP(true)}
                            >
                                Finalizar Pedido
                            </button>
                        )}
                    </div>

                </div>

                {/* PopUp pedidos */}
                <div className={`fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center transition-opacity duration-300 ${showPopUpP ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                    <div className="bg-[#4b0e10] text-white p-4 rounded-lg shadow-lg w-11/12 sm:w-3/4 md:w-1/2 lg:w-1/3 relative flex flex-col items-center">

                        <button className="absolute top-2 right-2 text-white text-xl font-bold" onClick={() => setShowPopUpP(false)}>
                            &times;
                        </button>

                        <h2 className="text-xl font-bold mb-4 pt-0.5 text-center text-[#CA9A55] tracking-wide">
                            Horário de chegada: {arrivalTime}
                        </h2>

                        <div className="space-y-2 mb-4 flex-1">
                            {orders.length > 0 ? (
                                orders.map((order, index) => (
                                    <div className="flex justify-between items-center pb-2" key={index}>
                                        <span className="text-sm md:text-base lg:text-lg bg-[#4D1616] font-semibold text-[#f3f3f3] rounded-xl px-2 md:px-4 py-1 md:py-2 min-w-[150px] text-center truncate">
                                            {order.item}
                                        </span>
                                        <span className="text-sm md:text-base lg:text-lg font-semibold text-[#f3f3f3] px-2">:</span>
                                        <span className="text-sm md:text-base lg:text-lg bg-[#4D1616] font-semibold text-[#f3f3f3] rounded-xl px-2 md:px-4 py-1 md:py-2 min-w-[100px] text-center truncate">
                                            {order.time}
                                        </span>
                                        <span className="text-sm md:text-base lg:text-lg font-semibold text-[#f3f3f3] w-12 text-center">
                                            x{order.quantity}
                                        </span>
                                    </div>
                                ))
                            ) : (
                                <p className="text-sm md:text-base lg:text-lg text-[#f3f3f3] bg-[#4D1616] font-semibold text-center rounded-xl px-4 py-2">
                                    Nenhum pedido adicionado.
                                </p>
                            )}
                        </div>

                        <button
                            className={`bg-[#CA9A55] text-white font-semibold py-2 md:py-3 px-6 md:px-8 lg:px-12 rounded mt-4 shadow-md ${orders.length > 0 ? 'hover:bg-[#c69c61] transition-transform duration-300 hover:scale-105' : 'cursor-not-allowed'}`}
                            onClick={orders.length > 0 ? () => setShowConfirmation(true) : undefined}
                        >
                            Finalizar Pedido
                        </button>


                    </div>
                </div>

            </div>

            {showPopover && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-[#4b0e10] text-white p-6 rounded-lg">
                        <h3 className="text-lg font-semibold mb-4 text-center">
                            Escolha o horário e a quantidade
                            <br></br>
                            para servir a {selectedItem}
                        </h3>

                        <input
                            type="time"
                            className="border rounded-md p-2 mb-4 w-full text-black"
                            value={popoverTime}
                            onChange={(e) => setPopoverTime(e.target.value)}
                        />
                        <input
                            type="number"
                            className="border rounded-md p-2 mb-4 w-full text-black"
                            value={quantity}
                            onChange={(e) => setQuantity(Number(e.target.value))}
                            min="1"
                        />
                        <div className="flex justify-between">
                            <button
                                className="bg-gray-300 hover:bg-gray-400 text-black font-semibold py-2 px-4 rounded"
                                onClick={() => setShowPopover(false)}
                            >
                                Cancelar
                            </button>
                            <button
                                className="bg-[#CA9A55] hover:bg-[#c69c61a1] text-white font-semibold py-2 px-4 rounded"
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

                    <div className="bg-[#4b0e10] text-white rounded-lg p-7 pt-3 max-w-lg mx-auto">
                        <div className="md:text-2xl text-lg text-center font-bold py-4">Confirmar Pedido</div>

                        <div className="space-y-2">
                            {orders.map((order, index) => (
                                <div key={index} className="grid grid-cols-[118px_98px_80px] gap-2 sm:grid-cols-[150px_128px_100px] sm:gap-4">
                                    <span className="lg:text-lg text-sm"> {order.item}</span>
                                    <span className="lg:text-lg text-sm text-left">R$ {order.price} x{order.quantity}</span>
                                    <span className="lg:text-lg text-sm text-left">R$ {(order.price * order.quantity).toFixed(2)}</span>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 lg:text-lg text-base font-semibold flex justify-between border-t border-gray-400 pt-4">
                            <span>Total:</span>
                            <span>R$ {calculateTotalPrice()}</span>
                        </div>

                        <div className="flex justify-between pt-6">
                            <button
                                className="bg-gray-300 hover:bg-gray-400 text-black font-semibold py-2 px-4 rounded"
                                onClick={() => setShowConfirmation(false)}
                            >
                                Cancelar
                            </button>
                            <button
                                className="bg-[#CA9A55] hover:bg-[#c69c61a1] text-white font-semibold py-2 px-4 rounded"
                                onClick={finalizeReservation}
                            >
                                Confirmar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {reservationDone && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-[#4b0e10] text-white rounded-lg p-7 pt-3 max-w-lg mx-auto text-center">
                        <div className="text-2xl font-bold py-4">Reserva feita com sucesso!</div>
                        <p>Aguarde um momento enquanto você é redirecionado...</p>
                    </div>
                </div>
            )}
        </div>
    );
}
