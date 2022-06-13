<script>
    import Header from "../../components/Header/Header.svelte"
    import { onMount } from "svelte"

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
    console.log(user.imgLink)
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
                <img src="{user.imgLink || "https://st3.depositphotos.com/29544098/32545/v/450/depositphotos_325452128-stock-illustration-vector-illustration-of-unknown-person.jpg"}" alt="User image">
                <div class="information">
                    <input class="bio" id="bio-input" value={(user.bio)} disabled>
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
                        <p>Number of matches: {user.likedUsers.length}</p>
                    </div>
                    <div class="information">
                    </div>
                </div>
            </div>
        </div>
    </div>


<style>

.input, .textarea {
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
        box-shadow: 10px 10px 5px rgb(7, 7, 7);
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
        box-shadow: 10px 10px 5px rgb(7, 7, 7);
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
    max-width: 50%;
    min-width: 40%;
}

.row{
    max-width: 30%;
}

    </style>