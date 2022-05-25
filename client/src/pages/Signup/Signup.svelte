<script>
import Navbar from "../../components/Navbar/Navbar.svelte"
import Header from "../../components/Header/Header.svelte"

import { onMount } from "svelte"


onMount( async ()=>{
    setMinAndMaxDates()
})


    function setMinAndMaxDates(){
        const minAge = 18;
        const maxAge = 95;

        const dateToday = new Date();
        const maxDate = new Date(new Date().setFullYear(dateToday.getFullYear()- maxAge)); //Date 95 years ago from today date
        const minDate = new Date(new Date().setFullYear(dateToday.getFullYear()- minAge)); //Date 18 years ago from todays date

        let dateInput = document.getElementById("birthday-field");
        dateInput.min = formatDate(minDate);
        dateInput.max = formatDate(maxDate);
    };

    function formatDate(date){
        const year = `${date.getUTCFullYear()}`;
        let month = `${date.getUTCMonth()}`;
        let day = `${date.getUTCDate()}`;

        if(month.length < 2) month = "0" + month
        if(day.length < 2) day = "0" + day

        return `${year}-${month}-${day}`
    }

</script>
    <div class="bg-image"></div>
    <div class="content-container">
            <Header />
        <h1>Signup</h1>
        <div class="signup-container">
            <h2>Create new account:</h2>
            <div class="inputs">
                <div class="row1">
                    <div class="input-box">
                        <label for="first-name">First Name</label>
                        <input id="first-name" placeholder="Mathias" maxlength=20 minlength=2>
                    </div>
                    <div class="input-box">
                        <label for="last-name">Last Name</label>
                        <input id="last-name" placeholder="Johansen" maxlength=30 minlength=2>
                    </div>
                    <div class="input-box">
                        <label for="artist">You are...</label>
                        <select name="artist" id="cars">
                            <option value="SOLO">Solo artist</option>
                            <option value="BAND">Existing Band</option>
                            <option value="VENUE">Contractor/Venue</option>
                          </select>
                    </div>
                </div>
                <div class="row2">
                    <div class="input-box">
                        <label for="email">Email</label>
                        <input id="email" placeholder="exampleEmail@gmail.com" type="email">
                    </div>
                    <div class="input-box">
                        <label for="birthday">Birthday</label>
                        <input id="birthday-field" value="2003-07-13" type="date">
                    </div>
                    <div class="input-box">
                        <label for="city">Postalcode</label>
                        <input id="city" type="number">
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

    .input-box{
        display:flex;
        flex-direction: column;
        margin-left: 2%;
    }
    label{
        text-align: start;
        margin-bottom: 4%;
    }

    .row1, .row2{
        display: flex;
        flex-direction: column;
        min-width: 35%;
        max-width: 45%;
    }

</style>