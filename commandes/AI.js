const { zokou } = require('../framework/zokou');
const deepai=require("deepai")
const traduire = require("../framework/traduction")


async function ia(requete){


  
deepai.setApiKey("quickstart-QUdJIGlzIGNvbWluZy4uLi4K");

  
var rep =await deepai.callStandardApi("text-generator",{text:requete});
  return rep.output;
};

zokou({nomCom:"zokou",reaction:"📡",categorie:"IA"},async(dest,zk,commandeOptions)=>{

const {repondre,ms,arg}=commandeOptions;

  if(!arg || !arg[0])
  {return repondre("Please ask your question .")}
  var quest = arg.join(' ');
try{
  let rep= await ia(quest);
 let tex = await traduire(rep , { to: 'en' })

  repondre(tex);
}catch(e){ repondre("oops an error : "+e)}
  

});


zokou({nomCom:"bot",reaction:"📡",categorie:"IA"},async(dest,zk,commandeOptions)=>{

  const {repondre,ms,arg}=commandeOptions;
  
    if(!arg || !arg[0])
    {return repondre("yes I'm listening to you.")}
    var quest = arg.join(' ');
  try{
    
    
const message = await traduire(arg.join(' '),{ to : 'en'});
 console.log(message)
fetch(`http://api.brainshop.ai/get?bid=177607&key=NwzhALqeO1kubFVD&uid=[uid]&msg=${message}`)
.then(response => response.json())
.then(data => {
  const botResponse = data.cnt;
  console.log(botResponse);

  traduire(botResponse, { to: 'en' })
    .then(translatedResponse => {
      repondre(translatedResponse);
    })
    .catch(error => {
      console.error('Error when translating into French :', error);
      repondre('Error when translating into French');
    });
})
.catch(error => {
  console.error('Error requesting BrainShop :', error);
  repondre('Error requesting BrainShop');
});

  }catch(e){ repondre("oops an error : "+e)}
    
  
  });  
  

  
