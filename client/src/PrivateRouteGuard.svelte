<script>
	import { Route } from "svelte-navigator";
	import { onMount} from "svelte"
	
	export let path;
	export let component;
	import Home from "./pages/Home/Home.svelte"

	let isAuthorized = false
	onMount(async () => {
		const token = localStorage.getItem("accesToken")
        const res = await fetch("http://localhost:3000/user", {
            method: 'GET',
            headers:{
                "content-type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

		if(res.ok){
			isAuthorized = true
		}


	})
</script>
{#if isAuthorized}
	<slot/>
	<Route path={path} component={component}/>
{:else}
	<Route path={"/"} component={Home}/>
{/if}