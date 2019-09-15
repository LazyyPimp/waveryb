const botconfig = require("./botconfig.json");
//If you want to self host
//const tokenfile = require("./tokenfile.json");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {

    if(err) console.log(err);
    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0){
        console.log("Couldn't find any commands.")
        return;
    }

    jsfile.forEach((f, i) =>{
        let props = require(`./commands/${f}`);
        console.log(`${f} loaded!`);
        bot.commands.set(props.help.name, props);
    });
})

const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();
// increase the limit
myEmitter.setMaxListeners(25);

for(let i = 0; i < 11; i++) {
  myEmitter.on('event', _ => console.log(i));
}

myEmitter.emit('event');



bot.on("ready", async() => {
    console.log(`${bot.user.username} is online!`);

    bot.user.setActivity("Join Wavery!",{type: "Listening"});
});


bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    var prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
    if(!prefixes[message.guild.id]){
        prefixes[message.guild.id] = {
            prefixes: botconfig.prefix
        };
    }

    var prefix = prefixes[message.guild.id].prefixes;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);
    let commandfile = bot.commands.get(cmd.slice(prefix.length));
    if(commandfile) commandfile.run(bot, message, args);

   if(cmd === ".avatar") {
    message.reply(message.author.avatarURL);
  };
    
    
