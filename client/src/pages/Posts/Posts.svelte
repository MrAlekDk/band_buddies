<script>
import Header from "../../components/Header/Header.svelte"
import Modal from "../../components/Modal/Modal.svelte"

import { Modals, closeModal } from 'svelte-modals'
import { openModal } from 'svelte-modals'

let posts = ["hello", "hello2"]

function handleClick() {
        openModal(Modal, { title: "Create post", message: "This is an alert using Svelte-Modal" })
    }

</script>
<div class="bg-image"></div>
    <div class="content-container">
        <Header />
        <Modal />
        <Modals>
            <div slot="svelte-modal" on:click={closeModal}></div>
        </Modals>
        <div class="post-container">
            <h1>Welcome to posts</h1>
            <button class="button" on:click={handleClick}><span>Create new post</span></button>
            <div class="posts">

                {#each posts as post}
                <div class="post">
                    <p>Yo i am {post}</p>
                </div>
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
    }

    .posts{
        display: flex;
        flex-direction:  row;
        justify-content: space-around;
    }

    .post{
        border: 3px solid #f1f1f1;
        min-width: 30%;
        min-height: 50px;
        text-align: center;
    }

    .button {
border-radius: 4px;
background-color: rgb(0,0,0);
background-color: rgba(0,0,0, 0.4); 
color: white;
border: 3px solid #f1f1f1;
text-align: center;
font-size: 20px;
align-self: center;
transition: all 0.5s;
cursor: pointer;
margin: 5px;
min-width: 25%;
max-width: 30%;
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