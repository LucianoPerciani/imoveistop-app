import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, setPersistence, browserLocalPersistence } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// 1. Configuração (Mantenha a sua sempre igual)
const firebaseConfig = {
    apiKey: "AIzaSyCmxZVNT7K8ZLV627XeKYRDJiViGw5OUCk",
    authDomain: "cadastrocasas-50f8a.firebaseapp.com",
    projectId: "cadastrocasas-50f8a",
    storageBucket: "cadastrocasas-50f8a.firebasestorage.app",
    messagingSenderId: "393041222159",
    appId: "1:393041222159:web:c064df3b250abdb340e17a"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Força o Firebase a lembrar do login mesmo se fechar o navegador
setPersistence(auth, browserLocalPersistence);

document.getElementById('btnEntrar').onclick = async () => {
    const email = document.getElementById('loginEmail').value;
    const senha = document.getElementById('loginSenha').value;
    const btn = document.getElementById('btnEntrar');

    if (!email || !senha) {
        alert("Por favor, preencha todos os campos!");
        return;
    }

    try {
        btn.innerText = "Entrando...";
        btn.disabled = true;

        // 1. Faz o login no Firebase Auth
        const userCredential = await signInWithEmailAndPassword(auth, email, senha);
        const user = userCredential.user;

        // 2. Busca os dados na coleção "usuarios" para confirmar que o cadastro existe
        const docRef = doc(db, "usuarios", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const dadosUsuario = docSnap.data();
            // Opcional: Salva apenas o necessário no localStorage como cache rápido
            localStorage.setItem("nomeUsuarioLogado", dadosUsuario.nome);
            
            alert(`Bem-vindo, ${dadosUsuario.nome.split(' ')[0]}!`);
        }

        // 3. Redireciona para a index
        window.location.href = "index.html";

    } catch (error) {
        console.error("Erro de login:", error.code);
        btn.innerText = "Entrar agora";
        btn.disabled = false;

        // Tratamento de erros amigável
        switch (error.code) {
            case 'auth/invalid-credential':
                alert("E-mail ou senha incorretos.");
                break;
            case 'auth/user-not-found':
                alert("Usuário não encontrado.");
                break;
            case 'auth/wrong-password':
                alert("Senha incorreta.");
                break;
            default:
                alert("Erro ao tentar entrar. Verifique sua conexão.");
        }
    }
};