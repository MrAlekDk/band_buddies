<script>
import Header from "../../components/Header/Header.svelte"
import Modal from "../../components/Modal/PostModal.svelte"
import Post from "./Post/Post.svelte"
import Button from "../../components/Button/Button.svelte"
import { Modals, closeModal } from 'svelte-modals'
import { openModal } from 'svelte-modals'
import { onMount } from 'svelte'

let posts = [];

function handleClick() {
        openModal(Modal, { title: "Create post", message: "This is an alert using Svelte-Modal", isOpen: true, update: update })
    }

onMount(()=>{
    fetchPosts();
});

async function fetchPosts(){
    const res = await fetch("http://localhost:3000/post", {
            method: "GET",
            headers:{
                "content-type": "application/json",
            },
        });
    const data = await res.json();
    posts = data.data;

}

const update = () => {
    fetchPosts();
  }
</script>

<div class="bg-image"></div>
    <div class="content-container">
        <Header />
        <Modal isOpen={false}></Modal>
        <Modals>
            <div slot="svelte-modal" on:click={closeModal}></div>
        </Modals>
        <div class="post-container">
            <h1>Posts from our members</h1>
            <div class="buttons-container">
                <Button on:click={handleClick} buttonText="Create new post"/>
            </div>
            <div class="posts">
                {#each posts as post}
                <Post postInfo={post}></Post>
                {/each}
            </div>
        </div>
    </div>

<style>
:global(body){
        margin:0;
        padding:0;
    }

    .bg-image{
        background-image: url("../images/bass.jpg");
        z-index: -1;
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
        color: white;
        font-weight: bold;
        z-index: 2;
        padding: 20px;
        text-align: center;
        align-self: center;
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

    .post-container{
        display: flex;
        flex-direction: column;
        background-color: rgb(0,0,0);
        background-color: rgba(0,0,0, 0.4); 
        color: white;
        font-weight: bold;
        border: 3px solid #f1f1f1;
        margin-top: 1%;
        width: 80%;
        box-shadow: 10px 10px 5px rgb(7, 7, 7);
    }

    .posts{
        display: flex;
        flex-direction:  row;
        flex-wrap: wrap;
        justify-content: space-around;

    }

    .buttons-container{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-self: center;
        width: 25%;
    }
</style>