require("dotenv").config();
const { Pool } = require("pg");

const dbUrl = process.env.DATABASE_URL;

const proConfig = {
  connectionString: dbUrl,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: true } : false,
};

const pool = new Pool(proConfig);

async function findJid(jid) {
  const result = await pool.query("SELECT * FROM antilien WHERE jid = $1", [jid]);
  return result.rows[0] || null;
}

async function createAntilienTable() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS antilien (
        jid TEXT PRIMARY KEY,
        etat TEXT,
        action TEXT
      );
    `);
    console.log("The 'antilien' table was successfully created.");
  } catch (error) {
    console.error("Error creating the 'antilien' table:", error);
  }
}

async function ajouterOuMettreAJourJid(jid, etat) {
  try {
    const jidData = await findJid(jid);

    if (jidData) {
      await pool.query("UPDATE antilien SET etat = $1 WHERE jid = $2", [etat, jid]);
    } else {
      await pool.query(
        "INSERT INTO antilien (jid, etat, action) VALUES ($1, $2, $3)",
        [jid, etat, "supp"]
      );
    }
    console.log(`JID ${jid} was successfully added or updated.`);
  } catch (error) {
    console.error("Error adding or updating JID:", error);
  }
}

async function mettreAJourAction(jid, action) {
  try {
    const jidData = await findJid(jid);

    if (jidData) {
      await pool.query("UPDATE antilien SET action = $1 WHERE jid = $2", [action, jid]);
    } else {
      await pool.query(
        "INSERT INTO antilien (jid, etat, action) VALUES ($1, $2, $3)",
        [jid, "non", action]
      );
    }
    console.log(`Action successfully updated for JID ${jid}.`);
  } catch (error) {
    console.error("Error updating action for JID:", error);
  }
}

async function verifierEtatJid(jid) {
  try {
    const result = await pool.query("SELECT etat FROM antilien WHERE jid = $1", [jid]);
    if (result.rows.length > 0) {
      return result.rows[0].etat === "oui";
    }
    return false;
  } catch (error) {
    console.error("Error verifying JID state:", error);
    return false;
  }
}

async function recupererActionJid(jid) {
  try {
    const result = await pool.query("SELECT action FROM antilien WHERE jid = $1", [jid]);
    if (result.rows.length > 0) {
      return result.rows[0].action;
    }
    return "supp";
  } catch (error) {
    console.error("Error retrieving action for JID:", error);
    return "supp";
  }
}

createAntilienTable();

process.on("SIGINT", async () => {
  await pool.end();
  console.log("Database connection pool closed.");
  process.exit(0);
});

module.exports = {
  mettreAJourAction,
  ajouterOuMettreAJourJid,
  verifierEtatJid,
  recupererActionJid,
};
