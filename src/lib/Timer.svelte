<svelte:options accessors/>
<script lang="ts">
  

  export let name : string;
  export let ms : number;
  export let totalTime : number;

  
  let startMs : number = ms;
  let currentMs : number = ms;
  let started : boolean = false;
  let hasTime : boolean = (ms != 0);
  let btnString : string = "Start";
  let currentHours : number = Math.floor(currentMs / 1000 / 60 / 60) % 12;
  let currentMins : number = Math.floor(currentMs / 1000 / 60) % 60;
  let currentSecs : number = Math.floor(currentMs / 1000) % 60;
  let buttonStyle : string = "button is-primary";
  let hourglass : string = "fa-solid fa-hourglass-start";

  console.log(currentSecs);


  const start = () => {
    if(started) {
      let deltaMs : number = Date.now() - startMs;
      currentMs += deltaMs;
      totalTime += deltaMs;

      started = false;
      buttonStyle = "button is-primary";
      currentHours = Math.floor(currentMs / 1000 / 60 / 60) % 12;
      currentMins = Math.floor(currentMs / 1000 / 60) % 60;
      currentSecs = Math.floor(currentMs / 1000) % 60;

      hasTime = true;
      hourglass = "fa-solid fa-hourglass-end";
      btnString = "Start";
      ms = currentMs;
    } else {
      btnString = "Stop";
      startMs = Date.now();
      started = true;
      buttonStyle = "button is-warning";
      hourglass = "fa-solid fa-hourglass-half";
    }
  }

  const reset = () => {
    currentMs = 0;
    startMs = Date.now();
    started = !started;
    start();
  }

</script>
<div class="Timer">
  <h5 class="subtitle is-5">Tracking {name}</h5>
  <button class={buttonStyle} on:click={start}>
    {btnString}<i class={hourglass}></i>
  </button>
  <br><br>
  {#if hasTime}
    <h6 class="subtitle is-6">{currentHours} Hours, {currentMins} Minutes, {currentSecs} Seconds</h6>
    <button class="button is-warning" on:click={reset}><i class="fa-solid fa-clock-rotate-left"></i></button>

  {/if}
</div>
