<script>
    import Header from "../../components/Header/Header.svelte";
    import Background from "../../components/Background/Background.svelte";
    import Button from "../../components/Button/Button.svelte";
    import { onMount } from "svelte";

    import store from "../../stores/images.js"
    const imgUrl = store.guitar

    let user = {
        name: "Placeholder",
        lastName: "Placeholder",
        matches: [],
        birthday: "",
        postalcode: 0,
        email: "",
        artistType: "",
        bio: "You have not yet made a bio!",
        likedUsers: [],
        imgLink: "https://scontent-cph2-1.xx.fbcdn.net/v/t39.30808-6/276252571_5326678807356896_716250865442285171_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=D_FS8rxPSEMAX_x6Wpr&_nc_ht=scontent-cph2-1.xx&oh=00_AT-TrDw45ce5vN6MD5hBKW0cbQkiAj9vOKo3v1bvwzyFww&oe=62ABE9E0"
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
    <Background url={imgUrl} />
    <div class="content-container">
        <Header />
        <div class="profile-container">
            <h1>Profile of {user.name}</h1>
            <div class="box">
                <div class="row">
                    <img src="{user.imgLink || "https://st3.depositphotos.com/29544098/32545/v/450/depositphotos_325452128-stock-illustration-vector-illustration-of-unknown-person.jpg"}" alt="User">
                    <div class="information">
                        <p>{user.bio}</p>
                        <!--input class="bio" id="bio-input" disabled>
                        <button class="button" on:click={handleClick}><span>{buttonText}</span></button>
                        <Input buttonId="bio-input" inputId="city" bind:value={user.bio} label="Bio" inputType="text" disabled={true}/>
                        <Button class="button" on:click={handleClick} buttonText="Edit bio" /-->
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

    .information-container{
        
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

img{
    box-shadow: 10px 10px 5px rgb(7, 7, 7);
    border-radius: 7%;
    margin-bottom: 5%;
    max-width: 60%;
    min-width: 40%;
    align-self: start;
}

.row{
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 50%;
    min-width: 45%;
    text-align: start;
}

    </style>