const socket = io()
let name;
//declare textarea and messagearea
let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('.message__area')
// take input as name of user's
do {
    name = prompt('Please Enter Your Name: ')
} while(!name)
// when user press enter then message will send to reciver
// addEventListener() sets up a function that will be called whenever 
// ...the specified event is delivered to the target

textarea.addEventListener('keyup', (e) => {
    if(e.key === 'Enter') {
        sendMessage(e.target.value)
    }
})

// sender write the message in message area to send to reciver
function sendMessage(message) {
    let msg = {
        user: name,
        //The trim() method removes whitespace from both sides of a string
        message: message.trim()
    }
    // Append 
    appendMessage(msg, 'outgoing')
    textarea.value = 'msg'
    scrollToBottom()

    // Send  
     //emit events on one side and register listeners on the othe 
    socket.emit('message', msg)

}
// this function will append the message 
function appendMessage(msg, type) {
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className, 'message')

    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv)
}

// Recieve 
socket.on('message', (msg) => {
    appendMessage(msg, 'incoming')
    scrollToBottom()
})

function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight
}

