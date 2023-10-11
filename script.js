import { config } from "dotenv";
config()
import { OpenAI } from 'openai';
import readline from 'readline';

const ui = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const openai = new OpenAI(
    { apiKey: process.env.gpt_api }
);
let convo = [];
ui.prompt()
ui.on("line", async (input) => {
    convo.push({ role: "user", content: input })
    const res = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: convo
    })
    convo.push(res.choices[0].message);
    console.log(res.choices[0].message.content);
    ui.prompt();
})

