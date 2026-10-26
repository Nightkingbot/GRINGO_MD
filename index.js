const { default: makeWASocket, useMultiFileAuthState } = require('@whiskeysockets/baileys')
const P = require('pino')
const fs = require('fs')
const path = require('path')
const settings = require('./settings')

async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState(settings.sessionName)
  const sock = makeWASocket({
    logger: P({ level: 'silent' }),
    auth: state,
    printQRInTerminal: true
  })

  sock.ev.on('creds.update', saveCreds)
  
  sock.ev.on('messages.upsert', async ({ messages }) => {
    const m = messages[0]
    if (!m.message) return
    const text = m.message.conversation || m.message.extendedTextMessage?.text || ""
    if (!text.startsWith(settings.prefix)) return
    
    const command = text.slice(1).split(' ')[0].toLowerCase()
    
    if (command === 'pain') {
      const order = ['./pain1.jpg','./pain2.jpg','./pain3.jpg','./pain4.jpg']
      for (let img of order) {
        if (fs.existsSync(img)) {
          await sock.sendMessage(m.key.remoteJid, { image: fs.readFileSync(img) })
          await new Promise(r => setTimeout(r, 1200))
        }
      }
    }
    if (command === 'ping') {
      await sock.sendMessage(m.key.remoteJid, { text: 'GRINGO-MD Online 🔥' })
    }
  })
}
startBot()
