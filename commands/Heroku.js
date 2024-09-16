const { king } = require('../france/king');
const s = require('../set')

king(
    {
        nomCom: "deployinfo",
        categorie: "HEROKU"
    }, async (dest, zk, commandeOptions) => {

        const { repondre, superUser } = commandeOptions;

        if (!superUser) {
            repondre('Only the bot creator or bot owner can use this command!');
            return;
        }

        try {
            const Heroku = require("heroku-client");

            const heroku = new Heroku({
                token: s.HEROKU_API_KEY,
            });

            let baseURI = "/apps/" + s.HEROKU_APP_NAME;

            // Get the app details to retrieve deployment information
            const appInfo = await heroku.get(baseURI);

            const infoMessage = `App *${appInfo.name}* was last deployed on *${appInfo.updated_at}*.`;
            repondre(infoMessage);

        } catch (e) {
            repondre('Error fetching deployment info: ' + e.message);
        }
    }
);


king(
    {
        nomCom: "releases",
        categorie: "HEROKU"
    }, async (dest, zk, commandeOptions) => {

        const { repondre, superUser } = commandeOptions;

        if (!superUser) {
            repondre('Only the bot creator or bot owner can use this command!');
            return;
        }

        try {
            const Heroku = require("heroku-client");

            const heroku = new Heroku({
                token: s.HEROKU_API_KEY,
            });

            let baseURI = "/apps/" + s.HEROKU_APP_NAME;

            // Get the list of releases
            const releases = await heroku.get(`${baseURI}/releases`);

            let releaseList = 'App Release History:\n\n';
            releases.slice(0, 5).forEach(release => {
                releaseList += `- Version: ${release.version}\n - Description: ${release.description}\n - Created At: ${release.created_at}\n\n\n`;
            });

            repondre(releaseList);

        } catch (e) {
            repondre('Error fetching releases: ' + e.message);
        }
    }
);




king(
    {
        nomCom: "restart",
        categorie: "HEROKU"
    }, async (dest, zk, commandeOptions) => {

        const { repondre, superUser } = commandeOptions;

        if (!superUser) {
            repondre('Only the bot creator or bot owner can use this command!');
            return;
        }

        try {
            const Heroku = require("heroku-client");

            const heroku = new Heroku({
                token: s.HEROKU_API_KEY,
            });

            let baseURI = "/apps/" + s.HEROKU_APP_NAME;

            // Restart all dynos to trigger a full restart
            await heroku.delete(baseURI + "/dynos");

            repondre('The bot is restarting. Please wait a moment...');

        } catch (e) {
            repondre('Error while restarting the bot: ' + e.message);
        }
    }
);



king(
    {
        nomCom: "delvar",
        categorie: "HEROKU"
    }, async (dest, zk, commandeOptions) => {

        const { repondre, superUser, arg } = commandeOptions;

        if (!superUser) {
            repondre('Only the bot creator or bot owner can use this command!');
            return;
        }

        if (!arg[0]) {
            repondre('Please specify the variable name to delete. Usage: delvar VARIABLE_NAME');
            return;
        }

        const varName = arg[0].trim();

        // Check if the variable name is in capital letters
        if (!/^[A-Z_]+$/.test(varName)) {
            repondre('Variable name must be in capital letters (e.g., API_KEY).');
            return;
        }

        try {
            const Heroku = require("heroku-client");

            const heroku = new Heroku({
                token: s.HEROKU_API_KEY,
            });

            let baseURI = "/apps/" + s.HEROKU_APP_NAME;

            await heroku.patch(baseURI + "/config-vars", {
                body: {
                    [varName]: null,
                },
            });

            await repondre(`Heroku variable *${varName}* has been deleted successfully! The bot will now restart.`);

            setTimeout(() => {
                repondre('The bot has restarted due to the change in environment variables.');
            }, 5000);

        } catch (e) {
            repondre('Error while deleting variable: ' + e.message);
        }
    }
);





king(
    {
        nomCom: "addvar",
        categorie: "HEROKU"
    }, async (dest, zk, commandeOptions) => {

        const { repondre, superUser, arg } = commandeOptions;

        if (!superUser) {
            repondre('Only the bot creator or bot owner can use this command!');
            return;
        }

        if (!arg[0] || !arg.join('').includes('=')) {
            repondre('Invalid format. Usage: addvar VARIABLE_NAME=VALUE\nExample: addvar API_KEY=abcdef123456');
            return;
        }

        const text = arg.join(" ");
        const varName = text.split('=')[0].trim();
        const varValue = text.split('=')[1].trim();

        // Check if the variable name is in capital letters
        if (!/^[A-Z_]+$/.test(varName)) {
            repondre('Variable name must be in capital letters (e.g., API_KEY).');
            return;
        }

        if (!varName || !varValue) {
            repondre('Both variable name and value must be provided.');
            return;
        }

        try {
            const Heroku = require("heroku-client");

            const heroku = new Heroku({
                token: s.HEROKU_API_KEY,
            });

            let baseURI = "/apps/" + s.HEROKU_APP_NAME;

            await heroku.patch(baseURI + "/config-vars", {
                body: {
                    [varName]: varValue,
                },
            });

            await repondre(`Heroku variable *${varName}* has been added successfully! The bot will now restart.`);

            setTimeout(() => {
                repondre('The bot has restarted due to the change in environment variables.');
            }, 5000);

        } catch (e) {
            repondre('Error while adding variable: ' + e.message);
        }
    }
);




