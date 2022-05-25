<script>
	import { Router, Link, Route } from "svelte-navigator"
	import PrivateRoute from "./PrivateRoute.svelte";
	import Home from "./pages/Home/Home.svelte";
</script>

<Router>
	<Route path="/" component={Home} />
	<Route path="/home" component={Home} />
	<PrivateRoute path="/dashboard" let:location>
	</PrivateRoute>	
	<Route path="/*" component={Home} />
</Router>

<style>
</style>