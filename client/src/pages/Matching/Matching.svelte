<script>
    import Header from "../../components/Header/Header.svelte"
    import Background from "../../components/Background/Background.svelte";
    import Button from "../../components/Button/Button.svelte"
    import Match from "./Match/Match.svelte";

    import Chat from "../../components/Chat/Chat.svelte"
    import { onMount } from "svelte"

    import store from "../../stores/images.js"
    import store2 from "../../stores/fallback.js"
    const imgUrl = store.band
    
    //generator
    function* getUser(pageSize = 1, list) {
    let output = {};
    let index = 0;

    while (index < list.length) {
        for (let i = index; i < index + pageSize; i++) {
            if (list[i]) {
                output = list[i];
            }
        }
        yield output;
        index += pageSize;
    }
}

let client ={};
let users =[{id:0, name:""}]
let matches = $store2.matches;
let generator;
let userToSwipe=false;
let user ={};
let chatOpen = false;
let match={};

async function fetchItem(item){
        const token = localStorage.getItem("accesToken")
        const res = await fetch(`http://localhost:3000/${item}`, {
            method: "GET",
            headers:{
                "content-type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        });
        if(res.ok){
            let data = await res.json()
            return data
        }
        else{
            return Error("Error in fetch call")
        }
    }

    onMount(async ()=>{

    try{
        users = (await fetchItem('usersToMatch')).data
        client = (await fetchItem('user')).user;
        matches = (await fetchItem('matches')).data 
        generator = getUser(1, users); 
        user = generator.next().value
        if(user){
            userToSwipe = true;
        }
        else{
            userToSwipe = false;
        }
    }
    catch(err){
        console.log(err)
    }
    });
    
    function handleClick(event){
        const target = event.target.id;
        submitRating(target);
        user = generator.next().value;
        if(!user){
            user == null
            userToSwipe = false
        }
    }

    async function submitRating(rating){
        const token = localStorage.getItem("accesToken")
        const response = await fetch("http://localhost:3000/rate", {
            method: 'POST', 
            cache: 'no-cache', 
            credentials: 'same-origin', 
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
                },
        referrerPolicy: 'no-referrer', 
        body: JSON.stringify({rating: rating, userId: user._id}) 
        });

        const data = await response.json();
        localStorage.setItem("accesToken", data.accesToken);
        fetchItem('user')
    }
let chatText;
const switchChatState = (matchId)=>{
    if(chatOpen){
        chatOpen = false;
        chatText = "Open chat";}
    else {
        match = matchId;
        chatOpen = true;
        chatText = "Close chat";
    } 
}

</script>
    <Background url={imgUrl} />
    <div class="content-container">
            <Header />
    <div class="matching-container">
        <h1>Find your future band buddies!</h1>
        {#if userToSwipe}
        <Match match={user} />
        <div class="buttons-container">
            <Button buttonId="like" buttonText="Like" on:click={handleClick}/>
            <Button buttonId="dislike" buttonText="Dislike" on:click={handleClick}/>
        </div>
        {:else}
            <h2>Sorry, currently there are no users to rate 😞</h2>
        {/if}
    </div>
    <div class="matches">
        {#each matches as match}
            <Match match={match}>
                <Button buttonId="open-chat" buttonText={"Chat with " + match.name} on:click={() => switchChatState(match._id)}/>
            </Match>
        {/each}
        {#if chatOpen}
            <Chat client={client} match={match} switchChatState={switchChatState}/>
        {/if}
    </div>
    </div>

<style>
    :global(body){
        margin:0;
        padding:0;
    }

    h1{
        background-color: rgb(0,0,0);
        background-color: rgba(0,0,0, 0.4); 
        color: white;
        font-weight: bold;
        border: 3px solid #f1f1f1;
        z-index: 2;
        padding: 20px;
        text-align: center;
        min-width: 50%;
        font-size: 50px;
    }

    h2{
        align-self: center;
        font-size: 25px;
        font-style: bolder;
        z-index: 10;
    }

    .content-container{
        display: flex;
        flex-direction: column;
        z-index:10;
        justify-content: center;
        align-items: center;
    }

    .matching-container{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: white;
        font-weight: bold;
        margin-top: 1%;
        width: 80%;
        z-index:10;
    }

    .matches{
        z-index: 10;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        background-color: rgb(0,0,0);
        background-color: rgba(0,0,0, 0.4); 
        color: white;
        font-weight: bold;
        border: 3px solid #f1f1f1;
        color: white;
        font-weight: bold;
        border: 3px solid #f1f1f1;
        margin-top: 1%;
        width: 80%;
        box-shadow: 10px 10px 5px rgb(7, 7, 7);
        padding: 3%;
        flex-wrap: wrap;
        overflow:auto;
    }

    .buttons-container{
        display: flex;
        flex-direction: row;
        justify-content: center;
        width: 20%;
    }

</style>