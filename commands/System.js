const {king}=require("../france/king")







king({nomCom:"reboot",categorie:"User",reaction:"👨🏿‍💼"},async(dest,z,com)=>{


  
const{repondre,ms,dev,superUser}=com;

  if(!superUser)
  {
    return repondre("This command is for my owner only");
  }

  const {exec}=require("child_process")

    repondre("*Rebooting...*");

  exec("pm2 restart all");
  

  



})
