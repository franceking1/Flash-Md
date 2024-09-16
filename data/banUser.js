// Importez dotenv et chargez les variables d'environnement depuis le fichier .env
require("dotenv").config();

const { Pool } = require("pg");

const dbUrl = "postgresql://giftedtech_ke:9BzoUeUQO2owLEsMjz5Vhshva91bxF2X@dpg-crice468ii6s73f1nkt0-a.oregon-postgres.render.com/api_gifted_tech";

const proConfig = {
  connectionString: dbUrl,
  ssl: {
    rejectUnauthorized: false,
  },
};

// Créez une pool de connexions PostgreSQL
const pool = new Pool(proConfig);

// Vous pouvez maintenant utiliser 'pool' pour interagir avec votre base de données PostgreSQL.
const creerTableBanUser = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS banUser (
        jid text PRIMARY KEY
      );
    `);
    console.log("La table 'banUser' a été créée avec succès.");
  } catch (e) {
    console.error("Une erreur est survenue lors de la création de la table 'banUser':", e);
  }
};

// Appelez la méthode pour créer la table "banUser"
creerTableBanUser();



// Fonction pour ajouter un utilisateur à la liste des bannis
async function addUserToBanList(jid) {
  const client = await pool.connect();
  try {
    // Insérez l'utilisateur dans la table "banUser"
    const query = "INSERT INTO banUser (jid) VALUES ($1)";
    const values = [jid];

    await client.query(query, values);
    console.log(`JID ${jid} ajouté à la liste des bannis.`);
  } catch (error) {
    console.error("Erreur lors de l'ajout de l'utilisateur banni :", error);
  } finally {
    client.release();
  }
}



// Fonction pour vérifier si un utilisateur est banni
async function isUserBanned(jid) {
  const client = await pool.connect();
  try {
    // Vérifiez si l'utilisateur existe dans la table "banUser"
    const query = "SELECT EXISTS (SELECT 1 FROM banUser WHERE jid = $1)";
    const values = [jid];

    const result = await client.query(query, values);
    return result.rows[0].exists;
  } catch (error) {
    console.error("Erreur lors de la vérification de l'utilisateur banni :", error);
    return false;
  } finally {
    client.release();
  }
}

// Fonction pour supprimer un utilisateur de la liste des bannis
async function removeUserFromBanList(jid) {
  const client = await pool.connect();
  try {
    // Supprimez l'utilisateur de la table "banUser"
    const query = "DELETE FROM banUser WHERE jid = $1";
    const values = [jid];

    await client.query(query, values);
    console.log(`JID ${jid} supprimé de la liste des bannis.`);
  } catch (error) {
    console.error("Erreur lors de la suppression de l'utilisateur banni :", error);
  } finally {
    client.release();
  }
}

module.exports = {
  addUserToBanList,
  isUserBanned,
  removeUserFromBanList,
};
