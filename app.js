
// Global Variables
let attacker = ""
let defender = ""
let attackerChosen = false
let defenderChosen = false
let enemyArray = [];

let playerAP;
let playerHP;
let enemyHP;
let enemyCA;

let heroes = [{

        name: "Illidan Stormrage",
        attack: 105,
        counterAttack: 15,
        hp: 225,

}, {

        name: "Sylvanas Windrunner",
        attack: 35,
        counterAttack: 15,
        hp: 205,

},
{

        name: "Arthas",
        attack: 35,
        counterAttack: 15,
        hp: 275,

},
{

        name: "Kael'Thas",
        attack: 85,
        counterAttack: 15,
        hp: 185,

},

]
// display heroes & assign them attributes
function renderHeroes() {
        for (let i = 0; i < heroes.length; i++) {
                let chooseCharacter = $("<div class='character-choice'>")
                chooseCharacter.append(`<h2>${heroes[i].name}</h2><h3> Attack : ${heroes[i].attack}</h3><h3>HP : ${heroes[i].hp}</h3>`)
                chooseCharacter.attr("name", heroes[i].name)
                chooseCharacter.attr("attack", heroes[i].attack)
                chooseCharacter.attr("counterattack", heroes[i].counterAttack)
                chooseCharacter.attr("hp", heroes[i].hp)
                chooseCharacter.attr("list", i)
                $("#available-characters").append(chooseCharacter)
        }
}
// Select your character
$(document).on("click", ".character-choice", function () {

        if (!attackerChosen) {
                $("#available-characters").empty()
                $("#attacking-character-here").append(this)
                attacker = this
                playerHP = $(attacker).attr("hp")
                playerAP = $(attacker).attr("attack")
                console.log(`My player HP is ` + playerHP)
                console.log(`My Player Attack is ` + playerAP)
                heroes.splice($(this).attr("list"), 1)
                attackerChosen = true;



                for (let i = 0; i < heroes.length; i++) {
                        let enemyCharacter = $("<div class='enemy-choice'>")
                        enemyCharacter.append(`<h2>${heroes[i].name}</h2>`)
                        enemyCharacter.attr("name", heroes[i].name)
                        enemyCharacter.attr("attack", heroes[i].attack)
                        enemyCharacter.attr("counterattack", heroes[i].counterAttack)
                        enemyCharacter.attr("hp", heroes[i].hp)
                        enemyCharacter.attr("list", i)
                        enemyArray.push(heroes[i])
                     
                        $("#enemy-characters-here").append(enemyCharacter)

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
                $("#defending-character-here").append(this)

        }

        else {
                alert("You've already selected your enemy")
                return
        }

        if ((defenderChosen) && (attackerChosen)) {

                let attackButton = $("<button id='commence-battle'>")
                attackButton.text("Attack Here!")
                $("#button-here").html(attackButton)

        }

})


$(document).on("click", "#commence-battle", function () {


        enemyHP = enemyHP - playerAP
        playerHP = playerHP - enemyCA

        console.log(`The enemy HP is ` + enemyHP)
        console.log(`My HP is ` + playerHP)


        if (enemyHP < 1) {
                alert(`You have defeated ${$(defender).attr("name")}`);
                enemyArray.splice($(this).attr("list"), 1);
                defenderChosen = false;
                console.log(enemyArray);
                $("#defending-character-here").empty();
                $("#button-here").empty();
                gameOverCheck();
                playerAP = (parseInt(playerAP) + 30)
                console.log(playerAP)
               
         
        }

        else if (playerHP < 1){
                alert("you have lost")
                resetGame()
        }



})

function gameOverCheck() {
        if(enemyArray.length < 1){
                alert("Victory");
                resetGame();
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
        attack: 105,
        counterAttack: 15,
        hp: 225,

}, {

        name: "Sylvanas Windrunner",
        attack: 35,
        counterAttack: 25,
        hp: 205,

},
{

        name: "Arthas",
        attack: 35,
        counterAttack: 15,
        hp: 275,

},
{

        name: "Kael'Thas",
        attack: 85,
        counterAttack: 15,
        hp: 185,

},

]

$("#attacking-character-here").empty();
$("#defending-character-here").empty();
$("#enemy-characters-here").empty();
$("#available-characters").text("Available Characters");
$("#button-here").empty();
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









