import { createUserWithEmailAndPassword, AuthErrorCodes, signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../config/firebase"

function verificarErro(error) {
    let mensagem = ''
    switch (error.code) {
        case AuthErrorCodes.EMAIL_EXISTS:
            mensagem = 'Esse email já está em uso'
            break
        case AuthErrorCodes.INVALID_EMAIL:
            mensagem = 'Email inválido'
            break
        case AuthErrorCodes.WEAK_PASSWORD:
            mensagem = 'A senha precisa de no minimo 6 caracteres'
            break
        default:
            mensagem = 'Erro desconhecido'
    }
    return mensagem
}

export async function cadastrar(email, senha) {
    const resultado = await createUserWithEmailAndPassword(auth, email, senha)
        .then(() => {
            return 'sucesso'
        })
        .catch((error) => {
            return verificarErro(error)
        })
    return resultado
}

export async function logar(email, senha) {
    const resultado = await signInWithEmailAndPassword(auth, email, senha)
        .then((dadosDoUsuario) => {
            console.log(dadosDoUsuario)
            return 'Sucesso'
        })
        .catch((error) => {
            console.log(error)
            return 'Erro ao logar'
        })
    return sucesso
}