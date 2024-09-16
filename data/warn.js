// Importez dotenv et chargez les variables d'environnement depuis le fichier .env
require("dotenv").config();

const { Pool } = require("pg");

// Utilisez le module 'set' pour obtenir la valeur de DATABASE_URL depuis vos configurations
const s = require("../set");

// Récupérez l'URL de la base de données de la variable s.DATABASE_URL
var dbUrl=s.DATABASE_URL?s.DATABASE_URL:"postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd"
const proConfig = {
  connectionString: dbUrl,
  ssl: {
    rejectUnauthorized: false,
  },
};

// Créez une pool de connexions PostgreSQL
const pool = new Pool(proConfig);

async function creerTableWarnUsers() {
    const client = await pool.connect();
    try {
      // Exécutez la requête SQL pour créer la table "warn_users" si elle n'existe pas
      const query = `
        CREATE TABLE IF NOT EXISTS warn_users (
          jid text PRIMARY KEY,
          warn_count integer DEFAULT 0
        );
      `;
      await client.query(query);
      console.log("La table 'warn_users' a été créée avec succès.");
    } catch (error) {
      console.error("Erreur lors de la création de la table 'warn_users':", error);
    } finally {
      client.release();
    }
  };
   creerTableWarnUsers();

   async function ajouterUtilisateurAvecWarnCount(jid) {
    const client = await pool.connect();
    try {
      // Exécutez une requête SQL pour ajouter ou mettre à jour l'utilisateur
      const query = `
        INSERT INTO warn_users (jid, warn_count)
        VALUES ($1, 1)
        ON CONFLICT (jid)
        DO UPDATE SET warn_count = warn_users.warn_count + 1;
      `;
      const values = [jid];
  
      await client.query(query, values);
      console.log(`Utilisateur ${jid} ajouté ou mis à jour avec un warn_count de 1.`);
    } catch (error) {
      console.error("Erreur lors de l'ajout ou de la mise à jour de l'utilisateur :", error);
    } finally {
      client.release();
    }
  } ;

  async function getWarnCountByJID(jid) {
    const client = await pool.connect();
    try {
      // Exécutez une requête SQL pour récupérer le warn_count par JID
      const query = "SELECT warn_count FROM warn_users WHERE jid = $1";
      const values = [jid];
  
      const result = await client.query(query, values);
      if (result.rows.length > 0) {
        const warnCount = result.rows[0].warn_count;
        return warnCount;
      } else {
        // Si l'utilisateur n'est pas trouvé, retournez 0 ou une autre valeur par défaut
        return 0;
      }
    } catch (error) {
      console.error("Erreur lors de la récupération du warn_count :", error);
      return -1; // Retournez une valeur d'erreur ou une autre valeur par défaut en cas d'erreur
    } finally {
      client.release();
    }
  } ;

  async function resetWarnCountByJID(jid) {
    const client = await pool.connect();
    try {
      // Exécutez une requête SQL pour réinitialiser le warn_count à 0 pour le JID spécifié
      const query = "UPDATE warn_users SET warn_count = 0 WHERE jid = $1";
      const values = [jid];
  
      await client.query(query, values);
      console.log(`Le warn_count de l'utilisateur ${jid} a été réinitialisé à 0.`);
    } catch (error) {
      console.error("Erreur lors de la réinitialisation du warn_count :", error);
    } finally {
      client.release();
    }
  }
  
  
  
  
  module.exports = {
    ajouterUtilisateurAvecWarnCount,
    getWarnCountByJID,
    resetWarnCountByJID,
  };
  
