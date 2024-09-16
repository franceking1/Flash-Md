const {king} = require("../france/king");
const axios = require('axios');
const traduire = require('../france/traduction')



king({
    nomCom: "chifumi",
    categorie: "Games",
    reaction: "📺"
  },
  async (origineMessage, zk, commandeOptions) => {
    const { repondre, ms, auteurMessage, auteurMsgRepondu, msgRepondu , arg , idBot } = commandeOptions;

    if (msgRepondu) {
        zk.sendMessage(origineMessage, {
            text: `@${auteurMessage.split('@')[0]} invites @${auteurMsgRepondu.split('@')[0]} to play the rock-paper-scissors game;
        To accept the challenge, type yes`,
            mentions: [auteurMessage, auteurMsgRepondu]
        });

        try {
            const repinv = await zk.awaitForMessage({
                sender: auteurMsgRepondu,
                chatJid: origineMessage,
                timeout: 30000 // 30 secondes
            });
   console.log(repinv) ;

            if (repinv.message.conversation.toLowerCase() === 'yes' || repinv.message.extendedTextMessage.text.toLowerCase() === 'yes' ) {

              let msg1 = `*player 1 :* @${auteurMsgRepondu.split('@')[0]}
*player 2 :* @${auteurMessage.split('@')[0]}

*Rules:* The game will start soon; you have a maximum of 1 minute each to make a choice in our private chat;`
                
      zk.sendMessage(origineMessage,{text : msg1,mentions : [auteurMessage, auteurMsgRepondu]} ) ;

      let msg2 = `You have 3 choices;

      rock
      paper
      scissors
   
   Please send your choice`
 let players = [auteurMessage,auteurMsgRepondu] ;
let choix = [] ;

 try {
  
        for (const player of players) {
        
         zk.sendMessage(origineMessage,{ text : `@${player.split("@")[0]} Please go to this chat to make a choice
         https://wa.me/${idBot.split('@')[0]} ` , mentions : [player]})
            zk.sendMessage(player,{text : msg2}) ;
             
          const msgrecu =  await zk.awaitForMessage({
                sender: player,
                chatJid: player,
                timeout: 30000 // 30 secondes
            });
           console.log('voici le message de' + ' ' + player)
     console.log(msgrecu)

            choix.push(msgrecu.message.extendedTextMessage.text.toLowerCase()) ;
         
        }

        console.log(choix)
  const choixPossibles = ["rock", "paper", "scissors"];    
  
  const choixJoueur1 = choix[0] ;
const choixJoueur2 = choix[1] ;


if (!choixPossibles.includes(choixJoueur1) || !choixPossibles.includes(choixJoueur2)) {
    // Gérez le cas où les choix ne sont pas valides
    zk.sendMessage(origineMessage,{ text : `*joueur 1 :* @${auteurMsgRepondu.split('@')[0]}
*joueur 2 :* @${auteurMessage.split('@')[0]}

*resultat :* l'un ou les deux choix ne sont pas valides.`, mentions : [auteurMessage, auteurMsgRepondu] });

} else if (choixJoueur1 === choixJoueur2) {
    // C'est une égalité
    zk.sendMessage(origineMessage,{ text : `*joueur 1 :* @${auteurMsgRepondu.split('@')[0]} a choisi(e) *${choixJoueur2}* 
*joueur 2 :* @${auteurMessage.split('@')[0]} a choisi(e) *${choixJoueur1}*

resultat : il y'a donc match nul` , mentions : [auteurMessage, auteurMsgRepondu] });
} else if (
    (choixJoueur1 === "rock" && choixJoueur2 === "scissors") ||
    (choixJoueur1 === "paper" && choixJoueur2 === "rock") ||
    (choixJoueur1 === "scissors" && choixJoueur2 === "paper")
) {
    // Joueur 1 gagne
    zk.sendMessage(origineMessage,{ text : `*player 1 :* @${auteurMsgRepondu.split('@')[0]} choose *${choixJoueur2}* 
*player 2 :* @${auteurMessage.split('@')[0]} choose *${choixJoueur1}*

*result :* @${auteurMessage.split('@')[0]} win ` ,mentions : [auteurMessage, auteurMsgRepondu] });
} else {
    // Joueur 2 gagne
    zk.sendMessage(origineMessage,{ text : `*player 1 :* @${auteurMsgRepondu.split('@')[0]} choose *${choixJoueur2}* 
*player 2 :* @${auteurMessage.split('@')[0]} choose) *${choixJoueur1}*

*result :* @${auteurMsgRepondu.split('@')[0]} win ` , mentions : [auteurMessage, auteurMsgRepondu] });
}

           } catch (error) {
            if (error.message === 'Timeout') {
                // Le temps d'attente est écoulé
                zk.sendMessage(origineMessage,{ text : `*player 1 :* @${auteurMsgRepondu.split('@')[0]}
*player 2 :* @${auteurMessage.split('@')[0]}

*result :* Our players took too long to decide;
Therefore, the game is canceled
` , mentions : [auteurMessage, auteurMsgRepondu]});
            } else {
                // Gérez d'autres erreurs ici si nécessaire
                console.error(error);
            }
           }
        
           } else {
                repondre('invitation refused') ;
            }
            

      } catch (error) {
            if (error.message === 'Timeout') {
                // Le temps d'attente est écoulé
                zk.sendMessage(origineMessage,{ text : `@${auteurMsgRepondu.split('@')[0]} took too long to respond to the invitation from
                @${auteurMessage.split('@')[0]} ;
Therefore, the game is canceled`, mentions : [auteurMessage, auteurMsgRepondu]});
            } else {
                // Gérez d'autres erreurs ici si nécessaire
                console.error(error);
            }
        }
    } else {
        repondre('Chifumi  is an rock-paper-scissors games ; you need a friend too play , mention his/her message when sending chifumi to invite him/her') ;
    }
});


