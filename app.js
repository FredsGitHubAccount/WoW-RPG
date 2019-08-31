
// Global Variables
let attacker = ""
let defender = ""
let attackerChosen = false
let defenderChosen = false
let enemyArray = [];
let audio;



let playerAP;
let playerHP;
let heroName;
let enemyHP;
let enemyCA;

let heroes = [{

        name: "Illidan Stormrage",
        attack: 65,
        counterAttack: 15,
        hp: 305,
        img: "./assets/images/illidanimg.png",
        sound: "./assets/sounds/illi.mp3"

}, {

        name: "Sylvanas Windrunner",
        attack: 55,
        counterAttack: 20,
        hp: 275,
        img: "./assets/images/sylvanasimg.png",
        sound: "./assets/sounds/sylvanasaudio.mp3",


},
{

        name: "Arthas Menethil",
        attack: 40,
        counterAttack: 15,
        hp: 375,
        img: "./assets/images/arthas.png",
        sound: "./assets/sounds/lichaudio.mp3",



},
{

        name: "Kael'Thas Sunstrider",
        attack: 105,
        counterAttack: 40,
        hp: 155,
        img: "./assets/images/kaelimg.png",
        sound: "./assets/sounds/kaelaudio.mp3",


},

]
// display heroes & assign them attributes
function renderHeroes() {
        for (let i = 0; i < heroes.length; i++) {
                let chooseCharacter = $("<div class='character-choice animated fadeIn'>")
                chooseCharacter.append(`<h2>${heroes[i].name}</h2><h3 class="atkdyn"> Attack : ${heroes[i].attack}</h3><h3 class="hpdyn">HP : ${heroes[i].hp}</h3> <img src=${heroes[i].img}>`)
                chooseCharacter.attr("name", heroes[i].name)
                chooseCharacter.attr("attack", heroes[i].attack)
                chooseCharacter.attr("counterattack", heroes[i].counterAttack)
                chooseCharacter.attr("hp", heroes[i].hp)
                chooseCharacter.attr("sound",heroes[i].sound)
                chooseCharacter.attr("list", i)
              
                $("#available-characters").append(chooseCharacter)
        }
}
// Select your character
$(document).on("click", ".character-choice", function () {

        if (!attackerChosen) {
                $("#available-characters").empty()
                attacker = this
                playerHP = $(attacker).attr("hp")
                playerAP = $(attacker).attr("attack")
                $("#attacking-character").append(attacker)
                console.log(`My player HP is ` + playerHP)
                console.log(`My Player Attack is ` + playerAP)
                heroes.splice($(attacker).attr("list"), 1)
                attackerChosen = true;
                audio = new Audio($(attacker).attr("sound"))
                audio.play()
                $("#instructions").empty()
                $("#instructions").append(`<h1 class="animated fadeIn">You Have Chosen ${$(this).attr("name")} </h1>`)
                $("#instructions").append(`<h2 class="animated fadeIn reddirection">Select Your Enemy</h2>`)
                



                for (let i = 0; i < heroes.length; i++) {
                        let enemyCharacter = $("<div class='enemy-choice animated fadeIn'>")
                        enemyCharacter.append(`<h2>${heroes[i].name}</h2><h3> Counterattack : ${heroes[i].counterAttack}</h3><h3 class=enemyhpdyn${i}>HP : ${heroes[i].hp}</h3> <img src=${heroes[i].img}>`)
                        enemyCharacter.attr("name", heroes[i].name)
                        enemyCharacter.attr("attack", heroes[i].attack)
                        enemyCharacter.attr("counterattack", heroes[i].counterAttack)
                        enemyCharacter.attr("hp", heroes[i].hp)
                        enemyCharacter.attr("sound",heroes[i].sound)
                        enemyCharacter.attr("list", i)
                        enemyArray.push(heroes[i])
                     
                        $("#enemy-characters").append(enemyCharacter)

                }
                console.log(enemyArray)

        }



})

// Select a new enemy
$(document).on("click", ".enemy-choice", function () {

        if (!defenderChosen) {

                defender = this
                defenderChosen = true;
                enemyHP = $(defender).attr("hp")
                console.log(`The Enemy HP is ` + enemyHP)
                enemyCA = $(defender).attr("counterattack")
                console.log(`The Enemy Counter Attack is ` + enemyCA)
                $("#defending-character").append(defender)
                audio = new Audio($(defender).attr("sound"))
                audio.play()
        }

        else {
                alert("You've already selected your enemy")
                return
        }

        if ((defenderChosen) && (attackerChosen)) {

                let attackButton = $("<div id='commence-battle'>")
                attackButton.append('<img src="./assets/images/combat.png" class="swords">')
                $("#button-here").html(attackButton)
                $("#instructions").empty();
                $("#instructions").append(`<h1>Your Chosen Enemy is ${$(defender).attr("name")} </h1>`)
                $("#instructions").append(`<h1>Click The Swords To Attack</h1>`)
                // $("enemy-").css("width","");

             
        }

})


