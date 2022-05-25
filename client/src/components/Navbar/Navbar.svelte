<script>

</script>

<div class="navbar-container">
    <a href="/signup" type="button" class="glow-on-hover">Signup</a>
    <a href="/login" type="button" class="glow-on-hover">Login</a>
</div>

<style>

.navbar-container{
    display: flex;
    flex-direction: row;
    z-index: 2;
    text-align: center;
    align-self: flex-end;
    justify-self: flex-end;
    margin-right: 5%;
    margin-top: 1%;
}

a{
    background-color: rgb(0,0,0);
    background-color: rgba(0,0,0, 0.4); 
    color: white;
    font-weight: bold;
    border: 3px solid #f1f1f1;
    margin: 5%;
    margin-right: 5%;
    padding-left: 25px;
    padding-right: 25px;
    font-size: 25px;
    padding-top: 2%;
    padding-bottom: 2%;
    text-decoration: none;
}


.glow-on-hover {
    border: 3px solid #f1f1f1;
    outline: none;
    color: #fff;
    background-color: rgba(0,0,0, 0.4); 
    cursor: pointer;
    position: relative;
    z-index: 0;
    border-radius: 10px;
}

.glow-on-hover:before {
    content: '';
    background: linear-gradient(45deg, #ff0000, #ff7300, #fffb00, #48ff00, #00ffd5, #002bff, #7a00ff, #ff00c8, #ff0000);
    position: absolute;
    top: -2px;
    left:-2px;
    background-size: 400%;
    z-index: -1;
    filter: blur(5px);
    width: calc(100% + 4px);
    height: calc(100% + 4px);
    animation: glowing 20s linear infinite;
    opacity: 0;
    transition: opacity .3s ease-in-out;
    border-radius: 10px;
}

.glow-on-hover:active {
    background-color: rgba(0,0,0, 0.4); 
}

.glow-on-hover:active:after {
    background: transparent;
}

.glow-on-hover:hover:before {
    opacity: 1;
}

.glow-on-hover:after {
    z-index: -1;
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: #111;
    left: 0;
    top: 0;
    border-radius: 10px;
}

@keyframes glowing {
    0% { background-position: 0 0; }
    50% { background-position: 400% 0; }
    100% { background-position: 0 0; }
}
</style>