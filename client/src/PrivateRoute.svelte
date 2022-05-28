<script>
	import { Route } from "svelte-navigator";
	import PrivateRouteGuard from "./PrivateRouteGuard.svelte";
	export let path;
	export let component;
	
</script>

<Route {path} let:params let:location let:navigate>
	<PrivateRouteGuard component={component}>
		<slot {path} {params} {location} {navigate} />
	</PrivateRouteGuard>
</Route>