const swearWords = [
"a55",
"a55hole",
"aeolus",
"ahole",
"anal",
"analprobe",
"anilingus",
"anus",
"areola",
"areole",
"arian",
"aryan",
"ass",
"assbang",
"assbanged",
"assbangs",
"asses",
"assfuck",
"assfucker",
"assh0le",
"asshat",
"assho1e",
"ass hole",
"assholes",
"assmaster",
"assmunch",
"asswipe",
"asswipes",
"azazel",
"azz",
"b1tch",
"babe",
"babes",
"ballsack",
"bang",
"banger",
"barf",
"bastard",
"bastards",
"bawdy",
"beaner",
"beardedclam",
"beastiality",
"beatch",
"beater",
"beaver",
"beer",
"beeyotch",
"beotch",
"biatch",
"bigtits",
"big tits",
"bimbo",
"bitch",
"bitched",
"bitches",
"bitchy",
"blow job",
"blow",
"blowjob",
"blowjobs",
"bod",
"bodily",
"boink",
"bollock",
"bollocks",
"bollok",
"bone",
"boned",
"boner",
"boners",
"bong",
"boob",
"boobies",
"boobs",
"booby",
"booger",
"bookie",
"bootee",
"bootie",
"booty",
"booze",
"boozer",
"boozy",
"bosom",
"bosomy",
"bowel",
"bowels",
"bra",
"brassiere",
"breast",
"breasts",
"bugger",
"bukkake",
"bullshit",
"bull shit",
"bullshits",
"bullshitted",
"bullturds",
"bung",
"busty",
"butt",
"butt fuck",
"buttfuck",
"buttfucker",
"buttfucker",
"buttplug",
"c.0.c.k",
"c.o.c.k.",
"c.u.n.t",
"c0ck",
"c-0-c-k",
"caca",
"cahone",
"cameltoe",
"carpetmuncher",
"cawk",
"cervix",
"chinc",
"chincs",
"chink",
"chink",
"chode",
"chodes",
"cl1t",
"climax",
"clit",
"clitoris",
"clitorus",
"clits",
"clitty",
"cocain",
"cocaine",
"cock",
"c-o-c-k",
"cockblock",
"cockholster",
"cockknocker",
"cocks",
"cocksmoker",
"cocksucker",
"cock sucker",
"coital",
"commie",
"condom",
"coon",
"coons",
"corksucker",
"crabs",
"crack",
"cracker",
"crackwhore",
"crap",
"crappy",
"cum",
"cummin",
"cumming",
"cumshot",
"cumshots",
"cumslut",
"cumstain",
"cunilingus",
"cunnilingus",
"cunny",
"cunt",
"cunt",
"c-u-n-t",
"cuntface",
"cunthunter",
"cuntlick",
"cuntlicker",
"cunts",
"d0ng",
"d0uch3",
"d0uche",
"d1ck",
"d1ld0",
"d1ldo",
"dago",
"dagos",
"dammit",
"damn",
"damned",
"damnit",
"dawgie-style",
"dick",
"dickbag",
"dickdipper",
"dickface",
"dickflipper",
"dickhead",
"dickheads",
"dickish",
"dick-ish",
"dickripper",
"dicksipper",
"dickweed",
"dickwhipper",
"dickzipper",
"diddle",
"dike",
"dildo",
"dildos",
"diligaf",
"dillweed",
"dimwit",
"dingle",
"dipship",
"doggie-style",
"doggy-style",
"dong",
"doofus",
"doosh",
"dopey",
"douch3",
"douche",
"douchebag",
"douchebags",
"douchey",
"drunk",
"dumass",
"dumbass",
"dumbasses",
"dummy",
"dyke",
"dykes",
"ejaculate",
"enlargement",
"erect",
"erection",
"erotic",
"essohbee",
"extacy",
"extasy",
"f.u.c.k",
"fack",
"fag",
"fagg",
"fagged",
"faggit",
"faggot",
"fagot",
"fags",
"faig",
"faigt",
"fannybandit",
"fart",
"fartknocker",
"fat",
"felch",
"felcher",
"felching",
"fellate",
"fellatio",
"feltch",
"feltcher",
"fisted",
"fisting",
"fisty",
"floozy",
"foad",
"fondle",
"foobar",
"foreskin",
"freex",
"frigg",
"frigga",
"fubar",
"fuck",
"f-u-c-k",
"fuckass",
"fucked",
"fucked",
"fucker",
"fuckface",
"fuckin",
"fucking",
"fucknugget",
"fucknut",
"fuckoff",
"fucks",
"fucktard",
"fuck-tard",
"fuckup",
"fuckwad",
"fuckwit",
"fudgepacker",
"fuk",
"fvck",
"fxck",
"gae",
"gai",
"ganja",
"gay",
"gays",
"gey",
"gfy",
"ghay",
"ghey",
"gigolo",
"glans",
"goatse",
"godamn",
"godamnit",
"goddam",
"goddammit",
"goddamn",
"goldenshower",
"gonad",
"gonads",
"gook",
"gooks",
"gringo",
"gspot",
"g-spot",
"gtfo",
"guido",
"h0m0",
"h0mo",
"handjob",
"hard on",
"he11",
"hebe",
"heeb",
"hell",
"hemp",
"heroin",
"herp",
"herpes",
"herpy",
"hitler",
"hiv",
"hobag",
"hom0",
"homey",
"homo",
"homoey",
"honky",
"hooch",
"hookah",
"hooker",
"hoor",
"hootch",
"hooter",
"hooters",
"horny",
"hump",
"humped",
"humping",
"hussy",
"hymen",
"inbred",
"incest",
"injun",
"j3rk0ff",
"jackass",
"jackhole",
"jackoff",
"jap",
"japs",
"jerk",
"jerk0ff",
"jerked",
"jerkoff",
"jism",
"jiz",
"jizm",
"jizz",
"jizzed",
"junkie",
"junky",
"kike",
"kikes",
"kill",
"kinky",
"kkk",
"klan",
"knobend",
"kooch",
"kooches",
"kootch",
"kraut",
"kyke",
"labia",
"lech",
"leper",
"lesbians",
"lesbo",
"lesbos",
"lez",
"lezbian",
"lezbians",
"lezbo",
"lezbos",
"lezzie",
"lezzies",
"lezzy",
"loin",
"loins",
"lube",
"lusty",
"mams",
"massa",
"masterbate",
"masterbating",
"masterbation",
"masturbate",
"masturbating",
"masturbation",
"maxi",
"menses",
"menstruate",
"menstruation",
"meth",
"m-fucking",
"mofo",
"molest",
"moolie",
"moron",
"motherfucka",
"motherfucker",
"motherfucking",
"mtherfucker",
"mthrfucker",
"mthrfucking",
"muff",
"muffdiver",
"murder",
"muthafuckaz",
"muthafucker",
"mutherfucker",
"mutherfucking",
"muthrfucking",
"nad",
"nads",
"naked",
"napalm",
"nappy",
"nazi",
"nazism",
"negro",
"nigga",
"niggah",
"niggas",
"niggaz",
"nigger",
"nigger",
"niggers",
"niggle",
"niglet",
"nimrod",
"ninny",
"nipple",
"nooky",
"nympho",
"opiate",
"opium",
"oral",
"orally",
"organ",
"orgasm",
"orgasmic",
"orgies",
"orgy",
"ovary",
"ovum",
"ovums",
"p.u.s.s.y.",
"paddy",
"paki",
"pantie",
"panties",
"panty",
"pastie",
"pasty",
"pcp",
"pecker",
"pedo",
"pedophile",
"pedophilia",
"pedophiliac",
"pee",
"peepee",
"penetrate",
"penetration",
"penial",
"penile",
"penis",
"perversion",
"peyote",
"phalli",
"phallic",
"phuck",
"pillowbiter",
"pimp",
"pinko",
"piss",
"pissed",
"pissoff",
"piss-off",
"pms",
"polack",
"pollock",
"poon",
"poontang",
"porn",
"porno",
"pornography",
"pot",
"potty",
"prick",
"prig",
"prostitute",
"prude",
"pube",
"pubic",
"pubis",
"punkass",
"punky",
"puss",
"pussies",
"pussy",
"pussypounder",
"puto",
"queaf",
"queef",
"queef",
"queer",
"queero",
"queers",
"quicky",
"quim",
"racy",
"rape",
"raped",
"raper",
"rapist",
"raunch",
"rectal",
"rectum",
"rectus",
"reefer",
"reetard",
"reich",
"retard",
"retarded",
"revue",
"rimjob",
"ritard",
"rtard",
"r-tard",
"rum",
"rump",
"rumprammer",
"ruski",
"s.h.i.t.",
"s.o.b.",
"s0b",
"sadism",
"sadist",
"scag",
"scantily",
"schizo",
"schlong",
"screw",
"screwed",
"scrog",
"scrot",
"scrote",
"scrotum",
"scrud",
"scum",
"seaman",
"seamen",
"seduce",
"semen",
"sex",
"sexual",
"sh1t",
"s-h-1-t",
"shamedame",
"shit",
"s-h-i-t",
"shite",
"shiteater",
"shitface",
"shithead",
"shithole",
"shithouse",
"shits",
"shitt",
"shitted",
"shitter",
"shitty",
"shiz",
"sissy",
"skag",
"skank",
"slave",
"sleaze",
"sleazy",
"slut",
"slutdumper",
"slutkiss",
"sluts",
"smegma",
"smut",
"smutty",
"snatch",
"sniper",
"snuff",
"s-o-b",
"sodom",
"souse",
"soused",
"sperm",
"spic",
"spick",
"spik",
"spiks",
"spooge",
"spunk",
"steamy",
"stfu",
"stiffy",
"stoned",
"strip",
"stroke",
"stupid",
"suck",
"sucked",
"sucking",
"sumofabiatch",
"t1t",
"tampon",
"tard",
"tawdry",
"teabagging",
"teat",
"terd",
"teste",
"testee",
"testes",
"testicle",
"testis",
"thrust",
"thug",
"tinkle",
"tit",
"titfuck",
"titi",
"tits",
"tittiefucker",
"titties",
"titty",
"tittyfuck",
"tittyfucker",
"toke",
"toots",
"tramp",
"transsexual",
"trashy",
"tubgirl",
"turd",
"tush",
"twat",
"twats",
"ugly",
"undies",
"unwed",
"urinal",
"urine",
"uterus",
"uzi",
"vag",
"vagina",
"valium",
"viagra",
"virgin",
"vixen",
"vodka",
"vomit",
"voyeur",
"vulgar",
"vulva",
"wad",
"wang",
"wank",
"wanker",
"wazoo",
"wedgie",
"weed",
"weenie",
"weewee",
"weiner",
"weirdo",
"wench",
"wetback",
"wh0re",
"wh0reface",
"whitey",
"whiz",
"whoralicious",
"whore",
"whorealicious",
"whored",
"whoreface",
"whorehopper",
"whorehouse",
"whores",
"whoring",
"wigger",
"womb",
"woody",
"wop",
"wtf",
"x-rated",
"xxx",
"yeasty",
"yobbo",
"zoophile"
]
if( swearWords.some(word => message.content.includes(word))) {
  message.reply("Watch your language!");
    message.delete();
};


