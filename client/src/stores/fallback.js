import {readable } from "svelte/store";


let matches = [{name: "Placeholder",
lastName: "Placeholder",
matches: [],
birthday: "",
postalcode: 0,
email: "",
artistType: "",
bio: "You have not yet made a bio!"}]

let user = {
    name: "Placeholder",
    lastName: "Placeholder",
    matches: [],
    birthday: "",
    postalcode: 0,
    email: "",
    artistType: "",
    bio: "You have not yet made a bio!",
    likedUsers: [],
    imgLink: "https://scontent-cph2-1.xx.fbcdn.net/v/t39.30808-6/276252571_5326678807356896_716250865442285171_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=D_FS8rxPSEMAX_x6Wpr&_nc_ht=scontent-cph2-1.xx&oh=00_AT-TrDw45ce5vN6MD5hBKW0cbQkiAj9vOKo3v1bvwzyFww&oe=62ABE9E0"
};


export default readable({
    matches : matches,
    user : user
})