$(document).on("click", "#commence-battle", function () {

        let id = $(defender).attr("list")

        enemyHP = enemyHP - playerAP
        playerHP = playerHP - enemyCA
        $(".atkdyn").html(`Attack : ${playerAP}`)
        $(".hpdyn").html(`HP : ${playerHP}`)
        $(`.enemyhpdyn${id}`).html(`HP : ${enemyHP}`)

        $("#instructions").empty()
        $("#instructions").append(`<h1 class="animated fadeIn">You have attacked ${$(defender).attr("name")} for ${playerAP} damage!`)
        $("#instructions").append(`<h1 class="animated fadeIn">${$(defender).attr("name")} has counter attacked for ${enemyCA}!`)
        audio = new Audio(`./assets/sounds/combatsound.mp3`)
        audio.play()




        if (playerHP < 1){
                $("#instructions").html(`<h1 class="animated fadeIn"> You Have Faught Nobly & Lost.  We Will Return You To The Main Menu Shortly`)
                $("#button-here").empty();
                setTimeout(resetGame,10000)
        }

        else if (enemyHP < 1) {
                $("#instructions").empty()
                $("#instructions").append(`<h1 class="animated fadeIn">You Have Defeated ${$(defender).attr("name")}! Your Attack Has Increased!</h1>`);
                $("#instructions").append(`<h1 class="animated fadeIn">Select Another Enemy To Fight!</h1>`)
                enemyArray.splice($(this).attr("list"), 1);
                defenderChosen = false;
                console.log(enemyArray);
                $("#defending-character").empty();
                $("#button-here").empty();
                gameOverCheck();
                
                playerAP = (parseInt(playerAP) + 30)
                $(".atkdyn").html(`Attack : ${playerAP}`)
                console.log(playerAP)
               
         
        }

  

})

function gameOverCheck() {
        if(enemyArray.length < 1){
                $("#instructions").empty();
                $("#instructions").append(`<h1 class="animated fadeIn">You Have Defeated All The Enemies!</h1>`);
                $("#instructions").append(`<h1 class="animated fadeIn">You Truly Are Azeroth's Finest Defender!</h1>`)
                $("#instructions").append(`<h1 class="animated fadeIn">We Will Return You To The Main Menu Shortly!</h1>`)
            
                $("#combat-container").css("grid-template-columns","1fr");
                setTimeout(resetGame,10000)
               
        }

}

function resetGame() {
attacker = "";
defender = "";
attackerChosen = false;
defenderChosen = false;
enemyArray = [];
enemyHP = ""
heroes = [{

        name: "Illidan Stormrage",
        attack: 65,
        counterAttack: 15,
        hp: 305,
        img: "./assets/images/illidanimg.png",
        sound: "./assets/sounds/illi.mp3"

}, {

        name: "Sylvanas Windrunner",
        attack: 55,
        counterAttack: 20,
        hp: 275,
        img: "./assets/images/sylvanasimg.png",
        sound: "./assets/sounds/sylvanasaudio.mp3",


},
{

        name: "Arthas Menethil",
        attack: 40,
        counterAttack: 15,
        hp: 375,
        img: "./assets/images/arthas.png",
        sound: "./assets/sounds/lichaudio.mp3",



},
{

        name: "Kael'Thas Sunstrider",
        attack: 105,
        counterAttack: 40,
        hp: 155,
        img: "./assets/images/kaelimg.png",
        sound: "./assets/sounds/kaelaudio.mp3",


},

]

$("#attacking-character").empty();
$("#defending-character").empty();
$("#enemy-characters").empty();
$("#available-characters").empty();
$("#button-here").empty();
$("#instructions").empty();
$("#instructions").append(`<img class="wc4img" src="assets/images/wc4.png">`)
$("#instructions").append(`<h1 class="animated fadeIn">Select Your Hero & Defeat The Remaining Heroes`)
renderHeroes();

}


// Called Function
renderHeroes()

// 1. Display 4 characters that can be chosen as your attacker.

// 2. Once you have selected your character, move your character to the attacker section. All other characters will be moved to the enemy characters section

// 3. Click on an enemy character to fight & move that enemy to the defender section.

// 3. Combat phase begins and attacking character must defeat defending character by reducing their HP to 0.

// 4. If the enemy is defeated, the character can choose another enemy to fight without regaining their HP.

// 5.  If all enemies are defeated, run a victory screen.  

// 6. If your HP = 0, you are defeated.  









