<script lang="ts">
  export let name;
  export let ms;
  
  let count: number = 0;
  let startMs : number = 0;
  let currentMs : number = ms;
  let started : boolean = false;
  let hasTime : boolean = false;
  let btnString : string = "Start";
  let currentHours : number = 0;
  let currentMins : number = 0;
  let currentSecs : number = 0;
  let buttonStyle : string = "button is-primary";
  let hourglass : string = "fa-solid fa-hourglass-start";

  const start = () => {
    if(started) {
      currentMs += Date.now() - startMs;
      started = false;
      buttonStyle = "button is-primary";
      currentHours = Math.floor(currentMs / 1000 / 60 / 60) % 12;
      currentMins = Math.floor(currentMs / 1000 / 60) % 60;
      currentSecs = Math.floor(currentMs / 1000) % 60;

      hasTime = true;
      hourglass = "fa-solid fa-hourglass-end";
      btnString = "Start";
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
  export const time = currentMs;

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
