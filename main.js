const chatInput = document.querySelector("#chat-input");
const sendButton = document.querySelector("#send-btn");
const chatContainer = document.querySelector(".chat-container");
const themeButton = document.querySelector("#theme-btn");
const deleteButton = document.querySelector("#delete-btn");
const defaultText = document.querySelector(".default-text");

let userText = null

const API_KEY = ""

const createElement = (html, className) => {
    const chatDiv = document.createElement("div")
    chatDiv.classList.add("chat", className)
    chatDiv.innerHTML = html
    return chatDiv
}

const getChatResponse = async (incomingChatDiv) => {
const API_URL=""
const pElement=document.createElement("p")


const requestData = {
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: "You are a helpful assistant.",
      },
      {
        role: "user",
        content: `${userText}`,
      },
    ],
}

const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify(requestData),
  }
try {
  const response=  await(await fetch(API_URL, requestOptions)).json()
 pElement.textContent=response.choices[0].message.content
} catch (error) {
    console.log(error)
}

incomingChatDiv.querySelector(".typing-animation").remove()
incomingChatDiv.querySelector(".chat-details").appendChild(pElement)
chatInput.value=""
}

const showTypingAnimation = () => {
    const html = `
    <div class="chat-content">
    <div class="chat-details">
    <img src="./images/chatbot.jpg" alt="" />
    <div class="typing-animation">
        <div class="typing-dot" style="--delay: 0.2s"></div>
        <div class="typing-dot" style="--delay: 0.3s"></div>
        <div class="typing-dot" style="--delay: 0.4s"></div>
    </div>
    </div>
</div>
    `
    const incomingChatDiv = createElement(html, "incoming")
    chatContainer.appendChild(incomingChatDiv)
    chatContainer.scrollTo(0, chatContainer.scrollHeight)
    getChatResponse(incomingChatDiv)
}

const handleOutGoingChat = () => {
    userText = chatInput.value.trim()
    if (!userText) return
    const html = `
    <div class="chat-content">
        <div class="chat-details">
            <img src="./images/user.jpg" alt="" />
            <p></p>
        </div>
    </div>
  `

    const outGoingChatDiv = createElement(html, "outgoing")
    document.querySelector(".default-text")?.remove();
    outGoingChatDiv.querySelector("p").textContent = userText
    chatContainer.appendChild(outGoingChatDiv)
    setTimeout(showTypingAnimation, 250)
}

chatInput.addEventListener("keydown", (e)=>{
    if (e.key==="Enter") {
        e.preventDefault()
        handleOutGoingChat()
    }
    
})

sendButton.addEventListener("click", handleOutGoingChat)

themeButton.addEventListener("click",()=>{
    document.body.classList.toggle("light-mode")
    themeButton.innerText=document.body.classList.contains("light-mode") ? "dark_mode" : "light_mode";
})

deleteButton.addEventListener("click", ()=>{
    if (confirm("tüm sohbetleri silmek üzeresiniz. yine de devam etmek istiyor musunuz")) {
        chatContainer.remove()
    }
    const defaultText=`
    <div class="default-text">
    <h1>ChatGPT Clone</h1>
  </div>
  <div class="typing-container">
  <div class="typing-content">
    <div class="typing-textarea">
      <textarea
        id="chat-input"
        placeholder="Enter a propmt here"
        required
      ></textarea>
      <span id="send-btn" class="material-symbols-outlined"> send </span>
    </div>
    <div class="typing-controls">
      <span id="theme-btn" class="material-symbols-outlined">
        light_mode
      </span>
      <span id="delete-btn" class="material-symbols-outlined">
        delete
      </span>
    </div>
  </div>
</div>
    `
    document.body.innerHTML=defaultText
})