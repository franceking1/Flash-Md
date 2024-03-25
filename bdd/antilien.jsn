require("dotenv").config();
const { Pool } = require("pg");
let s =require("../set")
var dbUrl=s.DATABASE_URL?s.DATABASE_URL:"postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9"

const proConfig = {
  connectionString:dbUrl ,
  ssl: {
    rejectUnauthorized: false,
  },
};

const pool = new Pool(proConfig);


// Fonction pour créer la table "antilien"
async function createAntilienTable() {
  const client = await pool.connect();
  try {
    // Exécutez une requête SQL pour créer la table "antilien" si elle n'existe pas déjà
    await client.query(`
      CREATE TABLE IF NOT EXISTS antilien (
        jid text PRIMARY KEY,
        etat text,
        action text
      );
    `);
    console.log("La table 'antilien' a été créée avec succès.");
  } catch (error) {
    console.error("Une erreur est survenue lors de la création de la table 'antilien':", error);
  } finally {
    client.release();
  }
}

// Appelez la méthode pour créer la table "antilien"
createAntilienTable();



async function ajouterOuMettreAJourJid(jid, etat) {
  const client = await pool.connect();
  
  try {
    // Vérifiez si le jid existe déjà dans la table 'antilien'
    const result = await client.query('SELECT * FROM antilien WHERE jid = $1', [jid]);
    const jidExiste = result.rows.length > 0;

    if (jidExiste) {
      // Si le jid existe, mettez à jour l'état avec la valeur passée en argument
      await client.query('UPDATE antilien SET etat = $1 WHERE jid = $2', [etat, jid]);
    } else {
      // Si le jid n'existe pas, ajoutez-le avec l'état passé en argument et l'action 'supp' par défaut
      await client.query('INSERT INTO antilien (jid, etat, action) VALUES ($1, $2, $3)', [jid, etat, 'supp']);
    }
    
    console.log(`JID ${jid} ajouté ou mis à jour avec succès dans la table 'antilien'.`);
  } catch (error) {
    console.error('Erreur lors de l\'ajout ou de la mise à jour du JID dans la table ,', error);
  } finally {
    client.release();
  }
};


async function mettreAJourAction(jid, action) {
  const client = await pool.connect();
  
  try {
    // Vérifiez si le jid existe déjà dans la table 'antilien'
    const result = await client.query('SELECT * FROM antilien WHERE jid = $1', [jid]);
    const jidExiste = result.rows.length > 0;

    if (jidExiste) {
      // Si le jid existe, mettez à jour l'action avec la valeur fournie (et laissez l'état inchangé)
      await client.query('UPDATE antilien SET action = $1 WHERE jid = $2', [action, jid]);
    } else {
      // Si le jid n'existe pas, ajoutez-le avec l'état 'non' par défaut et l'action fournie
      await client.query('INSERT INTO antilien (jid, etat, action) VALUES ($1, $2, $3)', [jid, 'non', action]);
    }
    
    console.log(`Action mise à jour avec succès pour le JID ${jid} dans la table 'antilien'.`);
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'action pour le JID dans la table  :', error);
  } finally {
    client.release();
  }
};
  


async function verifierEtatJid(jid) {
  const client = await pool.connect();

  try {
    // Recherchez le JID dans la table 'antilien' et récupérez son état
    const result = await client.query('SELECT etat FROM antilien WHERE jid = $1', [jid]);
    
    if (result.rows.length > 0) {
      const etat = result.rows[0].etat;
      return etat === 'oui';
    } else {
      // Si le JID n'existe pas dans la table, il n'est pas enregistré comme "oui"
      return false;
    }
  } catch (error) {
    console.error('Erreur lors de la vérification de l\'état du JID dans la table ', error);
    return false;
  } finally {
    client.release();
  }
};

async function recupererActionJid(jid) {
  const client = await pool.connect();

  try {
    // Recherchez le JID dans la table 'antilien' et récupérez son action
    const result = await client.query('SELECT action FROM antilien WHERE jid = $1', [jid]);
    
    if (result.rows.length > 0) {
      const action = result.rows[0].action;
      return action;
    } else {
      // Si le JID n'existe pas dans la table, retournez une valeur par défaut (par exemple, 'supp')
      return 'supp';
    }
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'action du JID dans la table :', error);
    return 'supp'; // Gestion de l'erreur en retournant une valeur par défaut
  } finally {
    client.release();
  }
};





module.exports = {
  mettreAJourAction,
  ajouterOuMettreAJourJid,
  verifierEtatJid,
  recupererActionJid,
};








