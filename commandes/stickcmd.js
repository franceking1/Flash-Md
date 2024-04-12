
/** 

🇫‌🇱‌🇦‌🇸‌🇭‌-🇲‌🇩‌ 

  𝗖𝗼𝗽𝘆𝗿𝗶𝗴𝗵𝘁 (𝗖) 2024.
 𝗟𝗶𝗰𝗲𝗻𝘀𝗲𝗱 𝘂𝗻𝗱𝗲𝗿 𝘁𝗵𝗲  𝗠𝗜𝗧 𝗟𝗶𝗰𝗲𝗻𝘀𝗲;
 𝗬𝗼𝘂 𝗺𝗮𝘆 𝗻𝗼𝘁 𝘂𝘀𝗲 𝘁𝗵𝗶𝘀 𝗳𝗶𝗹𝗲 𝗲𝘅𝗰𝗲𝗽𝘁 𝗶𝗻 𝗰𝗼𝗺𝗽𝗹𝗶𝗮𝗻𝗰𝗲 𝘄𝗶𝘁𝗵 𝘁𝗵𝗲 𝗟𝗶𝗰𝗲𝗻𝘀𝗲.
 𝗜𝘁 𝗶𝘀 𝘀𝘂𝗽𝗽𝗹𝗶𝗲𝗱 𝗶𝗻 𝘁𝗵𝗲 𝗵𝗼𝗽𝗲 𝘁𝗵𝗮𝘁 𝗶𝘁 𝗺𝗮𝘆 𝗯𝗲 𝘂𝘀𝗲𝗳𝘂𝗹.
 * @𝗽𝗿𝗼𝗷𝗲𝗰𝘁_𝗻𝗮𝗺𝗲 : 𝗙𝗹𝗮𝘀𝗵 𝗠𝗗, 𝗮 𝘀𝗶𝗺𝗽𝗹𝗲 𝗮𝗻𝗱 𝗲𝗮𝘀𝘆 𝗪𝗵𝗮𝘁𝘀𝗔𝗽𝗽 𝘂𝘀𝗲𝗿 𝗯𝗼𝘁 
 * @𝗼𝘄𝗻𝗲𝗿: 𝗙𝗿𝗮𝗻𝗰𝗲 𝗞𝗶𝗻𝗴 
 
 **/












const {france }= require ('../framework/france') ;
const {addstickcmd, deleteCmd, getCmdById, inStickCmd , getAllStickCmds} = require('../bdd/stickcmd') ;



france(
    {
        nomCom : 'setcmd',
        categorie : 'stickcmd'
        
    }, async (dest,zk,commandeOptions) => { 

   const {ms , arg, repondre,superUser , msgRepondu} = commandeOptions;

    if (!superUser) { repondre('you can\'t use this command') ; return} ;

      if(msgRepondu && msgRepondu.stickerMessage )  {
  
         if(!arg || !arg[0]) { repondre('put the name of the command') ; return} ;
          
        
         await addstickcmd(arg[0].toLowerCase() , msgRepondu.stickerMessage.url ) ;

         repondre('Stick cmd save successfully')

      } else {

        repondre('mention a sticker')
      }

    }) ; 

    france(
      {
          nomCom: 'delcmd',
          categorie: 'stickcmd'
      },
      async (dest, zk, commandeOptions) => {
  
          const { ms, arg, repondre, superUser } = commandeOptions;
  
          if (!superUser) {
              repondre('only Mods can use this command');
              return;
          }
  
          if (!arg || !arg[0]) {
              repondre('put the name of the command that you want to delete');
              return;
          }
  
          const cmdToDelete = arg[0];

  
          try {
              await deleteCmd(cmdToDelete.toLowerCase());
              repondre(`the commande ${cmdToDelete} is deleted successfully.`);
          } catch {
              repondre(`the command ${cmdToDelete} don't existe`);
          }
      }
  );
  

  france(
    {
        nomCom: 'allcmd',
        categorie: 'stickcmd'
    },
    async (dest, zk, commandeOptions) => {
        const { repondre, superUser } = commandeOptions;

        if (!superUser) {
            repondre('only Mods can use this command');
            return;
        }

        const allCmds = await getAllStickCmds();

        if (allCmds.length > 0) {
            const cmdList = allCmds.map(cmd => cmd.cmd).join(', ');
            repondre(`*List of all stickcmd :*
 ${cmdList}`);
        } else {
            repondre('No stickcmd save');
        }
    }
);
