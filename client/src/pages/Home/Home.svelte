<script>
    import Navbar from "../../components/Navbar/Navbar.svelte"
    import Header from "../../components/Header/Header.svelte"
    let backgroundUrl = "./images/duo_guitar.jpg"
    

</script>
    <div class="bg-image"></div>
    <div class="content-container">
            <Header />
    <h1>Welcome to Band Buddies!</h1>
    </div>
<style>

    :global(body){
        margin:0;
        padding:0;
    }

    .bg-image{
        background-image: url("../images/duo_guitar.jpg");
        z-index: 0;
        filter: blur(8px);
        -webkit-filter: blur(8px);
        min-height: 100%;
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

</style>