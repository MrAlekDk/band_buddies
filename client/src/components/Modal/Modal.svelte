<script>
    import { closeModal } from 'svelte-modals';
    import Input from "../../components/Input/Input.svelte"
    import Button from "../Button/Button.svelte"

    let postTitle = "";
    let content ="";
    export let update;

    async function submit(){
        const todaysDate = new Date;
        const createdDate = `${todaysDate.getUTCFullYear()}-${todaysDate.getUTCMonth()}-${todaysDate.getUTCDate()}`

        let newPost = {
            title: postTitle,
            content: content,
            date: createdDate
        }
        console.log(newPost)
        const token = localStorage.getItem("accesToken")
        const response = await fetch("http://localhost:3000/post", {
            method: 'POST', 
            mode: 'cors',
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
                },
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify({post: newPost}) 
        });
        update();
        closeModal();
    }

    export let isOpen
    export let title
</script>

{#if isOpen}
    <div class="modal fade-in-modal" tabindex="-1" aria-hidden="true">
        <div>
            <div class="modal-content">
                <div class="modal-header">
                    <h1>{title}</h1>
                    <button type="button" class="btn-close box-content w-4 h-4 p-1 opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-white hover:opacity-100 hover:no-underline"
                             aria-label="Close" on:click={closeModal}>&times;</button>
                </div>
                <div class="modal-body">
                    <p>MODAL IS OPEN</p>
                    <slot></slot>
                </div>
                <div class="modal-footer" on:message>
                    <Button on:click={submit} buttonText="Create post" butDisabled={!postTitle || !content} />
                </div>
            </div>
        </div>
    </div>
{/if}

<style>
    .modal {
        display: flex;
        position:fixed;
        margin: 0 auto;
        overflow-x: hidden;
        overflow-y: auto;
        outline: none;
        z-index: 10;
        top: 20%;
    }

    .btn-close{
        background-color: black;
        color: white;
        border: none;
        font-size: 20px;
        cursor: pointer;
    }
    
    h1{
        color: rgb(255, 255, 255);
        font-weight: bold;
        z-index: 2;
        text-align: center;
        align-self: center;
        min-width: 50%;
        font-size: 30px;
    }

    .modal-content{
        display: flex;
        flex-direction: column;
        background-color: rgb(0, 0, 0);
        background-clip: padding;
        pointer-events: auto;
        border: solid 2px rgb(255, 255, 255);
        border-radius: 2%;
        min-width: 600px;
    }

    .modal-header{
        display: flex;
        flex-shrink: 0;
        justify-content: space-between;
        align-items: center;
        border: 1px;
        padding: 8px;
    }

    .modal-body{
        display: flex;
        flex-direction: column;
        padding: 8px;
    }

    .modal-footer{
        display: flex;
        color: white;
        flex-shrink: 0;
        flex-wrap: wrap;
        justify-content: center;
        padding: 10px;
        border: black 2 px solid;
        border-radius: 2%;
    }


    .fade-in-modal {
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