
// <editor-fold desc="IMPORTS">

import common = require("./lib/common");
import setPositions = require("./lib/setPositions");
import setVariables = require("./lib/setVariables");
import playerMovement = require("./lib/playerMovement");
import {ITeam} from './models/team.model';
import {IPlayer} from './models/player.model';
import {ISkills} from './models/skill.model';
import {IPitch} from './models/pitch.model';
import fs = require('fs');
import async = require("async");
import set = Reflect.set;
import {Validate} from "./lib/validate";


// </editor-fold>

export class MatchEngine{

    private readonly roleGoalKeeper = 'GK';
    private readonly roleLeftBack = 'LB';
    private readonly roleCenterBack = 'CB';
    private readonly roleRightBack = 'RB';
    private readonly roleLeftMidfielder = 'LM';
    private readonly roleRightMidfielder = 'RM';
    private readonly roleCenterMidfielder = 'CM';
    private readonly roleStriker = 'ST';

    private readonly startingPositionPlayer1 = [60,0]; // Goalkeeper
    private readonly startingPositionPlayer2 = [30,20]; // LB
    private readonly startingPositionPlayer3 = [50,20]; // CB1
    private readonly startingPositionPlayer4 = [70,20]; // CB2
    private readonly startingPositionPlayer5 = [90,20]; // RB
    private readonly startingPositionPlayer6 = [30,120]; // LM
    private readonly startingPositionPlayer7 = [50,120]; // CM1
    private readonly startingPositionPlayer8 = [70,120]; // CM2
    private readonly startingPositionPlayer9 = [90,120]; // RM
    private readonly startingPositionPlayer10 = [50,270]; // ST1
    private readonly startingPositionPlayer11 = [70,270]; // St2

    private thePitch : IPitch;
    private teamA : ITeam;
    private teamB: ITeam;






    constructor() {

    }

    public start() {
        const teamA = this.createTeam('Arsneal', 'Kareem Glover');
        const teamB = this.createTeam('Manchester', 'James Monroe');
        const pitch = MatchEngine.createPitch(120, 600);


        this.initiateGame(teamA, teamB, pitch);

    }

    // <editor-fold desc="Private Methods">

    private initiateGame(_team1: ITeam, _team2: ITeam, _pitch: IPitch)
    {
        let validate : Validate = new Validate();
        let kickOffTeam : any;

       Promise.all([
           validate.validateArguments(_team1, _team2, _pitch),
           validate.validateTeam(_team1),
           validate.validateTeam(_team2),
           validate.validatePitch(_pitch),
       ]).then(()=>{

        }).catch();



    }

    /**
     * Create pitch
     * @param _width
     * @param _height
     * @returns {IPitch}
     */
    private static createPitch(_width, _height)
    {
        let pitch : IPitch = {};

        pitch.pitchWidth = _width;
        pitch.pitchHeight = _height;

        return pitch;
    }

    /**
     * Creates team
     * @param {string} _teamName
     * @param {string} _teamManager
     * @returns {ITeam}
     */
    private createTeam(_teamName: string, _teamManager: string) {
        let theTeam : ITeam = {};
        let player : IPlayer = {};

        theTeam.name = _teamName;
        theTeam.manager = _teamManager;
        theTeam.players = [player];
        theTeam.players[0] = MatchEngine.createPlayer(MatchEngine.createPlayerName() , this.roleGoalKeeper, this.startingPositionPlayer1);
        theTeam.players[1] = MatchEngine.createPlayer(MatchEngine.createPlayerName() , this.roleLeftBack, this.startingPositionPlayer2);
        theTeam.players[2] = MatchEngine.createPlayer(MatchEngine.createPlayerName() , this.roleCenterBack, this.startingPositionPlayer3);
        theTeam.players[3] = MatchEngine.createPlayer(MatchEngine.createPlayerName() , this.roleCenterBack, this.startingPositionPlayer4);
        theTeam.players[4] = MatchEngine.createPlayer(MatchEngine.createPlayerName() , this.roleRightBack, this.startingPositionPlayer5);
        theTeam.players[5] = MatchEngine.createPlayer(MatchEngine.createPlayerName() , this.roleLeftMidfielder, this.startingPositionPlayer6);
        theTeam.players[6] = MatchEngine.createPlayer(MatchEngine.createPlayerName() , this.roleCenterMidfielder, this.startingPositionPlayer7);
        theTeam.players[7] = MatchEngine.createPlayer(MatchEngine.createPlayerName() , this.roleCenterMidfielder, this.startingPositionPlayer8);
        theTeam.players[8] = MatchEngine.createPlayer(MatchEngine.createPlayerName() , this.roleRightMidfielder, this.startingPositionPlayer9);
        theTeam.players[9] = MatchEngine.createPlayer(MatchEngine.createPlayerName() , this.roleStriker, this.startingPositionPlayer10);
        theTeam.players[10] = MatchEngine.createPlayer(MatchEngine.createPlayerName() , this.roleStriker, this.startingPositionPlayer11);

        return theTeam;
    }

