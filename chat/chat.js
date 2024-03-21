let msgList = [];

// 在页面加载时从本地存储加载历史消息
window.onload = function() {
    const savedMsgList = JSON.parse(localStorage.getItem('msgList'));
    if (savedMsgList) {
        msgList = savedMsgList;
        msgList.forEach(msg => {
            addMessage(msg.role, msg.content);
        });
        addDivider('以上为历史消息');
        // 如果是第一次发送消息，则显示当前日期和时间
        const currentDate = new Date().toLocaleString();
        addDivider(currentDate);
    }
};

// 在发送消息时保存消息列表到本地存储
function saveMessagesToLocalStorage() {
    localStorage.setItem('msgList', JSON.stringify(msgList));
}

function addMessage(role, content) {
    const chatContainer = document.getElementById('chat-container');
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', role);
    messageDiv.innerHTML = `<img src="${role === 'me' ? 'https://piggyyuzai.github.io/KleeWeb/img/welcome.gif' : 'https://piggyyuzai.github.io/piggy.jpg'}">
                            ${content}`;
                            // <strong>${role}: </strong>${content}`;
    chatContainer.appendChild(messageDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function addDivider(info) {
    const chatContainer = document.getElementById('chat-container');
    const divider = document.createElement('div');
    divider.classList.add('message-divider');
    divider.textContent = info;
    chatContainer.appendChild(divider);
}

function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const messageContent = messageInput.value.trim();
    if (messageContent !== '') {
        const newMsg = { role: 'me', content: messageContent };
        msgList.push(newMsg);
        addMessage('me', messageContent);
        messageInput.value = '';

        saveMessagesToLocalStorage(); // 保存消息到本地存储


        
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer Link_v0SpPeJUGHnfcScMDLdHd7HOPRs440zs3qszhBXesO'
            },
            body: JSON.stringify({ app_code: 'XZ1s42iz', messages: [{ role: 'user', content: messageContent }] })
        };

        fetch('https://api.link-ai.chat/v1/chat/completions', options)
            .then(response => response.json())
            .then(response => {
                const replyContent = response.choices[0].message.content;
                const replyMsg = { role: 'reply', content: replyContent };



                msgList.push(replyMsg);
                addMessage('reply', replyContent);
                saveMessagesToLocalStorage(); // 在接收到回复后保存消息到本地存储
            })
            .catch(error => {
                console.error('Error sending message:', error);
            });
    }
}

// Display initial messages
msgList.forEach(msg => {
    addMessage(msg.role, msg.content);
});