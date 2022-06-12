<script>
    import io from "socket.io-client";
    import { onMount } from "svelte"

    const socket = io("http://localhost:3000");
    let messages = []
    let input;

    export let client;

    function sendMessage(){
        let message = client.name + ": " + input.value;
        socket.emit("private message", {msg: message, anotherSocketId:"hdhd", auther: client.name});
        input.value = ""
    }

    socket.on("private message", ({data})=>{
        messages = [...messages, data]
    })


onMount(async ()=>{
    input = document.getElementById("message")
    console.log("open modal")
    socket.auth = {username: "Alek"}
    socket.connect()
    let modal = document.getElementById("myModal");
    modal.style.display = "block";

})
</script>

<div id="myModal" class="modal">

  <div class="modal-content">
    <span id="close" class="close">&times;</span>
    <div class="chat-box">
        <h2>Chat with "Band buddy"</h2>
        <div class="message-box">
            {#each messages as message}
            <p>{message}</p>
            {/each}
        </div>
        <input id="message">
        <button class="button" on:click={sendMessage}><span>Send message</span></button>
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
  overflow: auto; 
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0,0.4); 
}

.modal-content {
    display: flex;
  background-color: #000000;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%; 
  height: 50%;
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
}

.message-box{
    display: flex;
    flex-direction: column;
    overflow-y:scroll;
    background-color: rgb(42, 34, 148);
    height: 50%;
    max-height: 60%;
    background-color: rgb(0,0,0);
    background-color: rgba(0,0,0, 0.4); 
    color: white;
    font-weight: bold;
    border: 3px solid #f1f1f1;
}

.button {
border-radius: 4px;
background-color: rgb(0,0,0);
background-color: rgba(0,0,0, 0.4); 
color: white;
border: 3px solid #f1f1f1;
text-align: center;
font-size: 20px;
align-self: center;
transition: all 0.5s;
cursor: pointer;
margin: 5px;
min-width: 25%;
max-width: 30%;
z-index: 10;
}

.button span {
cursor: pointer;
display: inline-block;
position: relative;
transition: 0.5s;
}

.button span:after {
content: '\00bb';
position: absolute;
opacity: 0;
top: 0;
right: -20px;
transition: 0.5s;
}

.button:hover span {
padding-right: 25px;
}

.button:hover span:after {
opacity: 1;
right: 0;
}

</style>