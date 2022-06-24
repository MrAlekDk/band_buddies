import { writeable } from "svelte/store";

const messageStore = writable(' ');

const socket = new WebSocket('wss://')


export default {
    subcribe: messageStore.subcribe
}