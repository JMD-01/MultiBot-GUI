let hometabs = document.getElementById("HOME");
let homebutton = document.getElementById("homebutton");

let settingstabs = document.getElementById("SETTINGS");
let settingsbutton = document.getElementById("settingsbutton");

let discordtabs = document.getElementById("DISCORD");
let discordbutton = document.getElementById("discordbutton");

let botstabs = document.getElementById("BOTS");
let botsbutton = document.getElementById("botsbutton");

let currenttab = "HOME";
function Setup(){
  currenttab = "HOME";

  hometabs.style.display = "block";
  homebutton.style.backgroundColor = "#379DBF";
  homebutton.style.cursor = "default";

  settingstabs.style.display = "none";
  settingsbutton.style.backgroundColor = "#09181C";
  settingsbutton.style.cursor = "pointer";

  discordtabs.style.display = "none";
  discordbutton.style.backgroundColor = "#09181C";
  discordbutton.style.cursor = "pointer";

  botstabs.style.display = "none";
  botsbutton.style.backgroundColor = "#09181C";
  botsbutton.style.cursor = "pointer";
}
Setup();

function openHome(){
  if(currenttab === "HOME") {return;}
  currenttab = "HOME";
  
  hometabs.style.display = "block";
  homebutton.style.backgroundColor = "#379DBF";
  homebutton.style.cursor = "default";

  settingstabs.style.display = "none";
  settingsbutton.style.backgroundColor = "#09181C";
  settingsbutton.style.cursor = "pointer";

  discordtabs.style.display = "none";
  discordbutton.style.backgroundColor = "#09181C";
  discordbutton.style.cursor = "pointer";

  botstabs.style.display = "none";
  botsbutton.style.backgroundColor = "#09181C";
  botsbutton.style.cursor = "pointer";
}

function openSettings(){
  if(currenttab === "SETTINGS") {return;}
  currenttab = "SETTINGS";
  
  hometabs.style.display = "none";
  homebutton.style.backgroundColor = "#09181C";
  homebutton.style.cursor = "pointer";

  settingstabs.style.display = "block";
  settingsbutton.style.backgroundColor = "#379DBF";
  settingsbutton.style.cursor = "default";

  discordtabs.style.display = "none";
  discordbutton.style.backgroundColor = "#09181C";
  discordbutton.style.cursor = "pointer";

  botstabs.style.display = "none";
  botsbutton.style.backgroundColor = "#09181C";
  botsbutton.style.cursor = "pointer";
}

function openDiscord(){
  if(currenttab === "DISCORD") {return;}
  currenttab = "DISCORD";
  
  hometabs.style.display = "none";
  homebutton.style.backgroundColor = "#09181C";
  homebutton.style.cursor = "pointer";

  settingstabs.style.display = "none";
  settingsbutton.style.backgroundColor = "#09181C";
  settingsbutton.style.cursor = "pointer";

  discordtabs.style.display = "block";
  discordbutton.style.backgroundColor = "#379DBF";
  discordbutton.style.cursor = "default";

  botstabs.style.display = "none";
  botsbutton.style.backgroundColor = "#09181C";
  botsbutton.style.cursor = "pointer";
}

function openBots(){
  if(currenttab === "BOTS") {return;}
  currenttab = "BOTS";
  
  hometabs.style.display = "none";
  homebutton.style.backgroundColor = "#09181C";
  homebutton.style.cursor = "pointer";

  settingstabs.style.display = "none";
  settingsbutton.style.backgroundColor = "#09181C";
  settingsbutton.style.cursor = "pointer";

  discordtabs.style.display = "none";
  discordbutton.style.backgroundColor = "#09181C";
  discordbutton.style.cursor = "pointer";

  botstabs.style.display = "block";
  botsbutton.style.backgroundColor = "#379DBF";
  botsbutton.style.cursor = "default";
}

homebutton.addEventListener('mouseenter',()=>{
  if(currenttab === "HOME") {return;}
  homebutton.style.backgroundColor = "#48696E";
})
homebutton.addEventListener('mouseleave',()=>{
  if(currenttab === "HOME") {return;}
  homebutton.style.backgroundColor = "#09181C";
})

