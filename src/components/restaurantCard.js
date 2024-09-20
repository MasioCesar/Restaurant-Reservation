import { Box } from "@mui/material";
import Image from 'next/image';
import {useRouter} from 'next/navigation';

export default function restaurantCard({restaurante}){
    const router = useRouter();

  
    const handleClick = () => {
        router.push("/tables");
    };

    return (
                <Box className="bg-[#461213] w-[400px] h-[400px] cursor-pointer transition-transform duration-200 
                hover:scale-[1.03] shadow-[8px_8px_12px_rgba(0,0,0,0.2)]"
                onClick={handleClick}>
                    <Image
                        src = {restaurante.imagem}
                        alt = {restaurante.nome}
                        width={400}
                        height={200}
                        className="w-full h-52 object-cover"
                    />
                    <h2 className="text-white text-xl mt-5 mb-3 ml-5">{restaurante.nome}</h2>
                    <p className="text-[#ffffff] text-[14px] ml-5 font-roboto-slab">Abre: {restaurante.abre}</p>
                    <p className="text-[#ffffff] text-[14px] ml-5 font-roboto-slab">Fecha: {restaurante.fecha}</p>
                    <p className="text-[#ffffff] text-[14px] ml-5 font-roboto-slab">{restaurante.descricao}</p>
                </Box>
    )
}