king(
  { nomCom: "quizz", categorie: "Games", reaction: "👨🏿‍💻" },
  async (origineMessage, zk, commandeOptions) => {
    const { repondre, auteurMessage } = commandeOptions;

    try {
      // Fetch quiz data
      let quizz = await axios.get("https://quizzapi.jomoreschi.fr/api/v1/quiz?limit=1&difficulty=facile");

      // Prepare quiz question and answers
      let question = quizz.data.quizzes[0];
      let category = await traduire(question.category, { to: 'en' });
      let questionText = await traduire(question.question, { to: 'en' });
      let correctAnswer = question.answer;
      let allAnswers = [...question.badAnswers, correctAnswer];
      
      async function shuffleArray(array) {
        const shuffledArray = array.slice(); // Copy the original array
        for (let i = shuffledArray.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
      }

      let shuffledAnswers = await shuffleArray(allAnswers);

      let msg = `*Flash-Md Quizz Game*\n\n*Category:* ${category}\n*Question:* ${questionText}\n\n*Answers:*\n`;
      shuffledAnswers.forEach((answer, index) => {
        msg += `*${index + 1} :* ${answer}\n`;
      });
      msg += `\nSend the number of the correct answer`;

      repondre(msg);

      // Function to handle user response
      async function handleResponse(attempt) {
        let response = await zk.awaitForMessage({
          sender: auteurMessage,
          chatJid: origineMessage,
          timeout: 15000 // 15 seconds
        });

        let userAnswer;
        try {
          userAnswer = response.message.extendedTextMessage.text;
        } catch {
          userAnswer = response.message.conversation;
        }

        if (shuffledAnswers[userAnswer - 1] === correctAnswer) {
          return repondre("Great, good answer!");
        } else if (attempt === 1) {
          return repondre("Incorrect! One more try...");
        } else {
          return repondre(`Incorrect! The correct answer was: ${correctAnswer}`);
        }
      }

      // Handle the first attempt
      await handleResponse(1);

      // Handle the second attempt if needed
      await handleResponse(2);

    } catch (error) {
      console.error(error);
      repondre("An error occurred while processing the quiz.");
    }
  }
);




