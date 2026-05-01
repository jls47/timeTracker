<svelte:options accessors/>
<script lang="ts">
  

  export let hours : number;
  export let minutes : number;
  export let seconds : number;

  
</script>

<div class="totalTime">
    <h4 class="title is-4">Total time : {hours} hours, {minutes} minutes, {seconds} seconds</h4>
</div>