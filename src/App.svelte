<script lang="ts">
  import svelteLogo from './assets/svelte.svg'
  import viteLogo from '/vite.svg'
  import Timer from './lib/Timer.svelte'
  import { counter } from '$lib/counter'

  let ms = 0;

  let totalS = Math.floor((ms / 1000) % 60);
  let totalM = Math.floor((totalS / 60) % 60);
  let totalH = Math.floor(totalM / 60);

  counter.subscribe(value => {
    ms = value;
    totalS = Math.floor((ms / 1000) % 60);
    totalM = Math.floor((totalS / 60) % 60);
    totalH = Math.floor(totalM / 60);
  });

  let timerName : string = "";
  let timerTime : number = 0;

  let timers : string [] = [];
  let times : number [] = [];

  let items : Timer [] = [];

  const removeTimer = (timer : string) => {
    const index : number = timers.indexOf(timer, 0);
    console.log(timers);
    console.log(times);
    console.log(index);
    timers.splice(index, 1);
    items.splice(index, 1);
    times.splice(index, 1);
    localStorage.removeItem(timer);
    items = items;
    times = times;
    timers = timers;
    console.log(timers);
    console.log(times);
  }

  const addItem = () => {
    timers.push(timerName);
    times.push(0);
    timers = timers;
    console.log(timers);
  }

  const saveData = () => {
    localStorage.clear();
    for(let i : number = 0; i < timers.length; i++) {
      localStorage.setItem(timers[i], "" + items[i].time);
    }
    timers = timers;
  }
  
  const loadData = () => {
    for(var i in localStorage) {
      console.log(i);
      if(i === "length") {
        break;
      }
      timers.push(i);
      let time : string | null = localStorage.getItem(i);
      if(time != null) {
        times.push(parseInt(time));
      } else {
        times.push(0);
      }
    }

    timers = timers;
  }

  const nukeData = () => {
    localStorage.clear();
    timers.length = 0;
    times.length = 0;
    items.length = 0;
    timers = timers;
  }

</script>

<main>
  
  <div class="box">
    <h2 class="title is-2">Work Time Tracker</h2>
    <h2 class="title is-2"><i class="fa-regular fa-clock"></i></h2>
    <br>
    <div class="card">
      <div class="totalTime">
        <h4 class="title is-4">Total time : {totalH} hours, {totalM} minutes, {totalS} seconds</h4>
      </div>
    <input class="input is-info" type="text" placeholder="Task" bind:value={timerName}/><button class="button" on:click={addItem}>
      <i class="fa-solid fa-plus"></i>
    </button>
    </div>
    <div class="timers">
      {#each timers as timer, i}
        <div class="card">
          <Timer bind:this={items[i]} name={timer} ms={times[i]}/>
          <br><button class="button is-warning" on:click={() => removeTimer(timer)}><i class="fa-regular fa-trash-can"></i></button>
        </div>
      {/each}
    </div>
    <button class="button is-primary" on:click={saveData}><i class="fa-solid fa-download"></i></button>
    <button class="button is-primary" on:click={loadData}><i class="fa-solid fa-upload"></i></button>
    <button class="button is-primary" on:click={nukeData}><i class="fa-solid fa-trash"></i></button>
    
  </div>
  
</main>

<style>

</style>
