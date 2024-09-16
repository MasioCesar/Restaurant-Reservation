import { useState } from 'react';
import Image from 'next/image';

export const Menu = ({ addOrder }) => {
  const [categoriaAtiva, setCategoriaAtiva] = useState('Todos');
  const [selectedDescription, setSelectedDescription] = useState(null);
  const [selectedPrato, setSelectedPrato] = useState(null);
  const [showDescription, setShowDescription] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const pratos = [
    {
      nome: 'Lasanha',
      descricao: 'Camadas de massa fresca intercaladas com molho de tomate rústico, carne moída temperada, queijo ricota cremoso, molho bechamel, espinafre, e uma generosa cobertura de queijo mussarela gratinado.',
      preco: 'R$ 28,45',
      imagem: '/menu.png',
      alt: 'Lasanha',
      categoria: 'Principal'
    },
    {
      nome: 'Macarronada',
      descricao: 'Espaguete al dente envolto em molho de tomate caseiro, pedaços suculentos de frango desfiado, cogumelos frescos, manjericão, azeite de oliva extra virgem, queijo parmesão ralado e uma pitada de pimenta-do-reino.',
      preco: 'R$ 28,98',
      imagem: '/menu.png',
      alt: 'Macarronada',
      categoria: 'Principal'
    },
    {
      nome: 'Parmegiana',
      descricao: 'Filé de frango empanado, frito e coberto com molho de tomate e queijo derretido, servido com arroz e batata frita.',
      preco: 'R$ 18,14',
      imagem: '/menu.png',
      alt: 'Parmegiana',
      categoria: 'Principal'
    },
    {
      nome: 'Suco de Laranja',
      descricao: 'Suco de laranja natural, sem adição de açúcar.',
      preco: 'R$ 10,25',
      imagem: '/menu.png',
      alt: 'Suco de Laranja',
      categoria: 'Bebidas'
    },
    {
      nome: 'Refrigerante',
      descricao: 'Refrigerante de cola, laranja ou limão.',
      preco: 'R$ 8,60',
      imagem: '/menu.png',
      alt: 'Refrigerante',
      categoria: 'Bebidas'
    },
    {
      nome: 'Salada Caesar',
      descricao: 'Alface romana, croutons, molho Caesar e lascas de queijo parmesão.',
      preco: 'R$ 20,36',
      imagem: '/menu.png',
      alt: 'Salada Caesar',
      categoria: 'Entrada'
    }
  ];

  const pratosFiltrados = categoriaAtiva === 'Todos' ? pratos : pratos.filter(prato => prato.categoria === categoriaAtiva);

  const handleShowDescription = (nome, descricao) => {
    setSelectedDescription(descricao);
    setSelectedPrato(nome);
    setShowDescription(true);
  };

  const handleCloseDescription = () => {
    setShowDescription(false);
    setSelectedPrato(null);
    setSelectedDescription(null);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="h-full max-w-[850px] w-full bg-[#541313] rounded-2xl">
      <div className="relative w-full lg:h-16 sm:h-14 bg-[#390912] flex items-center px-4 rounded-t-2xl">
        <div className="flex items-center justify-between w-full h-full">
          <div className="flex items-center">
            <div className="relative  md:w-[70px] md:h-[70px] w-[60px] h-[60px]">
              <Image src="/logo.png" alt="ICBuffet" fill />
            </div>
            <div className="text-[#F3DFA0] md:text-[32px] text-[24px] font-Bebas-Neue whitespace-nowrap leading-nome h-8 md:h-10">
              IC BUFFET
            </div>
          </div>

          <div>
            <div className="relative lg:hidden">
              <button
                onClick={toggleDropdown}
                className="bg-[#CA9A55] text-[#ffffff] rounded-2xl px-4 py-2 font-Roboto text-[14px] lg:text-[16px] font-bold focus:outline-none transition-colors"
              >
                Filtro: {categoriaAtiva}
              </button>
              {dropdownOpen && (
                <div className="absolute top-full right-0 mt-2 bg-[#390912] border-2 border-[#F3DFA0] rounded-lg shadow-lg">
                  {["Todos", "Entrada", "Principal", "Bebidas"].map((category) => (
                    <button
                      key={category}
                      onClick={() => {
                        setCategoriaAtiva(category);
                        setDropdownOpen(false);
                      }}
                      className={`w-full text-center px-4 py-2 hover:bg-[#F3DFA0] hover:text-[#000000] ${categoriaAtiva === category ? 'bg-[#F3DFA0] text-[#000000]' : 'text-[#F3DFA0]'
                        }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="hidden lg:flex px-6 justify-center gap-4">
              {["Todos", "Entrada", "Principal", "Bebidas"].map((category) => (
                <button
                  key={category}
                  onClick={() => setCategoriaAtiva(category)}
                  className={`w-[86px] h-[34px] rounded-2xl font-Roboto text-[14px] lg:text-[16px] transition-colors border-2  ${categoriaAtiva === category
                    ? 'bg-[#CA9A55] text-[#ffffff] border-[#CA9A55] font-bold'
                    : 'bg-[#390912] text-[#F3DFA0] border-[#F3DFA0]'
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <section className="overflow-y-auto h-[60vh] sm:h-[70vh] py-4 px-4">
        {pratosFiltrados.map((prato, index) => (
          <article key={index} className="flex flex-row md:flex-row items-center gap-4 mb-4">
            <div className="relative sm:w-[170px] sm:h-[170px] w-[120px] h-[120px]  flex-shrink-0 rounded-md overflow-hidden shadow-lg">
              <Image
                src={prato.imagem}
                alt={prato.alt}
                fill
                className="cursor-pointer object-cover transition-transform duration-300 hover:scale-105"
                onClick={() => addOrder(prato)}
              />
            </div>

            <div className="text-left flex-1">
              <h2 className="text-[#ffffff] text-[20px] md:text-[24px] font-Bebas-Neue">{prato.nome}</h2>
              <div className="flex flex-col md:flex-row items-start md:items-center md:gap-4">
                <p className="text-[#ffffff] text-[14px] md:text-[16px] font-Roboto-Slab text-justify hidden md:block mb-2">
                  {prato.descricao}
                </p>
                <button
                  className="md:hidden my-2 bg-[#CA9A55] text-white py-1 px-2  rounded-md hover:bg-[#c69c61]"
                  onClick={() => handleShowDescription(prato.nome, prato.descricao)}
                >
                  Ler Descrição
                </button>
              </div>
              <p className="text-[#20170E] text-[20px] font-Bebas-Neue bg-[#F3DFA0] py-0.5 px-2 rounded-md inline-block">
                <span className="text-[14px] font-normal mr-0.5">{prato.preco.slice(0, 3)}</span>
                <span className="text-[20px]">{prato.preco.slice(3)}</span>
              </p>
            </div>
          </article>
        ))}
      </section>

      {showDescription && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="relative bg-white p-4 rounded-lg shadow-lg w-11/12 sm:w-3/4 md:w-1/2 lg:w-1/3">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-black text-2xl pt-1 font-Bebas-Neue font-bold">{selectedPrato}</h3>
              <button
                className="bg-[#CA9A55] text-white py-1 px-2 rounded-md hover:bg-[#c69c61] font-bold ml-4"
                onClick={handleCloseDescription}
              >
                Fechar
              </button>
            </div>
            <p className="text-gray-700 text-justify">{selectedDescription}</p>
          </div>
        </div>
      )}
    </div>
  );
};
