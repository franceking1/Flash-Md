const { zokou } = require('../framework/zokou');
const traduire = require("../framework/traduction") ;
const conf = require('../set');




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


  zokou({ nomCom: "gpt", reaction: "📡", categorie: "IA" }, async (dest, zk, commandeOptions) => {
    const { repondre, arg } = commandeOptions;
  
    try {
      if (!arg || arg.length === 0) {
        return repondre("please ask your question");
      }
  
      const question = arg.join(' ');
  
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${conf.GPT}`, 
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo", 
          messages: [{ role: "system", content: "You are a helpful assistant." }, { role: "user", content: question }],
        }),
      });
  
      const reponseData = await response.json();
      console.log("GPT REPONCE : ",reponseData); 
      
      if (!reponseData.choices || reponseData.choices.length === 0) {
        repondre("OPENAI_API_KEY is invalide, put a new openai api key");
      } else {
        repondre(reponseData.choices[0].message.content);
          }
      
    } catch (error) {
      console.error('Erreur:', error.message || 'Une erreur s\'est produite');
      repondre("Oups, an error detected");
    }
  });
  


  