settingsbutton.addEventListener('mouseenter',()=>{
  if(currenttab === "SETTINGS") {return;}
  settingsbutton.style.backgroundColor = "#48696E";
})
settingsbutton.addEventListener('mouseleave',()=>{
  if(currenttab === "SETTINGS") {return;}
  settingsbutton.style.backgroundColor = "#09181C";
})

discordbutton.addEventListener('mouseenter',()=>{
  if(currenttab === "DISCORD") {return;}
  discordbutton.style.backgroundColor = "#48696E";
})
discordbutton.addEventListener('mouseleave',()=>{
  if(currenttab === "DISCORD") {return;}
  discordbutton.style.backgroundColor = "#09181C";
})

botsbutton.addEventListener('mouseenter',()=>{
  if(currenttab === "BOTS") {return;}
  botsbutton.style.backgroundColor = "#48696E";
})
botsbutton.addEventListener('mouseleave',()=>{
  if(currenttab === "BOTS") {return;}
  botsbutton.style.backgroundColor = "#09181C";
})
const { ipcRenderer } = require('electron');
const EventEmitter = require('events');
const SendToIPC = new EventEmitter();
const fs = require('fs')

let serverip = "";
let port = "";
let version = "";
let maxbots = "";
let joinspeed = "";
let loginmessage = "";
let accountpath = "";
let macrostatus = "";
let macrodelay = "";
let macromessage = "";
let discordtoken = "";
let discordchannel = "";
let discordprefix = "";
let discordstatus = "";
let whitelist = [];


