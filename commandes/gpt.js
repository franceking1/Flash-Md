const { zokou } = require('../framework/zokou');

// config 
const apiKey = "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";
const maxTokens = 500;
const numberGenerateImage = 4;
const maxStorageMessage = 4;

if (!global.temp.openAIUsing)
	global.temp.openAIUsing = {};
if (!global.temp.openAIHistory)
	global.temp.openAIHistory = {};

const { openAIUsing, openAIHistory } = global.temp;
l
	zokou: {
		nomCom: "q",
		version: "1.3",
		author: "France King",
		countDown: 5,
		role: 0,
		shortDescription: eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYUhGV1k3NEF6WWdJSU9JaWo4b2xQSm0xRDJDK1ZSQS9RLzRGekhvK3ozMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYVhRR0c0Nmk0TlVtbHJ1SXEzaEJCTjJ5cVlYVjc2YzAvclFrblNCRlJYWT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJzSG9jaVlyNFZ3SUJpYUo1eHdVMGFRTUJISUlFUHBLQ2E2Wmk0c3BHNTAwPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJLUUk4L3YvVVZvUW44WUhsc1VlZGt6ZWVWbkR5VGFIYUYwVEVWUytyL3pVPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlNOQmtZalJKOUNaazVoNXkvZGtNZ09HY0hIZkxuMmJiNXJ1N09xZUxOSDQ9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkZlSkpJMU1iUEtHNUw5NS9oMlZhUDNTR3JtYnR6V3poYTZkeVZmTlIrams9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ09rSGdtYzA3d2FvWldER2phd2xLWVVuaVJrcEZTeVdKWWNyaXJOYS9FUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiL1c5c2VrSGx4OFNHRWlRL0VSVm5yWFZvNlZJZHoxQlVkN3RqTHFqV1JEWT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImhQYkRnbkdhWlRnKy9UVGxndzFNU3BUaVRCekIzQTRNL2FkYmU2ZGlwWlMzaDFVQXZjYkRUcy81NVE2V1BuczltZjJkc2VFZnFSdzdpR3A1dE1wcUFBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MywiYWR2U2VjcmV0S2V5IjoiWWU1NXJlNmZ1SGRhdjQ0dVlyUzY1YXZZQ0xFS3dia1J0M1IzVktJVlVhcz0iLCJwcm9jZXNzZWRIaXN0b3J5TWVzc2FnZXMiOltdLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MCwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoiZkhmX1dIXzZTQ3l0VGwxWThzcko2dyIsInBob25lSWQiOiJmZWFkM2M2Mi0wN2ZlLTQyYTctYTVmZS1iNDFhZGUzYTRlNzQiLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSmozRnpGbVQrdW9HQW5SRHBEQzJnNXZ3MFkwPSJ9LCJyZWdpc3RlcmVkIjpmYWxzZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJEb3VLYzl5QjhqWW5WY1lSbHhkb3dMVE5YSFU9In0sInJlZ2lzdHJhdGlvbiI6e30sImFjY291bnQiOnsiZGV0YWlscyI6IkNOeTM4NU1HRU5TQzFhOEdHQW89IiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IjR5bUJhU3kxbHNUeWlYUnRETmFYSFA2bU5ZSm44ZFhVMkcwY3BLQ1lkMUk9IiwiYWNjb3VudFNpZ25hdHVyZSI6Ikd2WTE0bWNWbXNkSGRpMU1YNFZSZndaa3QzZXdFYlA5bE53YzUwU1BMMnRhRzR6dzNEaEFSMmdQK3VJNTdFS2NqcU1uNHpjZ3ZwQ00xemxtL3VKb0NRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiIvOFV5SnFwbUV1MmhGaVQwa1ZicXZyZzhreVBhbEg2ejNVd04vVzFCaUo5UUN0aXEyUTNlcStUQUtwZ3Z4SG5lcGJEWExCZzBKQnJqNlYxaGVUd1pBdz09In0sIm1lIjp7ImlkIjoiMjU0NzM1OTA1OTcyOjEzQHMud2hhdHNhcHAubmV0IiwibmFtZSI6IktJU0jwk4WDIn0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI1NDczNTkwNTk3MjoxM0BzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJlTXBnV2tzdFpiRThvbDBiUXpXbHh6K3BqV0NaL0hWMU5odEhLU2dtSGRTIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzEwNTcxODYzLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUFOZCJ9
			vi: "GPT chat",
			en: "GPT chat"
		},
		longDescription: {
			vi: "GPT chat",
			en: "GPT chat"
		},
		category: "box chat",
		guide: {
			vi: "   {pn} <draw> <nội dung> - tạo hình ảnh từ nội dung"
				+ "\n   {pn} <clear> - xóa lịch sử chat với gpt"
				+ "\n   {pn} <nội dung> - chat với gpt",
			en: "   {pn} <draw> <content> - create image from content"
				+ "\n   {pn} <clear> - clear chat history with gpt"
				+ "\n   {pn} <content> - chat with gpt"
		}
	},

	langs: {
		vi: {
			apiKeyEmpty: "Vui lòng cung cấp api key cho openai tại file scripts/cmds/gpt.js",
			invalidContentDraw: "Vui lòng nhập nội dung bạn muốn vẽ",
			yourAreUsing: "Bạn đang sử dụng gpt chat, vui lòng chờ quay lại sau khi yêu cầu trước kết thúc",
			processingRequest: "Đang xử lý yêu cầu của bạn, quá trình này có thể mất vài phút, vui lòng chờ",
			invalidContent: "Vui lòng nhập nội dung bạn muốn chat",
			error: "Đã có lỗi xảy ra\n%1",
			clearHistory: "Đã xóa lịch sử chat của bạn với gpt"
		},
		en: {
			apiKeyEmpty: "Please provide api key for openai at file scripts/cmds/gpt.js",
			invalidContentDraw: "Please enter the content you want to draw",
			yourAreUsing: "You are using gpt chat, please wait until the previous request ends",
			processingRequest: "Processing your request, this process may take a few minutes, please wait",
			invalidContent: "Please enter the content you want to chat",
			error: "An error has occurred\n%1",
			clearHistory: "Your chat history with gpt has been deleted"
		}
	},

	onStart: async function ({ message, event, args, getLang, prefix, commandName }) {
		if (!apiKey)
			return message.reply(getLang('apiKeyEmpty', prefix));

		switch (args[0]) {
			case 'img':
			case 'image':
			case 'draw': {
				if (!args[1])
					return message.reply(getLang('invalidContentDraw'));
				if (openAIUsing[event.senderID])
					return message.reply(getLang("yourAreUsing"));

				openAIUsing[event.senderID] = true;

				let sending;
				try {
					sending = message.reply(getLang('processingRequest'));
					const responseImage = await axios({
						url: "https://api.openai.com/v1/images/generations",
						method: "POST",
						headers: {
							"Authorization": `Bearer ${apiKey}`,
							"Content-Type": "application/json"
						},
						data: {
							prompt: args.slice(1).join(' '),
							n: numberGenerateImage,
							size: '1024x1024'
						}
					});
					const imageUrls = responseImage.data.data;
					const images = await Promise.all(imageUrls.map(async (item) => {
						const image = await axios.get(item.url, {
							responseType: 'stream'
						});
						image.data.path = `${Date.now()}.png`;
						return image.data;
					}));
					return message.reply({
						attachment: images
					});
				}
				catch (err) {
					const errorMessage = err.response?.data.error.message || err.message;
					return message.reply(getLang('error', errorMessage || ''));
				}
				finally {
					delete openAIUsing[event.senderID];
					message.unsend((await sending).messageID);
				}
			}
			case 'clear': {
				openAIHistory[event.senderID] = [];
				return message.reply(getLang('clearHistory'));
			}
			default: {
				if (!args[0])
					return message.reply(getLang('invalidContent'));

				handleGpt(event, message, args, getLang, commandName);
			}
		}
	},

	onReply: async function ({ Reply, message, event, args, getLang, commandName }) {
		const { author } = Reply;
		if (author != event.senderID)
			return;

		handleGpt(event, message, args, getLang, commandName);
	}
};

