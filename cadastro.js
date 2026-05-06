import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { 
    getFirestore, collection, addDoc, getDocs, doc, deleteDoc, updateDoc, setDoc 
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { 
    getAuth, createUserWithEmailAndPassword 
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

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

// --- FUNÇÃO DE CADASTRO ---
async function cadastrarNovoCliente() {
    const nome = document.getElementById('clienteNome').value;
    const email = document.getElementById('clienteEmail').value;
    const senha = document.getElementById('clienteSenha').value;

    if (!nome || !email || !senha) {
        alert("Preencha todos os campos!");
        return;
    }

    try {
        // Cria o usuário no Auth
        const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
        const user = userCredential.user;

        // Salva o nome e dados no Firestore
        await setDoc(doc(db, "usuarios", user.uid), {
            nome: nome,
            email: email,
            tipo: "cliente",
            dataCadastro: new Date()
        });

        alert("Conta criada com sucesso!");
        window.location.href = "index.html"; 

    } catch (error) {
        console.error("Erro:", error.code);
        alert("Erro ao cadastrar: " + error.message);
    }
}

// --- VÍNCULO DO BOTÃO (O SEGREDO PARA MATAR O ERRO) ---
document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('btn-cadastrar');
    if (btn) {
        // Aqui o JS "escuta" o clique sem precisar do onclick no HTML
        btn.addEventListener('click', cadastrarNovoCliente);
    }
});

// --- LÓGICA DE GERENCIAMENTO (Caso precise nesta tela) ---
async function carregarListaGerenciamento() {
    const listaArea = document.getElementById('listaGerenciamento');
    if (!listaArea) return;

    const querySnapshot = await getDocs(collection(db, "imoveis"));
    listaArea.innerHTML = ""; 

    querySnapshot.forEach((documento) => {
        // ... sua lógica de listagem que já funciona
    });
}
carregarListaGerenciamento();