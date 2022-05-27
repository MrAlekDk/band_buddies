<script>
    export let id;
    export let type;
    export let label;
    export let specStyle;

    let value ="";
</script>

<div class="input-box">
    <label for={id}>{label}</label>
    <input id={id} bind:value={value} style={specStyle}>
</div>

<style>

.input-box{
        display:flex;
        flex-direction: column;
        justify-self: flex-start;
        align-self: center;
        text-align: center;
        width: 50%;
    }
input{
    color: rgb(255, 255, 255);
    background-color: rgb(0,0,0);
    word-wrap: break-word;
    word-break: break-all;
}

label{
    color: white;
    font-weight: bolder;
    text-align: start;
}

</style>