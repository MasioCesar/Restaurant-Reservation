"use client"
import { Suspense, useEffect, useState } from "react";
import { Header } from "@/components/header";
import { useRouter, useSearchParams } from "next/navigation";
import { Box, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { MenuCronograma } from "@/components/menuCronograma";

const convertPriceStringToNumber = (priceString) => {
	const numericString = priceString.replace('R$ ', '').replace(',', '.');
	return parseFloat(numericString).toFixed(2);
};

const horariosDisponiveis = ["17:00", "17:15", "17:30", "17:45", "18:00", "18:15", "18:30", "18:45", "19:00", "19:15", "19:30", "19:45", "20:00",
	"20:15", "20:30", "20:45", "21:00", "21:15", "21:30", "21:45", "22:00", "22:15", "22:30", "22:45", "23:00", "23:15", "23:30", "23:45", "00:00"
];

export default function MenuSchedule() {
	const router = useRouter();

	const [arrivalTime, setArrivalTime] = useState();
	const [orders, setOrders] = useState([]);
	const [selectedItem, setSelectedItem] = useState(null);
	const [popoverTime, setPopoverTime] = useState();
	const [showPopover, setShowPopover] = useState(false);
	const [quantity, setQuantity] = useState(1);
	const [selectedPrice, setSelectedPrice] = useState(0);
	const [showConfirmation, setShowConfirmation] = useState(false);
	const [reservationDone, setReservationDone] = useState(false);
	const [showPopUpP, setShowPopUpP] = useState(false);

	const searchParams = useSearchParams();

	useEffect(() => {
		if (typeof window !== 'undefined') {  // Verifica se estamos no cliente
			const timeParam = searchParams.get('time');
			if (timeParam) {
				setArrivalTime(timeParam);
				setPopoverTime(timeParam)
			}
		}
	}, [searchParams]);

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
		}
	};

	const handleTimeChange = (event) => {
		setPopoverTime(event.target.value);
	};

	const calculateTotalPrice = () => {
		return orders.reduce((total, order) => total + (order.price * order.quantity), 0).toFixed(2);
	};

	const handleRemoveItem = (index) => {
		const updatedOrders = [...orders];
		const currentOrder = updatedOrders[index];

		if (currentOrder.quantity > 1) {
			updatedOrders[index].quantity -= 1;
		} else {
			updatedOrders.splice(index, 1);
		}

		setOrders(updatedOrders);
	};

	const finalizeReservation = () => {
		setReservationDone(true);
		setTimeout(() => {
			router.push("/account?section=reservas");
		}, 2000);
	};

	return (
		<Suspense fallback={<div>Carregando...</div>}>
			<div className="flex flex-col h-screen w-full bg-[#231013] overflow-hidden">
				<Header />
				<div className="flex flex-1 items-center justify-center overflow-hidden relative">
					<div className="flex flex-1 flex-col lg:flex-row justify-center px-4 py-4 md:px-8 xl:px-[15%] h-[86vh] w-[90vw] overflow-hidden">
						<div className="font-poppins hide-on-small flex flex-col bg-[rgba(84,19,19,0.7)] p-4 md:p-6 lg:p-8 rounded-lg  md:rounded-2xl shadow-lg flex-grow max-w-full max-h-full justify-between">
							<div>
								<h2 className="text-xl xl:text-2xl font-bold mb-6 text-center text-[#CA9A55]">
									Horário de chegada: {arrivalTime}
								</h2>
								<div className="space-y-2 md:space-y-3 min-w-[404px] max-h-[55vh] overflow-y-auto overflow-x-hidden">
									{orders.length > 0 ? (
										orders.map((order, index) => (
											<div className="flex flex-row justify-between items-center pb-2 text-center" key={index}>
												<span className="text-base xl:text-lg 2xl:text-xl bg-[#4D1616] font-semibold text-[#f3f3f3] rounded-xl px-4 py-2 min-w-[220px] inline-block itens-center truncate">
													{order.item}
												</span>
												<span className="text-base xl:text-lg 2xl:text-xl font-semibold text-[#f3f3f3] px-2 w-5">:</span>
												<span className="text-base xl:text-lg 2xl:text-xl bg-[#4D1616] font-semibold text-[#f3f3f3] rounded-xl px-4 py-2 min-w-[100px] inline-block itens-center truncate">
													{order.time}
												</span>
												<span className="text-base xl:text-lg 2xl:text-xl text-center font-semibold text-[#f3f3f3] w-10">
													x{order.quantity}
												</span>
												<button
													className="text-base xl:text-lg 2xl:text-xl text-red-600 hover:text-red-800 w-6"
													onClick={() => handleRemoveItem(index)}
												>
													🗑️
												</button>
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

						<div className="hide-on-small p-4"></div>
						<Box className="w-full">
							<MenuCronograma addOrder={openPopover} />
						</Box>
						<div className="pt-4 text-center">
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

					{/* Outros componentes de PopUp */}
					{showPopUpP && (
						<div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center transition-opacity duration-300">
							{/* Conteúdo do PopUp */}
						</div>
					)}

					{/* Outros estados como showConfirmation e reservationDone */}
					{showConfirmation && (
						<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
							{/* Conteúdo da confirmação */}
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
			</div>
		</Suspense>
	);
}
