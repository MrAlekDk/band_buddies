<script>
    export let match = {};
    export let unknownUrl = "https://st3.depositphotos.com/29544098/32545/v/450/depositphotos_325452128-stock-illustration-vector-illustration-of-unknown-person.jpg";
</script>

<div class="user">
    <img src={match.imgLink || unknownUrl} alt="User u matched with">
    <div class="bottom-container">
        <div class="meta">
            <h2>{match.name +" "+ match.lastName}</h2>
            <p>{match.artistType}</p>
            <p class="bio">{match.bio || "No bio yet"}</p>
        </div>
        <slot></slot>
</div>
</div>

<style>
    

    img{
        margin: 5%;
        box-shadow: 10px 10px 5px rgb(7, 7, 7);
        border-radius: 7%;
        margin-bottom: 0%;
        width: 250px;
        height: 250px;
        object-fit: cover;
        align-self: center;
    }

    .user{
        background-color: #FF3CAC;
        background-image: linear-gradient(225deg, #FF3CAC 0%, #784BA0 50%, #2B86C5 100%);
        z-index: 5;
        border: 3px solid #f1f1f1;
        width: 30%;
        text-align: center;
        margin-bottom:2%;
        margin-right:1%;
        margin-left:1%;
        border-radius: 2%;
        justify-self: center;
        display:flex;
        flex-direction: column;
        justify-content: space-between;
        min-height: 500px;
        text-shadow: 2px 2px 4px #000000;
    }

    h2{
        margin-bottom: 0;
        text-decoration: underline;
    }

    .meta{
        align-self: center;
    }

    .bottom-container{
        max-width: 90%;
        min-width: 75%;
        align-self: center;
    }


</style>