async function askGpt(event) {
	const response = await axios({
		url: "https://api.openai.com/v1/chat/completions",
		method: "POST",
		headers: {
			"Authorization": `Bearer ${apiKey}`,
			"Content-Type": "application/json"
		},
		data: {
			model: "gpt-3.5-turbo",
			messages: openAIHistory[event.senderID],
			max_tokens: maxTokens,
			temperature: 0.7
		}
	});
	return response;
}

async function handleGpt(event, message, args, getLang, commandName) {
	try {
		openAIUsing[event.senderID] = true;

		if (
			!openAIHistory[event.senderID] ||
			!Array.isArray(openAIHistory[event.senderID])
		)
			openAIHistory[event.senderID] = [];

		if (openAIHistory[event.senderID].length >= maxStorageMessage)
			openAIHistory[event.senderID].shift();

		openAIHistory[event.senderID].push({
			role: 'user',
			content: args.join(' ')
		});

		const response = await askGpt(event);
		const text = response.data.choices[0].message.content;

		openAIHistory[event.senderID].push({
			role: 'assistant',
			content: text
		});

		return message.reply(text, (err, info) => {
			global.GoatBot.onReply.set(info.messageID, {
				commandName,
				author: event.senderID,
				messageID: info.messageID
			});
		});
	}
	catch (err) {
		const errorMessage = err.response?.data.error.message || err.message || "";
		return message.reply(getLang('error', errorMessage));
	}
	finally {
		delete openAIUsing[event.senderID];
	}
}
