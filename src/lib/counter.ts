//@ts-nocheck
import { writable } from 'svelte/store';

const createCounter = (count: number) => {

    //keep track of subscribers
    const subscribers : any = new Set();
    //add subscribers

    const subscribe = (subscriber : any) => {
        subscribers.add(subscriber);
    }
    //notify subscribers on update
    const update = (updater : any) => {
        set(updater(count));
    }

    const set = (newValue: number) => {
        count = newValue;
        subscribers.forEach((subscriber) => subscriber(count));
    }
    
    return { subscribe, update, set };
}

export const counter = createCounter(0);