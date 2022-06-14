<script>
    import Navbar from "../Navbar/Navbar.svelte";
    import { useNavigate, useLocation } from "svelte-navigator";

    const navigate = useNavigate();
    const location = useLocation();
    

    function returnToFrontpage(){
    navigate("/",{
        state: {from : $location.pathname},
        replace: false,
    });
}
</script>

<div class="header-container">
    <div class="header">
        <h1 on:click={returnToFrontpage}>Band buddies</h1>
        </div>
    <Navbar />
</div>

<style>

.header{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    min-width: 30%;
}

.header-container{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
}

h1{
    color: white;
    margin: 5%;
    margin-right: 5%;
    min-width: 50%;
    width: 70%;
    font-weight: bold;
    justify-self: flex-start;
    align-self: center;
    z-index: 2;
    text-align: center;
    text-shadow: 3px 3px #141313;
    font-size: 60px;
    user-select: none;
    outline: none;
}

h1:hover{
    cursor: pointer;
}

@media only screen and (max-width: 900px) {
  h1 {
    font-size: 45px;
  }
}
/* If the screen size is 900px or less */
@media only screen and (max-width: 500px) {
  h1 {
    font-size: 25px;
  }
}

</style>