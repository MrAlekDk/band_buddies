<script>
    import Header from "../../components/Header/Header.svelte"
    import Background from "../../components/Background/Background.svelte";
    import store from "../../stores/images.js"
    const imgUrl = store.duoGuitar

</script>
    <Background url={imgUrl} />
    <div class="content-container">
            <Header />
    <h1>Welcome to Band Buddies!</h1>
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
        font-size: 50px;
    }

    .content-container{
        display: flex;
        flex-direction: column;
        z-index:10;
        justify-content: center;
        align-items: center;
    }

</style>