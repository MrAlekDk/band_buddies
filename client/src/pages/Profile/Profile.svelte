<script>
    import Header from "../../components/Header/Header.svelte";
    import Background from "../../components/Background/Background.svelte";
    import Button from "../../components/Button/Button.svelte";
    import { onMount } from "svelte";

    import store from "../../stores/images.js";
    import store2 from "../../stores/fallback.js";
    const imgUrl = store.guitar;

    let user = $store2.user;
onMount( async ()=>{
    const token = localStorage.getItem("accesToken")
        const res = await fetch("http://localhost:3000/user", {
            method: "GET",
            headers:{
                "content-type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        });
    const data = await res.json();
    user = data.user
});
    
async function updateUser(){
    const newBio = user.bio
    const token = localStorage.getItem("accesToken")
    try{
        const res = await fetch("http://localhost:3000/user", {
            method: "PATCH",
            headers:{
                "content-type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({bio: newBio}) 
        });
    }
    catch(err){
        console.log(err);
    }
}
let isEditing = false
let buttonText = "Update Bio"

function handleClick(){
if(isEditing){
    updateUser()
    isEditing = false
    buttontext = "Update Bio"
}
else{
    isEditing = true
    buttonText = "Save new bio"
}

}

</script>
    <Background url={imgUrl} />
    <div class="content-container">
        <Header />
        <div class="profile-container">
            <h1>Profile of {user.name}</h1>
            <div class="box">
                <div class="row">
                    <img src="{user.imgLink || "https://st3.depositphotos.com/29544098/32545/v/450/depositphotos_325452128-stock-illustration-vector-illustration-of-unknown-person.jpg"}" alt="User">
                    <div class="information">
                        <textarea bind:value={user.bio} maxlength=500 disabled={!isEditing}></textarea>
                        <div class="buttons-container">
                            <Button on:click={handleClick} buttonText={buttonText} />
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="information-container">
                        <div class="information">
                            <h2>{`${user.name} ${user.lastName}`}</h2>
                        </div>
                        <div class="information">
                            <p>Birthday: {`${user.birthday}`}</p>
                        </div>
                        <div class="information">
                            <p>Artist type: {`${user.artistType}`}</p>
                        </div>
                        <div class="information">
                            <p>City: {`${user.postalcode}`}</p>
                        </div>
                        <div class="information">
                            <p>Matches: {user.likedUsers.length}</p>
                        </div>
                    </div>
                </div>
            </div>
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
        align-self: center;
        color: white;
        font-weight: bold;
        border: 3px solid #f1f1f1;
        z-index: 2;
        padding: 20px;
        text-align: center;
        min-width: 50%;
        width: 60%;
        font-size: 50px;
        box-shadow: 10px 10px 5px rgb(7, 7, 7);
        text-shadow: 2px 2px 4px #000000;
    }

    h2, p{
        text-shadow: 2px 2px 4px #000000;
    }

    .box{
        display: flex;
        flex: row;
        justify-content: space-around;
    }

    textarea {
        background-color: rgb(0,0,0);
        color: white;
        resize: none;
        align-self: center;
        width: 75%;
        border-radius: 1%;
    }

    .content-container{
        display: flex;
        flex-direction: column;
        z-index:10;
        justify-content: center;
        align-items: center;
    }

    .information{
        display: flex;
        flex-direction: column;
        width: 100%;
    }

    .profile-container{
        display: flex;
        flex-direction: column;
        background-color: #FF3CAC;
        background-image: linear-gradient(225deg, #FF3CAC 0%, #784BA0 50%, #2B86C5 100%);
        color: white;
        font-weight: bold;
        border: 3px solid #f1f1f1;
        border-radius: 1%;
        padding: 20px;
        min-width: 50%;
        width: 60%;
        z-index: 5;
        box-shadow: 10px 10px 5px rgb(7, 7, 7);
        min-height: 700px;
    }

    img{
        box-shadow: 10px 10px 5px rgb(7, 7, 7);
        border-radius: 7%;
        margin-bottom: 5%;
        max-width: 60%;
        min-width: 40%;
        align-self: center;
    }

    .row{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        max-width: 50%;
        min-width: 45%;
        text-align: start;
    }

    .buttons-container{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-self: center;
        width: 50%;
    }
    </style>