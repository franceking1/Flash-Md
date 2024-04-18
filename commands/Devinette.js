

/** 

🇫‌🇱‌🇦‌🇸‌🇭‌-🇲‌🇩‌ 

  𝗖𝗼𝗽𝘆𝗿𝗶𝗴𝗵𝘁 (𝗖) 2024.
 𝗟𝗶𝗰𝗲𝗻𝘀𝗲𝗱 𝘂𝗻𝗱𝗲𝗿 𝘁𝗵𝗲  𝗠𝗜𝗧 𝗟𝗶𝗰𝗲𝗻𝘀𝗲;
 𝗬𝗼𝘂 𝗺𝗮𝘆 𝗻𝗼𝘁 𝘂𝘀𝗲 𝘁𝗵𝗶𝘀 𝗳𝗶𝗹𝗲 𝗲𝘅𝗰𝗲𝗽𝘁 𝗶𝗻 𝗰𝗼𝗺𝗽𝗹𝗶𝗮𝗻𝗰𝗲 𝘄𝗶𝘁𝗵 𝘁𝗵𝗲 𝗟𝗶𝗰𝗲𝗻𝘀𝗲.
 𝗜𝘁 𝗶𝘀 𝘀𝘂𝗽𝗽𝗹𝗶𝗲𝗱 𝗶𝗻 𝘁𝗵𝗲 𝗵𝗼𝗽𝗲 𝘁𝗵𝗮𝘁 𝗶𝘁 𝗺𝗮𝘆 𝗯𝗲 𝘂𝘀𝗲𝗳𝘂𝗹.
 * @𝗽𝗿𝗼𝗷𝗲𝗰𝘁_𝗻𝗮𝗺𝗲 : 𝗙𝗹𝗮𝘀𝗵 𝗠𝗗, 𝗮 𝘀𝗶𝗺𝗽𝗹𝗲 𝗮𝗻𝗱 𝗲𝗮𝘀𝘆 𝗪𝗵𝗮𝘁𝘀𝗔𝗽𝗽 𝘂𝘀𝗲𝗿 𝗯𝗼𝘁 
 * @𝗼𝘄𝗻𝗲𝗿: 𝗙𝗿𝗮𝗻𝗰𝗲 𝗞𝗶𝗻𝗴 
 
 **/







const { france } = require('../framework/france');

// Set a riddle list with questions and answers
const devinettes = [
  {
    question: "I can fly without wings, who am I?",
    reponse: "The weather",
  },
  {
    question: "I'm always hungry, the more I eat, the fatter I become. Who am I ?",
    reponse: "A black hole",
  },
  {
    question: "I'm strong when I'm down, but I'm weak when I'm up. Who am I ?",
    reponse: "The number 6",
  },
  {
    question: "I can be short or long, hard or soft, I can be used by anyone, from young children to experienced musicians. Who am I ?",
    reponse: "A pencil",
  },
  {
    question: "I am the beginning of the end, the end of every place. I am the beginning of eternity, the end of time and space. Who am I ?",
    reponse: "The letter 'e'",
  },
  {
    question: "I am white when I am dirty and black when I am clean. Who am I ?",
    reponse: "A slate",
  },
  {
    question: "I'm liquid, but if you take water away from me, I become solid. Who am I ?",
    reponse: "Tea",
  },
  {
    question: "I fly without wings, I cry without eyes. Wherever I am, death always accompanies me. Who am I ?",
    reponse: "The wind",
  },
  {
    question: "I have towns, but no houses. I have mountains, but no trees. I have water, but no fish. Who am I ?",
    reponse: "A map",
  },
  {
    question: "I can be read, but you can't write about me. You always give to me, but rarely keep me. Who am I ?",
    reponse: "A borrowed book",
  },
  {
    question: "I come twice in a week, once in a year, but never in a day. Who am I ?",
    reponse: "The letter 'E'",
  },
  {
    question: "I'm hard to grasp, but you will hold me in your hand when you find me. Who am I ?",
    reponse: "Your breath",
  },
  {
    question: "The hotter I am, the colder I become. Who am I ?",
    reponse: "coffe",
  },
  {
    question: "I am the stuff of dreams. I cover broken ideas. I change souls into wings. Who am I ?",
    reponse: "A book",
  },
  {
    question: "I am white when I am dirty and black when I am clean. Who am I?",
    reponse: "A slate",
  },
  {
    question: "I can fly without having wings. I can cry without having eyes. Who am I ?",
    reponse: "A cloud",
  },
  {
    question: "I start at night and finish in the morning. Who am I ?",
    reponse: "The letter 'N'",
  },
  {
    question: "I can be read, but you can't write about me. You always give to me, but rarely keep me. Who am I ?",
    reponse: "A borrowed book",
  },
  {
    question: "I feed on everything around me, the air, the earth and even the trees. Who am I ?",
    reponse: "a fire",
  },
  {
    question: "I am white when I am dirty and black when I am clean. Who am I ?",
    reponse: "A slate",
  },
  {
    question: "I'm liquid, but if you take water away from me, I become solid. Who am I ?",
    reponse: "tea",
  },
  {
    question: "I am the beginning of the end and the end of every place. I am the beginning of eternity, the end of time and space. Who am I ?",
    reponse: "the letter'E'",
  },
  {
    question: "I'm hard to grasp, but you will hold me in your hand when you find me. Who am I ?",
    reponse: "Your breath",
  },
  ];
  
france({ nomCom: "riddle", categorie: "Games" }, async (dest, zk, commandeOptions) => {
  const { ms, repondre } = commandeOptions;

  // Choose a random riddle
  const devinette = devinettes[Math.floor(Math.random() * devinettes.length)];
// Send the riddle question
  await zk.sendMessage(
    dest,
    {
      text: `Riddle: ${devinette.question} . \n you have 30 seconds to think about.`,
    },
    { quoted: ms }
  );

  //Wait 60 seconds before sending the response
  await delay(30000);

  // Answer
  await zk.sendMessage(
    dest,
    {
      text: `The answer was : ${devinette.reponse}`,
    },
    { quoted: ms }
  );
});

// Function to create a pause/delay in milliseconds
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