//Minimize app
function MinApp(){
  ipcRenderer.send('minimize');
}
//Exit app
function ExitApp(){
  ipcRenderer.send('exit');
}
//Update online bots
SendToIPC.on('update-online',data=>{
  document.getElementsByClassName('generalonline')[0].innerHTML = 'ONLINE:   '+data
})
//Start Bots
function startbutton(){
  SendToIPC.emit('start-button');
  keyreceived();
}
//Start Bots Reply
SendToIPC.on('started',()=>{
  document.getElementById('generalstartbutton').style.cursor = "default";
  document.getElementById('generalbotstatustext').innerHTML = 'BOT STATUS : ONLINE ';
  document.getElementById('generalstopbutton').style.cursor = "pointer";
})
//Stop Bots
function stopbutton(){
  SendToIPC.emit('stop-button');
  keyreceived();
}
//Stop Bots Reply
SendToIPC.on('stopped',()=>{
  document.getElementById('generalstopbutton').style.cursor = "default";
  document.getElementById('generalbotstatustext').innerHTML = 'BOT STATUS : OFFLINE ';
  document.getElementById('generalstartbutton').style.cursor = "pointer";
})
//Open File Path Dialog
const {dialog} = require('electron').remote;
function setFilePath(){
  dialog.showOpenDialog({
    properties: ['openFile'],
    filters: [
      { name: 'Text Document', extensions: ['txt'] }
    ]
  }).then(result => {
    accountpath = result.filePaths.toString();
    let filenametext = result.filePaths.toString().split(`\\`).join("/").split("/");
    document.getElementsByClassName('settingsaccounttabFileName')[0].style.color = "cyan";
    document.getElementsByClassName('settingsaccounttabFileName')[0].innerHTML= filenametext[filenametext.length-1];
    document.getElementsByClassName('settingsaccounttabPathBox')[0].value = result.filePaths;
  }).catch(err => {
  })
  keyreceived();
}
//Check File Path List
let accounts = [];
let accountdetectcurrenttext = false;
let accounttextdetect = document.getElementsByClassName('settingsaccounttabAmountText')[0];
function checkList(){
  if(accountpath === ""){
    accounttextdetect.style.color = 'red';
    accounttextdetect.innerHTML = 'File Not Found!';
    if(!accountdetectcurrenttext){
    accountdetectcurrenttext = true;
    setTimeout(() => {
      accounttextdetect.innerHTML = "";
      accountdetectcurrenttext = false;
    }, 1500);
  }return;
} else {
  fs.readFile(accountpath,'UTF-8', (err, data) => {
    if (err) {
      console.error(err);
      accounttextdetect.style.color = 'red';
      accounttextdetect.innerHTML = 'File Not Found!';
      if(!accountdetectcurrenttext){
      accountdetectcurrenttext = true;
      setTimeout(() => {
        accounttextdetect.innerHTML = "";
        accountdetectcurrenttext = false;
      }, 1500);
    }
      return;
    }
    let accountdetectedamount = 0;
    let tempus = data.split('\n');
    accounts = [];
    tempus.forEach(x => {
      let tempus1 = x.split(':')
      if(tempus1.length != 2) {return;}
      if(!tempus1[0] || !tempus1[1]){return;} else{
        if(tempus1[0].includes('@')){
          accountdetectedamount++;
          let tempus2 = tempus1[1].replace(/\r/g,"");
          let tempus3 = tempus1[0]+':'+tempus2;
          accounts.push(tempus3);
        }
      }
    })
    accounttextdetect.style.color = 'green';
    accounttextdetect.innerHTML = `${accountdetectedamount} Accounts Detected!`;
    if(!accountdetectcurrenttext){
    accountdetectcurrenttext = true;
    setTimeout(() => {
      accounttextdetect.innerHTML = "";
      accountdetectcurrenttext = false;
    }, 2500);
  }
    return;

  })
}
keyreceived();
}
//View list Dialog
function viewList(){
  if(accountpath === ""){
    accounttextdetect.style.color = 'red';
    accounttextdetect.innerHTML = 'File Not Found!';
    if(!accountdetectcurrenttext){
    accountdetectcurrenttext = true;
    setTimeout(() => {
      accounttextdetect.innerHTML = "";
      accountdetectcurrenttext = false;
    }, 1500);
  }return;
} else {
  fs.readFile(accountpath,'UTF-8', (err, data) => {
    if (err) {
      console.error(err);
      accounttextdetect.style.color = 'red';
      accounttextdetect.innerHTML = 'File Not Found!';
      if(!accountdetectcurrenttext){
      accountdetectcurrenttext = true;
      setTimeout(() => {
        accounttextdetect.innerHTML = "";
        accountdetectcurrenttext = false;
      }, 1500);
    }
      return;
    }
    let accountdetectedamount = 0;
    let tempus = data.split('\n');
    accounts = [];
    tempus.forEach(x => {
      let tempus1 = x.split(':')
      if(tempus1.length != 2) {return;}
      if(!tempus1[0] || !tempus1[1]){return;} else{
        if(tempus1[0].includes('@')){
          accountdetectedamount++;
          let tempus2 = tempus1[1].replace(/\r/g,"");
          let tempus3 = tempus1[0]+':'+tempus2;
          accounts.push(tempus3);
        }
      }
    })
    return;

  })
}
  const options = {
    title: 'Accounts List',
    message: accounts.join('\n'),
  };
  dialog.showMessageBox(null, options, () => {
  });
  keyreceived();
}
//Macro on Toggle
function macroOnToggle(){
  SendToIPC.emit('macro-pressed-on');
  keyreceived();
}
//Macro on Toggle Reply
let macrostatetext = document.getElementsByClassName('settingsmacrotabStateText')[0];
let macroonbutton = document.getElementsByClassName('settingsmacrotabOnButton')[0];
let macrooffbutton = document.getElementsByClassName('settingsmacrotabOffButton')[0];
SendToIPC.on('macro-enabled',()=>{
  macrostatetext.style.color = 'green';
  macrostatetext.innerHTML = `ON`;
  macroonbutton.style.cursor = "default";
  macrooffbutton.style.cursor = "pointer";
})
//Macro off Toggle
function macroOffToggle(){
  SendToIPC.emit('macro-pressed-off')
  keyreceived();
}
//Macro off Toggle Reply
SendToIPC.on('macro-disabled',()=>{
  macrostatetext.style.color = 'red';
  macrostatetext.innerHTML = `OFF`;
  macroonbutton.style.cursor = "pointer";
  macrooffbutton.style.cursor = "default";
})
//Macro add whitelist 
function remove(array, element) {
  const index = array.indexOf(element);
  array.forEach((x,index) => {
    if(x.toLowerCase() === element.toLowerCase()){
      array.splice(index, 1);
    }
  })
}
function checkInArray(arr, val) {
  return arr.some(function(arrVal) {
    return val.toLowerCase() === arrVal.toLowerCase();
  });
}
let whitelistigns = document.getElementsByClassName('settingsmacrotabWhitelistBox')[0];
let whitelistignslist = document.getElementById('igns');
function macroAdd(){
  if(whitelistigns.value.trim() === "") {return;}
  if(checkInArray(whitelist,whitelistigns.value.trim())){
    return;
  }
  let currenttexttemp = whitelistigns.value;
  let inputnode = document.createTextNode(currenttexttemp);
  let element = document.createElement('option');
  element.append(inputnode);
  whitelistignslist.append(element);
  whitelist.push(currenttexttemp);
  SendToIPC.emit('whitelist-add',whitelistigns.value.trim());
  keyreceived();
}
//Macro Remove whitelist
function macroRemove(){
  if(whitelistigns.value.trim() === "") {return;}
  let TextBoxValue = whitelistigns.value.trim();
  let parent = document.getElementById('igns');
  let childArray = parent.children;
  let cL = childArray.length;
  while(cL > 0) {
      cL--;
      parent.removeChild(childArray[cL]);
  }
  if(checkInArray(whitelist,whitelistigns.value.trim())){
    remove(whitelist,TextBoxValue);
    whitelist.forEach(x =>{
      let currenttexttemp = x;
      let inputnode = document.createTextNode(currenttexttemp);
      let element = document.createElement('option');
      element.append(inputnode);
      whitelistignslist.append(element);
    })
  } else {
    whitelist.forEach(x =>{
      let currenttexttemp = x;
      let inputnode = document.createTextNode(currenttexttemp);
      let element = document.createElement('option');
      element.append(inputnode);
      whitelistignslist.append(element);
    })
  }
  SendToIPC.emit('whitelist-remove',TextBoxValue)
  keyreceived();
}
//Macro Show Function
function macroShow(){
  const options = {
    title: 'Macro Ingame Whitelist',
    message: whitelist.join('\n'),
  };
  dialog.showMessageBox(null, options, () => {
  });
  SendToIPC.emit('whitelist-show')
  keyreceived();
}
//Discord On Toggle
function discordOnToggle(){
  SendToIPC.emit('start-discord-button');
  keyreceived();
}
//Discord On Toggle Reply
let discordbotstatetext = document.getElementsByClassName('discordsettingsStateText')[0];
let discordbotstatus = document.getElementsByClassName('generaldiscordbotstatus')[0];
let discordoffbutton = document.getElementsByClassName('discordsettingsOffButton')[0];
let discordonbutton = document.getElementsByClassName('discordsettingsOnButton')[0];
SendToIPC.on('start-discord',()=>{
  discordbotstatetext.style.color = 'green';
  discordbotstatetext.innerHTML = `ON`;
  discordbotstatus.innerHTML = 'DISCORD BOT: ONLINE'
  discordoffbutton.style.cursor = "pointer";
  discordonbutton.style.cursor = "default";
})
//Discord Off Toggle
function discordOffToggle(){
  SendToIPC.emit('stop-discord-button');
  keyreceived();
}
//Discord Off Reply
SendToIPC.on('stop-discord',()=>{
  discordbotstatetext.style.color = 'red';
  discordbotstatetext.innerHTML = `OFF`;
  discordbotstatus.innerHTML = 'DISCORD BOT: OFFLINE'
  discordoffbutton.style.cursor = "default";
  discordonbutton.style.cursor = "pointer";
})
//Sudo Send single player
let botssudoignbox = document.getElementsByClassName('botssettingsSudoIgnBox')[0];
let botssudomessagebox = document.getElementsByClassName('botssettingsSudoMessageBox')[0];
let botssudoallmessagebox = document.getElementsByClassName('botssettingsSudoAllBox')[0];
function SudoSend(){
  SendToIPC.emit('sudo-send',botssudoignbox.value,botssudomessagebox.value)
  keyreceived();
}
//Sudo Send All
function SudoSendAll(){
  SendToIPC.emit('sudo-all-send',botssudoallmessagebox.value)
  keyreceived();
}
/**
 *  IPC
 */
