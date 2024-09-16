const {king} = require("../france/king");
const axios = require('axios');



king({
    nomCom: "tictac",
    categorie: "Games",
    reaction: "🎮"
  },
  async (origineMessage, zk, commandeOptions) => {
    const { repondre, ms, auteurMessage, auteurMsgRepondu, msgRepondu, arg, idBot } = commandeOptions;

    if (msgRepondu) {
        zk.sendMessage(origineMessage, {
            text: `@${auteurMessage.split('@')[0]} invites @${auteurMsgRepondu.split('@')[0]} to play Tic-Tac-Toe. To accept the challenge, type 'yes'.`,
            mentions: [auteurMessage, auteurMsgRepondu]
        });

        try {
            const repinv = await zk.awaitForMessage({
                sender: auteurMsgRepondu,
                chatJid: origineMessage,
                timeout: 30000 // 30 seconds
            });

            if (repinv.message.conversation.toLowerCase() === 'yes' || repinv.message.extendedTextMessage.text.toLowerCase() === 'yes') {

                let board = [
                    ['1', '2', '3'],
                    ['4', '5', '6'],
                    ['7', '8', '9']
                ];
                let currentPlayer = auteurMessage;
                let gameOver = false;

                while (!gameOver) {
                    let msg = `Current board:\n${board.map(row => row.join(' | ')).join('\n---|---|---\n')}\n\n@${currentPlayer.split('@')[0]}, make your move (choose a number from the board).`;

                    zk.sendMessage(origineMessage, { text: msg, mentions: [currentPlayer] });

                    const moveMsg = await zk.awaitForMessage({
                        sender: currentPlayer,
                        chatJid: origineMessage,
                        timeout: 30000 // 30 seconds
                    });

                    const move = moveMsg.message.conversation;
                    const moveIndex = board.flat().indexOf(move);

                    if (moveIndex !== -1) {
                        const row = Math.floor(moveIndex / 3);
                        const col = moveIndex % 3;
                        board[row][col] = currentPlayer === auteurMessage ? 'X' : 'O';

                        // Check for win condition
                        if (checkWin(board, currentPlayer === auteurMessage ? 'X' : 'O')) {
                            zk.sendMessage(origineMessage, { text: `Player @${currentPlayer.split('@')[0]} wins!`, mentions: [auteurMessage, auteurMsgRepondu] });
                            gameOver = true;
                        } else if (board.flat().every(cell => cell === 'X' || cell === 'O')) {
                            zk.sendMessage(origineMessage, { text: `The game is a draw!`, mentions: [auteurMessage, auteurMsgRepondu] });
                            gameOver = true;
                        } else {
                            currentPlayer = currentPlayer === auteurMessage ? auteurMsgRepondu : auteurMessage;
                        }
                    } else {
                        zk.sendMessage(origineMessage, { text: `Invalid move. Please choose a number from the board.`, mentions: [currentPlayer] });
                    }
                }
            } else {
                repondre('Invitation refused');
            }
        } catch (error) {
            if (error.message === 'Timeout') {
                zk.sendMessage(origineMessage, { text: `@${auteurMsgRepondu.split('@')[0]} took too long to respond. Game canceled.`, mentions: [auteurMessage, auteurMsgRepondu] });
            } else {
                console.error(error);
            }
        }
    } else {
        repondre('Tic-Tac-Toe is a game for two players. Mention a friend to invite them.');
    }
});

function checkWin(board, symbol) {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    return winPatterns.some(pattern => 
        pattern.every(index => board[Math.floor(index / 3)][index % 3] === symbol)
    );
}
