<script>
    import Header from "../../components/Header/Header.svelte"
    import { onMount } from "svelte"

    const imageSrc = "data:image/jpeg;base64,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";

    let user = {
        name: "Placeholder",
        lastName: "Placeholder",
        matches: [],
        birthday: "",
        postalcode: 0,
        email: "",
        artistType: "",
        bio: "You have not yet made a bio!"
    };
    let editing = false;
    let buttonText = "Edit";

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
    console.log(user)
});
    
async function updateUser(){
    const newBio = document.getElementById("bio-input").value
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

function handleClick(){
    if(!editing){
        document.getElementById("bio-input").disabled = false
        editing = true;
        buttonText = "Save";
        return;
    }
    else{
        updateUser()
        editing = false;
        buttonText = "Edit";
        document.getElementById("bio-input").disabled = true
    }

}

</script>
    <div class="bg-image"></div>
    <div class="content-container">
        <Header />
        <h1>Welcome {user.name}</h1>
        <div class="profile-container">
            <div class="row">
                <img src={imageSrc} alt="User image">
                <div class="information">
                    <input class="bio" id="bio-input" value="{`Bio: ${(user.bio)}`}" disabled>
                    <button class="button" on:click={handleClick}><span>{buttonText}</span></button>
                </div>
            </div>
            <div class="row">
                <div class="information-container">
                    <div class="information">
                        <p>Name: {`${user.name} ${user.lastName}`}</p>
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
                </div>
            </div>
            <div class="row">
                <div class="information-container">
                    <div class="information">
                        <p>Number of matches: {user.matches.length}</p>
                    </div>
                    <div class="information">
                        <h3>List of matches:</h3>
                        {#each user.matches as match}
                        <li>{match.name}</li>
                        {/each}
                    </div>
                </div>
            </div>
        </div>
    </div>


<style>

.input,
.textarea {
  border: 1px solid #ccc;
  font-family: inherit;
  font-size: inherit;
  padding: 1px 6px;
  max-width: 40%;;
}

.input-wrap {
  position: relative;
}
.input-wrap .input {
  position: absolute;
  width: 100%;
  left: 0;
}

    :global(body){
        margin:0;
        padding:0;
    }

    .bg-image{
        background-image: url("../images/guitarist2.jpg");
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
        width: 60%;
        font-size: 50px;
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
    }

    .profile-container{
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        background-color: rgb(0,0,0);
        background-color: rgba(0,0,0, 0.4); 
        color: white;
        font-weight: bold;
        border: 3px solid #f1f1f1;
        padding: 20px;
        min-width: 50%;
        width: 60%;
        z-index: 5;
    }

    input{
        background-color: rgb(0,0,0);
        background-color: rgba(0,0,0, 0.4); 
        color: white;
        min-height: 50%;
        flex-wrap: wrap;
        height: 60%;
        overflow: hidden;
    }

    .button {
  display: inline-block;
  border-radius: 4px;
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0, 0.4); 
  color: white;
  border: 3px solid #f1f1f1;
  text-align: center;
  font-size: 15px;
  max-width: 45%;
  transition: all 0.5s;
  cursor: pointer;
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