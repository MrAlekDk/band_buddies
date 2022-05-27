<script>
    import { closeModal } from 'svelte-modals';
    import Input from "../../components/Input/Input.svelte"

    async function submit(){
        const title = document.getElementById("post-title").value
        const content = document.getElementById("post-content").value

        const createdDate = `${Date.prototype.getUTCFullYear} + ${Date.prototype.getUTCMonth} + ${Date.prototype.getUTCDate}`

        let newPost = {
            title: title,
            content: content,
            date: createdDate
        }

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
        console.log(response)
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
                            data-bs-dismiss="modal" aria-label="Close" on:click={closeModal}>X</button>
                </div>
                <div class="modal-body">
                    <Input id="post-title" type="text" label="Title"/>
                    <Input id="post-content" type="text" label="Content" specStyle={"height: 100px; padding-bottom: 80px; overflow-x: wrap"}/>
                </div>
                <div class="modal-footer">
                    <button type="button" class="button" on:click={submit} data-bs-dismiss="modal"><span>Create post</span></button>
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

.button {
border-radius: 4px;
background-color: rgb(0, 0, 0); 
color: white;
border: 3px solid #f1f1f1;
text-align: center;
font-size: 18px;
font-weight: bolder;
align-self: center;
transition: all 0.5s;
cursor: pointer;
margin: 5px;
padding: 1%;
min-width: 55%;
max-width: 70%;
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