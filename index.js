//------------------------
//    NPM Modules
//------------------------
var common = require("./lib/common");
var setPositions = require("./lib/setPositions");
var setVariables = require("./lib/setVariables");
var playerMovement = require("./lib/playerMovement");
var validate = require("./lib/validate");

//------------------------
//    Functions
//------------------------

exports.helloWorld = (req, res) => {
	const team1 = req.body.team1;
	const team2 = req.body.team2;
	const pitchDetails = req.body.pitchDetails;

	const Pitch = {
	    "pitchWidth": 120,
        "pitchHeight": 600 }

	const Team1 = {
		"name" : "Team1",
		"players": [{
			"name" : "Player1",
			"ppsition" : "GK",
			"rating" : "99",
			"skill" : {
				"passing" : "99",
				"shooting" : "99",
                "tackling": "99",
                "saving": "99",
                "agility": "99",
                "strength": "99",
                "penalty_taking": "99",
                "jumping": "300"
			},
			"startPOS": [60,0],
			"injured": false,
			},
            {
                "name" : "Player2",
                "ppsition" : "GK",
                "rating" : "99",
                "skill" : {
                    "passing" : "99",
                    "shooting" : "99",
                    "tackling": "99",
                    "saving": "99",
                    "agility": "99",
                    "strength": "99",
                    "penalty_taking": "99",
                    "jumping": "300"
                },
                "startPOS": [60,0],
                "injured": false,
            },
            {
                "name" : "Player3",
                "ppsition" : "GK",
                "rating" : "99",
                "skill" : {
                    "passing" : "99",
                    "shooting" : "99",
                    "tackling": "99",
                    "saving": "99",
                    "agility": "99",
                    "strength": "99",
                    "penalty_taking": "99",
                    "jumping": "300"
                },
                "startPOS": [60,0],
                "injured": false,
            },
            {
                "name" : "Player4",
                "ppsition" : "GK",
                "rating" : "99",
                "skill" : {
                    "passing" : "99",
                    "shooting" : "99",
                    "tackling": "99",
                    "saving": "99",
                    "agility": "99",
                    "strength": "99",
                    "penalty_taking": "99",
                    "jumping": "300"
                },
                "startPOS": [60,0],
                "injured": false,
            },
            {
                "name" : "Player5",
                "ppsition" : "GK",
                "rating" : "99",
                "skill" : {
                    "passing" : "99",
                    "shooting" : "99",
                    "tackling": "99",
                    "saving": "99",
                    "agility": "99",
                    "strength": "99",
                    "penalty_taking": "99",
                    "jumping": "300"
                },
                "startPOS": [60,0],
                "injured": false,
            },
            {
                "name" : "Player6",
                "ppsition" : "GK",
                "rating" : "99",
                "skill" : {
                    "passing" : "99",
                    "shooting" : "99",
                    "tackling": "99",
                    "saving": "99",
                    "agility": "99",
                    "strength": "99",
                    "penalty_taking": "99",
                    "jumping": "300"
                },
                "startPOS": [60,0],
                "injured": false,
            },
            {
                "name" : "Player7",
                "ppsition" : "GK",
                "rating" : "99",
                "skill" : {
                    "passing" : "99",
                    "shooting" : "99",
                    "tackling": "99",
                    "saving": "99",
                    "agility": "99",
                    "strength": "99",
                    "penalty_taking": "99",
                    "jumping": "300"
                },
                "startPOS": [60,0],
                "injured": false,
            },
            {
                "name" : "Player8",
                "ppsition" : "GK",
                "rating" : "99",
                "skill" : {
                    "passing" : "99",
                    "shooting" : "99",
                    "tackling": "99",
                    "saving": "99",
                    "agility": "99",
                    "strength": "99",
                    "penalty_taking": "99",
                    "jumping": "300"
                },
                "startPOS": [60,0],
                "injured": false,
            },
            {
                "name" : "Player9",
                "ppsition" : "GK",
                "rating" : "99",
                "skill" : {
                    "passing" : "99",
                    "shooting" : "99",
                    "tackling": "99",
                    "saving": "99",
                    "agility": "99",
                    "strength": "99",
                    "penalty_taking": "99",
                    "jumping": "300"
                },
                "startPOS": [60,0],
                "injured": false,
            },
            {
                "name" : "Player10",
                "ppsition" : "GK",
                "rating" : "99",
                "skill" : {
                    "passing" : "99",
                    "shooting" : "99",
                    "tackling": "99",
                    "saving": "99",
                    "agility": "99",
                    "strength": "99",
                    "penalty_taking": "99",
                    "jumping": "300"
                },
                "startPOS": [60,0],
                "injured": false,
            },
            {
                "name" : "Player11",
                "ppsition" : "GK",
                "rating" : "99",
                "skill" : {
                    "passing" : "99",
                    "shooting" : "99",
                    "tackling": "99",
                    "saving": "99",
                    "agility": "99",
                    "strength": "99",
                    "penalty_taking": "99",
                    "jumping": "300"
                },
                "startPOS": [60,0],
                "injured": false,
            }],
		"manager" : "Adien"
	}


    const Team2 = {
        "name" : "Team2",
        "players": [{
            "name" : "Player1",
            "ppsition" : "GK",
            "rating" : "99",
            "skill" : {
                "passing" : "99",
                "shooting" : "99",
                "tackling": "99",
                "saving": "99",
                "agility": "99",
                "strength": "99",
                "penalty_taking": "99",
                "jumping": "300"
            },
            "startPOS": [60,0],
            "injured": false,
        },
            {
                "name" : "Player2",
                "ppsition" : "GK",
                "rating" : "99",
                "skill" : {
                    "passing" : "99",
                    "shooting" : "99",
                    "tackling": "99",
                    "saving": "99",
                    "agility": "99",
                    "strength": "99",
                    "penalty_taking": "99",
                    "jumping": "300"
                },
                "startPOS": [60,0],
                "injured": false,
            },
            {
                "name" : "Player3",
                "ppsition" : "GK",
                "rating" : "99",
                "skill" : {
                    "passing" : "99",
                    "shooting" : "99",
                    "tackling": "99",
                    "saving": "99",
                    "agility": "99",
                    "strength": "99",
                    "penalty_taking": "99",
                    "jumping": "300"
                },
                "startPOS": [60,0],
                "injured": false,
            },
            {
                "name" : "Player4",
                "ppsition" : "GK",
                "rating" : "99",
                "skill" : {
                    "passing" : "99",
                    "shooting" : "99",
                    "tackling": "99",
                    "saving": "99",
                    "agility": "99",
                    "strength": "99",
                    "penalty_taking": "99",
                    "jumping": "300"
                },
                "startPOS": [60,0],
                "injured": false,
            },
            {
                "name" : "Player5",
                "ppsition" : "GK",
                "rating" : "99",
                "skill" : {
                    "passing" : "99",
                    "shooting" : "99",
                    "tackling": "99",
                    "saving": "99",
                    "agility": "99",
                    "strength": "99",
                    "penalty_taking": "99",
                    "jumping": "300"
                },
                "startPOS": [60,0],
                "injured": false,
            },
            {
                "name" : "Player6",
                "ppsition" : "GK",
                "rating" : "99",
                "skill" : {
                    "passing" : "99",
                    "shooting" : "99",
                    "tackling": "99",
                    "saving": "99",
                    "agility": "99",
                    "strength": "99",
                    "penalty_taking": "99",
                    "jumping": "300"
                },
                "startPOS": [60,0],
                "injured": false,
            },
            {
                "name" : "Player7",
                "ppsition" : "GK",
                "rating" : "99",
                "skill" : {
                    "passing" : "99",
                    "shooting" : "99",
                    "tackling": "99",
                    "saving": "99",
                    "agility": "99",
                    "strength": "99",
                    "penalty_taking": "99",
                    "jumping": "300"
                },
                "startPOS": [60,0],
                "injured": false,
            },
            {
                "name" : "Player8",
                "ppsition" : "GK",
                "rating" : "99",
                "skill" : {
                    "passing" : "99",
                    "shooting" : "99",
                    "tackling": "99",
                    "saving": "99",
                    "agility": "99",
                    "strength": "99",
                    "penalty_taking": "99",
                    "jumping": "300"
                },
                "startPOS": [60,0],
                "injured": false,
            },
            {
                "name" : "Player9",
                "ppsition" : "GK",
                "rating" : "99",
                "skill" : {
                    "passing" : "99",
                    "shooting" : "99",
                    "tackling": "99",
                    "saving": "99",
                    "agility": "99",
                    "strength": "99",
                    "penalty_taking": "99",
                    "jumping": "300"
                },
                "startPOS": [60,0],
                "injured": false,
            },
            {
                "name" : "Player10",
                "ppsition" : "GK",
                "rating" : "99",
                "skill" : {
                    "passing" : "99",
                    "shooting" : "99",
                    "tackling": "99",
                    "saving": "99",
                    "agility": "99",
                    "strength": "99",
                    "penalty_taking": "99",
                    "jumping": "300"
                },
                "startPOS": [60,0],
                "injured": false,
            },
            {
                "name" : "Player11",
                "ppsition" : "GK",
                "rating" : "99",
                "skill" : {
                    "passing" : "99",
                    "shooting" : "99",
                    "tackling": "99",
                    "saving": "99",
                    "agility": "99",
                    "strength": "99",
                    "penalty_taking": "99",
                    "jumping": "300"
                },
                "startPOS": [60,0],
                "injured": false,
            }],

        "manager" : "Adien"
    }

	const startGame = initiateGame(Team1, Team2, pitchDetails);

        res.status(200).send('Success: ');

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

let playInteration = function(matchDetails) {
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
