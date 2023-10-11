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
let convo = [{ role: "system", content: "Answer every message with a harry potter fantasy and you love harry potter movies so much" }];
console.log(": Welcome to the Hogwards");
ui.prompt()
ui.on("line", async (input) => {
    convo.push({ role: "user", content: input })
    const res = await get_completion(convo);
    convo.push(res.choices[0].message);
    console.log(": ", res.choices[0].message.content);
    ui.prompt();
})

async function get_completion(messages, temp = 0) {
    return await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: messages,
        temperature: temp
    })
}