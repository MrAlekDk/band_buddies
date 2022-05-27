<script>
import Header from "../../components/Header/Header.svelte";
import { useNavigate, useLocation } from "svelte-navigator";
import { onMount } from "svelte";

let email = "";
let password ="";

        
const navigate = useNavigate();
const location = useLocation();

async function submitLogin(){
        const user = {
            email: email,
            password: password
        }

        const response = await fetch("http://localhost:3000/login", {
            method: 'POST', 
            mode: 'cors',
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
                },
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify({user}) 
            });
                
        let data = await response.json();
        localStorage.setItem("accesToken", data.accesToken);

        const from = ($location.state && $location.state.from) || "/";
        navigate("/profile", from, { replace: true });

}
</script>

<div class="bg-image"></div>
<div class="content-container">
        <Header />
    <h1>Login</h1>
    <div class="login-container">
        <h2>Enter information: </h2>
        <div class="inputs">
            <div class="row">
                <div class="input-box">
                    <label for="email">Email</label>
                    <input id="email" bind:value={email} type="email">
                </div>
                <div class="input-box">
                    <label for="password">Password</label>
                    <input id="password" bind:value={password} type="password">
                </div>
                <button on:click={submitLogin} class="button" style="vertical-align:middle" disabled="{!email || !password }"><span>Login</span></button>
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

.login-container{
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
input{
    background-color: rgba(0,0,0, 0.4); 
}

.input-box, button{
    display:flex;
    flex-direction: column;
    margin-left: 2%;
}

button{
    text-align: center;
    align-self: center;
    min-width: 50%;
    width: 75%;
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