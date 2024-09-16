var tabCmds = [];

let cm = [];

function king(obj, fonctions) {
    let infoComs = obj;

    if (!obj.categorie) {
        infoComs.categorie = "General";
    }

    if (!obj.reaction) {
        infoComs.reaction = "💯";
    }

    infoComs.fonction = fonctions;

    cm.push(infoComs);

    return infoComs;
}

module.exports = { king, Module: king, cm };
