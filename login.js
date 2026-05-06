import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

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

document.getElementById('btnEntrar').onclick = async () => {
    const email = document.getElementById('loginEmail').value;
    const senha = document.getElementById('loginSenha').value;

    if (!email || !senha) {
        alert("Preencha todos os campos!");
        return;
    }

    try {
        // Busca na coleção 'clientes' onde o e-mail e a senha coincidem
       // Removi o hífen de "e-mail" para "email"
        const q = query(
            collection(db, "clientes"), 
            where("email", "==", email), 
            where("senha", "==", senha)
        );

        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            // Se encontrou, pega o ID do primeiro documento encontrado
            const usuarioDoc = querySnapshot.docs[0];
            localStorage.setItem("idClienteLogado", usuarioDoc.id);
            
            alert("Login realizado com sucesso! Bem-vindo.");
            window.location.href = "index.html"; // Volta para a Home logado
        } else {
            alert("E-mail ou senha incorretos.");
        }
    } catch (error) {
        console.error("Erro ao fazer login:", error);
        alert("Erro ao tentar entrar. Tente novamente.");
    }
};