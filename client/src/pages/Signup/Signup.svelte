<script>
import Header from "../../components/Header/Header.svelte"

import { onMount } from "svelte"


onMount( async ()=>{
    setMinAndMaxDates()
})

    //calculate and set the max & min date required to create an account
    function setMinAndMaxDates(){
        const minAge = 18;
        const maxAge = 95;

        const dateToday = new Date();
        const maxDate = new Date(new Date().setFullYear(dateToday.getFullYear()- maxAge)); 
        const minDate = new Date(new Date().setFullYear(dateToday.getFullYear()- minAge)); 

        let dateInput = document.getElementById("birthday-field");
        dateInput.min = formatDate(minDate);
        dateInput.max = formatDate(maxDate);
    };

    //formats date object so it can be used by min/max at date input
    function formatDate(date){
        const year = `${date.getUTCFullYear()}`;
        let month = `${date.getUTCMonth()}`;
        let day = `${date.getUTCDate()}`;

        if(month.length < 2) month = "0" + month
        if(day.length < 2) day = "0" + day

        return `${year}-${month}-${day}`
    }

    let first = "";
    let last = "";
    let password = "";
    let birthday = "";
    let email = "";
    let artistType = "";
    let postalcode = 0;

    async function submitSignup(){
        const user = {
            name: first,
            lastName: last,
            password: password,
            birthday: birthday,
            email: email,
            artistType: artistType,
            postalcode: postalcode,
            matches: []
        }


        const response = await fetch("http://localhost:3000/register", {
            method: 'POST', 
            mode: 'cors',
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
                },
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify({user: user}) 
  });
    date = await response.json()
    console.log(data)

    }

</script>
    <div class="bg-image"></div>
    <div class="content-container">
            <Header />
        <h1>Signup</h1>
        <div class="signup-container">
            <h2>Create new account:</h2>
            <div class="inputs">
                <div class="row">
                    <div class="input-box">
                        <label for="first-name">First Name</label>
                        <input id="first-name" bind:value={first} placeholder="Mathias" maxlength=20 minlength=2>
                    </div>
                    <div class="input-box">
                        <label for="last-name">Last Name</label>
                        <input id="last-name" bind:value={last} placeholder="Johansen" maxlength=30 minlength=2>
                    </div>
                    <div class="input-box">
                        <label for="artist">You are...</label>
                        <select name="artist" id="artist" bind:value={artistType}>
                            <option value="SOLO">Solo artist</option>
                            <option value="BAND">Existing Band</option>
                            <option value="VENUE">Contractor/Venue</option>
                          </select>
                    </div>
                    <button on:click={submitSignup} class="button" style="vertical-align:middle" disabled="{!first || !last || !email || !birthday}"><span>Create account! </span></button>
                </div>
                <div class="row">
                    <div class="input-box">
                        <label for="password">Password</label>
                        <input id="password" bind:value={password} type="password">
                    </div>
                    <div class="input-box">
                        <label for="email">Email</label>
                        <input id="email" bind:value={email} placeholder="exampleEmail@gmail.com" type="email">
                    </div>
                    <div class="input-box">
                        <label for="birthday">Birthday</label>
                        <input id="birthday-field" bind:value={birthday} type="date">
                    </div>
                    <div class="input-box">
                        <label for="city">Postalcode</label>
                        <input id="city" bind:value={postalcode} type="number">
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

    .bg-image{
        background-image: url("../images/drums.jpg");
        z-index: 0;
        filter: blur(8px);
        -webkit-filter: blur(8px);
        height: 100%;
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
    }

    .content-container{
        display: flex;
        flex-direction: column;
        z-index:10;
        justify-content: center;
        align-items: center;
    }

    .signup-container{
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        background-color: rgb(0,0,0);
        background-color: rgba(0,0,0, 0.4); 
        color: white;
        font-weight: bold;
        border: 3px solid #f1f1f1;
        z-index: 2;
        padding: 20px;
        text-align: center;
        min-width: 50%;
    }

    .inputs{
        display: flex;
        flex-direction: row;
        justify-content: space-around;
    }

    .input-box, button{
        display:flex;
        flex-direction: column;
        margin-left: 2%;
    }

    button{
        text-align: center;

    }
    label{
        text-align: start;
        margin-bottom: 4%;
    }

    .row{
        display: flex;
        flex-direction: column;
        min-width: 35%;
        max-width: 45%;
    }

    .button {
  display: inline-block;
  border-radius: 4px;
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0, 0.4); 
  color: white;
  border: 3px solid #f1f1f1;
  text-align: center;
  font-size: 20px;
  max-width: 65%;
  transition: all 0.5s;
  cursor: pointer;
  margin: 5px;
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