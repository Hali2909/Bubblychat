require('dotenv').config();   // load variable 

const endpoint = process.env.endpoint;  // legge la chiave

console.log()
const systemPrompt = 'You are Christ a friend that reply in a kinda and friendly way. Reply in english with a natural tone like a friend will do in a chat. keep answer short and spontaneous'
//let's take the elements that we need 
const input = document.querySelector('input')
const button = document.querySelector('button')
const ChatBox = document.querySelector('.chat-box') // in this case we don't have kust one div block so we take the class
const contactStatus = document.querySelector('.contact-status')
const messages = []

//Enter/ arrow button
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
    getAnswerFromGemini()
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


async function getAnswerFromGemini(){
    const chatForGemini = formatChatForGemini()
    //writing status
    contactStatus.innerText = 'Is writing'
    const response = await fetch(endpoint,{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({contents: chatForGemini}) 
    })

    const data = await response.json()
    const answer = data.candidates[0].content.parts[0].text
    contactStatus.innerText = 'Online'
    addMessage('received', answer)
}



/* ai implementation*/

function formatChatForGemini(){
    const formattedChat = []

    for(const message of messages){
        formattedChat.push({
            parts: [{text: message.text}],
            role: message.type == 'sent' ? 'user' : 'model'
        })
    }
    formattedChat.unshift({
    parts: [{text: systemPrompt }],
    role: 'user',
    })
    return formattedChat    
}