const ipc = require('node-ipc');
let systeminfo;
ipc.config.id = 'gui-process';
ipc.config.retry = 1500;
ipc.config.silent = true;
ipc.connectTo('main-process', () => {
  //Gui-Started-Event
  ipc.of['main-process'].on('connect', () => {
    ipc.of['main-process'].emit('gui-alive');
  });
  //Receive first GUI data
  ipc.of['main-process'].on('first-data', data => {
    serverip = data.ServerIP
    port = data.Port
    version = data.version
    maxbots = data.botCount
    joinspeed = data.joinSpeed
    loginmessage = data.hubCommand
    accountpath = data.accountpath
    macrostatus = data.macro
    macrodelay = data.macrodelay
    macromessage = data.macrocommand
    discordtoken = data.token
    discordchannel = data.channelID
    discordprefix = data.prefix
    systeminfo = data.systeminfo
    //settext to boxes
    document.getElementsByClassName('settingsservertabIPbox')[0].value = data.ServerIP;
    document.getElementsByClassName('settingsservertabPortbox')[0].value = data.Port;
    document.getElementsByClassName('settingsservertabVersionbox')[0].value = data.version;
    document.getElementsByClassName('settingsbotstabMaxBotsBox')[0].value = parseFloat(data.botCount);
    document.getElementsByClassName('settingsbotstabJoinSpeedBox')[0].value = parseFloat(data.joinSpeed);
    document.getElementsByClassName('settingsbotstabJoinCommandBox')[0].value = data.hubCommand;
    document.getElementsByClassName('settingsaccounttabPathBox')[0].value = data.accountpath;
    if (data.accountpath != "") {
      let filenametext1 = data.accountpath.split("\\").join("/").split("/");
      document.getElementsByClassName('settingsaccounttabFileName')[0].innerHTML = filenametext1[filenametext1.length - 1];
    }
    if (data.macro === "ON") {
      macrostatetext.style.color = 'green';
      macrostatetext.innerHTML = `ON`;
    }
    if (data.macro === "OFF") {
      macrostatetext.style.color = 'red';
      macrostatetext.innerHTML = `OFF`;
    }
    document.getElementsByClassName('settingsmacrotabDelayBox')[0].value = parseFloat(data.macrodelay);
    document.getElementsByClassName('settingsmacrotabCommandBox')[0].value = data.macrocommand;
    document.getElementsByClassName('discordsettingsTokenBox')[0].value = data.token;
    document.getElementsByClassName('discordsettingsChannelBox')[0].value = data.channelID;
    document.getElementsByClassName('discordsettingsPrefixBox')[0].value = data.prefix;
    discordbotstatetext.style.color = 'red';
    discordbotstatetext.innerHTML = `OFF`;
    discordbotstatus.innerHTML = 'DISCORD BOT: OFFLINE'
    document.getElementsByClassName('generalserverip')[0].innerHTML = `SERVER: ${data.ServerIP}:${data.Port}`;
    document.getElementsByClassName('generalsysteminfoPlatform')[0].innerHTML = 'OS-Platform: ' + data.systeminfo.platform;
    document.getElementsByClassName('generalsysteminfoCPUMan')[0].innerHTML = 'CPU-Manufacturer: ' + data.systeminfo.cpumanufacturer;
    document.getElementsByClassName('generalsysteminfoCPUName')[0].innerHTML = 'CPU-Name: ' + data.systeminfo.cpuname;
    document.getElementsByClassName('generalsysteminfoCPUThreads')[0].innerHTML = 'CPU-Threads: ' + data.systeminfo.threads;
    document.getElementsByClassName('generalsysteminfoCPUCores')[0].innerHTML = 'CPU-Cores: ' + data.systeminfo.realcores;
    document.getElementsByClassName('generalsysteminfoCPUSpeed')[0].innerHTML = 'CPU-Speed: ' + data.systeminfo.cpuspeed + " Mhz";
    document.getElementsByClassName('generalsysteminfoRAM')[0].innerHTML = 'RAM: ' + data.systeminfo.totalram;
  });
  //Whitelist data
  ipc.of['main-process'].on('whitelist-data', data => {
    if (JSON.stringify(whitelist) != JSON.stringify(data)) {
      let parent = document.getElementById('igns');
      let childArray = parent.children;
      let cL = childArray.length;
      while(cL > 0) {
          cL--;
          parent.removeChild(childArray[cL]);
      }
      data.forEach(x =>{
        let currenttexttemp = x;
        let inputnode = document.createTextNode(currenttexttemp);
        let element = document.createElement('option');
        element.append(inputnode);
        whitelistignslist.append(element);
      })
      whitelist = data;
    }
  });
  //Whitelist update
  ipc.of['main-process'].on('whitelist-update', data => {
    if (JSON.stringify(whitelist) != JSON.stringify(data)) {
      let parent = document.getElementById('igns');
      let childArray = parent.children;
      let cL = childArray.length;
      while(cL > 0) {
          cL--;
          parent.removeChild(childArray[cL]);
      }
      data.forEach(x =>{
        let currenttexttemp = x;
        let inputnode = document.createTextNode(currenttexttemp);
        let element = document.createElement('option');
        element.append(inputnode);
        whitelistignslist.append(element);
      })
      whitelist = data;
    }
  });
  //removewhitelistevent
  SendToIPC.on('whitelist-remove', data => {
    ipc.of['main-process'].emit('whitelist-remove', data);
  });
  //removewhitelistevent
  SendToIPC.on('whitelist-add', data => {
    ipc.of['main-process'].emit('whitelist-add', data);
  });
  //Send Data from gui to mainbot on detected change
  SendToIPC.on('update', () => {
    let datasend = {
      ServerIP: document.getElementsByClassName('settingsservertabIPbox')[0].value,
      Port: document.getElementsByClassName('settingsservertabPortbox')[0].value,
      version: document.getElementsByClassName('settingsservertabVersionbox')[0].value,
      botCount: document.getElementsByClassName('settingsbotstabMaxBotsBox')[0].value.toString(),
      joinSpeed: document.getElementsByClassName('settingsbotstabJoinSpeedBox')[0].value.toString(),
      hubCommand: document.getElementsByClassName('settingsbotstabJoinCommandBox')[0].value,
      accountpath: document.getElementsByClassName('settingsaccounttabPathBox')[0].value,
      macro: document.getElementsByClassName('settingsmacrotabStateText')[0].innerHTML,
      macrodelay: document.getElementsByClassName('settingsmacrotabDelayBox')[0].value,
      macrocommand: document.getElementsByClassName('settingsmacrotabCommandBox')[0].value,
      token: document.getElementsByClassName('discordsettingsTokenBox')[0].value,
      channelID: document.getElementsByClassName('discordsettingsChannelBox')[0].value,
      prefix: document.getElementsByClassName('discordsettingsPrefixBox')[0].value,
      whitelist: whitelist
    }
    ipc.of['main-process'].emit('update-data', datasend);
  });
  //5 way channel with mainbot and gui
  //start button pressed
  SendToIPC.on('start-button', () => {
    ipc.of['main-process'].emit('start-bot');
  })
  //start button pressed reply
  ipc.of['main-process'].on('start-bot-reply', (data) => {
    if (data === "starting") {
      SendToIPC.emit('started');
    }
  })
  //stop button pressed
  SendToIPC.on('stop-button', () => {
    ipc.of['main-process'].emit('stop-bot');
  })
  //start button pressed reply
  ipc.of['main-process'].on('stop-bot-reply', (data) => {
    if (data === "stopping") {
      SendToIPC.emit('stopped');
    }
  })
  //sudo send 
  SendToIPC.on('sudo-send', (ign, sudomessage) => {
    ipc.of['main-process'].emit('sudo-send', [ign, sudomessage]);
  })
  //sudo send all
  SendToIPC.on('sudo-all-send', (message) => {
    ipc.of['main-process'].emit('sudo-send-all', message);
  })
  //discord start button
  SendToIPC.on('start-discord-button', () => {
    ipc.of['main-process'].emit('start-discord-bot');
  })
  //discord start reply
  ipc.of['main-process'].on('start-discord-reply', (data) => {
    if (data === "started bot") {
      SendToIPC.emit('start-discord');
    }
  })
  //discord stop button
  SendToIPC.on('stop-discord-button', () => {
    ipc.of['main-process'].emit('stop-discord-bot');
  })
  //discord stop reply
  ipc.of['main-process'].on('stop-discord-reply', (data) => {
    if (data === "stopping bot") {
      SendToIPC.emit('stop-discord');
    }
  })
  //macro pressed on
  SendToIPC.on('macro-pressed-on', () => {
    ipc.of['main-process'].emit('macro-toggle-on');
  })
  //macro pressed off
  SendToIPC.on('macro-pressed-off', () => {
    ipc.of['main-process'].emit('macro-toggle-off');
  })
  //macro on reply
  ipc.of['main-process'].on('macro-toggle-on-reply', (data) => {
    if (data === 'enabled') {
      SendToIPC.emit('macro-enabled');
    }
  })
  //macro off reply
  ipc.of['main-process'].on('macro-toggle-off-reply', (data) => {
    if (data === 'disabled') {
      SendToIPC.emit('macro-disabled');
    }
  })
  //update online amount
  ipc.of['main-process'].on('online-amount', (data) => {
    SendToIPC.emit('update-online', data)
  })
  //update gui
  ipc.of['main-process'].on('update-gui', data => {
    serverip = data.ServerIP
    port = data.Port
    version = data.version
    maxbots = data.botCount
    joinspeed = data.joinSpeed
    loginmessage = data.hubCommand
    accountpath = data.accountpath
    macrostatus = data.macro
    macrodelay = data.macrodelay
    macromessage = data.macrocommand
    discordtoken = data.token
    discordchannel = data.channelID
    discordprefix = data.prefix
    //settext to boxes
    document.getElementsByClassName('settingsservertabIPbox')[0].value = data.ServerIP;
    document.getElementsByClassName('settingsservertabPortbox')[0].value = data.Port;
    document.getElementsByClassName('settingsservertabVersionbox')[0].value = data.version;
    document.getElementsByClassName('settingsbotstabMaxBotsBox')[0].value = parseFloat(data.botCount);
    document.getElementsByClassName('settingsbotstabJoinSpeedBox')[0].value = parseFloat(data.joinSpeed);
    document.getElementsByClassName('settingsbotstabJoinCommandBox')[0].value = data.hubCommand;
    document.getElementsByClassName('settingsaccounttabPathBox')[0].value = data.accountpath;
    if (data.accountpath != "") {
      let filenametext1 = data.accountpath.split("\\").join("/").split("/");
      document.getElementsByClassName('settingsaccounttabFileName')[0].innerHTML = filenametext1[filenametext1.length - 1];
    }
    if (data.macro === "ON") {
      macrostatetext.style.color = 'green';
      macrostatetext.innerHTML = `ON`;
    }
    if (data.macro === "OFF") {
      macrostatetext.style.color = 'red';
      macrostatetext.innerHTML = `OFF`;
    }
    document.getElementsByClassName('settingsmacrotabDelayBox')[0].value = parseFloat(data.macrodelay);
    document.getElementsByClassName('settingsmacrotabCommandBox')[0].value = data.macrocommand;
    document.getElementsByClassName('discordsettingsTokenBox')[0].value = data.token;
    document.getElementsByClassName('discordsettingsChannelBox')[0].value = data.channelID;
    document.getElementsByClassName('discordsettingsPrefixBox')[0].value = data.prefix;
    document.getElementsByClassName('generalserverip')[0].innerHTML = `SERVER: ${data.ServerIP}:${data.Port}`;
  });
});
//Event Listeners
document.getElementsByClassName('settingsservertabIPbox')[0].addEventListener('click',()=>{
  keyreceived();
})
document.getElementsByClassName('settingsservertabIPbox')[0].addEventListener('keydown',()=>{
  keyreceived();
})
/**
 *  NEW EVENT LISTENER
 * 
 */
