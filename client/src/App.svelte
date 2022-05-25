<script>
	import { Router, Link, Route } from "svelte-navigator"
	import PrivateRoute from "./PrivateRoute.svelte";
	import Home from "./pages/Home/Home.svelte";
	import Signup from "./pages/Signup/Signup.svelte"
	import Login from "./pages/Login/Login.svelte"
</script>

<Router>
	<Route path="/" component={Home} />
	<Route path="/home" component={Home} />
	<Route path="/signup" component={Signup} />
	<Route path="/login" component={Login} />
	<PrivateRoute path="/dashboard" let:location>
	</PrivateRoute>	
	<Route path="/*" component={Home} />
</Router>

<style>
</style>