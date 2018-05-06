import async = require("async");
import {IPitch} from "../models/pitch.model";
import {ITeam} from "../models/team.model";
import {IPlayer} from "../models/player.model";

export class Validate {

    /**
     * Validate Game Arugments
     * @param {ITeam} _team1
     * @param {ITeam} _team2
     * @param {IPitch} _pitch
     * @returns {Promise<any>}
     */
    validateArguments(_team1 : ITeam, _team2 : ITeam, _pitch: IPitch) {
        console.log('validating arguments');
        return new Promise(function (resolve, reject) {
            if (_team1 === undefined || _team2 === undefined || _pitch === undefined) {
                reject("Please provide two teams and a pitch JSON");
            } else {
                resolve();
            };
        });
    }

    /**
     * Validate Match Details
     * @param matchDetails
     * @returns {Promise<any>}
     */
    validateMatchDetails(matchDetails) {
        return new Promise(function (resolve, reject) {
            var matchObjects = ["kickOffTeam", "secondTeam", "pitchSize", "ball", "half", "kickOffTeamStatistics", "secondTeamStatistics", "iterationLog"];
            var badObjects = 0;
            async.each(matchObjects, function eachObj(obj, callback) {
                if (!matchDetails.hasOwnProperty(obj)) {
                    callback("Match Details must contain: " + obj);
                    badObjects++;
                } else {
                    callback();
                }
            }, function afterAllObjs(err) {
                if (err) {
                    reject(err);
                } else {
                    if (badObjects > 0) {
                        reject("Please provide valid match details JSON");
                    } else {
                        resolve();
                    }
                }
            });
        });
    }

    /**
     * Validate Pitch Details
     * @param pitchDetails
     * @returns {Promise<any>}
     */
    validatePitch(pitchDetails) {
        return new Promise(function (resolve, reject) {
            var pitchObjects = ["pitchWidth", "pitchHeight"];
            var badObjects = 0;
            async.each(pitchObjects, function eachObj(obj, callback) {
                if (!pitchDetails.hasOwnProperty(obj)) {
                    callback("Pitch Must contains: " + obj);
                    badObjects++;
                } else {
                    callback();
                }
            }, function afterAllObjs(err) {
                if (err) {
                    reject(err);
                } else {
                    if (badObjects > 0) {
                        reject("Please provide pitchWidth and pitchHeight");
                    } else {
                        resolve();
                    }
                };
            });
        });
    }

    /**
     * Validate Team
     * @param {ITeam} team
     * @returns {Promise<any>}
     */
    validateTeam(team: ITeam) {
        console.log('validating team');
        return new Promise((resolve, reject) => {
            let errorMessage = "";
            this.validateNumberOfPlayers(team.players).then( () => {
                let badObjects = 0;
                let validate : Validate = new Validate();

                async.each(team.players, function eachObj(player, callback) {
                    validate.validatePlayerObjects(player).then(() =>{
                        callback();
                    }).catch((error) => {
                        badObjects++;
                        errorMessage += "error " + error;
                        console.log(errorMessage);
                        callback();
                    });
                }, function afterAllObjs(err) {
                    if (badObjects > 0) {
                        console.log('Bad', badObjects);
                        reject("Please provide all player skills: passing, shooting, tackling, saving, agility, strength, penalty_taking, jumping");
                    } else {
                        if (!team.name) {
                            reject("No team name given.");
                        } else {
                            resolve();
                        }
                    }
                });
            }).catch((error) => {
                reject(error);
            });
        });
    }

    /**
     * Validate Number of Players
     * @param players
     * @returns {Promise<any>}
     */
     validateNumberOfPlayers(players) {
         console.log('validating players');
        return new Promise((resolve, reject) =>{
            if (players.length === 11) {
                resolve();
            } else {
                reject("There must be 11 players in a team");
            }
        });
    }


    /**
     * Validate Player Objects
     * @param player
     * @returns {Promise<any>}
     */
    validatePlayerObjects(player) {
        console.log('validating players objects...');
        return new Promise((resolve, reject) => {
            let playerObjects = ["name", "position", "rating", "startPOS", "injured"];
            async.each(playerObjects, function eachObj(obj, callback) {
                if (!player.hasOwnProperty(obj)) {
                    callback("Player must contain JSON variable: " + obj);
                } else {
                    callback();
                }
            }, function afterAllObjs(err) {
                let validate : Validate = new Validate();
                if (err) {
                    reject(err);
                } else {
                    validate.validatePlayerSkills(player.skill).then( () => {
                        resolve();
                    }).catch((error) => {
                        reject(error);
                    })
                }
            });
        });
    }

    /**
     * Validate Player Skills
     * @param skills
     * @returns {Promise<any>}
     */
    validatePlayerSkills(skills) {
        return new Promise(function (resolve, reject) {
            let skillType = ["passing", "shooting", "tackling", "saving", "agility", "strength", "penalty_taking", "jumping"];
            let badObjects = 0;
            async.each(skillType, function eachType(type, callback) {
                if (!skills.hasOwnProperty(type)) {
                    callback("Player must contain skill: " + type);
                    badObjects++;
                } else {
                    callback();
                }
            }, function afterAllSkills(err) {
                if (err) {
                    reject(err);
                } else {
                    if (badObjects > 0) {
                        reject("Please provide all player skills: passing, shooting, tackling, saving, agility, strength, penalty_taking, jumping");
                    } else {
                        resolve();
                    }
                }
            });
        })
    }

}

