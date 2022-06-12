<script>
import Header from "../../components/Header/Header.svelte";
import Button from "../../components/Button/Button.svelte"
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
                <Button class=".button" on:click={submitLogin} disabled="{!email || !password }" buttonText={"Login"} />
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

.input-box{
    display:flex;
    flex-direction: column;
    margin-left: 2%;
}

</style>