/*
THX BUAT YANG UDAH GUNAIN SCRIPT INI!
JANGAN LUPA JOIN GRUP WHATSAPP!
AGAR BISA MENGEMBANGKAN BOT BUKAN COPY DOANG
JANGAN LUPA CREDIT KALO COPAS!

SCRIPT INI BUKAN UNTUK DIJUAL BELIKAN!
SCRIPT INI TERBUKA UNTUK SIAPA SAJA!
JIKA KALIAN INGIN MENAMBAHKAN MENU
SILAHKAN KONTRIBUSI/PULL REQUEST

BAGI YANG NANYA2 MASANG APIKEY DIMANA??
BACA README NYA, PERCUMA W BUAT README

INGAT JANGAN JUAL SCRIPT ELAINA KEPADA ORANG LAIN!
INGIN PREMIUM? CHAT TOBZ!

ELAINA BOT V3
*/
require('dotenv').config()
const { decryptMedia } = require('@open-wa/wa-decrypt')
const fs = require('fs-extra')
const ffmpeg = require('fluent-ffmpeg')
const axios = require('axios')
const moment = require('moment-timezone')
const getYouTubeID = require('get-youtube-id')
const os = require('os')
const get = require('got')
const speed = require('performance-now')
const fetch = require('node-fetch')
const { spawn, exec } = require('child_process')
const nhentai = require('nhentai-js')
const { API } = require('nhentai-api')
const google = require('google-it')
const translatte = require('translatte')
const { stdout } = require('process')
const translate = require('translatte')
const Math_js = require('mathjs');
const imageToBase64 = require('image-to-base64')
const bent = require('bent')
const request = require('request')

const { getStickerMaker } = require('./lib/ttp')
const quotedd = require('./lib/quote')
const { rules } = require('./lib/rules')
const color = require('./lib/color')
const { animesaran } = require('./lib/animesaran')
const urlShortener = require('./lib/shortener')
const { addFilter, isFiltered } = require('./lib/msgFilter')
const cariKasar = require('./lib/kataKotor')
const rugaapi = require('./lib/rugaApi')

const { 
    downloader,
    liriklagu,
    quotemaker,
    randomNimek,
    sleep,
    jadwalTv,
    processTime,
    nulis
    } = require('./lib/functions')

const { 
    help,
    cmd,
    bottt,
    admincmd,
    ownercmd,
    nsfwcmd,
    kerangcmd,
    mediacmd,
    animecmd,
    othercmd,
    premcmd,
    downloadcmd,
    praycmd,
    groupcmd,
    funcmd,
    bahasalist,
    sewa,
    snk,
    intro, 
    info, 
    sumbang, 
    readme, 
    listChannel,
    commandArray
    } = require('./lib/help')

const {
    genre,
    drama1,
    drama2,
    phsyco,
    isekai,
    mysteri1,
    mysteri2,
    trailer,
    action,
    action2,
    samurai,
    supernatural,
    romance,
    romance2,
    romancesad,
    advanture2,
    romanceshoujo,
    comedi,
    comedischool,
    chara,
    cars,
    harem,
    harem2,
    musik,
    reverse,
    sport,
    sport2,
    horor,
    adventure,
    mecha,
    police,
    historycal,
    milytary,
    schoollife,
    martial,
    slicelife,
    fantasy,
    scifi
    } = require('./lib/genre')

const {
    instagram,
    tiktok,
    facebook,
    smule,
    starmaker,
    twitter,
    joox
    } = require('./lib/downloader')



const {
    stickerburn,
    stickerlight
    } = require('./lib/sticker')

const { 
    uploadImages, 
    custom,
    picturemis
    } = require('./lib/fetcher')

// LOAD FILE
let banned = JSON.parse(fs.readFileSync('./lib/database/banned.json'))
let nsfw_ = JSON.parse(fs.readFileSync('./lib/database/nsfwz.json'))
let simi_ = JSON.parse(fs.readFileSync('./lib/database/Simsimi.json'))
let limit = JSON.parse(fs.readFileSync('./lib/database/limit.json'))
let welkom = JSON.parse(fs.readFileSync('./lib/database/welcome.json'))
let left = JSON.parse(fs.readFileSync('./lib/database/left.json'))
let muted = JSON.parse(fs.readFileSync('./lib/database/muted.json'))
let setting = JSON.parse(fs.readFileSync('./lib/database/setting.json'))
let msgLimit = JSON.parse(fs.readFileSync('./lib/database/msgLimit.json'))
let adminNumber = JSON.parse(fs.readFileSync('./lib/database/admin.json'))
let public = JSON.parse(fs.readFileSync('./lib/database/public.json'))
let sound = JSON.parse(fs.readFileSync('./lib/database/sound.json'))
let leveling = JSON.parse(fs.readFileSync('./lib/database/leveling.json'))
let _level = JSON.parse(fs.readFileSync('./lib/database/level.json'))
let uang = JSON.parse(fs.readFileSync('./lib/database/uang.json'))

// PROTECT
let antilink = JSON.parse(fs.readFileSync('./lib/database/antilink.json'))
let antibadword = JSON.parse(fs.readFileSync('./lib/database/antibadword.json'))
let antisticker = JSON.parse(fs.readFileSync('./lib/database/antisticker.json'))
let msgBadword = JSON.parse(fs.readFileSync('./lib/database/msgBadword.json'))
let dbbadword = JSON.parse(fs.readFileSync('./lib/database/katakasar.json'))
let badword = JSON.parse(fs.readFileSync('./lib/database/badword.json'))
let prem = JSON.parse(fs.readFileSync('./lib/database/premium.json'))
let pendaftar = JSON.parse(fs.readFileSync('./lib/database/user.json'))
let stickerspam = JSON.parse(fs.readFileSync('./lib/database/stickerspam.json'))
let afk = JSON.parse(fs.readFileSync('./lib/database/afk.json'))
let event = JSON.parse(fs.readFileSync('./lib/database/event.json'))

let { 
    limitCount,
    memberLimit, 
    groupLimit,
    banChats,
    melodickey,
    vhtearkey,
    tobzkey,
    prefix,
    restartState: isRestart,
    mtc: mtcState
    } = setting

let state = {
    status: () => {
        if(banChats){
            return 'Nonaktif'
        }else if(mtcState){
            return 'Nonaktif'
        }else if(!mtcState){
            return 'Aktif'
        }else{
            return 'Aktif'
        }
    }
}

prefix = '#'
cr = '*team bucin nime verified*'
var timeStart = Date.now() / 1000
moment.tz.setDefault('Asia/Jakarta').locale('id')

//FUNCTION
const getLevelingXp = (userId) => {
            let position = false
            Object.keys(_level).forEach((i) => {
                if (_level[i].id === userId) {
                    position = i
                }
            })
            if (position !== false) {
                return _level[position].xp
            }
        }

        const getLevelingLevel = (userId) => {
            let position = false
            Object.keys(_level).forEach((i) => {
                if (_level[i].id === userId) {
                    position = i
                }
            })
            if (position !== false) {
                return _level[position].level
            }
        }

        const getLevelingId = (userId) => {
            let position = false
            Object.keys(_level).forEach((i) => {
                if (_level[i].id === userId) {
                    position = i
                }
            })
            if (position !== false) {
                return _level[position].id
            }
        }

        const addLevelingXp = (userId, amount) => {
            let position = false
            Object.keys(_level).forEach((i) => {
                if (_level[i].id === userId) {
                    position = i
                }
            })
            if (position !== false) {
                _level[position].xp += amount
                fs.writeFileSync('./lib/level.json', JSON.stringify(_level))
            }
        }

        const addLevelingLevel = (userId, amount) => {
            let position = false
            Object.keys(_level).forEach((i) => {
                if (_level[i].id === userId) {
                    position = i
                }
            })
            if (position !== false) {
                _level[position].level += amount
                fs.writeFileSync('./lib/database/level.json', JSON.stringify(_level))
            }
        }

        const addLevelingId = (userId) => {
            const obj = {id: userId, xp: 1, level: 1}
            _level.push(obj)
            fs.writeFileSync('./lib/database/level.json', JSON.stringify(_level))
        }
        
   
        const checkATMuser = (userId) => {
        	let position = false
            Object.keys(uang).forEach((i) => {
                if (uang[i].id === userId) {
                    position = i
                }
            })
            if (position !== false) {
                return uang[position].uang
            }
        }
        
        const bayarLimit = (userId, amount) => {
        	let position = false
            Object.keys(limit).forEach((i) => {
                if (limit[i].id === userId) {
                    position = i
                }
            })
            if (position !== false) {
                limit[position].limit -= amount
                fs.writeFileSync('./lib/database/limit.json', JSON.stringify(limit))
            }
        }
        	
        const confirmATM = (userId, amount) => {
        	let position = false
            Object.keys(uang).forEach((i) => {
                if (uang[i].id === userId) {
                    position = i
                }
            })
            if (position !== false) {
                uang[position].uang -= amount
                fs.writeFileSync('./lib/database/uang.json', JSON.stringify(uang))
            }
        }

        const addKoinUser = (userId, amount) => {
            let position = false
            Object.keys(uang).forEach((i) => {
                if (uang[i].id === userId) {
                    position = i
                }
            })
            if (position !== false) {
                uang[position].uang += amount
                fs.writeFileSync('./lib/database/uang.json', JSON.stringify(uang))
            }
        }
         
         const addATM = (userId) => {
        	const obj = {id: userId, uang : 0}
            uang.push(obj)
            fs.writeFileSync('./lib/database/uang.json', JSON.stringify(uang))
        }
        
   
         const limitAdd = (userId) => {
             let position = false
            Object.keys(limit).forEach((i) => {
                if (limit[i].id == userId) {
                    position = i
                }
            })
            if (position !== false) {
                limit[position].limit += 1
                fs.writeFileSync('./lib/database/limit.json', JSON.stringify(limit))
            }
        }
        
  
module.exports = tobz = async (tobz, message) => {
    try {
        const { type, id, from, t, sender, isGroupMsg, chat, chatId, caption, isMedia, mimetype, quotedMsg, quotedMsgObj, author, mentionedJidList } = message
        let { body } = message
        const { name, formattedTitle } = chat
        let { pushname, verifiedName } = sender
        pushname = pushname || verifiedName
        const commands = caption || body || ''
        const chats = (type === 'chat') ? body : (type === 'image' || type === 'video') ? caption : ''
        const argx = commands.toLowerCase()
        const args =  commands.split(' ')
        const command = commands.toLowerCase().split(' ')[0] || ''

        global.prefix
        
        const time = moment(t * 1000).format('DD/MM HH:mm:ss')
        const botNumber = await tobz.getHostNumber() + '@c.us'
        const blockNumber = await tobz.getBlockedIds()
        const groupId = isGroupMsg ? chat.groupMetadata.id : ''
        const groupMembers = isGroupMsg ? await tobz.getGroupMembersId(groupId) : ''
        const groupAdmins = isGroupMsg ? await tobz.getGroupAdmins(groupId) : ''
        const isGroupAdmins = isGroupMsg ? groupAdmins.includes(sender.id) : false
        const isBotGroupAdmins = isGroupMsg ? groupAdmins.includes(botNumber) : false
        const SN = GenerateSerialNumber("000000000000000000000000")

        const isEventon = isGroupMsg ? event.includes(from) : false
        const isBanned = banned.includes(sender.id)
        const isBlocked = blockNumber.includes(sender.id)
        const isNsfw = isGroupMsg ? nsfw_.includes(chat.id) : false
        const isSimi = isGroupMsg ? simi_.includes(chat.id) : false
        const uaOverride = 'WhatsApp/2.2029.4 Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36'
        const isUrl = new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/gi)
        const url = args.length !== 0 ? args[0] : ''

        const isQuotedImage = quotedMsg && quotedMsg.type === 'image'
        const isQuotedVideo = quotedMsg && quotedMsg.type === 'video'
        const isQuotedAudio = quotedMsg && (quotedMsg.type === 'audio' || quotedMsg.type === 'ptt' || quotedMsg.type === 'ppt')
        const isQuotedFile = quotedMsg && quotedMsg.type === 'document'

	const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product } = message

	const inArray = (needle, haystack) => {
        let length = haystack.length;
        for(let i = 0; i < length; i++) {
        if(haystack[i].id == needle) return i;
        }
        return false;
        }

        const isPremium = prem.includes(sender.id)
        const isPublic = isGroupMsg ? public.includes(chatId) : false
        const isSound = isGroupMsg ? sound.includes(chatId) : false
	const isLevelingOn = isGroupMsg ? leveling.includes(groupId) : false
        const isBadword = badword.includes(chatId)
        body = (type === 'chat' && body.startsWith(prefix)) ? body : (((type === 'image' || type === 'video') && caption) && caption.startsWith(prefix)) ? caption : ''
        const arg = body.substring(body.indexOf(' ') + 1)
        const isKasar = await cariKasar(chats)
        const GroupLinkDetector = antilink.includes(chatId)
        const AntiStickerSpam = antisticker.includes(chatId)
        const isPrivate = sender.id === chat.contact.id
        const stickermsg = message.type === 'sticker'
        const isCmd = command.startsWith(prefix)
	const tescuk = "0@c.us"

	const reply = (teks) => {
	tobz.sendText(from, teks, text, {quoted:mek})
	}
        const costum = (pesan, tipe, target, target2) => {
	tobz.sendText(from, pesan, tipe, {quoted: { key: { fromMe: false, participant: `${target}`, ...(from ? { remoteJid: from } : {}) }, message: { conversation: `${target2}` }}})
	}
	const mentions = (teks, memberr, id) => {
	(id == null || id == undefined || id == false) ? tobz.sendText(from, teks.trim(), extendedText, {contextInfo: {"mentionedJid": memberr}}) : tobz.sendText(from, teks.trim(), extendedText, {quoted: mek, contextInfo: {"mentionedJid": memberr}})
	}

        const tms = (Date.now() / 1000) - (timeStart);
        const cts = waktu(tms)

        const serial = sender.id
        const isAdmin = adminNumber.includes(sender.id)
        const ownerNumber = ["6289675134806@c.us","6281262180737@c.us"]
        const isOwner = ownerNumber.includes(sender.id)
        const ownNumber = '6289675134806@c.us'
        const owrNumber = '6281262180737@c.us'

        if (isGroupMsg && GroupLinkDetector && !isGroupAdmins && !isAdmin && !isOwner){
            if (chats.match(/(https:\/\/chat.whatsapp.com)/gi)) {
                const check = await tobz.inviteInfo(chats);
                if (!check) {
                    return
                } else {
                    tobz.reply(from, `*「 GROUP LINK DETECTOR 」*\nKamu mengirimkan link grup chat, maaf kamu di kick dari grup :(`, id).then(() => {
                        tobz.removeParticipant(groupId, sender.id)
                    })
                }
            }
        }
          if (chats.match("alhamdullilah") || chats.match("baik")) {
                                tobz.reply(from, `alhamdulillah`, id)
                  }
          if (chats.match("assalamu'alaikum") || chats.match("assalamualaikum") || chats.match("assalamualaikumm") || chats.match("assalamualaikum")) {
                                tobz.reply(from, `alhamdulillah`, id)
                  }
          if (chats.match("bot") || chats.match("botnya")) {
                                tobz.reply(from, `*opo..?*\n\n`, id)
                  }
           if (chats.match("ajg") || chats.match("babi") || chats.match("jancuk") || chats.match("anying") || chats.match("njim") || chats.match("jancuk") || chats.match("bgst") || chats.match("bjir") || chats.match("bgsd") || chats.match("bangsad") || chats.match("njer") || chats.match("njir") || chats.match("jembod") || chats.match("amjink") || chats.match("asw") || chats.match("fuck") || chats.match("fck") || chats.match("bitch")) {
                        if (!isGroupAdmins) {
                            return tobz.reply(from, `❎ *「 Warning 」* ❎\n❗ Toxic detected ❗\n\nMessage : ~*${chats}*~\nTo : *${pushname}*\n\n*[ ! ]* Hindari penggunaan kata toxic\n`, id)
                            }
                     }
          if (chats.match("sv") || chats.match("save") || chats.match("sve")) {
                                tobz.reply(from, `Sv ae kak, Aku Andhini Karisma Putri celuk wae Dhini`, id)
                  }
          if (chats.match("Andin") || chats.match("dhini") || chats.match("Dhin")) {
                                tobz.reply(from, `Nggeh, ${pushname}`, id)
                  }
	 //Filter Banned People
        if (isBanned) {
            return console.log(color('[BAN]', 'red'), color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname))
        }
        // [BETA] Avoid Spam Message
        //if (isCmd && isFiltered(from) && !isGroupMsg) { return console.log(color('[SPAM]', 'red'), color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname)) }
        //if (isCmd && isFiltered(from) && isGroupMsg) { return console.log(color('[SPAM]', 'red'), color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname), 'in', color(name || formattedTitle)) }
         // AKTIFKAN APABILA TIDAK INGIN TERKENA SPAM!!
        addFilter(from)
        if (isCmd && !isGroupMsg) {console.log(color('[EXEC]', 'blue'), color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname))}
        if (!isCmd && !isGroupMsg) {console.log(color('[REXEC]', 'red'), color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname))}        
        if (isCmd && isGroupMsg) {console.log(color('[EXEC]', 'blue'), color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname,'cyan'), 'in', color(name || formattedTitle))}
        // FUNCTION
        function waktu(seconds) { // TOBZ
            seconds = Number(seconds);
            var d = Math.floor(seconds / (3600 * 24));
            var h = Math.floor(seconds % (3600 * 24) / 3600);
            var m = Math.floor(seconds % 3600 / 60);
            var s = Math.floor(seconds % 60);
            var dDisplay = d > 0 ? d + (d == 1 ? " Hari,":" Hari,") : "";
            var hDisplay = h > 0 ? h + (h == 1 ? " Jam,":" Jam,") : "";
            var mDisplay = m > 0 ? m + (m == 1 ? " Menit,":" Menit,") : "";
            var sDisplay = s > 0 ? s + (s == 1 ? " Detik,":" Detik") : "";
            return dDisplay + hDisplay + mDisplay + sDisplay;
        }
        // Serial Number Generator
        function GenerateRandomNumber(min,max){
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        // Generates a random alphanumberic character
        function GenerateRandomChar() {
            var chars = "1234567890ABCDEFGIJKLMNOPQRSTUVWXYZ";
            var randomNumber = GenerateRandomNumber(0,chars.length - 1);
            return chars[randomNumber];
        }
        // Generates a Serial Number, based on a certain mask
        function GenerateSerialNumber(mask){
            var serialNumber = "";
            if(mask != null){
                for(var i=0; i < mask.length; i++){
                    var maskChar = mask[i];
                    serialNumber += maskChar == "0" ? GenerateRandomChar() : maskChar;
                }
            }
            return serialNumber;
        }
        
        var nmr = sender.id
        var obj = pendaftar.some((val) => {
            return val.id === nmr
        })
        var cekage = pendaftar.some((val) => {
            return val.id === nmr && val.umur >= 12
        })

        function monospace(string) {
            return '```' + string + '```'
        }


        function isReg(obj){
            if (obj === true){
                return false
            } else {     
                return tobz.reply(from, `❌ *Error*\n──「 URUNG DAFTAR 」──\nSorry, Kak Koe urung Terdaftar kanggo Kancane Dhini Daftar Dinggo Kanca Mbek Adhini bot dengan cara, \n\nCommand : ${prefix}reg |nama|umur\nContoh : ${prefix}reg |${pushname}|17\n\n──「 *ANDHINI BOT* 」──`, id) //if user is not registered
            }
        }

        function cekumur(obj){
            if (obj === true){
                return false
            } else {
                return tobz.reply(from, `Kamu belum cukup umur untuk menggunakan Emeilia, min 14 tahun\n\nKamu bisa mendaftar ulang dengan cara donasi terlebih dahulu, bales ${prefix}donasi\nHubungi Owner : wa.me/6289675134806`, id) //if user is not registered
            }
        }

        const apakah = [
       'Ya',
       'Tidak',
      'Bisa Jadi',
      'Coba tanyakan lagi',
      'Mungkin',
      '🤐'
            ]

        const bisakah = [
      'Bisa',
      'Tidak bisa',
      'Sangat di anjurkan',
      'Coba tanyakan lagi',
      'Tidak',
      'Mungkin',
      'Jangan',
      '🤐'
            ]

        const kapankah = [
      '1 Hari lagi',
      '2 hari lagi',
      '3 hari lagi',
      '4 hari lagi',
      '5 hari lagi',
      '6 hari lagi',
      '1 minggu lagi',
      '2 minggu lagi',
      '3 minggu lagi',
      '1 bulan lagi',
      '2 bulan lagi',
      '3 hari lagi',
      '4 bulan lagi',
      '5 bulan lagi',
      '6 hari lagi',
      '7 bulan lagi',
      '8 bulan lagi',
      '9 hari lagi',
      '10 bulan lagi',
      '11 bulan lagi',
      '1 tahun lagi',
      '2 tahun lagi',
      '3 tahun lagi',
      '4 tahun lagi',
      'Tidak akan',
      'Yakin bakal terjadi ?',
      'Aku meragukan nya',
      'Lusa',
      'Akhir bulan depan',
      'Awal bulan depan',
      'Tahun depan',
      'Bulan depan',
      'Sebentar lagi',
      '🤐'
            ]

        const rate = [
            '100%',
            '95%',
            '90%',
            '85%',
            '80%',
            '75%',
            '70%',
            '65%',
            '60%',
            '55%',
            '50%',
            '45%',
            '40%',
            '35%',
            '30%',
            '25%',
            '20%',
            '15%',
            '10%',
            '5%'
            ]
            const addafk = (nom, time, alasan) => {
                let obj = {id: `${nom}`, time: `${time}`, alasan: `${alasan}`}
                afk.push(obj)
                fs.writeFileSync('./lib/database/afk.json', JSON.stringify(afk))
              
            }
            
            const getafk = (nom) => {
                let isafk = false
                Object.keys(afk).forEach((i) => {
                    if (afk[i].id === nom) {
                        isafk = true
                    }
                })
                return isafk
            }
            if (isGroupMsg) {
                const checking = getafk(sender.id)
                const jirafk = JSON.parse(fs.readFileSync('./lib/database/afk.json'))
            
                for (let ment of mentionedJidList) {
            
                    for(let af of jirafk){
                        if(af.id === ment){
                            let alasan = af.alasan
                            let time = af.time
            
                    if (getafk(ment)) {
                        await tobz.sendTextWithMentions(from, `◩ @${af.id.replace(/[@c.us]/g, '')} *Sedang AFK* \n┃❦︎┃ *Alasan :*  ${alasan}\n└─ ☢︎︎   *Dari :*  ${time}`, id)
                    }
                }}
            }
                if (checking) {
                    afk.splice(sender.id, 1)
                    fs.writeFileSync('./lib/database/afk.json', JSON.stringify(afk))
                    await tobz.sendTextWithMentions(from, `@${sender.id.replace(/[@c.us]/g, '')} Sudah tidak afk`, id)
                }
            }
            const isafkOn = getafk(sender.id) 
		const sotoy = [
		'🍊 : 🍒 : 🍐',
		'🍒 : 🔔 : 🍊',
		'🍇 : 🍒 : 🍐',
		'🍊 : 🍋 : 🔔',//by Fadhlur Owner of NotBot
		'🔔 : 🍒 : 🍐',
		'🔔 : 🍒 : 🍊',
                '🍊 : 🍋 : 🔔',		
		'🍐 : 🍒 : 🍋',
		'🍐 : 🍐 : 🍐',
		'🍊 : 🍒 : 🍒',
		'🔔 : 🔔 : 🍇',
		'🍌 : 🍒 : 🔔',
		'🍐 : 🔔 : 🔔',
		'🍊 : 🍋 : 🍒',
		'🍋 : 🍋 : 🍌',
		'🔔 : 🔔 : 🍇',
		'🔔 : 🍐 : 🍇',
		'🔔 : 🔔 : 🔔',
		'🍒 : 🍒 : 🍒',
		'🍌 : 🍌 : 🍌'
		]

        const mess = {
	    public: 'ᴍᴀᴀꜰ ʙᴏᴛ ꜱᴇᴋᴀʀᴀɴɢ ꜱᴜᴅᴀʜ ᴅɪᴩʀɪᴠᴀᴛᴇ ᴏʟᴇʜ ᴏᴡɴᴇʀ\n\n*info selengkapnya hubungi Owner :*\n*wa.me/6289675134806* ',
            wait: '[⏳] Sek yo lagi diproses.. , tinggal ngopi yo oleh..',
            magernulissatu: 'Harap Tunggu, BOT Sedang Menulis Di Buku 1!',
	    levelon: '[ON] *Leveling Telah aktif Ayo Kak Naikan Lvl Mu dengan Cara Aktif di grup ini*',
	    leveloff: '[OFF]  *Yah Leveling Telah Di NonAktifkan T_T*',
	    levelnoton: '[😢] *leveling Belum aktif Kak Chat Owner Untuk Mengaktifkanya Ketik !owner*',
	    levelnol: '*LEVEL KAKAK KOK MASIH* 0 >_<',
            error: {
                St: '[❗] Kirim gambar dengan caption *!sticker* atau tag gambar yang sudah dikirim',
                Ti: '[❗] Replay sticker dengan caption *!toimg* atau tag sticker yang sudah dikirim',
                Qm: '[❗] Terjadi kesalahan, mungkin themenya tidak tersedia!',
                Yt3: '[❗] Terjadi kesalahan, tidak dapat meng konversi ke mp3!',
                Yt4: '[❗] Terjadi kesalahan, mungkin error di sebabkan oleh sistem.',
                Ig: '[❗] Terjadi kesalahan, mungkin karena akunnya private',
                Ki: '[❗] Bot tidak bisa mengeluarkan Admin group!',
                Sp: '[❗] Bot tidak bisa mengeluarkan Admin',
                Ow: '[❗] Bot tidak bisa mengeluarkan Owner',
                Bk: '[❗] Bot tidak bisa memblockir Owner',
                Ad: '[❗] Tidak dapat menambahkan target, mungkin karena di private',
                Iv: '[❗] Link yang anda kirim tidak valid!'
            }
        }

        const tutor = 'https://i.ibb.co/HGCGzCX/Screenshot-2021-01-27-16-47-56-507-com-fmwhatsapp.jpg'
        const errorurl = 'https://steamuserimages-a.akamaihd.net/ugc/954087817129084207/5B7E46EE484181A676C02DFCAD48ECB1C74BC423/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false'
        const errorurl2 = 'https://steamuserimages-a.akamaihd.net/ugc/954087817129084207/5B7E46EE484181A676C02DFCAD48ECB1C74BC423/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false'
       
        const isMuted = (chatId) => {
          if(muted.includes(chatId)){
            return false
        }else{
            return true
            }
        }

        function banChat () {
            if(banChats == true) {
            return false
        }else{
            return true
            }
        }
        

       const levelRole = getLevelingLevel(sender.id)
        var role = 'Warrior'
        if (levelRole <= 1) {
            role = 'Warrior'
        } else if (levelRole <= 5) {
            role = 'Elite'
        } else if (levelRole <= 10) {
            role = 'Master'
        } else if (levelRole <= 15) {
            role = 'Grand Master'
        } else if (levelRole <= 20) {
            role = 'Epic'
        } else if (levelRole <= 25) {
            role = 'Legend'
        } else if (levelRole <= 30) {
            role = 'Mitych'
        } else if (levelRole <= 40) {
            role = 'Mitychal Glory  👑'
        }


       //function leveling
            if (isGroupMsg && isLevelingOn) {
            const currentLevel = getLevelingLevel(sender.id)
            const checkId = getLevelingId(sender.id)
            try {
                if (currentLevel === undefined && checkId === undefined) addLevelingId(sender.id)
                const amountXp = Math.floor(Math.random() * 10) + 340
                const requiredXp = 5000 * (Math.pow(2, currentLevel) - 1)
                const getLevel = getLevelingLevel(sender.id)
                addLevelingXp(sender.id, amountXp)
                if (requiredXp <= getLevelingXp(sender.id)) {
                    addLevelingLevel(sender.id, 1)
                    bayarLimit(sender.id, 3)
                    await tobz.reply(from, `*「 LEVEL UP 」*\n\n➸ *Name*: ${sender.id}\n➸ *XP*: ${getLevelingXp(sender.id)}\n➸ *Level*: ${getLevel} -> ${getLevelingLevel(sender.id)}\n\nCongrats!! 🎉🎉`, id)
                }
            } catch (err) {
                console.error(err)
            }
        }
     
              //function balance
            const checkATM = checkATMuser(sender.id)
            try {
                if (checkATM === undefined) addATM(sender.id)
                const uangsaku = Math.floor(Math.random() * 10) + 12
                addKoinUser(sender.id, uangsaku)
            } catch (err) {
                console.error(err)
            }
       
       
        // FUNCTION
	// https://github.com/Gimenz/Mg-v2-WhatsApp-BOT/blob/803c5a0dc89e2a9e7bb118d1a8872fecd97d397e/msg/index.js#L76
        function isStickerMsg(id){
            if (isOwner, isAdmin) {return false;}
            let found = false;
            for (let i of stickerspam){
                if(i.id === id){
                    if (i.msg >= 70) {
                        found === true 
                        tobz.reply(from, '*「 𝗔𝗡𝗧𝗜 𝗦𝗣𝗔𝗠 𝗦𝗧𝗜𝗖𝗞𝗘𝗥 」*\nKamu telah SPAM STICKER di grup, kamu akan di kick otomatis oleh Emeilia', message.id).then(() => {
                            tobz.removeParticipant(groupId, id)
                        }).then(() => {
                            const cus = id
                            var found = false
                            Object.keys(stickerspam).forEach((i) => {
                                if(stickerspam[i].id == cus){
                                    found = i
                                }
                            })
                            if (found !== false) {
                                stickerspam[found].msg = 1;
                                const resultx = '✅ Database telah direset!'
                                console.log(stickerspam[found])
                                fs.writeFileSync('./lib/database/stickerspam.json',JSON.stringify(stickerspam));
                                tobz.sendText(from, resultx)
                            } else {
                                    tobz.reply(from, `Nomor itu tidak terdaftar didalam database!`, id)
                            }
                        })
                        return true;
                    }else{
                        found === true
                        return false;
                    }   
                }
            }
            if (found === false){
                let obj = {id: `${id}`, msg:1};
                stickerspam.push(obj);
                fs.writeFileSync('./lib/database/stickerspam.json',JSON.stringify(stickerspam));
                return false;
            }  
        }
        function addStickerCount(id){
            if (isOwner, isAdmin) {return;}
            var found = false
            Object.keys(stickerspam).forEach((i) => {
                if(stickerspam[i].id == id){
                    found = i
                }
            })
            if (found !== false) {
                stickerspam[found].msg += 1;
                fs.writeFileSync('./lib/database/stickerspam.json',JSON.stringify(stickerspam));
            }
        }

        function isBadwordMsg(id){
            if (isOwner, isAdmin) {return false;}
            let kasar = false;
            for (let i of msgBadword){
                if(i.id === id){
                    let msg = i.msg
                    if (msg >= 3) { //
                        kasar === true 
                        tobz.reply(from, '*「 𝗔𝗡𝗧𝗜 𝗕𝗔𝗗𝗪𝗢𝗥𝗗 」*\nKamu telah berkata kasar di grup ini, kamu akan di kick otomatis oleh Emeilia!', message.id).then(() => {
                            tobz.removeParticipant(groupId, id)
                        }).then(() => {
                            const cus = id
                            var found = false
                            Object.keys(msgBadword).forEach((i) => {
                                if(msgBadword[i].id == cus){
                                    found = i
                                }
                            })
                            if (found !== false) {
                                msgBadword[found].msg = 1;
                                const resultv = 'Database telah direset'
                                console.log(msgBadword[found])
                                fs.writeFileSync('./lib/database/msgBadword.json',JSON.stringify(msgBadword));
                                tobz.sendText(from, resultv)
                            } else {
                                    tobz.reply(from, `Nomor itu tidak terdaftar didalam database!`, id)
                            }
                        })
                        return true;
                    }else{
                        kasar === true
                        return false;
                    }   
                }
            }
            if (kasar === false){
                let obj = {id: `${id}`, msg:1};
                msgBadword.push(obj);
                fs.writeFileSync('./lib/database/msgBadword.json',JSON.stringify(msgBadword));
                return false;
            }  
        }
        function addBadCount(id){
            if (isOwner, isAdmin) {return;}
            var kasar = false
            Object.keys(msgBadword).forEach((i) => {
                if(msgBadword[i].id == id){
                    kasar = i
                }
            })
            if (kasar !== false) {
                msgBadword[kasar].msg += 1;
                fs.writeFileSync('./lib/database/msgBadword.json',JSON.stringify(msgBadword));
            }
        }
	// https://github.com/ItzNgga/wa-bot.js/blob/d58ddcf4e27b93535dd806e4a07a6ef2fb52463d/index.js#L204
        function isMsgLimit(id){
                    if (isAdmin) {return false;}
                    let found = false;
                    for (let i of msgLimit){
                        if(i.id === id){
                            if (i.msg >= 5) {
                                found === true 
                                tobz.reply(from, `*「 𝗔𝗡𝗧𝗜 𝗦𝗣𝗔𝗠 」*\nMaaf, akun anda kami blok karena SPAM, dan tidak bisa di UNBLOK!`, id)
                                tobz.contactBlock(id)
                                banned.push(id)
                                fs.writeFileSync('./lib/database/banned.json', JSON.stringify(banned))
                                return true;
                            }else if(i.msg >= 3){
                                found === true
                                tobz.reply(from, `*「 𝗔𝗡𝗧𝗜 𝗦𝗣𝗔𝗠 」*\nNomor anda terdeteksi spam!\nMohon tidak spam 3 pesan lagi atau nomor anda AUTO BLOK!`, id)
                                return true
                            }else{
                                found === true
                                return false;
                            }   
                        }
                    }
                    if (found === false){
                        let obj = {id: `${id}`, msg:1};
                        msgLimit.push(obj);
                        fs.writeFileSync('./lib/database/msgLimit.json',JSON.stringify(msgLimit));
                        return false;
                    }  
                }
        function addMsgLimit(id){
                    if (isAdmin) {return;}
                    var found = false
                    Object.keys(msgLimit).forEach((i) => {
                        if(msgLimit[i].id == id){
                            found = i
                        }
                    })
                    if (found !== false) {
                        msgLimit[found].msg += 1;
                        fs.writeFileSync('./lib/database/msgLimit.json',JSON.stringify(msgLimit));
                    }
                }
        function isLimit(id){
                    if (isAdmin) {return false;}
                    let found = false;
                    for (let i of limit){
                        if(i.id === id){
                            let limits = i.limit;
                            if (limits >= limitCount) {
                                found = true;
                                tobz.reply(from, `Perintah BOT anda sudah mencapai batas, untuk mendapatkan limit. bisa lewat naik level atau buylimit`, id)
                                return true;
                            }else{
                                limit
                                found = true;
                                return false;
                            }
                        }
                    }
                    if (found === false){
                        let obj = {id: `${id}`, limit:1};
                        limit.push(obj);
                        fs.writeFileSync('./lib/database/limit.json',JSON.stringify(limit));
                        return false;
                    }  
                }
        function limitAdd (id) {
                    if (isPremium) {return;}
                    var found = false;
                    Object.keys(limit).forEach((i) => {
                        if(limit[i].id == id){
                            found = i
                        }
                    })
                    if (found !== false) {
                        limit[found].limit += 1;
                        fs.writeFileSync('./lib/database/limit.json',JSON.stringify(limit));
                    }
                }
   
        function convertToRupiah(angka)
        {
            var rupiah = '';		
            var angkarev = angka.toString().split('').reverse().join('');
            for(var i = 0; i < angkarev.length; i++) if(i%3 == 0) rupiah += angkarev.substr(i,3)+'.';
            return 'Rp. '+rupiah.split('',rupiah.length-1).reverse().join('');
        }

                // END HELPER FUNCTION
        // FUNCTION DAFTAR! NEXT UPDATE
        function monospace(string) {
            return '```' + string + '```'
        }
    
        // Serial Number Generator
        function GenerateRandomNumber(min,max){
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        // Generates a random alphanumberic character
        function GenerateRandomChar() {
            var chars = "1234567890ABCDEFGIJKLMNOPQRSTUVWXYZ";
            var randomNumber = GenerateRandomNumber(0,chars.length - 1);
            return chars[randomNumber];
        }
        // Generates a Serial Number, based on a certain mask
        function GenerateSerialNumber(mask){
            var serialNumber = "";
            if(mask != null){
                for(var i=0; i < mask.length; i++){
                    var maskChar = mask[i];
                    serialNumber += maskChar == "0" ? GenerateRandomChar() : maskChar;
                }
            }
            return serialNumber;
        }
	    
	if (isGroupMsg && AntiStickerSpam && !isGroupAdmins && !isAdmin && !isOwner){
            if(stickermsg === true){
                if(isStickerMsg(serial)) return
                addStickerCount(serial)
            }
        }

        if(!isCmd && isKasar && isGroupMsg && isBadword && !isGroupAdmins) { 
            console.log(color('[BADWORD]', 'red'), color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`${argx}`), 'from', color(pushname), 'in', color(name || formattedTitle)) 
            if(isBadwordMsg(serial)) return
                addBadCount(serial)
        }
        
                if(body === '!mute' && isMuted(chatId) == true){
                    if(isGroupMsg) {
                        if (!isAdmin) return tobz.reply(from, 'Maaf, perintah ini hanya dapat dilakukan oleh admin Emeilia!', id)
                        if(isMsgLimit(serial)){
                            return
                        }else{
                            addMsgLimit(serial)
                        }
                        muted.push(chatId)
                        fs.writeFileSync('./lib/database/muted.json', JSON.stringify(muted, null, 2))
                        tobz.reply(from, 'Bot telah di mute pada chat ini! !unmute untuk unmute!', id)
                    }else{
                        if(isMsgLimit(serial)){
                            return
                        }else{
                            addMsgLimit(serial)
                        }
                        muted.push(chatId)
                        fs.writeFileSync('./lib/database/muted.json', JSON.stringify(muted, null, 2))
                        reply(from, 'Bot telah di mute pada chat ini! !unmute untuk unmute!', id)
                    }
                }
                if(body === '!unmute' && isMuted(chatId) == false){
                    if(isGroupMsg) {
                        if (!isAdmin) return tobz.reply(from, 'Maaf, perintah ini hanya dapat dilakukan oleh admin Emeilia!', id)
                        if(isMsgLimit(serial)){
                            return
                        }else{
                            addMsgLimit(serial)
                        }
                        let index = muted.indexOf(chatId);
                        muted.splice(index,1)
                        fs.writeFileSync('./lib/database/muted.json', JSON.stringify(muted, null, 2))
                        tobz.reply(from, 'Bot telah di unmute!', id)         
                    }else{
                        if(isMsgLimit(serial)){
                            return
                        }else{
                            addMsgLimit(serial)
                        }
                        let index = muted.indexOf(chatId);
                        muted.splice(index,1)
                        fs.writeFileSync('./lib/database/muted.json', JSON.stringify(muted, null, 2))
                        tobz.reply(from, 'Bot telah di unmute!', id)                   
                    }
                }
                if (body === '!unbanchat') {
                    if (!isOwner) return tobz.reply(from, 'Maaf, perintah ini hanya dapat dilakukan oleh Owner Emeilia!', id)
                    if(setting.banChats === false) return
                    setting.banChats = false
                    banChats = false
                    fs.writeFileSync('./lib/database/setting.json', JSON.stringify(setting, null, 2))
                    tobz.reply('Global chat has been disable!', id)
                }
        if (isMuted(chatId) && banChat() && !isBlocked && !isBanned || isOwner ) {
        switch(command) {

        case prefix+'banchat':
            if (setting.banChats === true) return
            if (!isOwner) return tobz.reply(from, 'Perintah ini hanya bisa di gunakan oleh Owner Emeilia!', id)
            setting.banChats = true
            banChats = true
            fs.writeFileSync('./lib/database/setting.json', JSON.stringify(setting, null, 2))
            tobz.reply('Global chat has been enable!', id)
            break

        case prefix+'unmute':
            console.log(`Unmuted ${name}!`)
            await tobz.sendSeen(from)
            break
        case prefix+'unbanchat':
            console.log(`Banchat ${name}!`)
            await tobz.sendSeen(from)
            break
        case prefix+'cekprem':
                    var cek = sender.id
                    idx = prem.findIndex(x => x === cek);
                    //console.log(prem[idx])
                    const dt = (prem[idx])
                    if(dt === undefined){
                        return tobz.reply(from, 'Kamu belum terdaftar sebagai member premium :(\n\nuntuk menjadi member premium, kamu bisa donasi seikhlasnya terlebih dahulu, kirim !donasi untuk melihat info donasi', id) //if user is not registered
                    } else {
                        tobz.reply(from, `──「 *PREMIUM CHECK* 」──\n\n『 *𝐕𝐈𝐏 𝐔𝐒𝐄𝐑* 』\nNo Wa Kamu : *${dt.replace('@c.us', '')}* ada di database, dan kamu sudah terdaftar member premium :)\n\nTerima kasih sudah donasi, semoga dengan adanya bot ini bisa membantu :)\n\n──「 *EMEILIA BOT* 」──`, id)
                    }
                    break
        case prefix+'sticker':
        case prefix+'stiker':
        case prefix+'s':
        //if (!isPublic) return tobz.reply(from, mess.public, id)   
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (isMedia && type === 'image') {
                const mediaData = await decryptMedia(message, uaOverride)
                const imageBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`
                await tobz.sendImageAsSticker(from, imageBase64)
                tobz.reply(from, `Iki sticker e Kak ${pushname}!`, id)
            } else if (quotedMsg && quotedMsg.type == 'image') {
                const mediaData = await decryptMedia(quotedMsg, uaOverride)
                const imageBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
                await tobz.sendImageAsSticker(from, imageBase64)
                tobz.reply(from, `Iki sticker e Kak ${pushname}!`, id)
            } else if (args.length === 2) {
                const url = args[1]
                if (url.match(isUrl)) {
                    await tobz.sendStickerfromUrl(from, url, { method: 'get' })
                        .catch(err => console.log('Caught exception: ', err))
                } else {
                    tobz.reply(from, mess.error.Iv, id)
                }
            } else {
                    tobz.reply(from, mess.error.St, id)
            }
            break
            case prefix+'afk':{
                if(isReg(obj)) return
                if (!isGroupMsg) return tobz.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)

                    const nom = sender.id
                    const alasan = body.slice(5)
                    addafk(nom, time, alasan)
                    var ceki = nom
                    if(ceki){
                    var obj = afk.some((val) => {
                    return val.id === ceki
                    })
                    if (obj === true){
                    var found = false
                    Object.keys(afk).forEach((i) => {
                    if(afk[i].id == nom){
                    found = i
                    }
                    })
                    if (found !== false) {
                    afk[found].alasan = alasan;
                    const updated = afk[found]
                    const result = (`@${nom.replace(/[@c.us]/g, '')} Sekarang AFK!`)
                    console.log(afk[found])
                   fs.writeFileSync('./lib/database/afk.json',JSON.stringify(afk));
                   tobz.sendTextWithMentions(from, result)
            }
            } else {
            afk.push(afek)
            fs.writeFileSync('./lib/database/afk.json', JSON.stringify(afk))
                tobz.sendTextWithMentions(from, `@${nom.replace(/[@c.us]/g, '')} Sekarang AFK`)
            }
            }}
            break
        case prefix+'ttp':
        //if (!isPublic) return tobz.reply(from, mess.public, id)   
                if(isReg(obj)) return
                if(cekumur(cekage)) return
                if (!isGroupMsg) return tobz.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', message.id)
                try
                {
                    const string = body.toLowerCase().includes('!ttp') ? body.slice(5) : body.slice(5)
                    if(args)
                    {
                        if(quotedMsgObj == null)
                        {
                            const gasMake = await getStickerMaker(string)
                            if(gasMake.status == true)
                            {
                                try{
                                    await tobz.sendImageAsSticker(from, gasMake.base64)
                                    tobz.reply(from, `Ini stickernya Kak ${pushname}!`, id)
                                }catch(err) {
                                    await tobz.reply(from, 'Gagal membuat.', id)
                                } 
                            }else{
                                await tobz.reply(from, gasMake.reason, id)
                            }
                        }else if(quotedMsgObj != null){
                            const gasMake = await getStickerMaker(quotedMsgObj.body)
                            if(gasMake.status == true)
                            {
                                try{
                                    await tobz.sendImageAsSticker(from, gasMake.base64)
                                    tobz.reply(from, `Ini stickernya Kak ${pushname}!`, id)
                                }catch(err) {
                                    await tobz.reply(from, 'Gagal membuat.', id)
                                } 
                            }else{
                                await tobz.reply(from, gasMake.reason, id)
                            }
                        }
                       
                    }else{
                        await tobz.reply(from, 'Tidak boleh kosong.', id)
                    }
                }catch(error)
                {
                    console.log(error)
                }
            break;
        case prefix+'ttp2':
        //if (!isPublic) return tobz.reply(from, mess.public, id)  
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (isLimit(serial)) return tobz.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1) return tobz.reply(from, `Kirim perintah *!ttp2 [ Teks ]*, contoh *!ttp2 Emeilia*`, id)
            const ttp2t = body.slice(6)
            const lttp2 = ["Orange","White","Green","Black","Purple","Red","Yellow","Blue","Navy","Grey","Magenta","Brown","Gold"]
            const rttp2 = lttp2[Math.floor(Math.random() * (lttp2.length))]
            await tobz.sendStickerfromUrl(from, `https://api.vhtear.com/textmaker?text=${ttp2t}&warna=${rttp2}&apikey=${vhtearkey}`)
            break
        case prefix+'ttg':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return tobz.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
            if (isLimit(serial)) return tobz.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            try {
                if (quotedMsgObj == null) {
                    if (args.length === 1) return tobz.reply(from, `Kirim perintah *!ttg [ Teks ]*, contoh *!ttg aku bukan boneka*`, id)
                        await tobz.sendStickerfromUrl(from, `https://api.vhtear.com/textxgif?text=${body.slice(5)}&apikey=${vhtearkey}`)
                        limitAdd(serial)
                } else {
                    await tobz.sendStickerfromUrl(from, `https://api.vhtear.com/textxgif?text=${quotedMsgObj}&apikey=${vhtearkey}`)
                    limitAdd(serial)
                }
            } catch(e) {
                console.log(e)
                tobz.reply(from, 'Maaf, Server sedang Error')
            }
            break
        case prefix+'pastebin': //BY VINZ
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (args.length == 1) return tobz.reply(from, `Ketik command ${prefix}pastebin [text]|[nama]\nContoh ${prefix}pastebin ini contohnya|tolll`, id)
            await tobz.reply(from, mess.wait, id)
            var bdtrm = body.slice(10).trim().split('|')
            const pstbn = await axios.get(`https://zeksapi.herokuapp.com/api/pastebin?apikey=benbenz&text=${bdtrm[0]}&name=${bdtrm[1]}`) 
	    console.log(bdtrm[0])
	    if (pstbn.data.status == false) return tobz.reply(from, pstbn.data.message ,id)
            await tobz.reply(from, pstbn.data.result, id) 
            break
        case prefix+'magernulis1': // BY MFARELS
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (args.length === 1) return await tobz.reply(from, 'Kirim perintah *prefix+magernulis1 [teks]*', id)  // BY MFARELS
            const farel = body.slice(13)  // YOUTUBE : MFARELS CH
            await tobz.reply(from, mess.magernulissatu, id)  // INSTAGRAM : @mfarelsyahtiawan
            const zahra = farel.replace(/(\S+\s*){1,10}/g, '$&\n')  // INSTALL IMAGEMAGICK KALO WAU WORK
            const farelzahra = zahra.split('\n').slice(0, 33).join('\n')  // WAKTU INSTALL IMAGEMAGICK CENTANG KOLOM 1,2,3,5,6
            var months = ['- 1 -', '- 2 -', '- 3 -', '- 4 -', '- 5 -', '- 6 -', '- 7 -', '- 8 -', '- 9 -', '- 10 -', '- 11 -', '- 12 -'];
            var myDays = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
            var date = new Date();
            var day = date.getDate();
            var month = date.getMonth();
            var thisDay = date.getDay(),
                thisDay = myDays[thisDay];
            var yy = date.getYear();
            var year = (yy < 1000) ? yy + 1900 : yy;
            const zahrafarel = (day + ' ' + months[month] + ' ' + year)
            const farelllzahraaa = (thisDay)
            spawn('convert', [
                './mager/magernulis/magernulis1.jpg',
                '-font',
                './font/Zahraaa.ttf',
                '-size',
                '700x960',
                '-pointsize',
                '100',
                '-interline-spacing',
                '1',
                '-annotate',
                '+4100+460',
                farelllzahraaa,
                '-font',
                './font/Zahraaa.ttf',
                '-size',
                '700x960',
                '-pointsize',
                '100',
                '-interline-spacing',
                '1',
                '-annotate',
                '+4100+640',
                zahrafarel,
                '-font',
                './font/Zahraaa.ttf',
                '-size',
                '6000x8000',
                '-pointsize',
                '130',
                '-interline-spacing',
                '1',
                '-annotate',
                '+1010+1010',
                farelzahra,
                './mager/magernulis√/magernulis1√.jpg'
            ])
            .on('error', () => tobz.reply(from, 'Error Bjeer', id))
            .on('exit', () => {
                tobz.sendImage(from, './mager/magernulis√/magernulis1√.jpg', 'magernulis.jpg', '*Sukses Nulis DiBuku✓*\n\n*YouTube : MFarelS CH*\n*Instagram : @mfarelsyahtiawan*\n\n*© Powered By MFarelS | RajinNulis-BOT*', id)
            })
            break  // BY MFARELS
        case prefix+'stickertoimg':
        case prefix+'toimg':
        //if (!isPublic) return tobz.reply(from, mess.public, id)   
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (quotedMsg && quotedMsg.type == 'sticker') {
                const mediaData = await decryptMedia(quotedMsg)
                tobz.reply(from, `[⏳] Sek yo lagi diproses.. , tinggal ngopi yo oleh..`, id)
                const imageBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
                await tobz.sendFile(from, imageBase64, 'imagesticker.jpg', `Kui gambar e ${pushname} wes dadi!`, id)
            } else if (!quotedMsg) return tobz.reply(from, `Mohon tag sticker yang ingin dijadikan gambar!`, id)
            break
        case prefix+'stickergif': // INSTALL FFMPEG, IF YOU WANT THIS COMMAND WORK!
        case prefix+'stikergif': // TUTORIAL IN README, PLEASE READ!
        case prefix+'sgif': // MRHRTZ
        if (!isPublic) return tobz.reply(from, mess.public, id)   
            tobz.reply(from, `[⏳] Sek yo lagi diproses.. , tinggal ngopi yo oleh..`, id)
            if (isMedia && type === 'video' || mimetype === 'image/gif') {
                try {
                    const mediaData = await decryptMedia(message, uaOverride)
                    await tobz.sendMp4AsSticker(from, mediaData, {fps: 10, startTime: `00:00:00.0`, endTime : `00:00:05.0`,loop: 0})
                    tobz.reply(from, `Iki sticker gif e Kak ${pushname}!`, id)
                } catch (e) {
                    tobz.reply(from, `Size media terlalu besar! mohon kurangi durasi video.`, id)
                }
            } else if (quotedMsg && quotedMsg.type == 'video' || quotedMsg && quotedMsg.mimetype == 'image/gif') {
                const mediaData = await decryptMedia(quotedMsg, uaOverride)
                await tobz.sendMp4AsSticker(from, mediaData, {fps: 10, startTime: `00:00:00.0`, endTime : `00:00:05.0`,loop: 0})
                                tobz.reply(from, `Iki sticker gif e Kak ${pushname}!`, id)
            } else {
                tobz.reply(from, `Kesalahan ⚠️ Hanya bisa video/gif apabila file media berbentuk gambar ketik !stickergif`, id)
            } 
            break
        case prefix+'stickerlightning':
        case prefix+'slightning':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            tobz.reply(from, `[⏳] Sek yo lagi diproses.. , tinggal ngopi yo oleh..`, id)
            if (isMedia && type === 'image') {
                const mediaData = await decryptMedia(message, uaOverride)
                const getUrle = await uploadImages(mediaData, false)
                const imgnye = await stickerlight(getUrle)
                const Slight = imgnye.result.imgUrl
                await tobz.sendStickerfromUrl(from, Slight)
                tobz.reply(from, `Iki stickere Kak ${pushname}!`, id)
            } else if (quotedMsg && quotedMsg.type == 'image') {
                const mediaData = await decryptMedia(quotedMsg, uaOverride)
                const getUrle = await uploadImages(mediaData, false)
                const imgnye = await stickerlight(getUrle)
                const Slight = imgnye.result.imgUrl
                await tobz.sendStickerfromUrl(from, Slight)
                tobz.reply(from, `Ini stickernya Kak ${pushname}!`, id)
            } else {
                await tobz.reply(from, `Wrong Format!\n⚠️ Harap Kirim Gambar Dengan !stickerlightning`, id)
            }
            break
        case prefix+'stickerfire':
        case prefix+'sfire':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            tobz.reply(from, `[⏳] Sek yo lagi diproses.. , tinggal ngopi yo oleh..`, id)
            if (isMedia && type === 'image') {
                const mediaData = await decryptMedia(message, uaOverride)
                const getUrli = await uploadImages(mediaData, false)
                const imgnya = await stickerburn(getUrli)
                const Sfire = imgnya.result.imgUrl
                await tobz.sendStickerfromUrl(from, Sfire)
            } else if (quotedMsg && quotedMsg.type == 'image') {
                const mediaData = await decryptMedia(quotedMsg, uaOverride)
                const getUrli = await uploadImages(mediaData, false)
                const imgnya = await stickerburn(getUrli)
                const Sfire = imgnya.result.imgUrl
                await tobz.sendStickerfromUrl(from, Sfire)
            } else {
                await tobz.reply(from, `Wrong Format!\n⚠️ Harap Kirim Gambar Dengan !stickerfire`, id)
            }
            break
        case prefix+'lovemessage':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (isLimit(serial)) return tobz.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1) return tobz.reply(from, `Kirim perintah *${prefix}lovemessage [ Teks ]*, contoh *${prefix}lovemessage Tobz*`, id)
            tobz.reply(from, mess.wait, id)
            const lovemsg = body.slice(12)
            if (lovemsg.length > 10) return tobz.reply(from, '*Teks Terlalu Panjang!*\n_Maksimal 10 huruf!_', id)
            await tobz.sendFileFromUrl(from, `https://api.vhtear.com/lovemessagetext?text=${lovemsg}&apikey=${vhtearkey}`, 'lovemsg.jpg', '', id)
            break
        case prefix+'romance':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (isLimit(serial)) return tobz.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1) return tobz.reply(from, `Kirim perintah *${prefix}romance [ Teks ]*, contoh *${prefix}romance Rey*`, id)
            tobz.reply(from, mess.wait, id)
            const rmnc = body.slice(9)
            if (rmnc.length > 10) return tobz.reply(from, '*Teks Terlalu Panjang!*\n_Maksimal 10 huruf!_', id)
            await tobz.sendFileFromUrl(from, `https://api.vhtear.com/romancetext?text=${rmnc}&apikey=${vhtearkey}`, 'romance.jpg', '', id)
            break
        case prefix+'party':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (isLimit(serial)) return tobz.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1) return tobz.reply(from, `Kirim perintah *${prefix}party [ Teks ]*, contoh *${prefix}party Tobz*`, id)
            tobz.reply(from, mess.wait, id)
            const prty = body.slice(7)
            if (prty.length > 10) return tobz.reply(from, '*Teks Terlalu Panjang!*\n_Maksimal 10 huruf!_', id)
            await tobz.sendFileFromUrl(from, `https://api.vhtear.com/partytext?text=${prty}&apikey=${vhtearkey}`, 'party.jpg', '', id)
            break
        case prefix+'silk':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (isLimit(serial)) return tobz.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1) return tobz.reply(from, `Kirim perintah *${prefix}silk [ Teks ]*, contoh *${prefix}silk Tobz*`, id)
            tobz.reply(from, mess.wait, id)
            const slkz = body.slice(5)
            if (slkz.length > 10) return tobz.reply(from, '*Teks Terlalu Panjang!*\n_Maksimal 10 huruf!_', id)
            await tobz.sendFileFromUrl(from, `https://api.vhtear.com/silktext?text=${slkz}&apikey=${vhtearkey}`, 'silk.jpg', '', id)
            break
        case prefix+'blackpink':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (isLimit(serial)) return tobz.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1) return tobz.reply(from, `Kirim perintah *!blackpink [ Teks ]*, contoh *!blackpink Emeilia*`, id)
            tobz.reply(from, mess.wait, id)
            const blpk = body.slice(11)
            if (blpk.length > 10) return tobz.reply(from, '*Teks Terlalu Panjang!*\n_Maksimal 10 huruf!_', id)
            await tobz.sendFileFromUrl(from, `https://api.vhtear.com/blackpinkicon?text=${blpk}&apikey=${vhtearkey}`, 'blackpink.jpg', '', id)
            break
        case prefix+'thunder':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (isLimit(serial)) return tobz.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1) return tobz.reply(from, `Kirim perintah *!thunder [ Teks ]*, contoh *!thunder Tobz*`, id)
            tobz.reply(from, mess.wait, id)
            const thndr = body.slice(9)
            if (thndr.length > 10) return tobz.reply(from, '*Teks Terlalu Panjang!*\n_Maksimal 10 huruf!_', id)
            await tobz.sendFileFromUrl(from, `https://api.vhtear.com/thundertext?text=${thndr}&apikey=${vhtearkey}`, 'thndr.jpg', '', id)
            break
        case prefix+'pornhub':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (isLimit(serial)) return tobz.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1) return tobz.reply(from, `Kirim perintah *!pornhub [ |Teks1|Teks2 ]*, contoh *!pornhub |Rey|Dev Emeilia*`, id)
            argz = body.trim().split('|')
            if (argz.length >= 2) {
                tobz.reply(from, mess.wait, id)
                const lpornhub = argz[1]
                const lpornhub2 = argz[2]
                if (lpornhub.length > 10) return tobz.reply(from, '*Teks1 Terlalu Panjang!*\n_Maksimal 10 huruf!_', id)
                if (lpornhub2.length > 10) return tobz.reply(from, '*Teks2 Terlalu Panjang!*\n_Maksimal 10 huruf!_', id)
                tobz.sendFileFromUrl(from, `https://api.vhtear.com/pornlogo?text1=${lpornhub}&text2=${lpornhub2}&apikey=${vhtearkey}`)
                await limitAdd(serial)
            } else {
                await tobz.reply(from, `Wrong Format!\n[❗] Kirim perintah *!pornhub [ |Teks1|Teks2 ]*, contoh *!pornhub |Rey|Dev Emeilia*`, id)
            }
            break
        case prefix+'glitch':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (isLimit(serial)) return tobz.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1) return tobz.reply(from, `Kirim perintah *!glitch [ |Teks1|Teks2 ]*, contoh *!glitch |Rey|Dev Emeilia*`, id)
            argz = body.trim().split('|')
            if (argz.length >= 2) {
                tobz.reply(from, mess.wait, id)
                const glitch1 = argz[1]
                const glitch2 = argz[2]
                if (glitch1.length > 10) return tobz.reply(from, '*Teks1 Terlalu Panjang!*\n_Maksimal 10 huruf!_', id)
                if (glitch2.length > 15) return tobz.reply(from, '*Teks2 Terlalu Panjang!*\n_Maksimal 15 huruf!_', id)
                tobz.sendFileFromUrl(from, `https://api.vhtear.com/glitchtext?text1=${glitch1}&text2=${glitch2}&apikey=${vhtearkey}`)
                await limitAdd(serial)
            } else {
                await tobz.reply(from, `Wrong Format!\n[❗] Kirim perintah *!glitch [ |Teks1|Teks2 ]*, contoh *!glitch |Rey|Dev Emeilia*`, id)
            }
            break
        case prefix+'daftar':
        case prefix+'reg':  // NAMBAHIN NOMOR DI DATABASE
                argz = body.trim().split('|')
                if (argz.length >= 2) {
                const nonye = sender.id
                const namanye = argz[1]
                const umurnye = argz[2]
                    if(isNaN(umurnye)) return await tobz.reply(from, 'Gagal, Umur harus berupa angka!!', id)
                    if(umurnye >= 40) return await tobz.reply(from, 'Gagal, Kamu terlalu tua, kembali lagi ke masa muda untuk menggunakan Emeilia', id)
                    const jenenge = namanye.replace(' ','')
                    var ceknya = nonye
                        var obj = pendaftar.some((val) => {
                            return val.id === ceknya
                        })
                        if (obj === true){
                            return tobz.reply(from, 'uwes , kamu sudah terdaftar.', id) // BAKAL RESPON JIKA NO UDAH ADA
                        } else {
                            const mentah = await tobz.checkNumberStatus(nonye) // PENDAFTARAN
                            const msg = (`
『 DATA PENDAFTARAN 』
  
Nama : ${jenenge} 
Nomor: @${nonye.replace(/[@c.us]/g, '')}
SN : ${SN}
API  : wa.me/${nonye.replace('@c.us', '')}
Umur : ${umurnye}
Time : ${moment().format('DD/MM/YY HH:mm:ss')}
Limit: 20/day

『 EMEILIA BOT 』

Untuk menggunakan bot silahkan kirim ${prefix}menu
Total Pengguna yang telah terdaftar ${pendaftar.length}
`)
                            const hasil = mentah.canReceiveMessage ? msg : false
                            if (!hasil) return tobz.reply(from, 'Nomor WhatsApp tidak valid [ Tidak terdaftar di WhatsApp ]', id) 
                            {
                            const register = ({
                                id: mentah.id._serialized,
                                nama: jenenge,
                                umur: umurnye
                            })
                            pendaftar.push(register)
                            fs.writeFileSync('./lib/database/user.json', JSON.stringify(pendaftar)) // DATABASE
                                tobz.sendTextWithMentions(from, hasil)
                            }
                        }
                    } else {
                        await tobz.reply(from, `🙊Ups! Salah Atuh Kak\nGini Loh Kakak ku! Cara Daftarnya, \n\nketik : ${prefix}reg |nama|umur\ncontoh : ${prefix}reg |rey|15\n\ncukup gunakan nama depan/panggilan dan umur saja`, id) //if user is not registered
                    }
                break
            case prefix+'goldpb':
                if (args.length == 0) return robz.reply(from, `Bot akan mengirimkan Gold Play Button dengan nama yang kalian custom sendiri\nContoh : ${prefix}goldpb Urbaee`, id)
                const yuza = body.slice(8)
                await axios.get(`https://api.zeks.xyz/api/gplaybutton?text=${yuza}&apikey=benbenz`).then(res => {
                    console.log('Getting Picture');
                    tobz.sendFileFromUrl(from, `${res.data.result}`, 'image.jpg', 'Congratsss for 1 Million Subscribers', id)
                    })
                .catch(() => {
                    tobz.reply(from, 'Error....', id)
                })
                break
            case prefix+'silverpb':
                if (args.length == 0) return tobz.reply(from, `Bot akan mengirimkan Silver Play Button dengan kata yang anda masukkan\nContoh : ${prefix}silverpb Urbaee`, id)
                const yuzu = body.slice(10)
                await axios.get(`https://api.zeks.xyz/api/splaybutton?text=${yuzu}&apikey=benbenz`).then(res => {
                    tobz.sendFileFromUrl(from, `${res.data.result}`, 'image.jpg', 'Congratss!!', id)
                    .catch(() => {
                        tobz.reply(from, 'Error ngab', id)
                    })
                })
                .catch(() => {
                    tobz.reply(from, 'Error ngab...', id)
                })
                break
                case prefix+'unreg':
                let unreg = pendaftar.indexOf(sender.id)
                pendaftar.splice(unreg, 1)
                fs.writeFileSync('./lib/database/user.json', JSON.stringify(pendaftar))
                return await tobz.reply(from, `${pushname} telah logout dari User Emeilia!`, id)
            break
            case prefix+'daftarulang':
            case prefix+'regulang':
                    if (!isAdmin) return tobz.reply(from, 'Gagal, Command ini hanya dapat digunakan oleh admin Emeilia', id)  
                    const nomernya = args[1]
                    let textnya = nomernya.replace(/[-\s+@c.us]/g,'')
                    const cusnya = textnya + '@c.us'
                    const umurnya = args[2]
                    if(umurnya >= 40) return await tobz.reply(from, 'Umur terlalu tua kak, max 40 yaa :D', id)
                        var found = false
                        Object.keys(pendaftar).forEach((i) => {
                            if(pendaftar[i].id == cusnya){
                                found = i
                            }
                        })
                        if (found !== false) {
                            pendaftar[found].umur = umurnya;
                            const updated = pendaftar[found]
                            const result = (`*REGISTRASI ULANG*

Nama : ${updated.nama} 
Nomor: @${updated.id.replace(/[@c.us]/g, '')}
SN : ${SN}
API  : wa.me/${updated.id.replace('@c.us', '')}
Umur : ${updated.umur}
Time : ${moment().format('DD/MM/YY HH:mm:ss')}
Limit: 20/day

Total Pengguna yang telah terdaftar ${pendaftar.length}`)
                            console.log(pendaftar[found])
                            fs.writeFileSync('./lib/database/user.json',JSON.stringify(pendaftar));
                            tobz.sendTextWithMentions(from, result, id)
                        } else {
                                tobz.reply(from, `${monospace(`Di database ngga ada nomer itu kak`)}`, id)
                        }
                break
        case prefix+'groupinfo':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return tobz.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', message.id)
            isMuted(chatId) == false
            var totalMem = chat.groupMetadata.participants.length
            var desc = chat.groupMetadata.desc
            var groupname = name
            var welgrp = welkom.includes(chat.id)
            var leftgrp = left.includes(chat.id)
            var ngrp = nsfw_.includes(chat.id)
            var antlink = antilink.includes(chat.id)
            var simu = simi_.includes(chat.id)
            var stprt = antisticker.includes(chat.id)
            var antbad = antibadword.includes(chat.id)
            var grouppic = await tobz.getProfilePicFromServer(chat.id)
            if (grouppic == undefined) {
                 var pfp = errorurl
            } else {
                 var pfp = grouppic 
            }
            await tobz.sendFileFromUrl(from, pfp, 'group.png', `*「 GROUP INFO 」*
*➸ *Name : ${groupname}* 
*➸ Members : ${totalMem}*
*➸ Welcome : ${welgrp ? 'Aktif' : 'Tidak Aktif'}*
*➸ Left : ${leftgrp ? 'Aktif' : 'Tidak Aktif'}*
*➸ NSFW : ${ngrp ? 'Aktif' : 'Tidak Aktif'}*
*➸ Simsimi : ${simu ? 'Aktif' : 'Tidak Aktif'}*
*➸ Anti Sticker : ${stprt ? 'Aktif' : 'Tidak Aktif'}*
*➸ Anti Link : ${antlink ? 'Aktif' : 'Tidak Aktif'}*
*➸ Anti Badword : ${antbad ? 'Aktif' : 'Tidak Aktif'}*
*➸ Group Description* 
${desc}`)
            break
               case prefix+'groupprofile':{
                    if(isReg(obj)) return
                    if(cekumur(cekage)) return
                    if (!isGroupMsg) return tobz.reply(from, 'Maaf, perintah ini hanya dapat dipakai didalam grup!', id); 
                    const adminlst = groupAdmins.length
                    const memlst = chat.groupMetadata.participants
                    const timestp = chat.groupMetadata.creation
                    const date = moment(timestp * 1000).format('dddd, DD MMMM YYYY')
                    const time = moment(timestp * 1000).format('HH:mm:ss')
                    const owner = chat.groupMetadata.owner
                    const simu = simi_.includes(chat.id)
                    const grplink = antilink.includes(chat.id)
                    const bdwrd = badword.includes(chat.id)
                    const stckr = antisticker.includes(chat.id)
                    const botadmin = isBotGroupAdmins ? 'Iya' : 'Tidak'
                    const result = `Informasi Group *${chat.formattedTitle || chat.name}*
Group ini didirikan sejak *${date}* Pukul *${time}* oleh @${owner.replace('@c.us','')} 
₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋
● ${monospace(`Total Admin :`)} *${adminlst}*
● ${monospace(`Total Member :`)} *${memlst.length}*
● ${monospace(`Anti Link Status :`)} *${grplink ? 'On' : 'Off'}*
● ${monospace(`Bot Group Status :`)} *${simu ? 'Off' : 'On'}*
● ${monospace(`Anti Badword Status :`)} *${bdwrd ? 'On' : 'Off'}*
● ${monospace(`Anti Spam Sticker Status :`)} *${stckr ? 'On' : 'Off'}*
● ${monospace(`Bot Group Admin :`)} *${botadmin}*
⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻
● ${monospace(`Desc Group :`)}
${chat.groupMetadata.desc}
₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋
_Desc di update oleh : @${chat.groupMetadata.descOwner.replace('@c.us','')} pada *${moment(chat.groupMetadata.descTime * 1000).format('dddd, DD MMMM YYYY')}* pukul ${moment(chat.groupMetadata.descTime * 1000).format('HH:mm:ss')}_
⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻
_*Sagiri Bot Group Information*_`
                    tobz.sendTextWithMentions(from, result, id)
                    limitAdd(serial)
                }
                break
        case prefix+'rulesgc':
        case prefix+'rulesgroup':
                    if (!isGroupMsg) return tobz.reply(from, 'Maaf, perintah ini hanya dapat dipakai didalam grup!', id); 
                 var des = chat.groupMetadata.desc
                 var groupame = name
await tobz.reply(from, `*「 RULES GC 」*

Baca dan Patuhi Rulesnya!

*Name : ${groupame}* 
 
${des}`, id)
            break
        case prefix+'quoterandom' :
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return tobz.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return tobz.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            tobz.sendText(from, quotedd())
            break
        case prefix+'tts':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return tobz.reply(from, 'Gagal, Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return tobz.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            try {
                if (args.length === 1) return tobz.reply(from, 'Kirim perintah *!tts [ Bahasa ] [ Teks ]*, contoh *!tts id halo semua*')
                var dataBhs = args[1]      
                const ttsHZ = require('node-gtts')(dataBhs)
                var dataText = body.slice(8)
                if (dataText === '') return tobz.reply(from, 'Masukkan teksnya', id)
                if (dataText.length > 500) return tobz.reply(from, 'Teks terlalu panjang!', id)
                var dataBhs = body.slice(5, 7)
                ttsHZ.save('./media/tts.mp3', dataText, function () {
                tobz.sendPtt(from, './media/tts.mp3', id)
                limitAdd(serial)
                })
            } catch (err){
                console.log(err)
                tobz.reply(from, bahasa_list, id)
            }
            break
        case prefix+'koin':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return tobz.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            const side = Math.floor(Math.random() * 2) + 1
            if (side == 1) {
              tobz.sendStickerfromUrl(from, 'https://i.ibb.co/YTWZrZV/2003-indonesia-500-rupiah-copy.png', { method: 'get' })
            } else {
              tobz.sendStickerfromUrl(from, 'https://i.ibb.co/bLsRM2P/2003-indonesia-500-rupiah-copy-1.png', { method: 'get' })
            }
            break
        case prefix+'dadu':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return tobz.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            const dice = Math.floor(Math.random() * 6) + 1
            await tobz.sendStickerfromUrl(from, 'https://www.random.org/dice/dice' + dice + '.png', { method: 'get' })
            break
        case prefix+'kapankah':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return tobz.reply(from, 'Gagal, Perintah ini hanya bisa di gunakan dalam group!', id)
            const when = args.join(' ')
            const ans = kapankah[Math.floor(Math.random() * (kapankah.length))]
            if (!when) tobz.reply(from, '⚠️ Format salah! Ketik *!menu* untuk penggunaan.')
            await tobz.reply(from, `Pertanyaan: *${when}* \n\nJawaban: ${ans}`, id)
            break
        case prefix+'nilai':
        case prefix+'rate':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return tobz.reply(from, 'Gagal, Perintah ini hanya bisa di gunakan dalam group!', id)
            const rating = args.join(' ')
            const awr = rate[Math.floor(Math.random() * (rate.length))]
            if (!rating) tobz.reply(from, '⚠️ Format salah! Ketik *!menu* untuk penggunaan.')
            await tobz.reply(from, `Pertanyaan: *${rating}* \n\nJawaban: ${awr}`, id)
            break
        case prefix+'apakah':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return tobz.reply(from, 'Gagal, Perintah ini hanya bisa di gunakan dalam group!', id)
            const nanya = args.join(' ')
            const jawab = apakah[Math.floor(Math.random() * (apakah.length))]
            if (!nanya) tobz.reply(from, '⚠️ Format salah! Ketik *!menu* untuk penggunaan.')
            await tobz.reply(from, `Pertanyaan: *${nanya}* \n\nJawaban: ${jawab}`, id)
            break
         case prefix+'bisakah':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return tobz.reply(from, 'Gagal, Perintah ini hanya bisa di gunakan dalam group!', id)
            const bsk = args.join(' ')
            const jbsk = bisakah[Math.floor(Math.random() * (bisakah.length))]
            if (!bsk) tobz.reply(from, '⚠️ Format salah! Ketik *!menu* untuk penggunaan.')
            await tobz.reply(from, `Pertanyaan: *${bsk}* \n\nJawaban: ${jbsk}`, id)
            break
        case prefix+'owner':
        case prefix+'creator':
            tobz.sendContact(chatId, `6289675134806@c.us`)
            tobz.sendContact(chatId, `6281262180737@c.us`)
            tobz.reply(from, 'kenalin ya itu 2 owner couple ku >_<', id)
            tobz.sendText(from, 'semisal ada pertanyaan, tanyakan aja ke salah satu owner diatas', id)
            break
        case prefix+'info':
            const blockeddd = await tobz.getBlockedIds()
            tobz.sendFileFromUrl(from, 'https://i.ibb.co/ngFNdTd/Dare.jpg' , 'profile.jpg',`*「 INFO BOT 」*\n\n➸ Nama bot : Emeilia Ai\n➸ Author : Rey & Devy\n➸ Nomor Rey : wa.me/6289675134806\n➸ Nomer Devy : wa.me/6281262180737\n➸ Nomor Emeilia : wa.me/6289606962323\n➸ Prefix : ${prefix}\n➸ Total Pengguna : ${pendaftar.length} User\n➸ Total Premium User : ${prem.length}\n➸ Total Banned User : ${banned.length}\n➸ Total Block Contact : ${blockeddd.length}\n➸ The bot is active on : ${cts}\n➸ Public: ON\n\nKetik ${prefix}owner untuk melihat owner dari bot ini\nSelengkapnya, *ketik !about*`, id)
            break
        case prefix+'resetsticker':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isAdmin) return tobz.reply(from, `Maaf, perintah ini hanya dapat dilakukan oleh Admin Emeilia!`, id)
            if (!args.length === 1) return tobz.reply(from, `Masukkan nomornya, *GUNAKAN AWALAN 62*\ncontoh: !resetsticker 62852262236155 / !resetsticker @member`, id) 
            const nomebr = args[1]
            let textz = nomebr.replace(/[-\s+@c.us]/g,'')
            const cuss = textz + '@c.us'
                var found = false
                Object.keys(stickerspam).forEach((i) => {
                    if(stickerspam[i].id == cuss){
                        found = i
                    }
                })
                if (found !== false) {
                    stickerspam[found].msg = 1;
                    const result = 'DB Sticker Spam has been reset'
                    console.log(stickerspam[found])
                    fs.writeFileSync('./lib/database/stickerspam.json',JSON.stringify(stickerspam));
                    tobz.reply(from, result, from)
                    limitAdd(serial)
                } else {
                        tobz.reply(from, `Maaf, Nomor itu tidak terdaftar di database!`, id)
                }
            break
        case prefix+'resetbadword':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
                    if(isLimit(serial)) return
                    if (!isGroupAdmins) return tobz.reply(from, 'Command ini hanya dapat digunakan oleh admin grup')  
                    if (!args.length === 1) return tobz.reply(from, 'Masukkan nomornya, *GUNAKAN AWALAN 62*\ncontoh: !resetbadword 6285112554122 / !resetbadword @member') 
                    const nomer = args[1]
                    let text = nomer.replace(/[-\s+@c.us]/g,'')
                    const cus = text + '@c.us'
                        var found = false
                        Object.keys(msgBadword).forEach((i) => {
                            if(msgBadword[i].id == cus){
                                found = i
                            }
                        })
                        if (found !== false) {
                            msgBadword[found].msg = 1;
                            const result = 'DB Badword Spam has been reset'
                            console.log(msgBadword[found])
                            fs.writeFileSync('./lib/database/msgBadword.json',JSON.stringify(msgBadword));
                            tobz.reply(from, result, from)
                            limitAdd(serial)
                        } else {
                                tobz.reply(from, `${monospace(`Di database ngga ada nomer itu dik`)}`, id)
                        }
                break
        // ON OFF
        case prefix+'antilink':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return tobz.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
            if (!isGroupAdmins) return tobz.reply(from, `Perintah ini hanya bisa di gunakan oleh Admin group!`, id)
            if (!isBotGroupAdmins) return tobz.reply(from, `Perintah ini hanya bisa di gunakan jika Bot menjadi Admin!`, id)
            if (args[1] == '1') {
                var cek = antilink.includes(chatId);
                if(cek){
                    return tobz.reply(from, `*「 ANTI GROUP LINK 」*\nStatus : Sudah Aktif`, id) //if number already exists on database
                } else {
                    antilink.push(chatId)
                    fs.writeFileSync('./lib/database/antilink.json', JSON.stringify(antilink))
                    tobz.reply(from, `*「 ANTI GROUP LINK 」*\nStatus : Aktif`, id)
                }
            } else if (args[1] == '0') {
                var cek = antilink.includes(chatId);
                if(!cek){
                    return tobz.reply(from, `*「 ANTI GROUP LINK 」*\nStatus : Sudah DiNonaktif`, id) //if number already exists on database
                } else {
                    let nixx = antilink.indexOf(chatId)
                    antilink.splice(nixx, 1)
                    fs.writeFileSync('./lib/database/antilink.json', JSON.stringify(antilink))
                    tobz.reply(from, `*「 ANTI GROUP LINK 」*\nStatus : Nonaktif`, id)
                }
            } else {
                tobz.reply(from, `Pilih 1 untuk aktifkan atau 0 untuk nonaktifkan!`, id)
            }
            break    
        case prefix+'antisticker':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return tobz.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
            if (!isGroupAdmins) return tobz.reply(from, `Perintah ini hanya bisa di gunakan oleh Admin group!`, id)
            if (!isBotGroupAdmins) return tobz.reply(from, `Perintah ini hanya bisa di gunakan jika Bot menjadi Admin!`, id)
            if (args[1] == '1') {
                var cek = antisticker.includes(chatId);
                if(cek){
                    return tobz.reply(from, `*「 ANTI SPAM STICKER 」*\nStatus : Sudah Aktif`, id)
                 } else {
                    antisticker.push(chatId)
                    fs.writeFileSync('./lib/database/antisticker.json', JSON.stringify(antisticker))
                    tobz.reply(from, `*「 ANTI SPAM STICKER 」*\nStatus : Aktif`, id)
                }
            } else if (args[1] == '0') {
                var cek = antisticker.includes(chatId);
                if(cek){
                    return tobz.reply(from, `*「 ANTI SPAM STICKER 」*\nStatus : Sudak DiNonaktif`, id) //if number already exists on database
                } else {
                    let nixx = antisticker.indexOf(chatId)
                    antisticker.splice(nixx, 1)
                    fs.writeFileSync('./lib/database/antisticker.json', JSON.stringify(antisticker))
                    tobz.reply(from, `*「 ANTI SPAM STICKER 」*\nStatus : Nonaktif`, id)
                    limitAdd(serial)
                }
            } else {
                tobz.reply(from, `Pilih 1 untuk aktifkan atau 0 untuk nonaktifkan udin!`, id)
            }
            break
        case prefix+'antibadword':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return tobz.reply(from, `Gagal, Perintah ini hanya bisa di gunakan dalam group!`, id)
            if (!isGroupAdmins) return tobz.reply(from, `Gagal, Perintah ini hanya bisa di gunakan oleh Admin group!`, id)
            if (!isBotGroupAdmins) return tobz.reply(from, `Gagal, Perintah ini hanya bisa di gunakan jika Bot menjadi Admin!`, id)
            if (args[1] == '1') {
                var cek = antibadword.includes(chatId);
                if(cek){
                    return tobz.reply(from, `*「 ANTI BADWORD 」*\nSudah diaktifkan di grup ini`, id)
                } else {
                    antibadword.push(chatId)
                    fs.writeFileSync('./lib/database/antibadword.json', JSON.stringify(antibadword))
                    tobz.reply(from, `*「 ANTI BADWORD 」*\nPerhatian Untuk Member Grup ${name} Tercinta\nHarap Jangan Toxic Di Sini Atau Emeilia Akan Kick!`, id)
                }
            } else if (args[1] == '0') {
                var cek = antibadword.includes(chatId);
                if(!cek){
                    return tobz.reply(from, `*「 ANTI BADWORD 」*\nSudah dinonaktifkan di grup ini`, id)
                } else {
                    let nixx = antibadword.indexOf(chatId)
                    antibadword.splice(nixx, 1)
                    fs.writeFileSync('./lib/database/antibadword.json', JSON.stringify(antibadword))
                    tobz.reply(from, `*「 ANTI BADWORD 」*\nPerhatian Untuk Member Grup ${name} Tercinta\nHarap Jangan Toxic Di Sini Atau Emeilia Akan Kick!`, id)
                }
            } else {
                tobz.reply(from, `Pilih 1 untuk aktifkan atau 0 untuk nonaktifkan!`, id)
            } 
            break   
        case prefix+'nsfw':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return tobz.reply(from, 'Gagal, Perintah ini hanya bisa di gunakan dalam group!', id)
            if (!isGroupAdmins) return tobz.reply(from, 'Gagal, Perintah ini hanya bisa di gunakan oleh Admin group!', id)
            if (args.length === 1) return tobz.reply(from, 'Gagal, Pilih enable atau disable!', id)
            if (args[1].toLowerCase() === 'enable') {
                var cek = nsfw_.includes(chatId);
                if(cek){
                    return tobz.reply(from, `NSFW Sudah diaktifkan di grup ini`, id)
                } else {
                nsfw_.push(chat.id)
                fs.writeFileSync('./lib/database/nsfwz.json', JSON.stringify(nsfw_))
                tobz.reply(from, 'NSFW berhasil di aktifkan di group ini! kirim perintah *!nsfwMenu* untuk mengetahui menu', id)
                }
            } else if (args[1].toLowerCase() === 'disable') {
                var cek = nsfw_.includes(chatId);
                if(cek){
                    return tobz.reply(from, `NSFW Sudah dinonaktifkan di grup ini`, id)
                } else {
                nsfw_.splice(chat.id, 1)
                fs.writeFileSync('./lib/database/nsfwz.json', JSON.stringify(nsfw_))
                tobz.reply(from, 'NSFW berhasil di nonaktifkan di group ini! ✔️', id)
                }
            } else {
                tobz.reply(from, 'Pilih enable atau disable udin!', id)
            }
            break
        case prefix+'simi':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return tobz.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (!isAdmin) return tobz.reply(from, 'Perintah ini hanya bisa di gunakan oleh Admin Emeilia!', id) // Hanya Admin yang bisa mengaktifkan
            if (args.length === 1) return tobz.reply(from, 'Pilih on atau off!', id)
            if (args[1].toLowerCase() === 'on') {
                var cek = simi_.includes(chatId);
                if(cek){
                    return tobz.reply(from, `Simsimi Sudah diaktifkan di grup ini`, id)
                } else {
                simi_.push(chat.id)
                fs.writeFileSync('./lib/database/Simsimi.json', JSON.stringify(simi_))
                tobz.reply(from, 'Simsimi berhasil di aktifkan di group ini! Kirim perintah *! [teks]*\nContoh : *! halo*', id)
                }
            } else if (args[1].toLowerCase() === 'off') {
                var cek = simi_.includes(chatId);
                if(cek){
                    return tobz.reply(from, `Simsimi Sudah diaktifkan di grup ini`, id)
                } else {
                simi_.splice(chat.id, 1)
                fs.writeFileSync('./lib/database/Simsimi.json', JSON.stringify(simi_))
                tobz.reply(from, 'Simsimi berhasil di nonaktifkan di group ini! ✔️', id)
                }
            } else {
                tobz.reply(from, 'Pilih on atau off udin!', id)
            }
            break
        case prefix+'group':
        case prefix+'gc':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return tobz.reply(from, 'Gagal, Fitur ini hanya bisa di gunakan dalam group', id)
            if (!isGroupAdmins) return tobz.reply(from, 'Gagal, Fitur ini hanya bisa di gunakan oleh admin group', id)
            if (!isBotGroupAdmins) return tobz.reply(from, 'Gagal, Fitur ini hanya bisa di gunakan ketika bot menjadi admin', id)
            if (args.length === 1) return tobz.reply(from, 'Pilih lock atau unlock!', id)
            if (args[1].toLowerCase() === 'unlock') {
                tobz.setGroupToAdminsOnly(groupId, false)
                tobz.sendTextWithMentions(from, `Group telah dibuka oleh admin @${sender.id.replace('@c.us','')}\nDimohon jangan spam ya, mohon  kerja samanya apabila melanggar bot akan membanned atau akan memblokir User yg melakukan spamming bahkan bisa langsung dikick dari group.\n\nuntuk rules selengkapnya bisa ketik !rules`)
            } else if (args[1].toLowerCase() === 'lock') {
                tobz.setGroupToAdminsOnly(groupId, true)
                tobz.sendTextWithMentions(from, `Group telah ditutup oleh admin @${sender.id.replace('@c.us','')}\nSekarang *hanya admin* yang dapat mengirim pesan`)
            } else {
                tobz.reply(from, 'Pilih lock atau unlock Udin!', id)
            }
            break
        case prefix+'left':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return tobz.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (!isGroupAdmins) return tobz.reply(from, 'Perintah ini hanya bisa di gunakan oleh Admin group!', id)
            if (args.length === 1) return tobz.reply(from, 'Pilih enable atau disable!', id)
            if (args[1].toLowerCase() === 'enable') {
                left.push(chat.id)
                fs.writeFileSync('./lib/database/left.json', JSON.stringify(left))
                tobz.reply(from, 'Fitur left berhasil di aktifkan di group ini!', id)
            } else if (args[1].toLowerCase() === 'disable') {
                left.splice(chat.id, 1)
                fs.writeFileSync('./lib/database/left.json', JSON.stringify(left))
                tobz.reply(from, 'Fitur left berhasil di nonaktifkan di group ini!', id)
            } else {
                tobz.reply(from, 'Pilih enable atau disable udin!', id)
            }
            break
        case prefix+'welcome':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return tobz.reply(from, 'Gagal, Perintah ini hanya bisa di gunakan dalam group!', id)
            if (!isGroupAdmins) return tobz.reply(from, 'Gagal, Perintah ini hanya bisa di gunakan oleh Admin group!', id)
            if (args.length === 1) return tobz.reply(from, 'Pilih 1 untuk aktifkan atau 0 untuk nonaktifkan!', id)
            if (args[1].toLowerCase() === '1') {
                welkom.push(chat.id)
                fs.writeFileSync('./lib/database/welcome.json', JSON.stringify(welkom))
                tobz.reply(from, 'Fitur welcome berhasil di aktifkan di group ini! ✔️', id)
            } else if (args[1].toLowerCase() === '0') {
                welkom.splice(chat.id, 1)
                fs.writeFileSync('./lib/database/welcome.json', JSON.stringify(welkom))
                tobz.reply(from, 'Fitur welcome berhasil di nonaktifkan di group ini! ✔️', id)
            } else {
                tobz.reply(from, 'Pilih 1 untuk aktifkan atau 0 untuk nonaktifkan!', id)
            }
            break
        case prefix+'event':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return tobz.reply(from, 'Gagal, Perintah ini hanya bisa di gunakan dalam group!', id)
            if (!isGroupAdmins) return tobz.reply(from, 'Gagal, Perintah ini hanya bisa di gunakan oleh Admin group!', id)
            if (args.length === 1) return tobz.reply(from, 'Gagal, Pilih enable atau disable!', id)
            if (args[1].toLowerCase() === 'enable') {
                event.push(chat.id)
                fs.writeFileSync('./lib/database/event.json', JSON.stringify(event))
                tobz.reply(from, '*❬ 𝗦𝗨𝗞𝗦𝗘𝗦 ❭ 𝗠𝗲𝗻𝗴𝗮𝗸𝘁𝗶𝗳𝗸𝗮𝗻 EVENT 𝗱𝗶 𝗴𝗿𝗼𝘂𝗽 𝗶𝗻𝗶️*', id)
            } else if (args[1].toLowerCase() === 'disable') {
                event.splice(chat.id, 1)
                fs.writeFileSync('./lib/database/event.json', JSON.stringify(event))
                tobz.reply(from, '*❬ 𝗦𝗨𝗞𝗦𝗘𝗦 ❭ 𝗠𝗲𝗻𝗼𝗻𝗮𝗸𝘁𝗶𝗳𝗸??𝗻 EVENT 𝗱𝗶 𝗴𝗿𝗼𝘂𝗽 𝗶𝗻𝗶️*', id)
            } else {
                tobz.reply(from, 'Pilih enable atau disable udin!', id)
            }
            break
        case prefix+'leveling':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return tobz.reply(from, 'Gagal, Perintah ini hanya bisa di gunakan dalam group!', id)
            if (!isGroupAdmins) return tobz.reply(from, 'Gagal, Perintah ini hanya bisa di gunakan oleh Admin group!', id)
            if (args.length === 1) return tobz.reply(from, 'Pilih 1 untuk aktifkan atau 0 untuk nonaktifkan!', id)
            if (args[1].toLowerCase() === '1') {
                leveling.push(chat.id)
                fs.writeFileSync('./lib/database/leveling.json', JSON.stringify(leveling))
                tobz.reply(from, 'Fitur levelling berhasil di aktifkan di group ini! ✔️', id)
            } else if (args[1].toLowerCase() === '0') {
                leveling.splice(chat.id, 1)
                fs.writeFileSync('./lib/database/leveling.json', JSON.stringify(welkom))
                tobz.reply(from, 'Fitur levelling berhasil di nonaktifkan di group ini! ✔️', id)
            } else {
                tobz.reply(from, 'Pilih 1 untuk aktifkan atau 0 untuk nonaktifkan!', id)
            }
            break
        case prefix+'sound':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return tobz.reply(from, 'Gagal, Perintah ini hanya bisa di gunakan dalam group!', id)
            if (!isGroupAdmins) return tobz.reply(from, 'Gagal, Perintah ini hanya bisa di gunakan oleh Admin group!', id)
            if (args.length === 1) return tobz.reply(from, 'Pilih on untuk aktifkan atau off untuk nonaktifkan!', id)
            if (args[1].toLowerCase() === 'on') {
                sound.push(chat.id)
                fs.writeFileSync('./lib/database/sound.json', JSON.stringify(sound))
                tobz.reply(from, 'Sekarang Fitur sound telah aktif di group ini✅', id)
		tobz.sendText(from, 'Silahkan Ketik !listsound Untuk Fitur Sound', id)
            } else if (args[1].toLowerCase() === 'off') {
                sound.splice(chat.id, 1)
                fs.writeFileSync('./lib/database/sound.json', JSON.stringify(sound))
                tobz.reply(from, 'Sekarang Fitur sound telah dinonaktif di group ini.', id)
            } else {
                tobz.reply(from, 'Pilih on untuk aktifkan atau off untuk nonaktifkan!', id)
            }
            break
        case prefix+'public':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return tobz.reply(from, 'Gagal, Perintah ini hanya bisa di gunakan dalam group!', id)
            if (!isGroupAdmins) return tobz.reply(from, 'Gagal, Perintah ini hanya bisa di gunakan oleh Admin group!', id)
            if (args.length === 1) return tobz.reply(from, 'Pilih on untuk aktifkan atau off untuk nonaktifkan!', id)
            if (args[1].toLowerCase() === 'on') {
                public.push(chat.id)
                fs.writeFileSync('./lib/database/sound.json', JSON.stringify(public))
                tobz.reply(from, 'Sekarang semua Fitur telah aktif di group ini✅', id)
		tobz.sendText(from, 'Silahkan Ketik !menu untuk membuka fiturnya', id)
            } else if (args[1].toLowerCase() === 'off') {
                public.splice(chat.id, 1)
                fs.writeFileSync('./lib/database/sound.json', JSON.stringify(public))
                tobz.reply(from, 'Sekarang semua Fitur telah kembali diprivate oleh Owner✅', id)
            } else {
                tobz.reply(from, 'Pilih on untuk aktifkan atau off untuk nonaktifkan!', id)
            }
            break
        // ANIME //
        case prefix+'neonime':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return tobz.reply(from, `Gagal, Perintah ini hanya bisa di gunakan dalam group!`, id)
            if (isLimit(serial)) return tobz.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)

            if (args.length === 1) return tobz.reply(from, `Kirim perintah *${prefix}neonime [ Query ]*, Contoh : !neonime danmachi`)
            const nenon = body.slice(9)
            tobz.reply(from, mess.wait, id)
            try {
                const response2 = await fetch('https://tobz-api.herokuapp.com/api/neonime?q=' + nenon + '&apikey=' + tobzkey)
                if (!response2.ok) throw new Error(`unexpected response ${response2.statusText}`)
                const jsonserc = await response2.json()
                const { result } = await jsonserc
                let xixixi = `*「 NEONIME 」*\n\n*Hasil Pencarian : ${nenon}*\n`
                for (let i = 0; i < result.length; i++) {
                    xixixi += `\n─────────────────\n\n• *Title* : ${result[i].title}\n• *Deskripsi* : ${result[i].desc}\n• *Link* : ${result[i].link}`
                }
                await tobz.sendFileFromUrl(from, result[0].image, 'neon.jpg', xixixi, id)
                await limitAdd(serial)
            } catch (err) {
                    console.log(err)
                    await tobz.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Maaf, Anime tidak ditemukan')
            }
            break
        case prefix+'kusonime':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return tobz.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return tobz.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1) return tobz.reply(from, 'Kirim perintah *!kusonime [query]*\nContoh : *!kusonime darling in the franxx*', id)
            const animeq = await axios.get('https://tobz-api.herokuapp.com/v1/kuso?q=' + body.slice(7)  + '&apikey=' + tobzkey)
            if (animeq.data.error) return tobz.reply(from, animeq.data.error, id)
            const res_animeq = `${animeq.data.title}\n\n${animeq.data.info}\n\n${animeq.data.sinopsis}\n\n${animeq.data.link_dl}`
            tobz.sendFileFromUrl(from, animeq.data.thumb, 'kusonime.jpg', res_animeq, id)
            await limitAdd(serial)
            break
        case prefix+'dewabatch':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return tobz.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return tobz.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1) return tobz.reply(from, 'Kirim perintah *!dewabatch [query]*\nContoh : *!dewabatch darling in the franxx*', id)
            const animek = await axios.get('https://tobz-api.herokuapp.com/v1/dewabatch?q=' + body.slice(7)  + '&apikey=' + tobzkey)
            if (animek.data.error) return tobz.reply(from, animek.data.error, id)
            const res_animek = `${animek.data.result}\n\n${animek.data.sinopsis}`
            tobz.sendFileFromUrl(from, animek.data.thumb, 'dewabatch.jpg', res_animek, id)
            await limitAdd(serial)
            break
    case prefix+'pinterest':
        //if (!isPublic) return tobz.reply(from, mess.public, id)   
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return tobz.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return tobz.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1) return tobz.reply(from, 'Kirim perintah *${prefix}pinterest [query]*\nContoh : *${prefix}pinterest emelia*', id)
            const ptrsq = body.slice(11)
            const ptrst = await fetch(`https://api.vhtear.com/pinterest?query=${ptrsq}&apikey=${vhtearkey}`)
            if (!ptrst.ok) throw new Error(`Error Pinterest : ${ptrst.statusText}`)
            const ptrs = await ptrst.json()
            const ptrsn = ptrs.result
            const b = JSON.parse(JSON.stringify(ptrsn))
            const ptrs2 =  b[Math.floor(Math.random() * b.length)]
            const image = await bent("buffer")(ptrs2)
            const base64 = `data:image/jpg;base64,${image.toString("base64")}`
            await tobz.sendImage(from, base64, 'ptrs.jpg', `*Pinterest*\n\n*Hasil Pencarian : ${ptrsq}*`, id)
            await limitAdd(serial)
            break
    case prefix+'pictcecan':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return tobz.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return tobz.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            const cec = await fetch(`https://api.vhtear.com/pinterest?query=cewekcantik&apikey=${vhtearkey}`)
            const cecc = await cec.json()
            const ceccs = cecc.result
	    const ce = JSON.parse(JSON.stringify(ceccs))
            const can =  ce[Math.floor(Math.random() * ce.length)]
            const cecan = await bent("buffer")(can)
            const cecans = `data:image/jpg;base64,${cecan.toString("base64")}`
            await tobz.sendImage(from, cecans, 'cecans.jpg', `HALLO KANG HALU!!`, id)
            await limitAdd(serial)
            break
    case prefix+'pictcogan':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return tobz.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return tobz.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            const cog = await fetch(`https://api.vhtear.com/pinterest?query=cowokganteng&apikey=${vhtearkey}`)
            const cogg = await cog.json()
            const coggs = cogg.result
	    const co = JSON.parse(JSON.stringify(coggs))
            const gan =  co[Math.floor(Math.random() * co.length)]
            const cogan = await bent("buffer")(gan)
            const cogans = `data:image/jpg;base64,${cogan.toString("base64")}`
            await tobz.sendImage(from, cogans, 'cogans.jpg', `HALLO KANG HALU!!`, id)
            await limitAdd(serial)
            break
        case prefix+'nhview':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return tobz.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (!isNsfw) return tobz.reply(from, 'command/Perintah NSFW belum di aktifkan di group ini!', id)
            if (isLimit(serial)) return tobz.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1) return tobz.reply(from, 'Kirim perintah *!nhview [212121]*\nContoh : *!nhview 321421*', id)
            const nhsh = body.slice(11)
            const nhsh2 = await axios.get('https://mnazria.herokuapp.com/api/nhentai?code='+nhsh)
            for (let i = 0; i < nhsh2.length; i++) {
                await tobz.sendImage(from, nhsh2[i].data, 'thumbserc.jpg', '', id)
                }
            limitAdd(serial)
            break
        case prefix+'randomloli':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return tobz.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (!isPremium) return tobz.reply(from, 'Maaf, ini adalah fitur premium, untuk menggunakan fitur ini silahkan donasi, Kirim !donasi untuk melihat info donasi', id)
            if (isLimit(serial)) return tobz.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            const loli = await axios.get(`https://api.vhtear.com/randomloli&apikey=${vhtearkey}`)
            const loly = loli.data.result
            tobz.sendFileFromUrl(from, loly.result, 'loli.jpeg', 'Ini lolinya om!', id)
            await limitAdd(serial)
            break
        case prefix+'shota':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return tobz.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return tobz.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            const imageToBase64 = require('image-to-base64')
            var shouta = ['shota anime','anime shota'];
            var shotaa = shouta[Math.floor(Math.random() * shouta.length)];
            var urlshot = "https://api.fdci.se/rep.php?gambar=" + shotaa;
            axios.get(urlshot)
            .then((result) => {
            var sht = JSON.parse(JSON.stringify(result.data));
            var shotaak =  sht[Math.floor(Math.random() * sht.length)];
            imageToBase64(shotaak)
            .then(
                (response) => {
            let img = 'data:image/jpeg;base64,'+response
            tobz.sendFile(from, img, "shota.jpg", `*SHOTA*`, id)
            limitAdd(serial)
                    }) 
                .catch(
                    (error) => {
                        console.log(error);
                    })
            })
            break
        case prefix+'waifu':
        //if (!isPublic) return tobz.reply(from, mess.public, id)   
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return tobz.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return tobz.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            const waifu = await axios.get('https://tobz-api.herokuapp.com/api/waifu?apikey=' + tobzkey)
            tobz.sendFileFromUrl(from, waifu.data.image, 'Waifu.jpg', `➸ Name : ${waifu.data.name}\n➸ Description : ${waifu.data.desc}\n\n➸ Source : ${waifu.data.source}`, id)
            await limitAdd(serial)
            break
        case prefix+'husbu':
        //if (!isPublic) return tobz.reply(from, mess.public, id)   
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return tobz.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return tobz.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            const diti = fs.readFileSync('./lib/database/husbu.json')
            const ditiJsin = JSON.parse(diti)
            const rindIndix = Math.floor(Math.random() * ditiJsin.length)
            const rindKiy = ditiJsin[rindIndix]
            tobz.sendFileFromUrl(from, rindKiy.image, 'Husbu.jpg', rindKiy.teks, id)
            await limitAdd(serial)
            break
        case prefix+'randomnekonime':
        //if (!isPublic) return tobz.reply(from, mess.public, id)  
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return tobz.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return tobz.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            const nekonime = await axios.get('https://tobz-api.herokuapp.com/api/nekonime?apikey=' + tobzkey)
            const nekon = nekonime.data
            if (nekon.result.endsWith('.png')) {
                var ext = '.png'
            } else {
                var ext = '.jpg'
            }
            tobz.sendFileFromUrl(from, nekon.result, `Nekonime${ext}`, 'Nekonime!', id)
            await limitAdd(serial)
            break
        case prefix+'bokep': // MFARELS
        case prefix+'randombokep': // MFARELS
        case prefix+'bkp': // MFARELS
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return tobz.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id) // MFARELS
            if (!isNsfw) return tobz.reply(from, 'command/Perintah NSFW belum di aktifkan di group ini!', id) // MFARELS
            if (isLimit(serial)) return tobz.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id) // MFARELS
            const mskkntl = fs.readFileSync('./lib/database/18+.json') // MFARELS
            const kntlnya = JSON.parse(mskkntl) // MFARELS
            const rindBkp = Math.floor(Math.random() * kntlnya.length) // MFARELS
            const rindBkep = kntlnya[rindBkp] // MFARELS
            tobz.sendFileFromUrl(from, rindBkep.image, 'Bokep.jpg', rindBkep.teks, id) // MFARELS
            await limitAdd(serial)
            break // MFARELS
        // MFARELS
        case prefix+'randomtrapnime':
        //if (!isPublic) return tobz.reply(from, mess.public, id)  
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return tobz.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (!isNsfw) return tobz.reply(from, 'command/Perintah NSFW belum di aktifkan di group ini!', id)
            if (isLimit(serial)) return tobz.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            const trapnime = await axios.get('https://tobz-api.herokuapp.com/api/nsfwtrap?apikey=' + tobzkey)
            const trapn = trapnime.data.result
            if (trapn.result.endsWith('.png')) {
                var ext = '.png'
            } else {
                var ext = '.jpg'
            }
            tobz.sendImage(from, trapn.result, `trapnime${ext}`, 'Trapnime!', id)
            await limitAdd(serial)
            break
        case prefix+'randomhentai':
        //if (!isPublic) return tobz.reply(from, mess.public, id)  
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return tobz.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (!isNsfw) return tobz.reply(from, 'command/Perintah NSFW belum di aktifkan di group ini!', id)
            if (isLimit(serial)) return tobz.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            const hentai = await axios.get('https://tobz-api.herokuapp.com/api/hentai?apikey=' + tobzkey)
            const henta = hentai.data
            if (henta.result.endsWith('.png')) {
                var ext = '.png'
            } else {
                var ext = '.jpg'
            }
            tobz.sendImage(from, henta.result, `RandomHentai${ext}`, 'Random Hentai!', id)
            await limitAdd(serial)
            break
        case prefix+'randomnsfwneko':
        //if (!isPublic) return tobz.reply(from, mess.public, id)  
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return tobz.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (!isNsfw) return tobz.reply(from, 'command/Perintah NSFW belum di aktifkan di group ini!', id)
            if (isLimit(serial)) return tobz.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            const nsfwneko = await axios.get('https://tobz-api.herokuapp.com/api/nsfwneko?apikey=' + tobzkey)
            const nsfwn = nsfwneko.data
            if (nsfwn.result.endsWith('.png')) {
                var ext = '.png'
            } else {
                var ext = '.jpg'
            }
            tobz.sendImage(from, nsfwn.result, `NsfwNeko${ext}`, 'NsfwNeko!', id)
            await limitAdd(serial)
            break
        case prefix+'randomanime':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return tobz.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return tobz.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            const ranime = await axios.get('https://tobz-api.herokuapp.com/api/randomanime?apikey=' + tobzkey)
            const ranimen = ranime.data
            if (ranimen.result.endsWith('.png')) {
                var ext = '.png'
            } else {
                var ext = '.jpg'
            }
            tobz.sendFileFromUrl(from, ranimen.result, `RandomAnime${ext}`, 'Random Anime!', id)
            await limitAdd(serial)
            break
        case prefix+'randomkpop':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return tobz.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return tobz.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            const kpope = await axios.get('https://tobz-api.herokuapp.com/api/randomkpop?apikey=' + tobzkey)
            const rakpop = kpope.data
            if (rakpop.result.endsWith('.png')) {
                var ext = '.png'
            } else {
                var ext = '.jpg'
            }
            tobz.sendFileFromUrl(from, rakpop.result, `RandomKpop${ext}`, 'Random Kpop!', id)
            await limitAdd(serial)
            break
        case prefix+'randomblowjob':
        //if (!isPublic) return tobz.reply(from, mess.public, id)  
            if (!isGroupMsg) return tobz.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return tobz.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (!isNsfw) return tobz.reply(from, 'command/Perintah NSFW belum di aktifkan di group ini!', id)
            await limitAdd(serial)
            const sblow = await axios.get('https://tobz-api.herokuapp.com/api/nsfwblowjob?apikey=' + tobzkey)
            const rblow = sblow.data
            tobz.sendFileFromUrl(from, rblow.result, `RandoBlow${ext}`, 'Random Blowjob!', id)
            break
        case prefix+'randomhug':
        //if (!isPublic) return tobz.reply(from, mess.public, id)  
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return tobz.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return tobz.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            const shug = await axios.get('https://tobz-api.herokuapp.com/api/hug?apikey=' + tobzkey)
            const rhug = shug.data
            tobz.sendFileFromUrl(from, rhug.result, `RandomHug${ext}`, 'Random Hug!', id)
            break
        case prefix+'randomcry':
        //if (!isPublic) return tobz.reply(from, mess.public, id)  
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return tobz.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return tobz.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            const scry = await axios.get('https://tobz-api.herokuapp.com/api/cry?apikey=' + tobzkey)
            const rcry = scry.data
            tobz.sendFileFromUrl(from, rcry.result, `RandomCry${ext}`, 'Random Cry!', id)
            await limitAdd(serial)
            break
        case prefix+'randomkiss':
        //if (!isPublic) return tobz.reply(from, mess.public, id)  
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return tobz.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return tobz.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            const skiss = await axios.get('https://tobz-api.herokuapp.com/api/kiss?apikey=' + tobzkey)
            const rkiss = skiss.data
            tobz.sendFileFromUrl(from, rkiss.result, `RandomKiss${ext}`, 'Random Kiss!', id)
            await limitAdd(serial)
            break
        case prefix+'subreddit':
        //if (!isPublic) return tobz.reply(from, mess.public, id)  
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return tobz.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return tobz.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            argz = body.trim().split(' ')
            const sr = argz[1]
            try {
            const response1 = await axios.get('https://meme-api.herokuapp.com/gimme/' + sr + '/');
            const { postLink, title, subreddit, url, nsfw, spoiler } = response1.data
                if (nsfw == true) {
                    if ((isGroupMsg) && (isNsfw)) {
                        await tobz.sendFileFromUrl(from, `${url}`, 'Reddit.jpg', `*Title*: ${title}` + '\n\n*Postlink*:' + `${postLink}`)
                        limitAdd(serial)
                    } else if ((isGroupMsg) && (!isNsfw)) {
                        await tobz.reply(from, `Nsfw belum diaktifkan di Grup *${name}*`, id)
                    }
                } else { 
                    await tobz.sendFileFromUrl(from, `${url}`, 'Reddit.jpg', `*Title*: ${title}` + '\n\n*Postlink*:' + `${postLink}`)
                }
            } catch(err) {
                await tobz.sendFileFromUrl(from, errorurl, id) 
            }
            break
        case prefix+'nhder':
        //if (!isPublic) return tobz.reply(from, mess.public, id)  
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return tobz.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (!isNsfw) return tobz.reply(from, 'command/Perintah NSFW belum di aktifkan di group ini!', id)
            if (isLimit(serial)) return tobz.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length >=2){
                const code = args[1]
                const url = 'https://nhder.herokuapp.com/download/nhentai/'+code+'/zip'
                const short = []
                const shortener = await urlShortener(url)
                url['short'] = shortener
                short.push(url)
                const caption = `*NEKOPOI DOWNLOADER*\n\nLink: ${shortener}`
                tobz.sendText(from, caption)
                limitAdd(serial)
            } else {
                tobz.sendText(from, 'Maaf tolong masukan code nuclear')
            }
            break
        case prefix+'wallanime' :
        //if (!isPublic) return tobz.reply(from, mess.public, id)  
            if (!isGroupMsg) return tobz.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            const walnime = ['https://wallpaperaccess.com/full/395986.jpg','https://wallpaperaccess.com/full/21628.jpg','https://wallpaperaccess.com/full/21622.jpg','https://wallpaperaccess.com/full/21612.jpg','https://wallpaperaccess.com/full/21611.png','https://wallpaperaccess.com/full/21597.jpg','https://cdn.nekos.life/wallpaper/QwGLg4oFkfY.png','https://wallpaperaccess.com/full/21591.jpg','https://cdn.nekos.life/wallpaper/bUzSjcYxZxQ.jpg','https://cdn.nekos.life/wallpaper/j49zxzaUcjQ.jpg','https://cdn.nekos.life/wallpaper/YLTH5KuvGX8.png','https://cdn.nekos.life/wallpaper/Xi6Edg133m8.jpg','https://cdn.nekos.life/wallpaper/qvahUaFIgUY.png','https://cdn.nekos.life/wallpaper/leC8q3u8BSk.jpg','https://cdn.nekos.life/wallpaper/tSUw8s04Zy0.jpg','https://cdn.nekos.life/wallpaper/sqsj3sS6EJE.png','https://cdn.nekos.life/wallpaper/HmjdX_s4PU4.png','https://cdn.nekos.life/wallpaper/Oe2lKgLqEXY.jpg','https://cdn.nekos.life/wallpaper/GTwbUYI-xTc.jpg','https://cdn.nekos.life/wallpaper/nn_nA8wTeP0.png','https://cdn.nekos.life/wallpaper/Q63o6v-UUa8.png','https://cdn.nekos.life/wallpaper/ZXLFm05K16Q.jpg','https://cdn.nekos.life/wallpaper/cwl_1tuUPuQ.png','https://cdn.nekos.life/wallpaper/wWhtfdbfAgM.jpg','https://cdn.nekos.life/wallpaper/3pj0Xy84cPg.jpg','https://cdn.nekos.life/wallpaper/sBoo8_j3fkI.jpg','https://cdn.nekos.life/wallpaper/gCUl_TVizsY.png','https://cdn.nekos.life/wallpaper/LmTi1k9REW8.jpg','https://cdn.nekos.life/wallpaper/sbq_4WW2PUM.jpg','https://cdn.nekos.life/wallpaper/QOSUXEbzDQA.png','https://cdn.nekos.life/wallpaper/khaqGIHsiqk.jpg','https://cdn.nekos.life/wallpaper/iFtEXugqQgA.png','https://cdn.nekos.life/wallpaper/deFKIDdRe1I.jpg','https://cdn.nekos.life/wallpaper/OHZVtvDm0gk.jpg','https://cdn.nekos.life/wallpaper/YZYa00Hp2mk.jpg','https://cdn.nekos.life/wallpaper/R8nPIKQKo9g.png','https://cdn.nekos.life/wallpaper/_brn3qpRBEE.jpg','https://cdn.nekos.life/wallpaper/ADTEQdaHhFI.png','https://cdn.nekos.life/wallpaper/MGvWl6om-Fw.jpg','https://cdn.nekos.life/wallpaper/YGmpjZW3AoQ.jpg','https://cdn.nekos.life/wallpaper/hNCgoY-mQPI.jpg','https://cdn.nekos.life/wallpaper/3db40hylKs8.png','https://cdn.nekos.life/wallpaper/iQ2FSo5nCF8.jpg','https://cdn.nekos.life/wallpaper/meaSEfeq9QM.png','https://cdn.nekos.life/wallpaper/CmEmn79xnZU.jpg','https://cdn.nekos.life/wallpaper/MAL18nB-yBI.jpg','https://cdn.nekos.life/wallpaper/FUuBi2xODuI.jpg','https://cdn.nekos.life/wallpaper/ez-vNNuk6Ck.jpg','https://cdn.nekos.life/wallpaper/K4-z0Bc0Vpc.jpg','https://cdn.nekos.life/wallpaper/Y4JMbswrNg8.jpg','https://cdn.nekos.life/wallpaper/ffbPXIxt4-0.png','https://cdn.nekos.life/wallpaper/x63h_W8KFL8.jpg','https://cdn.nekos.life/wallpaper/lktzjDRhWyg.jpg','https://cdn.nekos.life/wallpaper/j7oQtvRZBOI.jpg','https://cdn.nekos.life/wallpaper/MQQEAD7TUpQ.png','https://cdn.nekos.life/wallpaper/lEG1-Eeva6Y.png','https://cdn.nekos.life/wallpaper/Loh5wf0O5Aw.png','https://cdn.nekos.life/wallpaper/yO6ioREenLA.png','https://cdn.nekos.life/wallpaper/4vKWTVgMNDc.jpg','https://cdn.nekos.life/wallpaper/Yk22OErU8eg.png','https://cdn.nekos.life/wallpaper/Y5uf1hsnufE.png','https://cdn.nekos.life/wallpaper/xAmBpMUd2Zw.jpg','https://cdn.nekos.life/wallpaper/f_RWFoWciRE.jpg','https://cdn.nekos.life/wallpaper/Y9qjP2Y__PA.jpg','https://cdn.nekos.life/wallpaper/eqEzgohpPwc.jpg','https://cdn.nekos.life/wallpaper/s1MBos_ZGWo.jpg','https://cdn.nekos.life/wallpaper/PtW0or_Pa9c.png','https://cdn.nekos.life/wallpaper/32EAswpy3M8.png','https://cdn.nekos.life/wallpaper/Z6eJZf5xhcE.png','https://cdn.nekos.life/wallpaper/xdiSF731IFY.jpg','https://cdn.nekos.life/wallpaper/Y9r9trNYadY.png','https://cdn.nekos.life/wallpaper/8bH8CXn-sOg.jpg','https://cdn.nekos.life/wallpaper/a02DmIFzRBE.png','https://cdn.nekos.life/wallpaper/MnrbXcPa7Oo.png','https://cdn.nekos.life/wallpaper/s1Tc9xnugDk.jpg','https://cdn.nekos.life/wallpaper/zRqEx2gnfmg.jpg','https://cdn.nekos.life/wallpaper/PtW0or_Pa9c.png','https://cdn.nekos.life/wallpaper/0ECCRW9soHM.jpg','https://cdn.nekos.life/wallpaper/kAw8QHl_wbM.jpg','https://cdn.nekos.life/wallpaper/ZXcaFmpOlLk.jpg','https://cdn.nekos.life/wallpaper/WVEdi9Ng8UE.png','https://cdn.nekos.life/wallpaper/IRu29rNgcYU.png','https://cdn.nekos.life/wallpaper/LgIJ_1AL3rM.jpg','https://cdn.nekos.life/wallpaper/DVD5_fLJEZA.jpg','https://cdn.nekos.life/wallpaper/siqOQ7k8qqk.jpg','https://cdn.nekos.life/wallpaper/CXNX_15eGEQ.png','https://cdn.nekos.life/wallpaper/s62tGjOTHnk.jpg','https://cdn.nekos.life/wallpaper/tmQ5ce6EfJE.png','https://cdn.nekos.life/wallpaper/Zju7qlBMcQ4.jpg','https://cdn.nekos.life/wallpaper/CPOc_bMAh2Q.png','https://cdn.nekos.life/wallpaper/Ew57S1KtqsY.jpg','https://cdn.nekos.life/wallpaper/hVpFbYJmZZc.jpg','https://cdn.nekos.life/wallpaper/sb9_J28pftY.jpg','https://cdn.nekos.life/wallpaper/JDoIi_IOB04.jpg','https://cdn.nekos.life/wallpaper/rG76AaUZXzk.jpg','https://cdn.nekos.life/wallpaper/9ru2luBo360.png','https://cdn.nekos.life/wallpaper/ghCgiWFxGwY.png','https://cdn.nekos.life/wallpaper/OSR-i-Rh7ZY.png','https://cdn.nekos.life/wallpaper/65VgtPyweCc.jpg','https://cdn.nekos.life/wallpaper/3vn-0FkNSbM.jpg','https://cdn.nekos.life/wallpaper/u02Y0-AJPL0.jpg','https://cdn.nekos.life/wallpaper/_-Z-0fGflRc.jpg','https://cdn.nekos.life/wallpaper/3VjNKqEPp58.jpg','https://cdn.nekos.life/wallpaper/NoG4lKnk6Sc.jpg','https://cdn.nekos.life/wallpaper/xiTxgRMA_IA.jpg','https://cdn.nekos.life/wallpaper/yq1ZswdOGpg.png','https://cdn.nekos.life/wallpaper/4SUxw4M3UMA.png','https://cdn.nekos.life/wallpaper/cUPnQOHNLg0.jpg','https://cdn.nekos.life/wallpaper/zczjuLWRisA.jpg','https://cdn.nekos.life/wallpaper/TcxvU_diaC0.png','https://cdn.nekos.life/wallpaper/7qqWhEF_uoY.jpg','https://cdn.nekos.life/wallpaper/J4t_7DvoUZw.jpg','https://cdn.nekos.life/wallpaper/xQ1Pg5D6J4U.jpg','https://cdn.nekos.life/wallpaper/aIMK5Ir4xho.jpg','https://cdn.nekos.life/wallpaper/6gneEXrNAWU.jpg','https://cdn.nekos.life/wallpaper/PSvNdoISWF8.jpg','https://cdn.nekos.life/wallpaper/SjgF2-iOmV8.jpg','https://cdn.nekos.life/wallpaper/vU54ikOVY98.jpg','https://cdn.nekos.life/wallpaper/QjnfRwkRU-Q.jpg','https://cdn.nekos.life/wallpaper/uSKqzz6ZdXc.png','https://cdn.nekos.life/wallpaper/AMrcxZOnVBE.jpg','https://cdn.nekos.life/wallpaper/N1l8SCMxamE.jpg','https://cdn.nekos.life/wallpaper/n2cBaTo-J50.png','https://cdn.nekos.life/wallpaper/ZXcaFmpOlLk.jpg','https://cdn.nekos.life/wallpaper/7bwxy3elI7o.png','https://cdn.nekos.life/wallpaper/7VW4HwF6LcM.jpg','https://cdn.nekos.life/wallpaper/YtrPAWul1Ug.png','https://cdn.nekos.life/wallpaper/1p4_Mmq95Ro.jpg','https://cdn.nekos.life/wallpaper/EY5qz5iebJw.png','https://cdn.nekos.life/wallpaper/aVDS6iEAIfw.jpg','https://cdn.nekos.life/wallpaper/veg_xpHQfjE.jpg','https://cdn.nekos.life/wallpaper/meaSEfeq9QM.png','https://cdn.nekos.life/wallpaper/Xa_GtsKsy-s.png','https://cdn.nekos.life/wallpaper/6Bx8R6D75eM.png','https://cdn.nekos.life/wallpaper/zXOGXH_b8VY.png','https://cdn.nekos.life/wallpaper/VQcviMxoQ00.png','https://cdn.nekos.life/wallpaper/CJnRl-PKWe8.png','https://cdn.nekos.life/wallpaper/zEWYfFL_Ero.png','https://cdn.nekos.life/wallpaper/_C9Uc5MPaz4.png','https://cdn.nekos.life/wallpaper/zskxNqNXyG0.jpg','https://cdn.nekos.life/wallpaper/g7w14PjzzcQ.jpg','https://cdn.nekos.life/wallpaper/KavYXR_GRB4.jpg','https://cdn.nekos.life/wallpaper/Z_r9WItzJBc.jpg','https://cdn.nekos.life/wallpaper/Qps-0JD6834.jpg','https://cdn.nekos.life/wallpaper/Ri3CiJIJ6M8.png','https://cdn.nekos.life/wallpaper/ArGYIpJwehY.jpg','https://cdn.nekos.life/wallpaper/uqYKeYM5h8w.jpg','https://cdn.nekos.life/wallpaper/h9cahfuKsRg.jpg','https://cdn.nekos.life/wallpaper/iNPWKO8d2a4.jpg','https://cdn.nekos.life/wallpaper/j2KoFVhsNig.jpg','https://cdn.nekos.life/wallpaper/z5Nc-aS6QJ4.jpg','https://cdn.nekos.life/wallpaper/VUFoK8l1qs0.png','https://cdn.nekos.life/wallpaper/rQ8eYh5mXN8.png','https://cdn.nekos.life/wallpaper/D3NxNISDavQ.png','https://cdn.nekos.life/wallpaper/Z_CiozIenrU.jpg','https://cdn.nekos.life/wallpaper/np8rpfZflWE.jpg','https://cdn.nekos.life/wallpaper/ED-fgS09gik.jpg','https://cdn.nekos.life/wallpaper/AB0Cwfs1X2w.jpg','https://cdn.nekos.life/wallpaper/DZBcYfHouiI.jpg','https://cdn.nekos.life/wallpaper/lC7pB-GRAcQ.png','https://cdn.nekos.life/wallpaper/zrI-sBSt2zE.png','https://cdn.nekos.life/wallpaper/_RJhylwaCLk.jpg','https://cdn.nekos.life/wallpaper/6km5m_GGIuw.png','https://cdn.nekos.life/wallpaper/3db40hylKs8.png','https://cdn.nekos.life/wallpaper/oggceF06ONQ.jpg','https://cdn.nekos.life/wallpaper/ELdH2W5pQGo.jpg','https://cdn.nekos.life/wallpaper/Zun_n5pTMRE.png','https://cdn.nekos.life/wallpaper/VqhFKG5U15c.png','https://cdn.nekos.life/wallpaper/NsMoiW8JZ60.jpg','https://cdn.nekos.life/wallpaper/XE4iXbw__Us.png','https://cdn.nekos.life/wallpaper/a9yXhS2zbhU.jpg','https://cdn.nekos.life/wallpaper/jjnd31_3Ic8.jpg','https://cdn.nekos.life/wallpaper/Nxanxa-xO3s.png','https://cdn.nekos.life/wallpaper/dBHlPcbuDc4.jpg','https://cdn.nekos.life/wallpaper/6wUZIavGVQU.jpg','https://cdn.nekos.life/wallpaper/_-Z-0fGflRc.jpg','https://cdn.nekos.life/wallpaper/H9OUpIrF4gU.jpg','https://cdn.nekos.life/wallpaper/xlRdH3fBMz4.jpg','https://cdn.nekos.life/wallpaper/7IzUIeaae9o.jpg','https://cdn.nekos.life/wallpaper/FZCVL6PyWq0.jpg','https://cdn.nekos.life/wallpaper/5dG-HH6d0yw.png','https://cdn.nekos.life/wallpaper/ddxyA37HiwE.png','https://cdn.nekos.life/wallpaper/I0oj_jdCD4k.jpg','https://cdn.nekos.life/wallpaper/ABchTV97_Ts.png','https://cdn.nekos.life/wallpaper/58C37kkq39Y.png','https://cdn.nekos.life/wallpaper/HMS5mK7WSGA.jpg','https://cdn.nekos.life/wallpaper/1O3Yul9ojS8.jpg','https://cdn.nekos.life/wallpaper/hdZI1XsYWYY.jpg','https://cdn.nekos.life/wallpaper/h8pAJJnBXZo.png','https://cdn.nekos.life/wallpaper/apO9K9JIUp8.jpg','https://cdn.nekos.life/wallpaper/p8f8IY_2mwg.jpg','https://cdn.nekos.life/wallpaper/HY1WIB2r_cE.jpg','https://cdn.nekos.life/wallpaper/u02Y0-AJPL0.jpg','https://cdn.nekos.life/wallpaper/jzN74LcnwE8.png','https://cdn.nekos.life/wallpaper/IeAXo5nJhjw.jpg','https://cdn.nekos.life/wallpaper/7lgPyU5fuLY.jpg','https://cdn.nekos.life/wallpaper/f8SkRWzXVxk.png','https://cdn.nekos.life/wallpaper/ZmDTpGGeMR8.jpg','https://cdn.nekos.life/wallpaper/AMrcxZOnVBE.jpg','https://cdn.nekos.life/wallpaper/ZhP-f8Icmjs.jpg','https://cdn.nekos.life/wallpaper/7FyUHX3fE2o.jpg','https://cdn.nekos.life/wallpaper/CZoSLK-5ng8.png','https://cdn.nekos.life/wallpaper/pSNDyxP8l3c.png','https://cdn.nekos.life/wallpaper/AhYGHF6Fpck.jpg','https://cdn.nekos.life/wallpaper/ic6xRRptRes.jpg','https://cdn.nekos.life/wallpaper/89MQq6KaggI.png','https://cdn.nekos.life/wallpaper/y1DlFeHHTEE.png']
            let walnimek = walnime[Math.floor(Math.random() * walnime.length)]
            tobz.sendFileFromUrl(from, walnimek, 'Nimek.jpg', '', id)
            break
        case prefix+'quotesnime':
        case prefix+'quotesanime':
        //if (!isPublic) return tobz.reply(from, mess.public, id)  
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return tobz.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return tobz.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            const skya = await axios.get('https://tobz-api.herokuapp.com/api/quotesnime/random?apikey=' + tobzkey)
            skya_ = skya.data
            tobz.reply(from, `➸ *Quotes* : ${skya_.quote[0]}\n➸ *Character* : ${skya_.character[0]}\n➸ *Anime* : ${skya_.anime[0]}`, id)
            await limitAdd(serial)
            break
        case prefix+'meme':
        //if (!isPublic) return tobz.reply(from, mess.public, id)  
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return tobz.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return tobz.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            const response = await axios.get('https://meme-api.herokuapp.com/gimme/wholesomeanimemes')
            const { postlink, title, subreddit, url, nsfw, spoiler } = response.data
            tobz.sendFileFromUrl(from, `${url}`, 'meme.jpg', `${title}`)
            await limitAdd(serial)
            break
        case prefix+'truth':
        //if (!isPublic) return tobz.reply(from, mess.public, id)  
            if (!isGroupMsg) return tobz.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            const trut =['Pernah suka sama siapa aja? berapa lama?','Kalau boleh atau kalau mau, di gc/luar gc siapa yang akan kamu jadikan sahabat?(boleh beda/sma jenis)','apa ketakutan terbesar kamu?','pernah suka sama orang dan merasa orang itu suka sama kamu juga?','Siapa nama mantan pacar teman mu yang pernah kamu sukai diam diam?','pernah gak nyuri uang nyokap atau bokap? Alesanya?','hal yang bikin seneng pas lu lagi sedih apa','pernah cinta bertepuk sebelah tangan? kalo pernah sama siapa? rasanya gimana brou?','pernah jadi selingkuhan orang?','hal yang paling ditakutin','siapa orang yang paling berpengaruh kepada kehidupanmu','hal membanggakan apa yang kamu dapatkan di tahun ini','siapa orang yang bisa membuatmu sange','siapa orang yang pernah buatmu sange','(bgi yg muslim) pernah ga solat seharian?','Siapa yang paling mendekati tipe pasangan idealmu di sini','suka mabar(main bareng)sama siapa?','pernah nolak orang? alasannya kenapa?','Sebutkan kejadian yang bikin kamu sakit hati yang masih di inget','pencapaian yang udah didapet apa aja ditahun ini?','kebiasaan terburuk lo pas di sekolah apa?'] 
          const ttrth = trut[Math.floor(Math.random() * trut.length)]
            tobz.reply(from, `\n⚠️ *[Warning]* ⚠️\nperaturan permainan truth or dare yaitu harus *dilakukan dan dijawab dengan jujur* apabila melanggar maka akan diberi hukuman\n\n[sanksi]\nketik !sanksi untuk melihat hukuman yg akan diberikan.`, id)
		await sleep(5000)
            tobz.sendFileFromUrl(from, 'https://i.ibb.co/ngFNdTd/Dare.jpg' , 'profile.jpg',`*「 TRUTH 」*\n=> ${ttrth}\n\n`, id)
            break
        case prefix+'dare':
        //if (!isPublic) return tobz.reply(from, mess.public, id)  
            if (!isGroupMsg) return tobz.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
	   const dare =['Kirim pesan ke mantan kamu dan bilang "aku masih suka sama kamu','telfon crush/pacar sekarang dan ss ke pemain','pap ke salah satu anggota grup','Bilang "KAMU CANTIK BANGET NGGAK BOHONG" ke cowo','ss recent call whatsapp','drop emot "🦄💨" setiap ngetik di gc/pc selama 1 hari','kirim voice note bilang can i call u baby?','drop kutipan lagu/quote, terus tag member yang cocok buat kutipan itu','pake foto sule sampe 3 hari','ketik pake bahasa daerah 24 jam','ganti nama menjadi "gue anak lucinta luna" selama 5 jam','chat ke kontak wa urutan sesuai %batre kamu, terus bilang ke dia "i lucky to hv you','prank chat mantan dan bilang " i love u, pgn balikan','record voice baca surah al-kautsar','bilang "i hv crush on you, mau jadi pacarku gak?" ke lawan jenis yang terakhir bgt kamu chat (serah di wa/tele), tunggu dia bales, kalo udah ss drop ke sini','sebutkan tipe pacar mu!','snap/post foto pacar/crush','teriak gajelas lalu kirim pake vn kesini','pap mukamu lalu kirim ke salah satu temanmu','kirim fotomu dengan caption, aku anak pungut','teriak pake kata kasar sambil vn trus kirim kesini','teriak " anjimm gabutt anjimmm " di depan rumah mu','ganti nama jadi " BOWO " selama 24 jam','Pura pura kerasukan, contoh : kerasukan maung, kerasukan belalang, kerasukan kulkas, dll']
	          const der = dare[Math.floor(Math.random() * dare.length)]
     tobz.reply(from, `\n⚠️ *[Warning]* ⚠️\nperaturan permainan truth or dare yaitu harus *dilakukan dan dijawab dengan jujur* apabila melanggar maka akan diberi hukuman\n\n[sanksi]\nketik !sanksi untuk melihat hukuman yg akan diberikan.`, id)       
            await sleep(5000)
            tobz.sendFileFromUrl(from, 'https://i.ibb.co/ngFNdTd/Dare.jpg' , 'profile.jpg',`*「 DARE 」*\n=> ${der}\n\n`, id)
break
        case prefix+'nekopoi':
        //if (!isPublic) return tobz.reply(from, mess.public, id)  
            if (!isGroupMsg) return tobz.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (!isNsfw) return tobz.reply(from, 'command/Perintah NSFW belum di aktifkan di group ini!', id)
            if (args.length === 1) return tobz.reply(from, `Kirim perintah *${prefix}nekopoi [linkNekopoi]*\nContoh : *${prefix}nekopoi https://nekopoi.care/tsunpuri-episode-1-subtitle-indonesia/*`, id)
            try {
            tobz.reply(from, mess.wait, id)
            const nekipoi = await axios.get('https://mhankbarbars.herokuapp.com/api/nekopoi?url=' + body.slice(7) + '&apikey=' + vhtearkey)
            const nekop = nekipoi.data.result
            const nekop2 = `*Anime Ditemukan!*\n➸ Judul : ${nekop.judul}\n➸ Dilihat : ${nekop.dilihat}\n➸ Info : ${nekop.info}`
            const image = await bent("buffer")(nekop.thumbnail)
            const base64 = `data:image/jpg;base64,${image.toString("base64")}`
            tobz.sendImage(from, base64, judul, nekop2)
            } catch (err) {
             console.error(err.message)
             await tobz.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Maaf, Video tidak ditemukan')
             tobz.sendText(ownerNumber, 'Nekopoi Error : ' + err)
           }
            break
        case prefix+'quoteanime':
        //if (!isPublic) return tobz.reply(from, mess.public, id)  
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return tobz.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return tobz.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
                        if(args[1]){
                            if(args[1] === 'anime'){
                                const anime = body.slice(13)
                                axios.get('https://animechanapi.xyz/api/quotes?anime='+anime).then(({ data }) => {
                                    let quote = data.data[0].quote 
                                    let char = data.data[0].character
                                    let anime = data.data[0].anime
                                                tobz.reply(from, `"${quote}"\n\n*Character :* ${char}\n*Anime :* ${anime}`, id)
                                    limitAdd(serial)
                                }).catch(err => {
                                    tobz.reply('Quote Char/Anime tidak ditemukan!')
                                })
                            }else{
                                const char = body.slice(12)
                                axios.get('https://animechanapi.xyz/api/quotes?char='+char).then(({ data }) => {
                                    let quote = data.data[0].quote 
                                    let char = data.data[0].character
                                    let anime = data.data[0].anime
                                    tobz.reply(from, `" *${quote}* "\n\n*Character :* ${char}\n*Anime :* ${anime}`, id)
                                    limitAdd(serial)
                                }).catch(err => {
                                    tobz.reply('Quote Char/Anime tidak ditemukan!', id)
                                })
                            }
                        }else{
                            axios.get('https://animechanapi.xyz/api/quotes/random').then(({ data }) => {
                                    let quote = data.data[0].quote 
                                    let char = data.data[0].character
                                    let anime = data.data[0].anime
                                tobz.reply(from, `" *${quote}* "\n\n*Character :* ${char}\n*Anime :* ${anime}`, id) 
                                limitAdd(serial)
                            }).catch(err => {
                                console.log(err)
                            })
                        }
            break
        case prefix+'maluser':
        //if (!isPublic) return tobz.reply(from, mess.public, id)  
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return tobz.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return tobz.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            const username = body.slice(18)
            tobz.reply(from, mess.wait, id)
            try {
                const result = await axios.get(`https://api.jikan.moe/v3/user/${username}`)
                const jikan =  result.data
                const Data = `*「 USER - MYANIMELIST 」*

• Username: ${jikan.username}
• User ID: ${jikan.user_id}
• Gender: ${jikan.gender}
• Location: ${jikan.location}
• Joined: ${jikan.joined}
⭐️ Anime Stats ⭐️
• Days Watched: ${jikan.anime_stats.days_watched}
• Mean Score: ${jikan.anime_stats.mean_score}
• Currently Watching: ${jikan.anime_stats.watching}
• Completed: ${jikan.anime_stats.completed}
• On Hold: ${jikan.anime_stats.on_hold}
• Dropped: ${jikan.anime_stats.dropped}
• Plan to Watch: ${jikan.anime_stats.plan_to_watch}
🎯️ Manga Stats 🎯️
• Days Read: ${jikan.manga_stats.days_read}
• Mean Score: ${jikan.manga_stats.mean_score}
• Currently Reading: ${jikan.manga_stats.reading}
• Completed: ${jikan.manga_stats.completed}
• On Hold: ${jikan.manga_stats.on_hold}
• Dropped: ${jikan.manga_stats.dropped}
• Plan to Read: ${jikan.manga_stats.plan_to_read}`

                await tobz.sendFileFromUrl(from, `${jikan.image_url}`,`user.png`, Data)
                limitAdd(serial)
            } catch (err) {
                console.log(err)
                await tobz.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Maaf, User tidak ditemukan')
            }    
            break
        case prefix+'malanime':
        case prefix+'anime':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return tobz.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return tobz.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            const keyword = message.body.replace('!malanime', '')
            try {
            const data = await fetch(
           `https://api.jikan.moe/v3/search/anime?q=${keyword}`
            )
            const parsed = await data.json()
            if (!parsed) {
              await tobz.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Maaf, Anime tidak ditemukan', id)
              return null
              }
            const { title, synopsis, episodes, url, rated, score, image_url } = parsed.results[0]
            const content = `*Anime Ditemukan!*
✨️ *Title:* ${title}
🎆️ *Episodes:* ${episodes}
💌️ *Rating:* ${rated}
❤️ *Score:* ${score}
💚️ *Synopsis:* ${synopsis}
🌐️ *URL*: ${url}`

            const image = await bent("buffer")(image_url)
            const base64 = `data:image/jpg;base64,${image.toString("base64")}`
            tobz.sendImage(from, base64, title, content)
             await limitAdd(serial)
           } catch (err) {
             console.error(err.message)
             await tobz.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Maaf, Anime tidak ditemukan')
           }
          break
        case prefix+'malcharacter':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return tobz.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return tobz.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            const keywords = message.body.replace('!malcharacter', '')
            try {
            const data = await fetch(
           `https://api.jikan.moe/v3/search/character?q=${keywords}`
            )
            const parsed = await data.json()
            if (!parsed) {
              await tobz.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Maaf, Anime tidak ditemukan', id)
              return null
              }
            const { name, alternative_names, url, image_url } = parsed.results[0]
            const contentt = `*Anime Ditemukan!*

✨️ *Name:* ${name}
💌️ *Alternative Names:* ${alternative_names}
🌐️ *URL*: ${url}`

            const image = await bent("buffer")(image_url)
            const base64 = `data:image/jpg;base64,${image.toString("base64")}`
            tobz.sendImage(from, base64, name, contentt)
            await limitAdd(serial)
           } catch (err) {
             console.error(err.message)
             await tobz.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Maaf, Anime tidak ditemukan')
           }
          break
        // PRAY //
        case prefix+'jadwalshalat':
        case prefix+'jadwalsholat':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return tobz.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
            if (isLimit(serial)) return tobz.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1) return tobz.reply(from, `[❗] Kirim perintah *!jadwalShalat [ Daerah ]*\ncontoh : *!jadwalShalat Tangerang*\nUntuk list daerah kirim perintah *!listDaerah*`)
            const daerah = body.slice(14)
            const jadwalShalat = await axios.get(`https://tobz-api.herokuapp.com/api/jadwalshalat?q=${daerah}&apikey=${tobzkey}`)
            if (jadwalShalat.data.error) return tobz.reply(from, jadwalShalat.data.error, id)
            const { Shubuh, Zduhur, Ashr, Magrib, Isya, kota } = await jadwalShalat.data
            arrbulan = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];
            tgl = new Date().getDate()
            bln = new Date().getMonth()
            thn = new Date().getFullYear()
            const resultJadwal = `「 JADWAL SHALAT 」\n\nJadwal shalat di ${kota}, ${tgl}-${arrbulan[bln]}-${thn}\n\nSubuh : ${Shubuh}\nDzuhur : ${Zduhur}\nAshar : ${Ashr}\nMaghrib : ${Magrib}\nIsya : ${Isya}`
            await limitAdd(serial)
            break

        case prefix+'quran':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return tobz.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
            if (isLimit(serial)) return tobz.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1) return tobz.reply(from, `Kirim perintah Surah Quran kamu dengan cara ketik perintah :\n*!quran* [ Urutan Surat ]\nContoh :\n*!quran 1*`, id)
            const qura = `https://api.vhtear.com/quran?no=${args[1]}&apikey=${vhtearkey}`
            const quraan = await axios.get(qura)
            const quraann = quraan.data
            let hasqu = `*「 AL-QURAN 」*\n\n*Surah : ${quraann.result.surah}*\n*Quran* : ${quraann.result.quran}*`
            await tobz.reply(from, `${hasqu}`, id).catch((e) => tobz.reply(from, `*Terdapat kesalahan saat mencari surat ${args[1]}*`, id))
            await limitAdd(serial)
            break
        case prefix+'listsurah': // ARUGAZ
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return tobz.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
            try {
                axios.get('https://raw.githubusercontent.com/ArugaZ/scraper-results/main/islam/surah.json')
                .then((response) => {
                    let hehex = '*「 DAFTAR SURAH 」*\n\n___________________________\n'
                    let nmr = 1
                    for (let i = 0; i < response.data.data.length; i++) {
                        hehex += nmr + '. ' +  monospace(response.data.data[i].name.transliteration.id.toLowerCase()) + '\n'
                        nmr++
                            }
                        hehex += '___________________________'
                    tobz.reply(from, hehex, id)
                })
            } catch(err) {
                tobz.reply(from, err, id)
            }
            break
        case prefix+'infosurah': // ARUGAZ
            if (!isGroupMsg) return tobz.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
            if (isLimit(serial)) return tobz.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length == 1) return tobz.reply(from, `Kirim perintah *!infosurah [ Nama Surah ]*\nContoh : *!infosurah al-fatihah*`, message.id)
                var responseh = await axios.get('https://raw.githubusercontent.com/ArugaZ/scraper-results/main/islam/surah.json')
                var { data } = responseh.data
                var idx = data.findIndex(function(post, index) {
                if((post.name.transliteration.id.toLowerCase() == args[1].toLowerCase())||(post.name.transliteration.en.toLowerCase() == args[1].toLowerCase()))
                    return true;
                });
                try {
                    var pesan = "*「 INFORMASI SURAH 」*\n\n___________________________\n\n"
                    pesan = pesan + "➸ *Nama* : "+ data[idx].name.transliteration.id + "\n" + "➸ *Asma* : " +data[idx].name.short+"\n"+"➸ *Arti* : "+data[idx].name.translation.id+"\n"+"➸ *Jumlah ayat* : "+data[idx].numberOfVerses+"\n"+"➸ *Nomor surah* : "+data[idx].number+"\n"+"Jenis : "+data[idx].revelation.id+"\n"+"➸ *Keterangan* : "+data[idx].tafsir.id
                    pesan += '\n\n___________________________'
                    tobz.reply(from, pesan, message.id)
                    limitAdd(serial)
                }catch{
                    tobz.reply(from, 'Data tidak ditemukan, atau nama surah salah', id)
                }
            break
        case prefix+'tafsir': // ARUGAZ
        //if (!isPublic) return tobz.reply(from, mess.public, id)  
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return tobz.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
            if (isLimit(serial)) return tobz.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length == 1) return tobz.reply(from, `Kirim perintah *!tafsir [ Nama Surah ] [ Ayat ]*\nContoh : *!tafsir al-fatihah 2*`, message.id)
                var responsh = await axios.get('https://raw.githubusercontent.com/ArugaZ/scraper-results/main/islam/surah.json')
                var {data} = responsh.data
                var idx = data.findIndex(function(post, index) {
                if((post.name.transliteration.id.toLowerCase() == args[1].toLowerCase())||(post.name.transliteration.en.toLowerCase() == args[1].toLowerCase()))
                    return true;
                });
            try{
                nmr = data[idx].number
                if(!isNaN(nmr)) {
                var responsih = await axios.get('https://api.quran.sutanlab.id/surah/'+nmr+"/"+args[2])
                    var {data} = responsih.data
                    pesan = ""
                    pesan = pesan + "*「 TAFSIR 」*\n\nTafsir Q.S. "+data.surah.name.transliteration.id+":"+args[2]+"\n\n"
                    pesan = pesan + data.text.arab + "\n\n"
                    pesan = pesan + "_" + data.translation.id + "_" + "\n\n" +data.tafsir.id.long
                    pesan += '\n\n___________________________'
                    tobz.reply(from, pesan, message.id)
                    limitAdd(serial)
                }
            }catch{
                tobz.reply(from, 'Data tidak ditemukan, mungkin nama surah/ayat salah', id)
            }
            break
        // MEDIA //
        case prefix+'ytsearch':
        //if (!isPublic) return tobz.reply(from, mess.public, id)  
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return tobz.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
            if (isLimit(serial)) return tobz.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1) return tobz.reply(from, `Kirim perintah *${prefix}ytsearch [ Query ]*, Contoh : !ytsearch alan walker alone`)
            const ytsher = body.slice(10)
            tobz.reply(from, mess.wait, id)
            try {
                const response2 = await fetch(`https://api.vhtear.com/youtube?query=${encodeURIComponent(ytsher)}&apikey=${vhtearkey}`)
                if (!response2.ok) throw new Error(`unexpected response ${response2.statusText}`)
                const jsonserc = await response2.json()
                const { result } = await jsonserc
                let xixixi = `*「 YOUTUBE SEARCH 」*\n\n*Hasil Pencarian : ${ytsher}*\n`
                for (let i = 0; i < result.length; i++) {
                    xixixi += `\n─────────────────\n\n• *Judul* : ${result[i].title}\n• *Ditonton* : ${result[i].views}\n• *Durasi* : ${result[i].duration}\n• *Channel* : ${result[i].channel}\n• *URL* : ${result[i].urlyt}\n`
                }
                await tobz.sendFileFromUrl(from, result[0].image, 'thumbserc.jpg', xixixi, id)
                await limitAdd(serial)
            } catch (err) {
                    console.log(err)
                    await tobz.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Maaf, Video tidak ditemukan')
                    tobz.sendText(ownerNumber, 'YT Search Error : ' + err)
            }
            break
        case prefix+'distance':
        //if (!isPublic) return tobz.reply(from, mess.public, id)  
                if(isReg(obj)) return
                if(cekumur(cekage)) return
                if (!isGroupMsg) return tobz.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
                if (isLimit(serial)) return tobz.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
                if (args.length === 1) return tobz.reply(from, `[❗] Kirim perintah *${prefix}distance [ Daerah1|Daerah2 ]*\ncontoh : *${prefix}distance Jakarta|Bandung*`, id)
                tobz.reply(from, `[⏳] Sek yo lagi diproses.. , tinggal ngopi yo oleh..`, id)
                try {
                    const dfdc1 = arg.split('|')[0]
                    const dfdc2 = arg.split('|')[1]
                    const dfdcres = await axios.get('https://api.vhtear.com/distance?from='+dfdc1+'&to='+dfdc2+'&apikey='+vhtearkey)
                    const { result } = dfdcres.data
                    await tobz.reply(from, `*「 DRIVING-FLYING DISTANCE 」*\n\n${result.data}`, id)
                    await limitAdd(serial)
                } catch (err) {
                    console.error(err.message)
                    await tobz.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Maaf, Lokasi tidak ditemukan')
                    tobz.sendText(ownerNumber, 'Distance Error : ' + err)
                }
                break
        case prefix+'shopee':
        //if (!isPublic) return tobz.reply(from, mess.public, id)  
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return tobz.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
            if (isLimit(serial)) return tobz.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1) return tobz.reply(from, `Kirim perintah *${prefix}shopee [ Query ]*, Contoh : *${prefix}shopee HP Samsul a20*`)
            const shopek = body.slice(8)
            tobz.reply(from, mess.wait, id)
            try {
                const dataplai = await axios.get(`https://api.vhtear.com/shopee?query=${shopek}&count=5&apikey=${vhtearkey}`)
                const dataplay = dataplai.data.result
                 let shopeq = `*「 SHOPEE 」*\n\n*Hasil Pencarian : ${shopek}*\n`
                for (let i = 0; i < dataplay.items.length; i++) {
                    shopeq += `\n─────────────────\n\n• *Nama* : ${dataplay.items[i].nama}\n• Harga* : ${dataplay.items[i].harga}\n• *Terjual* : ${dataplay.items[i].terjual}\n• *Lokasi Toko* : ${dataplay.items[i].shop_location}\n• *Deskripsi* : ${dataplay.items[i].description}\n• *Link Product : ${dataplay.items[i].link_product}*\n`
                }
                await tobz.sendFileFromUrl(from, dataplay.items[0].image_cover, `shopee.jpg`, shopeq, id)
                await limitAdd(serial)
            } catch (err){
                console.log(err)
            }
            break
        case prefix+'playstore':
        //if (!isPublic) return tobz.reply(from, mess.public, id)  
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return tobz.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
            if (isLimit(serial)) return tobz.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1) return tobz.reply(from, `Kirim perintah *${prefix}playstore [ Query ]*, Contoh : *${prefix}playstore Mobile Legends*`)
            const keywotp = body.slice(11)
            tobz.reply(from, mess.wait, id)
            try {
                const dataplai = await axios.get(`https://api.vhtear.com/playstore?query=${keywotp}&apikey=${vhtearkey}`)
                const dataplay = dataplai.data
                 let keluarplay = `*「 PLAYSTORE 」*\n\nHasil Pencarian : ${keywotp}*\n`
                for (let i = 0; i < dataplay.result.length; i++) {
                    keluarplay += `\n─────────────────\n\n• *Nama* : ${dataplay.result[i].title}\n• *Developer* : ${dataplay.result[i].developer}\n• *Deskripsi* : ${dataplay.result[i].description}\n• *Paket ID* : ${dataplay.result[i].app_id}\n• *Harga* : ${dataplay.result[i].price}\n• *Link App* : https://play.google.com${dataplay.result[i].url}\n`
                }
                await tobz.sendFileFromUrl(from, dataplay.result[0].icon, `iconapk.webp`, keluarplay, id)
                await limitAdd(serial)
            } catch (err){
                console.log(err)
            }
            break
        case prefix+'newstickerline':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return tobz.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
            if (isLimit(serial)) return tobz.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            tobz.reply(from, mess.wait, id)
            try {
                const stcline = await fetch(`https://api.vhtear.com/newsticker?apikey=${vhtearkey}`)
                if (!stcline.ok) throw new Error(`unexpected response ${stcline.statusText}`)
                const stcline2 = await stcline.json()
                const { hasil } = await stcline2.result
                let xixixi = `*「 NEW STICKER LINE 」*\n\n`
                for (let i = 0; i < hasil.length; i++) {
                    xixixi += `\n─────────────────\n\n*Title* : ${hasil[i].title}\n*Url* : ${hasil[i].uri}\n`
                }
                await tobz.sendFileFromUrl(from, 'https://play-lh.googleusercontent.com/BkvRJsjYiEjb0-XKuop2AurqFKLhhu_iIP06TrCTGAq180P9Briv8Avz8ncLp7bOmCs', 'newstc.jpg', xixixi, id)
                await limitAdd(serial)
            } catch (err) {
                    console.log(err)
                    await tobz.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Maaf, Video tidak ditemukan')
                    tobz.sendText(ownerNumber, 'Berita Error : ' + err)
            }
            break
        case prefix+'news':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return tobz.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
            if (isLimit(serial)) return tobz.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            tobz.reply(from, mess.wait, id)
            try {
                const response2 = await fetch(`https://api.vhtear.com/beritaterbaru&apikey=${vhtearkey}`)
                if (!response2.ok) throw new Error(`unexpected response ${response2.statusText}`)
                const jsonber = await response2.json()
                const { data } = await jsonber.result
                let xixixi = `*「 BERITA TERKINI 」*\n\n`
                for (let i = 0; i < data.length; i++) {
                    xixixi += `\n─────────────────\n\n*Source* : ${data[i].url}\n*Penulis* : ${data[i].author}\n*Judul* : ${data[i].title}\n*Deskripsi* : ${data[i].description}\n*Dipublikasi* : ${data[i].publishedAt}\n*Konten* : ${data[i].content}\n`
                }
                await tobz.sendFileFromUrl(from, data[0].urlToImage, 'thumbserc.jpg', xixixi, id)
                await limitAdd(serial)
            } catch (err) {
                    console.log(err)
                    await tobz.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Maaf, Video tidak ditemukan')
                    tobz.sendText(ownerNumber, 'Berita Error : ' + err)
            }
            break
        case prefix+'jadwalbola':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return tobz.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
            if (isLimit(serial)) return tobz.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            tobz.reply(from, mess.wait, id)
            try {
                const jdbola = await fetch(`https://api.vhtear.com/jadwalbola&apikey=${vhtearkey}`)
                if (!jdbola.ok) throw new Error(`unexpected response ${jdbola.statusText}`)
                const jdbola2 = await jdbola.json()
                const { data } = await jdbola2.result
                let xixixi = `*「 JADWAL BOLA 」*\n\n`
                for (let i = 0; i < data.length; i++) {
                    xixixi += `\n─────────────────\n\n*Kick-Off* : ${data[i].kickoff}\n*Pertandingan* : ${data[i].pertandingan}\n*Stasiun TV* : ${data[i].stasiuntv}`
                }
                await tobz.sendText(from, xixixi, id)
                await limitAdd(serial)
            } catch (err) {
                    console.log(err)
                    await tobz.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Maaf, Jadwal tidak ditemukan')
                    tobz.sendText(ownerNumber, 'Jadwal Bola Error : ' + err)
            }
            break
        case prefix+'infogempa':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return tobz.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return tobz.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            const bmkg = await axios.get('http://tobz-api.herokuapp.com/api/infogempa?apikey=' + tobzkey)
            const { potensi, koordinat, lokasi, kedalaman, magnitude, waktu, map } = bmkg.data
            const hasil = `*${waktu}*\n📍 *Lokasi* : *${lokasi}*\n〽️ *Kedalaman* : *${kedalaman}*\n💢 *Magnitude* : *${magnitude}*\n🔘 *Potensi* : *${potensi}*\n📍 *Koordinat* : *${koordinat}*`
            tobz.sendFileFromUrl(from, map, 'shakemap.jpg', hasil, id)
            await limitAdd(serial)
            break
        case prefix+'ssphone':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return tobz.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return tobz.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1) return tobz.reply(from, 'Kirim perintah *!ssphone [linkWeb]*\nContoh : *!ssphone https://neonime.vip*', id)
            const ssphone = body.slice(9)
            tobz.sendFileFromUrl(from, `https://api.vhtear.com/ssweb?link=${ssphone}&type=phone&apikey=${vhtearkey}`, 'ssphone.jpg', '', id)
            await limitAdd(serial)
            break
        case prefix+'sspc':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return tobz.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (!isPremium) return tobz.reply(from, 'Maaf, ini adalah fitur premium, untuk menggunakan fitur ini silahkan donasi, Kirim !donasi untuk melihat info donasi', id)            
            if (args.length === 1) return tobz.reply(from, 'Kirim perintah *!sspc [linkWeb]*\nContoh : *!sspc https://neonime.vip*', id)
            const sspc = body.slice(6)
            tobz.sendFileFromUrl(from, `https://api.vhtear.com/ssweb?link=${sspc}&type=pc&apikey=${vhtearkey}`, 'sspc.jpg', '', id)
            await limitAdd(serial)
            break
	case prefix+'bitly':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return tobz.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return tobz.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1) return tobz.reply(from, 'Kirim perintah *!bitly [linkWeb]*\nContoh : *!bitly https://neonime.vip*', id)
            const shorturl1 = body.slice(7)
            const bitly1 = await axios.get('https://tobz-api.herokuapp.com/api/bitly?url=' + shorturl1 + '&apikey=' + tobzkey)
            const bitly2 = bitly1.data
            if (bitly2.error) return tobz.reply(from, bitly2.error, id)
            const surl2 = `Link : ${shorturl1}\nShort URL : ${bitly2.result}`
            tobz.sendText(from, surl2, id)
            await limitAdd(serial)
            break
        case prefix+'tinyurl':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return tobz.reply(from, 'Gagal, Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return tobz.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1) return tobz.reply(from, 'Kirim perintah *!shorturl [linkWeb]*\nContoh : *!shorturl https://neonime.vip*', id)
            const shorturl2 = body.slice(9)
            const tiny1 = await axios.get('https://tobz-api.herokuapp.com/api/shorturl?url=' + shorturl2 + '&apikey=' + tobzkey)
            const tiny2 = tiny1.data
            if (tiny2.error) return tobz.reply(from, tiny2.error, id)
            const surl3 = `Link : ${shorturl2}\nShort URL : ${tiny2.result}`
            tobz.sendText(from, surl3, id)
            await limitAdd(serial)
            break
        case prefix+'cuaca':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return tobz.reply(from, 'Gagal, Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return tobz.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1) return tobz.reply(from, 'Kirim perintah *!cuaca [tempat]*\nContoh : *!cuaca tangerang', id)
            const tempat = body.slice(7)
            const weather = await axios.get('http://melodicxt.herokuapp.com/api/cuaca?query='+ tempat +'&apiKey='+ melodickey)
            const weatherr = weather.data
            if (weatherr.error) {
                tobz.reply(from, weatherr.error, id)
            } else {
                tobz.reply(from, `➸ Tempat : ${weatherr.result.tempat}\n\n➸ Angin : ${weatherr.result.angin}\n➸ Cuaca : ${weatherr.result.cuaca}\n➸ Deskripsi : ${weatherr.result.desk}\n➸ Kelembapan : ${weatherr.result.kelembapan}\n➸ Suhu : ${weatherr.result.suhu}\n➸ Udara : ${weatherr.result.udara}`, id)
                limitAdd(serial)
            }
            break
        case prefix+'covid':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return tobz.reply(from, 'Gagal, Perintah ini hanya bisa di gunakan dalam group', id)
            if (isLimit(serial)) return tobz.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            argz = body.trim().split(' ')
            console.log(...argz[1])
            var slicedArgs = Array.prototype.slice.call(arg, 1);
            console.log(slicedArgs)
            const country = await slicedArgs.join(' ')
            console.log(country)
            const response2 = await axios.get('https://coronavirus-19-api.herokuapp.com/countries/' + country + '/')
            const { cases, todayCases, deaths, todayDeaths, active } = response2.data
            await tobz.sendText(from, '🌎️ Covid Info - ' + country + ' 🌍️\n\n✨️ Total Cases: ' + `${cases}` + '\n📆️ Today\'s Cases: ' + `${todayCases}` + '\n☣️ Total Deaths: ' + `${deaths}` + '\n☢️ Today\'s Deaths: ' + `${todayDeaths}` + '\n⛩️ Active Cases: ' + `${active}` + '.')
            await limitAdd(serial)
            break
        case prefix+'spamcall':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return tobz.reply(from, 'Gagal, Perintah ini hanya bisa di gunakan dalam group', id)
            if (!isOwner, !isAdmin) return tobz.reply(from, 'Perintah ini hanya untuk Owner & Admin bot', id)
            argz = body.trim().split(' ')
            console.log(...argz[1])
            var slicedArgs = Array.prototype.slice.call(arg, 1);
            console.log(slicedArgs)
            const spam = await slicedArgs.join(' ')
            console.log(spam)
            const call2 = await axios.get('https://tobz-api.herokuapp.com/api/spamcall?no=' + spam + '&apikey=' + tobzkey)
            const { logs } = call2.data
                await tobz.sendText(from, `Logs : ${logs}` + '.')
            break
        case prefix+'ytmp4':
        //if (!isPublic) return tobz.reply(from, mess.public, id)  
            if(isReg(obj)) return
            if(cekumur(cekage)) return
 if (!isPremium) return tobz.reply(from, 'Maaf, ini adalah fitur premium, untuk menggunakan fitur ini silahkan donasi, Kirim !donasi untuk melihat info donasi', id)            
            if (!isGroupMsg) return tobz.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
            if (isLimit(serial)) return tobz.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1) return tobz.reply(from, `Kirim perintah *${prefix}ytmp4 [ Link Yt ]*, untuk contoh silahkan kirim perintah *${prefix}readme*`)
            let isLin = args[1].match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/)
            if (!isLin) return tobz.reply(from, mess.error.Iv, id)
            try {
                tobz.reply(from, mess.wait, id)
                const ytvh = await fetch(`http://api.vhtear.com/ytdl?link=${args[1]}&apikey=${vhtearkey}`)
                if (!ytvh.ok) throw new Error(`Error YTMP4 : ${ytvh.statusText}`)
                const ytvh2 = await ytvh.json()
                 if (ytvh2.status == false) {
                    tobz.reply(from, `*Maaf Terdapat kesalahan saat mengambil data, mohon pilih media lain...*`, id)
                } else {
                    if (Number(ytvh2.result.size.split(' MB')[0]) > 30.00) return tobz.sendFileFromUrl(from, ytvh2.result.imgUrl, 'thumb.jpg', `*「 YOUTUBE MP4 」*\n\n• *Judul* : ${ytvh2.result.title}\n• *Filesize* : ${ytvh2.result.size}\n\n__Maaf, Durasi video melebihi 30 MB. Silahkan download video melalui link dibawah_.\n${ytvh2.result.UrlVideo}`, id)
                    const { title, UrlVideo, imgUrl, size, status, ext } = await ytvh2.result
                    console.log(`VHTEAR : ${ext}\n${size}\n${status}`)
                    tobz.sendFileFromUrl(from, imgUrl, 'thumb.jpg', `*「 YOUTUBE MP4 」*\n\n• *Judul* : ${title}\n• *Filesize* : ${size}\n\n_Silahkan tunggu file media sedang dikirim mungkin butuh beberapa menit_`, id)
                    await tobz.sendFileFromUrl(from, UrlVideo, `${title}.mp4`, '', id).catch(() => tobz.reply(from, mess.error.Yt4, id))
                    await limitAdd(serial)
                }
            } catch (err) {
                tobz.sendText(ownerNumber, 'Error ytmp4 : '+ err)
                tobz.reply(from, 'Jangan download video yang sama dengan sebelumnya!', id)
            }
            break
        case prefix+'play'://silahkan kalian custom sendiri jika ada yang ingin diubah
            if (args.length == 0) return tobz.reply(from, `Untuk mencari lagu dari youtube\n\nPenggunaan: ${prefix}play judul lagu`, id)
            axios.get(`https://arugaytdl.herokuapp.com/search?q=${body.slice(6)}`)
            .then(async (res) => {
                await tobz.sendFileFromUrl(from, `${res.data[0].thumbnail}`, ``, `Lagu ditemukan\n\nJudul: ${res.data[0].title}\nDurasi: ${res.data[0].duration}detik\nUploaded: ${res.data[0].uploadDate}\nView: ${res.data[0].viewCount}\n\nsedang dikirim`, id)
                axios.get(`https://kocakz.herokuapp.com/api/media/ytaudio?url=https://youtu.be/${res.data[0].id}`)
                .then(async(rest) => {
					if (Number(rest.data.filesize.split(' MB')[0]) >= 10.00) return pakforlay.reply(from, 'Maaf ukuran file terlalu besar!')
                    await tobz.sendPtt(from, `${rest.data.result}`, id)
                })
                .catch(() => {
                    tobz.reply(from, 'Ada yang Error!', id)
                })
            })
            .catch(() => {
                tobz.reply(from, 'Ada yang Error!', id)
            })
            break
        case prefix+'ytmp3':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
	 if (!isPremium) return tobz.reply(from, 'Maaf, ini adalah fitur premium, untuk menggunakan fitur ini silahkan donasi, Kirim !donasi untuk melihat info donasi', id)            
            if (!isGroupMsg) return tobz.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
            if (isLimit(serial)) return tobz.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1) return tobz.reply(from, `Kirim perintah *${prefix}ytmp3 [ Link Yt ]*, untuk contoh silahkan kirim perintah *${prefix}readme*`, id)
            let isLinks = args[1].match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/)
            if (!isLinks) return tobz.reply(from, mess.error.Iv, id)
            try {
                tobz.reply(from, mess.wait, id)
                const vhtearyt3 = await fetch(`https://api.vhtear.com/ytdl?link=${args[1]}&apikey=${vhtearkey}`)
                if (!vhtearyt3.ok) throw new Error(`Error YTMP3 : ${vhtearyt3.statusText}`)
                const vhtearyt33 = await vhtearyt3.json()
                 if (vhtearyt33.status == false) {
                    tobz.reply(from, `*Maaf Terdapat kesalahan saat mengambil data, mohon pilih media lain...*`, id)
                } else {
                    if(Number(vhtearyt33.result.size.split(' MB')[0]) >= 10.00) return tobz.sendFileFromUrl(from, vhtearyt33.result.imgUrl, `thumb.jpg`, `*「 YOUTUBE MP3 」*\n\n• *Judul* : ${vhtearyt33.result.title}\n• *Filesize* : ${vhtearyt33.result.size}\n\n_Maaf, Durasi audio melebihi 10 MB. Silahkan download audio melalui link dibawah_.\n${vhtearyt33.result.UrlMp3}`, id)
                    const { title, ext, size, UrlMp3, status, imgUrl } = await vhtearyt33.result
                    console.log(`VhTear Giliran ${ext}\n${size}\n${status}`)
                    const captions = `*「 YOUTUBE MP3 」*\n\n• *Judul* : ${title}\n• *Filesize* : ${size}\n\n_Silahkan tunggu file media sedang dikirim mungkin butuh beberapa menit_`
                    tobz.sendFileFromUrl(from, imgUrl, `thumb.jpg`, captions, id)
                    //await tobz.sendFile(from, UrlMp3, `${title}.mp3`, '', id)
                    await tobz.sendFileFromUrl(from, UrlMp3, `${title}.mp3`, '', id).catch(() => tobz.reply(from, mess.error.Yt4, id))
                    await limitAdd(serial)
                }
            } catch (err) {
                tobz.sendText(ownerNumber, 'Error ytmp3 : '+ err)
                tobz.reply(from, 'Jangan download audio yang sama dengan sebelumnya!', id)
            }
            break
	case prefix+'moddroid':
            if(isReg(obj)) return
            if(cekumur(cekage)) return	
            if (!isGroupMsg) return tobz.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return tobz.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1) return tobz.reply(from, 'Kirim perintah *!moddroid [query]*\nContoh : *!moddroid darling pubg*', id)
            try {
                const moddroid = await axios.get('https://tobz-api.herokuapp.com/api/moddroid?q=' + body.slice(10)  + '&apikey=' + tobzkey)
                if (moddroid.data.error) return tobz.reply(from, moddroid.data.error, id)
                const modo = moddroid.data.result[0]
                const resmod = `• *Title* : ${modo.title}\n• *Publisher* : ${modo.publisher}\n• *Size* : ${modo.size}\n• *MOD Info* : ${modo.mod_info}\n• *Version* : ${modo.latest_version}\n• *Genre* : ${modo.genre}\n• *Link* : ${modo.link}\n• *Download* : ${modo.download}`
                tobz.sendFileFromUrl(from, modo.image, 'MODDROID.jpg', resmod, id)
                await limitAdd(serial)
            } catch (err) {
                console.log(err)
            }
            break
        case prefix+'happymod':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return tobz.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return tobz.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1) return tobz.reply(from, 'Kirim perintah *!happymod [query]*\nContoh : *!happymod darling pubg*', id)
            try {
                const happymod = await axios.get('https://tobz-api.herokuapp.com/api/happymod?q=' + body.slice(10)  + '&apikey=' + tobzkey)
                if (happymod.data.error) return tobz.reply(from, happymod.data.error, id)
                const modo = happymod.data.result[0]
                const resmod = `• *Title* : ${modo.title}\n• *Purchase* : ${modo.purchase}\n• *Size* : ${modo.size}\n• *Root* : ${modo.root}\n• *Version* : ${modo.version}\n• *Price* : ${modo.price}\n• *Link* : ${modo.link}\n• *Download* : ${modo.download}`
                tobz.sendFileFromUrl(from, modo.image, 'HAPPYMOD.jpg', resmod, id)
                await limitAdd(serial)
            } catch (err) {
                console.log(err)
            }
            break
        case prefix+'google':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return tobz.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return tobz.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            tobz.reply(from, mess.wait, id)
            const googleQuery = body.slice(8)
            if(googleQuery == undefined || googleQuery == ' ') return tobz.reply(from, `*Hasil Pencarian : ${googleQuery}* tidak ditemukan`, id)
            google({ 'query': googleQuery }).then(results => {
            let vars = `_*Hasil Pencarian : ${googleQuery}*_\n`
            for (let i = 0; i < results.length; i++) {
                vars +=  `\n═════════════════\n\n*Judul* : ${results[i].title}\n\n*Deskripsi* : ${results[i].snippet}\n\n*Link* : ${results[i].link}\n\n`
            }
                tobz.reply(from, vars, id);
                limitAdd(serial)
            }).catch(e => {
                console.log(e)
                tobz.sendText(ownerNumber, 'Google Error : ' + e);
            })
            break
        case prefix+'translate':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return tobz.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return tobz.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if(args[1] == undefined || args[2] == undefined) return
            if(args.length >= 2){
                var codelang = args[1]
                var textai = body.slice(11+codelang.length);
                translatte(textai, {to: codelang}).then(res => {
                    tobz.sendText(from,res.text);
                    limitAdd(serial)
                }).catch(err => {
                     tobz.sendText(from,`[ERROR] Teks tidak ada, atau kode bahasa ${codelang} tidak support\n~> *${prefix}bahasa* untuk melihat list kode bahasa`);
                });
            }
            break
        case prefix+'gdrive':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return tobz.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
            if (isLimit(serial)) return tobz.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            const regex = new RegExp("\/d\/(.+)\/", 'gi')
            if (!args[1].match(regex)) { await tobz.reply(from, `Url Google Drive Yang Kamu Masukkan Salah!\nContoh : !gdrive https://drive.google.com/file/d/1Cd8KjB9-cUU_Jy8Q/view`, id) }
                const urla = args[1]
                const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
                function niceBytes(x){
                    let l = 0, n = parseInt(x, 10) || 0;
                    while(n >= 1024 && ++l){
                        n = n/1024;
                    }
                    return(n.toFixed(n < 10 && l > 0 ? 1 : 0) + ' ' + units[l]);
                }
                const m = urla.match(regex)
                const fileid = m.toString().trimStart('/', 'd').trim('/');
                const linke = 'https://drive.google.com/file' + fileid + 'view?usp=sharing'
                fetch('https://gdbypass.host/api/?link='+linke)
                    .then((res) => {
                        status = res.status
                        return res.json()
                    })
                    .then(async(body) => {
                        const fileName = body.data.Filename
                        const size = body.data.Filesize
                        const newLink = body.data.NewUnlimitedURL
                        const ling = await urlShortener(newLink)
                            tobz.reply(from, `*「 GOOGLE DRIVE 」*\n\n• *Nama File :* ${fileName}\n*• File Size :* ${niceBytes(size)}\n*• Short Link :* ${ling}`, id)
                            limitAdd(serial)
                    })
                    .catch((err) => {
                        tobz.reply(from, `Maaf, Sepertinya Link Tidak Berhasil Di Bypass\n` + err, id)
                    })
            break
        case prefix+'xnxx':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return tobz.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (!isNsfw) return tobz.reply(from, 'command/Perintah NSFW belum di aktifkan di group ini!', id)
            if (isLimit(serial)) return tobz.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1) return tobz.reply(from, 'Kirim perintah *!xnxx [linkXnxx]*, untuk contoh silahkan kirim perintah *!readme*')
            if (!args[1].match(isUrl) && !args[1].includes('xnxx.com')) return tobz.reply(from, mess.error.Iv, id)
            try {
                tobz.reply(from, mess.wait, id)
                const resq = await axios.get('http://melodicxt.herokuapp.com/api/xnxx-downloader?url='+ args[1] +'&apiKey='+ melodickey)
                const resp = resq.data
                 if (resp.error) {
                    tobz.reply(from, ytvv.error, id)
                } else {
                    if (Number(resp.result.size.split(' MB')[0]) > 20.00) return tobz.reply(from, 'Maaf durasi video sudah melebihi batas maksimal 20 menit!', id)
                    tobz.sendFileFromUrl(from, resp.result.thumb, 'thumb.jpg', `➸ *Judul* : ${resp.result.judul}\n➸ *Deskripsi* : ${resp.result.desc}\n➸ *Filesize* : ${resp.result.size}\n\nSilahkan tunggu sebentar proses pengiriman file membutuhkan waktu beberapa menit.`, id)
                    await tobz.sendFileFromUrl(from, resp.result.vid, `${resp.result.title}.mp4`, '', id)}
                    await limitAdd(serial)
            } catch (err) {
                console.log(err)
                await tobz.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Maaf, Video tidak ditemukan')
                tobz.sendText(ownerNumber, 'Xnxx Error : ' + err)
            }
            break
        case prefix+'ramalpasangan':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return tobz.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return tobz.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1) return tobz.reply(from, 'Kirim perintah *!ramalpasangan [kamu|pasangan]*\nContoh : *!ramalpasangan Rey|Emeilia*', id)
            argz = body.trim().split('|')
            if (argz.length >= 2) {
            tobz.reply(from, mess.wait, id)
            const kamu = argz[0]
            const pacar = argz[1]
            const rpmn = rate[Math.floor(Math.random() * (rate.length))]
            const rpmn2 = rate[Math.floor(Math.random() * (rate.length))]
            const rpmn3 = rate[Math.floor(Math.random() * (rate.length))]
            const rpmn4 = rate[Math.floor(Math.random() * (rate.length))]
            const rpmn5 = rate[Math.floor(Math.random() * (rate.length))]
            const rpmn6 = rate[Math.floor(Math.random() * (rate.length))]
            const rjh2 = `*Hasil Pengamatan!*\nPasangan dengan nama ${kamu} dan ${pacar}\n\n➸ Cinta : ${rpmn}\n➸ Jodoh : ${rpmn2}\n➸ Kemiripan : ${rpmn3}\n➸ Kesukaan : ${rpmn4}\n➸ Kesamaan : ${rpmn5}\n➸ Kebucinan ${rpmn6}`
            tobz.reply(from, rjh2, id)
            limitAdd(serial)
            } else {
            await tobz.reply(from, 'Wrong Format!', id)
            }
            break
	case prefix+'cekjodoh':
			if (args.length !== 2) return tobz.reply(from, `Untuk mengecek jodoh melalui nama\nketik: ${prefix}cekjodoh nama-kamu nama-pasangan\n\ncontoh: ${prefix}cekjodoh bagas siti\n\nhanya bisa pakai nama panggilan (satu kata)`)
			rugaapi.cekjodoh(args[0],args[1])
			.then(async(res) => {
				await tobz.sendFileFromUrl(from, `${res.link}`, '', `${res.text}`, id)
			})
			break
        case prefix+'artinama':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
                if (!isGroupMsg) return tobz.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
            if (isLimit(serial)) return tobz.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1) return tobz.reply(from, `Kirim perintah *${prefix}artinama [ Query ]*\nContoh : *${prefix}artinama Tobz*`, id)
                    try {   
	 const anm_ = body.slice(6)
            const resp = await axios.get(`https://kocakz.herokuapp.com/api/primbon/artinama?name=${anm_}`)
            if (resp.data.error) return tobz.reply(from, resp.data.error, id)
            const anm2 = `*「 ARTI NAMA 」*\n\n• Artinama : ${resp.data.result.hasil}`
            tobz.reply(from, anm2, id)
            await limitAdd(serial)
            } catch (err) {
                console.error(err.message)
                await tobz.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Maaf, User tidak ditemukan')
                tobz.sendText(ownerNumber, 'Artinama Error : ' + err)
           }
            break
        case prefix+'zodiak':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return tobz.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return tobz.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1) return tobz.reply(from, 'Kirim perintah *!zodiak [zodiak kamu]*\nContoh : *!zodiak scorpio*', id)
            try {
            const resp = await axios.get('https://api.vhtear.com/zodiak?query=' + body.slice(8) + '&apikey=' + vhtearkey)
            if (resp.data.error) return tobz.reply(from, resp.data.error, id)
            const anm2 = `➸ Zodiak : ${resp.data.result.zodiak}\n➸ Ramalan : ${resp.data.result.ramalan}\n➸ Nomor Keberuntungan : ${resp.data.result.nomorKeberuntungan}\n➸ Motivasi : ${resp.data.result.motivasi}\n➸ Inspirasi : ${resp.data.result.inspirasi}`
            tobz.reply(from, anm2, id)
            limitAdd(serial)
            } catch (err) {
                console.error(err.message)
                await tobz.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Maaf, Zodiak tidak ditemukan')
                tobz.sendText(ownerNumber, 'Zodiak Error : ' + err)
           }
           break
        case prefix+'caklontong':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return tobz.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return tobz.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            try {
            const resp = await axios.get('https://api.vhtear.com/funkuis&apikey=' + vhtearkey)
            if (resp.data.error) return tobz.reply(from, resp.data.error, id)
            const anm2 = `➸ Soal : ${resp.data.result.soal}\n➸ Deskripsi : ${resp.data.result.desk}\n➸ Poin : ${resp.data.result.poin}`
            const jwban = `➸ Jawaban : ${resp.data.result.jawaban}`
            tobz.reply(from, anm2, id)
            tobz.sendText(from, `30 Detik Lagi...`, id)
            await sleep(10000)
            tobz.sendText(from, `20 Detik Lagi...`, id)
            await sleep(10000)
            tobz.sendText(from, `10 Detik Lagi...`, id)
            await sleep(10000)
            tobz.reply(from, jwban, id)
            limitAdd(serial)
            } catch (err) {
                console.error(err.message)
                await tobz.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Maaf, Soal Quiz tidak ditemukan')
                tobz.sendText(ownerNumber, 'Zodiak Error : ' + err)
           }
           break
         case prefix+'tebakgambar':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return tobz.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return tobz.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            try {
            const resp = await axios.get('https://api.vhtear.com/tebakgambar&apikey=' + vhtearkey)
            if (resp.data.error) return tobz.reply(from, resp.data.error, id)
            const jwban = `➸ Jawaban : ${resp.data.result.jawaban}`
            tobz.sendFileFromUrl(from, resp.data.result.soalImg, 'tebakgambar.jpg', '_Silahkan Jawab Maksud Dari Gambar Ini_', id)
            tobz.sendText(from, `60 detik Lagi...`, id)
            await sleep(10000)
            tobz.sendText(from, `50 Detik Lagi...`, id)
            await sleep(10000)
            tobz.sendText(from, `40 Detik Lagi...`, id)
            await sleep(10000)
            tobz.sendText(from, `30 Detik Lagi...`, id)
            await sleep(10000)
            tobz.sendText(from, `20 Detik Lagi...`, id)
            await sleep(10000)
            tobz.sendText(from, `10 Detik Lagi...`, id)
            await sleep(10000)
            tobz.reply(from, jwban, id)
            limitAdd(serial)
            } catch (err) {
                console.error(err.message)
                await tobz.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Maaf, Soal Quiz tidak ditemukan')
                tobz.sendText(ownerNumber, 'Tebak Gambar Error : ' + err)
           }
           break
         case prefix+'family100':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return tobz.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return tobz.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            try {
            const resp = await axios.get('https://api.vhtear.com/family100&apikey=' + vhtearkey)
            if (resp.data.error) return tobz.reply(from, resp.data.error, id)
            const anm2 = `➸ Soal : ${resp.data.result.soal}\n_Silahkan DiJawab_`
            const jwban = `➸ Jawaban : ${resp.data.result.jawaban}`
            tobz.reply(from, anm2, id)
            tobz.sendText(from, `30 Detik Lagi...`, id)
            await sleep(10000)
            tobz.sendText(from, `20 Detik Lagi...`, id)
            await sleep(10000)
            tobz.sendText(from, `10 Detik Lagi...`, id)
            await sleep(10000)
            tobz.reply(from, jwban, id)
            limitAdd(serial)
            } catch (err) {
                console.error(err.message)
                await tobz.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Maaf, Soal Quiz tidak ditemukan')
                tobz.sendText(ownerNumber, 'Family100 Error : ' + err)
           }
           break
        case prefix+'heroml':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return tobz.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return tobz.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1) return tobz.reply(from, 'Kirim perintah *!heroml [nama hero]*\nContoh : *!heroml akai*', id)
            try {
            const resp = await axios.get('https://api.vhtear.com/herodetail?query=' + body.slice(8) + '&apikey=' + vhtearkey)
            if (resp.data.error) return tobz.reply(from, resp.data.error, id)
            const anm2 = `➸ Title : ${resp.data.result.title}\n➸ Quotes : ${resp.data.result.quotes}\n➸ Info : ${resp.data.result.info}\n➸ Atribut : ${resp.data.result.attributes}`
            tobz.sendFileFromUrl(from, resp.data.result.pictHero, 'hero.jpg', anm2, id)
            limitAdd(serial)
            } catch (err) {
                console.error(err.message)
                await tobz.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Maaf, Hero tidak ditemukan')
                tobz.sendText(ownerNumber, 'Heroml Error : ' + err)
           }
            break
        case prefix+'logoff':
            if (args.length == 0) return tobz.reply(from, `kirim perintah ${prefix}logoff [nama]`, id)
            tobz.reply(from, mess.wait, id)
            const jadiin = body.slice(8)
            const hero = ["alok", "alvaro", "andrew", "antonio", "caroline", "ford", "hayato", "joseph", "kelly", "lhanz", "maxim", "miguel", "misa", "moco", "nikita", "notora", "olivia", "paloma", "rafael", "shani", "steffie", "wukong"]
            let awikxs = hero[Math.floor(Math.random() * hero.length)]
            tobz.sendFileFromUrl(from, `https://api.vhtear.com/logoff?hero=${awikxs}&text=${jadiin}&apikey=${vhtearkey}`, `${jadiin}.jpg`, 'nehh ngab...', id)
            break
        case prefix+'nomorhoki':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return tobz.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return tobz.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1) return tobz.reply(from, 'Kirim perintah *!nomorhoki [no hp kamu]*\nContoh : *!nomorhoki 0895384009405*', id)
            try {
            const resp = await axios.get('https://api.vhtear.com/nomerhoki?no=' + body.slice(11) + '&apikey=' + vhtearkey)
            if (resp.data.error) return tobz.reply(from, resp.data.error, id)
            const anm2 = `➸ Hasil :\n ${resp.data.result.hasil}`
            tobz.reply(from, anm2, id)
            limitAdd(serial)
            } catch (err) {
                console.error(err.message)
                await tobz.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Maaf, Nomor Hoki tidak ditemukan')
                tobz.sendText(ownerNumber, 'Nomorhoki Error : ' + err)
           }
            break
        case prefix+'artimimpi':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return tobz.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return tobz.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1) return tobz.reply(from, 'Kirim perintah *!artimimpi [mimpi]*\nContoh : *!artimimpi ular*', id)
            try {
            const resp = await axios.get('https://api.vhtear.com/artimimpi?query=' + body.slice(10) + '&apikey=' + vhtearkey)
            if (resp.data.error) return tobz.reply(from, resp.data.error, id)
            const anm2 = `➸ Artimimpi : ${resp.data.result.hasil}`
            tobz.reply(from, anm2, id)
            limitAdd(serial)
            } catch (err) {
                console.error(err.message)
                await tobz.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Maaf, Mimpi tidak ditemukan')
                tobz.sendText(ownerNumber, 'Artimimpi Error : ' + err)
           }
            break
        case prefix+'wiki':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return tobz.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return tobz.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1) return tobz.reply(from, `Kirim perintah *!wiki [ Query ]*\nContoh : *!wiki asu*`, id)
            const queryz_ = body.slice(6)
            const wiki = await axios.get(`https://api.vhtear.com/wikipedia?query=${queryz_}&apikey=${vhtearkey}`)
            if (wiki.data.error) {
                tobz.reply(from, wiki.data.error, id)
            } else {
                tobz.sendFileFromUrl(from, wiki.data.result.ImgResult, '', `*「 WIKI 」*\n\n➸ *Query* : ${queryz_}\n\n➸ *Result* : ${wiki.data.result.Info}`, id)
                await limitAdd(serial)
            }
		break
        case prefix+'kbbi':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return tobz.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return tobz.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1) return tobz.reply(from, `Kirim perintah *!kbbi [ Query ]*\nContoh : *!kbbi asu*`, id)
            const kbbl = body.slice(6)
            const kbbl2 = await axios.get(`https://api.vhtear.com/kbbi?query=${kbbl}&apikey=${vhtearkey}`)

            if (kbbl2.data.error) {
                tobz.reply(from, kbbl2.data.error, id)
            } else {
                tobz.sendText(from, `*「 KBBI 」*\n\n➸ *Query* : ${kbbl}\n\n➸ *Result* : ${kbbl2.data.result.hasil}`, id)
                await limitAdd(serial)
            }
            break
        case prefix+'googleimages':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return tobz.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return tobz.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            argz = body.trim().split('|')
            if (argz.length >= 2) {
            const qwery = argz[1]
            const jum = argz[2]
            if(!qwery) return await tobz.reply(from, `Kirim perintah *!googleimage [ |Query|Jumlah ]*, contoh = !googleimage |loli|3`, id)
            if(!jum) return await tobz.reply(from, `Jumlah gambar diperlukan, contoh = !googleimage |loli|3`, id)
            if(jum >= 5) return await tobz.reply(from, 'Jumlah terlalu banyak! Max 4', id)
            var gis = require('g-i-s');
            var opts = {
                searchTerm: qwery
                };
                gis(opts, logResults);
                    
                function logResults(error, results) {
                    if (error) {
                        tobz.reply(from, 'Maaf, Fitur Sedang Error', id)
                    } else {
                        const item = results.slice(0, jum)
                        item.forEach(async(res) => {
                        console.log(res)
                        const yurl = await urlShortener(res.url)
                        tobz.sendImage(from, res.url, null, `➸ Link : ${yurl}\n➸ Image size : ${res.height} x ${res.width}`)  
                        limitAdd(serial) 
                        })
                    }
                }
            }
            break
        case prefix+'sandwriting': 
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return tobz.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return tobz.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1)  return tobz.reply(from, 'Kirim perintah *!sandwriting [ Teks ]*\nContoh *!sandwriting Emeilia Cantik*', id)
            const swrt = body.slice(13)
            try {
            const swrt2 = await axios.get('https://api.vhtear.com/sand_writing?text1=' + swrt + '&apikey=' + vhtearkey)
            const { imgUrl } = swrt2.data.result
            const swrt3 = `*「 SAND WRITING 」*

*Text : ${swrt}*`
            const pictk = await bent("buffer")(imgUrl)
            const base64 = `data:image/jpg;base64,${pictk.toString("base64")}`
            tobz.sendImage(from, base64, swrt3)
            await limitAdd(serial)
            } catch (err) {
             console.error(err.message)
             await tobz.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Maaf, User tidak ditemukan')
             tobz.sendText(ownerNumber, 'Sand Writing Error : ' + err)
           }
          break
         case prefix+'tahta':
             if(isReg(obj)) return
             if(cekumur(cekage)) return
             if (!isGroupMsg) return tobz.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
             if (isLimit(serial)) return tobz.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
             const jreng = body.slice(7)
             if (!jreng) return tobz.reply(from, 'Kirim perintah *!tahta [teks]*\n\nContoh *!tahta emeilia*', id)
             if (jreng.length > 7) return tobz.reply(from, 'Maksimal 7 Huruf!', id)
             tobz.sendText(from, '_Sedang diproses, mohon tunggu sebentar!..._', id)
             await tobz.sendFileFromUrl(from, `https://api.vhtear.com/hartatahta?text=${jreng}&apikey=${vhtearkey}`,`${jreng}.jpg`,`Harta Tahta ${jreng}`, id)        
             await limitAdd(serial)
             break
        case prefix+'resepmasakan':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return tobz.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return tobz.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1)  return tobz.reply(from, 'Kirim perintah *!resepmasakan [optional]*\nContoh *!resepmasakan rawon*', id)
            argz= body.trim().split(' ')
            console.log(...argz[1])
            var slicedArgs = Array.prototype.slice.call(arg, 1);
            console.log(slicedArgs)
            const rmk = await slicedArgs.join(' ')
            console.log(rmk)
            try {
            const resp = await axios.get('https://api.vhtear.com/resepmasakan?query=' + rmk + '&apikey=' + vhtearkey)
            const { bahan, cara, image, title  } = resp.data.result
            const rmk3 = `*Resep Ditemukan!*
➸ *Judul:* ${title}
➸ *Bahan:* ${bahan}
➸ *Cara:* ${cara}`

            const pictk = await bent("buffer")(image)
            const base64 = `data:image/jpg;base64,${pictk.toString("base64")}`
            tobz.sendImage(from, base64, title, rmk3)
            await limitAdd(serial)
            } catch (err) {
             console.error(err.message)
             await tobz.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Maaf, Resep tidak ditemukan')
             tobz.sendText(ownerNumber, 'Resepmasakan Error : ' + err)
           }
           break
        case prefix+'twitterstalk':
        case prefix+'twtstalk':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return tobz.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return tobz.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1)  return tobz.reply(from, 'Kirim perintah *!twtstalk @username*\nContoh *!twtstalk @miakhalifah*', id)
            argz = body.trim().split(' ')
            console.log(...argz[1])
            var slicedArgs = Array.prototype.slice.call(arg, 1);
            console.log(slicedArgs)
            const twstalk = await slicedArgs.join(' ')
            console.log(twstalk)
            try {
            const twstalk2 = await axios.get('http://melodicxt.herokuapp.com/api/twtprofile?user=' + twstalk + '&apiKey=' + melodickey)
            const { created_at, user } = twt.result[0]
	    const twtz = `*「 TWITTER PROFILE 」*

• *Username:* @${user.screen_name}
• *Nama:* ${user.name}
• *Deskripsi:* ${user.description}
• *Pengikut:* ${user.followers_count}
• *Mengikuti*: ${user.friends_count}
• *Jumlah Favorite:* ${user.favourites_count}
• *Jumlah Status:* ${user.statuses_count}
• *Dibuat:* ${created_at}
• *Link:* https://twitter.com/${user.screen_name}`

            const pictk = await bent("buffer")(user.profile_image_url)
            const base64 = `data:image/jpg;base64,${pictk.toString("base64")}`
            tobz.sendImage(from, base64, name, twtz)
            await limitAdd(serial)
            } catch (err) {
             console.error(err.message)
             await tobz.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Maaf, User tidak ditemukan')
             tobz.sendText(ownerNumber, 'Twitter Error : ' + err)
           }
          break
        case prefix+'igstalk':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return tobz.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return tobz.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1)  return tobz.reply(from, 'Kirim perintah *!igstalk @username*\nContoh *!igstalk duar_amjay*', id)
            argz = body.trim().split(' ')
            console.log(...argz[1])
            var slicedArgs = Array.prototype.slice.call(arg, 1);
            console.log(slicedArgs)
            const istalk = await slicedArgs.join(' ')
            console.log(istalk)
            try {
            const istalk2 = await axios.get('https://api.vhtear.com/igprofile?query=' + istalk + '&apikey=' + vhtearkey)
            const { username, biography, follow, follower, full_name, picture, post_count, is_private } = istalk2.result
	    const istalk3 = `*「 INSTAGRAM PROFILE 」*

• *Username:* @${username}
• *Nama:* ${full_name}
• *Deskripsi:* ${biography}
• *Pengikut:* ${follower}
• *Mengikuti*: ${follow}
• *Jumlah Postingan:* ${post_count}
• *Private:* ${is_private}
• *Link:* https://instagram.com/${username}`
            
            const pictk = await bent("buffer")(picture)
            const base64 = `data:image/jpg;base64,${pictk.toString("base64")}`
            tobz.sendImage(from, base64, username, istalk3)
            await limitAdd(serial)
            } catch (err) {
             console.error(err.message)
             await tobz.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Maaf, User tidak ditemukan')
             tobz.sendText(ownerNumber, 'Igstalk Error : ' + err)
           }
          break
        case prefix+'tiktokstalk':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return tobz.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return tobz.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1)  return tobz.reply(from, 'Kirim perintah *!tiktokstalk @username*\nContoh *!tiktokstalk @duar_amjay*', id)
            argz = body.trim().split(' ')
            console.log(...argz[1])
            var slicedArgs = Array.prototype.slice.call(arg, 1);
            console.log(slicedArgs)
            const tstalk = await slicedArgs.join(' ')
            console.log(tstalk)
            try {
            const tstalk2 = await axios.get('https://api.vhtear.com/tiktokprofile?query=' + tstalk + '&apikey=' + vhtearkey)
            const { username, bio, follow, follower, title, like_count, video_post, description, picture, url_account } = tstalk2.data.result
            const tiktod = `*User Ditemukan!*
➸ *Username:* ${username}
➸ *Judul:* ${title}
➸ *Bio:* ${bio}
➸ *Mengikuti:* ${follow}
➸ *Pengikut:* ${follower}
➸ *Jumlah Like*: ${like_count}
➸ *Jumlah Postingan:* ${video_post}
➸ *Deskripsi:* ${description}
➸ *Link:* ${url_account}`

            const pictk = await bent("buffer")(picture)
            const base64 = `data:image/jpg;base64,${pictk.toString("base64")}`
            tobz.sendImage(from, base64, title, tiktod)
            await limitAdd(serial)
            } catch (err) {
             console.error(err.message)
             await tobz.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Maaf, User tidak ditemukan')
             tobz.sendText(ownerNumber, 'Error Tiktokstalk : '+ err)
           }
          break
        case prefix+'smulestalk':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return tobz.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return tobz.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1) return tobz.reply(from, 'Kirim perintah *!smulestalk [@username]*\nContoh : *!smulestalk loli*', id)
            argz = body.trim().split(' ')
            console.log(...argz[1])
            var slicedArgs = Array.prototype.slice.call(arg, 1);
            console.log(slicedArgs)
            const sstalk = await slicedArgs.join(' ')
            console.log(sstalk)
            try {
            const sstalk2 = await axios.get('https://api.vhtear.com/smuleprofile?query=' + sstalk + '&apikey=' + vhtearkey)
            const { username, full_name, follower, follow, biography, is_vip, picture, recording } = sstalk2.data.result
            const smule = `*User Ditemukan!*
➸ *Username:* ${username}
➸ *Full Name:* ${title}
➸ *Biografi:* ${biography}
➸ *Mengikuti:* ${follow}
➸ *Pengikut:* ${follower}
➸ *VIP*: ${is_vip}
➸ *Total Rekaman:* ${recording}`

            const pictk = await bent("buffer")(picture)
            const base64 = `data:image/jpg;base64,${pictk.toString("base64")}`
            tobz.sendImage(from, base64, title, smule)
            await limitAdd(serial)
            } catch (err) {
             console.error(err.message)
             await tobz.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Maaf, User tidak ditemukan')
             tobz.sendText(ownerNumber, 'Error Smulestalk : '+ err)
            }
          break
        case prefix+'':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return tobz.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (!isSimi) return tobz.reply(from, 'command/Perintah Simi belum di aktifkan di group ini!', id)
            if (args.length === 1) return tobz.reply(from, 'Kirim perintah *! [teks]*\nContoh : *! halo*')
            const que = body.slice(2)
            const sigo = await axios.get(`http://simsumi.herokuapp.com/api?text=${que}&lang=id`)
            const sigot = sigo.data
            tobz.reply(from, sigot.success, id)
            console.log(sigot)
            break
        case prefix+'mining':
             if(isReg(obj)) return
            if (isLimit(serial)) return tobz.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (!isEventon) return tobz.reply(from, `maaf ${pushname} event mining tidak di aktifkan oleh owner`, id)
             if (isOwner) {
                    const one = 999999999
                      addLevelingXp(sender, one)
                      addLevelingLevel(sender, 99)
                      tobz.reply(from, `karena anda owner kami dari team bot mengirim ${one}Xp untuk anda`, id)
                      }else{
                      const mining = Math.ceil(Math.random() * 10000)
                      addLevelingXp(sender, mining)
                      await tobz.reply(from, `*selamat* ${pushname} kamu mendapatkan *${mining}Xp*`, id)
                      }
                    await limitAdd(sender)
        case prefix+'ig': 
        case prefix+'instagram':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (isLimit(serial)) return tobz.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1) return tobz.reply(from, `Kirim perintah *!ig [ Link Instagram ]* untuk contoh silahkan kirim perintah *!readme*`)
            if (!args[1].match(isUrl) && !args[1].includes('instagram.com')) return tobz.reply(from, `Maaf, link yang kamu kirim tidak valid. [Invalid Link]`, id)
            await tobz.reply(from, mess.wait, id);
            instagram(args[1]).then(async(res) => {
                for (let i = 0; i < res.result.result.length; i++) {
		    if (res.result.result[i].includes('.mp4')) {
                    	var ext = '.mp4'
                    } else {
                        var ext = '.jpg'
               	    }
		    tobz.sendFileFromUrl(from, res.result.result[i], `ig.${ext}`, `*「 INSTAGRAM 」*`, id);
                    limitAdd(serial)
                }
            }).catch((err) => {
                console.log(err);
                tobz.reply(from, `Maaf, Terjadi Kesalahan`, id)
            })
            break
        case prefix+'fb':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return tobz.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
            if (isLimit(serial)) return tobz.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1) return tobz.reply(from, `Kirim perintah *!fb [ Link Fb ]*\nContoh : *!fb https://www.facebook.com/24609282673/posts/10158628585367674/*`, id)
            tobz.reply(from, mess.wait, id)
            facebook(args[1]).then(async(res) => {
                let { VideoUrl } = await res
                const epbe2 = `*「 FACEBOOK DOWNLOADER 」*\n➸ *Aplikasi*: Facebook\n\n_Silahkan tunggu sebentar proses pengiriman file membutuhkan waktu beberapa menit._`
                tobz.sendFileFromUrl(from, VideoUrl, `Facebook.mp4`, epbe2, id)
                await limitAdd(serial)
            }).catch((err) => {
                console.log(err);
                tobz.reply(from, `Maaf, Terjadi Kesalahan`, id)
            })
            break
        case prefix+'waktu':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (isLimit(serial)) return tobz.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            await tobz.sendText(from, `Waktu Indonesia Barat: *${moment().utcOffset('+0700').format('HH:mm')}* WIB \nWaktu Indonesia Tengah: *${moment().utcOffset('+0800').format('HH:mm')}* WITA \nWaktu Indonesia Timur: *${moment().utcOffset('+0900').format('HH:mm')}* WIT`)
            await limitAdd(serial)
            break
        case prefix+'tiktok':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return tobz.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return tobz.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1) return tobz.reply(from, 'Kirim perintah *!tiktok [linkTiktok]*\nContoh : *!tiktok https://vt.tiktok.com/yqyjPX/*', id)
            tobz.reply(from, mess.wait, id)
            tiktok(args[1]).then(async(res) => {
                let { video, title, image, desk, dibuat, duration } = await res
                let ttiktok = `*「 TIKTOK DOWNLOADER 」*\n\n➸ *Judul* : ${title}\n➸ Deskripsi : ${desk}\n➸ Durasi : ${duration}\n➸ Dibuat : ${dibuat}\n\n_Silahkan tunggu sebentar proses pengiriman file membutuhkan waktu beberapa menit._`
                tobz.sendFileFromUrl(from, image, 'thumb.jpg', ttiktok, id)
                await tobz.sendFileFromUrl(from, video, `${title}.mp4`, '', id).catch(() => tobz.reply(from, mess.error.Yt4, id))
                await limitAdd(serial)
            }).catch((err) => {
                console.log(err);
                tobz.reply(from, `Maaf, Terjadi Kesalahan`, id)
            })
            break
        case prefix+'smule':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return tobz.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return tobz.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1) return tobz.reply(from, 'Kirim perintah *!smule [linkSmule]*\nContoh : *!smule https://www.smule.com/p/767512225_3062360163*', id)
            tobz.reply(from, mess.wait, id)
            smule(args[1]).then(async(res) => {
                let { Type, title, url, image } = await res
                let tsmule = `*「 SMULE DOWNLOADER 」*\n\n➸ *Judul* : ${title}\n➸ *Type:* ${Type}\n\n_Silahkan tunggu sebentar proses pengiriman file membutuhkan waktu beberapa menit._`
                tobz.sendFileFromUrl(from, image, 'thumb.jpg', tsmule, id)
                await tobz.sendFileFromUrl(from, url, `${title}.mp3`, '', id).catch(() => tobz.reply(from, mess.error.Yt4, id))
                await limitAdd(serial)
            }).catch((err) => {
                console.log(err);
                tobz.reply(from, `Maaf, Terjadi Kesalahan`, id)
            })
            break
        case prefix+'starmaker':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return tobz.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return tobz.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1) return tobz.reply(from, 'Kirim perintah *!starmaker [linkStarmaker]* untuk contoh silahkan kirim perintah *!readme*')
            tobz.reply(from, mess.wait, id)
            starmaker(args[1]).then(async(res) => {
                let { image, desc, url, title } = await res
                let tstarmaker = `*「 STARMAKER DOWNLOADER 」*\n\n➸ *Judul* : ${title}\n➸ *Deskripsi:* ${desc}\n\n_Silahkan tunggu sebentar proses pengiriman file membutuhkan waktu beberapa menit._`
                tobz.sendFileFromUrl(from, image, 'thumb.jpg', tstarmaker, id)
                await tobz.sendFileFromUrl(from, url, `${title}.mp3`, '', id).catch(() => tobz.reply(from, mess.error.Yt4, id))
                await limitAdd(serial)
            }).catch((err) => {
                console.log(err);
                tobz.reply(from, `Maaf, Terjadi Kesalahan`, id)
            })
            break
        case prefix+'twitter':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return tobz.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
            if (isLimit(serial)) return tobz.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1) return tobz.reply(from, `Kirim perintah *!twitter [ Link Twitter ]* untuk contoh silahkan kirim perintah *!readme*`)
            tobz.reply(from, mess.wait, id)
            twitter(args[1]).then(async(res) => {
                let { desk, urlVideo } = await res
                let ttwitter = `*「 TWITTER DOWNLOADER 」*\n\n➸ *Aplikasi:* Twitter\n➸ *Deskripsi:* ${desk}\n\n_Silahkan tunggu sebentar proses pengiriman file membutuhkan waktu beberapa menit._`
                await tobz.sendFileFromUrl(from, urlVideo, `twit.mp3`, ttwitter, id).catch(() => tobz.reply(from, mess.error.Yt4, id))
                await limitAdd(serial)
            }).catch((err) => {
                console.log(err);
                tobz.reply(from, `Maaf, Terjadi Kesalahan`, id)
            })
            break
        case prefix+'maps':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return tobz.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return tobz.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1) return tobz.reply(from, 'Kirim perintah *!maps [optional]*, Contoh : *!maps Jakarta*')
            argz = body.trim().split(' ')
            console.log(...argz[1])
            var slicedArgs = Array.prototype.slice.call(arg, 1);
            console.log(slicedArgs)
            const mapz = await slicedArgs.join(' ')
            console.log(mapz)
            try {
            const mapz2 = await axios.get('https://mnazria.herokuapp.com/api/maps?search=' + mapz)
            const { gambar } = mapz2.data
            const pictk = await bent("buffer")(gambar)
            const base64 = `data:image/jpg;base64,${pictk.toString("base64")}`
            tobz.sendImage(from, base64, 'maps.jpg', `*Hasil Maps : ${mapz}*`)
            limitAdd(serial)
            } catch (err) {
             console.error(err.message)
             await tobz.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Maaf, User tidak ditemukan')
             tobz.sendText(ownerNumber, 'Error Maps : '+ err)
           }
          break
        case prefix+'fancytext':
            if (args.length == 1)  return tobz.reply(from, 'Kirim perintah *!fancytext textnya', id)
            const fancynya = await fetch(`https://kocakz.herokuapp.com/api/random/text/fancytext?text=${body.slice(11)}`)
            const fancy = await fancynya.json()
            tobz.reply(from, fancy.result, id)
            break
        case prefix+'joox':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
 if (!isPremium) return tobz.reply(from, 'Maaf, ini adalah fitur premium, untuk menggunakan fitur ini silahkan donasi, Kirim !donasi untuk melihat info donasi', id)            
            if (!isGroupMsg) return tobz.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
            if (isLimit(serial)) return tobz.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            tobz.reply(from, mess.wait, id)
            if (args.length === 1) return tobz.reply(from, `Kirim perintah *!joox [ Optional ]*\nContoh : *!joox Alan Walker*`, id)
            tobz.reply(from, mess.wait, id)
            joox(args[1]).then(async(res) => {
                let { penyanyi, judul, album, linkImg, linkMp3, filesize, ext, duration } = await res
                let tjoox = `*「 JOOX DOWNLOADER 」*\n\n➸ *Penyanyi:* ${penyanyi}\n➸ *Judul:* ${judul}\n➸ *Album:* ${album}\n➸ *Ext:* ${ext}\n➸ *Size:* ${filesize}\n➸ *Durasi:* ${duration}\n\n_Silahkan tunggu sebentar proses pengiriman file membutuhkan waktu beberapa menit._`
                tobz.sendImage(from, linkImg, judul, tjoox)
                tobz.sendFileFromUrl(from, linkMp3, `${judul}.${ext}`, '', id).catch(() => tobz.reply(from, mess.error.Yt4, id))
                await limitAdd(serial)
            }).catch((err) => {
                console.log(err);
                tobz.reply(from, `Maaf, Terjadi Kesalahan`, id)
            })
            break
        case prefix+'checkip':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return tobz.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return tobz.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1) return tobz.reply(from, 'Kirim perintah *!checkip [ipaddress]*\nContoh : *!checkip 182.0.144.145*', id)
            tobz.reply(from, mess.wait, id)
            argz = body.trim().split(' ')
            console.log(...argz[1])
            var slicedArgs = Array.prototype.slice.call(arg, 1);
            console.log(slicedArgs)
            const cekip = await slicedArgs.join(' ')
            console.log(cekip)
            try {
            const cekip2 = await axios.get('https://mnazria.herokuapp.com/api/check?ip=' + cekip)
            const { city, continent_name, country_name, ip, latitude, location, longitude, region_name } = cekip2.data
            const cekip3 = `*User Ditemukan!*

➸ *Kota:* ${city}
➸ *Benua:* ${continent_name}
➸ *Negara:* ${country_name}
➸ *Ip Address:* ${ip}
➸ *Garis Lintang:* ${latitude}
➸ *Kode Telepon:* +${location.calling_code}
➸ *Ibu Kota:* +${location.capital}
➸ *Bahasa:* +${location.languages[0].name}
➸ *Garis Bujur:* ${longitude}
➸ *Wilayah:* +${region_name}`

            const pictk = await bent("buffer")(location.country_flag)
            const base64 = `data:image/jpg;base64,${pictk.toString("base64")}`
            tobz.sendImage(from, base64, city, cekip3)
            await limitAdd(serial)
            } catch (err) {
             console.error(err.message)
             await tobz.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Maaf, User tidak ditemukan')
             tobz.sendText(ownerNumber, 'Error Check IP : '+ err)
           }
          break
        case prefix+'nhentai':
        case prefix+'nh':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return tobz.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (!isNsfw) return tobz.reply(from, 'command/Perintah NSFW belum di aktifkan di group ini!', id)
            if (args.length === 2) {
                const nuklir = body.split(' ')[1]
                tobz.reply(from, mess.wait, id)
                const cek = await nhentai.exists(nuklir)
                if (cek === true)  {
                    try {
                        const api = new API()
                        const pic = await api.getBook(nuklir).then(book => {
                            return api.getImageURL(book.cover)
                        })
                        const dojin = await nhentai.getDoujin(nuklir)
                        const { title, details, link } = dojin
                        const { parodies, tags, artists, groups, languages, categories } = await details
                        var teks = `*Title* : ${title}\n\n*Parodies* : ${parodies}\n\n*Tags* : ${tags.join(', ')}\n\n*Artists* : ${artists.join(', ')}\n\n*Groups* : ${groups.join(', ')}\n\n*Languages* : ${languages.join(', ')}\n\n*Categories* : ${categories}\n\n*Link* : ${link}`
                        exec('nhentai --id=' + nuklir + ` -P mantap.pdf -o ./hentong/${nuklir}.pdf --format `+ `${nuklir}.pdf`, (error, stdout, stderr) => {
                            tobz.sendFileFromUrl(from, pic, 'hentod.jpg', teks, id).then(() => 
                            tobz.sendFile(from, `./hentong/${nuklir}.pdf/${nuklir}.pdf.pdf`, `${title}.pdf`, '', id)).catch(() => 
                            tobz.sendFile(from, `./hentong/${nuklir}.pdf/${nuklir}.pdf.pdf`, `${title}.pdf`, '', id))
                            if (error) {
                                console.log('error : '+ error.message)
                                return
                            }
                            if (stderr) {
                                console.log('stderr : '+ stderr)
                                return
                            }
                            console.log('stdout : '+ stdout)
                            })
                    } catch (err) {
                        tobz.reply(from, '[❗] Terjadi kesalahan, mungkin kode nuklir salah', id)
                    }
                } else {
                    tobz.reply(from, '[❗] Kode nuklir Salah!')
                }
            } else {
                tobz.reply(from, '[ WRONG ] Kirim perintah *!nhentai [kode]* untuk contoh kirim perintah *!readme*')
            }
            break
        case prefix+'brainly':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return tobz.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return tobz.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length >= 2){
                const BrainlySearch = require('./lib/brainly')
                let tanya = body.slice(9)
                let jum = Number(tanya.split('.')[1]) || 2
                if (jum > 10) return tobz.reply(from, 'Max 10!', id)
                if (Number(tanya[tanya.length-1])){
                    tanya
                }
                tobz.reply(from, `➸ *Pertanyaan* : ${tanya.split('.')[0]}\n\n➸ *Jumlah jawaban* : ${Number(jum)}`, id)
                await BrainlySearch(tanya.split('.')[0],Number(jum), function(res){
                    res.forEach(x=>{
                        if (x.jawaban.fotoJawaban.length == 0) {
                            tobz.reply(from, `➸ *Pertanyaan* : ${x.pertanyaan}\n\n➸ *Jawaban* : ${x.jawaban.judulJawaban}\n`, id)
                            limitAdd(serial)
                        } else {
                            tobz.reply(from, `➸ *Pertanyaan* : ${x.pertanyaan}\n\n➸ *Jawaban* 〙: ${x.jawaban.judulJawaban}\n\n➸ *Link foto jawaban* : ${x.jawaban.fotoJawaban.join('\n')}`, id)
                            limitAdd(serial)
                        }
                    })
                })
            } else {
                tobz.reply(from, 'Usage :\n!brainly [pertanyaan] [.jumlah]\n\nEx : \n!brainly NKRI .2', id)
            }
            break
        case prefix+'math':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return tobz.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return tobz.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1) return tobz.reply(from, '[❗] Kirim perintah *!math [ Angka ]*\nContoh : !math 12*12\n*NOTE* :\n- Untuk Perkalian Menggunakan *\n- Untuk Pertambahan Menggunakan +\n- Untuk Pengurangan Mennggunakan -\n- Untuk Pembagian Menggunakan /')
            const mtk = body.slice(6)
            if (typeof Math_js.evaluate(mtk) !== "number") {
            tobz.reply(from, `"${mtk}", bukan angka!\n[❗] Kirim perintah *!math [ Angka ]*\nContoh : !math 12*12\n*NOTE* :\n- Untuk Perkalian Menggunakan *\n- Untuk Pertambahan Menggunakan +\n- Untuk Pengurangan Mennggunakan -\n- Untuk Pembagian Menggunakan /`, id)
            limitAdd(serial)
        } else {
            tobz.reply(from, `*「 MATH 」*\n\n*Kalkulator*\n${mtk} = ${Math_js.evaluate(mtk)}`, id)
        }
        break
        case prefix+'wait':
            if(isReg(obj)) return
            if(cekumur(cekage)) return

            if (isLimit(serial)) return tobz.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (isMedia && type === 'image' || quotedMsg && quotedMsg.type === 'image') {
                if (isMedia) {
                    var mediaData = await decryptMedia(message, uaOverride)
                } else {
                    var mediaData = await decryptMedia(quotedMsg, uaOverride)
                }
                const fetch = require('node-fetch')
                const imgBS4 = `data:${mimetype};base64,${mediaData.toString('base64')}`
                tobz.reply(from, 'Searching....', id)
                fetch('https://trace.moe/api/search', {
                    method: 'POST',
                    body: JSON.stringify({ image: imgBS4 }),
                    headers: { "Content-Type": "application/json" }
                })
                .then(respon => respon.json())
                .then(resolt => {
                    if (resolt.docs && resolt.docs.length <= 0) {
                        tobz.reply(from, 'Maaf, saya tidak tau ini anime apa', id)
                    }
                    const { is_adult, title, title_chinese, title_romaji, title_english, episode, similarity, filename, at, tokenthumb, anilist_id } = resolt.docs[0]
                    teks = ''
                    if (similarity < 0.92) {
                        teks = '*Saya memiliki keyakinan rendah dalam hal ini* :\n\n'
                    }
                    teks += `➸ *Title Japanese* : ${title}\n➸ *Title chinese* : ${title_chinese}\n➸ *Title Romaji* : ${title_romaji}\n➸ *Title English* : ${title_english}\n`
                    teks += `➸ *Ecchi* : ${is_adult}\n`
                    teks += `➸ *Eps* : ${episode.toString()}\n`
                    teks += `➸ *Kesamaan* : ${(similarity * 100).toFixed(1)}%\n`
                    var video = `https://media.trace.moe/video/${anilist_id}/${encodeURIComponent(filename)}?t=${at}&token=${tokenthumb}`;
                    tobz.sendFileFromUrl(from, video, 'nimek.mp4', teks, id).catch(() => {
                        tobz.reply(from, teks, id)
                        limitAdd(serial)
                    })
                })
                .catch(() => {
                    tobz.reply(from, 'Error !', id)
                })
            } else {
                tobz.sendFileFromUrl(from, tutor, 'Tutor.jpg', 'Neh contoh mhank!', id)
            }
            break
        case prefix+'textmaker':
        case prefix+'text':
                if(isReg(obj)) return
                if(cekumur(cekage)) return
                if (!isGroupMsg) return tobz.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
                if (isLimit(serial)) return tobz.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
                argz = body.trim().split('|')
                tobz.reply(from, '[⏳] Sek yo lagi diproses.. , tinggal ngopi yo oleh..', id)
                if ((isMedia || isQuotedImage) && argz.length >= 2) {
                const top = argz[1]
                const bott = argz[2]
                const encryptMedia = isQuotedImage ? quotedMsg : message
                const mediaData = await decryptMedia(encryptMedia, uaOverride)
                const getUrl = await uploadImages(mediaData, false)
                const ImageBase64 = await custom(getUrl, top, bott)
                await tobz.sendFile(from, ImageBase64, 'image.png','neh...')
                await limitAdd(serial)
                } else {
                await tobz.reply(from, 'Wrong Format!', id)
                }
                break
        case prefix+'quotemaker':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return tobz.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return tobz.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            argz = body.trim().split('|')
            if (argz.length >= 4) {
                tobz.reply(from, mess.wait, id)
                const quotes = argz[1]
                const author = argz[2]
                const theme = argz[3]
                await quotemaker(quotes, author, theme).then(amsu => {
                    limitAdd(serial)
                    tobz.sendFile(from, amsu, 'quotesmaker.jpg','neh...').catch(() => {
                       tobz.reply(from, mess.error.Qm, id)
                    })
                })
            } else {
                tobz.reply(from, 'Usage: \n!quotemaker |teks|watermark|theme\n\nEx :\n!quotemaker |ini contoh|bicit|random', id)
            }
            break
        case prefix+'listchannel':
            if (!isGroupMsg) return tobz.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            tobz.reply(from, listChannel, id)
            break
        case prefix+'jadwaltv':
            if (!isGroupMsg) return tobz.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return tobz.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            if (args.length === 1) return tobz.reply(from, 'Kirim perintah *!jadwalTv [channel]*', id)
            const query = body.slice(10).toLowerCase()
            const jadwal = await jadwalTv(query)
            tobz.reply(from, jadwal, id)
            break
        case prefix+'jadwaltvnow':
            if (!isGroupMsg) return tobz.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return tobz.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            const jadwalNow = await axios.get('http://melodicxt.herokuapp.com/api/jadwaltvnow?apiKey='+melodickey)
            tobz.reply(from, `Jam : ${jadwalNow.data.jam}\n\nJadwalTV : ${jadwalNow.data.jadwalTV}`, id)
            break
                case prefix+'tumbas':{
           const jual = await tobz.getBusinessProfilesProducts(botNumber)
                        let hasil = `*[ IKLAN EMEILIA ]*\n\nMonggo di tumbas jajanan @${botNumber.replace('@c.us','')}`
                        hasil += `\n`;
                        let nm = 1;
                        for (let i = 0; i < jual.length; i++) {
                            const harga = jual[i].priceAmount1000.toString()
                            var pric = harga.substring(0, harga.length-3); 
                            const ling = jual[i].imageCdnUrl.rawUrl
                            const gbr = await urlShortener(ling)
                            hasil += `\n*${nm}.* Nama Barang : ${jual[i].name}\n● Kode barang : ${jual[i].retailerId}\n● Deskripsi : ${jual[i].description}\n● Harga: ${convertToRupiah(pric)}\n● Gambar : ${gbr}\n_posted on ${moment(jual[i].t * 1000).format('dddd, DD MMMM YYYY')}_\n`;  
                            nm++
                        }
                        hasil += `\n*Mau pasang iklan juga bisa.*\nchat owner bot kirim !min [isi iklanmu]\nTotal pengguna bot sekarang : *${pendaftar.length}*`
                        await tobz.sendTextWithMentions(from, hasil)
                        limitAdd(serial)
                }
                break
                case prefix+'min':
                    if (!args.length >= 1) return tobz.reply(from, 'Pesan tidak boleh kosong', id)
                    if (isMedia){
                        const opo = body.slice(5)
                        const mediaData = await decryptMedia(message)
                        const imageBase64 = `data:${message.mimetype};base64,${mediaData.toString('base64')}`
                        tobz.sendImage(ownNumber, imageBase64, 'gambar.jpeg', `${opo}\n\npesan dari : wa.me/${sender.id.replace(/[@c.us]/g, '').replace(/[-]/g, '\n ')}`)
                            .then(() => tobz.reply(from, 'Berhasil mengirim pesan ke admin', id))
                    } else {
                        const opo = body.slice(5)
                        tobz.sendText(ownNumber, `${opo}\n\npesan dari : wa.me/${sender.id.replace(/[@c.us]/g, '')}`)
			tobz.sendText(owrNumber, `${opo}\n\npesan dari : wa.me/${sender.id.replace(/[@c.us]/g, '')}`)
                            .then(() => tobz.reply(from, 'Berhasil mengirim pesan ke admin', id))
                    }
                    break
        case 'nulis1':
            if (args.length == 0) return tobz.reply(from, `Membuat bot menulis teks yang dikirim menjadi gambar\nPemakaian: ${prefix}nulis [teks]\n\ncontoh: ${prefix}nulis i love you 3000`, id)
            const nulisq = body.slice(7)
            const nulisp = await rugaapi.tulis(nulisq)
            await tobz.sendImage(from, `${nulisp}`, '', 'Nih...', id)
            .catch(() => {
                tobz.reply(from, 'Ada yang Error!', id)
            })
            break

        case prefix+'nulis':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return tobz.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (!isPremium) return tobz.reply(from, 'Maaf, ini adalah fitur premium, untuk menggunakan fitur ini silahkan donasi, Kirim !donasi untuk melihat info donasi', id)
            if (isLimit(serial)) return tobz.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1) return tobz.reply(from, 'Kirim perintah *!nulis [teks]*, contoh *!nulis aku bukan boneka*', id)
            const ngettik = body.slice(7)
            const ngetikk = await axios.get('https://api.vhtear.com/write?text='+ ngettik+'&apiKey='+ vhtearkey)
            if (ngetikk.data.error) return tobz.reply(from, ngetikk.data.error, id)
            tobz.sendFileFromUrl(from, ngetikk.data.result, 'nulis.jpg', '', id)
            await limitAdd(serial)
            break
        case prefix+'inu':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return tobz.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return tobz.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            const list = ["https://cdn.shibe.online/shibes/247d0ac978c9de9d9b66d72dbdc65f2dac64781d.jpg","https://cdn.shibe.online/shibes/1cf322acb7d74308995b04ea5eae7b520e0eae76.jpg","https://cdn.shibe.online/shibes/1ce955c3e49ae437dab68c09cf45297d68773adf.jpg","https://cdn.shibe.online/shibes/ec02bee661a797518d37098ab9ad0c02da0b05c3.jpg","https://cdn.shibe.online/shibes/1e6102253b51fbc116b887e3d3cde7b5c5083542.jpg","https://cdn.shibe.online/shibes/f0c07a7205d95577861eee382b4c8899ac620351.jpg","https://cdn.shibe.online/shibes/3eaf3b7427e2d375f09fc883f94fa8a6d4178a0a.jpg","https://cdn.shibe.online/shibes/c8b9fcfde23aee8d179c4c6f34d34fa41dfaffbf.jpg","https://cdn.shibe.online/shibes/55f298bc16017ed0aeae952031f0972b31c959cb.jpg","https://cdn.shibe.online/shibes/2d5dfe2b0170d5de6c8bc8a24b8ad72449fbf6f6.jpg","https://cdn.shibe.online/shibes/e9437de45e7cddd7d6c13299255e06f0f1d40918.jpg","https://cdn.shibe.online/shibes/6c32141a0d5d089971d99e51fd74207ff10751e7.jpg","https://cdn.shibe.online/shibes/028056c9f23ff40bc749a95cc7da7a4bb734e908.jpg","https://cdn.shibe.online/shibes/4fb0c8b74dbc7653e75ec1da597f0e7ac95fe788.jpg","https://cdn.shibe.online/shibes/125563d2ab4e520aaf27214483e765db9147dcb3.jpg","https://cdn.shibe.online/shibes/ea5258fad62cebe1fedcd8ec95776d6a9447698c.jpg","https://cdn.shibe.online/shibes/5ef2c83c2917e2f944910cb4a9a9b441d135f875.jpg","https://cdn.shibe.online/shibes/6d124364f02944300ae4f927b181733390edf64e.jpg","https://cdn.shibe.online/shibes/92213f0c406787acd4be252edb5e27c7e4f7a430.jpg","https://cdn.shibe.online/shibes/40fda0fd3d329be0d92dd7e436faa80db13c5017.jpg","https://cdn.shibe.online/shibes/e5c085fc427528fee7d4c3935ff4cd79af834a82.jpg","https://cdn.shibe.online/shibes/f83fa32c0da893163321b5cccab024172ddbade1.jpg","https://cdn.shibe.online/shibes/4aa2459b7f411919bf8df1991fa114e47b802957.jpg","https://cdn.shibe.online/shibes/2ef54e174f13e6aa21bb8be3c7aec2fdac6a442f.jpg","https://cdn.shibe.online/shibes/fa97547e670f23440608f333f8ec382a75ba5d94.jpg","https://cdn.shibe.online/shibes/fb1b7150ed8eb4ffa3b0e61ba47546dd6ee7d0dc.jpg","https://cdn.shibe.online/shibes/abf9fb41d914140a75d8bf8e05e4049e0a966c68.jpg","https://cdn.shibe.online/shibes/f63e3abe54c71cc0d0c567ebe8bce198589ae145.jpg","https://cdn.shibe.online/shibes/4c27b7b2395a5d051b00691cc4195ef286abf9e1.jpg","https://cdn.shibe.online/shibes/00df02e302eac0676bb03f41f4adf2b32418bac8.jpg","https://cdn.shibe.online/shibes/4deaac9baec39e8a93889a84257338ebb89eca50.jpg","https://cdn.shibe.online/shibes/199f8513d34901b0b20a33758e6ee2d768634ebb.jpg","https://cdn.shibe.online/shibes/f3efbf7a77e5797a72997869e8e2eaa9efcdceb5.jpg","https://cdn.shibe.online/shibes/39a20ccc9cdc17ea27f08643b019734453016e68.jpg","https://cdn.shibe.online/shibes/e67dea458b62cf3daa4b1e2b53a25405760af478.jpg","https://cdn.shibe.online/shibes/0a892f6554c18c8bcdab4ef7adec1387c76c6812.jpg","https://cdn.shibe.online/shibes/1b479987674c9b503f32e96e3a6aeca350a07ade.jpg","https://cdn.shibe.online/shibes/0c80fc00d82e09d593669d7cce9e273024ba7db9.jpg","https://cdn.shibe.online/shibes/bbc066183e87457b3143f71121fc9eebc40bf054.jpg","https://cdn.shibe.online/shibes/0932bf77f115057c7308ef70c3de1de7f8e7c646.jpg","https://cdn.shibe.online/shibes/9c87e6bb0f3dc938ce4c453eee176f24636440e0.jpg","https://cdn.shibe.online/shibes/0af1bcb0b13edf5e9b773e34e54dfceec8fa5849.jpg","https://cdn.shibe.online/shibes/32cf3f6eac4673d2e00f7360753c3f48ed53c650.jpg","https://cdn.shibe.online/shibes/af94d8eeb0f06a0fa06f090f404e3bbe86967949.jpg","https://cdn.shibe.online/shibes/4b55e826553b173c04c6f17aca8b0d2042d309fb.jpg","https://cdn.shibe.online/shibes/a0e53593393b6c724956f9abe0abb112f7506b7b.jpg","https://cdn.shibe.online/shibes/7eba25846f69b01ec04de1cae9fed4b45c203e87.jpg","https://cdn.shibe.online/shibes/fec6620d74bcb17b210e2cedca72547a332030d0.jpg","https://cdn.shibe.online/shibes/26cf6be03456a2609963d8fcf52cc3746fcb222c.jpg","https://cdn.shibe.online/shibes/c41b5da03ad74b08b7919afc6caf2dd345b3e591.jpg","https://cdn.shibe.online/shibes/7a9997f817ccdabac11d1f51fac563242658d654.jpg","https://cdn.shibe.online/shibes/7221241bad7da783c3c4d84cfedbeb21b9e4deea.jpg","https://cdn.shibe.online/shibes/283829584e6425421059c57d001c91b9dc86f33b.jpg","https://cdn.shibe.online/shibes/5145c9d3c3603c9e626585cce8cffdfcac081b31.jpg","https://cdn.shibe.online/shibes/b359c891e39994af83cf45738b28e499cb8ffe74.jpg","https://cdn.shibe.online/shibes/0b77f74a5d9afaa4b5094b28a6f3ee60efcb3874.jpg","https://cdn.shibe.online/shibes/adccfdf7d4d3332186c62ed8eb254a49b889c6f9.jpg","https://cdn.shibe.online/shibes/3aac69180f777512d5dabd33b09f531b7a845331.jpg","https://cdn.shibe.online/shibes/1d25e4f592db83039585fa480676687861498db8.jpg","https://cdn.shibe.online/shibes/d8349a2436420cf5a89a0010e91bf8dfbdd9d1cc.jpg","https://cdn.shibe.online/shibes/eb465ef1906dccd215e7a243b146c19e1af66c67.jpg","https://cdn.shibe.online/shibes/3d14e3c32863195869e7a8ba22229f457780008b.jpg","https://cdn.shibe.online/shibes/79cedc1a08302056f9819f39dcdf8eb4209551a3.jpg","https://cdn.shibe.online/shibes/4440aa827f88c04baa9c946f72fc688a34173581.jpg","https://cdn.shibe.online/shibes/94ea4a2d4b9cb852e9c1ff599f6a4acfa41a0c55.jpg","https://cdn.shibe.online/shibes/f4478196e441aef0ada61bbebe96ac9a573b2e5d.jpg","https://cdn.shibe.online/shibes/96d4db7c073526a35c626fc7518800586fd4ce67.jpg","https://cdn.shibe.online/shibes/196f3ed10ee98557328c7b5db98ac4a539224927.jpg","https://cdn.shibe.online/shibes/d12b07349029ca015d555849bcbd564d8b69fdbf.jpg","https://cdn.shibe.online/shibes/80fba84353000476400a9849da045611a590c79f.jpg","https://cdn.shibe.online/shibes/94cb90933e179375608c5c58b3d8658ef136ad3c.jpg","https://cdn.shibe.online/shibes/8447e67b5d622ef0593485316b0c87940a0ef435.jpg","https://cdn.shibe.online/shibes/c39a1d83ad44d2427fc8090298c1062d1d849f7e.jpg","https://cdn.shibe.online/shibes/6f38b9b5b8dbf187f6e3313d6e7583ec3b942472.jpg","https://cdn.shibe.online/shibes/81a2cbb9a91c6b1d55dcc702cd3f9cfd9a111cae.jpg","https://cdn.shibe.online/shibes/f1f6ed56c814bd939645138b8e195ff392dfd799.jpg","https://cdn.shibe.online/shibes/204a4c43cfad1cdc1b76cccb4b9a6dcb4a5246d8.jpg","https://cdn.shibe.online/shibes/9f34919b6154a88afc7d001c9d5f79b2e465806f.jpg","https://cdn.shibe.online/shibes/6f556a64a4885186331747c432c4ef4820620d14.jpg","https://cdn.shibe.online/shibes/bbd18ae7aaf976f745bc3dff46b49641313c26a9.jpg","https://cdn.shibe.online/shibes/6a2b286a28183267fca2200d7c677eba73b1217d.jpg","https://cdn.shibe.online/shibes/06767701966ed64fa7eff2d8d9e018e9f10487ee.jpg","https://cdn.shibe.online/shibes/7aafa4880b15b8f75d916b31485458b4a8d96815.jpg","https://cdn.shibe.online/shibes/b501169755bcf5c1eca874ab116a2802b6e51a2e.jpg","https://cdn.shibe.online/shibes/a8989bad101f35cf94213f17968c33c3031c16fc.jpg","https://cdn.shibe.online/shibes/f5d78feb3baa0835056f15ff9ced8e3c32bb07e8.jpg","https://cdn.shibe.online/shibes/75db0c76e86fbcf81d3946104c619a7950e62783.jpg","https://cdn.shibe.online/shibes/8ac387d1b252595bbd0723a1995f17405386b794.jpg","https://cdn.shibe.online/shibes/4379491ef4662faa178f791cc592b52653fb24b3.jpg","https://cdn.shibe.online/shibes/4caeee5f80add8c3db9990663a356e4eec12fc0a.jpg","https://cdn.shibe.online/shibes/99ef30ea8bb6064129da36e5673649e957cc76c0.jpg","https://cdn.shibe.online/shibes/aeac6a5b0a07a00fba0ba953af27734d2361fc10.jpg","https://cdn.shibe.online/shibes/9a217cfa377cc50dd8465d251731be05559b2142.jpg","https://cdn.shibe.online/shibes/65f6047d8e1d247af353532db018b08a928fd62a.jpg","https://cdn.shibe.online/shibes/fcead395cbf330b02978f9463ac125074ac87ab4.jpg","https://cdn.shibe.online/shibes/79451dc808a3a73f99c339f485c2bde833380af0.jpg","https://cdn.shibe.online/shibes/bedf90869797983017f764165a5d97a630b7054b.jpg","https://cdn.shibe.online/shibes/dd20e5801badd797513729a3645c502ae4629247.jpg","https://cdn.shibe.online/shibes/88361ee50b544cb1623cb259bcf07b9850183e65.jpg","https://cdn.shibe.online/shibes/0ebcfd98e8aa61c048968cb37f66a2b5d9d54d4b.jpg"]
            let kya = list[Math.floor(Math.random() * list.length)]
            tobz.sendFileFromUrl(from, kya, 'Dog.jpeg', 'Inu', id)
            await limitAdd(serial)
            break
        case prefix+'qrcode':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return tobz.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return tobz.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if(!args.lenght >= 2) return
            let qrcodes = body.slice(8)
            await tobz.sendFileFromUrl(from, `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${qrcodes}`, 'gambar.png', 'Process sukses!')
            await limitAdd(serial)
            break
        case prefix+'ptl':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return tobz.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return tobz.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            const pptl = ["https://i.pinimg.com/564x/b2/84/55/b2845599d303a4f8fc4f7d2a576799fa.jpg","https://i.pinimg.com/236x/98/08/1c/98081c4dffde1c89c444db4dc1912d2d.jpg","https://i.pinimg.com/236x/a7/e2/fe/a7e2fee8b0abef9d9ecc8885557a4e91.jpg","https://i.pinimg.com/236x/ee/ae/76/eeae769648dfaa18cac66f1d0be8c160.jpg","https://i.pinimg.com/236x/b2/84/55/b2845599d303a4f8fc4f7d2a576799fa.jpg","https://i.pinimg.com/564x/78/7c/49/787c4924083a9424a900e8f1f4fdf05f.jpg","https://i.pinimg.com/236x/eb/05/dc/eb05dc1c306f69dd43b7cae7cbe03d27.jpg","https://i.pinimg.com/236x/d0/1b/40/d01b40691c68b84489f938b939a13871.jpg","https://i.pinimg.com/236x/31/f3/06/31f3065fa218856d7650e84b000d98ab.jpg","https://i.pinimg.com/236x/4a/e5/06/4ae5061a5c594d3fdf193544697ba081.jpg","https://i.pinimg.com/236x/56/45/dc/5645dc4a4a60ac5b2320ce63c8233d6a.jpg","https://i.pinimg.com/236x/7f/ad/82/7fad82eec0fa64a41728c9868a608e73.jpg","https://i.pinimg.com/236x/ce/f8/aa/cef8aa0c963170540a96406b6e54991c.jpg","https://i.pinimg.com/236x/77/02/34/77023447b040aef001b971e0defc73e3.jpg","https://i.pinimg.com/236x/4a/5c/38/4a5c38d39687f76004a097011ae44c7d.jpg","https://i.pinimg.com/236x/41/72/af/4172af2053e54ec6de5e221e884ab91b.jpg","https://i.pinimg.com/236x/26/63/ef/2663ef4d4ecfc935a6a2b51364f80c2b.jpg","https://i.pinimg.com/236x/2b/cb/48/2bcb487b6d398e8030814c7a6c5a641d.jpg","https://i.pinimg.com/236x/62/da/23/62da234d941080696428e6d4deec6d73.jpg","https://i.pinimg.com/236x/d4/f3/40/d4f340e614cc4f69bf9a31036e3d03c5.jpg","https://i.pinimg.com/236x/d4/97/dd/d497dd29ca202be46111f1d9e62ffa65.jpg","https://i.pinimg.com/564x/52/35/66/523566d43058e26bf23150ac064cfdaa.jpg","https://i.pinimg.com/236x/36/e5/27/36e52782f8d10e4f97ec4dbbc97b7e67.jpg","https://i.pinimg.com/236x/02/a0/33/02a033625cb51e0c878e6df2d8d00643.jpg","https://i.pinimg.com/236x/30/9b/04/309b04d4a498addc6e4dd9d9cdfa57a9.jpg","https://i.pinimg.com/236x/9e/1d/ef/9e1def3b7ce4084b7c64693f15b8bea9.jpg","https://i.pinimg.com/236x/e1/8f/a2/e18fa21af74c28e439f1eb4c60e5858a.jpg","https://i.pinimg.com/236x/22/d9/22/22d9220de8619001fe1b27a2211d477e.jpg","https://i.pinimg.com/236x/af/ac/4d/afac4d11679184f557d9294c2270552d.jpg","https://i.pinimg.com/564x/52/be/c9/52bec924b5bdc0d761cfb1160865b5a1.jpg","https://i.pinimg.com/236x/1a/5a/3c/1a5a3cffd0d936cd4969028668530a15.jpg"]
            let pep = pptl[Math.floor(Math.random() * pptl.length)]
            tobz.sendFileFromUrl(from, pep, 'pptl.jpg', 'Follow ig : https://www.instagram.com/ptl_repost untuk mendapatkan penyegar timeline lebih banyak', message.id)
            await limitAdd(serial)
            break
        case prefix+'neko':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return tobz.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return tobz.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            q2 = Math.floor(Math.random() * 900) + 300;
            q3 = Math.floor(Math.random() * 900) + 300;
            tobz.sendFileFromUrl(from, 'http://placekitten.com/'+q3+'/'+q2, 'neko.png','Neko ', id)
            await limitAdd(serial)
            break
        case prefix+'pokemon':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return tobz.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return tobz.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            q7 = Math.floor(Math.random() * 890) + 1;
            tobz.sendFileFromUrl(from, 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/'+q7+'.png','Pokemon.png', id)
            await limitAdd(serial)
            break
        case prefix+'quotes':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return tobz.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return tobz.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            const quotez2 = await axios.get('https://tobz-api.herokuapp.com/api/randomquotes?apikey=' + tobzkey)
            tobz.reply(from, `➸ *Quotes* : ${quotez2.data.quotes}\n➸ *Author* : ${quotez2.data.author}`, id)
            await limitAdd(serial)
            break
        case prefix+'lirik':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return tobz.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return tobz.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length == 1) return tobz.reply(from, 'Kirim perintah *!lirik [optional]*, contoh *!lirik aku bukan boneka*', id)
            const lagu = body.slice(7)
            const lirik = await liriklagu(lagu)
            tobz.reply(from, lirik, id)
            await limitAdd(serial)
            break
        case prefix+'chord':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return tobz.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return tobz.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1) return tobz.reply(from, 'Kirim perintah *!chord [query]*, contoh *!chord aku bukan boneka*', id)
            const query__ = body.slice(7)
            const chord = await axios.get('https://tobz-api.herokuapp.com/api/chord?q='+ query__+'&apikey='+tobzkey)
            if (chord.data.error) return tobz.reply(from, chord.data.error, id)
            tobz.reply(from, chord.data.result, id)
            await limitAdd(serial)
            break
        case prefix+'listdaerah':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return tobz.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
            const listDaerah = await axios.get('https://tobz-api.herokuapp.com/api/daerah?apikey='+tobzkey)
            tobz.reply(from, listDaerah.data.result, id)
            await limitAdd(serial)
            break
        case prefix+'slap':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (isLimit(serial)) return tobz.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (!isGroupMsg) return tobz.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
            const slap = arg.split(' ')[0]
            const person = author.replace('@c.us', '')
            await tobz.sendGiphyAsSticker(from, 'https://media.giphy.com/media/S8507sBJm1598XnsgD/source.gif')
            tobz.sendTextWithMentions(from, '@' + person + ' *slapped* ' + slap)
            limitAdd(serial)
            break
	case prefix+'level':
        //if (!isPublic) return tobz.reply(from, mess.public, id)   
		if (!isGroupMsg) return tobz.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
                if (!isLevelingOn) return tobz.reply(from, mess.levelnoton, id)
                const userLevel = getLevelingLevel(sender.id)
                const userXp = getLevelingXp(sender.id)
                if (userLevel === undefined && userXp === undefined) return tobz.reply(from, mess.levelnol ,id)
                const requiredXp = 5000 * (Math.pow(2, userLevel) - 1)
		resul = ` *『 LEVEL 』*\n❏ Name : @${sender.id.replace('@c.us', '')}\n❏ User XP :  ${userXp}/${requiredXp}\n❏ User Level : ${userLevel} \n❏ Role : ${role}\n`
                tobz.sendTextWithMentions(from, resul, id)
               .catch(async (err) => {
                        console.error(err)
            await tobz.reply(`Error!\n${err}`)
            })
            break
        case prefix+'cerpen': // ARUGAZ
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return tobz.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
            if (isLimit(serial)) return tobz.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            const cerpen = await get.get('https://arugaz.herokuapp.com/api/cerpen').json()
            tobz.reply(from, `• *Cerpen*: ${cerpen.result}`, id)
            break
        case prefix+'puisi': // ARUGAZ
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return tobz.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
            if (isLimit(serial)) return tobz.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (!isGroupMsg) return tobz.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
            const puisi = await get.get('https://arugaz.herokuapp.com/api/puisi1').json()
            tobz.reply(from, `• *Puisi*: ${puisi.result}`, id)
            break
        case prefix+'puisi2': // ARUGAZ
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return tobz.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
            if (isLimit(serial)) return tobz.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            const puisi2 = await get.get('https://arugaz.herokuapp.com/api/puisi2').json()
            tobz.reply(from, `• *Puisi*: ${puisi2.result}`, id)
            break
        case prefix+'puisi3': // ARUGAZ
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return tobz.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
            if (isLimit(serial)) return tobz.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            const puisi3 = await get.get('https://arugaz.herokuapp.com/api/puisi3').json()
            tobz.reply(from, `• *Puisi*: ${puisi3.result}`, id)
            break
        case prefix+'puisi3': // ARUGAZ
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return tobz.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
            if (isLimit(serial)) return tobz.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            const bucin = await get.get('https://arugaz.herokuapp.com/api/howbucins').json()
            tobz.reply(from, `• *Bucin*: ${bucin.result}`, id)
            break
        case prefix+'kpop':
            if (args.length == 0) return tobz.reply(from, `Untuk menggunakan ${prefix}kpop\nSilahkan ketik: ${prefix}kpop [query]\nContoh: ${prefix}kpop bts\n\nquery yang tersedia:\nblackpink, exo, bts`, id)
            if (args[0] == 'blackpink' || args[0] == 'exo' || args[0] == 'bts') {
                fetch('https://raw.githubusercontent.com/ArugaZ/grabbed-results/main/random/kpop/' + args[0] + '.txt')
                .then(res => res.text())
                .then(body => {
                    let randomkpop = body.split('\n')
                    let randomkpopx = randomkpop[Math.floor(Math.random() * randomkpop.length)]
                    tobz.sendFileFromUrl(from, randomkpopx, '', 'Nee..', id)
                })
                .catch(() => {
                    tobz.reply(from, 'Ada yang Error!', id)
                })
            } else {
                tobz.reply(from, `Maaf query tidak tersedia. Silahkan ketik ${prefix}kpop untuk melihat list query`)
            }
            break
        case prefix+'resi':
            if (args.length !== 2) return tobz.reply(from, `Maaf, format pesan salah.\nSilahkan ketik pesan dengan ${prefix}resi <kurir> <no_resi>\n\nKurir yang tersedia:\njne, pos, tiki, wahana, jnt, rpx, sap, sicepat, pcp, jet, dse, first, ninja, lion, idl, rex`, id)
            const kurirs = ['jne', 'pos', 'tiki', 'wahana', 'jnt', 'rpx', 'sap', 'sicepat', 'pcp', 'jet', 'dse', 'first', 'ninja', 'lion', 'idl', 'rex']
            if (!kurirs.includes(args[0])) return tobz.sendText(from, `Maaf, jenis ekspedisi pengiriman tidak didukung layanan ini hanya mendukung ekspedisi pengiriman ${kurirs.join(', ')} Tolong periksa kembali.`)
            console.log('Memeriksa No Resi', args[1], 'dengan ekspedisi', args[0])
            cekResi(args[0], args[1]).then((result) => tobz.sendText(from, result))
            break

        case prefix+'images':
        //if (!isPublic) return tobz.reply(from, mess.public, id)  
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (args.length == 0) return tobz.reply(from, `Untuk mencari gambar di pinterest\nketik: !images [search]\ncontoh: !images naruto`, id)
            const cariwall = body.slice(8)
            const hasilwall = await images.fdci(cariwall)
            await tobz.sendFileFromUrl(from, hasilwall,'', `*IMAGES* \n\n*Hasil Pencarian : ${cariwall}*`, id)
            .catch(() => {
                tobz.reply(from, 'Ada yang Error!', id)
            })
            break
        case prefix+'sreddit':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (args.length == 0) return tobz.reply(from, `Untuk mencari gambar di sub reddit\nketik: ${prefix}sreddit [search]\ncontoh: ${prefix}sreddit naruto`, id)
            const carired = body.slice(9)
            const hasilred = await images.sreddit(carired)
            await tobz.sendFileFromUrl(from, hasilred, '', `*SREDDIT* \n\n*Hasil Pencarian : ${carired}*`, id)
            .catch(() => {
                tobz.reply(from, 'Ada yang Error!', id)
            })
	    break
        // Random Kata
        case prefix+'darkjokes': // REY
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return tobz.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id) // MFARELS
            if (isLimit(serial)) return tobz.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id) // MFARELS
            const drkjks = fs.readFileSync('./lib/darkjokes.json') // REY
            const darkjks = JSON.parse(drkjks) // MFARELS
            const drkjk = Math.floor(Math.random() * darkjks.length) // REY
            const psk = darkjks[drkjk] // REY
            tobz.sendImage(from, psk.result, `psk.jpg`, `BEHH...`, id) // YES
            await limitAdd(serial)
            break
				break
        case prefix+'fakta':
            fetch('https://raw.githubusercontent.com/ArugaZ/grabbed-results/main/random/faktaunix.txt')
            .then(res => res.text())
            .then(body => {
                let splitnix = body.split('\n')
                let randomnix = splitnix[Math.floor(Math.random() * splitnix.length)]
                tobz.reply(from, randomnix, id)
            })
            .catch(() => {
                tobz.reply(from, 'Ada yang Error!', id)
            })
            break
        case prefix+'katabijak':
            fetch('https://raw.githubusercontent.com/ArugaZ/grabbed-results/main/random/katabijax.txt')
            .then(res => res.text())
            .then(body => {
                let splitbijak = body.split('\n')
                let randombijak = splitbijak[Math.floor(Math.random() * splitbijak.length)]
                tobz.reply(from, randombijak, id)
            })
            .catch(() => {
                tobz.reply(from, 'Ada yang Error!', id)
            })
            break
        case prefix+'pantun':
            fetch('https://raw.githubusercontent.com/ArugaZ/grabbed-results/main/random/pantun.txt')
            .then(res => res.text())
            .then(body => {
                let splitpantun = body.split('\n')
                let randompantun = splitpantun[Math.floor(Math.random() * splitpantun.length)]
                tobz.reply(from, randompantun.replace(/aruga-line/g,"\n"), id)
            })
            .catch(() => {
                tobz.reply(from, 'Ada yang Error!', id)
            })
            break
        case prefix+'quote':
            const quotex = await rugaapi.quote()
            await tobz.reply(from, quotex, id)
            .catch(() => {
                tobz.reply(from, 'Ada yang Error!', id)
            })
            break
		case prefix+'cerpen':
			rugaapi.cerpen()
			.then(async (res) => {
				await tobz.reply(from, res.result, id)
			})
			break
		case prefix+'cersex':
			rugaapi.cersex()
			.then(async (res) => {
				await tobz.reply(from, res.result, id)
			})
			break
		case prefix+'puisi':
			rugaapi.puisi()
			.then(async (res) => {
				await tobz.reply(from, res.result, id)
			})
			break
        // ADMIN & OWNER
        case 'cekprefix':
            tobz.reply(from, `PREFIX YANG SAAT INI DIGUNAKAN *「* ${prefix} *」*`, id)
            break
        case prefix+'setprefix':
            if(!isOwner) return tobz.reply(from, `Perintah ini hanya bisa di gunakan oleh Owner Emeilia!`, id)
            if (args.length === 1) return tobz.reply(from, `Kirim perintah *${prefix}prefix [ NEW PREFIX ]*`, id)
            prefix = args[1]
            tobz.sendText(from, `Berhasil Mengganti Prefix Ke *「* ${prefix} *」*`)
            break
				case prefix+'setreply':
	    if (!isOwner) return reply(mess.only.ownerB)
            tobz.updatePresence(from, Presence.composing) 
					if (args.length < 1) return
					renu = body.slice(10)
					tobz.reply(from, `reply berhasil di ubah menjadi : ${renu}`, id)
				break 
        case prefix+'addbadword':
            if (!isAdmin) return tobz.reply(from, `Perintah ini hanya bisa di gunakan oleh Admin Emeilia!`, id)
            if (!args.length >= 1) return tobz.reply(from, `Masukkan kata kasar yang akan di blacklist `, id) 
            const word = body.slice(12)
            var cek = dbbadword.includes(word);
            if(cek){
                return tobz.reply(from, `Badword Sudah Ada Di Database`, id)
            } else { 
                dbbadword.push(word)
                fs.writeFileSync('./lib/database/katakasar.json', JSON.stringify(dbbadword))
                tobz.reply(from, `Success Menambahkan Blacklist Badword\nTotal Data Badword Sekarang : *${dbbadword.length - 1}*`, id)
            }
            break
        case prefix+'delbadword':
            if (!isOwner) return tobz.reply(from, `Perintah ini hanya bisa di gunakan oleh Owner Emeilia!`, id)
                const delbd = dbbadword.indexOf(body.slice(12))
                dbbadword.splice(delbd, 1)
                fs.writeFileSync('./lib/database/katakasar.json', JSON.stringify(dbbadword))
                tobz.reply(from, `Success Menghapus Badword!`, id)
                break
          case prefix+'addprem': { //menambahkan member premium
                    if (!isOwner) return tobz.reply(from, 'Maaf, hanya owner bot yang dapat memasukkan member premium', id)
                    if (!args.length >= 1) return tobz.reply(from, 'Nomornya mana kak?\ncontoh: !prem 6285226236155')  
                    const texnum = body.slice(6)
                    let text = texnum.replace(/[-\s+]/g,'').replace('@','') + '@c.us'
                    var cek = prem.includes(text);
                    if(cek){
                        return tobz.reply(from, 'Nomor sudah ada di database', id) //if number already exists on database
                    } else {
                        const mentah = await tobz.checkNumberStatus(text) //VALIDATE WHATSAPP NUMBER
                        const hasil = mentah.canReceiveMessage ? `──「 *REGISTER PREMIUM* 」──\n\nRegister member premium berhasil dengan SN: ${SN}\npada ${moment().format('DD/MM/YY HH:mm:ss')}\nTotal member premium sekarang : *${prem.length}*\n\n──「 *SUCCESS PREMIUM* 」──` : false
                        if (!hasil) return tobz.reply(from, 'Nomor WhatsApp tidak valid [ Tidak terdaftar di WhatsApp ]', id) 
                        {
                        prem.push(mentah.id._serialized)
                        fs.writeFileSync('./lib/database/premium.json', JSON.stringify(prem))
                            tobz.sendText(from, hasil)}
                        }
                    }
                    break
                case prefix+'listprem': {
                    if (!isOwner) return tobz.reply(from, 'Fitur ini hanya dapat digunakan oleh admin bot')  
                    const num = fs.readFileSync('./lib/database/premium.json')
                    const liste = JSON.parse(num)
                    //const hasil = liste.replace(/@c.us/g,'')
                    let list = '💎 *Daftar Member Premium* 💎\n'
                    list += `*Total (${liste.length})*`
                    let nomre = 1
                        for (let i = 0; i < liste.length; i++){
                            list += `\n*${nomre}.* ${liste[i].replace(/[@c.us]/g,'')}`
                            nomre++
                        }
                        tobz.sendText(from, list) 
                    }
                    break   
        case prefix+'listbadword':
            if (!isAdmin) return tobz.reply(from, `Perintah ini hanya bisa di gunakan oleh Admin Emeilia!`, id)
                const bad = fs.readFileSync('./lib/database/katakasar.json')
                const liste = JSON.parse(bad)
                let listz = '*「 LIST BADWORD 」*\n'
                listz += `*Total : ${liste.length}*\n`
                let nomre = 1
                     for (let i = 0; i < liste.length; i++){
                        listz += `\n*${nomre}.* ${liste[i]}`
                        nomre++
                    }
                    tobz.sendText(from, listz) 
                    break
        case prefix+'daftarlist':
        case prefix+'listdaftar':
            if (!isAdmin) return tobz.reply(from, `Perintah ini hanya bisa di gunakan oleh Admin Emeilia Bots!`, id)
                const bd = fs.readFileSync('./lib/database/user.json')
                const daftar = JSON.parse (bd)
                let daftr = '*「 DAFTAR USER 」*\n'
                daftr += `*Total : ${daftar.length}*\n`
                let nome = 1
                     for (let i = 0; i < daftar.length; i++){
                        daftr += `#\n*${nome}.* \n➢ Id : ${daftar[i].id} \n➢ Nama : ${daftar[i].nama} \n➢ Umur : ${daftar[i].umur}`
                        nome++
                    }
                    tobz.reply(from, daftr, id) 
                    break
               case prefix+'hidetag':
	    if(isReg(obj)) return
          if (!isGroupMsg) return tobz.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
          if (!isGroupAdmins) return tobz.reply(from, 'Perintah ini hanya bisa di gunakan oleh admin group', id)
		value = body.slice(9)
		group = await tobz.groupMetadata.participants
		mem = []
				member.map( async adm => {
				mem.push(adm.id.replace(/[@c.us]/g, ''))
				})
				var options = {
				text: value,
				contextInfo: { mentionedJid: mem },
				}
				tobz.sendText(from, options, text)
			await limitAdd(sender)
			break
        case prefix+'leaderboard':
        case prefix+'lb':
            if (!isAdmin) return tobz.reply(from, `Perintah ini hanya bisa di gunakan oleh Admin Emeilia Bots!`, id)
                const bk = fs.readFileSync('./lib/database/level.json')
                const level = JSON.parse (bk)
                level.sort((a, b) => (a.xp < b.xp) ? 1 : -1)
		const bok = fs.readFileSync('./lib/database/uang.json')
                const uang = JSON.parse (bok)
		uang.sort((a, b) => (a.uang < b.uang) ? 1 : -1)
                let levl = '*「 LEADERBOARD 」*\n'
                levl += `\n👑 *[ 10 Top Level Tertinggi ]* 👑\n`
                let nompe = 1
                     for (let i = 0; i < 10; i++){
                        levl += `\n❏ 『 *Leaderboard Level* 』\n*${nompe}.* >Id : @${level[i].id.replace(/[@c.us]/g, '')}\n  > XP : ${level[i].xp} \n  > Level : ${level[i].level}\n > Role : ${role}\n`
			levl += `\n❏ 『 *Leaderboard Uang* 』\n*${nompe}.* > Id : @${uang[i].id.replace(/[@c.us]/g, '')}\n    > Uang: Rp${uang[i].uang}\n    > Limit: ${limitCount - limit[i].limit}\n`
			nompe++
                    }
		    tobz.sendTextWithMentions(from, levl, id)
                    break
        case prefix+'leaderboarduang':
        case prefix+'lbu':
            if (!isAdmin) return tobz.reply(from, `Perintah ini hanya bisa di gunakan oleh Admin Emeilia Bots!`, id)
                const bouk = fs.readFileSync('./lib/database/uang.json')
                const uanng = JSON.parse (bouk)
		uanng.sort((a, b) => (a.uanng < b.uanng) ? 1 : -1)
                let uaga = '[ *LEADERBOARD UANG* ]\n'
                uaga += `\n👑 *5 Top Uang Tertinggi*\n`
                let nope = 1
                     for (let i = 0; i < 5; i++){
			uaga += `*[${nope}]* wa.me/${uanng[i].id.replace(/[@c.us]/g, '')}\n┣⊱ *Uang*: _Rp${uanng[i].uang}_\n┗⊱ *Limit*: ${limitCount - limit[i].limit}\n`
			nope++
                    }
		    tobz.sendTextWithMentions(from, uaga, id)
                    break
	case prefix+'atm':
		    if(isReg(obj)) return
				const kantong = checkATMuser(sender.id)
				tobz.reply(from, `*──「 ATM 」──*\nミ➻ *Nama* : ${pushname}\nミ➻ *Nomer* : ${sender.id.replace(/[@c.us]/g, '')}\nミ➻ *Uang* : ${kantong}\n`, id)
				break
	case prefix+'buylimit':
		if(isReg(obj)) return
		payout = body.slice(10)
		const koinPerlimit = 300
		const total = koinPerlimit * payout
		if ( checkATMuser(sender) <= total) return tobz.reply(from, `maaf uang kamu belum mencukupi. silahkan kumpulkan dan beli nanti`, id)
		if ( checkATMuser(sender) >= total ) {
		confirmATM(sender, total)
		bayarLimit(sender, payout)
		await tobz.reply(from, `*「 PEMBAYARAN BERHASIL 」*\n\n*pengirim* : Admin\n*penerima* : ${pushname}\n*nominal pembelian* : ${payout} \n*harga limit* : ${koinPerlimit}/limit\n*sisa uang mu* : ${checkATMuser(sender)}\n\nproses berhasil dengan nomer pembayaran\n${SN}`, id)
			} 
			break
	case prefix+'transfer':
	    if(isReg(obj)) return
                argz = body.trim().split('|')
                if (argz.length >= 2) {
                const tujuan = argz[1]
                const jumblah = argz[2]
                if (checkATMuser(sender.id) < jumblah) return tobz.reply(from, `uang mu tidak mencukupi untuk melakukan transfer`, id)
                const tujuantf = `${tujuan.id.replace(/[@c.us]/g, '')}`
                fee = 0.005 *  jumblah
                hasiltf = jumblah - fee
                addKoinUser(tujuantf, hasiltf)
                confirmATM(sender.id, jumblah)
                addKoinUser('6289675134806@c.us', fee)
                await tobz.reply(from, `*「 SUKSES 」*\n\npengiriman uang telah sukses\ndari : +${sender.id.replace(/[@c.us]/g, '')}\nke : +${tujuan}\njumlah transfer : ${jumblah}\npajak : ${fee}`, id)
 		}
                break
        case prefix+'bc': // KASIH CREDIT DONG KALO COPAS
            if (!isOwner) return tobz.reply(from, `Perintah ini hanya untuk Owner Emeilia`, id)
                bctxt = body.slice(4)
                txtbc = `${bctxt}\n\n_*Emeilia Broadcast*_`
                const semuagrup = await tobz.getAllChatIds();
                if(quotedMsg && quotedMsg.type == 'image'){
                    const mediaData = await decryptMedia(quotedMsg)
                    const imageBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
                    for(let grupnya of semuagrup){
                        var cekgrup = await tobz.getChatById(grupnya)
                        if(!cekgrup.isReadOnly) tobz.sendImage(grupnya, imageBase64, 'gambar.jpeg', txtbc)
                    }
                    tobz.reply('Broadcast sukses!', id)
                }else{
                    for(let grupnya of semuagrup){
                        var cekgrup = await tobz.getChatById(grupnya)
                        if(!cekgrup.isReadOnly && isMuted(grupnya)) tobz.sendText(grupnya, txtbc)
                    }
                            tobz.reply('Broadcast Success!', id)
                }
                break
        case prefix+'adminlist':
            if (!isGroupMsg) return tobz.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            let mimin = ''
            for (let admon of groupAdmins) {
                mimin += `➸ @${admon.replace(/@c.us/g, '')}\n` 
            }
            await sleep(2000)
            await tobz.sendTextWithMentions(from, mimin)
            break
        case prefix+'ownergroup':
            if (!isGroupMsg) return tobz.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            const Owner_ = chat.groupMetadata.owner
            await tobz.sendTextWithMentions(from, `Owner Group : @${Owner_}`)
            break
        case prefix+'otagall': // FOR OWNER & ADMIN ELAINA
        case prefix+'omentionall':
            if (!isGroupMsg) return tobz.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (!isOwner, !isAdmin) return tobz.reply(from, 'Perintah ini hanya untuk Owner Emeilia', id)
            const groupMek = await tobz.getGroupMembers(groupId)
            let heho = `Hai, Admin ${pushname} memanggil Anda 👋️\n\n『 Mention All 』\n\n`
            for (let i = 0; i < groupMek.length; i++) {
                heho += '*┊❍*'
                heho += ` @${groupMek[i].id.replace(/@c.us/g, '')}\n`
            }
            heho += '\n『 Emelia Chan 』'
            await sleep(2000)
            await tobz.sendTextWithMentions(from, heho)
            break
        case prefix+'tagall': // FOR GROUP ADMINS
        case prefix+'mentionall':
            if (!isGroupMsg) return tobz.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (!isGroupAdmins) return tobz.reply(from, 'Perintah ini hanya bisa di gunakan oleh admin group', id)
            const groupMem = await tobz.getGroupMembers(groupId)
            let hehe = `Hai, Kak ${pushname} memanggil Anda 👋️\n\n『 Mention All 』\n\n`
            for (let i = 0; i < groupMem.length; i++) {
                hehe += '*┊❍*'
                hehe += ` @${groupMem[i].id.replace(/@c.us/g, '')}\n`
            }
            hehe += '\n『 Emelia Chan 』'
            await sleep(2000)
            await tobz.sendTextWithMentions(from, hehe)
            break
 // FOR GROUP ADMINS
        case prefix+'penting':
            if (!isGroupMsg) return tobz.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (!isGroupAdmins) return tobz.reply(from, 'Perintah ini hanya bisa di gunakan oleh admin group', id)
            const groupMex = await tobz.getGroupMembers(groupId)
            let hohe = `『 Pengumuman 』\n\n*${body.slice(9)}* - ${pushname} \n\n`
            for (let i = 0; i < groupMex.length; i++) {
                hohe += '*┊❍*'
                hohe += ` @${groupMex[i].id.replace(/@c.us/g, '')}\n`
            }
            hohe += '\n『 Emelia Chan 』'
            await sleep(2000)
            await tobz.sendTextWithMentions(from, hohe)
            break
        case prefix+'ekickall':
            if (!isGroupMsg) return tobz.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (!isOwner) return tobz.reply(from, 'Perintah ini hanya untuk Owner Emeilia', id)
            if (!isBotGroupAdmins) return tobz.reply(from, 'Perintah ini hanya bisa di gunakan ketika bot menjadi admin', id)
            const allMem = await tobz.getGroupMembers(groupId)
            for (let i = 0; i < allMem.length; i++) {
                if (ownerNumber.includes(allMem[i].id)) {
                    console.log('Upss this is Admin group')
                } else {
                    await tobz.removeParticipant(groupId, allMem[i].id)
                }
            }
            tobz.reply(from, 'Success kick all member', id)
            break
        case prefix+'okickall':
            if (!isGroupMsg) return tobz.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (!isOwner) return tobz.reply(from, 'Perintah ini hanya untuk Admin Emeilia', id)
            if (!isBotGroupAdmins) return tobz.reply(from, 'Perintah ini hanya bisa di gunakan ketika bot menjadi admin', id)
            const allMeq = await tobz.getGroupMembers(groupId)
            for (let i = 0; i < allMeq.length; i++) {
                if ((adminNumber, ownerNumber).includes(allMeq[i].id)) {
                    console.log('Upss this is Admin group')
                } else {
                    await tobz.removeParticipant(groupId, allMeq[i].id)
                }
            }
            tobz.reply(from, 'Succes kick all member', id)
            break
        case prefix+'kickall':
            if (!isGroupMsg) return tobz.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            const isGroupOwner = sender.id === chat.groupMetadata.owner
            if (!isGroupOwner) return tobz.reply(from, 'Perintah ini hanya bisa di gunakan oleh Owner group', id)
            if (!isBotGroupAdmins) return tobz.reply(from, 'Perintah ini hanya bisa di gunakan ketika bot menjadi admin', id)
            const allMek = await tobz.getGroupMembers(groupId)
            for (let i = 0; i < allMek.length; i++) {
                if ((adminNumber, ownerNumber).includes(allMek[i].id)) {
                    console.log('Upss this is Admin group')
                } else {
                    await tobz.removeParticipant(groupId, allMek[i].id)
                }
            }
            tobz.reply(from, 'Success kick all member', id)
            break
        case prefix+'leaveall':
            if (!isOwner) return tobz.reply(from, 'Perintah ini hanya untuk Owner Emeilia', id)
            const allChats = await tobz.getAllChatIds()
            const allGroups = await tobz.getAllGroups()
            for (let gclist of allGroups) {
                await tobz.sendText(gclist.contact.id, `Maaf bot sedang pembersihan, total chat aktif : ${allChats.length}`)
                await tobz.leaveGroup(gclist.contact.id)
            }
            tobz.reply(from, 'Succes leave all group!', id)
            break
        case prefix+'clearall':
            if (!isOwner) return tobz.reply(from, 'Perintah ini hanya untuk Owner Emeilia', id)
            const allChatz = await tobz.getAllChats()
            for (let dchat of allChatz) {
                await tobz.deleteChat(dchat.id)
            }
            tobz.reply(from, 'Succes clear all chat!', id)
            break
        case prefix+'oadd':
            const orang = args[1]
            if (!isGroupMsg) return tobz.reply(from, 'Fitur ini hanya bisa di gunakan dalam group', id)
            if (args.length === 1) return tobz.reply(from, 'Untuk menggunakan fitur ini, kirim perintah *!add* 628xxxxx', id)
            if (!isOwner, !isAdmin) return tobz.reply(from, 'Perintah ini hanya untuk Admin Emeilia', id)
            if (!isBotGroupAdmins) return tobz.reply(from, 'Perintah ini hanya bisa di gunakan ketika bot menjadi admin', id)
            try {
                await tobz.addParticipant(from,`${orang}@c.us`)
            } catch {
                tobz.reply(from, mess.error.Ad, id)
            }
            break
        case prefix+'add':
            const orgh = body.slice(5)
            if (!isGroupMsg) return tobz.reply(from, 'Fitur ini hanya bisa di gunakan dalam group', id)
            if (args.length === 1) return tobz.reply(from, 'Untuk menggunakan fitur ini, kirim perintah *!add* 628xxxxx', id)
            if (!isGroupAdmins) return tobz.reply(from, 'Perintah ini hanya bisa di gunakan oleh admin group', id)
            if (!isBotGroupAdmins) return tobz.reply(from, 'Perintah ini hanya bisa di gunakan ketika bot menjadi admin', id)
            try {
                await tobz.addParticipant(from,`${orgh}@c.us`)
            } catch {
                tobz.reply(from, mess.error.Ad, id)
            }
            break
        case prefix+'okick':
            if (!isGroupMsg) return tobz.reply(from, 'Perintah ini hanya bisa di gunakan dalam group', id)
            if (!isOwner) return tobz.reply(from, 'Perintah ini hanya untuk Owner Emeilia', id)
            if (!isBotGroupAdmins) return tobz.reply(from, 'Perintah ini hanya bisa di gunakan ketika bot menjadi admin', id)
            if (mentionedJidList.length === 0) return tobz.reply(from, 'Untuk menggunakan Perintah ini, kirim perintah *!okick* @tagmember', id)
            await tobz.sendText(from, `𝗔𝘀𝗲𝗸 𝗱𝗮𝗽𝗮𝘁 𝗺𝗮𝗸𝗮𝗻𝗮𝗻,𝗼𝘁𝘄 𝗸𝗶𝗰𝗸 🏃:\n${mentionedJidList.join('\n')}`)
            for (let i = 0; i < mentionedJidList.length; i++) {
                if ((adminNumber, ownerNumber).includes(mentionedJidList[i])) return tobz.reply(from, mess.error.Sp, id)
                await tobz.removeParticipant(groupId, mentionedJidList[i])
            }
            break
        case prefix+'kick':
            if (!isGroupMsg) return tobz.reply(from, 'Fitur ini hanya bisa di gunakan dalam group', id)
            if (!isGroupAdmins) return tobz.reply(from, 'Perintah ini hanya bisa di gunakan oleh admin group', id)
            if (!isBotGroupAdmins) return tobz.reply(from, 'Perintah ini hanya bisa di gunakan ketika bot menjadi admin', id)
            if (mentionedJidList.length === 0) return tobz.reply(from, 'Untuk menggunakan Perintah ini, kirim perintah *!kick* @tagmember', id)
            await tobz.sendText(from, `𝗔𝘀𝗲𝗸 𝗱𝗮𝗽𝗮𝘁 𝗺𝗮𝗸𝗮𝗻𝗮𝗻,𝗼𝘁𝘄 𝗸𝗶𝗰𝗸 🏃:\n${mentionedJidList.join('\n')}`)
            for (let i = 0; i < mentionedJidList.length; i++) {
                if ((adminNumber, groupAdmins).includes(mentionedJidList[i])) return tobz.reply(from, mess.error.Sp, id)
                await tobz.removeParticipant(groupId, mentionedJidList[i])
            }
            break
           case prefix+'edotensei':   
            if (!isGroupAdmins) return tobz.reply(from, 'Perintah ini hanya bisa di gunakan oleh admin group', id)
                    if (!isBotGroupAdmins) return tobz.reply(from, 'Perintah ini hanya bisa di gunakan ketika bot menjadi admin', id)
            if (mentionedJidList.length === 0) return tobz.reply(from, 'Fitur untuk menghapus member lalu menambahkan member kembali,kirim perintah !edotensei @tagmember', id)
            for (let i = 0; i < mentionedJidList.length; i++) {
                if (groupAdmins.includes(mentionedJidList[i])) return tobz.reply(from, mess.error.Ki, id)
                await tobz.removeParticipant(groupId, mentionedJidList[i])
                await sleep(3000)
                await tobz.addParticipant(from,`${mentionedJidList}`)
                tobz.sendText(from, ' *Mamposs TER-PRANK!* ')
            } 
            break 
        case prefix+'oleave':
            if (!isGroupMsg) return tobz.reply(from, 'Perintah ini hanya bisa di gunakan dalam group', id)
            if (!isOwner, !isAdmin) return tobz.reply(from, 'Perintah ini hanya untuk Admin Emeilia', id)
            await tobz.sendText(from,'EMEILIA DIPERINTAHKAN KELUAR OLEH OWNER!!').then(() => tobz.leaveGroup(groupId))
            break
        case prefix+'leave':
            if (!isGroupMsg) return tobz.reply(from, 'Perintah ini hanya bisa di gunakan dalam group', id)
            if (!isGroupAdmins) return tobz.reply(from, 'Perintah ini hanya bisa di gunakan oleh admin group', id)
            await tobz.sendText(from,'Sayonara').then(() => tobz.leaveGroup(groupId))
            break
        case prefix+'opromote':
            if (!isGroupMsg) return tobz.reply(from, 'Perintah ini hanya bisa di gunakan dalam group', id)
            if (!isOwner, !isAdmin) return tobz.reply(from, 'Perintah ini hanya untuk Admin Emeilia', id)
            if (!isBotGroupAdmins) return tobz.reply(from, 'Fitur ini hanya bisa di gunakan ketika bot menjadi admin', id)
            if (mentionedJidList.length === 0) return tobz.reply(from, 'Untuk menggunakan fitur ini, kirim perintah *!promote* @tagmember', id)
            if (mentionedJidList.length >= 2) return tobz.reply(from, 'Maaf, perintah ini hanya dapat digunakan kepada 1 user.', id)
            if (groupAdmins.includes(mentionedJidList[0])) return tobz.reply(from, 'Maaf, user tersebut sudah menjadi admin.', id)
            await tobz.promoteParticipant(groupId, mentionedJidList[0])
            await tobz.sendTextWithMentions(from, `Perintah Owner diterima, menambahkan @${mentionedJidList[0]} sebagai admin.`)
            break
        case prefix+'promote':
            if (!isGroupMsg) return tobz.reply(from, 'Fitur ini hanya bisa di gunakan dalam group', id)
            if (!isGroupAdmins) return tobz.reply(from, 'Fitur ini hanya bisa di gunakan oleh admin group', id)
            if (!isBotGroupAdmins) return tobz.reply(from, 'Fitur ini hanya bisa di gunakan ketika bot menjadi admin', id)
            if (mentionedJidList.length === 0) return tobz.reply(from, 'Untuk menggunakan fitur ini, kirim perintah *!promote* @tagmember', id)
            if (mentionedJidList.length >= 2) return tobz.reply(from, 'Maaf, perintah ini hanya dapat digunakan kepada 1 user.', id)
            if (groupAdmins.includes(mentionedJidList[0])) return tobz.reply(from, 'Maaf, user tersebut sudah menjadi admin.', id)
            await tobz.promoteParticipant(groupId, mentionedJidList[0])
            await tobz.sendTextWithMentions(from, `𝗦𝗲𝗹𝗮𝗺𝗮𝘁🥳 𝗮𝗻𝗱𝗮 𝗻𝗮𝗶𝗸 𝗺𝗲𝗻𝗷𝗮𝗱𝗶 𝗮𝗱𝗺𝗶𝗻 𝗴𝗿𝗼𝘂𝗽 (+_+) @${mentionedJidList[0]} hoki bet lu anj.`)
            break
        case prefix+'odemote':
            if (!isGroupMsg) return tobz.reply(from, 'Perintah ini hanya bisa di gunakan dalam group', id)
            if (!isOwner, !isAdmin) return tobz.reply(from, 'Perintah ini hanya untuk Admin Emeilia', id)
            if (!isBotGroupAdmins) return tobz.reply(from, 'Fitur ini hanya bisa di gunakan ketika bot menjadi admin', id)
            if (mentionedJidList.length === 0) return tobz.reply(from, 'Untuk menggunakan fitur ini, kirim perintah *!demote* @tagadmin', id)
            if (mentionedJidList.length >= 2) return tobz.reply(from, 'Maaf, perintah ini hanya dapat digunakan kepada 1 orang.', id)
            if (!groupAdmins.includes(mentionedJidList[0])) return tobz.reply(from, 'Maaf, user tersebut tidak menjadi admin.', id)
            await tobz.demoteParticipant(groupId, mentionedJidList[0])
            await tobz.sendTextWithMentions(from, `Perintah Owner diterima, menghapus jabatan @${mentionedJidList[0]}.`)
            break
        case prefix+'demote':
            if (!isGroupMsg) return tobz.reply(from, 'Fitur ini hanya bisa di gunakan dalam group', id)
            if (!isGroupAdmins) return tobz.reply(from, 'Fitur ini hanya bisa di gunakan oleh admin group', id)
            if (!isBotGroupAdmins) return tobz.reply(from, 'Fitur ini hanya bisa di gunakan ketika bot menjadi admin', id)
            if (mentionedJidList.length === 0) return tobz.reply(from, 'Untuk menggunakan fitur ini, kirim perintah *!demote* @tagadmin', id)
            if (mentionedJidList.length >= 2) return tobz.reply(from, 'Maaf, perintah ini hanya dapat digunakan kepada 1 orang.', id)
            if (!groupAdmins.includes(mentionedJidList[0])) return tobz.reply(from, 'Maaf, user tersebut tidak menjadi admin.', id)
            await tobz.demoteParticipant(groupId, mentionedJidList[0])
            await tobz.sendTextWithMentions(from, `*jabatan kamu di copot*🏃 : @${mentionedJidList[0]}.`)
            break
        case prefix+'join':
            return tobz.reply(from, 'Jika ingin meng-invite bot ke group anda, silahkan izin ke wa.me/6289675134806 atau wa.me/6281262180737 ', id)
            if (args.length < 2) return tobz.reply(from, 'Kirim perintah *!join linkgroup key*\n\nEx:\n!join https://chat.whatsapp.com/blablablablablabla abcde\n=> untuk key kamu bisa mendapatkannya hanya dengan donasi 5k', id)
            const link = args[1]
            const key = args[2]
            const tGr = await tobz.getAllGroups()
            const minMem = 1
            const isLink = link.match(/(https:\/\/chat.whatsapp.com)/gi)
            if (key !== 'hijrahkuy') return tobz.reply(from, '*key* salah! silahkan chat owner bot untuk mendapatkan key yang valid', id)
            const check = await tobz.inviteInfo(link)
            if (!isLink) return tobz.reply(from, 'Ini link? 👊🤬', id)
            if (tGr.length > 256) return tobz.reply(from, 'Maaf jumlah group sudah maksimal!', id)
            if (check.size < minMem) return tobz.reply(from, 'Member group tidak melebihi 5, bot tidak bisa masuk', id)
            if (check.status === 200) {
                await tobz.joinGroupViaLink(link).then(() => tobz.reply(from, 'Bot akan segera masuk!', id), id)
            } else {
                tobz.reply(from, 'Link group tidak valid!', id)
            }
            break
        case prefix+'odelete':
        case prefix+'odel':
            if (!isGroupMsg) return tobz.reply(from, 'Perintah ini hanya bisa di gunakan dalam group', id)
            if (!isOwner, !isAdmin) return tobz.reply(from, 'Perintah ini hanya untuk Admin Emeilia', id)
            if (!quotedMsg) return tobz.reply(from, 'Salah!!, kirim perintah *1delete [tagpesanbot]*', id)
            if (!quotedMsgObj.fromMe) return tobz.reply(from, 'Salah!!, Bot tidak bisa mengahpus chat user lain!', id)
            tobz.deleteMessage(quotedMsgObj.chatId, quotedMsgObj.id, false)
            break
        case prefix+'delete':
        case prefix+'del':
        case prefix+'d':
            if (!isGroupMsg) return tobz.reply(from, 'Fitur ini hanya bisa di gunakan dalam group', id)
            if (!isGroupAdmins) return tobz.reply(from, 'Fitur ini hanya bisa di gunakan oleh admin group', id)
            if (!quotedMsg) return tobz.reply(from, 'Salah!!, kirim perintah *!delete [tagpesanbot]*', id)
            if (!quotedMsgObj.fromMe) return tobz.reply(from, 'Salah!!, Bot tidak bisa mengahpus chat user lain!', id)
            tobz.deleteMessage(quotedMsgObj.chatId, quotedMsgObj.id, false)
            break
        case prefix+'sider':
            if (!isGroupMsg) return tobz.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)                
            if (!quotedMsg) return tobz.reply(from, `Tolong Reply Pesan Bot`, id)
            if (!quotedMsgObj.fromMe) return tobz.reply(from, `Tolong Reply Pesan Bot`, id)
            try {
                const reader = await tobz.getMessageReaders(quotedMsgObj.id)
                let list = ''
                for (let pembaca of reader) {
                list += `- @${pembaca.id.replace(/@c.us/g, '')}\n` 
            }
                tobz.sendTextWithMentions(from, `Nich, yang membaca pesan Lia >_<\n\n${list}`)
            } catch(err) {
                console.log(err)
                tobz.reply(from, `Maaf, Belum Ada Yang Membaca Pesan Emeilia atau Mereka Menonaktifkan Read Receipts`, id)    
            }
            break
        case prefix+'linkgroup':
            if (!isGroupMsg) return tobz.reply(from, `Fitur ini hanya bisa di gunakan dalam group`, id)
            if (!isGroupAdmins) return tobz.reply(from, `Fitur ini hanya bisa di gunakan oleh admin group`, id)
            if (!isBotGroupAdmins) return tobz.reply(from, `Fitur ini hanya bisa di gunakan ketika bot menjadi admin`, id)
            const namagcnye = chat.formattedTitle
            var gclink = await tobz.getGroupInviteLink(groupId)
            var linkgc  = `Link group : *${namagcnye}*\n\n ${gclink}`
            tobz.reply(from, linkgc, id)
            break
        case prefix+'resetlinkgroup':
            if (!isGroupMsg) return tobz.reply(from, `Fitur ini hanya bisa di gunakan dalam group`, id)
            if (!isGroupAdmins) return tobz.reply(from, `Fitur ini hanya bisa di gunakan oleh admin group`, id)
            if (!isBotGroupAdmins) return tobz.reply(from, `Fitur ini hanya bisa di gunakan ketika bot menjadi admin`, id)
            if (isGroupMsg) {
                await tobz.revokeGroupInviteLink(groupId);
                tobz.sendTextWithMentions(from, `Link group telah direset oleh admin @${sender.id.replace('@c.us', '')}`)
            }
            break
        case prefix+'getses':
            if (!isOwner) return tobz.reply(from, 'Perintah ini hanya untuk Owner Emeilia', id)            
            const sesPic = await tobz.getSnapshot()
            tobz.sendFile(from, sesPic, 'session.png', 'Nih boss', id)
            break
        case prefix+'liaadmin':
            let admn = `This is list of Emeilia Admin\nTotal : ${adminNumber.length}\n`
            for (let i of adminNumber) {
                admn += `➸ ${i.replace(/@c.us/g,'')}\n`
            }
            await tobz.reply(from, admn, id)
            break
        case prefix+'limit':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return tobz.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
            if(isPremium) {
            tobz.reply(from, 'Kamu adalah member premium 💎\nSisa limit request anda tersisa : *Unlimited*\n\n_Note : User premium memiliki Quota Unlimited!_', id)
            }else{
            var found = false
            const limidat = JSON.parse(fs.readFileSync('./lib/database/limit.json'))
            for(let lmt of limidat){
                if(lmt.id === serial){
                    let limitCounts = limitCount-lmt.limit
                    if(limitCounts <= 0) return tobz.reply(from, `Limit request anda sudah habis\n\n_NOTE : untuk mendapatkan limit. bisa lewat naik level atau buylimit_`, id)
                    tobz.reply(from, `*「 LIMIT COUNT 」*\n\nSisa limit request anda tersisa : *${limitCounts}*\n\n_NOTE : untuk mendapatkan limit. bisa lewat naik level atau buylimit_`, id)
                    found = true
                }
            }
            console.log(limit)
            console.log(limidat)
            if (found === false){
                let obj = {id: `${serial}`, limit:1};
                limit.push(obj);
                fs.writeFileSync('./lib/database/limit.json',JSON.stringify(limit, 1));
                tobz.reply(from, `Sisa limit request anda tersisa : *${limitCount}*\n\n_Note : Limit akan direset setiap jam 21:00!_`, id)
            }
 }
            break
        case prefix+'gift': // Hanya Admin & Owner Emeilia yang bisa gift Limit
            if (!isAdmin, !isOwner) return tobz.reply(from, `Maaf, perintah ini hanya dapat dilakukan oleh Admin Emeilia!`, id)
             if (!isPremium) return tobz.reply(from, 'Gift hanya untuk member premium ya dik!', id)
                    const nomerr = arg.split(' ')[0]
                    const jmla = arg.split(' ')[1]
                    if(!nomerr) return tobz.reply(from, `Masukkan nomor yang akan di gift, ${prefix}gift [ @tagmember Jumlah ]\n=> Contoh : ${prefix}gift @62813118507151 15`, id)
                    let texta = nomerr.replace(/[-\s+@c.us]/g,'')
                    const cusz = texta + '@c.us'
                    if(!jmla) return tobz.reply(from, `Masukkan Jumlah gift quota, ${prefix}gift [ @tagmember Jumlah ]\n=> Contoh : ${prefix}gift @62813118507151 15`, id)
                    if(jmla > 20) return await tobz.reply(from, `Maximal  20!`, id)
                        var found = false
                        Object.keys(limit).forEach((i) => {
                            if(limit[i].id == cusz){
                                found = i
                            }
                        })
                        if (found !== false) {
                            limit[found].limit = Math.max(0, limit[found].limit);
                            if(limit[found].limit <= 20) return tobz.reply(from, `Kuota Limit pada nomor tersebut masih penuh\nUntuk gift pastikan kuota limit target sudah habis`, id)
                            if(limit[found].limit <= 0) { // JIKA LIMIT 0 MAKA BISA GIFT
                                return tobz.reply(from, `Kuota limit pada nomor tersebut sudah penuh!`, id)
                            }else{
                            limit[found].limit -= jmla
                            const updated = limit[found]
                            const result = `Gift kuota limit sukses dengan SN: ${SN} pada ${moment().format('DD/MM/YY HH:mm:ss')}
*「 GIFT KUOTA LIMIT 」*

• User : @${updated.id.replace('@c.us','')}
• Limit: ${limitCount-updated.limit}`
                            console.log(limit[found])
                            fs.writeFileSync('./lib/database/limit.json',JSON.stringify(limit));
                            tobz.sendTextWithMentions(from, result)
                            }
                        } else {
                                tobz.reply(from, `Maaf, nomor itu tidak terdaftar di database!`, id)
                        }
                break
        case prefix+'eval':
            const q = args.join(' ')
            if (!isOwner) return tobz.reply(from, 'Perintah ini hanya bisa di gunakan oleh Owner Emeilia!', id)
            if (!q) return tobz.reply(from, 'Harap masukkan code JavaScript!', id)
            try {
                let evaled = await eval(q)
                if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
                tobz.sendText(from, evaled)
            } catch (err) {
                tobz.reply(from, err, id)
            }
        break
        case prefix+'respawn':
               if (!isOwner) return await tobz.reply(from, 'Gagal, Perintah ini hanya untuk Owner bot!', id)
               tobz.reply(from, 'Baik segera respawn 5 detik!', id)
               tobz.reply(from, 'Success, ketik !ping untuk check', id)
               break
        case prefix+'shutdown':
               if (!isOwner) return await tobz.reply(from, 'Gagal, Perintah ini hanya untuk Owner bot!', id)
               return await tobz.reply(from, 'Baik Bot Segera Off', id)
              .then(async () => await tobz.kill())
               break
        case prefix+'restart': // WORK IF YOU RUN USING PM2
            if(isOwner){
                tobz.reply(from, '*[WARN]* Bot Restarting ...\nlib/database/limit.json\nlib/database/muted.json\nlib/database/banned.json\nlib/database/nsfw.json', id)
                setting.restartState = true
                setting.restartId = chatId
                var obj = []
                fs.writeFileSync('./lib/database/limit.json', JSON.stringify(obj));
                fs.writeFileSync('./lib/database/muted.json', JSON.stringify(obj));
                fs.writeFileSync('./lib/database/msgLimit.json', JSON.stringify(obj));
                fs.writeFileSync('./lib/database/banned.json', JSON.stringify(obj));
                fs.writeFileSync('./lib/database/Simsimi.json', JSON.stringify(obj));
                fs.writeFileSync('./lib/database/nsfwz.json', JSON.stringify(obj));
    		const spawn = require('child_process').exec;
	        await sleep(5000)
 		tobz.sendText(from, '1% ======> restarting..', id)   
	        await sleep(5000)
 		tobz.sendText(from, '15% ======> downloading', id) 
	        await sleep(5000)
 		tobz.sendText(from, `45% ======> installing`, id) 
	        await sleep(5000)
 		tobz.sendText(from, '99% ======> launch', id)      
	        await sleep(10000)
 		tobz.reply(from, '✅ succesfully restarting..', id)                
		function os_func() {
                    this.execCommand = function (command) {
                        return new Promise((resolve, reject)=> {
                        spawn(command, (error, stdout, stderr) => {
                            if (error) {
                                reject(error);
                                return;
                            }
                            resolve(stdout)
                        });
                    })
                }}
                var oz = new os_func();
                oz.execCommand('pm2 restart index')     .then(res=> {
                }).catch(err=> {
                    console.log("os >>>", err);
                })
            }
            break
        case prefix+'addadmin':
            if (!isOwner) return tobz.reply(from, 'Gagal, Perintah ini hanya bisa di gunakan oleh Owner Emeilia!', id)
                for (let i = 0; i < mentionedJidList.length; i++) {
                adminNumber.push(mentionedJidList[i])
                fs.writeFileSync('./lib/database/admin.json', JSON.stringify(adminNumber))
                tobz.reply(from, 'Success Menambahkan Admin Emeilia!', id)
                }
            break
        case prefix+'deladmin':
            if (!isOwner) return tobz.reply(from, 'Gagal, Perintah ini hanya bisa di gunakan oleh Owner Emeilia!', id)
                let inq = adminNumber.indexOf(mentionedJidList[0])
                adminNumber.splice(inq, 1)
                fs.writeFileSync('./lib/database/admin.json', JSON.stringify(adminNumber))
                tobz.reply(from, 'Success Menghapus Admin Emeilia!', id)
            break
        case prefix+'block':
            if (!isOwner) return tobz.reply(from, 'Gagal, Perintah ini hanya bisa di gunakan oleh Owner Emeilia!', id)
            for (let i = 0; i < mentionedJidList.length; i++) {
                let unblock = `${mentionedJidList[i]}`
                await tobz.contactBlock(unblock).then((a)=>{
                    console.log(a)
                    tobz.reply(from, `Success block ${args[1]}!`, id)
                })
            }
            break
                case prefix+'block': { //menambahkan nomor ke database 
                    if (!isOwner) return tobz.reply(from, 'Gagal, Perintah ini hanya Owner bot yang dapat memblokir user', id)
                    if (!args.length >= 1) return tobz.reply(from, 'Nomornya mana kak?\ncontoh: !daftar 6285226236155')  
                    const text = body.slice(7)
                    let bloknum = text.replace(/[-\s+]/g,'').replace('@','') + '@c.us'
                    const blockedlist = await tobz.getBlockedIds()
                    var cek = blockedlist.includes(bloknum);
                    if(cek){
                        return tobz.reply(from, 'Nomor ini sudah terblokir', id) //if number already exists on database
                    } else {
                        const mentah = await tobz.checkNumberStatus(bloknum) //VALIDATE WHATSAPP NUMBER
                        const hasil = mentah.canReceiveMessage ? `Blocked success\nTotal Nomor terblokir sekarang : *${blockedlist.length}*` : false
                        if (!hasil) return tobz.reply(from, 'Nomor WhatsApp tidak valid [ Tidak terdaftar di WhatsApp ]', id); {
                            await tobz.contactBlock(mentah.id._serialized)
                            tobz.sendText(from, hasil)
                        }
                    }
                    }
                    break 
        case prefix+'unblock':
            if (!isOwner) return tobz.reply(from, 'Perintah ini hanya bisa di gunakan oleh Owner Emeilia!', id)
            for (let i = 0; i < mentionedJidList.length; i++) {
                let unblock = `${mentionedJidList[i]}`
                await tobz.contactUnblock(unblock).then((a)=>{
                    console.log(a)
                    tobz.reply(from, `Success unblok ${args[1]}!`, id)
                })
            } 
            break
                case prefix+'unblock': { //menambahkan nomor ke database 
                    if (!isOwner) return tobz.reply(from, 'Maaf, hanya admin bot yang dapat unblok user', id)
                    if (!args.length >= 1) return tobz.reply(from, 'Nomornya mana kak?')  
                    const text = body.slice(9)
                    let bloknum = text.replace(/[-\s+]/g,'').replace('@','') + '@c.us'
                    const blockedlist = await tobz.getBlockedIds()
                    var cek = blockedlist.includes(bloknum);
                    if(!cek){                               
                  return tobz.reply(from, 'Nomor ini sudah ter unblock', id) //if number already exists on database
                    } else {
                        const mentah = await tobz.checkNumberStatus(bloknum) //VALIDATE WHATSAPP NUMBER
                        const hasil = mentah.canReceiveMessage ? `Unblocked success\nTotal Nomor terblokir sekarang : *${blockedlist.length}*` : false
                        if (!hasil) return tobz.reply(from, 'Nomor WhatsApp tidak valid [ Tidak terdaftar di WhatsApp ]', id); {
                            await tobz.contactUnblock(mentah.id._serialized)
                            tobz.sendText(from, hasil)
                        }
                    }
                    }
                    break
        case prefix+'setname':
            if (!isOwner) return tobz.reply(from, `Gagal, Perintah ini hanya bisa di gunakan oleh Owner Emeilia!`, id)
                const setnem = body.slice(9)
                await tobz.setMyName(setnem)
                tobz.sendTextWithMentions(from, `Makasih Nama Barunya @${sender.id.replace('@c.us','')} 😘`)
            break
        case prefix+'setstatus':
            if (!isOwner) return tobz.reply(from, `Perintah ini hanya bisa di gunakan oleh Owner Emeilia!`, id)
                const setstat = body.slice(11)
                await tobz.setMyStatus(setstat)
                tobz.sendTextWithMentions(from, `Makasih Status Barunya @${sender.id.replace('@c.us','')} 😘`)
            break
        case prefix+'setprofilepic':
            if (!isOwner) return tobz.reply(from, `Gagal, Perintah ini hanya bisa di gunakan oleh Owner Emeilia!`, id)
            if (isMedia) {
                const mediaData = await decryptMedia(message)
                const imageBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`
                await tobz.setProfilePic(imageBase64)
                tobz.sendTextWithMentions(`Makasih @${sender.id.replace('@c.us','')} Foto Profilenya 😘`)
            } else if (quotedMsg && quotedMsg.type == 'image') {
                const mediaData = await decryptMedia(quotedMsg)
                const imageBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
                await tobz.setProfilePic(imageBase64)
                tobz.sendTextWithMentions(from, `Makasih @${sender.id.replace('@c.us','')} Foto Profilenya 😘`)
            } else {
                tobz.reply(from, `Wrong Format!\n⚠️ Harap Kirim Gambar Dengan !setprofilepic`, id)
            }
            break
        case prefix+'getpic':
            if (!isGroupMsg) return tobz.reply(from, `Gagal, Fitur ini hanya bisa di gunakan dalam group`, id)
            const texnugm = body.slice(8)
            const getnomber =  await tobz.checkNumberStatus(texnugm)
            const useriq = getnomber.id.replace('@','') + '@c.us'
                try {
                    var jnck = await tobz.getProfilePicFromServer(useriq)

                    tobz.sendFileFromUrl(from, jnck, `awok.jpg`)
                } catch {
                    tobz.reply(from, `Tidak Ada Foto Profile!`, id)
                }
            break
        case prefix+'ban':
            if (!isAdmin) return tobz.reply(from, 'Gagal, Perintah ini hanya bisa di gunakan oleh admin Emeilia!', id)
            for (let i = 0; i < mentionedJidList.length; i++) {
                if ((adminNumber).includes(mentionedJidList[i])) return tobz.reply(from,`Maaf ${pushname}, Kamu tidak bisa banned Admin Emeilia!`, id)
                banned.push(mentionedJidList[i])
                fs.writeFileSync('./lib/banned.json', JSON.stringify(banned))
                tobz.reply(from, `Succes ban target!`,id)
            }
            break
                case 'addban': 
                    if (!isOwner) return tobz.reply(from, 'Perintah *!addban* hanya untuk owner bot!', message.id)
                    if (!args.length >= 1) return tobz.reply(from, 'Masukkan nomornya, *GUNAKAN AWALAN 62* contoh: 6285226236155')  
                    {
                    const texnum = body.slice(6)
                    let text = texnum.replace(/[-\s+]/g,'').replace('@','') + '@c.us'
                    var cek = ban.includes(text);
                    if(cek){
                        return tobz.reply(from, 'Nomor sudah terbanned', id) //if number already exists on database
                    } else {
                        const mentah = await tobz.checkNumberStatus(text) //VALIDATE WHATSAPP NUMBER
                        const hasil = mentah.canReceiveMessage ? `Banned sukses\nTotal user banned sekarang : *${ban.length}*` : false
                        if (!hasil) return tobz.reply(from, 'Nomor WhatsApp tidak valid [ Tidak terdaftar di WhatsApp ]', id) 
                        {
                        ban.push(mentah.id._serialized)
                        fs.writeFileSync('./lib/database/banned.json', JSON.stringify(ban))
                            tobz.sendText(from, hasil)}
                        }
                    }
                    break  
        case prefix+'unban':
            if (!isAdmin) return tobz.reply(from, 'Gagal, Perintah ini hanya bisa di gunakan oleh admin Emeilia!', id)
                let inz = banned.indexOf(mentionedJidList[0])
                banned.splice(inz, 1)
                fs.writeFileSync('./lib/database/banned.json', JSON.stringify(banned))
                tobz.reply(from, 'Unbanned User!', id)
            break
        case prefix+'listgroup':
                tobz.getAllGroups().then((res) => {
                let berhitung1 = 1
                let gc = `*This is list of group* :\n`
                for (let i = 0; i < res.length; i++) {
                    gc += `\n#\n\n*No : ${i+1}*\n*Nama* : ${res[i].name}\n*Pesan Belum Dibaca* : ${res[i].unreadCount} chat\n*Tidak Spam* : ${res[i].notSpam}\n`
                }
                tobz.reply(from, gc, id)
            })
            break
        case prefix+'listbanned':
            let bened = `This is list of banned number\nTotal : ${banned.length}\n`
            for (let i of banned) {
                bened += `➸ ${i.replace(/@c.us/g,'')}\n`
            }
            await tobz.reply(from, bened, id)
            break
        case prefix+'listblock':
            let hih = `This is list of blocked number\nTotal : ${blockNumber.length}\n`
            for (let i of blockNumber) {
                hih += `➸ ${i.replace(/@c.us/g,'')}\n`
            }
            await tobz.reply(from, hih, id)
            break
        case prefix+'stat':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            const loadedMsg = await tobz.getAmountOfLoadedMessages()
            const botadmins = await tobz.iAmAdmin()
            const blockedd = await tobz.getBlockedIds()
            const chatIds = await tobz.getAllChatIds()
            const groups = await tobz.getAllGroups()
            const me = await tobz.getMe()
            const battery = await tobz.getBatteryLevel()
            const isCharging = await tobz.getIsPlugged()
            const timestamp = speed();
            const latensi = speed() - timestamp
            await tobz.reply(from, `*「 𝗦𝗧𝗔𝗧𝗨𝗦 𝗣𝗖 」*\nPenggunaan RAM: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB\nCPU: ${os.cpus()[0].model}\n\n*「 𝗦𝗧𝗔𝗧𝗨𝗦 𝗠𝗘𝗦𝗦𝗔𝗚𝗘 」* :\n- *${loadedMsg}* Loaded Messages\n- *${chatIds.length - groups.length}* Total Chats\n  ├ *${groups.length}* Group Chats\n  └ *${chatIds.length}* Personal Chats\n- *${groups.length}* Groups Joined\n\n*「 𝗦𝗧𝗔𝗧𝗨𝗦 𝗨𝗦𝗘𝗥 」*\n- *${pendaftar.length}* Registered User\n  ├ *${prem.length}* Premium User\n  ├ *${banned.length}* Banned User\n  ├ *${blockedd.length}* Blocked User\n  └ *${adminNumber.length}* Admin User\n\n*「 𝗦𝗧𝗔𝗧𝗨𝗦 𝗗𝗘𝗩𝗜𝗖𝗘 」*\n${(`\n*Battery* : ${battery}% ${isCharging ? 'Lagi Di Cas...' : 'Ga Di Cas!'}\n${Object.keys(me.phone).map(key => `${key} : ${me.phone[key]}`).join('\n')}`.slice(1, -1))}\n\n\n*Speed:* Broom Smartfren Uwu!`, id)
            break
                case prefix+'tag':
                    if(isLimit(serial)) return
                    if(isReg(obj)) return
                    if(cekumur(cekage)) return
                    if (!isGroupMsg) return tobz.reply(from, 'Gagal, perintah ini hanya dapat digunakan di dalam grup', id)
                    if (!args.length >= 1) return await tobz.reply(from, 'pesan tidak boleh kosong', id) ;{
                        const text = body.slice(5)
                        const mem = groupMembers
                        const randMem = mem[Math.floor(Math.random() * mem.length)];
                        const sapa = `${text} 👉 @${randMem}`
                        await tobz.sendTextWithMentions(from, sapa)
                        limitAdd(serial)
                    }
                    break 
        case prefix+'ping':
        case prefix+'speed':
        case prefix+'test':
            const timstamp = speed();
            const latens = speed() - timstamp
            await tobz.reply(from, `Bot Online ✅\n\nKetik !menu buka fiturnya\n\nBroom >> Telkomsel UwU!\n_Speed Bot : ${latens.toFixed(4)} Second_`, id)
            break
        case prefix+'tagme':
		 tobz.sendTextWithMentions(from, `@${sender.id.replace('@c.us','')}`, id)
		break
            case prefix+'pc':
             if (args.length == 0) return tobz.reply(from, `Untuk Pribadi Chat, Silahkan ketik ${prefix}pc [pesannya]`, id)
             argz = body.trim().split('|')
			  const poso = arg[1]
	  tobz.sendText(sender.id, `${poso}\n\n*Emeilia Ai*`)
	  await tobz.reply(from, 'Silahkan cek pesan Bot', id)
	     break
        case prefix+'setgroupname':
            if (!isGroupMsg) return tobz.reply(from, `Gagal, Fitur ini hanya bisa di gunakan dalam group`, id)
            if (!isGroupAdmins) return tobz.reply(from, `Gagal, Fitur ini hanya bisa di gunakan oleh admin group`, id)
            if (!isBotGroupAdmins) return tobz.reply(from, `Gagal, Fitur ini hanya bisa di gunakan ketika bot menjadi admin`, id)
            const namagrup = body.slice(14)
            let sebelum = chat.groupMetadata.formattedName
            let halaman = global.page ? global.page : await tobz.getPage()
            await halaman.evaluate((chatId, subject) =>
            Store.WapQuery.changeSubject(chatId, subject),groupId, `${namagrup}`)
            tobz.sendTextWithMentions(from, `Nama group telah diubah oleh admin @${sender.id.replace('@c.us','')}\n\n• Before: ${sebelum}\n• After: ${namagrup}`)
            break
        case prefix+'setgroupicon':
        case prefix+'seticon':
            if (!isGroupMsg) return tobz.reply(from, `Gagal, Fitur ini hanya bisa di gunakan dalam group`, id)
            if (!isGroupAdmins) return tobz.reply(from, `Gagal, Fitur ini hanya bisa di gunakan oleh admin group`, id)
            if (!isBotGroupAdmins) return tobz.reply(from, `Gagal, Fitur ini hanya bisa di gunakan ketika bot menjadi admin`, id)
            if (isMedia) {
                const mediaData = await decryptMedia(message)
                const imageBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`
                await tobz.setGroupIcon(from, imageBase64)
                tobz.sendTextWithMentions(from, `Profile group telah diubah oleh admin @${sender.id.replace('@c.us','')}`)
            } else if (quotedMsg && quotedMsg.type == 'image') {
                const mediaData = await decryptMedia(quotedMsg)
                const imageBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
                await tobz.setGroupIcon(from, imageBase64)
                tobz.sendTextWithMentions(from, `Profile group telah diubah oleh admin @${sender.id.replace('@c.us','')}`)
            } else {
                tobz.reply(from, `Wrong Format!\n⚠️ Harap Kirim Gambar Dengan !setgroupicon`, id)
            }
            break
        case prefix+'bugreport':
        case prefix+'bug':
        case prefix+'report':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (args.length === 1) return tobz.reply(from, '[❗] Kirim perintah *!bugreport [teks]*\ncontoh : *!bugreport Permisi Owner, Ada bug pada command !otakudesu, Tolong diperbaiki*')
            const bug = body.slice(11)
            if(!bug) return
            if(isGroupMsg){
                tobz.sendText(ownNumber, `*[BUG REPORT]*\n*WAKTU* : ${time}\nNO PENGIRIM : wa.me/${sender.id.match(/\d+/g)}\nGroup : ${formattedTitle}\n\n${bug}`)
                tobz.sendText(owrNumber, `*[BUG REPORT]*\n*WAKTU* : ${time}\nNO PENGIRIM : wa.me/${sender.id.match(/\d+/g)}\nGroup : ${formattedTitle}\n\n${bug}`)
                tobz.reply(from, 'Masalah telah di laporkan ke owner BOT, laporan palsu/main2 tidak akan ditanggapi.' ,id)
            }else{
                tobz.sendText(ownNumber, `*[BUG REPORT]*\n*WAKTU* : ${time}\nNO PENGIRIM : wa.me/${sender.id.match(/\d+/g)}\n\n${bug}`)
                tobz.sendText(owrNumber, `*[BUG REPORT]*\n*WAKTU* : ${time}\nNO PENGIRIM : wa.me/${sender.id.match(/\d+/g)}\n\n${bug}`)
               tobz.reply(from, 'Masalah telah di laporkan ke owner BOT, laporan palsu/main2 tidak akan ditanggapi.', id)
            }
            break
                case prefix+'santet': //work
                    if(isLimit(serial)) return
                    if(isReg(obj)) return
                    if(cekumur(cekage)) return
                    if (!isGroupMsg) return tobz.reply(from, 'Maaf, perintah ini hanya dapat dipakai didalam grup!', id)
                    if (mentionedJidList.length === 0) return tobz.reply(from, 'Tag member yang mau disantet', id)
                    if (args.length === 1) return tobz.reply(from, 'Masukkan alasan kenapa menyantet dia!!', id)
                        const target = arg.split('|')[0]
                        const alasan = arg.split('|')[1]
                        await tobz.sendTextWithMentions(from, `Santet terkirim ke ${target}, Dengan alasan${alasan}`)
                        limitAdd(serial)
                break 
       case prefix+'jadian':
                    if(isLimit(serial)) return
                    if(isReg(obj)) return
                    if(cekumur(cekage)) return
                    if (!isGroupMsg) return tobz.reply(from, 'perintah ini hanya dapat digunakan di dalam grup', id)
                    const mem = groupMembers
                    const aku = mem[Math.floor(Math.random() * mem.length)];
                    const kamu = mem[Math.floor(Math.random() * mem.length)];
                    const sapa = `Cieee... @${aku.replace(/[@c.us]/g, '')} (💘) @${kamu.replace(/[@c.us]/g, '')} baru jadian nih\nBagi pj nya dong`
                    await tobz.sendTextWithMentions(from, sapa)
                    limitAdd(serial)
                    break  
               case prefix+'profile':{
                    if(isLimit(serial)) return
                    if(isReg(obj)) return
                    if(cekumur(cekage)) return
                    if (!args.length === 1) return await tobz.reply(from, 'Mention salah satu member!', id) 
                    const texnum = body.slice(9)
                    const getnumber =  await tobz.checkNumberStatus(texnum)
                    const userid = getnumber.id.replace('@','') + '@c.us'
                    const premi = prem.includes(userid)
                    const blocked = await tobz.getBlockedIds()
                    const isblocked = blocked.includes(userid)
                    const ct = await tobz.getContact(userid)
                    const isOnline = await tobz.isChatOnline(userid) ? '✔' : '❌'
                    var sts = await tobz.getStatus(userid)
                    const bio = sts
                    const admins = groupAdmins.includes(userid) ? 'Admin' : 'Member biasa'
                    var found = false
                        Object.keys(pendaftar).forEach((i) => {
                            if(pendaftar[i].id == userid){
                                found = i
                            }
                        })
                        if (found !== false) {
                            pendaftar[found].id = userid;
                            var regist = '✔'
                        } else {
                            var regist = '❌'
                        }
                    var adm = admins
                    if (ct == null) {
                        return await tobz.reply(from, 'Nomor WhatsApp tidak valid [ Tidak terdaftar di WhatsApp ]', id) 
                    } else {
                    const contact = ct.pushname
                    const dp = await tobz.getProfilePicFromServer(userid)
                    if (dp == undefined) {
                        var pfp = 'https://raw.githubusercontent.com/Gimenz/line-break/master/profil.jpg'
                        } else {
                        var pfp = dp
                        } 
                    if (contact == undefined) {
                        var nama = '_Dia pemalu, tidak mau menampilkan namanya_' 
                        } else {
                        var nama = contact
                        } 
                    const caption = `*Detail Member* ✨ \n\n● *Name :* ${nama}\n● *Bio :* ${bio.status}\n● *Chat link :* wa.me/${getnumber.id.replace('@', '')}\n● *Role :* ${adm}\n● *Banned by Bot :* ${banned ? '✔' : '❌'}\n● *Blocked by Bot :* ${isblocked ? '✔' : '❌'}\n● *Chat with bot :* ${isOnline}\n● *User Premium :* ${premi ? '✔' : '❌'}\n● *Registered User :* ${regist}`
                    tobz.sendFileFromUrl(from, pfp, 'dp.jpg', caption)
                    limitAdd(serial)
                    }
                    }
                break   
         case prefix+'me':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (isGroupMsg) {
                if (!quotedMsg) {
                    var block = blockNumber.includes(author)
                    var bend = banned.includes(author)
                    var sts = await tobz.getStatus(author)
                    var adm = isGroupAdmins
                    var donate = isAdmin
                    var ctt = await tobz.getContact(author)
                    const { status } = sts
                    var found = false
                    Object.keys(pendaftar).forEach((i) => {
                        if(pendaftar[i].id == author){
                            found = i
                        }
                    })
                    if (found !== false) {
                        pendaftar[found].id = author;
                        var registe = '✔'
                    } else {
                        var registe = '❌'
                    }
                    if (ctt == null) {
                    return await tobz.reply(from, `Nomor WhatsApp tidak valid [ Tidak terdaftar di WhatsApp ]`, id) 
                    } else {
                        const contact = ctt.pushname
                        const dpd = await tobz.getProfilePicFromServer(author)
                    if (dpd == undefined) {
                        var pfp = errorurl
                        } else {
                            var pfp = dpd
                        } 
                    if (contact == undefined) {
                        var namae = '*Tidak Ada Nama*' 
                    } else {
                        var namae = contact
                    } 
                        await tobz.sendContact(chatId, author)
                        tobz.sendFileFromUrl(from, pfp, 'pfp.jpg', `*「 PROFILE 」*\n\n• *Username: ${namae}*\n• *User Info: ${status}*\n*• Block : ${block}*\n*• Banned : ${bend}*\n• *Admin Group: ${adm}*\n• *Admin Emeilia: ${donate}*\n• *Registered User :* ${registe}`)
                    }
                } else if (quotedMsg) {
                    var qmid = quotedMsgObj.sender.id
                    var block = blockNumber.includes(qmid)
                    var bend = banned.includes(qmid)
                    var gpic = await tobz.getProfilePicFromServer(qmid)
                    var namae = quotedMsgObj.sender.name
                    var sts = await tobz.getStatus(qmid)
                    var ctt = await tobz.getContact(qmid)
                    var adm = isGroupAdmins
                    var donate = isAdmin
                    const { status } = sts
                    Object.keys(pendaftar).forEach((i) => {
                        if(pendaftar[i].id == qmid){
                            found = i
                        }
                    })
                    if (found !== false) {
                        pendaftar[found].id = qmid;
                        var registe = '✔'
                    } else {
                        var registe = '❌'
                    }
                    if (ctt == null) {
                    return await tobz.reply(from, `Nomor WhatsApp tidak valid [ Tidak terdaftar di WhatsApp ]`, id) 
                    } else {
                        const contact = ctt.pushname
                        const dpd = await tobz.getProfilePicFromServer(qmid)
                    if (dpd == undefined) {
                        var pfp = errorurl
                        } else {
                            var pfp = dpd
                        } 
                    if (contact == undefined) {
                        var namae = '*Tidak Ada Nama*' 
                    } else {
                        var namae = contact
                    } 
                    await tobz.sendContact(chatId, qmid)
                    tobz.sendFileFromUrl(from, pfp, 'pfp.jpg', `*「 PROFILE 」*\n\n• *Username: ${namae}*\n• *User Info: ${status}*\n*• Block : ${block}*\n*• Banned : ${bend}*\n• *Admin Group: ${adm}*\n• *Admin Emeilia: ${donate}*\n• *Registered User :* ${registe}`)
                    }
                }
            }
            break
        case prefix+'slot':
          const somtoy = sotoy[Math.floor(Math.random() * (sotoy.length))]	
             tobz.reply(from, `[  🎰 | SLOTS ]\n-----------------\n🍋 : 🍌 : 🍍\n${somtoy}<=====\n🍋 : 🍌 : 🍍\n[  🎰 | SLOTS ]\n\nKeterangan : Jika anda Mendapatkan 3Buah anda Menang\n\nContoh : 🍌 : 🍌 : 🍌<=====`, id)
	    break
            case prefix+'gpsticker':
                if(isReg(obj)) return
                    if(cekumur(cekage)) return 
                tobz.reply(from, mess.wait, id)
                const giph = ['http://i.imgur.com/UGw1mKB.gif','http://i.imgur.com/pqnXV9o.gif','http://25.media.tumblr.com/3001a8872eff95532084422a9e3bbb5e/tumblr_mgt8eaMwyS1r75klfo1_250.gif']
                      let giphy = giph[Math.floor(Math.random() * giph.length)]
                       tobz.sendStickerfromUrl(from, giphy)
                       break
            case prefix+'rstik':
            case prefix+'rstick': 
            case prefix+'rsticker':            
    if(isReg(obj)) return
                    if(cekumur(cekage)) return 
                tobz.reply(from, mess.wait, id)
                       const walnimeo = ['https://camo.githubusercontent.com/9c184e56a76795eaeb8e7584424520de07a9aa4db57323f626ef9ff7730f62b9/68747470733a2f2f6d656469612e67697068792e636f6d2f6d656469612f34644d3155373661415133646245366263332f67697068792e676966','https://camo.githubusercontent.com/0afcc6050ce6d1858e1f8136ad418fadea998a0188ae20364504ed6c9bbb6b2c/68747470733a2f2f696d61676573352e616c706861636f646572732e636f6d2f3931312f3931313631342e706e67','https://raw.githubusercontent.com/mhankbarbar/whatsapp-bot/master/media/img/Kaguya.png','https://images.alphacoders.com/605/thumb-350-605592.png','https://images5.alphacoders.com/481/thumb-350-481903.png','https://images7.alphacoders.com/611/thumb-350-611138.png','https://images4.alphacoders.com/476/thumb-350-47698.png','https://images2.alphacoders.com/727/thumb-350-72732.png','https://images5.alphacoders.com/314/thumb-350-314574.png','https://cdn.nekos.life/wallpaper/QwGLg4oFkfY.png','https://cdn.nekos.life/wallpaper/bUzSjcYxZxQ.jpg','https://cdn.nekos.life/wallpaper/j49zxzaUcjQ.jpg','https://cdn.nekos.life/wallpaper/YLTH5KuvGX8.png','https://cdn.nekos.life/wallpaper/Xi6Edg133m8.jpg','https://cdn.nekos.life/wallpaper/qvahUaFIgUY.png','https://cdn.nekos.life/wallpaper/leC8q3u8BSk.jpg','https://cdn.nekos.life/wallpaper/tSUw8s04Zy0.jpg','https://cdn.nekos.life/wallpaper/sqsj3sS6EJE.png','https://cdn.nekos.life/wallpaper/HmjdX_s4PU4.png','https://cdn.nekos.life/wallpaper/Oe2lKgLqEXY.jpg','https://cdn.nekos.life/wallpaper/GTwbUYI-xTc.jpg','https://cdn.nekos.life/wallpaper/nn_nA8wTeP0.png','https://cdn.nekos.life/wallpaper/Q63o6v-UUa8.png','https://cdn.nekos.life/wallpaper/ZXLFm05K16Q.jpg','https://cdn.nekos.life/wallpaper/cwl_1tuUPuQ.png','https://cdn.nekos.life/wallpaper/wWhtfdbfAgM.jpg','https://cdn.nekos.life/wallpaper/3pj0Xy84cPg.jpg','https://cdn.nekos.life/wallpaper/sBoo8_j3fkI.jpg','https://cdn.nekos.life/wallpaper/gCUl_TVizsY.png','https://cdn.nekos.life/wallpaper/LmTi1k9REW8.jpg','https://cdn.nekos.life/wallpaper/sbq_4WW2PUM.jpg','https://cdn.nekos.life/wallpaper/QOSUXEbzDQA.png','https://cdn.nekos.life/wallpaper/khaqGIHsiqk.jpg','https://cdn.nekos.life/wallpaper/iFtEXugqQgA.png','https://cdn.nekos.life/wallpaper/deFKIDdRe1I.jpg','https://cdn.nekos.life/wallpaper/OHZVtvDm0gk.jpg','https://cdn.nekos.life/wallpaper/YZYa00Hp2mk.jpg','https://cdn.nekos.life/wallpaper/R8nPIKQKo9g.png','https://cdn.nekos.life/wallpaper/_brn3qpRBEE.jpg','https://cdn.nekos.life/wallpaper/ADTEQdaHhFI.png','https://cdn.nekos.life/wallpaper/MGvWl6om-Fw.jpg','https://cdn.nekos.life/wallpaper/YGmpjZW3AoQ.jpg','https://cdn.nekos.life/wallpaper/hNCgoY-mQPI.jpg','https://cdn.nekos.life/wallpaper/3db40hylKs8.png','https://cdn.nekos.life/wallpaper/iQ2FSo5nCF8.jpg','https://cdn.nekos.life/wallpaper/meaSEfeq9QM.png','https://cdn.nekos.life/wallpaper/CmEmn79xnZU.jpg','https://cdn.nekos.life/wallpaper/MAL18nB-yBI.jpg','https://cdn.nekos.life/wallpaper/FUuBi2xODuI.jpg','https://cdn.nekos.life/wallpaper/ez-vNNuk6Ck.jpg','https://cdn.nekos.life/wallpaper/K4-z0Bc0Vpc.jpg','https://cdn.nekos.life/wallpaper/Y4JMbswrNg8.jpg','https://cdn.nekos.life/wallpaper/ffbPXIxt4-0.png','https://cdn.nekos.life/wallpaper/x63h_W8KFL8.jpg','https://cdn.nekos.life/wallpaper/lktzjDRhWyg.jpg','https://cdn.nekos.life/wallpaper/j7oQtvRZBOI.jpg','https://cdn.nekos.life/wallpaper/MQQEAD7TUpQ.png','https://cdn.nekos.life/wallpaper/lEG1-Eeva6Y.png','https://cdn.nekos.life/wallpaper/Loh5wf0O5Aw.png','https://cdn.nekos.life/wallpaper/yO6ioREenLA.png','https://cdn.nekos.life/wallpaper/4vKWTVgMNDc.jpg','https://cdn.nekos.life/wallpaper/Yk22OErU8eg.png','https://cdn.nekos.life/wallpaper/Y5uf1hsnufE.png','https://cdn.nekos.life/wallpaper/xAmBpMUd2Zw.jpg','https://cdn.nekos.life/wallpaper/f_RWFoWciRE.jpg','https://cdn.nekos.life/wallpaper/Y9qjP2Y__PA.jpg','https://cdn.nekos.life/wallpaper/eqEzgohpPwc.jpg','https://cdn.nekos.life/wallpaper/s1MBos_ZGWo.jpg','https://cdn.nekos.life/wallpaper/PtW0or_Pa9c.png','https://cdn.nekos.life/wallpaper/32EAswpy3M8.png','https://cdn.nekos.life/wallpaper/Z6eJZf5xhcE.png','https://cdn.nekos.life/wallpaper/xdiSF731IFY.jpg','https://cdn.nekos.life/wallpaper/Y9r9trNYadY.png','https://cdn.nekos.life/wallpaper/8bH8CXn-sOg.jpg','https://cdn.nekos.life/wallpaper/a02DmIFzRBE.png','https://cdn.nekos.life/wallpaper/MnrbXcPa7Oo.png','https://cdn.nekos.life/wallpaper/s1Tc9xnugDk.jpg','https://cdn.nekos.life/wallpaper/zRqEx2gnfmg.jpg','https://cdn.nekos.life/wallpaper/PtW0or_Pa9c.png','https://cdn.nekos.life/wallpaper/0ECCRW9soHM.jpg','https://cdn.nekos.life/wallpaper/kAw8QHl_wbM.jpg','https://cdn.nekos.life/wallpaper/ZXcaFmpOlLk.jpg','https://cdn.nekos.life/wallpaper/WVEdi9Ng8UE.png','https://cdn.nekos.life/wallpaper/IRu29rNgcYU.png','https://cdn.nekos.life/wallpaper/LgIJ_1AL3rM.jpg','https://cdn.nekos.life/wallpaper/DVD5_fLJEZA.jpg','https://cdn.nekos.life/wallpaper/siqOQ7k8qqk.jpg','https://cdn.nekos.life/wallpaper/CXNX_15eGEQ.png','https://cdn.nekos.life/wallpaper/s62tGjOTHnk.jpg','https://cdn.nekos.life/wallpaper/tmQ5ce6EfJE.png','https://cdn.nekos.life/wallpaper/Zju7qlBMcQ4.jpg','https://cdn.nekos.life/wallpaper/CPOc_bMAh2Q.png','https://cdn.nekos.life/wallpaper/Ew57S1KtqsY.jpg','https://cdn.nekos.life/wallpaper/hVpFbYJmZZc.jpg','https://cdn.nekos.life/wallpaper/sb9_J28pftY.jpg','https://cdn.nekos.life/wallpaper/JDoIi_IOB04.jpg','https://cdn.nekos.life/wallpaper/rG76AaUZXzk.jpg','https://cdn.nekos.life/wallpaper/9ru2luBo360.png','https://cdn.nekos.life/wallpaper/ghCgiWFxGwY.png','https://cdn.nekos.life/wallpaper/OSR-i-Rh7ZY.png','https://cdn.nekos.life/wallpaper/65VgtPyweCc.jpg','https://cdn.nekos.life/wallpaper/3vn-0FkNSbM.jpg','https://cdn.nekos.life/wallpaper/u02Y0-AJPL0.jpg','https://cdn.nekos.life/wallpaper/_-Z-0fGflRc.jpg','https://cdn.nekos.life/wallpaper/3VjNKqEPp58.jpg','https://cdn.nekos.life/wallpaper/NoG4lKnk6Sc.jpg','https://cdn.nekos.life/wallpaper/xiTxgRMA_IA.jpg','https://cdn.nekos.life/wallpaper/yq1ZswdOGpg.png','https://cdn.nekos.life/wallpaper/4SUxw4M3UMA.png','https://cdn.nekos.life/wallpaper/cUPnQOHNLg0.jpg','https://cdn.nekos.life/wallpaper/zczjuLWRisA.jpg','https://cdn.nekos.life/wallpaper/TcxvU_diaC0.png','https://cdn.nekos.life/wallpaper/7qqWhEF_uoY.jpg','https://cdn.nekos.life/wallpaper/J4t_7DvoUZw.jpg','https://cdn.nekos.life/wallpaper/xQ1Pg5D6J4U.jpg','https://cdn.nekos.life/wallpaper/aIMK5Ir4xho.jpg','https://cdn.nekos.life/wallpaper/6gneEXrNAWU.jpg','https://cdn.nekos.life/wallpaper/PSvNdoISWF8.jpg','https://cdn.nekos.life/wallpaper/SjgF2-iOmV8.jpg','https://cdn.nekos.life/wallpaper/vU54ikOVY98.jpg','https://cdn.nekos.life/wallpaper/QjnfRwkRU-Q.jpg','https://cdn.nekos.life/wallpaper/uSKqzz6ZdXc.png','https://cdn.nekos.life/wallpaper/AMrcxZOnVBE.jpg','https://cdn.nekos.life/wallpaper/N1l8SCMxamE.jpg','https://cdn.nekos.life/wallpaper/n2cBaTo-J50.png','https://cdn.nekos.life/wallpaper/ZXcaFmpOlLk.jpg','https://cdn.nekos.life/wallpaper/7bwxy3elI7o.png','https://cdn.nekos.life/wallpaper/7VW4HwF6LcM.jpg','https://cdn.nekos.life/wallpaper/YtrPAWul1Ug.png','https://cdn.nekos.life/wallpaper/1p4_Mmq95Ro.jpg','https://cdn.nekos.life/wallpaper/EY5qz5iebJw.png','https://cdn.nekos.life/wallpaper/aVDS6iEAIfw.jpg','https://cdn.nekos.life/wallpaper/veg_xpHQfjE.jpg','https://cdn.nekos.life/wallpaper/meaSEfeq9QM.png','https://cdn.nekos.life/wallpaper/Xa_GtsKsy-s.png','https://cdn.nekos.life/wallpaper/6Bx8R6D75eM.png','https://cdn.nekos.life/wallpaper/zXOGXH_b8VY.png','https://cdn.nekos.life/wallpaper/VQcviMxoQ00.png','https://cdn.nekos.life/wallpaper/CJnRl-PKWe8.png','https://cdn.nekos.life/wallpaper/zEWYfFL_Ero.png','https://cdn.nekos.life/wallpaper/_C9Uc5MPaz4.png','https://cdn.nekos.life/wallpaper/zskxNqNXyG0.jpg','https://cdn.nekos.life/wallpaper/g7w14PjzzcQ.jpg','https://cdn.nekos.life/wallpaper/KavYXR_GRB4.jpg','https://cdn.nekos.life/wallpaper/Z_r9WItzJBc.jpg','https://cdn.nekos.life/wallpaper/Qps-0JD6834.jpg','https://cdn.nekos.life/wallpaper/Ri3CiJIJ6M8.png','https://cdn.nekos.life/wallpaper/ArGYIpJwehY.jpg','https://cdn.nekos.life/wallpaper/uqYKeYM5h8w.jpg','https://cdn.nekos.life/wallpaper/h9cahfuKsRg.jpg','https://cdn.nekos.life/wallpaper/iNPWKO8d2a4.jpg','https://cdn.nekos.life/wallpaper/j2KoFVhsNig.jpg','https://cdn.nekos.life/wallpaper/z5Nc-aS6QJ4.jpg','https://cdn.nekos.life/wallpaper/VUFoK8l1qs0.png','https://cdn.nekos.life/wallpaper/rQ8eYh5mXN8.png','https://cdn.nekos.life/wallpaper/D3NxNISDavQ.png','https://cdn.nekos.life/wallpaper/Z_CiozIenrU.jpg','https://cdn.nekos.life/wallpaper/np8rpfZflWE.jpg','https://cdn.nekos.life/wallpaper/ED-fgS09gik.jpg','https://cdn.nekos.life/wallpaper/AB0Cwfs1X2w.jpg','https://cdn.nekos.life/wallpaper/DZBcYfHouiI.jpg','https://cdn.nekos.life/wallpaper/lC7pB-GRAcQ.png','https://cdn.nekos.life/wallpaper/zrI-sBSt2zE.png','https://cdn.nekos.life/wallpaper/_RJhylwaCLk.jpg','https://cdn.nekos.life/wallpaper/6km5m_GGIuw.png','https://cdn.nekos.life/wallpaper/3db40hylKs8.png','https://cdn.nekos.life/wallpaper/oggceF06ONQ.jpg','https://cdn.nekos.life/wallpaper/ELdH2W5pQGo.jpg','https://cdn.nekos.life/wallpaper/Zun_n5pTMRE.png','https://cdn.nekos.life/wallpaper/VqhFKG5U15c.png','https://cdn.nekos.life/wallpaper/NsMoiW8JZ60.jpg','https://cdn.nekos.life/wallpaper/XE4iXbw__Us.png','https://cdn.nekos.life/wallpaper/a9yXhS2zbhU.jpg','https://cdn.nekos.life/wallpaper/jjnd31_3Ic8.jpg','https://cdn.nekos.life/wallpaper/Nxanxa-xO3s.png','https://cdn.nekos.life/wallpaper/dBHlPcbuDc4.jpg','https://cdn.nekos.life/wallpaper/6wUZIavGVQU.jpg','https://cdn.nekos.life/wallpaper/_-Z-0fGflRc.jpg','https://cdn.nekos.life/wallpaper/H9OUpIrF4gU.jpg','https://cdn.nekos.life/wallpaper/xlRdH3fBMz4.jpg','https://cdn.nekos.life/wallpaper/7IzUIeaae9o.jpg','https://cdn.nekos.life/wallpaper/FZCVL6PyWq0.jpg','https://cdn.nekos.life/wallpaper/5dG-HH6d0yw.png','https://cdn.nekos.life/wallpaper/ddxyA37HiwE.png','https://cdn.nekos.life/wallpaper/I0oj_jdCD4k.jpg','https://cdn.nekos.life/wallpaper/ABchTV97_Ts.png','https://cdn.nekos.life/wallpaper/58C37kkq39Y.png','https://cdn.nekos.life/wallpaper/HMS5mK7WSGA.jpg','https://cdn.nekos.life/wallpaper/1O3Yul9ojS8.jpg','https://cdn.nekos.life/wallpaper/hdZI1XsYWYY.jpg','https://cdn.nekos.life/wallpaper/h8pAJJnBXZo.png','https://cdn.nekos.life/wallpaper/apO9K9JIUp8.jpg','https://cdn.nekos.life/wallpaper/p8f8IY_2mwg.jpg','https://cdn.nekos.life/wallpaper/HY1WIB2r_cE.jpg','https://cdn.nekos.life/wallpaper/u02Y0-AJPL0.jpg','https://cdn.nekos.life/wallpaper/jzN74LcnwE8.png','https://cdn.nekos.life/wallpaper/IeAXo5nJhjw.jpg','https://cdn.nekos.life/wallpaper/7lgPyU5fuLY.jpg','https://cdn.nekos.life/wallpaper/f8SkRWzXVxk.png','https://cdn.nekos.life/wallpaper/ZmDTpGGeMR8.jpg','https://cdn.nekos.life/wallpaper/AMrcxZOnVBE.jpg','https://cdn.nekos.life/wallpaper/ZhP-f8Icmjs.jpg','https://cdn.nekos.life/wallpaper/7FyUHX3fE2o.jpg','https://cdn.nekos.life/wallpaper/CZoSLK-5ng8.png','https://cdn.nekos.life/wallpaper/pSNDyxP8l3c.png','https://cdn.nekos.life/wallpaper/AhYGHF6Fpck.jpg','https://cdn.nekos.life/wallpaper/ic6xRRptRes.jpg','https://cdn.nekos.life/wallpaper/89MQq6KaggI.png','https://cdn.nekos.life/wallpaper/y1DlFeHHTEE.png']                    
                       let walnimeok = walnimeo[Math.floor(Math.random() * walnimeo.length)]
                       tobz.sendStickerfromUrl(from, walnimeok)
                       break

        // LIST MENU
       case prefix+'runtime':
            tobz.reply(from, `*Emeilia telah aktif selama :*\n*${cts}*`, id)
            break
	case prefix+'menu':
	case '?menu':
	case '?':
	case '??':
	case '???':
	case '#menu':
	case '#':
	case '.menu':
	case '!menu':
	case prefix+'help':
	case prefix+'cmd':
        //if (!isPublic) return tobz.reply(from, mess.public, id)        
	if(isReg(obj)) return
	const reXp  = 5000 * (Math.pow(2, getLevelingLevel(sender.id)) - 1)
	const uagku = checkATMuser(sender.id)
		await tobz.reply(from, cmd(pushname, prefix, moment, getLevelingLevel, getLevelingXp, sender, reXp, pendaftar, uagku, role), id)
	             await sleep(5000)
                    tobz.reply(from, help(pushname, prefix, cts, sender, reXp, pendaftar, uagku, role), id)
            //tobz.reply(from, help.replace(undefined, pushname), message.id)
		break
	case prefix+'infobot':
    				tobz.reply(from, bottt(prefix), id)
    				break
        case prefix+'liagroup':
            tobz.reply(from, `Link Group Emeilia Official! :\nhttps://chat.whatsapp.com/ESvMAbC40fH3zamseToCjQ\nJangan Lupa Join Ya Kak ${pushname}`, id)
            break
        case prefix+'groupmenu':
        case prefix+'adminmenu':
        if(isReg(obj)) return
            if (!isGroupMsg) return tobz.reply(from, 'perintah ini hanya dapat digunakan di dalam grup', id)
            tobz.reply(from, groupcmd(prefix), id)
            break
        case prefix+'mediamenu':
        if(isReg(obj)) return
            tobz.reply(from, mediacmd(prefix), id)
            break
        case prefix+'funmenu':
        if(isReg(obj)) return
        //if (!isPublic) return tobz.reply(from, mess.public, id)
            tobz.reply(from, funcmd(prefix), id)
            break
        case prefix+'animemenu':
        if(isReg(obj)) return
            if (!isGroupMsg) return tobz.reply(from, 'perintah ini hanya dapat digunakan di dalam grup', id)
            tobz.reply(from, animecmd(prefix), id)
            break
        case prefix+'dompet':
	//if (!isPublic) return tobz.reply(from, `*ᴍᴀᴀꜰ ʙᴏᴛ ꜱᴇᴋᴀʀᴀɴɢ ꜱᴜᴅᴀʜ ᴅɪᴩʀɪᴠᴀᴛᴇ ᴏʟᴇʜ ᴏᴡɴᴇʀ*\n*Untuk lebih jelasnya chat Owner : wa.me/6289675134806*`, id)
        if(isReg(obj)) return
	const reqXp  = 5000 * (Math.pow(2, getLevelingLevel(sender.id)) - 1)
	const uangku = checkATMuser(sender.id)
        if (!isGroupMsg) return tobz.reply(from, 'perintah ini hanya dapat digunakan di dalam grup', id)
            tobz.reply(from, kerangcmd(pushname, prefix, cts, sender, getLevelingXp, getLevelingLevel, reqXp, pendaftar, uangku, role), id)
            break
        case prefix+'downloadmenu':
        if(isReg(obj)) return
	if (!isSound) return tobz.reply(from, `*ᴍᴀᴀꜰ ʙᴏᴛ ꜱᴇᴋᴀʀᴀɴɢ ꜱᴜᴅᴀʜ ᴅɪᴩʀɪᴠᴀᴛᴇ ᴏʟᴇʜ ᴏᴡɴᴇʀ*\n*ᴜɴᴛᴜᴋ ʟᴇʙɪʜ ᴊᴇʟᴀꜱɴyᴀ ᴋᴇᴛɪᴋ*\n*${prefix}infobot*`, id)
            tobz.reply(from, downloadcmd(prefix), id)
            break
        case prefix+'othermenu':
        if(isReg(obj)) return
	if (!isSound) return tobz.reply(from, `*ᴍᴀᴀꜰ ʙᴏᴛ ꜱᴇᴋᴀʀᴀɴɢ ꜱᴜᴅᴀʜ ᴅɪᴩʀɪᴠᴀᴛᴇ ᴏʟᴇʜ ᴏᴡɴᴇʀ*\n*ᴜɴᴛᴜᴋ ʟᴇʙɪʜ ᴊᴇʟᴀꜱɴyᴀ ᴋᴇᴛɪᴋ*\n*${prefix}infobot*`, id)
            tobz.reply(from, othercmd(prefix), id)
            break
        case prefix+'iklan':
            tobz.reply(from, sewa(), id)
            break
        case prefix+'liamenu':
            if (!isAdmin) return tobz.reply(from, 'Perintah ini hanya untuk Admin Emeilia', id)
            tobz.reply(from, admincmd(prefix), id)
            break
        case prefix+'ownermenu':
        //if (!isPublic) return tobz.reply(from, mess.public, id) 
            if (!isOwner) return tobz.reply(from, 'Perintah ini hanya untuk Owner Emeilia', id)
            tobz.reply(from, ownercmd(prefix), id)
            break
        case prefix+'listsound':
        if(isReg(obj)) return
	if (!isSound) return tobz.reply(from, `Fitur sound belum diaktifkan di group ini.`, id)
            tobz.reply(from, praycmd(prefix), id)
            break
        case prefix+'premiummenu':
            if (!isPremium) return tobz.reply(from, 'Maaf, ini adalah fitur premium, untuk menggunakan fitur ini silahkan donasi, Kirim !donasi untuk melihat info donasi', id)
            tobz.reply(from, premcmd(prefix), id)
            break
        case prefix+'nsfwmenu':
            if (!isGroupMsg) return tobz.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (!isNsfw) return tobz.reply(from, 'command/Perintah NSFW belum di aktifkan di group ini!', id)
            tobz.reply(from, nsfwcmd(prefix), id)
            break
        // GENRE ANIME
        case prefix+'animesaran':
        if(isReg(obj)) return
        //if (!isPublic) return tobz.reply(from, mess.public, id)
            if (!isGroupMsg) return tobz.reply(from, 'perintah ini hanya dapat digunakan di dalam grup', id)
            tobz.reply(from, animesaran(), id)
            break
        case prefix+'genreanime':
        case prefix+'ganime':
        if(isReg(obj)) return
            if(isLimit(serial)) return
        //if (!isPublic) return tobz.reply(from, mess.public, id)  
            if (!isGroupMsg) return tobz.reply(from, 'perintah ini hanya dapat digunakan di dalam grup', id)
            tobz.reply(from, genre(prefix), id)
            limitAdd(serial)
            break
        case prefix+'gdrama':
            if(isLimit(serial)) return
        //if (!isPublic) return tobz.reply(from, mess.public, id)   
            if (!isGroupMsg) return tobz.reply(from, 'perintah ini hanya dapat digunakan di dalam grup', id)
            tobz.reply(from, drama1(), id)
            limitAdd(serial)
            break
        case prefix+'gdrama2':
            if(isLimit(serial)) return
        //if (!isPublic) return tobz.reply(from, mess.public, id)   
            if (!isGroupMsg) return tobz.reply(from, 'perintah ini hanya dapat digunakan di dalam grup', id)
            tobz.reply(from, drama2(), id)
            limitAdd(serial)
            break
        case prefix+'gharem':
            if(isLimit(serial)) return
        //if (!isPublic) return tobz.reply(from, mess.public, id)   
            if (!isGroupMsg) return tobz.reply(from, 'perintah ini hanya dapat digunakan di dalam grup', id)
            tobz.reply(from, harem(), id)
            limitAdd(serial)
            break 
        case prefix+'gharem2':
            if(isLimit(serial)) return
        //if (!isPublic) return tobz.reply(from, mess.public, id)   
            if (!isGroupMsg) return tobz.reply(from, 'perintah ini hanya dapat digunakan di dalam grup', id)
            tobz.reply(from, harem2(), id)
            limitAdd(serial)
            break 
        case prefix+'greverse':
            if(isLimit(serial)) return
        //if (!isPublic) return tobz.reply(from, mess.public, id)   
            if (!isGroupMsg) return tobz.reply(from, 'perintah ini hanya dapat digunakan di dalam grup', id)
            tobz.reply(from, reverse(), id)
            limitAdd(serial)
            break
        case prefix+'gisekai':
            if(isLimit(serial)) return
        //if (!isPublic) return tobz.reply(from, mess.public, id)   
            if (!isGroupMsg) return tobz.reply(from, 'perintah ini hanya dapat digunakan di dalam grup', id)
            tobz.reply(from, isekai(), id)
            limitAdd(serial)
            break       
        case prefix+'gcomedi':
            if(isLimit(serial)) return
        //if (!isPublic) return tobz.reply(from, mess.public, id)   
            if (!isGroupMsg) return tobz.reply(from, 'perintah ini hanya dapat digunakan di dalam grup', id)
            tobz.reply(from, comedi(), id)
            limitAdd(serial)
            break
        case prefix+'gromance':
            if(isLimit(serial)) return
        //if (!isPublic) return tobz.reply(from, mess.public, id)   
            if (!isGroupMsg) return tobz.reply(from, 'perintah ini hanya dapat digunakan di dalam grup', id)
            tobz.reply(from, romance(), id)
            limitAdd(serial)
            break
        case prefix+'gromance2':
            if(isLimit(serial)) return
        //if (!isPublic) return tobz.reply(from, mess.public, id)   
            if (!isGroupMsg) return tobz.reply(from, 'perintah ini hanya dapat digunakan di dalam grup', id)
            tobz.reply(from, romance2(), id)
            limitAdd(serial)
            break
        case prefix+'gromancesad':
            if(isLimit(serial)) return
        //if (!isPublic) return tobz.reply(from, mess.public, id)   
            if (!isGroupMsg) return tobz.reply(from, 'perintah ini hanya dapat digunakan di dalam grup', id)
            tobz.reply(from, romancesad(), id)
            limitAdd(serial)
            break
        case prefix+'gromanceshoujo':
            if(isLimit(serial)) return
        //if (!isPublic) return tobz.reply(from, mess.public, id)   
            if (!isGroupMsg) return tobz.reply(from, 'perintah ini hanya dapat digunakan di dalam grup', id)
            tobz.reply(from, romanceshoujo(), id)
            limitAdd(serial)
            break
        case prefix+'gcomedischool':
            if(isLimit(serial)) return
        //if (!isPublic) return tobz.reply(from, mess.public, id)   
            if (!isGroupMsg) return tobz.reply(from, 'perintah ini hanya dapat digunakan di dalam grup', id)
            tobz.reply(from, comedischool(), id)
            limitAdd(serial)
            break
        case prefix+'gaction':
            if(isLimit(serial)) return
        //if (!isPublic) return tobz.reply(from, mess.public, id)   
            if (!isGroupMsg) return tobz.reply(from, 'perintah ini hanya dapat digunakan di dalam grup', id)
            tobz.reply(from, action(), id)
            limitAdd(serial)
            break
        case prefix+'gaction2':
            if(isLimit(serial)) return
        //if (!isPublic) return tobz.reply(from, mess.public, id)   
            if (!isGroupMsg) return tobz.reply(from, 'perintah ini hanya dapat digunakan di dalam grup', id)
            tobz.reply(from, action2(), id)
            limitAdd(serial)
            break
        case prefix+'gphsyco':
            if(isLimit(serial)) return
        //if (!isPublic) return tobz.reply(from, mess.public, id)   
            if (!isGroupMsg) return tobz.reply(from, 'perintah ini hanya dapat digunakan di dalam grup', id)
            tobz.reply(from, phsyco(), id)
            limitAdd(serial)
            break
        case prefix+'gisekai':
            if(isLimit(serial)) return
        //if (!isPublic) return tobz.reply(from, mess.public, id)   
            if (!isGroupMsg) return tobz.reply(from, 'perintah ini hanya dapat digunakan di dalam grup', id)
            tobz.reply(from,`Sedang diupdate...`, id)
            limitAdd(serial)
            break
        case prefix+'gsamurai':
            if(isLimit(serial)) return
        //if (!isPublic) return tobz.reply(from, mess.public, id) 
            if (!isGroupMsg) return tobz.reply(from, 'perintah ini hanya dapat digunakan di dalam grup', id)
            tobz.reply(from, samurai(), id)
            limitAdd(serial)
            break
        case prefix+'gsport':
            if(isLimit(serial)) return
        //if (!isPublic) return tobz.reply(from, mess.public, id) 
           if (!isGroupMsg) return tobz.reply(from, 'perintah ini hanya dapat digunakan di dalam grup', id)
            tobz.reply(from, sport1(), id)
            limitAdd(serial)
            break
        case prefix+'gsport2':
            if(isLimit(serial)) return
        //if (!isPublic) return tobz.reply(from, mess.public, id) 
           if (!isGroupMsg) return tobz.reply(from, 'perintah ini hanya dapat digunakan di dalam grup', id)
            tobz.reply(from, sport2(), id)
            limitAdd(serial)
            break
        case prefix+'ghoror':
            if(isLimit(serial)) return        
	//if (!isPublic) return tobz.reply(from, mess.public, id) 
            tobz.reply(from, horor(), id)
            limitAdd(serial)
            break
        case prefix+'gmecha':
            if(isLimit(serial)) return
        //if (!isPublic) return tobz.reply(from, mess.public, id) 
            if (!isGroupMsg) return tobz.reply(from, 'perintah ini hanya dapat digunakan di dalam grup', id)
            tobz.reply(from, mecha(), id)
            limitAdd(serial)
            break
        case prefix+'gadventure':
            if(isLimit(serial)) return
        //if (!isPublic) return tobz.reply(from, mess.public, id) 
            if (!isGroupMsg) return tobz.reply(from, 'perintah ini hanya dapat digunakan di dalam grup', id)
            tobz.reply(from, adventure(), id)
            limitAdd(serial)
            break
        case prefix+'gadventure2':
            if(isLimit(serial)) return
        //if (!isPublic) return tobz.reply(from, mess.public, id) 
            if (!isGroupMsg) return tobz.reply(from, 'perintah ini hanya dapat digunakan di dalam grup', id)
            tobz.reply(from, adventure2(), id)
            limitAdd(serial)
            break
        case prefix+'gschoollife':
            if(isLimit(serial)) return
        //if (!isPublic) return tobz.reply(from, mess.public, id) 
            if (!isGroupMsg) return tobz.reply(from, 'perintah ini hanya dapat digunakan di dalam grup', id)
            tobz.reply(from, schoollife(), id)
            limitAdd(serial)
            break
        case prefix+'gslicelife':
            if(isLimit(serial)) return
        //if (!isPublic) return tobz.reply(from, mess.public, id) 
            if (!isGroupMsg) return tobz.reply(from, 'perintah ini hanya dapat digunakan di dalam grup', id)
            tobz.reply(from, slicelife(), id)
            limitAdd(serial)
            break
        case prefix+'gfantasy':
            if(isLimit(serial)) return
        //if (!isPublic) return tobz.reply(from, mess.public, id) 
            if (!isGroupMsg) return tobz.reply(from, 'perintah ini hanya dapat digunakan di dalam grup', id)
            tobz.reply(from, fantasy(), id)
            limitAdd(serial)
            break
        case prefix+'gscifi':
            if(isLimit(serial)) return
	//if (!isPublic) return tobz.reply(from, `*ᴍᴀᴀꜰ ʙᴏᴛ ꜱᴇᴋᴀʀᴀɴɢ ꜱᴜᴅᴀʜ ᴅɪᴩʀɪᴠᴀᴛᴇ ᴏʟᴇʜ ᴏᴡɴᴇʀ*\n*ᴜɴᴛᴜᴋ ʟᴇʙɪʜ ᴊᴇʟᴀꜱɴyᴀ ᴋᴇᴛɪᴋ*\n*${prefix}infobot*`, id)
            if (!isGroupMsg) return tobz.reply(from, 'perintah ini hanya dapat digunakan di dalam grup', id)
            tobz.reply(from, scifi(), id)
            limitAdd(serial)
            break
        case prefix+'gtrailer':
            if(isLimit(serial)) return
	//if (!isPublic) return tobz.reply(from, `*ᴍᴀᴀꜰ ʙᴏᴛ ꜱᴇᴋᴀʀᴀɴɢ ꜱᴜᴅᴀʜ ᴅɪᴩʀɪᴠᴀᴛᴇ ᴏʟᴇʜ ᴏᴡɴᴇʀ*\n*ᴜɴᴛᴜᴋ ʟᴇʙɪʜ ᴊᴇʟᴀꜱɴyᴀ ᴋᴇᴛɪᴋ*\n*${prefix}infobot*`, id)
            if (!isGroupMsg) return tobz.reply(from, 'perintah ini hanya dapat digunakan di dalam grup', id)
            tobz.reply(from, trailer(), id)
            limitAdd(serial)
            break
        case prefix+'gcars':
            if(isLimit(serial)) return
        //if (!isPublic) return tobz.reply(from, mess.public, id)   
            if (!isGroupMsg) return tobz.reply(from, 'perintah ini hanya dapat digunakan di dalam grup', id)
            tobz.reply(from, cars(), id)
            limitAdd(serial)
            break
        case prefix+'gmusik':
            if(isLimit(serial)) return
        //if (!isPublic) return tobz.reply(from, mess.public, id)   
            if (!isGroupMsg) return tobz.reply(from, 'perintah ini hanya dapat digunakan di dalam grup', id)
            tobz.reply(from, musik(), id)
            limitAdd(serial)
            break
        case prefix+'gmartial':
            if(isLimit(serial)) return
        //if (!isPublic) return tobz.reply(from, mess.public, id)   
            if (!isGroupMsg) return tobz.reply(from, 'perintah ini hanya dapat digunakan di dalam grup', id)
            tobz.reply(from, martial(), id)
            limitAdd(serial)
            break
        case prefix+'gpolice':
            if(isLimit(serial)) return
        //if (!isPublic) return tobz.reply(from, mess.public, id)   
            if (!isGroupMsg) return tobz.reply(from, 'perintah ini hanya dapat digunakan di dalam grup', id)
            tobz.reply(from, police(), id)
            limitAdd(serial)
            break
        case prefix+'ghistorycal':
            if(isLimit(serial)) return
            if (!isGroupMsg) return tobz.reply(from, 'perintah ini hanya dapat digunakan di dalam grup', id)
            tobz.reply(from, historycal(), id)
            limitAdd(serial)
            break
        case prefix+'gmilytary':
            if(isLimit(serial)) return
            if (!isGroupMsg) return tobz.reply(from, 'perintah ini hanya dapat digunakan di dalam grup', id)
            tobz.reply(from, milytary(), id)
            limitAdd(serial)
            break
        // INFORMATION
        case prefix+'donate':
        case prefix+'donasi':
            tobz.reply(from, sumbang(), id)
            break
        case prefix+'readme':
            tobz.reply(from, readme(prefix), id)
            break
        case prefix+'about':
            tobz.reply(from, info(cts, prefix, pendaftar), id)
            break
        case prefix+'rules':
            tobz.reply(from, rules(), id)
            break
        case prefix+'intro':
             tobz.reply(from, `*Hai, ${pushname}*\nmember baru silahkan isi list dibawah ini!` , id)
            tobz.sendText(from, intro(name), id)
            break
        case prefix+'bahasa':
            tobz.reply(from, bahasalist(), id)
            break
        case 'assalamualaikum':
        case 'assalamualaikumm':
        case 'assalamualaikumm':
        case 'asalamualaikum':
            tobz.reply(from, `waalaikumsalam ${pushname}    `, id)
            break
        case 'hai':
        case 'hi':
        case 'hy':
        case 'hei':
        case 'halo':
        case 'hlo':
        case 'hello':
            tobz.reply(from, `Hai ${pushname} 👋️, apa kabar? \nbaru nimbrung ya..  \n`, id)
            break
        case 'baik':
            tobz.reply(from, `alhamdulillah                   `, id)
            break
       case 'siapa':
         tobz.reply(from, `*gatau*                 `, id)
            break
       case prefix+'sanksi':
         tobz.sendText(from, `\n⚠️*[ RULES GAME ]*⚠️\n*pilih satu persetujuan dari anggota group*\n- bayar denda ke setiap member sebesar 5k\n- spam chat dari anggota group\n- spam call dari anggota group\n- kick dari group`, id)
            break
       case 'bot':
       case 'botnya':
         tobz.reply(from, `*Piye..?*                                      \n\n`, id)
            break
       case 'emeilia':
       case 'lia':
         tobz.reply(from, `ehh..`)
        break
	case 'ajg':
        case 'babi':
        case 'jancuk':
        case 'njim':
        case 'anying':
        case 'bgst':
        case 'bjir':
        case 'bgsd':
        case 'bangsad':
        case 'njer':
        case 'njir':
        case 'jembod':
        case 'amjink':
        case 'asw':
        case 'fuck':
        case 'fck':
        case 'bitch':
            tobz.reply(from, `\n❎ *「 Warning 」* ❎\n❗ Toxic detected ❗\n\nMessage : ~*${chats}*~\nTo : *${pushname}*\n\n*[ ! ]* Hindari penggunaan kata toxic\n`, id)
            break
        case 'sayang':
        case 'sayank':
        case 'synk':
        case 'ynk':
        case 'syng':
        case 'syang':
        case 'yank':
        case 'syg':
            tobz.reply(from, `\n❌*「 JOMBLO DETECTOR 」*❌\n\nMessage : ~*${chats}*~\nTo : *${pushname}*\n\n[❗] tolong hargai yg jomblo\n`, id)
            break
      case 'nama':
        case 'nma':
            tobz.reply(from, `Andhini Karisma Putri celuk wae Dhini`, id)
            break
        case 'sve':
        case 'save':
        case 'sv':
            tobz.reply(from, `Sv ae kak, Aku Andhini Karisma Putri celuk wae Dhini`, id)
            break
        case '.':
            tobz.reply(from, `Hah?        `, id)
            break
        case 'p':
        case 'pe':
            tobz.reply(from, `TERNYATA, *${pushname}* atheis!🐦                          `, id)
            break
      //sound
        case prefix+'iri':
	if (!isSound) return tobz.reply(from, `Fitur sound belum diaktifkan di group ini.`, id)    
        tobz.sendPtt(from, './media/iri.mp3', id)
            break
        case prefix+'pale':
	if (!isSound) return tobz.reply(from, `Fitur sound belum diaktifkan di group ini.`, id)
            tobz.sendPtt(from, './media/pale.mp3', id)
            break
        case prefix+'tariksis':
        case prefix+'semongko':
        case prefix+'semangka':
	if (!isSound) return tobz.reply(from, `Fitur sound belum diaktifkan di group ini.`, id)
            tobz.sendPtt(from, './media/tariksis.wav', id)
            break
        case prefix+'salam':
	if (!isSound) return tobz.reply(from, `Fitur sound belum diaktifkan di group ini.`, id)
            tobz.sendPtt(from, './media/salam.mp3', id)
            break
        case prefix+'test':
	if (!isSound) return tobz.reply(from, `Fitur sound belum diaktifkan di group ini.`, id)
            tobz.sendPtt(from, './media/test.wav', id)
            break
        case prefix+'goblok':
	if (!isSound) return tobz.reply(from, `Fitur sound belum diaktifkan di group ini.`, id)
            tobz.sendPtt(from, './media/goblok.wav', id)
            break
        case prefix+'yamete':
	if (!isSound) return tobz.reply(from, `Fitur sound belum diaktifkan di group ini.`, id)
            tobz.sendPtt(from, './media/desah.wav', id)
            break
        case prefix+'baka':
	if (!isSound) return tobz.reply(from, `Fitur sound belum diaktifkan di group ini.`, id)
            tobz.sendPtt(from, './media/baka.wav', id)
            tobz.sendPtt(from, './media/baka2.mp3', id)
            break
        case prefix+'loli':
	if (!isSound) return tobz.reply(from, `Fitur sound belum diaktifkan di group ini.`, id)
            tobz.sendPtt(from, './media/loli.mp3', id)
            break
        case prefix+'onichan':
	if (!isSound) return tobz.reply(from, `Fitur sound belum diaktifkan di group ini.`, id)
            tobz.sendPtt(from, './media/onichan.mp3', id)
            break
        case prefix+'tuturu':
	if (!isSound) return tobz.reply(from, `Fitur sound belum diaktifkan di group ini.`, id)
            tobz.sendPtt(from, './media/tuturu.mp3', id)
            break
        case prefix+'you':
	if (!isSound) return tobz.reply(from, `Fitur sound belum diaktifkan di group ini.`, id)
            tobz.sendPtt(from, './media/you.mp3', id)
            break
        case prefix+'senpai':
	if (!isSound) return tobz.reply(from, `Fitur sound belum diaktifkan di group ini.`, id)
            tobz.sendPtt(from, './media/senpai.mp3', id)
            break
        case prefix+'boi':
	if (!isSound) return tobz.reply(from, `Fitur sound belum diaktifkan di group ini.`, id)
            tobz.sendPtt(from, './media/boi.mp3', id)
            break
        case prefix+'hoi':
	if (!isSound) return tobz.reply(from, `Fitur sound belum diaktifkan di group ini.`, id)
            tobz.sendPtt(from, './media/hoi.mp3', id)
            break
        case prefix+'gblk':
	if (!isSound) return tobz.reply(from, `Fitur sound belum diaktifkan di group ini.`, id)            
            tobz.sendPtt(from, './media/gblk.mp3', id)
            break
        case prefix+'ragfk':
	if (!isSound) return tobz.reply(from, `Fitur sound belum diaktifkan di group ini.`, id)            
            tobz.sendPtt(from, './media/ragfk.mp3', id)
            break
        case prefix+'gelay':
	if (!isSound) return tobz.reply(from, `Fitur sound belum diaktifkan di group ini.`, id)            
            tobz.sendPtt(from, './media/gelay.mp3', id)
            break
        case prefix+'bernyanyi':
	if (!isSound) return tobz.reply(from, `Fitur sound belum diaktifkan di group ini.`, id)            
            tobz.sendPtt(from, './media/bernya.mp3', id)
            break
        case prefix+'ohayou':
        case 'ohayouu':
        case 'ohayu':
        case 'ohhayou':
        case 'ohayoou':
        case 'ohayo':
	if (!isSound) return tobz.reply(from, `Fitur sound belum diaktifkan di group ini.`, id)
            tobz.sendPtt(from, './media/ohayou.mp3', id)
            break
        case prefix+'ampun':
        case prefix+'bangjago':
	if (!isSound) return tobz.reply(from, `Fitur sound belum diaktifkan di group ini.`, id)
            tobz.sendPtt(from, './media/bangjago.mp3', id)
            break
            tobz.sendPtt(from, './media/mos.mp3', id)
            break
        case prefix+'moshi':
	if (!isSound) return tobz.reply(from, `Fitur sound belum diaktifkan di group ini.`, id)
            tobz.sendPtt(from, './media/mos.mp3', id)
            break
        case prefix+'audio':
	if (!isSound) return tobz.reply(from, `Fitur sound belum diaktifkan di group ini.`, id)            
            tobz.sendPtt(from, './media/sound.mp3', id)
            break
        case prefix+'audio1':
	if (!isSound) return tobz.reply(from, `Fitur sound belum diaktifkan di group ini.`, id)            
            tobz.sendPtt(from, './media/sound1.mp3', id)
            break
        case prefix+'audio2':
	if (!isSound) return tobz.reply(from, `Fitur sound belum diaktifkan di group ini.`, id)            
            tobz.sendPtt(from, './media/sound2.mp3', id)
            break
        case prefix+'audio3':
	if (!isSound) return tobz.reply(from, `Fitur sound belum diaktifkan di group ini.`, id)            
            tobz.sendPtt(from, './media/sound3.mp3', id)
            break
        case prefix+'audio4':
	if (!isSound) return tobz.reply(from, `Fitur sound belum diaktifkan di group ini.`, id)            
            tobz.sendPtt(from, './media/sound4.mp3', id)
            break
        case prefix+'audio5':
	if (!isSound) return tobz.reply(from, `Fitur sound belum diaktifkan di group ini.`, id)            
            tobz.sendPtt(from, './media/sound5.mp3', id)
            break
        case prefix+'audio6':
	if (!isSound) return tobz.reply(from, `Fitur sound belum diaktifkan di group ini.`, id)            
            tobz.sendPtt(from, './media/sound6.mp3', id)
            break
        case prefix+'audio7':
	if (!isSound) return tobz.reply(from, `Fitur sound belum diaktifkan di group ini.`, id)            
            tobz.sendPtt(from, './media/sound7.mp3', id)
            break
// By Gimenz
        case prefix+'wa.me':
        case prefix+'wame':
            await tobz.reply(from, `Neh Kak Link Nomor Wa Lu ${pushname}\n\n=> wa.me/${sender.id.replace(/[@c.us]/g, '')}\n\nAtau\n\n=> api.whatsapp.com/send?phone=${sender.id.replace(/[@c.us]/g, '')}`, id)
            break
// By Gimenz
        case prefix+'snk':
            tobz.reply(from, snk(), id)
            break
        default:
        //if (!isGroupMsg) return tobz.reply(from, mess.public, id)   
            if (!isGroupMsg) return tobz.reply(from, `*Hai Kak ${pushname}!*\n\n*Ketik* !menu : _untuk membuka list menu_\n*Ketik* !owner : _bila ada masalah pada botnya laporkan ke owner_\n*Ketik* !join linkgc key : _bila ingin memasukkan bot dalam group_\n\n_*Jika belum mendaftar silahkan daftar terlebih dahulu dengan command:*_\n*cd :* !reg |namamu|umurmu\n*ex :* !reg |Reyna|16\n\n_*Join ke grup Lia yuk*_ 😋 \n*ketik* !liagroup\n\n\nNote Emeilia Bot!\n_Thanks to Team Bucin Nime_\n- _coded by Rey from yogyakarta_\n- _my patner Devy from boyolali_`, id)
            if (command.startsWith('#')) {
                tobz.reply(from, `Maaf Kak, Fitur *${args[0]}* tidak terdaftar didalam *#menu* / Koreksi command kamu mungkin salah dalam penulisan.`, id)
            }
            await tobz.sendSeen(from)
            }
        }
    } catch (err) {
        console.log(color('[ERROR]', 'red'), err)
        //tobz.kill().then(a => console.log(a))
    }
}

