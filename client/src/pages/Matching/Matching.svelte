<script>
    import Header from "../../components/Header/Header.svelte"
    import Background from "../../components/Background/Background.svelte";
    import Button from "../../components/Button/Button.svelte"
    import Match from "./Match/Match.svelte";

    import Chat from "../../components/Chat/Chat.svelte"
    import { onMount } from "svelte"
    import { openModal } from 'svelte-modals'


    const imgUrl = "../images/band2.jpg";
    

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
let matches = [{name: "Placeholder",
        lastName: "Placeholder",
        matches: [],
        birthday: "",
        postalcode: 0,
        email: "",
        artistType: "",
        bio: "You have not yet made a bio!"}]
let generator;
let userToSwipe=false;

    onMount(async ()=>{
    const token = localStorage.getItem("accesToken")

        const res1 = await fetch("http://localhost:3000/usersToMatch", {
            method: "GET",
            headers:{
                "content-type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        });
    if(res1.ok){
    const userData = await res1.json();
    users = userData.data;
    generator = getUser(1, users); 
    user = generator.next().value
    userToSwipe = true;
    }
    else{
        userToSwipe = false;
    }
      
        const res2 = await fetch("http://localhost:3000/matches", {
            method: "GET",
            headers:{
                "content-type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        });
        const matchesData = await res2.json();
        matches = matchesData.data;

        fetchUser();
    })
    
    function handleClick(event){
        const target = event.target.id;
        submitRating(target);
        try{
            user = generator.next().value;
        }
        catch(err){
            console.log(err)
        }
    }

    async function fetchUser(){
        const token = localStorage.getItem("accesToken")
        const res = await fetch("http://localhost:3000/user", {
            method: "GET",
            headers:{
                "content-type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        });
    const data = await res.json();
    client = data.user
    }

    async function submitRating(rating){
        const token = localStorage.getItem("accesToken")
        const response = await fetch("http://localhost:3000/rate", {
            method: 'POST', 
            mode: 'cors',
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
        console.log(data)
        fetchUser();
        localStorage.setItem("accesToken", data.accesToken);
        fetchUser()
    }

let user ={};
let chatOpen = false;
let chatText = "Open chat";
let match={};

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