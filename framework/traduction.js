const translatte = require('translatte');

async function traduire(text, options) {
  try {
    const result = await translatte(text, options);
    return result.text;
  } catch (error) {
    throw error;
  }
}

module.exports = traduire;
