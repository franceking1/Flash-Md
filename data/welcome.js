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

// Vous pouvez maintenant utiliser 'pool' pour interagir avec votre base de données PostgreSQL.
const creerTableevents = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS events (
        Id serial PRIMARY KEY,
        jid text UNIQUE,
        welcome text DEFAULT 'non',
        goodbye text DEFAULT 'non',
        antipromote text DEFAULT 'non',
        antidemote text DEFAULT 'non'
      );
    `);
    console.log("La table 'events' a été créée avec succès.");
  } catch (e) {
    console.error("Une erreur est survenue lors de la création de la table 'events':", e);
  }
};

// Appelez la méthode pour créer la table "banUser"
creerTableevents();



// Fonction pour ajouter un utilisateur à la liste des bannis
async function attribuerUnevaleur(jid, row, valeur) {
    const client = await pool.connect();

    try {
        // Vérifions si le jid existe dans la table
        const result = await client.query('SELECT * FROM events WHERE jid = $1', [jid]);
        
        // Vérifiez la longueur des lignes (rows) pour déterminer si le jid existe
        const jidExiste = result.rows.length > 0;

        if (jidExiste) {
            // Si le jid existe, mettez à jour la valeur de la colonne spécifiée (row)
            await client.query(`UPDATE events SET ${row} = $1 WHERE jid = $2`, [valeur, jid]);
            console.log(`La colonne ${row} a été actualisée sur ${valeur} pour le jid ${jid}`);
        } else {
            // Si le jid n'existe pas, ajoutez une nouvelle ligne avec le jid et la valeur spécifiés
            await client.query(`INSERT INTO events (jid, ${row}) VALUES ($1, $2)`, [jid, valeur]);
            console.log(`Nouveau jid ${jid} ajouté avec la colonne ${row} ayant la valeur ${valeur}`);
        }
    } catch (error) {
        console.error("Erreur lors de l'actualisation de events :", error);
    } finally {
        client.release();
    }
};


async function recupevents(jid, row) {
     const client = await pool.connect()
    try {
        const result = await client.query('SELECT ' + row + ' FROM events WHERE jid = $1', [jid]);
        const jidExists = result.rows.length > 0;

        if (jidExists) {
            return result.rows[0][row];
        } else {
            return 'non';
        }
    } catch (e) {
        console.error(e);
    } finally {
        client.release();
    }
}



module.exports = {
  attribuerUnevaleur,
  recupevents,
};