document.getElementsByClassName('settingsservertabPortbox')[0].addEventListener('click',()=>{
  keyreceived();
})
document.getElementsByClassName('settingsservertabPortbox')[0].addEventListener('keydown',()=>{
  keyreceived();
})
/**
 *  NEW EVENT LISTENER
 * 
 */
document.getElementsByClassName('settingsservertabVersionbox')[0].addEventListener('click',()=>{
  keyreceived();
})
document.getElementsByClassName('settingsservertabVersionbox')[0].addEventListener('keydown',()=>{
  keyreceived();
})
/**
 *  NEW EVENT LISTENER
 * 
 */
document.getElementsByClassName('settingsbotstabMaxBotsBox')[0].addEventListener('click',()=>{
  keyreceived();
})
document.getElementsByClassName('settingsbotstabMaxBotsBox')[0].addEventListener('keydown',()=>{
  keyreceived();
})
/**
 *  NEW EVENT LISTENER
 * 
 */
document.getElementsByClassName('settingsbotstabJoinSpeedBox')[0].addEventListener('click',()=>{
  keyreceived();
})
document.getElementsByClassName('settingsbotstabJoinSpeedBox')[0].addEventListener('keydown',()=>{
  keyreceived();
})
/**
 *  NEW EVENT LISTENER
 * 
 */
