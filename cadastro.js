import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// 1. CONFIGURAÇÃO
const firebaseConfig = {
    apiKey: "AIzaSyCmxZVNT7K8ZLV627XeKYRDJiViGw5OUCk",
    authDomain: "cadastrocasas-50f8a.firebaseapp.com",
    projectId: "cadastrocasas-50f8a",
    storageBucket: "cadastrocasas-50f8a.firebasestorage.app",
    messagingSenderId: "393041222159",
    appId: "1:393041222159:web:c064df3b250abdb340e17a"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// --- FUNÇÃO DE CADASTRO DE USUÁRIO (CLIENTE) ---
async function cadastrarUsuario() {
    const nome = document.getElementById('clienteNome').value;
    const email = document.getElementById('clienteEmail').value;
    const senha = document.getElementById('clienteSenha').value;
    const btn = document.getElementById('btn-cadastrar');

    if (!nome || !email || !senha) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    try {
        btn.innerText = "Criando conta...";
        btn.disabled = true;

        // 1. Cria o login no Firebase Auth
        const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
        const user = userCredential.user;

        // 2. Salva os dados extras no Firestore (Coleção "usuarios")
        // Isso é o que permite você listar os usuários no Admin depois!
        await setDoc(doc(db, "usuarios", user.uid), {
            nome: nome,
            email: email,
            id: user.uid,
            dataCadastro: new Date(),
            favoritos: [] // Começa com lista de favoritos vazia
        });

        alert("Conta criada com sucesso!");
        window.location.href = "index.html";

    } catch (error) {
        console.error("Erro ao cadastrar:", error);
        btn.innerText = "Criar Conta / Entrar";
        btn.disabled = false;

        if (error.code === 'auth/email-already-in-use') {
            alert("Este e-mail já está em uso.");
        } else {
            alert("Erro ao criar conta. Verifique os dados.");
        }
    }
}

// Inicialização dos eventos
document.addEventListener('DOMContentLoaded', () => {
    const btnCadastrar = document.getElementById('btn-cadastrar');
    if (btnCadastrar) {
        btnCadastrar.addEventListener('click', cadastrarUsuario);
    }
});