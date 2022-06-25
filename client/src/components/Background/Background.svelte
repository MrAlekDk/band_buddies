<script>
    export let url;

</script>
    <div class="bg-image" style="background-image: url({url})"></div>

<style>

    .bg-image{
        position: fixed;
        z-index: 0;
        filter: blur(8px);
        -webkit-filter: blur(8px);
        min-height: 100%;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        width: 100%;
    }
</style>