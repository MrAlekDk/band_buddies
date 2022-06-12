<script>

    export let match = {};
    export let unknownUrl = "https://st3.depositphotos.com/29544098/32545/v/450/depositphotos_325452128-stock-illustration-vector-illustration-of-unknown-person.jpg"
</script>

<div class="user">
    <img src={match.imgLink || unknownUrl}>
    <h2>{match.name +" "+ match.lastName}</h2>
    <p>{match.artistType}</p>
    <p>{match.bio}</p>
    <slot></slot>
</div>

<style>

img{
    margin-top: 5%;
    box-shadow: 10px 10px 5px rgb(7, 7, 7);
    border-radius: 7%;
    margin-bottom: 5%;
    max-width: 50%;
}

.match{
        display: flex;
        flex-direction: column;
        width: 30%;
        background-color: #FF3CAC;
        background-image: linear-gradient(225deg, #FF3CAC 0%, #784BA0 50%, #2B86C5 100%);
        z-index: 5;
        border: 3px solid #f1f1f1;
    }

    .user{
        background-color: #FF3CAC;
        background-image: linear-gradient(225deg, #FF3CAC 0%, #784BA0 50%, #2B86C5 100%);
        z-index: 5;
        border: 3px solid #f1f1f1;
        min-width: 30%;
        width: 50%;
        min-height: 50px;
        text-align: center;
        width: 30%;
        margin: 2%;
        border-radius: 2%;
        justify-self: center;
    }

</style>