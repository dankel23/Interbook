import { db } from "../config/firebase";
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, onSnapshot } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL} from 'firebase/storage'

import { storage } from './../config/firebase'

export async function pegarProdutos() {
    try {
        const querySnapshot = await getDocs(collection(db, 'Produtos'))
        let produtos = []
        querySnapshot.forEach((doc) => {
            let produto = { id: doc.id, ...doc.data() }
            produtos.push(produto)
        });
        return produtos
    } catch (error) {
        console.log(error)
        return []
    }
}

export async function salvarImagem(imagem, imagemNome) {
    if (!imagem) return;
    const downloadsImagem = await fetch(imagem)
    const blobImagem = await downloadsImagem.blob()
    const imagemRef = ref(storage, `imagens/${imagemNome}.png`)

    try {
       await uploadBytes(imagemRef, blobImagem)
        const url = await getDownloadURL(imagemRef)
        return url
    } catch (error) {
        console.log(error)
        return null
    }
}

export async function cadastrarProduto(data) {
    try {
        const result = await addDoc(collection(db, 'Produtos'), data)
        return 'sucesso'
    } catch (error) {
        return 'erro'
    }
}

export async function pegarProdutoTempoReal(setProdutos) {
    const ref = query(collection(db, 'Produtos'))
    onSnapshot(ref, (querySnapshot) => {
        const Produtos = []
        querySnapshot.forEach((doc) => {
            Produtos.push({ id: doc.id, ...doc.data() })
        })
        setProdutos(Produtos)
    })
}