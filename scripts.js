console.log()

//let's take the elements that we need 
const input = document.querySelector('input')
const button = document.querySelector('button')
const ChatBox = document.querySelector('.chat-box') // in this case we don't have kust one div block so we take the class

const messages = []
button.addEventListener('click', SendMessage)
input.addEventListener('keyup', function(event){
    if(event.key == 'Enter'){
        SendMessage()
    }
})


function SendMessage(){
    const insertedText = input.value.trim()
    if(insertedText == '') return
    addMessage('sent', insertedText)
    input.value = ''
    input.focus() // to be ready to write again
    ChatBox.scrollTop = ChatBox.scrollHeight //scroll as the height of the ChatBox
}

function ShowMessages(){
    ChatBox.innerHTML = ''
//for each message 
    for (const message of messages){
        ChatBox.innerHTML += `
        <div class='chat-row ${message.type}'>
            <div class='chat-message'>
                <p> ${message.text} </p>
                <time datetime= "${message.time}">
                    ${message.time}
                </time>
            </div>
        </div>`
    }
}

function addMessage(MessageType, messageText){
    const newMessage = {
        type: MessageType,
        text: messageText,
        time: new Date().toLocaleString()
    }
    messages.push(newMessage)
    ShowMessages()
}