document.getElementsByClassName('settingsbotstabJoinCommandBox')[0].addEventListener('click',()=>{
  keyreceived();
})
document.getElementsByClassName('settingsbotstabJoinCommandBox')[0].addEventListener('keydown',()=>{
  keyreceived();
})
/**
 *  NEW EVENT LISTENER
 * 
 */
document.getElementsByClassName('settingsaccounttabPathBox')[0].addEventListener('click',()=>{
  keyreceived();
})
document.getElementsByClassName('settingsaccounttabPathBox')[0].addEventListener('keydown',()=>{
  keyreceived();
})
/**
 *  NEW EVENT LISTENER
 * 
 */
document.getElementsByClassName('settingsmacrotabDelayBox')[0].addEventListener('click',()=>{
  keyreceived();
})
document.getElementsByClassName('settingsmacrotabDelayBox')[0].addEventListener('keydown',()=>{
  keyreceived();
})
/**
 *  NEW EVENT LISTENER
 * 
 */
document.getElementsByClassName('settingsmacrotabCommandBox')[0].addEventListener('click',()=>{
  keyreceived();
})
document.getElementsByClassName('settingsmacrotabCommandBox')[0].addEventListener('keydown',()=>{
  keyreceived();
})
/**
 *  NEW EVENT LISTENER
 * 
 */
