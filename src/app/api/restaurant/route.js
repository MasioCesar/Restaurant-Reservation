import { db, storage } from '../../../lib/firebase';
import { collection, addDoc, getDocs, query } from 'firebase/firestore';
import { NextResponse } from 'next/server';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import crypto from 'crypto';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('imagemRestaurante');
    const data = JSON.parse(formData.get('data'));

    const sanitizedDataNome = data.nome.replace(/\s+/g, '-');
    const folderPath = `images-restaurants/${sanitizedDataNome}-images`;

    const renamedFile = new File([file], `rest-image-${sanitizedDataNome}`, { type: file.type });
    const storageRef = ref(storage, `${folderPath}/${renamedFile.name}`);
    await uploadBytes(storageRef, renamedFile);

    const imageUrl = await getDownloadURL(storageRef);
    data.imagem = imageUrl;

    const imageUrls = [];
    for (let [key, value] of formData.entries()) {
      if (key.startsWith('dish-image-') && value instanceof File) {
        const pratoIndex = key.split('-')[2];
        const pratoNome = key.split('-')[3];

        const renamedFileName = `${parseInt(pratoIndex, 10) + 1}-${sanitizedDataNome}-dish-${pratoNome}`;
        const renamedFile = new File([value], renamedFileName, { type: value.type });

        const pratoStorageRef = ref(storage, `${folderPath}/${renamedFile.name}`);
        await uploadBytes(pratoStorageRef, renamedFile);

        const pratoImageUrl = await getDownloadURL(pratoStorageRef);
        imageUrls[pratoIndex] = pratoImageUrl;
      }
    }

    // Associar os URLs das imagens aos pratos na ordem correta, caso haja imagens disponíveis
    if (imageUrls && imageUrls.length > 0) {
      data.cardapio.forEach((prato, index) => {
        if (index < imageUrls.length) {
          prato.imagem = imageUrls[index];
        }
      });
    }

    const uniqueCode = crypto.randomBytes(4).toString('hex');
    const encryptedCode = crypto.createHash('sha256').update(uniqueCode).digest('hex');

    // Criação do documento de um restaurante
    const { mesas, ...restData } = data;
    const docRef = await addDoc(collection(db, 'restaurant'), {
      ...restData,
      employeeAccessCode: encryptedCode,
    });

    // add cada mesa como um subdocumento da coleção "mesas" dentro do restaurante
    if (Array.isArray(data.mesas)) {
      for (const mesa of data.mesas) {
        await addDoc(collection(db, `restaurant/${docRef.id}/mesas`), mesa);
      }
    }

    return NextResponse.json({ id: docRef.id, uniqueCode: uniqueCode });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao adicionar o documento' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const restaurantsRef = collection(db, 'restaurant');
    const q = query(restaurantsRef);
    const querySnapshot = await getDocs(q);

    // Filtrar os campos que você deseja
    const restaurants = querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        nome: data.nome,
        abre: data.abre,
        fecha: data.fecha,
        descricao: data.descricao,
        imagem: data.imagem ?? null,
        endereco: data.endereco,
      };
    });

    return NextResponse.json(restaurants);
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar os documentos' }, { status: 500 });
  }
}












/*
import { db } from '../../../lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import crypto from 'crypto';

export async function POST(request) {
  const { restaurantId, providedCode } = await request.json();

  // Criptografar o código fornecido pelo usuário
  const encryptedProvidedCode = crypto.createHash('sha256').update(providedCode).digest('hex');

  // Consultar o banco de dados para obter o código criptografado do restaurante
  const q = query(collection(db, 'restaurant'), where('id', '==', restaurantId));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    return NextResponse.json({ error: 'Restaurante não encontrado' }, { status: 404 });
  }

  const restaurantData = querySnapshot.docs[0].data();

  // Comparar o código criptografado fornecido com o código armazenado
  if (restaurantData.employeeAccessCode === encryptedProvidedCode) {
    return NextResponse.json({ message: 'Autenticação bem-sucedida' });
  } else {
    return NextResponse.json({ error: 'Código inválido' }, { status: 401 });
  }
}
*/