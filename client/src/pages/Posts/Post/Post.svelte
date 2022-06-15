<script>

export let postInfo;
</script>

<div class="post">
    <h2>{postInfo.title}</h2>
    <div class="meta">
        <p>Posted by {postInfo.auther} {postInfo.date}</p>
    </div>
    <p>{postInfo.content}</p>
</div>
<style>
    .post{
        background-color: #FF3CAC;
        background-image: linear-gradient(225deg, #FF3CAC 0%, #784BA0 50%, #2B86C5 100%);
        border: 3px solid #f1f1f1;
        min-width: 30%;
        min-height: 50px;
        text-align: center;
        width: 30%;
        margin: 2%;
        border-radius: 2%;
        text-shadow: 2px 2px 4px #000000;
    }

    h2{
        margin-bottom: 0;
        text-decoration:underline;
    }

    .meta{
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        margin-top: 0;
    }

    .meta p{
        margin-top: 0;
        font-style: italic;
    }
</style>