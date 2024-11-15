require("dotenv").config();
const { Pool } = require("pg");
let s =require("../set")
var dbUrl=s.DATABASE_URL?s.DATABASE_URL:"postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd"

const proConfig = {
  connectionString:dbUrl ,
  ssl: {
    rejectUnauthorized: false,
  },
};

const pool = new Pool(proConfig);


// Fonction pour créer la table "antibot"
async function createAntibotTable() {
  const client = await pool.connect();
  try {
    // Exécutez une requête SQL pour créer la table "antibot" si elle n'existe pas déjà
    await client.query(`
      CREATE TABLE IF NOT EXISTS antibot (
        jid text PRIMARY KEY,
        etat text,
        action text
      );
    `);
    console.log("La table 'antibot' a été créée avec succès.");
  } catch (error) {
    console.error("Une erreur est survenue lors de la création de la table 'antibot':", error);
  } finally {
    client.release();
  }
}

// Appelez la méthode pour créer la table "antibot"
createAntibotTable();



async function atbajouterOuMettreAJourJid(jid, etat) {
  const client = await pool.connect();
  
  try {
    // Vérifiez si le jid existe déjà dans la table 'antilien'
    const result = await client.query('SELECT * FROM antibot WHERE jid = $1', [jid]);
    const jidExiste = result.rows.length > 0;

    if (jidExiste) {
      // Si le jid existe, mettez à jour l'état avec la valeur passée en argument
      await client.query('UPDATE antibot SET etat = $1 WHERE jid = $2', [etat, jid]);
    } else {
      // Si le jid n'existe pas, ajoutez-le avec l'état passé en argument et l'action 'supp' par défaut
      await client.query('INSERT INTO antibot (jid, etat, action) VALUES ($1, $2, $3)', [jid, etat, 'supp']);
    }
    
    console.log(`JID ${jid} ajouté ou mis à jour avec succès dans la table 'antibot'.`);
  } catch (error) {
    console.error('Erreur lors de l\'ajout ou de la mise à jour du JID dans la table ,', error);
  } finally {
    client.release();
  }
};


async function atbmettreAJourAction(jid, action) {
  const client = await pool.connect();
  
  try {
    // Vérifiez si le jid existe déjà dans la table 'antilien'
    const result = await client.query('SELECT * FROM antibot WHERE jid = $1', [jid]);
    const jidExiste = result.rows.length > 0;

    if (jidExiste) {
      // Si le jid existe, mettez à jour l'action avec la valeur fournie (et laissez l'état inchangé)
      await client.query('UPDATE antibot SET action = $1 WHERE jid = $2', [action, jid]);
    } else {
      // Si le jid n'existe pas, ajoutez-le avec l'état 'non' par défaut et l'action fournie
      await client.query('INSERT INTO antibot (jid, etat, action) VALUES ($1, $2, $3)', [jid, 'non', action]);
    }
    
    console.log(`Action mise à jour avec succès pour le JID ${jid} dans la table 'antibot'.`);
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'action pour le JID dans la table  :', error);
  } finally {
    client.release();
  }
};
  


async function atbverifierEtatJid(jid) {
  const client = await pool.connect();

  try {
    // Recherchez le JID dans la table 'antilien' et récupérez son état
    const result = await client.query('SELECT etat FROM antibot WHERE jid = $1', [jid]);
    
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

async function atbrecupererActionJid(jid) {
  const client = await pool.connect();

  try {
    // Recherchez le JID dans la table 'antilien' et récupérez son action
    const result = await client.query('SELECT action FROM antibot WHERE jid = $1', [jid]);
    
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
  atbmettreAJourAction,
  atbajouterOuMettreAJourJid,
  atbverifierEtatJid,
  atbrecupererActionJid,
};






