const lodash = require('lodash');
const prompt = require('prompt-sync')({ sigint: true });

console.log("Welcome to the Amazon fishing Creek. Try to Maximize the value of your fish.");
console.log("You can fish for six hours (till 12:00pm) and can catch up to 10 lbs of fish. \nGood Luck!");
console.log("\n====================================================\n");

let fish = ["Arapaima", "Tambaqui", "Candiru", "Red-bellied Piranha", "Armored Carfish", "Electric Eel", "Pancake Stingray", "Bull Shark", "Payara Vampire Fish", "Tucunaré Peacock Bass"];
let fishy = {}
let caughtFish = [];
let sumValueArray = [];
let sumWeightArray = [];
let fishSumWeight = 0;
let fishSumValue = 0;
let optionp = "";

function fishRandomizer() {
    fishy = {};
    let numFish = Math.floor(Math.random() * 10);
    fishy["Name"] = fish[numFish];
    fishy["Weight"] = Number(Math.random() * 4).toFixed(2);
    fishy["Value"] = Number(Math.random() * 20).toFixed(2);
    return fishy;
}
function catchingFish() {
    return caughtFish.push(fishy);
}
function fishStats() {
    if (caughtFish.length === 0) {
        console.log("0 fish, 0 lbs, $0.00");
    } else {
        sumValueArray = [];
        sumWeightArray = [];
        for (let i = 0; i < caughtFish.length; i++) {
            sumWeightArray.push(Number(caughtFish[i].Weight));
            sumValueArray.push(Number(caughtFish[i].Value));
        }
        let fishCount = caughtFish.length;
        fishSumWeight = lodash.sum(sumWeightArray);
        fishSumValue = lodash.sum(sumValueArray);
        fishSumWeight.toFixed(2);
        fishSumValue.toFixed(2);
        console.log(fishCount + " fish, " + fishSumWeight + " lbs, $" + fishSumValue);
    }
}
function options() {
    optionp = ""
    if (fishSumWeight < 10 && (fishSumWeight + Number(fishy.Weight)) < 10) {
        console.log("Would you like to [C]atch or [R]elease it");
        optionp = prompt(">");
    } else {
        console.log("You are at Capacity my friend");
    }
    return optionp;
}
function catchOrRelease(strings) {
    if (strings === "c") {
        console.log("You chose to catch the fish");
        return catchingFish();
    } else if (strings === "r") {
        console.log("You chose to release the fish. ");
        return;
    } else {
        // console.log("You either chose nothing or error. Default is to release.");
        return;
    }
}
function finalFishStats() {
    sumValueArray = [];
    sumWeightArray = [];
    for (let j = 0; j < caughtFish.length; j++) {
        sumWeightArray.push(Number(caughtFish[j].Weight));
        sumValueArray.push(Number(caughtFish[j].Value));
    }
    fishSumWeight = lodash.sum(sumWeightArray);
    fishSumValue = lodash.sum(sumValueArray);
    console.log("You caught:")
    for (let i = 0; i < caughtFish.length; i++) {
        console.log("* " + caughtFish[i].Name + ", " + caughtFish[i].Weight + " lbs, $" + caughtFish[i].Value);
    }
    console.log("");
    console.log("Total Weight: " + fishSumWeight + " lbs");
    console.log("Total Value: $" + fishSumValue);
}

function fishGame() {
    for (let hours = 0; hours < 6; hours++) {
        console.log("The time is " + (6 + hours) + ":00am. You caught:")

        // Create fish stats
        fishStats();
        // Generate fish Object
        fishRandomizer();

        console.log("You hooked a \'" + fishy.Name + "\' Weighing " + fishy.Weight + " lbs \nValues at $    " + fishy.Value + "\n");

        options();
        catchOrRelease(optionp);
        console.log("========================================");
    }
    console.log("The time is 12:00pm. Times Up!");

    finalFishStats();
}

fishGame();
