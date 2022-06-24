<script>
import Header from "../../components/Header/Header.svelte"
import Background from "../../components/Background/Background.svelte";
import Input from "../../components/Input/Input.svelte"
import Select from "../../components/Input/Select.svelte"
import Button from "../../components/Button/Button.svelte"

import { onMount } from "svelte"
import { useNavigate, useLocation } from "svelte-navigator";

import store from "../../stores/images.js"
const imgUrl = store.drums

const navigate = useNavigate();
const location = useLocation();


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
    let imgLink = "";

    async function submitSignup(){
        const user = {
            name: first,
            lastName: last,
            password: password,
            birthday: birthday,
            email: email,
            artistType: artistType,
            postalcode: postalcode,
            imgLink: imgLink,
            likedUsers: [],
            dislikedUser: []
        }
        
        const response = await fetch("http://localhost:3000/user", {
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
        let data = await response.json()
        console.log(data)
        if(response.ok){
            login(user)
        }

    }

    async function login(user){
        const response = await fetch("http://localhost:3000/login", {
            method: 'POST', 
            mode: 'cors',
            cache: 'no-cache', 
            credentials: 'same-origin', 
            headers: {
                'Content-Type': 'application/json'
                },
            referrerPolicy: 'no-referrer', 
            body: JSON.stringify({user}) 
            });

        if(response.ok){
            let data = await response.json();
            localStorage.setItem("accesToken", data.accesToken);

            const from = ($location.state && $location.state.from) || "/";
            navigate("/profile", from, { replace: true });
        }
        
    }

</script>
    <Background url={imgUrl} />
    <div class="content-container">
            <Header />
        <h1>Signup</h1>
        <div class="signup-container">
            <h2>Create new account:</h2>
            <div class="inputs">
                    <Select inputId="artist" bind:value={artistType} label="You are..." />
                    {#if artistType}
                    <Input inputId="first-name" bind:value={first} label="First Name" placeholder="Mathias" />
                    {/if}
                    {#if first}
                    <Input inputId="last-name" bind:value={last} label="Last Name" placeholder="Johanson" />
                    {/if}
                    {#if last}
                    <Input inputId="email" bind:value={email} label="Email" placeholder="exampleEmail@gmail.com" inputType="email"/>
                    {/if}
                    {#if email}
                    <Input inputId="password" bind:value={password} label="Password" inputType="password"/>
                    {/if}
                    {#if password}
                    <Input inputId="birthday" bind:value={birthday} label="Birthday" inputType="date"/>
                    {/if}
                    {#if birthday}
                    <Input inputId="imgLink" bind:value={imgLink} label="Link to image" inputType="text"/>
                    {/if}
                    {#if imgLink}
                    <Input inputId="city" bind:value={postalcode} label="Postalcode" inputType="number"/>
                    <Button on:click={submitSignup} buttonText="Create account!" butDisabled="{!first || !last || !email || !birthday}" />
                    {/if}
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
        flex-direction: column;
        align-self: center;
        min-width: 35%;
        max-width: 45%;
    }

</style>