king(
    {
        nomCom : "setvar",
        categorie : "HEROKU"
    }, async (dest , zk , commandeOptions) =>{

       const {ms,repondre,superUser , arg} = commandeOptions ;
       
       if(!superUser){repondre('Only bot creator or bot owner can use this command!');return};
       if(!arg[0] || !(arg.join('').split('='))) {repondre('Bad format ; This is the Example of using This command:\nSetvar OWNER_NAME=France King');return};
     
    const text = arg.join(" ")
     const Heroku = require("heroku-client");
   
     const heroku = new Heroku({
        token: s.HEROKU_API_KEY,
      });

     let baseURI = "/apps/" + s.HEROKU_APP_NAME;
        await heroku.patch(baseURI + "/config-vars", {
          body: {
                  [text.split('=')[0]]: text.split('=')[1],
          },
        });
        await repondre('That Heroku var is changing,The bot is Rebooting....')
    }
);

king(
    {
        nomCom : "allvar",
        categorie : "HEROKU"
    }, async (dest , zk , commandeOptions) =>{

       const {ms,repondre,superUser , arg} = commandeOptions ;
       
       if(!superUser){repondre('only mods can use this commande');return}; 
      
            const Heroku = require("heroku-client");

			const heroku = new Heroku({
				token: s.HEROKU_API_KEY,
			});
			let baseURI = "/apps/" + s.HEROKU_APP_NAME;

            let h = await heroku.get(baseURI+'/config-vars')
let str = '*FLASH-MD HEROKU VARIABLES*\n\n'
for (vr in h) {
str+= '⚡ *'+vr+'* '+'= '+h[vr]+'\n'
}
 repondre(str)


}

);       


    king(
        {
            nomCom : "getvar",
            categorie : "HEROKU"
        }, async (dest , zk , commandeOptions) =>{
    
           const {ms,repondre,superUser , arg} = commandeOptions ;
           
           if(!superUser){repondre('Only Mods can use this command');return}; 
           if(!arg[0]) {repondre('insert the variable name in capital letter'); return} ;
      
           try {
            const Heroku = require("heroku-client");
               
            const heroku = new Heroku({
              token: s.HEROKU_API_KEY,
            });
            let baseURI = "/apps/" + s.HEROKU_APP_NAME;
        let h = await heroku.get(baseURI+'/config-vars')
        for (vr in h) {
        if( arg.join(' ') ===vr ) return  repondre( vr+'= '+h[vr]) 	;
        } 
        
        } catch(e) {repondre('Error' + e)}
   
        });
//------------testing update-------------
 /*king(
    {
        nomCom: "update",
        categorie: "HEROKU"
    }, async (dest, zk, commandeOptions) => {

        const { repondre, superUser } = commandeOptions;

        if (!superUser) {
            repondre('Only Mods can use this command');
            return;
        }

        try {
            const axios = require('axios');
            const Heroku = require("heroku-client");

            const heroku = new Heroku({
                token: s.HEROKU_API_KEY,
            });

            let baseURI = "/apps/" + s.HEROKU_APP_NAME;

            // Get the latest commit SHA from the GitHub repository
            const githubResponse = await axios.get(`https://api.github.com/repos/Rovic-Pet/Test/commits/main`);
            const latestCommitSHA = githubResponse.data.sha;

            // Optional: Compare with the currently deployed version on Heroku (if needed)
            // For simplicity, this example assumes we always trigger the update if there's a new commit on GitHub.

            // Triggering a GitHub-based deployment
            await heroku.post(`${baseURI}/builds`, {
                body: {
                    source_blob: {
                        url: "https://api.github.com/repos/Rovic-Pet/Test/tarball/main",
                        version: latestCommitSHA // Use the latest commit SHA
                    }
                }
            });

            repondre('New commit found! Bot is updating from the GitHub repository. Please wait a moment...');

        } catch (e) {
            if (e.response && e.response.status === 404) {
                repondre('No new commits found. The bot is up-to-date.');
            } else {
                repondre('Error: ' + e.message);
            }
        }

    });
*/

king(
    {
        nomCom: "update",
        categorie: "HEROKU"
    }, async (dest, zk, commandeOptions) => {

        const { repondre, superUser } = commandeOptions;

        if (!superUser) {
            repondre('Only Mods can use this command');
            return;
        }

        try {
            const axios = require('axios');
            const Heroku = require("heroku-client");

            const heroku = new Heroku({
                token: s.HEROKU_API_KEY,
            });

            const githubRepo = "Rovic-Pet/Test";
            const baseURI = `/apps/${s.HEROKU_APP_NAME}`;
            const githubCommitUrl = `https://api.github.com/repos/${githubRepo}/commits/main`;
            const githubTarballUrl = `https://api.github.com/repos/${githubRepo}/tarball/main`;

            // Get the latest commit SHA from the GitHub repository
            const githubResponse = await axios.get(githubCommitUrl);
            const latestCommitSHA = githubResponse.data.sha;

            // Get the currently deployed commit SHA on Heroku
            const herokuResponse = await heroku.get(`${baseURI}/config-vars`);
            const currentDeployCommitSHA = herokuResponse.body['LATEST_COMMIT_SHA'];

            // If the latest commit SHA is different from the currently deployed commit SHA, trigger a deployment
            if (latestCommitSHA !== currentDeployCommitSHA) {
                // Triggering a GitHub-based deployment
                await heroku.post(`${baseURI}/builds`, {
                    body: {
                        source_blob: {
                            url: githubTarballUrl,
                            version: latestCommitSHA // Use the latest commit SHA
                        }
                    }
                });

                // Optionally update the deployed commit SHA in Heroku config vars (or another place)
                await heroku.patch(`${baseURI}/config-vars`, {
                    body: {
                        LATEST_COMMIT_SHA: latestCommitSHA
                    }
                });

                repondre('New commit found! Bot is updating from the GitHub repository. Please wait a moment...');
            } else {
                repondre('No new commits found. The bot is up-to-date.');
            }

        } catch (e) {
            repondre('Error: ' + e.message);
        }

    });
