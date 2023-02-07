//const { append } = require("express/lib/response");

const socket = io()
 let Btn = document.querySelector('.Btn')
let name;
let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('.message__area')

do {
    name = prompt('Porisoi(first name only)')
} while (!name);

socket.emit('new-user-joined',name)

textarea.addEventListener('keyup',(e)=>{

    if (e.key === 'Enter'){
        sendMessage(e.target.value)
    }
})
function sendMessage(message){
    let msg = {
        user : name,
        message : message.trim()
    }
    //append
    appendMessage (msg,'outgoing')
    textarea.value = ''
    scrollToBottom()
    

    //send to server 

    socket.emit('message',msg)
}
function appendMessage(msg,type){
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className, 'message')

    let markup = `<h4> ${msg.user}</h4>
    <p>${msg.message}</p>
        `
        mainDiv.innerHTML = markup
        messageArea.appendChild(mainDiv)
}
// recioving the msg
socket.on('message',(msg) =>{
    appendMessage(msg,'incoming')
    scrollToBottom()
})
function scrollToBottom (){
    messageArea.scrollTop = messageArea.scrollHeight
}