import admin from "firebase-admin";
import serviceAccount from "./service-account.json" assert { type: "json" };

// Substitua pelo caminho para o arquivo da chave privada do Firebase

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

async function addUserRole(uid, department) {
  try {
    // Adiciona claims personalizados ao usuário
    await admin.auth().setCustomUserClaims(uid, { department });
    console.log(`Role "${department}" adicionada ao usuário com UID: ${uid}`);
  } catch (error) {
    console.error("Erro ao adicionar role:", error);
  }
}

// Substitua pelo UID do usuário e o nome do papel que deseja atribuir
const userId = "v4LRqnxkXzM3X9MtCPB4ivtX2KQ2";
const department = "financeiro"; // Exemplo: admin, editor, viewer, etc.

addUserRole(userId, department);