    /**
     * Creates random player name
     * @returns {string}
     */
    private static createPlayerName()
    {
        const firstNames = ['Kareem', 'Rahed', 'Raishad', 'Darius', 'Jack', 'Fred', 'Mason', 'Cory', 'Brooke'];
        const lastNames = ['Glover', 'Ahemd', 'Noemas', 'Grighekk', 'Sophandka', 'Del Ne Yo', 'Johnson'];

        let firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        let sirName = lastNames[Math.floor(Math.random() * lastNames.length)];

        return (firstName + ' ' + sirName);

    }

    /**
     * Creates random Player
     * @param {string} _playerName
     * @param {string} _role
     * @param _startingPos
     * @returns {IPlayer}
     */
    private static createPlayer(_playerName: string, _role: string, _startingPos) {
        let thePlayer : IPlayer = {};
        let skill : ISkills = {};

        thePlayer.skill = skill;
        thePlayer.name = _playerName;
        thePlayer.injured = false;
        thePlayer.position = _role;
        thePlayer.startPOS = _startingPos;
        thePlayer.skill.agility = MatchEngine.getRandom(0,99);
        thePlayer.skill.jumping = MatchEngine.getRandom(0,99);
        thePlayer.skill.passing = MatchEngine.getRandom(0,99);
        thePlayer.skill.saving = MatchEngine.getRandom(0,99);
        thePlayer.skill.penalty_taking = MatchEngine.getRandom(0,99);
        thePlayer.skill.shooting = MatchEngine.getRandom(0,99);
        thePlayer.skill.tackling = MatchEngine.getRandom(0,99);
        thePlayer.skill.strength = MatchEngine.getRandom(0,99);
        thePlayer.rating = MatchEngine.getRating(thePlayer.skill);

        return thePlayer;
    }

    /**
     * Returns random number within range
     * @param {number} _min
     * @param {number} _max
     * @returns {number}
     */
    private static getRandom(_min: number, _max: number) {
        return Math.floor(Math.random() * (_max - _min + 1)) + _min;
    }

    /**
     * Gets average rating of player skills.
     * @param {ISkills} _skill
     * @returns {number}
     */
    private static getRating(_skill: ISkills ) {
        let rating: number;

        rating = (_skill.tackling + _skill.shooting + _skill.penalty_taking + _skill.agility +
            _skill.jumping + _skill.saving + _skill.strength + _skill.passing ) / 8

        return rating;
    }

// </editor-fold>


}

//------------------------
//    Functions
//------------------------

