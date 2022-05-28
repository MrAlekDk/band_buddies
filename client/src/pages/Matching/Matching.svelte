<script>
    import Navbar from "../../components/Navbar/Navbar.svelte"
    import Header from "../../components/Header/Header.svelte"
    import { onMount } from "svelte"

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

let users =[{id: 1, name:"Alek"}, {id:2, name:"Jens"}, {id:3, name:"Ida"}];
let generator= getUser(1, users); 

    onMount(async ()=>{

        user = generator.next().value
    })

    function handleClick(event){
        console.log(event.target)
        user = generator.next().value
        console.log("click")
    }

let user ={};
</script>

    <div class="bg-image"></div>
    <div class="content-container">
            <Header />
    <div class="matching-container">
        <h1>This is the matching page lol</h1>
        <div class="user">
            <h2>{user.name}</h2>
            <p>{user.id}</p>
    </div>
        <div class="buttons-container">
            <button class="button" id="like" on:click={handleClick}><span>Like</span></button>
            <button class="button" id="dislike" on:click={handleClick}><span>Dislike</span></button>
        </div>
    </div>
    </div>


<style>

    :global(body){
        margin:0;
        padding:0;
    }

    .bg-image{
        background-image: url("../images/band2.jpg");
        z-index: 0;
        filter: blur(8px);
        -webkit-filter: blur(8px);
        min-height: 100%;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        width: 100%;
        position:absolute;
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
        background-color: #ff3caa79;
        background-image: linear-gradient(225deg, #FF3CAC 0%, #784BA0 50%, #2B86C5 100%);
        color: white;
        font-weight: bold;
        border: 3px solid #f1f1f1;
        margin-top: 1%;
        width: 80%;
        box-shadow: 10px 10px 5px rgb(7, 7, 7);
    }


    .user{
        background-color: #FF3CAC;
        background-image: linear-gradient(225deg, #FF3CAC 0%, #784BA0 50%, #2B86C5 100%);
        z-index: 5;
        border: 3px solid #f1f1f1;
        min-width: 30%;
        min-height: 50px;
        text-align: center;
        width: 30%;
        margin: 2%;
        border-radius: 2%;
        justify-self: center;
    }

    .buttons-container{
        display: flex;
        flex-direction: row;
        justify-content: center;
        width: 100%;
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
z-index: 5;
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