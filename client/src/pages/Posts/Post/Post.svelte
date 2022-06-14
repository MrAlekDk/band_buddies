<script>

export let postInfo;
</script>

<div class="post">
    <h2>{postInfo.title}</h2>
    <p>{postInfo.content}</p>
    <p>{postInfo.auther}</p>
    <p>{postInfo.date}</p>
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
    }
</style>