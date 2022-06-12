<script>
import { onMount } from "svelte"

let inputProps = {
	class:[$$restProps.class]
	}

    export let inputId;
    export let inputType;
    export let label;
    export let specStyle;
    export let placeholder;

    export let value ="";

    onMount(async ()=>{
        let input = document.getElementById(inputId)
        input.type = inputType || "text";
    });
</script>

<div class="input-box fade-in-input">
    <label for="artist">You are...</label>
    <select name="artist" id="artist" bind:value>
        <option value="SOLO">Solo artist</option>
        <option value="BAND">Existing Band</option>
        <option value="VENUE">Contractor/Venue</option>
      </select>
</div>

<style>

input, select{
      background-color: rgb(0,0,0);
      color: white;
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

    .row{
        display: flex;
        flex-direction: column;
        min-width: 35%;
        max-width: 45%;
    }

    .fade-in-input {
  animation: fadeIn 0.5s;
  -webkit-animation: fadeIn 0.5s;
  -moz-animation: fadeIn 0.5s;
  -o-animation: fadeIn 0.5s;
  -ms-animation: fadeIn 0.5s;
}
@keyframes fadeIn {
  0% {opacity:0;}
  100% {opacity:1;}
}

@-moz-keyframes fadeIn {
  0% {opacity:0;}
  100% {opacity:1;}
}

@-webkit-keyframes fadeIn {
  0% {opacity:0;}
  100% {opacity:1;}
}

@-o-keyframes fadeIn {
  0% {opacity:0;}
  100% {opacity:1;}
}

@-ms-keyframes fadeIn {
  0% {opacity:0;}
  100% {opacity:1;}
}
</style>