document.getElementsByClassName('settingsmacrotabWhitelistBox')[0].addEventListener('click',()=>{
  keyreceived();
})
document.getElementsByClassName('settingsmacrotabWhitelistBox')[0].addEventListener('keydown',()=>{
  keyreceived();
})
/**
 *  NEW EVENT LISTENER
 * 
 */
document.getElementsByClassName('discordsettingsTokenBox')[0].addEventListener('click',()=>{
  keyreceived();
})
document.getElementsByClassName('discordsettingsTokenBox')[0].addEventListener('keydown',()=>{
  keyreceived();
})
/**
 *  NEW EVENT LISTENER
 * 
 */
document.getElementsByClassName('discordsettingsChannelBox')[0].addEventListener('click',()=>{
  keyreceived();
})
document.getElementsByClassName('discordsettingsChannelBox')[0].addEventListener('keydown',()=>{
  keyreceived();
})
/**
 *  NEW EVENT LISTENER
 * 
 */
document.getElementsByClassName('discordsettingsPrefixBox')[0].addEventListener('click',()=>{
  keyreceived();
})
document.getElementsByClassName('discordsettingsPrefixBox')[0].addEventListener('keydown',()=>{
  keyreceived();
})
//Eventhandler to update settings from gui to main process db
function keyreceived() {
  serverip = document.getElementsByClassName('settingsservertabIPbox')[0].value;
  port = document.getElementsByClassName('settingsservertabPortbox')[0].value;
  version = document.getElementsByClassName('settingsservertabVersionbox')[0].value;
  maxbots = document.getElementsByClassName('settingsbotstabMaxBotsBox')[0].value.toString();
  joinspeed = document.getElementsByClassName('settingsbotstabJoinSpeedBox')[0].value.toString();
  loginmessage = document.getElementsByClassName('settingsbotstabJoinCommandBox')[0].value;
  accountpath = document.getElementsByClassName('settingsaccounttabPathBox')[0].value;
  macrostatus = document.getElementsByClassName('settingsmacrotabStateText')[0].innerHTML;
  macrodelay = document.getElementsByClassName('settingsmacrotabDelayBox')[0].value;
  macromessage = document.getElementsByClassName('settingsmacrotabCommandBox')[0].value;
  discordtoken = document.getElementsByClassName('discordsettingsTokenBox')[0].value;
  discordchannel = document.getElementsByClassName('discordsettingsChannelBox')[0].value;
  discordprefix = document.getElementsByClassName('discordsettingsPrefixBox')[0].value;
  SendToIPC.emit('update');
}