if(cmd === ".invite") {
    message.author.send("https://discord.gg/FVps9Me");
}


if(cmd === ".owner") {
    message.author.send("Lazyy#9825");
  }
    
     if (cmd === ".ping") {
        const msg = await message.channel.send(`🏓 Pinging....`);

        // Edit the message
        msg.edit(`🏓 Pong!\nLatency is ${Math.floor(msg.createdTimestap - message.createdTimestap)}ms\nAPI Latency is ${Math.round(bot.ping)}ms`);
    }
    
    
    	 if(cmd === ".kick") {
        message.delete()
        let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!kUser) return message.channel.send("❌ Please **@mention** your target!");
        let kReason = args.join(" ").slice(0);
        if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("**🔒 Sorry, you can't do that.**");
        if(kUser.hasPermission("KICK_MEMBERS")) return message.channel.send("❌ Failed to **Kick**, need a higher than Roles.");
    
        let kickEmbed = new Discord.RichEmbed()
        .setDescription("**👢 Kicked**")
        .setColor(0xFF0000)
        .addField("User", `${kUser}`)
        .addField("Moderator", `<@${message.author.id}>`)
        .addField("Reason", `**\`\`\`${kReason}\`\`\`**`);
    
        let adminlog = message.guild.channels.find(`name`, "mod-logs");
        if(!adminlog) return message.channel.send("❌ Sorry, i need the Logging Channels with name **#mod-logs**.");
        message.guild.member(kUser).kick(kReason);
        adminlog.send(kickEmbed);
    };
    
    if(cmd === ".ban") {
  if (!message.member.hasPermission("BAN_MEMBERS")) return message.reply("Sorry, you don't have permissions to use this!");

let member = message.mentions.members.first();
if(!member)
  return message.reply("Please mention a valid member of this server");
if(!member.bannable) 
  return message.reply("I cannot ban this user!")

let reason = args.slice(1).join(' ');
if(!reason) reason = "No reason provided";

await member.ban(reason)
  .catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}`));
message.reply(`${member.user.tag} has been banned by ${message.author.tag} because: ${reason}`);
  message.member.tag.sendMessage('Hi! You were banned from ${member.user.server} because: {reason}. If you do not get why you were banned, please DM @Lazyy#9825.')
  }
   
    
    
    if(cmd == `${prefix}serverinfo` || cmd == `${prefix}sinfo`){
        
        let serverIcon = message.guild.iconURL;
        let serverInfo = new Discord.RichEmbed()
        .setDescription("Server Information")
        .setColor("#ffffff")
        .setThumbnail(serverIcon)
        .addField("Server Name", message.guild.name)
        .addField("Created On", message.guild.createdAt)
        .addField("You Joined", message.member.joinedAt)
        .addField("Total Members", message.guild.memberCount);

        return message.author.send(serverInfo);
    }

    if(cmd == `${prefix}botinfo` || cmd == `${prefix}binfo`){

        let botIcon = bot.user.displayAvatarURL;
        let botInfo = new Discord.RichEmbed()
        .setDescription("Bot Information")
        .setColor("#15f153")
        .setThumbnail(botIcon)
        .addField("Bot Name", bot.user.username)
        .addField("Owner", "Lazyy")
        .addField("Created On", bot.user.createdAt);

        return message.author.send(botInfo);
    }
});

//Self Hosting
//bot.login(tokenfile.token);

//Heroku 24/7 Hosting
bot.login(process.env.BOT_TOKEN);
