const {
  king
} = require('../france/king');
const s = require('../set');
const fs = require('fs');
function getDescriptionFromEnv(_0x35905a) {
  filePath = './app.json';
  const _0x4e0886 = fs.readFileSync(filePath, "utf-8");
  const _0x2655a8 = JSON.parse(_0x4e0886);
  const _0x34117a = _0x2655a8.env[_0x35905a];
  return _0x34117a && _0x34117a.description ? _0x34117a.description : "The environment variable description was not found.";
}
/*king({
  'nomCom': 'setvar',
  'categorie': "HEROKU"
}, async (_0x89c838, _0x1b7dd1, _0x458a27) => {
  if (!_0x2649cb) {
    _0x101d12("only Mods can use this commande");
    return;
  }
  ;
  if (s.HEROKU_APP_NAME == null || s.HEROKU_APY_KEY == null) {
    _0x101d12("Please fill in the HEROKU_APP_NAME and HEROKU_APY_KEY environment variables");
    return;
  }
  ;
  if (!_0x17cff4[0x0] || !_0x17cff4.join('').split('=')) {
    _0x101d12("Bad format ; Exemple of using :\nsetvar OWNER_NAME=Fredora");
    return;
  }
  ;
  const _0x381a2c = _0x17cff4.join(" ");
  const _0x1e948b = require('heroku-client');
  const _0x46f1d8 = new _0x1e948b({
    'token': s.HEROKU_API_KEY
  });
  let _0x2e89e0 = '/apps/' + s.HEROKU_APP_NAME;
  await _0x46f1d8.patch(_0x2e89e0 + "/config-vars", {
    'body': {
      [_0x381a2c.split('=')[0x0]]: _0x381a2c.split('=')[0x1]
    }
  });
  await _0x101d12("Heroku var changes , rebootings....");
});
king({
  'nomCom': "allvar",
  'categorie': "HEROKU"
}, async (_0x516e99, _0x415586, _0x526c58) => {
  if (!_0x453088) {
    _0x5af953("only mods can use this commande");
    return;
  }
  ;
  if (s[_0x25353d(0x154)] == null || s.HEROKU_APY_KEY == null) {
    _0x5af953(_0x25353d(0x157));
    return;
  }
  ;
  const _0x58f4ef = require(_0x25353d(0x119));
  const _0x4f3535 = new _0x58f4ef({
    'token': s.HEROKU_APY_KEY
  });
  let _0x1480c2 = _0x25353d(0x11e) + s[_0x25353d(0x154)];
  let _0x5f2c6e = await _0x4f3535[_0x25353d(0x15b)](_0x1480c2 + _0x25353d(0x11d));
  let _0x13222b = _0x25353d(0x125);
  for (vr in _0x5f2c6e) {
    _0x13222b += _0x25353d(0x12b) + vr + "* " + "= " + _0x5f2c6e[vr] + "\n";
  }
  _0x5af953(_0x13222b);
});
king({
  'nomCom': "getvar",
  'categorie': 'HEROKU'
}, async (_0x58a6f4, _0x59e6ce, _0x10aa59) => {
  if (!_0x4017ae) {
    _0x191ee9("Only Mods can use this command");
    return;
  }
  ;
  if (s.HEROKU_APP_NAME == null || s.HEROKU_APY_KEY == null) {
    _0x191ee9("Please fill in the HEROKU_APP_NAME and HEROKU_APY_KEY environment variables");
    return;
  }
  ;
  if (!_0x23c562[0x0]) {
    _0x191ee9("insert the variable name in capital letter");
    return;
  }
  ;
  try {
    const _0x22646 = require("heroku-client");
    const _0x2f7e09 = new _0x22646({
      'token': s.HEROKU_APY_KEY
    });
    let _0x19deba = "/apps/" + s.HEROKU_APP_NAME;
    let _0x269d8a = await _0x2f7e09.get(_0x19deba + "/config-vars");
    for (vr in _0x269d8a) {
      if (_0x23c562.join(" ") === vr) {
        return _0x191ee9(vr + "= " + _0x269d8a[vr]);
      }
    }
  } catch (_0x18606e) {
    _0x191ee9("Error" + _0x18606e);
  }
});*/
king({
  'nomCom': "settings",
  'categorie': 'HEROKU'
}, async (_0x53607c, _0x267b79, _0x15523d) => {
  const {
    ms: _0xb66a55,
    repondre: _0x17b1b2,
    superUser: _0x3a5b5c,
    auteurMessage: _0x4c70ac
  } = _0x15523d;
  if (!_0x3a5b5c) {
    _0x17b1b2("This command is for my owner only!");
    return;
  }
  ;
  let _0x39c108 = [{
   'nom': "ANTI_DELETE",
    'choix': ["on", 'off']
  }, {
    'nom': "ANTICALL",
    'choix': ["on", 'off']
  }, {
    'nom': "AUTO_REACTION",
    'choix': ["on", 'off']
  }, {
    'nom': "AUTO_VIEW_STATUS",
    'choix': ["on", 'off']
  }, {
    'nom': "AUTO_SAVE_STATUS",
    'choix': ["on", 'off']
  }, {
    'nom': "PM_PERMIT",
    'choix': ["on", 'off']
  }, {
    'nom': "BOT_MODE",
    'choix': ["public", 'private']
  }, {
    'nom': 'STARTING_MESSAGE',
    'choix': ["on", 'off']
  }, {
    'nom': "AUTO_READ_MESSAGES",
    'choix': ["on", 'off']
  }, {
    'nom': "PRESENCE",
    'choix': ['online', 'typing', 'recording']
  }, {
    'nom': "CHAT_BOT",
    'choix': ["on", 'off']
  }];
  let _0x3723be = "    ╭──────༺♡༻──────╮\n              Flash-Md Settings\n    ╰──────༺♡༻──────╯\n\n";
  for (v = 0x0; v < _0x39c108.length; v++) {
    _0x3723be += v + 0x1 + "- *" + _0x39c108[v].nom + "*\n";
  }
  _0x3723be += "\n*Please Choose a variable by its number*";
  let _0x21ca50 = await _0x267b79.sendMessage(_0x53607c, {
    'text': _0x3723be
  }, {
    'quoted': _0xb66a55
  });
  console.log(_0x21ca50);
  let _0x4cd198 = await _0x267b79.awaitForMessage({
    'chatJid': _0x53607c,
    'sender': _0x4c70ac,
    'timeout': 0xea60,
    'filter': _0x5b57c9 => _0x5b57c9.message.extendedTextMessage && _0x5b57c9.message.extendedTextMessage.contextInfo.stanzaId == _0x21ca50.key.id && _0x5b57c9.message.extendedTextMessage.text > 0x0 && _0x5b57c9.message.extendedTextMessage.text <= _0x39c108.length
  });
  let _0x590e99 = _0x4cd198.message.extendedTextMessage.text - 0x1;
  let {
    nom: _0x44695b,
    choix: _0x39fdd4
  } = _0x39c108[_0x590e99];
  let _0x191a85 = "    ╭──────༺♡༻──────╮\n              Flash-Md settings\n    ╰──────༺♡༻──────╯\n\n";
  _0x191a85 += "*Variable Name* :" + _0x44695b + "\n";
  _0x191a85 += "*Description* :" + getDescriptionFromEnv(_0x44695b) + "\n\n";
  _0x191a85 += "┌────── ⋆⋅☆⋅⋆ ──────┐\n\n";
  for (i = 0x0; i < _0x39fdd4.length; i++) {
    _0x191a85 += "* *" + (i + 0x1) + "* => " + _0x39fdd4[i] + "\n";
  }
  _0x191a85 += "\n└────── ⋆⋅☆⋅⋆ ──────┘\n\n*Now reply this message with the number that matches your choice.*";
  let _0x13d36c = await _0x267b79.sendMessage(_0x53607c, {
    'text': _0x191a85
  }, {
    'quoted': _0x4cd198
  });
  let _0x5b72e7 = await _0x267b79.awaitForMessage({
    'chatJid': _0x53607c,
    'sender': _0x4c70ac,
    'timeout': 0xea60,
    'filter': _0x36adeb => _0x36adeb.message.extendedTextMessage && _0x36adeb.message.extendedTextMessage.contextInfo.stanzaId == _0x13d36c.key.id && _0x36adeb.message.extendedTextMessage.text > 0x0 && _0x36adeb.message.extendedTextMessage.text <= _0x39fdd4.length
  });
  let _0x486a86 = _0x5b72e7.message.extendedTextMessage.text - 0x1;
  const _0x706777 = require("heroku-client");
  const _0x578567 = new _0x706777({
    'token': s.HEROKU_API_KEY
  });
  let _0x113aa4 = "/apps/" + s.HEROKU_APP_NAME;
  await _0x578567.patch(_0x113aa4 + "/config-vars", {
    'body': {
      [_0x44695b]: _0x39fdd4[_0x486a86]
    }
  });
  await _0x17b1b2("That Heroku variable is changing, The bot is restarting....");
});
function changevars(_0x272aba, _0x555599) {
 
  king({
    'nomCom': _0x272aba,
    'categorie': "HEROKU"
  }, async (_0x28d912, _0x43b135, _0x3034ea) => {
    const {
      arg: _0x3541b7,
      superUser: _0x5c436b,
      repondre: _0x31e1ae
    } = _0x3034ea;
    if (!_0x5c436b) {
      _0x31e1ae("This command is for my owner only!");
      return;
    }
    ;
    if (s.HEROKU_APP_NAME == null || s.HEROKU_API_KEY == null) {
      _0x31e1ae("Fill in the HEROKU_APP_NAME and HEROKU_API_KEY environment variables");
      return;
    }
    ;
    if (!_0x3541b7[0x0]) {
      _0x31e1ae(getDescriptionFromEnv(_0x555599));
      return;
    }
    ;
    const _0x4cb902 = require("heroku-client");
    const _0x5ad476 = new _0x4cb902({
      'token': s.HEROKU_API_KEY
    });
    let _0x1680e2 = "/apps/" + s.HEROKU_APP_NAME;
    await _0x5ad476.patch(_0x1680e2 + "/config-vars", {
      'body': {
        [_0x555599]: _0x3541b7.join(" ")
      }
    });
    await _0x31e1ae("That Heroku variable is changing, The bot is restarting....");
  });
}
;
changevars("setprefix", "PREFIXES");
changevars('menulinks', "BOT_MENU_LINKS");
