<script>
	import { Router, Link, Route } from "svelte-navigator"
	import PrivateRoute from "./PrivateRoute.svelte";

	//public pages
	import Home from "./pages/Home/Home.svelte";
	import Signup from "./pages/Signup/Signup.svelte"
	import Login from "./pages/Login/Login.svelte"
	import Posts from "./pages/Posts/Posts.svelte"

	//private pages
	import Matching from "./pages/Matching/Matching.svelte"
	import Profile from "./pages/Profile/Profile.svelte"
</script>

<Router>
	<Route path="/" component={Home} />
	<Route path="/home" component={Home} />
	<Route path="/signup" component={Signup} />
	<Route path="/login" component={Login} />
	<Route path="/posts" component={Posts} />
	<PrivateRoute path="/profile" let:location component={Profile}>
	</PrivateRoute>	
	<PrivateRoute path="/matching" let:location component={Matching}>
	</PrivateRoute>	
	<Route path="/*" component={Home} />
</Router>
