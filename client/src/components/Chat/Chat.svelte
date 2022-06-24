<script>
    import io from "socket.io-client";
    import { onMount, onDestroy } from "svelte"

    import Button from "../Button/Button.svelte"

    const socket = io("http://localhost:3000");
    let messages = []
    let input;

    export let client;
    export let switchChatState;
    export let match;

    let messagebox;

    function sendMessage(){
        let message = client.name + ": " + input.value;

        if(input.value.length >= 2){
          socket.emit("private message", {msg: message, anotherSocketId:"hdhd", auther: client.name, img: client.imgLink, clientId: client._id, matchId: match});
          input.value = ""
        }

          messagebox.scrollTop = messagebox.scrollHeight
    }

    socket.on("private message", ({data})=>{
        messages = [...messages, data]
    })


onMount(async ()=>{
    input = document.getElementById("message")
    socket.auth = {username: client.email, clientId: client._id, matchId:match }
    socket.connect()
    let modal = document.getElementById("myModal");
    modal.style.display = "block";

})

onDestroy( ()=>{
  socket.disconnect();
})

function getTime(){
  const time = new Date;
  return `${time.getUTCHours()}:${time.getUTCMinutes()}:${time.getUTCSeconds()}`
}
</script>
<div id="myModal" class="modal">

  <div class="modal-content">
    <span id="close" class="close" on:click={switchChatState}>&times;</span>
    <div class="chat-box">
        <h2>Chat with Band Buddy</h2>
        <div class="message-box" bind:this={messagebox}>
            {#each messages as message}
            <div class="message">
              <img src={message.img || "https://st3.depositphotos.com/29544098/32545/v/450/depositphotos_325452128-stock-illustration-vector-illustration-of-unknown-person.jpg"} alt="Profile pic">
              <p>{message.message}</p>
              <p>{getTime()}</p>
            </div>
            {/each}
        </div>
        <input id="message">
        <div class="button-container">
          <Button buttonId ="button" on:click={sendMessage} buttonText="Send message"></Button>
        </div>
    </div>
  </div>

</div>


<style>


.modal {
  display: none; 
  position: fixed; 
  z-index: 10; 
  left: 0;
  top: 0;
  width: 100%; 
  height: 100%;
  margin-bottom: 10%;
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0,0.4); 
}

.modal-content {
  display: flex;
  background-color: #FF3CAC;
  background-image: linear-gradient(225deg, #FF3CAC 0%, #784BA0 50%, #2B86C5 100%);
  box-shadow: 10px 10px 5px rgb(7, 7, 7);
  margin: 5% auto;
  padding: 20px;
  border: 1px solid #888;
  border-radius: 1%;
  width: 80%; 
  height: 80%;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

h2{
    justify-self: center;
}

.chat-box{
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    scroll-behavior: smooth;
    
}

.message-box{
    display: flex;
    flex-direction: column;
    overflow-y:scroll;
    background-color: rgb(42, 34, 148);
    height: 75%;
    background-color: rgb(0,0,0);
    background-color: rgba(0,0,0, 0.4); 
    color: white;
    font-weight: bold;
    border: 3px solid #f1f1f1;
}

.message{
  margin: 2%;
  border: 3px solid #f1f1f1;
}

img{
  width: 5%;
  border-radius: 50%;
}

.button-container{
  max-width: 50%;
  min-width: 30%;
  align-self: center;
}

</style>