<script>
let buttonProps = {
	class:[$$restProps.class]
	}

export let buttonText;
export let buttonId;
export let butDisabled;
</script>

<button class="button" id={buttonId} style="vertical-align:middle" disabled={butDisabled}  >
			<slot/>
            <span id={buttonId} on:click
            {...buttonProps}>{buttonText}</span>
	</button>


<style>
.button {
    border-radius: 4px;
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0, 0.4); 
  color: white;
  border: 3px solid #f1f1f1;
  text-align: center;
  font-size: 20px;
  align-self: center;
  transition: all 0.5s;
  cursor: pointer;
  margin: 5px;
  min-width: 75%;
  max-width: 80%;
  z-index: 5;
}

.button span {
  width: 90%;
  cursor: pointer;
  display: inline-block;
  position: relative;
  transition: 0.5s;
}

.button span:after {
  content: '\00bb';
  position: absolute;
  opacity: 0;
  top: 0;
  right: -20px;
  transition: 0.5s;
}

.button:hover span {
  padding-right: 25px;
}

.button:hover span:after {
  opacity: 1;
  right: 0;
}
</style>