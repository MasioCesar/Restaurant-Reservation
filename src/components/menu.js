import { useState } from 'react';
import Image from 'next/image';

export const Menu = ({ addOrder }) => {
    const [categoriaAtiva, setCategoriaAtiva] = useState('Todos');

    const pratos = [
        {
            nome: 'Lasanha',
            descricao: 'Camadas de massa fresca intercaladas com molho de tomate rústico, carne moída temperada, queijo ricota cremoso, molho bechamel, espinafre, e uma generosa cobertura de queijo mussarela gratinado.',
            preco: 'R$ 28,00',
            imagem: '/menu.png',
            alt: 'Lasanha',
            categoria: 'Principal'
        },
        {
            nome: 'Macarronada',
            descricao: 'Espaguete al dente envolto em molho de tomate caseiro, pedaços suculentos de frango desfiado, cogumelos frescos, manjericão, azeite de oliva extra virgem, queijo parmesão ralado e uma pitada de pimenta-do-reino.',
            preco: 'R$ 28,00',
            imagem: '/menu.png',
            alt: 'Macarronada',
            categoria: 'Principal'
        },
        {
            nome: 'Parmegiana',
            descricao: 'Filé de frango empanado, frito e coberto com molho de tomate e queijo derretido, servido com arroz e batata frita.',
            preco: 'R$ 28,00',
            imagem: '/menu.png',
            alt: 'Parmegiana',
            categoria: 'Principal'
        },
        {
            nome: 'Suco de Laranja',
            descricao: 'Suco de laranja natural, sem adição de açúcar.',
            preco: 'R$ 10,00',
            imagem: '/menu.png',
            alt: 'Suco de Laranja',
            categoria: 'Bebidas'
        },
        {
            nome: 'Refrigerante',
            descricao: 'Refrigerante de cola, laranja ou limão.',
            preco: 'R$ 8,00',
            imagem: '/menu.png',
            alt: 'Refrigerante',
            categoria: 'Bebidas'
        },
        {
            nome: 'Salada Caesar',
            descricao: 'Alface romana, croutons, molho Caesar e lascas de queijo parmesão.',
            preco: 'R$ 20,00',
            imagem: '/menu.png',
            alt: 'Salada Caesar',
            categoria: 'Entrada'
        }
    ];

    // Filtro dos pratos com base na categoria ativa
    const pratosFiltrados = categoriaAtiva === 'Todos' ? pratos : pratos.filter(prato => prato.categoria === categoriaAtiva);

    return (
        <div className=" w-full bg-[#541313]">
            {/* Cabeçalho do cardápio */}
            <div className="relative w-full bg-[#390912] flex flex-row gap-8">
                <div className='flex justify-start items-center'>
                    <div className="relative w-[90px] h-[90px]">
                        <Image src="/logo.png" alt="ICBuffet" fill />
                    </div>
                    <div className="text-[#F3DFA0] text-[24px] lg:text-[32px] font-[Bebas-Neue] tracking-wider">
                        IC BUFFET
                    </div>
                </div>
                <div className="flex justify-center gap-4 my-6">
                    {["Todos", "Entrada", "Principal", "Bebidas"].map((category) => (
                        <button
                            key={category}
                            onClick={() => setCategoriaAtiva(category)}
                            className={`px-4 py-2 rounded font-[Roboto] text-[18px] lg:text-[20px] transition-colors ${categoriaAtiva === category
                                ? 'bg-[#F3DFA0] text-[#000000]'
                                : 'bg-[#390912] text-[#F3DFA0]'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>
            {/* Seção de itens do cardápio com scroll */}
            <section className="overflow-y-auto h-[75vh] space-y-10 p-4">
                {pratosFiltrados.map((prato, index) => (
                    <article key={index} className="flex flex-col lg:flex-row items-start gap-6">
                        <div className="relative w-[200px] h-[200px] flex-shrink-0 rounded-md overflow-hidden shadow-lg">
                            <Image
                                src={prato.imagem}
                                alt={prato.alt}
                                fill
                                className="object-cover transition-transform duration-300 hover:scale-105"
                                onClick={() => addOrder(prato.nome)} // Adiciona o prato ao cronograma ao clicar
                            />
                        </div>
                        <div className="text-center lg:text-left max-w-[600px]">
                            <h2 className="text-[#EAEAEA] text-[28px] lg:text-[32px] font-[Bebas Neue]">{prato.nome}</h2>
                            <p className="text-[#EAEAEA] text-[16px] lg:text-[18px] font-[Roboto Slab]">
                                {prato.descricao}
                            </p>
                            <p className="mt-2 text-[#F3DFA0] text-[24px] font-[Bebas Neue] tracking-wider">{prato.preco}</p>
                        </div>
                    </article>
                ))}
            </section>
        </div>
    );
};