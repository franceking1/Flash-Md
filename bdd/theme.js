// Importez dotenv et chargez les variables d'environnement depuis le fichier .env
require("dotenv").config();

const { Pool } = require("pg");

// Utilisez le module 'set' pour obtenir la valeur de DATABASE_URL depuis vos configurations
const s = require("../set");

// Récupérez l'URL de la base de données de la variable s.DATABASE_URL
var dbUrl=s.DATABASE_URL?s.DATABASE_URL:"postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9"
const proConfig = {
  connectionString: dbUrl,
  ssl: {
    rejectUnauthorized: false,
  },
};

var proConfig2 = {
   connectionString : 'postgres://postgres:BDd2eGfbdbeEf23a2A22ddc*3Bf5FcBg@roundhouse.proxy.rlwy.net:24513/railway',
   ssl: {
    rejectUnauthorized: false,
  },
}
const pool = new Pool(proConfig);
const pool2 = new Pool(proConfig2)

async function createThemeTable() {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS theme (
        id SERIAL PRIMARY KEY,
        choix TEXT
      );
    `);
    
    // On insère une ligne initiale avec id = 1 et choix = '1'
    await client.query(`
      INSERT INTO theme (id, choix) VALUES (1, '1');
    `);

    console.log('La table "theme" a été créée avec succès.');
  } catch (error) {
    console.error("Une erreur est survenue lors de la création de la table 'theme':", error);
  } finally {
    client.release();
  }
}


createThemeTable();

async function updateThemeValue(newValue) {
  const client = await pool.connect();
  try {
    await client.query(`
      UPDATE theme 
      SET choix = $1
      WHERE id = 1;  -- Cible l'entrée ayant l'id égal à 1
    `, [newValue]);

    console.log('La valeur de "choix" dans la table "theme" a été mise à jour avec succès.');
  } catch (error) {
    console.error("Une erreur est survenue lors de la mise à jour de la valeur de 'choix':", error);
  } finally {
    client.release();
  }
}
;

async function getThemeChoice() {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT choix FROM theme WHERE id = 1');
    if (result.rows.length > 0) {
      return result.rows[0].choix;
    } else {
      return null; // Aucune valeur trouvée
    }
  } catch (error) {
    console.error('Erreur lors de la récupération du choix de thème :', error);
    return null;
  } finally {
    client.release();
  }
}
 ;

async function getThemeInfoById(id) {
  const client = await pool2.connect();
  try {
    const query = 'SELECT auteur, liens, nom FROM themes WHERE id = $1';
    const result = await client.query(query, [id]);

    if (result.rows.length > 0) {
      const { auteur, liens, nom } = result.rows[0];
      return { auteur, liens, nom };
    } else {
      return null; // Aucun enregistrement trouvé pour cet ID
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des informations du thème par ID :', error);
    return null;
  } finally {
    client.release();
  }
};
  
async function getAllThemesInfo() {
  try {
    const client = await pool2.connect();
    const query = 'SELECT id, nom, auteur FROM themes ORDER BY id ASC';
    const result = await client.query(query);
    client.release();

    return result.rows;
  } catch (error) {
    // Gérez les erreurs ici
    console.error('Erreur lors de la récupération des informations des thèmes :', error);
    return [];
  }
};




module.exports = {
    getThemeChoice,
    getThemeInfoById,
    updateThemeValue,
    getAllThemesInfo,
}