/*
let ran = false;

exports.helloWorld = (req, res) => {
	//const team1 = req.body.team1;
	//const team2 = req.body.team2;
	//const pitchDetails = req.body.pitchDetails;


    const GoalKeeper ='GK';
    const LeftBack = 'LB';
    const CenterBack = 'CB';
    const RightBack = 'RB';
    const LeftMidfielder = 'LM';
    const RightMidfielder = 'RM';
    const CenterMidfielder = 'CM';
    const Striker = 'ST';

    const GKPos = [60,0];
    const LBPos = [30,20];
    const CB1Pos = [50, 20];
    const CB2Pos = [70, 20];
    const RBPos = [ 90,20];
    const LMPos = [30, 120];
    const CM1Pos = [50, 120];
    const CM2Pos = [70, 120];
    const RMPos = [90,120];
    const STPos = [50, 270];
    const ST2Pos = [70,270];



	const ThePitch = {
	    "pitchWidth": 120,
        "pitchHeight": 600 }

	const Team1 = {
		"name" : "Knightdale FC",
		"players": [{
			"name" : "GK James Joe",
			"position" : GoalKeeper,
			"rating" : getRandomInt(0,99).toString(),
			"skill" : {
				"passing" : getRandomInt(0,99).toString(),
				"shooting" : getRandomInt(0,99).toString(),
                "tackling": getRandomInt(0,99).toString(),
                "saving": getRandomInt(0,99).toString(),
                "agility": getRandomInt(0,99).toString(),
                "strength": getRandomInt(0,99).toString(),
                "penalty_taking": getRandomInt(0,99).toString(),
                "jumping": getRandomInt(10,300).toString()
			},
			"startPOS": GKPos,
			"injured": false,
			},
            {
                "name" : "LB Jack Green",
                "position" : LeftBack,
                "rating" : getRandomInt(0,99).toString(),
                "skill" : {
                    "passing" : getRandomInt(0,99).toString(),
                    "shooting" : getRandomInt(0,99).toString(),
                    "tackling": getRandomInt(0,99).toString(),
                    "saving": getRandomInt(0,99).toString(),
                    "agility": getRandomInt(0,99).toString(),
                    "strength": getRandomInt(0,99).toString(),
                    "penalty_taking": getRandomInt(0,99).toString(),
                    "jumping": getRandomInt(10,300).toString()
                },
                "startPOS": LBPos,
                "injured": false,
            },
            {
                "name" : "CB` Sedge Seymore",
                "position" : CenterBack,
                "rating" : getRandomInt(0,99).toString(),
                "skill" : {
                    "passing" : getRandomInt(0,99).toString(),
                    "shooting" : getRandomInt(0,99).toString(),
                    "tackling": getRandomInt(0,99).toString(),
                    "saving": getRandomInt(0,99).toString(),
                    "agility": getRandomInt(0,99).toString(),
                    "strength": getRandomInt(0,99).toString(),
                    "penalty_taking": getRandomInt(0,99).toString(),
                    "jumping": getRandomInt(10,300).toString()
                },
                "startPOS": CB1Pos,
                "injured": false,
            },
            {
                "name" : "CB2 Malcomn Fridge",
                "position" : CenterBack,
                "rating" : getRandomInt(0,99).toString(),
                "skill" : {
                    "passing" : getRandomInt(0,99).toString(),
                    "shooting" : getRandomInt(0,99).toString(),
                    "tackling": getRandomInt(0,99).toString(),
                    "saving": getRandomInt(0,99).toString(),
                    "agility": getRandomInt(0,99).toString(),
                    "strength": getRandomInt(0,99).toString(),
                    "penalty_taking": getRandomInt(0,99).toString(),
                    "jumping": getRandomInt(10,300).toString()
                },
                "startPOS": CB2Pos,
                "injured": false,
            },
            {
                "name" : "RB Frank Hussel",
                "position" : RightBack,
                "rating" : getRandomInt(0,99).toString(),
                "skill" : {
                    "passing" : getRandomInt(0,99).toString(),
                    "shooting" : getRandomInt(0,99).toString(),
                    "tackling": getRandomInt(0,99).toString(),
                    "saving": getRandomInt(0,99).toString(),
                    "agility": getRandomInt(0,99).toString(),
                    "strength": getRandomInt(0,99).toString(),
                    "penalty_taking": getRandomInt(0,99).toString(),
                    "jumping": getRandomInt(10,300).toString()
                },
                "startPOS": RBPos,
                "injured": false,
            },
            {
                "name" : "CM Hasti Klask",
                "position" : CenterMidfielder,
                "rating" : getRandomInt(0,99).toString(),
                "skill" : {
                    "passing" : getRandomInt(0,99).toString(),
                    "shooting" : getRandomInt(0,99).toString(),
                    "tackling": getRandomInt(0,99).toString(),
                    "saving": getRandomInt(0,99).toString(),
                    "agility": getRandomInt(0,99).toString(),
                    "strength": getRandomInt(0,99).toString(),
                    "penalty_taking": getRandomInt(0,99).toString(),
                    "jumping": getRandomInt(10,300).toString()
                },
                "startPOS": CM1Pos,
                "injured": false,
            },
            {
                "name" : "Cm2 Gii Jaks",
                "position" : CenterMidfielder,
                "rating" : getRandomInt(0,99).toString(),
                "skill" : {
                    "passing" : getRandomInt(0,99).toString(),
                    "shooting" : getRandomInt(0,99).toString(),
                    "tackling": getRandomInt(0,99).toString(),
                    "saving": getRandomInt(0,99).toString(),
                    "agility": getRandomInt(0,99).toString(),
                    "strength": getRandomInt(0,99).toString(),
                    "penalty_taking": getRandomInt(0,99).toString(),
                    "jumping": getRandomInt(10,300).toString()
                },
                "startPOS": CM2Pos,
                "injured": false,
            },
            {
                "name" : "RM Hoho Mason",
                "position" : RightMidfielder,
                "rating" : getRandomInt(0,99).toString(),
                "skill" : {
                    "passing" : getRandomInt(0,99).toString(),
                    "shooting" : getRandomInt(0,99).toString(),
                    "tackling": getRandomInt(0,99).toString(),
                    "saving": getRandomInt(0,99).toString(),
                    "agility": getRandomInt(0,99).toString(),
                    "strength": getRandomInt(0,99).toString(),
                    "penalty_taking": getRandomInt(0,99).toString(),
                    "jumping": getRandomInt(10,300).toString()
                },
                "startPOS": RMPos,
                "injured": false,
            },
            {
                "name" : "LM Babd Bajsk",
                "position" : LeftMidfielder,
                "rating" : getRandomInt(0,99).toString(),
                "skill" : {
                    "passing" : getRandomInt(0,99).toString(),
                    "shooting" : getRandomInt(0,99).toString(),
                    "tackling": getRandomInt(0,99).toString(),
                    "saving": getRandomInt(0,99).toString(),
                    "agility": getRandomInt(0,99).toString(),
                    "strength": getRandomInt(0,99).toString(),
                    "penalty_taking": getRandomInt(0,99).toString(),
                    "jumping": getRandomInt(10,300).toString()
                },
                "startPOS": LMPos,
                "injured": false,
            },
            {
                "name" : "St1Flash Dask",
                "position" : Striker,
                "rating" : getRandomInt(0,99).toString(),
                "skill" : {
                    "passing" : getRandomInt(0,99).toString(),
                    "shooting" : getRandomInt(0,99).toString(),
                    "tackling": getRandomInt(0,99).toString(),
                    "saving": getRandomInt(0,99).toString(),
                    "agility": getRandomInt(0,99).toString(),
                    "strength": getRandomInt(0,99).toString(),
                    "penalty_taking": getRandomInt(0,99).toString(),
                    "jumping": getRandomInt(10,300).toString()
                },
                "startPOS": STPos,
                "injured": false,
            },
            {
                "name" : "ST2 Joesphn Jones",
                "position" : Striker,
                "rating" : getRandomInt(0,99).toString(),
                "skill" : {
                    "passing" : getRandomInt(0,99).toString(),
                    "shooting" : getRandomInt(0,99).toString(),
                    "tackling": getRandomInt(0,99).toString(),
                    "saving": getRandomInt(0,99).toString(),
                    "agility": getRandomInt(0,99).toString(),
                    "strength": getRandomInt(0,99).toString(),
                    "penalty_taking": getRandomInt(0,99).toString(),
                    "jumping": getRandomInt(10,300).toString()
                },
                "startPOS": ST2Pos,
                "injured": false,
            }],
		"manager" : "Adien"
	}


    const Team2 = {
        "name" : "Raleigh FC",
        "players": [{
            "name" : "GK Aido Dashs",
            "position" : GoalKeeper,
            "rating" : getRandomInt(0,99).toString(),
            "skill" : {
                "passing" : getRandomInt(0,99).toString(),
                "shooting" : getRandomInt(0,99).toString(),
                "tackling": getRandomInt(0,99).toString(),
                "saving": getRandomInt(0,99).toString(),
                "agility": getRandomInt(0,99).toString(),
                "strength": getRandomInt(0,99).toString(),
                "penalty_taking": getRandomInt(0,99).toString(),
                "jumping": getRandomInt(10,300).toString()
            },
            "startPOS": GKPos,
            "injured": false,
        },
            {
                "name" : "LB Maxwell Smart",
                "position" : LeftBack,
                "rating" : getRandomInt(0,99).toString(),
                "skill" : {
                    "passing" : getRandomInt(0,99).toString(),
                    "shooting" : getRandomInt(0,99).toString(),
                    "tackling": getRandomInt(0,99).toString(),
                    "saving": getRandomInt(0,99).toString(),
                    "agility": getRandomInt(0,99).toString(),
                    "strength": getRandomInt(0,99).toString(),
                    "penalty_taking": getRandomInt(0,99).toString(),
                    "jumping": getRandomInt(10,300).toString()
                },
                "startPOS": LBPos,
                "injured": false,
            },
            {
                "name" : "CB Quenton Weilshe",
                "position" : CenterBack,
                "rating" : getRandomInt(0,99).toString(),
                "skill" : {
                    "passing" : getRandomInt(0,99).toString(),
                    "shooting" : getRandomInt(0,99).toString(),
                    "tackling": getRandomInt(0,99).toString(),
                    "saving": getRandomInt(0,99).toString(),
                    "agility": getRandomInt(0,99).toString(),
                    "strength": getRandomInt(0,99).toString(),
                    "penalty_taking": getRandomInt(0,99).toString(),
                    "jumping": getRandomInt(10,300).toString()
                },
                "startPOS": CB1Pos,
                "injured": false,
            },
            {
                "name" : "CB Wilek Names",
                "position" : CenterBack,
                "rating" : getRandomInt(0,99).toString(),
                "skill" : {
                    "passing" : getRandomInt(0,99).toString(),
                    "shooting" : getRandomInt(0,99).toString(),
                    "tackling": getRandomInt(0,99).toString(),
                    "saving": getRandomInt(0,99).toString(),
                    "agility": getRandomInt(0,99).toString(),
                    "strength": getRandomInt(0,99).toString(),
                    "penalty_taking": getRandomInt(0,99).toString(),
                    "jumping": getRandomInt(10,300).toString()
                },
                "startPOS": CB2Pos,
                "injured": false,
            },
            {
                "name" : "RB Ernest Himelw",
                "position" : RightBack,
                "rating" : getRandomInt(0,99).toString(),
                "skill" : {
                    "passing" : getRandomInt(0,99).toString(),
                    "shooting" : getRandomInt(0,99).toString(),
                    "tackling": getRandomInt(0,99).toString(),
                    "saving": getRandomInt(0,99).toString(),
                    "agility": getRandomInt(0,99).toString(),
                    "strength": getRandomInt(0,99).toString(),
                    "penalty_taking": getRandomInt(0,99).toString(),
                    "jumping": getRandomInt(10,300).toString()
                },
                "startPOS": RBPos,
                "injured": false,
            },
            {
                "name" : "LM Rick Scotrt",
                "position" : LeftMidfielder,
                "rating" : getRandomInt(0,99).toString(),
                "skill" : {
                    "passing" : getRandomInt(0,99).toString(),
                    "shooting" : getRandomInt(0,99).toString(),
                    "tackling": getRandomInt(0,99).toString(),
                    "saving": getRandomInt(0,99).toString(),
                    "agility": getRandomInt(0,99).toString(),
                    "strength": getRandomInt(0,99).toString(),
                    "penalty_taking": getRandomInt(0,99).toString(),
                    "jumping": getRandomInt(10,300).toString()
                },
                "startPOS": LMPos,
                "injured": false,
            },
            {
                "name" : "CM Terry Crews",
                "position" : CenterMidfielder,
                "rating" : getRandomInt(0,99).toString(),
                "skill" : {
                    "passing" : getRandomInt(0,99).toString(),
                    "shooting" : getRandomInt(0,99).toString(),
                    "tackling": getRandomInt(0,99).toString(),
                    "saving": getRandomInt(0,99).toString(),
                    "agility": getRandomInt(0,99).toString(),
                    "strength": getRandomInt(0,99).toString(),
                    "penalty_taking": getRandomInt(0,99).toString(),
                    "jumping": getRandomInt(10,300).toString()
                },
                "startPOS": CM1Pos,
                "injured": false,
            },
            {
                "name" : "CM Yanny Gilekbsjka",
                "position" : CenterMidfielder,
                "rating" : getRandomInt(0,99).toString(),
                "skill" : {
                    "passing" : getRandomInt(0,99).toString(),
                    "shooting" : getRandomInt(0,99).toString(),
                    "tackling": getRandomInt(0,99).toString(),
                    "saving": getRandomInt(0,99).toString(),
                    "agility": getRandomInt(0,99).toString(),
                    "strength": getRandomInt(0,99).toString(),
                    "penalty_taking": getRandomInt(0,99).toString(),
                    "jumping": getRandomInt(10,300).toString()
                },
                "startPOS": CM2Pos,
                "injured": false,
            },
            {
                "name" : "CM Uilens Ndskale",
                "position" : RightMidfielder,
                "rating" : getRandomInt(0,99).toString(),
                "skill" : {
                    "passing" : getRandomInt(0,99).toString(),
                    "shooting" : getRandomInt(0,99).toString(),
                    "tackling": getRandomInt(0,99).toString(),
                    "saving": getRandomInt(0,99).toString(),
                    "agility": getRandomInt(0,99).toString(),
                    "strength": getRandomInt(0,99).toString(),
                    "penalty_taking": getRandomInt(0,99).toString(),
                    "jumping": getRandomInt(10,300).toString()
                },
                "startPOS": RMPos,
                "injured": false,
            },
            {
                "name" : "F Iota Zenneth",
                "position" : Striker,
                "rating" : getRandomInt(0,99).toString(),
                "skill" : {
                    "passing" : getRandomInt(0,99).toString(),
                    "shooting" : getRandomInt(0,99).toString(),
                    "tackling": getRandomInt(0,99).toString(),
                    "saving": getRandomInt(0,99).toString(),
                    "agility": getRandomInt(0,99).toString(),
                    "strength": getRandomInt(0,99).toString(),
                    "penalty_taking": getRandomInt(0,99).toString(),
                    "jumping": getRandomInt(10,300).toString()
                },
                "startPOS": STPos,
                "injured": false,
            },
            {
                "name" : "F Opel Fkenme",
                "position" : Striker,
                "rating" : getRandomInt(0,99).toString(),
                "skill" : {
                    "passing" : getRandomInt(0,99).toString(),
                    "shooting" : getRandomInt(0,99).toString(),
                    "tackling": getRandomInt(0,99).toString(),
                    "saving": getRandomInt(0,99).toString(),
                    "agility": getRandomInt(0,99).toString(),
                    "strength": getRandomInt(0,99).toString(),
                    "penalty_taking": getRandomInt(0,99).toString(),
                    "jumping": getRandomInt(10,300).toString()
                },
                "startPOS":ST2Pos,
                "injured": false,
            }],

        "manager" : "Adien"
    };

	const match = [];
	let rounds = 0;

	if (ran === false) {
        initiateGame(Team1, Team2, ThePitch).then(function(matchDetails){
            ran = true;
            var match = '';
            //  console.log(matchDetails);
            match = gameLoop(10000, matchDetails);
            return match;
        }).catch(function(error){
            console.error("Error: ", error);
        })
    }


};

let getRandomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function halfTime(matchDetails) {
    let match = matchDetails;
    await startSecondHalf(match).then(function (newMatchDetails) {
        match = newMatchDetails;
        console.log('halftime', match);
    })

    return match;
}

async function gameLoop(cycles, matchDetails) {
    let match = matchDetails;
    let orginalDetails = matchDetails;
    for (i = 0; i < cycles; i ++){
        await playIteration(match).then(function (newMatchDetails) {
            match = newMatchDetails;
            if ( i === 5000) {
                console.log('-------------------------END 1st half---------------------------------------');
               console.log(match);
                console.log('-------------------------Start wnd half---------------------------------------');
                console.log('start second');
                halfTime(match);
            }
        }).catch(function(error){
            console.error("Error: ", error);

        })

    }
    console.log('-------------------------END GAME---------------------------------------');
    console.log(match);
    console.log('game over');
    return match;

};


let initiateGame = function(team1, team2, pitchDetails) {
	return new Promise(function (resolve, reject) {
		validate.validateArguments(team1, team2, pitchDetails).then(function () {
			validate.validateTeam(team1).then(function () {
				validate.validateTeam(team2).then(function () {
					validate.validatePitch(pitchDetails).then(function () {
						setVariables.populateMatchDetails(team1, team2, pitchDetails).then(function (matchDetails) {
							setVariables.setGameVariables(matchDetails.kickOffTeam).then(function (kickOffTeam) {
								setVariables.setGameVariables(matchDetails.secondTeam).then(function (secondTeam) {
									setVariables.koDecider(kickOffTeam, matchDetails).then(function (kickOffTeam) {
										matchDetails.iterationLog.push("Team to kick off - " + kickOffTeam.name);
										matchDetails.iterationLog.push("Second team - " + secondTeam.name);
										setPositions.switchSide(secondTeam, matchDetails).then(function (secondTeam) {
											matchDetails.kickOffTeam = kickOffTeam;
											matchDetails.secondTeam = secondTeam;
											resolve(matchDetails);
										}).catch(function (error) {
											console.error("Error: ", error);
										});
									}).catch(function (error) {
										console.error("Error: ", error);
									});
								}).catch(function (error) {
									console.error("Error: ", error);
								});
							}).catch(function (error) {
								console.error("Error: ", error);
							});
						}).catch(function (error) {
							console.error("Error: ", error);
						});
					}).catch(function (error) {
						console.error("Error: ", error);
					});
				}).catch(function (error) {
					console.error("Error: ", error);
				});
			}).catch(function (error) {
				console.error("Error: ", error);
			});
		}).catch(function (error) {
			console.error("Error: ", error);
		});
	});
}

let playIteration = function(matchDetails) {
	return new Promise(function (resolve, reject) {
		var closestPlayerA = {
			"name": "",
			"position": 10000
		};
		var closestPlayerB = {
			"name": "",
			"position": 10000
		};
		validate.validateMatchDetails(matchDetails).then(function () {
			matchDetails.iterationLog = [];
			kickOffTeam = matchDetails.kickOffTeam;
			secondTeam = matchDetails.secondTeam;
			common.matchInjury(matchDetails, kickOffTeam);
			common.matchInjury(matchDetails, secondTeam);
			playerMovement.closestPlayerToBall(closestPlayerA, kickOffTeam, matchDetails).then(function () {
				playerMovement.closestPlayerToBall(closestPlayerB, secondTeam, matchDetails).then(function () {
					playerMovement.decideMovement(closestPlayerA, kickOffTeam, secondTeam, matchDetails).then(function (kickOffTeam) {
						playerMovement.decideMovement(closestPlayerB, secondTeam, kickOffTeam, matchDetails).then(function (secondTeam) {
							matchDetails.kickOffTeam = kickOffTeam;
							matchDetails.secondTeam = secondTeam;
							resolve(matchDetails);
						}).catch(function (error) {
							console.error("Error: ", error);
						});
					}).catch(function (error) {
						console.error("Error: ", error);
					});
				}).catch(function (error) {
					console.error("Error: ", error);
				});
			}).catch(function (error) {
				console.error("Error: ", error);
			});
		}).catch(function (error) {
			console.error("Error: ", error);
		});
	});
}

let startSecondHalf = function(matchDetails) {
	return new Promise(function (resolve, reject) {
		validate.validateMatchDetails(matchDetails).then(function () {
			kickOffTeam = matchDetails.kickOffTeam;
			secondTeam = matchDetails.secondTeam;
			setPositions.switchSide(kickOffTeam, matchDetails).then(function (kickOffTeam) {
				setPositions.switchSide(secondTeam, matchDetails).then(function (secondTeam) {
					setPositions.setGoalScored(secondTeam, kickOffTeam, matchDetails).then(function () {
						matchDetails.half++;
						matchDetails.kickOffTeam = kickOffTeam;
						matchDetails.secondTeam = secondTeam;
						resolve(matchDetails);
					});
				});
			});
		}).catch(function (error) {
			console.error("Error: ", error);
		});
	});
}
*/
