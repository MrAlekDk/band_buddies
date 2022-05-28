<script>
	import { useNavigate, useLocation } from "svelte-navigator";
	import { Route, Link } from "svelte-navigator";
	import { onMount} from "svelte"
	const navigate = useNavigate();
	const location = useLocation();
	
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
	<!--Weird code behavior I need to research later. Line 34 should have path /profile, but a blank page i presented if I write that-->
	<Route path={path} component={component}/>
{:else}
	<Route path={"/"} component={Home}/>
{/if}