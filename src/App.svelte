<script lang="ts">
  import svelteLogo from './assets/svelte.svg'
  import viteLogo from '/vite.svg'
  import Timer from './lib/Timer.svelte'
  import TotalTime from './lib/TotalTime.svelte'
  import { getContext, setContext } from 'svelte';



  
  let ms = 0;

  let totalS = Math.floor((ms / 1000) % 60);
  let totalM = Math.floor((totalS / 60) % 60);
  let totalH = Math.floor(totalM / 60);

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

  const addExistingTimer = (name: string, ms : number) => {
    timers.push(name);
    times.push(ms);
    console.log(ms);
    timers = timers;
    times = times;
    console.log(times);
  }

  const saveData = () => {
    localStorage.clear();
    for(let i : number = 0; i < timers.length; i++) {
      localStorage.setItem(timers[i], "" + items[i].ms);
      console.log(timers[i] + "," + items[i].ms);
      console.log(localStorage.getItem(timers[i]));
    }
    console.log(localStorage);
    
    console.log(items);
    timers = timers;
    times = times;
  }
  
  const loadData = () => {
    console.log(localStorage);
    let index = 0;
    removeAll();
    
    for(var i in localStorage) {
      if(i === "length") {
        break;
      }
      console.log(i);
      console.log(localStorage.getItem(i));
      let time : string | null = localStorage.getItem(i);
      console.log(time);
      let newMs = 0;
      if(time != null) {
        newMs = parseInt(time, 10);
        ms += newMs;
      }
      console.log(newMs);
      addExistingTimer(i, newMs);
    }
    
    console.log(timers);
    console.log(times);
    console.log(items);
  }

  const nukeData = () => {
    localStorage.clear();
    removeAll();
  }

  const removeAll = () => {

    timers.length = 0;
    times.length = 0;
    items.length = 0;
    timers = []; 
    items = [];
    ms = 0;
  }

  const updateTimer = () => {
    console.log("Updating " + ms);
    totalS = Math.floor((ms / 1000) % 60);
    totalM = Math.floor((totalS / 60) % 60);
    totalH = Math.floor(totalM / 60);
  }

  loadData();

  $: ms, updateTimer()
  $: times, updateTimer()

</script>

<main>
  
  <div class="box">
    <h2 class="title is-2">Work Time Tracker</h2>
    <h2 class="title is-2"><i class="fa-regular fa-clock"></i></h2>
    <br>
    <div class="card">
    <TotalTime bind:hours={totalH} minutes={totalM} seconds={totalS}/>
      <!--<div class="totalTime">
        <h4 class="title is-4">Total time : {totalH} hours, {totalM} minutes, {totalS} seconds</h4>
      </div>-->
    <input class="input is-info" type="text" placeholder="Task" bind:value={timerName}/><button class="button" on:click={addItem}>
      <i class="fa-solid fa-plus"></i>
    </button>
    </div>
    <div class="timers">
      {#each timers as timer, i}
        <div class="card">
          <Timer bind:this={items[i]} name={timers[i]} ms={times[i]} totalTime={ms}/>
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
