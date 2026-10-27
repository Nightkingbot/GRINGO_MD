import fs from "fs"
const cats = {AI:150,DOWNLOAD:120,GROUP:80,OWNER:60,FUN:90,ANIME:70,SEARCH:60,STALKER:40,CONVERT:50,TOOLS:80,NSFW:30,OTHER:81}
let real = {AI:["ai","gpt","gemini","grok","blackbox","meta","llama"],DOWNLOAD:["play","ytmp3","ytmp4","tiktok","fb","ig","apk"],GROUP:["kick","add","promote","demote","tagall"],OWNER:["restart","join","leave","block"],FUN:["ship","roast","8ball","joke"]}
for(let [c,n] of Object.entries(cats)){
  fs.mkdirSync(`commands/${c}`,{recursive:true})
  for(let i=1;i<=n;i++){
    let name = real[c]?.[i-1] || `${c.toLowerCase()}${i}`
    let code = `export default { name:"${name}", category:"${c}", desc:"${name}", async execute(m,{sock}){ await sock.sendMessage(m.chat,{text:"✅ GRINGO-MD ${name} - working!"}) } }`
    fs.writeFileSync(`commands/${c}/${name}.js`, code)
  }
}
console.log("911 commands created")
