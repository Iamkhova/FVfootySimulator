import async = require('async');
import {Common} from "./Common";
import {SetVariables} from "./setVariables";
import {IPlayerInformation} from "../models/playerInformation.model";
import {IPlayer} from "../models/player.model";

let setVariables : SetVariables = new SetVariables();

export class SetPositions {



    /**
     * SetCorner Positions
     * @param team
     * @param opposition
     * @param side
     * @param matchDetails
     * @returns {Promise<any>}
     */
    setCornerPositions(team, opposition, side, matchDetails) {
        return new Promise((resolve, reject)=> {
            if (team.players[0].originPOS[1] > matchDetails.pitchSize[1] / 2) {
                if (side === "left") {
                    team.players[1].startPOS = [0, 0];
                    team.players[4].startPOS = [10, 20];
                    team.players[5].startPOS = [60, 40];
                    team.players[8].startPOS = [50, 70];
                    team.players[9].startPOS = [80, 50];
                    team.players[10].startPOS = [60, 80];
                    opposition.players[5].startPOS = [15, 25];
                    opposition.players[6].startPOS = [40, 35];
                    opposition.players[7].startPOS = [60, 35];
                    opposition.players[8].startPOS = [60, 70];
                    matchDetails.ball.position = [0, 0];
                    team.players[1].hasBall = true;
                    matchDetails.ball.withPlayer = true;
                    matchDetails.ball.Player = team.players[1].name;
                    matchDetails.ball.withTeam = team.name;
                } else {
                    team.players[1].startPOS = [matchDetails.pitchSize[0], 0];
                    team.players[4].startPOS = [matchDetails.pitchSize[0] - 10, 20];
                    team.players[5].startPOS = [matchDetails.pitchSize[0] - 60, 40];
                    team.players[8].startPOS = [matchDetails.pitchSize[0] - 50, 70];
                    team.players[9].startPOS = [matchDetails.pitchSize[0] - 80, 50];
                    team.players[10].startPOS = [matchDetails.pitchSize[0] - 60, 80];
                    opposition.players[5].startPOS = [matchDetails.pitchSize[0] - 15, 25];
                    opposition.players[6].startPOS = [matchDetails.pitchSize[0] - 40, 35];
                    opposition.players[7].startPOS = [matchDetails.pitchSize[0] - 60, 35];
                    opposition.players[8].startPOS = [matchDetails.pitchSize[0] - 60, 70];
                    matchDetails.ball.position = [matchDetails.pitchSize[0], 0];
                    team.players[1].hasBall = true;
                    matchDetails.ball.withPlayer = true;
                    matchDetails.ball.Player = team.players[1].name;
                    matchDetails.ball.withTeam = team.name;
                }
            } else {
                if (side === "left") {
                    team.players[1].startPOS = [0, matchDetails.pitchSize[1]];
                    team.players[4].startPOS = [10, matchDetails.pitchSize[1] - 20];
                    team.players[5].startPOS = [60, matchDetails.pitchSize[1] - 40];
                    team.players[8].startPOS = [50, matchDetails.pitchSize[1] - 70];
                    team.players[9].startPOS = [80, matchDetails.pitchSize[1] - 50];
                    team.players[10].startPOS = [60, matchDetails.pitchSize[1] - 80];
                    opposition.players[5].startPOS = [15, matchDetails.pitchSize[1] - 25];
                    opposition.players[6].startPOS = [40, matchDetails.pitchSize[1] - 35];
                    opposition.players[7].startPOS = [60, matchDetails.pitchSize[1] - 35];
                    opposition.players[8].startPOS = [60, matchDetails.pitchSize[1] - 70];
                    matchDetails.ball.position = [0, matchDetails.pitchSize[1]];
                    team.players[1].hasBall = true;
                    matchDetails.ball.withPlayer = true;
                    matchDetails.ball.Player = team.players[1].name;
                    matchDetails.ball.withTeam = team.name;
                } else {
                    team.players[1].startPOS = [matchDetails.pitchSize[0], matchDetails.pitchSize[1]];
                    team.players[4].startPOS = [matchDetails.pitchSize[0] - 10, matchDetails.pitchSize[1] - 20];
                    team.players[5].startPOS = [matchDetails.pitchSize[0] - 60, matchDetails.pitchSize[1] - 40];
                    team.players[8].startPOS = [matchDetails.pitchSize[0] - 50, matchDetails.pitchSize[1] - 70];
                    team.players[9].startPOS = [matchDetails.pitchSize[0] - 80, matchDetails.pitchSize[1] - 50];
                    team.players[10].startPOS = [matchDetails.pitchSize[0] - 60, matchDetails.pitchSize[1] - 80];
                    opposition.players[5].startPOS = [matchDetails.pitchSize[0] - 15, matchDetails.pitchSize[1] - 25];
                    opposition.players[6].startPOS = [matchDetails.pitchSize[0] - 40, matchDetails.pitchSize[1] - 35];
                    opposition.players[7].startPOS = [matchDetails.pitchSize[0] - 60, matchDetails.pitchSize[1] - 35];
                    opposition.players[8].startPOS = [matchDetails.pitchSize[0] - 60, matchDetails.pitchSize[1] - 70];
                    matchDetails.ball.position = [matchDetails.pitchSize[0], matchDetails.pitchSize[1]];
                    team.players[1].hasBall = true;
                    matchDetails.ball.withPlayer = true;
                    matchDetails.ball.Player = team.players[1].name;
                    matchDetails.ball.withTeam = team.name;
                }
            }
            resolve(matchDetails.ball.position);
        });
    }

    /**
     * SetThrowIn
     * @param team
     * @param opposition
     * @param side
     * @param place
     * @param matchDetails
     * @returns {Promise<any>}
     */
    setThrowIn(team, opposition, side, place, matchDetails) {
        return new Promise( (resolve, reject) => {
            let movement = team.players[5].originPOS[1] - place;
            let oppMovement = 0 - movement;
            if (side === "left") {
                this.setPlayerPositions(matchDetails, team, movement).then( () => {
                    team.players[5].startPOS = [0, place];
                    team.players[8].startPOS = [15, place];
                    team.players[7].startPOS = [10, place + 10];
                    team.players[9].startPOS = [10, place - 10];
                    matchDetails.ball.position = [0, place];
                    team.players[5].startPOS = matchDetails.ball.position.map(x => x);
                    team.players[5].hasBall = true;
                    matchDetails.ball.withPlayer = true;
                    matchDetails.ball.Player = team.players[5].name;
                    matchDetails.ball.withTeam = team.name;
                   this.setPlayerPositions(matchDetails, opposition, oppMovement).then(() => {
                        opposition.players[5].startPOS = [20, place];
                        opposition.players[7].startPOS = [30, place + 5];
                        opposition.players[8].startPOS = [25, place - 15];
                        opposition.players[9].startPOS = [10, place - 30];
                        resolve(matchDetails.ball.position);
                    }).catch((error) =>{
                        console.error("Error when setting opposition throwin positions: ", error);
                        console.error(matchDetails.iterationLog);
                    });
                }).catch((error) => {
                    console.error("Error when setting throwin player positions: ", error);
                    console.error(matchDetails.iterationLog);
                });
            } else {
                this.setPlayerPositions(matchDetails, team, movement).then(() => {
                    team.players[5].startPOS = [matchDetails.pitchSize[0], place];
                    team.players[8].startPOS = [matchDetails.pitchSize[0] - 15, place];
                    team.players[7].startPOS = [matchDetails.pitchSize[0] - 10, place + 10];
                    team.players[9].startPOS = [matchDetails.pitchSize[0] - 10, place - 10];
                    matchDetails.ball.position = [matchDetails.pitchSize[0], place];
                    team.players[5].startPOS = matchDetails.ball.position.map(x => x);
                    team.players[5].hasBall = true;
                    matchDetails.ball.withPlayer = true;
                    matchDetails.ball.Player = team.players[5].name;
                    matchDetails.ball.withTeam = team.name;
                    this.setPlayerPositions(matchDetails, opposition, oppMovement).then(() => {
                        opposition.players[5].startPOS = [matchDetails.pitchSize[0] - 20, place];
                        opposition.players[7].startPOS = [matchDetails.pitchSize[0] - 30, place + 5];
                        opposition.players[8].startPOS = [matchDetails.pitchSize[0] - 25, place - 15];
                        opposition.players[9].startPOS = [matchDetails.pitchSize[0] - 10, place - 30];
                        resolve(matchDetails.ball.position);
                    }).catch((error) => {
                        console.error("Error when setting opposition throwin positions: ", error);
                        console.error(matchDetails.iterationLog);
                    });
                }).catch((error) => {
                    console.error("Error when setting thowin player positions: ", error);
                    console.error(matchDetails.iterationLog);
                });
            }
        });
    }

    /**
     * Set Player Positions
     * @param matchDetails
     * @param team
     * @param extra
     * @returns {Promise<any>}
     */
    setPlayerPositions(matchDetails, team, extra) {
        return new Promise( (resolve, reject) => {
            async.eachSeries(team.players, function eachPlayer(thisPlayer :IPlayer, thisPlayerCallback) {
                let tempArray = thisPlayer.originPOS;
                thisPlayer.startPOS = tempArray.map(x => x);
                if ((parseInt(thisPlayer.startPOS[1]) + extra) > matchDetails.pitchSize[1] || (parseInt(thisPlayer.startPOS[1]) + extra) < 0) {
                    //stay where they are
                } else {
                    thisPlayer.startPOS[1] = parseInt(thisPlayer.startPOS[1]) + extra;
                }
                thisPlayer.relativePOS = tempArray.map(x => x);
                thisPlayer.relativePOS[1] = parseInt(thisPlayer.relativePOS[1]) + extra;
                thisPlayerCallback();
            }, function afterAllPlayers() {
                resolve();
            });
        });
    }

    /**
     * Set Goal Kick
     * @param team
     * @param opposition
     * @param matchDetails
     * @returns {Promise<any>}
     */
    setGoalKick(team, opposition, matchDetails) {
        return new Promise( (resolve, reject) => {
            if (team.players[0].originPOS[1] > matchDetails.pitchSize[1] / 2) {
                this.setPlayerPositions(matchDetails, team, -80).then(() => {
                    setVariables.resetPlayerPositions(opposition).then( () => {
                        matchDetails.ball.position = [matchDetails.pitchSize[0] / 2, matchDetails.pitchSize[1] - 20];
                        team.players[0].startPOS = matchDetails.ball.position.map(x => x);
                        team.players[0].hasBall = true;
                        matchDetails.ball.withPlayer = true;
                        matchDetails.ball.Player = team.players[0].name;
                        matchDetails.ball.withTeam = team.name;
                        resolve(matchDetails.ball.position);
                    }).catch( (error) => {
                        console.error("Error when resetting player positions: ", error);
                        console.error(matchDetails.iterationLog);
                    });
                }).catch( (error) => {
                    console.error("Error when setting player positions: ", error);
                    console.error(matchDetails.iterationLog);
                });
            } else {
                this.setPlayerPositions(matchDetails, team, 80).then( () => {
                    setVariables.resetPlayerPositions(opposition).then( () => {
                        matchDetails.ball.position = [matchDetails.pitchSize[0] / 2, 20];
                        team.players[0].startPOS = matchDetails.ball.position.map(x => x);
                        team.players[0].hasBall = true;
                        matchDetails.ball.withPlayer = true;
                        matchDetails.ball.Player = team.players[0].name;
                        matchDetails.ball.withTeam = team.name;
                        resolve(matchDetails.ball.position);
                    }).catch( (error) => {
                        console.error("Error when resetting player positions: ", error);
                        console.error(matchDetails.iterationLog);
                    });
                }).catch((error) => {
                    console.error("Error when setting player positions: ", error);
                    console.error(matchDetails.iterationLog);
                });
            }
        });
    }

    /**
     * Closest Player to Position
     * @param player
     * @param team
     * @param position
     * @returns {Promise<any>}
     */
    closestPlayerToPosition(player, team, position) {
        return new Promise( (resolve, reject) => {
            let currentDifference = 1000;
            let playerInformation : IPlayerInformation = {};
            async.eachSeries(team.players, function eachPlayer(thisPlayer : IPlayer, thisPlayerCallback) {
                if (player.name === thisPlayer.name) {
                    //do nothing
                } else {
                    let ballToPlayerX = thisPlayer.startPOS[0] - position[0];
                    let ballToPlayerY = thisPlayer.startPOS[1] - position[1];
                    let proximityToBall = Math.abs(ballToPlayerX + ballToPlayerY);
                    if (proximityToBall < currentDifference) {
                        playerInformation.thePlayer = thisPlayer;
                        playerInformation.proximity = [ballToPlayerX, ballToPlayerY];
                        currentDifference = proximityToBall;
                    }
                }
                thisPlayerCallback();
            }, function afterAllPlayers() {
                resolve(playerInformation);
            });
        });
    }

    
    setSetpiece(matchDetails, team, opposition) {
        return new Promise((resolve, reject) => {
            const ballPosition = matchDetails.ball.position;
            if (team.players[0].originPOS[1] > matchDetails.pitchSize[1] / 2) {
                if (Common.isBetween(ballPosition[0], (matchDetails.pitchSize[0] / 4) - 5, matchDetails.pitchSize[0] - (matchDetails.pitchSize[0] / 4) + 5) && Common.isBetween(ballPosition[1], 0, (matchDetails.pitchSize[1] / 6) - 5)) {
                    this.setPenalty(team, opposition, "top", matchDetails).then( () => {
                        matchDetails.iterationLog.push("penalty to: " + team.name);
                        resolve();
                    }).catch( (error) =>{
                        console.error("Error whilst setting the penalty for " + team.name + ": ", error);
                        console.error(matchDetails.iterationLog);
                    });
                } else {
                    this.setFreekick(ballPosition, team, opposition, "top", matchDetails).then(() => {
                        matchDetails.iterationLog.push("freekick to: " + team.name);
                        resolve();
                    }).catch((error) => {
                        console.error("Error whilst setting the freekick for " + team.name + ": ", error);
                        console.error(matchDetails.iterationLog);
                    });
                }
            } else {
                if (Common.isBetween(ballPosition[0], (matchDetails.pitchSize[0] / 4) - 5, matchDetails.pitchSize[0] - (matchDetails.pitchSize[0] / 4) + 5) && Common.isBetween(ballPosition[1], matchDetails.pitchSize[1] - (matchDetails.pitchSize[1] / 6) + 5, matchDetails.pitchSize[1])) {
                    this.setPenalty(team, opposition, "bottom", matchDetails).then(() => {
                        matchDetails.iterationLog.push("penalty to: " + team.name);
                        resolve();
                    }).catch((error) =>{
                        console.error("Error whilst setting the penalty for " + team.name + ": ", error);
                        console.error(matchDetails.iterationLog);
                    });
                    resolve();
                } else {
                    this.setFreekick(ballPosition, team, opposition, "bottom", matchDetails).then(() => {
                        matchDetails.iterationLog.push("freekick to: " + team.name);
                        resolve();
                    }).catch((error) =>{
                        console.error("Error whilst setting the freekick for " + team.name + ": ", error);
                        console.error(matchDetails.iterationLog);
                    });
                }
            }
        });
    }


    /**
     *
     * @param team
     * @param opposition
     * @param side
     * @param matchDetails
     * @returns {Promise<any>}
     */
    setPenalty(team, opposition, side, matchDetails) {
        return new Promise((resolve, reject) => {
            let tempArray = [];
            let shootArray = [];
            if (side === "top") {
                tempArray = [matchDetails.pitchSize[0] / 2, matchDetails.pitchSize[1] / 6];
                shootArray = [matchDetails.pitchSize[0] / 2, 60];
                matchDetails.ball.direction = "north";
                matchDetails.ball.position = shootArray.map(x => x);
                matchDetails.ball.position[1] += -2;
            } else {
                tempArray = [matchDetails.pitchSize[0] / 2, matchDetails.pitchSize[1] - (matchDetails.pitchSize[1] / 6)];
                shootArray = [matchDetails.pitchSize[0] / 2, matchDetails.pitchSize[1] - 60];
                matchDetails.ball.direction = "south";
                matchDetails.ball.position = shootArray.map(x => x);
                matchDetails.ball.position[1] += 2;
            }
            
            opposition.players = this.formationTeamASetPenalty(opposition, tempArray);
            team.players = this.formationTeamBSetPenalty(team, tempArray,shootArray);

            matchDetails.ball.Player = team.players[10].name;
            matchDetails.ball.withPlayer = true;
            matchDetails.ball.withTeam = team.name;
            team.intent = "attack";
            opposition.intent = "defend";
            resolve();
        });
    }

    
    setFreekick(ballPosition, team, opposition, side, matchDetails) {
        return new Promise((resolve, reject) => {
            const tempArray = ballPosition;
            team.players[0].startPOS = team.players[0].originPOS.map(x => x);
            team.players[1].startPOS = team.players[1].originPOS.map(x => x);
            team.players[2].startPOS = team.players[2].originPOS.map(x => x);
            team.players[3].startPOS = team.players[3].originPOS.map(x => x);
            team.players[4].startPOS = team.players[4].originPOS.map(x => x);
            team.players[5].startPOS = tempArray.map(x => x);
            matchDetails.ball.withTeam = team.name;
            matchDetails.ball.withPlayer = true;
            matchDetails.ball.Player = team.players[5].name;
            team.players[5].hasBall = true;
            opposition.players[0].startPOS = opposition.players[0].originPOS.map(x => x);
            opposition.players[1].startPOS = opposition.players[1].originPOS.map(x => x);
            opposition.players[2].startPOS = opposition.players[2].originPOS.map(x => x);
            opposition.players[3].startPOS = opposition.players[3].originPOS.map(x => x);
            opposition.players[4].startPOS = opposition.players[4].originPOS.map(x => x);
            if (side === "top") {
                //shooting to top of pitch
                if (ballPosition[1] > (matchDetails.pitchSize[1] - (matchDetails.pitchSize[1] / 3))) {
                    matchDetails.ball.Player = team.players[0].name;
                    team.players[0].hasBall = true;
                    team.players[0].startPOS = tempArray.map(x => x);
                    team.players[1].startPOS = [team.players[1].originPOS[0], (matchDetails.pitchSize[1] - (matchDetails.pitchSize[1] / 6) - (600 - team.players[0].startPOS[1]) - (600 - team.players[1].originPOS[1]))];
                    team.players[2].startPOS = [team.players[2].originPOS[0], (matchDetails.pitchSize[1] - (matchDetails.pitchSize[1] / 6) - (600 - team.players[0].startPOS[1]) - (600 - team.players[2].originPOS[1]))];
                    team.players[3].startPOS = [team.players[3].originPOS[0], (matchDetails.pitchSize[1] - (matchDetails.pitchSize[1] / 6) - (600 - team.players[0].startPOS[1]) - (600 - team.players[3].originPOS[1]))];
                    team.players[4].startPOS = [team.players[4].originPOS[0], (matchDetails.pitchSize[1] - (matchDetails.pitchSize[1] / 6) - (600 - team.players[0].startPOS[1]) - (600 - team.players[4].originPOS[1]))];
                    team.players[5].startPOS = [team.players[5].originPOS[0], (matchDetails.pitchSize[1] - (matchDetails.pitchSize[1] / 6) - (600 - team.players[0].startPOS[1]) - (600 - team.players[5].originPOS[1]))];
                    team.players[6].startPOS = [team.players[6].originPOS[0], (matchDetails.pitchSize[1] - (matchDetails.pitchSize[1] / 6) - (600 - team.players[0].startPOS[1]) - (600 - team.players[6].originPOS[1]))];
                    team.players[7].startPOS = [team.players[7].originPOS[0], (matchDetails.pitchSize[1] - (matchDetails.pitchSize[1] / 6) - (600 - team.players[0].startPOS[1]) - (600 - team.players[7].originPOS[1]))];
                    team.players[8].startPOS = [team.players[8].originPOS[0], (matchDetails.pitchSize[1] - (matchDetails.pitchSize[1] / 6) - (600 - team.players[0].startPOS[1]) - (600 - team.players[8].originPOS[1]))];
                    team.players[9].startPOS = [team.players[9].originPOS[0], (matchDetails.pitchSize[1] - (matchDetails.pitchSize[1] / 6) - (600 - team.players[0].startPOS[1]) - (600 - team.players[9].originPOS[1]))];
                    team.players[10].startPOS = [team.players[10].originPOS[0], (matchDetails.pitchSize[1] - (matchDetails.pitchSize[1] / 6) - (600 - team.players[0].startPOS[1]) - (600 - team.players[10].originPOS[1]))];
                    opposition.players[1].startPOS = [opposition.players[1].originPOS[0], opposition.players[1].originPOS[1] + (matchDetails.pitchSize[1] / 6)];
                    opposition.players[2].startPOS = [opposition.players[2].originPOS[0], opposition.players[2].originPOS[1] + (matchDetails.pitchSize[1] / 6)];
                    opposition.players[3].startPOS = [opposition.players[3].originPOS[0], opposition.players[3].originPOS[1] + (matchDetails.pitchSize[1] / 6)];
                    opposition.players[4].startPOS = [opposition.players[4].originPOS[0], opposition.players[4].originPOS[1] + (matchDetails.pitchSize[1] / 6)];
                    opposition.players[9].startPOS = [opposition.players[9].originPOS[0] + 10, team.players[1].startPOS[1]];
                    opposition.players[10].startPOS = [opposition.players[10].originPOS[0] + 10, team.players[1].startPOS[1]];
                    opposition.players[5].startPOS = [opposition.players[5].originPOS[0], opposition.players[5].originPOS[1] + (matchDetails.pitchSize[1] / 6)];
                    opposition.players[6].startPOS = [opposition.players[6].originPOS[0], opposition.players[6].originPOS[1] + (matchDetails.pitchSize[1] / 6)];
                    opposition.players[7].startPOS = [opposition.players[7].originPOS[0], opposition.players[7].originPOS[1] + (matchDetails.pitchSize[1] / 6)];
                    opposition.players[8].startPOS = [opposition.players[8].originPOS[0], opposition.players[8].originPOS[1] + (matchDetails.pitchSize[1] / 6)];
                } else if (ballPosition[1] > (matchDetails.pitchSize[1] / 2) && ballPosition[1] < (matchDetails.pitchSize[1] - (matchDetails.pitchSize[1] / 3))) {
                    //ball in own half and opposition is at the bottom of pitch
                    if (ballPosition[0] > matchDetails.pitchSize[0] / 2) {
                        matchDetails.ball.direction = "northwest";
                    } else if (ballPosition[0] < matchDetails.pitchSize[0] / 2) {
                        matchDetails.ball.direction = "northeast";
                    } else {
                        matchDetails.ball.direction = "north";
                    }
                    const level = Common.getRandomNumber(matchDetails.pitchSize[1] / 2, 200);
                    team.players[1].startPOS = [team.players[1].originPOS[0], team.players[5].startPOS[1] + (matchDetails.pitchSize[1] / 6)];
                    team.players[2].startPOS = [team.players[2].originPOS[0], team.players[5].startPOS[1] + (matchDetails.pitchSize[1] / 6)];
                    team.players[3].startPOS = [team.players[3].originPOS[0], team.players[5].startPOS[1] + (matchDetails.pitchSize[1] / 6)];
                    team.players[4].startPOS = [team.players[4].originPOS[0], team.players[5].startPOS[1] + (matchDetails.pitchSize[1] / 6)];
                    team.players[6].startPOS = [team.players[6].originPOS[0], level];
                    team.players[7].startPOS = [team.players[7].originPOS[0], level];
                    team.players[8].startPOS = [team.players[8].originPOS[0], level];
                    team.players[9].startPOS = [team.players[9].originPOS[0], level - (matchDetails.pitchSize[1] / 6)];
                    team.players[10].startPOS = [team.players[10].originPOS[0], level - (matchDetails.pitchSize[1] / 6)];
                    opposition.players[1].startPOS = [opposition.players[1].originPOS[0], opposition.players[1].originPOS[1] + (matchDetails.pitchSize[1] / 7)];
                    opposition.players[2].startPOS = [opposition.players[2].originPOS[0], opposition.players[2].originPOS[1] + (matchDetails.pitchSize[1] / 7)];
                    opposition.players[3].startPOS = [opposition.players[3].originPOS[0], opposition.players[3].originPOS[1] + (matchDetails.pitchSize[1] / 7)];
                    opposition.players[4].startPOS = [opposition.players[4].originPOS[0], opposition.players[4].originPOS[1] + (matchDetails.pitchSize[1] / 7)];
                    opposition.players[5].startPOS = [opposition.players[5].originPOS[0], opposition.players[5].originPOS[1] + (matchDetails.pitchSize[1] / 6)];
                    opposition.players[6].startPOS = [opposition.players[6].originPOS[0], opposition.players[6].originPOS[1] + (matchDetails.pitchSize[1] / 6)];
                    opposition.players[7].startPOS = [opposition.players[7].originPOS[0], opposition.players[7].originPOS[1] + (matchDetails.pitchSize[1] / 6)];
                    opposition.players[8].startPOS = [opposition.players[8].originPOS[0], opposition.players[8].originPOS[1] + (matchDetails.pitchSize[1] / 6)];
                    opposition.players[9].startPOS = [opposition.players[9].originPOS[0], opposition.players[9].originPOS[1] + (matchDetails.pitchSize[1] / 6)];
                    opposition.players[10].startPOS = [opposition.players[10].originPOS[0], opposition.players[10].originPOS[1] + (matchDetails.pitchSize[1] / 6)];
                } else if (ballPosition[1] < (matchDetails.pitchSize[1] / 2) && ballPosition[1] > (matchDetails.pitchSize[1] / 6)) {
                    //between halfway and last sixth
                    const level = Math.round(Common.getRandomNumber((matchDetails.pitchSize[1] / 9), ballPosition[1] + 15));
                    team.players[0].startPOS = [team.players[0].originPOS[0], team.players[5].startPOS[1] + (matchDetails.pitchSize[1] / 3)];
                    team.players[1].startPOS = [team.players[1].originPOS[0], team.players[5].startPOS[1] + (matchDetails.pitchSize[1] / 6)];
                    team.players[2].startPOS = [team.players[2].originPOS[0], team.players[5].startPOS[1] + (matchDetails.pitchSize[1] / 6)];
                    team.players[3].startPOS = [team.players[3].originPOS[0], team.players[5].startPOS[1] + (matchDetails.pitchSize[1] / 6)];
                    team.players[4].startPOS = [team.players[4].originPOS[0], team.players[5].startPOS[1] + (matchDetails.pitchSize[1] / 6)];
                    team.players[6].startPOS = [team.players[6].originPOS[0], level];
                    team.players[7].startPOS = [team.players[7].originPOS[0], level];
                    team.players[8].startPOS = [team.players[8].originPOS[0], level];
                    team.players[9].startPOS = [team.players[9].originPOS[0], Common.getRandomNumber(5, level - 20)];
                    team.players[10].startPOS = [team.players[10].originPOS[0], Common.getRandomNumber(5, level - 20)];
                    if (ballPosition[0] > matchDetails.pitchSize[0] / 2) {
                        matchDetails.ball.direction = "northwest";
                        const midGoal = matchDetails.pitchSize[0] / 2;
                        opposition.players[5].startPOS = [(tempArray[0] + ((midGoal - tempArray[0]) / 2)), tempArray[1] - 60];
                        opposition.players[6].startPOS = [tempArray[0] + ((midGoal - tempArray[0]) / 2), tempArray[1] - 30];
                        opposition.players[7].startPOS = [tempArray[0], tempArray[1] - 30];
                        opposition.players[8].startPOS = [team.players[10].startPOS[0] + 2, team.players[10].startPOS[0] - 2];
                        opposition.players[9].startPOS = [(tempArray[0] + ((midGoal - tempArray[0]) / 2) + 2), tempArray[1] - 30];
                        opposition.players[10].startPOS = [(tempArray[0] + ((midGoal - tempArray[0]) / 2) - 2), tempArray[1] - 30];
                    } else if (ballPosition[0] < matchDetails.pitchSize[0] / 2) {
                        matchDetails.ball.direction = "northeast";
                        var midGoal = matchDetails.pitchSize[0] / 2;
                        opposition.players[5].startPOS = [tempArray[0] + ((midGoal - tempArray[0]) / 2), tempArray[1] - 60];
                        opposition.players[6].startPOS = [tempArray[0] + ((midGoal - tempArray[0]) / 2), tempArray[1] - 30];
                        opposition.players[7].startPOS = [tempArray[0], tempArray[1] - 30];
                        opposition.players[8].startPOS = [team.players[10].startPOS[0] + 2, team.players[10].startPOS[0] - 2];
                        opposition.players[9].startPOS = [(tempArray[0] + ((midGoal - tempArray[0]) / 2) + 2), tempArray[1] - 30];
                        opposition.players[10].startPOS = [(tempArray[0] + ((midGoal - tempArray[0]) / 2) - 2), tempArray[1] - 30];
                    } else {
                        matchDetails.ball.direction = "north";
                        opposition.players[5].startPOS = [tempArray[0], tempArray[1] - 60];
                        opposition.players[6].startPOS = [tempArray[0], tempArray[1] - 30];
                        opposition.players[7].startPOS = [tempArray[0] + 20, tempArray[1] - 20];
                        opposition.players[8].startPOS = [team.players[10].startPOS[0] - 2, team.players[10].startPOS[0] + 2];
                        opposition.players[9].startPOS = [tempArray[0] - 2, tempArray[1] - 30];
                        opposition.players[10].startPOS = [tempArray[0] + 2, tempArray[1] - 30];
                    }
                } else {
                    //in the last sixth
                    team.players[0].startPOS = [team.players[0].originPOS[0], team.players[0].originPOS[1] - (matchDetails.pitchSize[1] / 3)];
                    team.players[2].startPOS = [team.players[2].originPOS[0], team.players[2].originPOS[1] - (matchDetails.pitchSize[1] / 2)];
                    team.players[3].startPOS = [team.players[3].originPOS[0], team.players[3].originPOS[1] - (matchDetails.pitchSize[1] / 2)];
                    team.players[1].startPOS = [Common.getRandomNumber((matchDetails.pitchSize[0] / 4) - 5, (matchDetails.pitchSize[0] - (matchDetails.pitchSize[0] / 4) + 5)), Common.getRandomNumber(0, (matchDetails.pitchSize[1] / 6) - 5)];
                    team.players[4].startPOS = [Common.getRandomNumber((matchDetails.pitchSize[0] / 4) - 5, (matchDetails.pitchSize[0] - (matchDetails.pitchSize[0] / 4) + 5)), Common.getRandomNumber(0, (matchDetails.pitchSize[1] / 6) - 5)];
                    team.players[6].startPOS = [Common.getRandomNumber((matchDetails.pitchSize[0] / 4) - 5, (matchDetails.pitchSize[0] - (matchDetails.pitchSize[0] / 4) + 5)), Common.getRandomNumber(0, (matchDetails.pitchSize[1] / 6) - 5)];
                    team.players[7].startPOS = [Common.getRandomNumber((matchDetails.pitchSize[0] / 4) - 5, (matchDetails.pitchSize[0] - (matchDetails.pitchSize[0] / 4) + 5)), Common.getRandomNumber(0, (matchDetails.pitchSize[1] / 6) - 5)];
                    team.players[8].startPOS = [Common.getRandomNumber((matchDetails.pitchSize[0] / 4) - 5, (matchDetails.pitchSize[0] - (matchDetails.pitchSize[0] / 4) + 5)), Common.getRandomNumber(0, (matchDetails.pitchSize[1] / 6) - 5)];
                    team.players[9].startPOS = [Common.getRandomNumber((matchDetails.pitchSize[0] / 4) - 5, (matchDetails.pitchSize[0] - (matchDetails.pitchSize[0] / 4) + 5)), Common.getRandomNumber(0, (matchDetails.pitchSize[1] / 6) - 5)];
                    team.players[10].startPOS = [Common.getRandomNumber((matchDetails.pitchSize[0] / 4) - 5, (matchDetails.pitchSize[0] - (matchDetails.pitchSize[0] / 4) + 5)), Common.getRandomNumber(0, (matchDetails.pitchSize[1] / 6) - 5)];
                    opposition.players[1].startPOS = [(matchDetails.pitchSize[0] / 2) - 15, 10];
                    opposition.players[2].startPOS = [(matchDetails.pitchSize[0] / 2) - 5, 10];
                    opposition.players[3].startPOS = [(matchDetails.pitchSize[0] / 2) + 5, 10];
                    opposition.players[4].startPOS = [(matchDetails.pitchSize[0] / 2) + 15, 10];
                    if (ballPosition[0] > matchDetails.pitchSize[0] / 2) {
                        const midGoal = matchDetails.pitchSize[0] / 2;
                        matchDetails.ball.direction = "northwest";
                        if (tempArray[1] < 15) {
                            opposition.players[5].startPOS = [tempArray[0] + ((midGoal - tempArray[0]) / 2), tempArray[1]];
                            opposition.players[6].startPOS = [tempArray[0] + ((midGoal - tempArray[0]) / 2), tempArray[1] + 2];
                            opposition.players[7].startPOS = [tempArray[0] + ((midGoal - tempArray[0]) / 2), tempArray[1] + 4];
                        } else {
                            opposition.players[5].startPOS = [tempArray[0] + ((midGoal - tempArray[0]) / 2), tempArray[1] - 10];
                            opposition.players[6].startPOS = [tempArray[0] + ((midGoal - tempArray[0]) / 2), tempArray[1] - 12];
                            opposition.players[7].startPOS = [tempArray[0] + ((midGoal - tempArray[0]) / 2), tempArray[1] - 14];
                        }
                        opposition.players[8].startPOS = [Common.getRandomNumber((matchDetails.pitchSize[0] / 4) - 5, (matchDetails.pitchSize[0] - (matchDetails.pitchSize[0] / 4) + 5)), Common.getRandomNumber(0, (matchDetails.pitchSize[1] / 6) - 5)];
                        opposition.players[9].startPOS = [Common.getRandomNumber((matchDetails.pitchSize[0] / 4) - 5, (matchDetails.pitchSize[0] - (matchDetails.pitchSize[0] / 4) + 5)), Common.getRandomNumber(0, (matchDetails.pitchSize[1] / 6) - 5)];
                        opposition.players[10].startPOS = [matchDetails.pitchSize[0] / 2, 20];
                    } else if (ballPosition[0] < matchDetails.pitchSize[0] / 2) {
                        var midGoal = matchDetails.pitchSize[0] / 2;
                        matchDetails.ball.direction = "northeast";
                        if (tempArray[1] < 15) {
                            opposition.players[8].startPOS = [tempArray[0] + ((midGoal - tempArray[0]) / 2), tempArray[1]];
                            opposition.players[6].startPOS = [tempArray[0] + ((midGoal - tempArray[0]) / 2), tempArray[1] + 2];
                            opposition.players[7].startPOS = [tempArray[0] + ((midGoal - tempArray[0]) / 2), tempArray[1] + 4];
                        } else {
                            opposition.players[8].startPOS = [tempArray[0] + ((midGoal - tempArray[0]) / 2), tempArray[1] - 10];
                            opposition.players[6].startPOS = [tempArray[0] + ((midGoal - tempArray[0]) / 2), tempArray[1] - 12];
                            opposition.players[7].startPOS = [tempArray[0] + ((midGoal - tempArray[0]) / 2), tempArray[1] - 14];
                        }
                        opposition.players[5].startPOS = [Common.getRandomNumber((matchDetails.pitchSize[0] / 4) - 5, (matchDetails.pitchSize[0] - (matchDetails.pitchSize[0] / 4) - 5)), Common.getRandomNumber(0, (matchDetails.pitchSize[1] / 6) - 5)];
                        opposition.players[9].startPOS = [Common.getRandomNumber((matchDetails.pitchSize[0] / 4) - 5, (matchDetails.pitchSize[0] - (matchDetails.pitchSize[0] / 4) - 5)), Common.getRandomNumber(0, (matchDetails.pitchSize[1] / 6) - 5)];
                        opposition.players[10].startPOS = [matchDetails.pitchSize[0] / 2, 20];
                    } else {
                        matchDetails.ball.direction = "north";
                        opposition.players[5].startPOS = [(matchDetails.pitchSize[0] / 2) - 4, tempArray[1] - 40];
                        opposition.players[6].startPOS = [(matchDetails.pitchSize[0] / 2) - 2, tempArray[1] - 40];
                        opposition.players[7].startPOS = [(matchDetails.pitchSize[0] / 2), tempArray[1] - 40];
                        opposition.players[8].startPOS = [(matchDetails.pitchSize[0] / 2) + 2, tempArray[1] - 40];
                        opposition.players[9].startPOS = [(matchDetails.pitchSize[0] / 2) + 4, tempArray[1] - 40];
                        opposition.players[10].startPOS = [(matchDetails.pitchSize[0] / 2), 30];
                    }
                }
            } else {
                //other team
                //shooting to bottom of pitch
                if (ballPosition[1] < (matchDetails.pitchSize[1] / 3)) {
                    matchDetails.ball.Player = team.players[0].name;
                    team.players[0].hasBall = true;
                    team.players[0].startPOS = tempArray.map(x => x);
                    team.players[1].startPOS = [team.players[1].originPOS[0], ((matchDetails.pitchSize[1] / 6) + team.players[0].startPOS[1] + team.players[1].originPOS[1])];
                    team.players[2].startPOS = [team.players[2].originPOS[0], ((matchDetails.pitchSize[1] / 6) + team.players[0].startPOS[1] + team.players[2].originPOS[1])];
                    team.players[3].startPOS = [team.players[3].originPOS[0], ((matchDetails.pitchSize[1] / 6) + team.players[0].startPOS[1] + team.players[3].originPOS[1])];
                    team.players[4].startPOS = [team.players[4].originPOS[0], ((matchDetails.pitchSize[1] / 6) + team.players[0].startPOS[1] + team.players[4].originPOS[1])];
                    team.players[5].startPOS = [team.players[5].originPOS[0], ((matchDetails.pitchSize[1] / 6) + team.players[0].startPOS[1] + team.players[5].originPOS[1])];
                    team.players[6].startPOS = [team.players[6].originPOS[0], ((matchDetails.pitchSize[1] / 6) + team.players[0].startPOS[1] + team.players[6].originPOS[1])];
                    team.players[7].startPOS = [team.players[7].originPOS[0], ((matchDetails.pitchSize[1] / 6) + team.players[0].startPOS[1] + team.players[7].originPOS[1])];
                    team.players[8].startPOS = [team.players[8].originPOS[0], ((matchDetails.pitchSize[1] / 6) + team.players[0].startPOS[1] + team.players[8].originPOS[1])];
                    team.players[9].startPOS = [team.players[9].originPOS[0], ((matchDetails.pitchSize[1] / 6) + team.players[0].startPOS[1] + team.players[9].originPOS[1])];
                    team.players[10].startPOS = [team.players[10].originPOS[0], ((matchDetails.pitchSize[1] / 6) + team.players[0].startPOS[1] + team.players[10].originPOS[1])];
                    opposition.players[1].startPOS = [opposition.players[1].originPOS[0], opposition.players[1].originPOS[1] - (matchDetails.pitchSize[1] / 6)];
                    opposition.players[2].startPOS = [opposition.players[2].originPOS[0], opposition.players[2].originPOS[1] - (matchDetails.pitchSize[1] / 6)];
                    opposition.players[3].startPOS = [opposition.players[3].originPOS[0], opposition.players[3].originPOS[1] - (matchDetails.pitchSize[1] / 6)];
                    opposition.players[4].startPOS = [opposition.players[4].originPOS[0], opposition.players[4].originPOS[1] - (matchDetails.pitchSize[1] / 6)];
                    opposition.players[9].startPOS = [opposition.players[9].originPOS[0] + 10, team.players[1].startPOS[1]];
                    opposition.players[10].startPOS = [opposition.players[10].originPOS[0] + 10, team.players[1].startPOS[1]];
                    opposition.players[5].startPOS = [opposition.players[5].originPOS[0], opposition.players[5].originPOS[1] - (matchDetails.pitchSize[1] / 6)];
                    opposition.players[6].startPOS = [opposition.players[6].originPOS[0], opposition.players[6].originPOS[1] - (matchDetails.pitchSize[1] / 6)];
                    opposition.players[7].startPOS = [opposition.players[7].originPOS[0], opposition.players[7].originPOS[1] - (matchDetails.pitchSize[1] / 6)];
                    opposition.players[8].startPOS = [opposition.players[8].originPOS[0], opposition.players[8].originPOS[1] - (matchDetails.pitchSize[1] / 6)];
                } else if (ballPosition[1] < (matchDetails.pitchSize[1] / 2) && ballPosition[1] > (matchDetails.pitchSize[1] / 3)) {
                    //ball in own half and opposition is at the bottom of pitch
                    if (ballPosition[0] > matchDetails.pitchSize[0] / 2) {
                        matchDetails.ball.direction = "southwest";
                    } else if (ballPosition[0] < matchDetails.pitchSize[0] / 2) {
                        matchDetails.ball.direction = "southeast";
                    } else {
                        matchDetails.ball.direction = "south";
                    }
                    const level = Common.getRandomNumber(matchDetails.pitchSize[1] / 2, matchDetails.pitchSize[1] - 200);
                    team.players[1].startPOS = [team.players[1].originPOS[0], team.players[5].startPOS[1] - (matchDetails.pitchSize[1] / 6)];
                    team.players[2].startPOS = [team.players[2].originPOS[0], team.players[5].startPOS[1] - (matchDetails.pitchSize[1] / 6)];
                    team.players[3].startPOS = [team.players[3].originPOS[0], team.players[5].startPOS[1] - (matchDetails.pitchSize[1] / 6)];
                    team.players[4].startPOS = [team.players[4].originPOS[0], team.players[5].startPOS[1] - (matchDetails.pitchSize[1] / 6)];
                    team.players[6].startPOS = [team.players[6].originPOS[0], level];
                    team.players[7].startPOS = [team.players[7].originPOS[0], level];
                    team.players[8].startPOS = [team.players[8].originPOS[0], level];
                    team.players[9].startPOS = [team.players[9].originPOS[0], level + (matchDetails.pitchSize[1] / 6)];
                    team.players[10].startPOS = [team.players[10].originPOS[0], level + (matchDetails.pitchSize[1] / 6)];
                    opposition.players[1].startPOS = [opposition.players[1].originPOS[0], opposition.players[1].originPOS[1] - (matchDetails.pitchSize[1] / 7)];
                    opposition.players[2].startPOS = [opposition.players[2].originPOS[0], opposition.players[2].originPOS[1] - (matchDetails.pitchSize[1] / 7)];
                    opposition.players[3].startPOS = [opposition.players[3].originPOS[0], opposition.players[3].originPOS[1] - (matchDetails.pitchSize[1] / 7)];
                    opposition.players[4].startPOS = [opposition.players[4].originPOS[0], opposition.players[4].originPOS[1] - (matchDetails.pitchSize[1] / 7)];
                    opposition.players[5].startPOS = [opposition.players[5].originPOS[0], opposition.players[5].originPOS[1] - (matchDetails.pitchSize[1] / 6)];
                    opposition.players[6].startPOS = [opposition.players[6].originPOS[0], opposition.players[6].originPOS[1] - (matchDetails.pitchSize[1] / 6)];
                    opposition.players[7].startPOS = [opposition.players[7].originPOS[0], opposition.players[7].originPOS[1] - (matchDetails.pitchSize[1] / 6)];
                    opposition.players[8].startPOS = [opposition.players[8].originPOS[0], opposition.players[8].originPOS[1] - (matchDetails.pitchSize[1] / 6)];
                    opposition.players[9].startPOS = [opposition.players[9].originPOS[0], opposition.players[9].originPOS[1] - (matchDetails.pitchSize[1] / 6)];
                    opposition.players[10].startPOS = [opposition.players[10].originPOS[0], opposition.players[10].originPOS[1] - (matchDetails.pitchSize[1] / 6)];
                } else if (ballPosition[1] > (matchDetails.pitchSize[1] / 2) && ballPosition[1] < (matchDetails.pitchSize[1] - (matchDetails.pitchSize[1] / 6))) {
                    //between halfway and last sixth
                    const level = Math.round(Common.getRandomNumber(ballPosition[1] + 15, (matchDetails.pitchSize[1] - matchDetails.pitchSize[1] / 9)));
                    team.players[0].startPOS = [team.players[0].originPOS[0], team.players[5].startPOS[1] - (matchDetails.pitchSize[1] / 3)];
                    team.players[1].startPOS = [team.players[1].originPOS[0], team.players[5].startPOS[1] - (matchDetails.pitchSize[1] / 6)];
                    team.players[2].startPOS = [team.players[2].originPOS[0], team.players[5].startPOS[1] - (matchDetails.pitchSize[1] / 6)];
                    team.players[3].startPOS = [team.players[3].originPOS[0], team.players[5].startPOS[1] - (matchDetails.pitchSize[1] / 6)];
                    team.players[4].startPOS = [team.players[4].originPOS[0], team.players[5].startPOS[1] - (matchDetails.pitchSize[1] / 6)];
                    team.players[6].startPOS = [team.players[6].originPOS[0], level];
                    team.players[7].startPOS = [team.players[7].originPOS[0], level];
                    team.players[8].startPOS = [team.players[8].originPOS[0], level];
                    team.players[9].startPOS = [team.players[9].originPOS[0], level + (matchDetails.pitchSize[1] / 6)];
                    team.players[10].startPOS = [team.players[10].originPOS[0], level + (matchDetails.pitchSize[1] / 6)];
                    if (ballPosition[0] > matchDetails.pitchSize[0] / 2) {
                        matchDetails.ball.direction = "southwest";
                        var midGoal = matchDetails.pitchSize[0] / 2;
                        opposition.players[5].startPOS = [(tempArray[0] + ((midGoal - tempArray[0]) / 2)), tempArray[1] + 60];
                        opposition.players[6].startPOS = [tempArray[0] + ((midGoal - tempArray[0]) / 2), tempArray[1] + 30];
                        opposition.players[7].startPOS = [tempArray[0], tempArray[1] + 30];
                        opposition.players[8].startPOS = [team.players[10].startPOS[0] + 2, team.players[10].startPOS[0] + 2];
                        opposition.players[9].startPOS = [(tempArray[0] + ((midGoal - tempArray[0]) / 2) + 2), tempArray[1] + 30];
                        opposition.players[10].startPOS = [(tempArray[0] + ((midGoal - tempArray[0]) / 2) - 2), tempArray[1] + 30];
                    } else if (ballPosition[0] < matchDetails.pitchSize[0] / 2) {
                        matchDetails.ball.direction = "southeast";
                        var midGoal = matchDetails.pitchSize[0] / 2;
                        opposition.players[5].startPOS = [tempArray[0] + ((midGoal - tempArray[0]) / 2), tempArray[1] + 60];
                        opposition.players[6].startPOS = [tempArray[0] + ((midGoal - tempArray[0]) / 2), tempArray[1] + 30];
                        opposition.players[7].startPOS = [tempArray[0], tempArray[1] + 30];
                        opposition.players[8].startPOS = [team.players[10].startPOS[0] + 2, team.players[10].startPOS[0] + 2];
                        opposition.players[9].startPOS = [(tempArray[0] + ((midGoal - tempArray[0]) / 2) + 2), tempArray[1] + 30];
                        opposition.players[10].startPOS = [(tempArray[0] + ((midGoal - tempArray[0]) / 2) - 2), tempArray[1] + 30];
                    } else {
                        matchDetails.ball.direction = "south";
                        opposition.players[5].startPOS = [tempArray[0], tempArray[1] + 60];
                        opposition.players[6].startPOS = [tempArray[0], tempArray[1] + 30];
                        opposition.players[7].startPOS = [tempArray[0] + 20, tempArray[1] + 20];
                        opposition.players[8].startPOS = [team.players[10].startPOS[0] + 2, team.players[10].startPOS[0] + 2];
                        opposition.players[9].startPOS = [tempArray[0] - 2, tempArray[1] + 30];
                        opposition.players[10].startPOS = [tempArray[0] + 2, tempArray[1] + 30];
                    }
                } else {
                    //in the last sixth
                    team.players[0].startPOS = [team.players[0].originPOS[0], team.players[0].originPOS[1] + (matchDetails.pitchSize[1] / 3)];
                    team.players[2].startPOS = [team.players[2].originPOS[0], team.players[2].originPOS[1] + (matchDetails.pitchSize[1] / 2)];
                    team.players[3].startPOS = [team.players[3].originPOS[0], team.players[3].originPOS[1] + (matchDetails.pitchSize[1] / 2)];
                    team.players[1].startPOS = [Common.getRandomNumber((matchDetails.pitchSize[0] / 4) - 5, (matchDetails.pitchSize[0] - (matchDetails.pitchSize[0] / 4) + 5)), Common.getRandomNumber(matchDetails.pitchSize[1] - (matchDetails.pitchSize[1] / 6) + 5, matchDetails.pitchSize[1])];
                    team.players[4].startPOS = [Common.getRandomNumber((matchDetails.pitchSize[0] / 4) - 5, (matchDetails.pitchSize[0] - (matchDetails.pitchSize[0] / 4) + 5)), Common.getRandomNumber(matchDetails.pitchSize[1] - (matchDetails.pitchSize[1] / 6) + 5, matchDetails.pitchSize[1])];
                    team.players[6].startPOS = [Common.getRandomNumber((matchDetails.pitchSize[0] / 4) - 5, (matchDetails.pitchSize[0] - (matchDetails.pitchSize[0] / 4) + 5)), Common.getRandomNumber(matchDetails.pitchSize[1] - (matchDetails.pitchSize[1] / 6) + 5, matchDetails.pitchSize[1])];
                    team.players[7].startPOS = [Common.getRandomNumber((matchDetails.pitchSize[0] / 4) - 5, (matchDetails.pitchSize[0] - (matchDetails.pitchSize[0] / 4) + 5)), Common.getRandomNumber(matchDetails.pitchSize[1] - (matchDetails.pitchSize[1] / 6) + 5, matchDetails.pitchSize[1])];
                    team.players[8].startPOS = [Common.getRandomNumber((matchDetails.pitchSize[0] / 4) - 5, (matchDetails.pitchSize[0] - (matchDetails.pitchSize[0] / 4) + 5)), Common.getRandomNumber(matchDetails.pitchSize[1] - (matchDetails.pitchSize[1] / 6) + 5, matchDetails.pitchSize[1])];
                    team.players[9].startPOS = [Common.getRandomNumber((matchDetails.pitchSize[0] / 4) - 5, (matchDetails.pitchSize[0] - (matchDetails.pitchSize[0] / 4) + 5)), Common.getRandomNumber(matchDetails.pitchSize[1] - (matchDetails.pitchSize[1] / 6) + 5, matchDetails.pitchSize[1])];
                    team.players[10].startPOS = [Common.getRandomNumber((matchDetails.pitchSize[0] / 4) - 5, (matchDetails.pitchSize[0] - (matchDetails.pitchSize[0] / 4) + 5)), Common.getRandomNumber(matchDetails.pitchSize[1] - (matchDetails.pitchSize[1] / 6) + 5, matchDetails.pitchSize[1])];
                    opposition.players[1].startPOS = [(matchDetails.pitchSize[0] / 2) - 15, matchDetails.pitchSize[1] - 10];
                    opposition.players[2].startPOS = [(matchDetails.pitchSize[0] / 2) - 5, matchDetails.pitchSize[1] - 10];
                    opposition.players[3].startPOS = [(matchDetails.pitchSize[0] / 2) + 5, matchDetails.pitchSize[1] - 10];
                    opposition.players[4].startPOS = [(matchDetails.pitchSize[0] / 2) + 15, matchDetails.pitchSize[1] - 10];
                    if (ballPosition[0] > matchDetails.pitchSize[0] / 2) {
                        const midGoal = matchDetails.pitchSize[0] / 2;
                        matchDetails.ball.direction = "southwest";
                        if (tempArray[1] > (matchDetails.pitchSize[1] - 15)) {
                            opposition.players[5].startPOS = [tempArray[0] + ((midGoal - tempArray[0]) / 2), tempArray[1]];
                            opposition.players[6].startPOS = [tempArray[0] + ((midGoal - tempArray[0]) / 2), tempArray[1] - 2];
                            opposition.players[7].startPOS = [tempArray[0] + ((midGoal - tempArray[0]) / 2), tempArray[1] - 4];
                        } else {
                            opposition.players[5].startPOS = [tempArray[0] + ((midGoal - tempArray[0]) / 2), tempArray[1] + 10];
                            opposition.players[6].startPOS = [tempArray[0] + ((midGoal - tempArray[0]) / 2), tempArray[1] + 12];
                            opposition.players[7].startPOS = [tempArray[0] + ((midGoal - tempArray[0]) / 2), tempArray[1] + 14];
                        }
                        opposition.players[8].startPOS = [Common.getRandomNumber((matchDetails.pitchSize[0] / 4) - 5, (matchDetails.pitchSize[0] - (matchDetails.pitchSize[0] / 4) + 5)), Common.getRandomNumber(matchDetails.pitchSize[1] - (matchDetails.pitchSize[1] / 6) + 5, matchDetails.pitchSize[1])];
                        opposition.players[9].startPOS = [Common.getRandomNumber((matchDetails.pitchSize[0] / 4) - 5, (matchDetails.pitchSize[0] - (matchDetails.pitchSize[0] / 4) + 5)), Common.getRandomNumber(matchDetails.pitchSize[1] - (matchDetails.pitchSize[1] / 6) + 5, matchDetails.pitchSize[1])];
                        opposition.players[10].startPOS = [matchDetails.pitchSize[0] / 2, matchDetails.pitchSize[1] + 20];
                    } else if (ballPosition[0] < matchDetails.pitchSize[0] / 2) {
                        var midGoal = matchDetails.pitchSize[0] / 2;
                        matchDetails.ball.direction = "southeast";
                        if (tempArray[1] > (matchDetails.pitchSize[1] - 15)) {
                            opposition.players[8].startPOS = [tempArray[0] + ((midGoal - tempArray[0]) / 2), tempArray[1]];
                            opposition.players[6].startPOS = [tempArray[0] + ((midGoal - tempArray[0]) / 2), tempArray[1] - 2];
                            opposition.players[7].startPOS = [tempArray[0] + ((midGoal - tempArray[0]) / 2), tempArray[1] - 4];
                        } else {
                            opposition.players[8].startPOS = [tempArray[0] + ((midGoal - tempArray[0]) / 2), tempArray[1] + 10];
                            opposition.players[6].startPOS = [tempArray[0] + ((midGoal - tempArray[0]) / 2), tempArray[1] + 12];
                            opposition.players[7].startPOS = [tempArray[0] + ((midGoal - tempArray[0]) / 2), tempArray[1] + 14];
                        }
                        opposition.players[5].startPOS = [Common.getRandomNumber((matchDetails.pitchSize[0] / 4) - 5, (matchDetails.pitchSize[0] - (matchDetails.pitchSize[0] / 4) + 5)), Common.getRandomNumber(matchDetails.pitchSize[1] - (matchDetails.pitchSize[1] / 6) + 5, matchDetails.pitchSize[1])];
                        opposition.players[9].startPOS = [Common.getRandomNumber((matchDetails.pitchSize[0] / 4) - 5, (matchDetails.pitchSize[0] - (matchDetails.pitchSize[0] / 4) + 5)), Common.getRandomNumber(matchDetails.pitchSize[1] - (matchDetails.pitchSize[1] / 6) + 5, matchDetails.pitchSize[1])];
                        opposition.players[10].startPOS = [matchDetails.pitchSize[0] / 2, matchDetails.pitchSize[1] + 20];
                    } else {
                        matchDetails.ball.direction = "south";
                        opposition.players[5].startPOS = [(matchDetails.pitchSize[0] / 2) - 4, tempArray[1] + 40];
                        opposition.players[6].startPOS = [(matchDetails.pitchSize[0] / 2) - 2, tempArray[1] + 40];
                        opposition.players[7].startPOS = [(matchDetails.pitchSize[0] / 2), tempArray[1] + 40];
                        opposition.players[8].startPOS = [(matchDetails.pitchSize[0] / 2) + 2, tempArray[1] + 40];
                        opposition.players[9].startPOS = [(matchDetails.pitchSize[0] / 2) + 4, tempArray[1] + 40];
                        opposition.players[10].startPOS = [(matchDetails.pitchSize[0] / 2), matchDetails.pitchSize[1] - 30];
                    }
                }
            }
            resolve();
        });
    }// end SetFreeKick

    /**
     * 
     * @param scoringTeam
     * @param conceedingTeam
     * @param matchDetails
     * @returns {Promise<any>}
     */
    setGoalScored(scoringTeam, conceedingTeam, matchDetails) {
        return new Promise((resolve, reject) => {
            setVariables.resetPlayerPositions(scoringTeam).then(() => {
                setVariables.resetPlayerPositions(conceedingTeam).then(() => {
                    let playerWithBall = Common.getRandomNumber(9, 10);
                    let waitingPlayer;
                    if (playerWithBall === 9) {
                        waitingPlayer = 10;
                    } else {
                        waitingPlayer = 9;
                    }
                    matchDetails.ball.position = [matchDetails.pitchSize[0] / 2, matchDetails.pitchSize[1] / 2];
                    conceedingTeam.players[playerWithBall].startPOS = matchDetails.ball.position.map(x => x);
                    conceedingTeam.players[playerWithBall].hasBall = true;
                    matchDetails.ball.withPlayer = true;
                    matchDetails.ball.Player = conceedingTeam.players[playerWithBall].name;
                    matchDetails.ball.withTeam = conceedingTeam.name;
                    const tempPosition = [matchDetails.ball.position[0] + 20, matchDetails.ball.position[1]];
                    conceedingTeam.players[waitingPlayer].startPOS = tempPosition.map(x => x);
                    conceedingTeam.intent = "attack";
                    scoringTeam.intent = "defend";
                    resolve();
                }).catch((error) => {
                    console.error("Error when resetting player positions: ", error);
                    console.error(matchDetails.iterationLog);
                });
            }).catch((error) => {
                console.error("Error when resetting player positions: ", error);
                console.error(matchDetails.iterationLog);
            });
        });
    }// end setGoalScored

    /**
     *
     * @param ballIntended
     * @param kickersSide
     * @param matchDetails
     * @param kickOffTeam
     * @param secondTeam
     * @returns {Promise<any>}
     */
    keepInBoundaries(ballIntended, kickersSide, matchDetails, kickOffTeam, secondTeam) {
        return new Promise((resolve, reject) => {
            if (ballIntended[0] < 0 || ballIntended[0] > matchDetails.pitchSize[0] || ballIntended[1] < 0 || ballIntended[1] > matchDetails.pitchSize[1]) {
                if (ballIntended[0] < 0) {
                    if (kickersSide > matchDetails.pitchSize[1] / 2) {
                        this.setThrowIn(kickOffTeam, secondTeam, "left", ballIntended[1], matchDetails).then((ballIntended) => {
                            matchDetails.iterationLog.push("Throw in to - " + kickOffTeam.name);
                            resolve(ballIntended);
                        }).catch((error) => {
                            console.error("Error when setting up for a throwin: ", error);
                            console.error(matchDetails.iterationLog);
                        });
                    } else {
                        this.setThrowIn(secondTeam, kickOffTeam, "left", ballIntended[1], matchDetails).then((ballIntended) => {
                            matchDetails.iterationLog.push("Throw in to - " + secondTeam.name);
                            resolve(ballIntended);
                        }).catch((error) => {
                            console.error("Error when setting up for a throwin: ", error);
                            console.error(matchDetails.iterationLog);
                        });
                    }
                } else if (ballIntended[0] > matchDetails.pitchSize[0]) {
                    if (kickersSide > matchDetails.pitchSize[1] / 2) {
                       this.setThrowIn(kickOffTeam, secondTeam, "right", ballIntended[1], matchDetails).then((ballIntended) => {
                            matchDetails.iterationLog.push("Throw in to - " + kickOffTeam.name);
                            resolve(ballIntended);
                        }).catch((error) => {
                            console.error("Error when setting up for a throwin: ", error);
                            console.error(matchDetails.iterationLog);
                        });
                    } else {
                        this.setThrowIn(secondTeam, kickOffTeam, "right", ballIntended[1], matchDetails).then((ballIntended) => {
                            matchDetails.iterationLog.push("Throw in to - " + secondTeam.name);
                            resolve(ballIntended);
                        }).catch((error) => {
                            console.error("Error when setting up for a throwin: ", error);
                            console.error(matchDetails.iterationLog);
                        });
                    }
                }
                if (ballIntended[1] < 0) {
                    let side;
                    if (ballIntended[0] > matchDetails.pitchSize[0] / 2) {
                        side = "right";
                    } else {
                        side = "left";
                    }
                    if (kickersSide > matchDetails.pitchSize[1] / 2) {
                        this.setGoalKick(kickOffTeam, secondTeam, matchDetails).then((ballIntended) => {
                            matchDetails.iterationLog.push("Goal Kick to - " + kickOffTeam.name);
                            resolve(ballIntended);
                        }).catch((error) => {
                            console.error("Error when setting the goal kick: ", error);
                            console.error(matchDetails.iterationLog);
                        });
                    } else {
                        this.setCornerPositions(secondTeam, kickOffTeam, side, matchDetails).then((ballIntended) => {
                            matchDetails.iterationLog.push("Corner to - " + secondTeam.name);
                            resolve(ballIntended);
                        }).catch((error) => {
                            console.error("Error when setting corner: ", error);
                            console.error(matchDetails.iterationLog);
                        });
                    }
                } else if (ballIntended[1] > matchDetails.pitchSize[1]) {
                    let side;
                    if (ballIntended[0] > matchDetails.pitchSize[0] / 2) {
                        side = "right";
                    } else {
                        side = "left";
                    }
                    if (kickersSide > matchDetails.pitchSize[1] / 2) {
                        this.setCornerPositions(kickOffTeam, secondTeam, side, matchDetails).then((ballIntended) => {
                            matchDetails.iterationLog.push("Corner to - " + kickOffTeam.name);
                            resolve(ballIntended);
                        }).catch((error) => {
                            console.error("Error when setting corner: ", error);
                            console.error(matchDetails.iterationLog);
                        });
                    } else {
                        this.setGoalKick(secondTeam, kickOffTeam, matchDetails).then((ballIntended) => {
                            matchDetails.iterationLog.push("Goal Kick to - " + secondTeam.name);
                            resolve(ballIntended);
                        }).catch((error) => {
                            console.error("Error when setting the goal kick: ", error);
                            console.error(matchDetails.iterationLog);
                        });
                    }
                }
            } else if (Common.isBetween(ballIntended[0], (matchDetails.pitchSize[0] / 2) - 20, (matchDetails.pitchSize[0] / 2) + 20)) {
                this.closestPlayerToPosition("none", kickOffTeam, ballIntended).then( (playerInformationA) => {
                    this.closestPlayerToPosition("none", secondTeam, ballIntended).then((playerInformationB) => {
                        let piA : IPlayerInformation = playerInformationA;
                        let piB : IPlayerInformation = playerInformationB;
                        let teamAPlayer = piA.thePlayer;
                        let teamBPlayer = piB.thePlayer;
                        if (teamAPlayer && teamAPlayer[0] === ballIntended[0] && teamAPlayer[1] === ballIntended[1]) {
                            teamAPlayer.hasBall = true;
                            matchDetails.ball.Player = teamAPlayer.name;
                            matchDetails.ball.withPlayer = true;
                            matchDetails.ball.withTeam = kickOffTeam.name;
                        } else if (teamBPlayer && teamBPlayer[0] === ballIntended[0] && teamBPlayer[1] === ballIntended[1]) {
                            teamBPlayer.hasBall = true;
                            matchDetails.ball.Player = teamBPlayer.name;
                            matchDetails.ball.withPlayer = true;
                            matchDetails.ball.withTeam = secondTeam.name;
                        } else {
                            if (ballIntended[1] > matchDetails.pitchSize[1]) {
                                ballIntended = [matchDetails.pitchSize[0] / 2, matchDetails.pitchSize[1] / 2];
                                if (matchDetails.half === 1) {
                                    this.setGoalScored(kickOffTeam, secondTeam, matchDetails).then(() => {
                                        matchDetails.kickOffTeamStatistics.goals++;
                                        resolve(ballIntended);
                                    }).catch((error) => {
                                        console.error("Error when processing the goal: ", error);
                                        console.error(matchDetails.iterationLog);
                                    });
                                } else {
                                    this.setGoalScored(secondTeam, kickOffTeam, matchDetails).then(() => {
                                        matchDetails.secondTeamStatistics.goals++;
                                        resolve(ballIntended);
                                    }).catch((error) => {
                                        console.error("Error when processing the goal: ", error);
                                        console.error(matchDetails.iterationLog);
                                    });
                                }
                            } else if (ballIntended[1] < 0) {
                                ballIntended = [matchDetails.pitchSize[0] / 2, matchDetails.pitchSize[1] / 2];
                                if (matchDetails.half === 1) {
                                    this.setGoalScored(secondTeam, kickOffTeam, matchDetails).then(() => {
                                        matchDetails.secondTeamStatistics.goals++;
                                        resolve(ballIntended);
                                    }).catch((error) => {
                                        console.error("Error when processing the goal: ", error);
                                        console.error(matchDetails.iterationLog);
                                    });
                                } else {
                                    this.setGoalScored(kickOffTeam, secondTeam, matchDetails).then(() => {
                                        matchDetails.kickOffTeamStatistics.goals++;
                                        resolve(ballIntended);
                                    }).catch((error) => {
                                        console.error("Error when processing the goal: ", error);
                                        console.error(matchDetails.iterationLog);
                                    });
                                }
                            } else {
                                resolve(ballIntended);
                            }
                        }
                    }).catch((error) => {
                        console.error("Error when finding the closest player to ball for accidental goal ", error);
                    })
                }).catch((error) => {
                    console.error("Error when finding the closest player to ball for accidental goal ", error);
                })
            } else {
                resolve(ballIntended);
            }
        });
    }// end keepIn Boundaries

    /**
     *
     * @param origin
     * @param current
     * @returns {Promise<any>}
     */
    formationCheck(origin, current) {
        return new Promise((resolve, reject) => {
            let xPos = origin[0] - current[0];
            let yPos = origin[1] - current[1];
            let moveToFormation = [];
            moveToFormation.push(xPos);
            moveToFormation.push(yPos);
            resolve(moveToFormation);
        });
    }//end formationCheck

    /**
     *
     * @param team
     * @param matchDetails
     * @returns {Promise<any>}
     */
    switchSide(team, matchDetails) {
        return new Promise((resolve, reject) => {
            if (!team) {
                reject("No Team supplied to switch side");
            }
            async.eachSeries(team.players, function eachPlayer(thisPlayer: IPlayer, thisPlayerCallback) {
                thisPlayer.originPOS[1] = matchDetails.pitchSize[1] - thisPlayer.originPOS[1];
                const tempArray = thisPlayer.originPOS;
                thisPlayer.startPOS = tempArray.map(x => x);
                thisPlayer.relativePOS = tempArray.map(x => x);
                thisPlayerCallback();
            }, function afterAllPlayers() {
                resolve(team);
            });
        });
    }// end switchSide

    /**
     *
     * @param player
     * @param team
     * @param matchDetails
     * @returns {Promise<any>}
     */
    setRelativePosition(player: IPlayer, team, matchDetails) {
        return new Promise((resolve, reject) => {
            const tempArray = parseInt(player.startPOS[1]) - parseInt(player.originPOS[1]);
            async.eachSeries(team.players, function eachPlayer(thisPlayer: IPlayer, thisPlayerCallback) {
                const originArray = thisPlayer.originPOS;
                const possibleMove = parseInt(thisPlayer.originPOS[1]) + tempArray;
                if (thisPlayer.name === player.name) {
                    thisPlayer.relativePOS = thisPlayer.startPOS.map(x => x);
                } else {
                    if (team.intent === "attack") {
                        if (thisPlayer.position !== "GK" && thisPlayer.position !== "CB") {
                            if (thisPlayer.originPOS[1] > matchDetails.pitchSize[1] / 2) {
                                if (possibleMove > thisPlayer.originPOS) {
                                    thisPlayer.relativePOS = originArray.map(x => x);
                                } else {
                                    thisPlayer.relativePOS[1] = possibleMove;
                                }
                            } else {
                                if (possibleMove < thisPlayer.originPOS) {
                                    thisPlayer.relativePOS = originArray.map(x => x);
                                } else {
                                    thisPlayer.relativePOS[1] = possibleMove;
                                }
                            }
                        } else {
                            thisPlayer.relativePOS = originArray.map(x => x);
                        }
                    } else {
                        thisPlayer.relativePOS = originArray.map(x => x);
                    }
                }
                thisPlayerCallback();
            }, function afterAllBlayers() {
                resolve();
            });
        });
    }

    /// Private Methods
    
    // Opposition = Team A, Team - Team B;

    /**
     *
     * @param _team
     * @param _tempArray
     * @param _shootArray
     * @returns {Promise<any>}
     */
    private formationTeamBSetPenalty(_team, _tempArray, _shootArray) {
        return new Promise ( (resolve, reject) => {
            _team.players[1].startPOS = _tempArray.map(x => x);
            _team.players[2].startPOS = _tempArray.map(x => x);
            _team.players[3].startPOS = _tempArray.map(x => x);
            _team.players[4].startPOS = _tempArray.map(x => x);
            _team.players[5].startPOS = _tempArray.map(x => x);
            _team.players[6].startPOS = _tempArray.map(x => x);
            _team.players[7].startPOS = _tempArray.map(x => x);
            _team.players[8].startPOS = _tempArray.map(x => x);
            _team.players[9].startPOS = _tempArray.map(x => x);
            _team.players[10].startPOS = _shootArray.map(x => x);
            _team.players[1].startPOS[0] += -9;
            _team.players[2].startPOS[0] += -7;
            _team.players[3].startPOS[0] += -5;
            _team.players[4].startPOS[0] += -3;
            _team.players[5].startPOS[0] += -1;
            _team.players[6].startPOS[0] += 1;
            _team.players[7].startPOS[0] += 3;
            _team.players[8].startPOS[0] += 5;
            _team.players[9].startPOS[0] += 7;
            _team.players[10].hasBall = true;

            resolve(_team);
        })
    }


    /**
     *
     * @param _team
     * @param _tempArray
     * @returns {Promise<any>}
     */
    private formationTeamASetPenalty(_team, _tempArray){
        return new Promise(((resolve, reject) => {
            _team.players[0].startPOS = _team.players[0].originPOS.map(x => x);
            _team.players[1].startPOS = _tempArray.map(x => x);
            _team.players[2].startPOS = _tempArray.map(x => x);
            _team.players[3].startPOS = _tempArray.map(x => x);
            _team.players[4].startPOS = _tempArray.map(x => x);
            _team.players[5].startPOS = _tempArray.map(x => x);
            _team.players[6].startPOS = _tempArray.map(x => x);
            _team.players[7].startPOS = _tempArray.map(x => x);
            _team.players[8].startPOS = _tempArray.map(x => x);
            _team.players[9].startPOS = _tempArray.map(x => x);
            _team.players[10].startPOS = _tempArray.map(x => x);
            _team.players[1].startPOS[0] += -10;
            _team.players[2].startPOS[0] += -8;
            _team.players[3].startPOS[0] += -6;
            _team.players[4].startPOS[0] += -4;
            _team.players[5].startPOS[0] += -2;
            _team.players[6].startPOS[0] += 0;
            _team.players[7].startPOS[0] += 2;
            _team.players[8].startPOS[0] += 4;
            _team.players[9].startPOS[0] += 6;
            _team.players[10].startPOS[0] += 8;

            resolve  (_team.players);
        }))
    }
}
/*

var async = require("async");
var Common = require("../lib/Common");
var setVariables = require("../lib/setVariables");

function setCornerPositions(team, opposition, side, matchDetails) {
	return new Promise((resolve, reject) => {
		if (team.players[0].originPOS[1] > matchDetails.pitchSize[1] / 2) {
			if (side === "left") {
				team.players[1].startPOS = [0, 0];
				team.players[4].startPOS = [10, 20];
				team.players[5].startPOS = [60, 40];
				team.players[8].startPOS = [50, 70];
				team.players[9].startPOS = [80, 50];
				team.players[10].startPOS = [60, 80];
				opposition.players[5].startPOS = [15, 25];
				opposition.players[6].startPOS = [40, 35];
				opposition.players[7].startPOS = [60, 35];
				opposition.players[8].startPOS = [60, 70];
				matchDetails.ball.position = [0, 0];
				team.players[1].hasBall = true;
				matchDetails.ball.withPlayer = true;
				matchDetails.ball.Player = team.players[1].name;
				matchDetails.ball.withTeam = team.name;
			} else {
				team.players[1].startPOS = [matchDetails.pitchSize[0], 0];
				team.players[4].startPOS = [matchDetails.pitchSize[0] - 10, 20];
				team.players[5].startPOS = [matchDetails.pitchSize[0] - 60, 40];
				team.players[8].startPOS = [matchDetails.pitchSize[0] - 50, 70];
				team.players[9].startPOS = [matchDetails.pitchSize[0] - 80, 50];
				team.players[10].startPOS = [matchDetails.pitchSize[0] - 60, 80];
				opposition.players[5].startPOS = [matchDetails.pitchSize[0] - 15, 25];
				opposition.players[6].startPOS = [matchDetails.pitchSize[0] - 40, 35];
				opposition.players[7].startPOS = [matchDetails.pitchSize[0] - 60, 35];
				opposition.players[8].startPOS = [matchDetails.pitchSize[0] - 60, 70];
				matchDetails.ball.position = [matchDetails.pitchSize[0], 0];
				team.players[1].hasBall = true;
				matchDetails.ball.withPlayer = true;
				matchDetails.ball.Player = team.players[1].name;
				matchDetails.ball.withTeam = team.name;
			}
		} else {
			if (side === "left") {
				team.players[1].startPOS = [0, matchDetails.pitchSize[1]];
				team.players[4].startPOS = [10, matchDetails.pitchSize[1] - 20];
				team.players[5].startPOS = [60, matchDetails.pitchSize[1] - 40];
				team.players[8].startPOS = [50, matchDetails.pitchSize[1] - 70];
				team.players[9].startPOS = [80, matchDetails.pitchSize[1] - 50];
				team.players[10].startPOS = [60, matchDetails.pitchSize[1] - 80];
				opposition.players[5].startPOS = [15, matchDetails.pitchSize[1] - 25];
				opposition.players[6].startPOS = [40, matchDetails.pitchSize[1] - 35];
				opposition.players[7].startPOS = [60, matchDetails.pitchSize[1] - 35];
				opposition.players[8].startPOS = [60, matchDetails.pitchSize[1] - 70];
				matchDetails.ball.position = [0, matchDetails.pitchSize[1]];
				team.players[1].hasBall = true;
				matchDetails.ball.withPlayer = true;
				matchDetails.ball.Player = team.players[1].name;
				matchDetails.ball.withTeam = team.name;
			} else {
				team.players[1].startPOS = [matchDetails.pitchSize[0], matchDetails.pitchSize[1]];
				team.players[4].startPOS = [matchDetails.pitchSize[0] - 10, matchDetails.pitchSize[1] - 20];
				team.players[5].startPOS = [matchDetails.pitchSize[0] - 60, matchDetails.pitchSize[1] - 40];
				team.players[8].startPOS = [matchDetails.pitchSize[0] - 50, matchDetails.pitchSize[1] - 70];
				team.players[9].startPOS = [matchDetails.pitchSize[0] - 80, matchDetails.pitchSize[1] - 50];
				team.players[10].startPOS = [matchDetails.pitchSize[0] - 60, matchDetails.pitchSize[1] - 80];
				opposition.players[5].startPOS = [matchDetails.pitchSize[0] - 15, matchDetails.pitchSize[1] - 25];
				opposition.players[6].startPOS = [matchDetails.pitchSize[0] - 40, matchDetails.pitchSize[1] - 35];
				opposition.players[7].startPOS = [matchDetails.pitchSize[0] - 60, matchDetails.pitchSize[1] - 35];
				opposition.players[8].startPOS = [matchDetails.pitchSize[0] - 60, matchDetails.pitchSize[1] - 70];
				matchDetails.ball.position = [matchDetails.pitchSize[0], matchDetails.pitchSize[1]];
				team.players[1].hasBall = true;
				matchDetails.ball.withPlayer = true;
				matchDetails.ball.Player = team.players[1].name;
				matchDetails.ball.withTeam = team.name;
			}
		}
		resolve(matchDetails.ball.position);
	});
}

function setThrowIn(team, opposition, side, place, matchDetails) {
	return new Promise((resolve, reject) => {
		var movement = team.players[5].originPOS[1] - place;
		var oppMovement = 0 - movement;
		if (side === "left") {
			setPlayerPositions(matchDetails, team, movement).then(() => {
				team.players[5].startPOS = [0, place];
				team.players[8].startPOS = [15, place];
				team.players[7].startPOS = [10, place + 10];
				team.players[9].startPOS = [10, place - 10];
				matchDetails.ball.position = [0, place];
				team.players[5].startPOS = matchDetails.ball.position.map(x => x);
				team.players[5].hasBall = true;
				matchDetails.ball.withPlayer = true;
				matchDetails.ball.Player = team.players[5].name;
				matchDetails.ball.withTeam = team.name;
				setPlayerPositions(matchDetails, opposition, oppMovement).then(() => {
					opposition.players[5].startPOS = [20, place];
					opposition.players[7].startPOS = [30, place + 5];
					opposition.players[8].startPOS = [25, place - 15];
					opposition.players[9].startPOS = [10, place - 30];
					resolve(matchDetails.ball.position);
				}).catch((error) => {
					console.error("Error when setting opposition throwin positions: ", error);
					console.error(matchDetails.iterationLog);
				});
			}).catch((error) => {
				console.error("Error when setting throwin player positions: ", error);
				console.error(matchDetails.iterationLog);
			});
		} else {
			setPlayerPositions(matchDetails, team, movement).then(() => {
				team.players[5].startPOS = [matchDetails.pitchSize[0], place];
				team.players[8].startPOS = [matchDetails.pitchSize[0] - 15, place];
				team.players[7].startPOS = [matchDetails.pitchSize[0] - 10, place + 10];
				team.players[9].startPOS = [matchDetails.pitchSize[0] - 10, place - 10];
				matchDetails.ball.position = [matchDetails.pitchSize[0], place];
				team.players[5].startPOS = matchDetails.ball.position.map(x => x);
				team.players[5].hasBall = true;
				matchDetails.ball.withPlayer = true;
				matchDetails.ball.Player = team.players[5].name;
				matchDetails.ball.withTeam = team.name;
				setPlayerPositions(matchDetails, opposition, oppMovement).then(() => {
					opposition.players[5].startPOS = [matchDetails.pitchSize[0] - 20, place];
					opposition.players[7].startPOS = [matchDetails.pitchSize[0] - 30, place + 5];
					opposition.players[8].startPOS = [matchDetails.pitchSize[0] - 25, place - 15];
					opposition.players[9].startPOS = [matchDetails.pitchSize[0] - 10, place - 30];
					resolve(matchDetails.ball.position);
				}).catch((error) => {
					console.error("Error when setting opposition throwin positions: ", error);
					console.error(matchDetails.iterationLog);
				});
			}).catch((error) => {
				console.error("Error when setting thowin player positions: ", error);
				console.error(matchDetails.iterationLog);
			});
		}
	});
}

function setGoalKick(team, opposition, matchDetails) {
	return new Promise((resolve, reject) => {
		if (team.players[0].originPOS[1] > matchDetails.pitchSize[1] / 2) {
			setPlayerPositions(matchDetails, team, -80).then(() => {
				setVariables.resetPlayerPositions(opposition).then(() => {
					matchDetails.ball.position = [matchDetails.pitchSize[0] / 2, matchDetails.pitchSize[1] - 20];
					team.players[0].startPOS = matchDetails.ball.position.map(x => x);
					team.players[0].hasBall = true;
					matchDetails.ball.withPlayer = true;
					matchDetails.ball.Player = team.players[0].name;
					matchDetails.ball.withTeam = team.name;
					resolve(matchDetails.ball.position);
				}).catch((error) => {
					console.error("Error when resetting player positions: ", error);
					console.error(matchDetails.iterationLog);
				});
			}).catch((error) => {
				console.error("Error when setting player positions: ", error);
				console.error(matchDetails.iterationLog);
			});
		} else {
			setPlayerPositions(matchDetails, team, 80).then(() => {
				setVariables.resetPlayerPositions(opposition).then(() => {
					matchDetails.ball.position = [matchDetails.pitchSize[0] / 2, 20];
					team.players[0].startPOS = matchDetails.ball.position.map(x => x);
					team.players[0].hasBall = true;
					matchDetails.ball.withPlayer = true;
					matchDetails.ball.Player = team.players[0].name;
					matchDetails.ball.withTeam = team.name;
					resolve(matchDetails.ball.position);
				}).catch((error) => {
					console.error("Error when resetting player positions: ", error);
					console.error(matchDetails.iterationLog);
				});
			}).catch((error) => {
				console.error("Error when setting player positions: ", error);
				console.error(matchDetails.iterationLog);
			});
		}
	});
}

function closestPlayerToPosition(player, team, position) {
	return new Promise((resolve, reject) => {
		var currentDifference = 1000;
		var playerInformation = {
			"thePlayer": "",
			"proximity": ["", ""]
		};
		async.eachSeries(team.players, function eachPlayer(thisPlayer, thisPlayerCallback) {
			if (player.name === thisPlayer.name) {
				//do nothing
			} else {
				var ballToPlayerX = thisPlayer.startPOS[0] - position[0];
				var ballToPlayerY = thisPlayer.startPOS[1] - position[1];
				var proximityToBall = Math.abs(ballToPlayerX + ballToPlayerY);
				if (proximityToBall < currentDifference) {
					playerInformation.thePlayer = thisPlayer;
					playerInformation.proximity = [ballToPlayerX, ballToPlayerY];
					currentDifference = proximityToBall;
				}
			}
			thisPlayerCallback();
		}, function afterAllPlayers() {
			resolve(playerInformation);
		});
	});
}

function setSetpiece(matchDetails, team, opposition) {
	return new Promise((resolve, reject) => {
		var ballPosition = matchDetails.ball.position;
		if (team.players[0].originPOS[1] > matchDetails.pitchSize[1] / 2) {
			if (Common.isBetween(ballPosition[0], (matchDetails.pitchSize[0] / 4) - 5, matchDetails.pitchSize[0] - (matchDetails.pitchSize[0] / 4) + 5) && Common.isBetween(ballPosition[1], 0, (matchDetails.pitchSize[1] / 6) - 5)) {
				setPenalty(team, opposition, "top", matchDetails).then(() => {
					matchDetails.iterationLog.push("penalty to: " + team.name);
					resolve();
				}).catch((error) => {
					console.error("Error whilst setting the penalty for " + team.name + ": ", error);
					console.error(matchDetails.iterationLog);
				});
			} else {
				setFreekick(ballPosition, team, opposition, "top", matchDetails).then(() => {
					matchDetails.iterationLog.push("freekick to: " + team.name);
					resolve();
				}).catch((error) => {
					console.error("Error whilst setting the freekick for " + team.name + ": ", error);
					console.error(matchDetails.iterationLog);
				});
			}
		} else {
			if (Common.isBetween(ballPosition[0], (matchDetails.pitchSize[0] / 4) - 5, matchDetails.pitchSize[0] - (matchDetails.pitchSize[0] / 4) + 5) && Common.isBetween(ballPosition[1], matchDetails.pitchSize[1] - (matchDetails.pitchSize[1] / 6) + 5, matchDetails.pitchSize[1])) {
				setPenalty(team, opposition, "bottom", matchDetails).then(() => {
					matchDetails.iterationLog.push("penalty to: " + team.name);
					resolve();
				}).catch((error) => {
					console.error("Error whilst setting the penalty for " + team.name + ": ", error);
					console.error(matchDetails.iterationLog);
				});
				resolve();
			} else {
				setFreekick(ballPosition, team, opposition, "bottom", matchDetails).then(() => {
					matchDetails.iterationLog.push("freekick to: " + team.name);
					resolve();
				}).catch((error) => {
					console.error("Error whilst setting the freekick for " + team.name + ": ", error);
					console.error(matchDetails.iterationLog);
				});
			}
		}
	});
}

function setPenalty(team, opposition, side, matchDetails) {
	return new Promise((resolve, reject) => {
		if (side === "top") {
			var tempArray = [matchDetails.pitchSize[0] / 2, matchDetails.pitchSize[1] / 6];
			var shootArray = [matchDetails.pitchSize[0] / 2, 60];
			matchDetails.ball.direction = "north";
			matchDetails.ball.position = shootArray.map(x => x);
			matchDetails.ball.position[1] += -2;
		} else {
			var tempArray = [matchDetails.pitchSize[0] / 2, matchDetails.pitchSize[1] - (matchDetails.pitchSize[1] / 6)];
			var shootArray = [matchDetails.pitchSize[0] / 2, matchDetails.pitchSize[1] - 60];
			matchDetails.ball.direction = "south";
			matchDetails.ball.position = shootArray.map(x => x);
			matchDetails.ball.position[1] += 2;
		}
		opposition.players[0].startPOS = opposition.players[0].originPOS.map(x => x);
		opposition.players[1].startPOS = tempArray.map(x => x);
		opposition.players[2].startPOS = tempArray.map(x => x);
		opposition.players[3].startPOS = tempArray.map(x => x);
		opposition.players[4].startPOS = tempArray.map(x => x);
		opposition.players[5].startPOS = tempArray.map(x => x);
		opposition.players[6].startPOS = tempArray.map(x => x);
		opposition.players[7].startPOS = tempArray.map(x => x);
		opposition.players[8].startPOS = tempArray.map(x => x);
		opposition.players[9].startPOS = tempArray.map(x => x);
		opposition.players[10].startPOS = tempArray.map(x => x);
		opposition.players[1].startPOS[0] += -10;
		opposition.players[2].startPOS[0] += -8;
		opposition.players[3].startPOS[0] += -6;
		opposition.players[4].startPOS[0] += -4;
		opposition.players[5].startPOS[0] += -2;
		opposition.players[6].startPOS[0] += 0;
		opposition.players[7].startPOS[0] += 2;
		opposition.players[8].startPOS[0] += 4;
		opposition.players[9].startPOS[0] += 6;
		opposition.players[10].startPOS[0] += 8;
		team.players[1].startPOS = tempArray.map(x => x);
		team.players[2].startPOS = tempArray.map(x => x);
		team.players[3].startPOS = tempArray.map(x => x);
		team.players[4].startPOS = tempArray.map(x => x);
		team.players[5].startPOS = tempArray.map(x => x);
		team.players[6].startPOS = tempArray.map(x => x);
		team.players[7].startPOS = tempArray.map(x => x);
		team.players[8].startPOS = tempArray.map(x => x);
		team.players[9].startPOS = tempArray.map(x => x);
		team.players[10].startPOS = shootArray.map(x => x);
		team.players[1].startPOS[0] += -9;
		team.players[2].startPOS[0] += -7;
		team.players[3].startPOS[0] += -5;
		team.players[4].startPOS[0] += -3;
		team.players[5].startPOS[0] += -1;
		team.players[6].startPOS[0] += 1;
		team.players[7].startPOS[0] += 3;
		team.players[8].startPOS[0] += 5;
		team.players[9].startPOS[0] += 7;
		team.players[10].hasBall = true;
		matchDetails.ball.Player = team.players[10].name;
		matchDetails.ball.withPlayer = true;
		matchDetails.ball.withTeam = team.name;
		team.intent = "attack";
		opposition.intent = "defend";
		resolve();
	});
}

function setFreekick(ballPosition, team, opposition, side, matchDetails) {
	return new Promise((resolve, reject) => {
		var tempArray = ballPosition;
		team.players[0].startPOS = team.players[0].originPOS.map(x => x);
		team.players[1].startPOS = team.players[1].originPOS.map(x => x);
		team.players[2].startPOS = team.players[2].originPOS.map(x => x);
		team.players[3].startPOS = team.players[3].originPOS.map(x => x);
		team.players[4].startPOS = team.players[4].originPOS.map(x => x);
		team.players[5].startPOS = tempArray.map(x => x);
		matchDetails.ball.withTeam = team.name;
		matchDetails.ball.withPlayer = true;
		matchDetails.ball.Player = team.players[5].name;
		team.players[5].hasBall = true;
		opposition.players[0].startPOS = opposition.players[0].originPOS.map(x => x);
		opposition.players[1].startPOS = opposition.players[1].originPOS.map(x => x);
		opposition.players[2].startPOS = opposition.players[2].originPOS.map(x => x);
		opposition.players[3].startPOS = opposition.players[3].originPOS.map(x => x);
		opposition.players[4].startPOS = opposition.players[4].originPOS.map(x => x);
		if (side === "top") {
			//shooting to top of pitch
			if (ballPosition[1] > (matchDetails.pitchSize[1] - (matchDetails.pitchSize[1] / 3))) {
				matchDetails.ball.Player = team.players[0].name;
				team.players[0].hasBall = true;
				team.players[0].startPOS = tempArray.map(x => x);
				team.players[1].startPOS = [team.players[1].originPOS[0], (matchDetails.pitchSize[1] - (matchDetails.pitchSize[1] / 6) - (600 - team.players[0].startPOS[1]) - (600 - team.players[1].originPOS[1]))];
				team.players[2].startPOS = [team.players[2].originPOS[0], (matchDetails.pitchSize[1] - (matchDetails.pitchSize[1] / 6) - (600 - team.players[0].startPOS[1]) - (600 - team.players[2].originPOS[1]))];
				team.players[3].startPOS = [team.players[3].originPOS[0], (matchDetails.pitchSize[1] - (matchDetails.pitchSize[1] / 6) - (600 - team.players[0].startPOS[1]) - (600 - team.players[3].originPOS[1]))];
				team.players[4].startPOS = [team.players[4].originPOS[0], (matchDetails.pitchSize[1] - (matchDetails.pitchSize[1] / 6) - (600 - team.players[0].startPOS[1]) - (600 - team.players[4].originPOS[1]))];
				team.players[5].startPOS = [team.players[5].originPOS[0], (matchDetails.pitchSize[1] - (matchDetails.pitchSize[1] / 6) - (600 - team.players[0].startPOS[1]) - (600 - team.players[5].originPOS[1]))];
				team.players[6].startPOS = [team.players[6].originPOS[0], (matchDetails.pitchSize[1] - (matchDetails.pitchSize[1] / 6) - (600 - team.players[0].startPOS[1]) - (600 - team.players[6].originPOS[1]))];
				team.players[7].startPOS = [team.players[7].originPOS[0], (matchDetails.pitchSize[1] - (matchDetails.pitchSize[1] / 6) - (600 - team.players[0].startPOS[1]) - (600 - team.players[7].originPOS[1]))];
				team.players[8].startPOS = [team.players[8].originPOS[0], (matchDetails.pitchSize[1] - (matchDetails.pitchSize[1] / 6) - (600 - team.players[0].startPOS[1]) - (600 - team.players[8].originPOS[1]))];
				team.players[9].startPOS = [team.players[9].originPOS[0], (matchDetails.pitchSize[1] - (matchDetails.pitchSize[1] / 6) - (600 - team.players[0].startPOS[1]) - (600 - team.players[9].originPOS[1]))];
				team.players[10].startPOS = [team.players[10].originPOS[0], (matchDetails.pitchSize[1] - (matchDetails.pitchSize[1] / 6) - (600 - team.players[0].startPOS[1]) - (600 - team.players[10].originPOS[1]))];
				opposition.players[1].startPOS = [opposition.players[1].originPOS[0], opposition.players[1].originPOS[1] + (matchDetails.pitchSize[1] / 6)];
				opposition.players[2].startPOS = [opposition.players[2].originPOS[0], opposition.players[2].originPOS[1] + (matchDetails.pitchSize[1] / 6)];
				opposition.players[3].startPOS = [opposition.players[3].originPOS[0], opposition.players[3].originPOS[1] + (matchDetails.pitchSize[1] / 6)];
				opposition.players[4].startPOS = [opposition.players[4].originPOS[0], opposition.players[4].originPOS[1] + (matchDetails.pitchSize[1] / 6)];
				opposition.players[9].startPOS = [opposition.players[9].originPOS[0] + 10, team.players[1].startPOS[1]];
				opposition.players[10].startPOS = [opposition.players[10].originPOS[0] + 10, team.players[1].startPOS[1]];
				opposition.players[5].startPOS = [opposition.players[5].originPOS[0], opposition.players[5].originPOS[1] + (matchDetails.pitchSize[1] / 6)];
				opposition.players[6].startPOS = [opposition.players[6].originPOS[0], opposition.players[6].originPOS[1] + (matchDetails.pitchSize[1] / 6)];
				opposition.players[7].startPOS = [opposition.players[7].originPOS[0], opposition.players[7].originPOS[1] + (matchDetails.pitchSize[1] / 6)];
				opposition.players[8].startPOS = [opposition.players[8].originPOS[0], opposition.players[8].originPOS[1] + (matchDetails.pitchSize[1] / 6)];
			} else if (ballPosition[1] > (matchDetails.pitchSize[1] / 2) && ballPosition[1] < (matchDetails.pitchSize[1] - (matchDetails.pitchSize[1] / 3))) {
				//ball in own half and opposition is at the bottom of pitch
				if (ballPosition[0] > matchDetails.pitchSize[0] / 2) {
					matchDetails.ball.direction = "northwest";
				} else if (ballPosition[0] < matchDetails.pitchSize[0] / 2) {
					matchDetails.ball.direction = "northeast";
				} else {
					matchDetails.ball.direction = "north";
				}
				var level = Common.getRandomNumber(matchDetails.pitchSize[1] / 2, 200);
				team.players[1].startPOS = [team.players[1].originPOS[0], team.players[5].startPOS[1] + (matchDetails.pitchSize[1] / 6)];
				team.players[2].startPOS = [team.players[2].originPOS[0], team.players[5].startPOS[1] + (matchDetails.pitchSize[1] / 6)];
				team.players[3].startPOS = [team.players[3].originPOS[0], team.players[5].startPOS[1] + (matchDetails.pitchSize[1] / 6)];
				team.players[4].startPOS = [team.players[4].originPOS[0], team.players[5].startPOS[1] + (matchDetails.pitchSize[1] / 6)];
				team.players[6].startPOS = [team.players[6].originPOS[0], level];
				team.players[7].startPOS = [team.players[7].originPOS[0], level];
				team.players[8].startPOS = [team.players[8].originPOS[0], level];
				team.players[9].startPOS = [team.players[9].originPOS[0], level - (matchDetails.pitchSize[1] / 6)];
				team.players[10].startPOS = [team.players[10].originPOS[0], level - (matchDetails.pitchSize[1] / 6)];
				opposition.players[1].startPOS = [opposition.players[1].originPOS[0], opposition.players[1].originPOS[1] + (matchDetails.pitchSize[1] / 7)];
				opposition.players[2].startPOS = [opposition.players[2].originPOS[0], opposition.players[2].originPOS[1] + (matchDetails.pitchSize[1] / 7)];
				opposition.players[3].startPOS = [opposition.players[3].originPOS[0], opposition.players[3].originPOS[1] + (matchDetails.pitchSize[1] / 7)];
				opposition.players[4].startPOS = [opposition.players[4].originPOS[0], opposition.players[4].originPOS[1] + (matchDetails.pitchSize[1] / 7)];
				opposition.players[5].startPOS = [opposition.players[5].originPOS[0], opposition.players[5].originPOS[1] + (matchDetails.pitchSize[1] / 6)];
				opposition.players[6].startPOS = [opposition.players[6].originPOS[0], opposition.players[6].originPOS[1] + (matchDetails.pitchSize[1] / 6)];
				opposition.players[7].startPOS = [opposition.players[7].originPOS[0], opposition.players[7].originPOS[1] + (matchDetails.pitchSize[1] / 6)];
				opposition.players[8].startPOS = [opposition.players[8].originPOS[0], opposition.players[8].originPOS[1] + (matchDetails.pitchSize[1] / 6)];
				opposition.players[9].startPOS = [opposition.players[9].originPOS[0], opposition.players[9].originPOS[1] + (matchDetails.pitchSize[1] / 6)];
				opposition.players[10].startPOS = [opposition.players[10].originPOS[0], opposition.players[10].originPOS[1] + (matchDetails.pitchSize[1] / 6)];
			} else if (ballPosition[1] < (matchDetails.pitchSize[1] / 2) && ballPosition[1] > (matchDetails.pitchSize[1] / 6)) {
				//between halfway and last sixth
				var level = Math.round(Common.getRandomNumber((matchDetails.pitchSize[1] / 9), ballPosition[1] + 15));
				team.players[0].startPOS = [team.players[0].originPOS[0], team.players[5].startPOS[1] + (matchDetails.pitchSize[1] / 3)];
				team.players[1].startPOS = [team.players[1].originPOS[0], team.players[5].startPOS[1] + (matchDetails.pitchSize[1] / 6)];
				team.players[2].startPOS = [team.players[2].originPOS[0], team.players[5].startPOS[1] + (matchDetails.pitchSize[1] / 6)];
				team.players[3].startPOS = [team.players[3].originPOS[0], team.players[5].startPOS[1] + (matchDetails.pitchSize[1] / 6)];
				team.players[4].startPOS = [team.players[4].originPOS[0], team.players[5].startPOS[1] + (matchDetails.pitchSize[1] / 6)];
				team.players[6].startPOS = [team.players[6].originPOS[0], level];
				team.players[7].startPOS = [team.players[7].originPOS[0], level];
				team.players[8].startPOS = [team.players[8].originPOS[0], level];
				team.players[9].startPOS = [team.players[9].originPOS[0], Common.getRandomNumber(5, level - 20)];
				team.players[10].startPOS = [team.players[10].originPOS[0], Common.getRandomNumber(5, level - 20)];
				if (ballPosition[0] > matchDetails.pitchSize[0] / 2) {
					matchDetails.ball.direction = "northwest";
					var midGoal = matchDetails.pitchSize[0] / 2;
					opposition.players[5].startPOS = [(tempArray[0] + ((midGoal - tempArray[0]) / 2)), tempArray[1] - 60];
					opposition.players[6].startPOS = [tempArray[0] + ((midGoal - tempArray[0]) / 2), tempArray[1] - 30];
					opposition.players[7].startPOS = [tempArray[0], tempArray[1] - 30];
					opposition.players[8].startPOS = [team.players[10].startPOS[0] + 2, team.players[10].startPOS[0] - 2];
					opposition.players[9].startPOS = [(tempArray[0] + ((midGoal - tempArray[0]) / 2) + 2), tempArray[1] - 30];
					opposition.players[10].startPOS = [(tempArray[0] + ((midGoal - tempArray[0]) / 2) - 2), tempArray[1] - 30];
				} else if (ballPosition[0] < matchDetails.pitchSize[0] / 2) {
					matchDetails.ball.direction = "northeast";
					var midGoal = matchDetails.pitchSize[0] / 2;
					opposition.players[5].startPOS = [tempArray[0] + ((midGoal - tempArray[0]) / 2), tempArray[1] - 60];
					opposition.players[6].startPOS = [tempArray[0] + ((midGoal - tempArray[0]) / 2), tempArray[1] - 30];
					opposition.players[7].startPOS = [tempArray[0], tempArray[1] - 30];
					opposition.players[8].startPOS = [team.players[10].startPOS[0] + 2, team.players[10].startPOS[0] - 2];
					opposition.players[9].startPOS = [(tempArray[0] + ((midGoal - tempArray[0]) / 2) + 2), tempArray[1] - 30];
					opposition.players[10].startPOS = [(tempArray[0] + ((midGoal - tempArray[0]) / 2) - 2), tempArray[1] - 30];
				} else {
					matchDetails.ball.direction = "north";
					opposition.players[5].startPOS = [tempArray[0], tempArray[1] - 60];
					opposition.players[6].startPOS = [tempArray[0], tempArray[1] - 30];
					opposition.players[7].startPOS = [tempArray[0] + 20, tempArray[1] - 20];
					opposition.players[8].startPOS = [team.players[10].startPOS[0] - 2, team.players[10].startPOS[0] + 2];
					opposition.players[9].startPOS = [tempArray[0] - 2, tempArray[1] - 30];
					opposition.players[10].startPOS = [tempArray[0] + 2, tempArray[1] - 30];
				}
			} else {
				//in the last sixth
				team.players[0].startPOS = [team.players[0].originPOS[0], team.players[0].originPOS[1] - (matchDetails.pitchSize[1] / 3)];
				team.players[2].startPOS = [team.players[2].originPOS[0], team.players[2].originPOS[1] - (matchDetails.pitchSize[1] / 2)];
				team.players[3].startPOS = [team.players[3].originPOS[0], team.players[3].originPOS[1] - (matchDetails.pitchSize[1] / 2)];
				team.players[1].startPOS = [Common.getRandomNumber((matchDetails.pitchSize[0] / 4) - 5, (matchDetails.pitchSize[0] - (matchDetails.pitchSize[0] / 4) + 5)), Common.getRandomNumber(0, (matchDetails.pitchSize[1] / 6) - 5)];
				team.players[4].startPOS = [Common.getRandomNumber((matchDetails.pitchSize[0] / 4) - 5, (matchDetails.pitchSize[0] - (matchDetails.pitchSize[0] / 4) + 5)), Common.getRandomNumber(0, (matchDetails.pitchSize[1] / 6) - 5)];
				team.players[6].startPOS = [Common.getRandomNumber((matchDetails.pitchSize[0] / 4) - 5, (matchDetails.pitchSize[0] - (matchDetails.pitchSize[0] / 4) + 5)), Common.getRandomNumber(0, (matchDetails.pitchSize[1] / 6) - 5)];
				team.players[7].startPOS = [Common.getRandomNumber((matchDetails.pitchSize[0] / 4) - 5, (matchDetails.pitchSize[0] - (matchDetails.pitchSize[0] / 4) + 5)), Common.getRandomNumber(0, (matchDetails.pitchSize[1] / 6) - 5)];
				team.players[8].startPOS = [Common.getRandomNumber((matchDetails.pitchSize[0] / 4) - 5, (matchDetails.pitchSize[0] - (matchDetails.pitchSize[0] / 4) + 5)), Common.getRandomNumber(0, (matchDetails.pitchSize[1] / 6) - 5)];
				team.players[9].startPOS = [Common.getRandomNumber((matchDetails.pitchSize[0] / 4) - 5, (matchDetails.pitchSize[0] - (matchDetails.pitchSize[0] / 4) + 5)), Common.getRandomNumber(0, (matchDetails.pitchSize[1] / 6) - 5)];
				team.players[10].startPOS = [Common.getRandomNumber((matchDetails.pitchSize[0] / 4) - 5, (matchDetails.pitchSize[0] - (matchDetails.pitchSize[0] / 4) + 5)), Common.getRandomNumber(0, (matchDetails.pitchSize[1] / 6) - 5)];
				opposition.players[1].startPOS = [(matchDetails.pitchSize[0] / 2) - 15, 10];
				opposition.players[2].startPOS = [(matchDetails.pitchSize[0] / 2) - 5, 10];
				opposition.players[3].startPOS = [(matchDetails.pitchSize[0] / 2) + 5, 10];
				opposition.players[4].startPOS = [(matchDetails.pitchSize[0] / 2) + 15, 10];
				if (ballPosition[0] > matchDetails.pitchSize[0] / 2) {
					var midGoal = matchDetails.pitchSize[0] / 2;
					matchDetails.ball.direction = "northwest";
					if (tempArray[1] < 15) {
						opposition.players[5].startPOS = [tempArray[0] + ((midGoal - tempArray[0]) / 2), tempArray[1]];
						opposition.players[6].startPOS = [tempArray[0] + ((midGoal - tempArray[0]) / 2), tempArray[1] + 2];
						opposition.players[7].startPOS = [tempArray[0] + ((midGoal - tempArray[0]) / 2), tempArray[1] + 4];
					} else {
						opposition.players[5].startPOS = [tempArray[0] + ((midGoal - tempArray[0]) / 2), tempArray[1] - 10];
						opposition.players[6].startPOS = [tempArray[0] + ((midGoal - tempArray[0]) / 2), tempArray[1] - 12];
						opposition.players[7].startPOS = [tempArray[0] + ((midGoal - tempArray[0]) / 2), tempArray[1] - 14];
					}
					opposition.players[8].startPOS = [Common.getRandomNumber((matchDetails.pitchSize[0] / 4) - 5, (matchDetails.pitchSize[0] - (matchDetails.pitchSize[0] / 4) + 5)), Common.getRandomNumber(0, (matchDetails.pitchSize[1] / 6) - 5)];
					opposition.players[9].startPOS = [Common.getRandomNumber((matchDetails.pitchSize[0] / 4) - 5, (matchDetails.pitchSize[0] - (matchDetails.pitchSize[0] / 4) + 5)), Common.getRandomNumber(0, (matchDetails.pitchSize[1] / 6) - 5)];
					opposition.players[10].startPOS = [matchDetails.pitchSize[0] / 2, 20];
				} else if (ballPosition[0] < matchDetails.pitchSize[0] / 2) {
					var midGoal = matchDetails.pitchSize[0] / 2;
					matchDetails.ball.direction = "northeast";
					if (tempArray[1] < 15) {
						opposition.players[8].startPOS = [tempArray[0] + ((midGoal - tempArray[0]) / 2), tempArray[1]];
						opposition.players[6].startPOS = [tempArray[0] + ((midGoal - tempArray[0]) / 2), tempArray[1] + 2];
						opposition.players[7].startPOS = [tempArray[0] + ((midGoal - tempArray[0]) / 2), tempArray[1] + 4];
					} else {
						opposition.players[8].startPOS = [tempArray[0] + ((midGoal - tempArray[0]) / 2), tempArray[1] - 10];
						opposition.players[6].startPOS = [tempArray[0] + ((midGoal - tempArray[0]) / 2), tempArray[1] - 12];
						opposition.players[7].startPOS = [tempArray[0] + ((midGoal - tempArray[0]) / 2), tempArray[1] - 14];
					}
					opposition.players[5].startPOS = [Common.getRandomNumber((matchDetails.pitchSize[0] / 4) - 5, (matchDetails.pitchSize[0] - (matchDetails.pitchSize[0] / 4) - 5)), Common.getRandomNumber(0, (matchDetails.pitchSize[1] / 6) - 5)];
					opposition.players[9].startPOS = [Common.getRandomNumber((matchDetails.pitchSize[0] / 4) - 5, (matchDetails.pitchSize[0] - (matchDetails.pitchSize[0] / 4) - 5)), Common.getRandomNumber(0, (matchDetails.pitchSize[1] / 6) - 5)];
					opposition.players[10].startPOS = [matchDetails.pitchSize[0] / 2, 20];
				} else {
					matchDetails.ball.direction = "north";
					opposition.players[5].startPOS = [(matchDetails.pitchSize[0] / 2) - 4, tempArray[1] - 40];
					opposition.players[6].startPOS = [(matchDetails.pitchSize[0] / 2) - 2, tempArray[1] - 40];
					opposition.players[7].startPOS = [(matchDetails.pitchSize[0] / 2), tempArray[1] - 40];
					opposition.players[8].startPOS = [(matchDetails.pitchSize[0] / 2) + 2, tempArray[1] - 40];
					opposition.players[9].startPOS = [(matchDetails.pitchSize[0] / 2) + 4, tempArray[1] - 40];
					opposition.players[10].startPOS = [(matchDetails.pitchSize[0] / 2), 30];
				}
			}
		} else {
			//other team
			//shooting to bottom of pitch
			if (ballPosition[1] < (matchDetails.pitchSize[1] / 3)) {
				matchDetails.ball.Player = team.players[0].name;
				team.players[0].hasBall = true;
				team.players[0].startPOS = tempArray.map(x => x);
				team.players[1].startPOS = [team.players[1].originPOS[0], ((matchDetails.pitchSize[1] / 6) + team.players[0].startPOS[1] + team.players[1].originPOS[1])];
				team.players[2].startPOS = [team.players[2].originPOS[0], ((matchDetails.pitchSize[1] / 6) + team.players[0].startPOS[1] + team.players[2].originPOS[1])];
				team.players[3].startPOS = [team.players[3].originPOS[0], ((matchDetails.pitchSize[1] / 6) + team.players[0].startPOS[1] + team.players[3].originPOS[1])];
				team.players[4].startPOS = [team.players[4].originPOS[0], ((matchDetails.pitchSize[1] / 6) + team.players[0].startPOS[1] + team.players[4].originPOS[1])];
				team.players[5].startPOS = [team.players[5].originPOS[0], ((matchDetails.pitchSize[1] / 6) + team.players[0].startPOS[1] + team.players[5].originPOS[1])];
				team.players[6].startPOS = [team.players[6].originPOS[0], ((matchDetails.pitchSize[1] / 6) + team.players[0].startPOS[1] + team.players[6].originPOS[1])];
				team.players[7].startPOS = [team.players[7].originPOS[0], ((matchDetails.pitchSize[1] / 6) + team.players[0].startPOS[1] + team.players[7].originPOS[1])];
				team.players[8].startPOS = [team.players[8].originPOS[0], ((matchDetails.pitchSize[1] / 6) + team.players[0].startPOS[1] + team.players[8].originPOS[1])];
				team.players[9].startPOS = [team.players[9].originPOS[0], ((matchDetails.pitchSize[1] / 6) + team.players[0].startPOS[1] + team.players[9].originPOS[1])];
				team.players[10].startPOS = [team.players[10].originPOS[0], ((matchDetails.pitchSize[1] / 6) + team.players[0].startPOS[1] + team.players[10].originPOS[1])];
				opposition.players[1].startPOS = [opposition.players[1].originPOS[0], opposition.players[1].originPOS[1] - (matchDetails.pitchSize[1] / 6)];
				opposition.players[2].startPOS = [opposition.players[2].originPOS[0], opposition.players[2].originPOS[1] - (matchDetails.pitchSize[1] / 6)];
				opposition.players[3].startPOS = [opposition.players[3].originPOS[0], opposition.players[3].originPOS[1] - (matchDetails.pitchSize[1] / 6)];
				opposition.players[4].startPOS = [opposition.players[4].originPOS[0], opposition.players[4].originPOS[1] - (matchDetails.pitchSize[1] / 6)];
				opposition.players[9].startPOS = [opposition.players[9].originPOS[0] + 10, team.players[1].startPOS[1]];
				opposition.players[10].startPOS = [opposition.players[10].originPOS[0] + 10, team.players[1].startPOS[1]];
				opposition.players[5].startPOS = [opposition.players[5].originPOS[0], opposition.players[5].originPOS[1] - (matchDetails.pitchSize[1] / 6)];
				opposition.players[6].startPOS = [opposition.players[6].originPOS[0], opposition.players[6].originPOS[1] - (matchDetails.pitchSize[1] / 6)];
				opposition.players[7].startPOS = [opposition.players[7].originPOS[0], opposition.players[7].originPOS[1] - (matchDetails.pitchSize[1] / 6)];
				opposition.players[8].startPOS = [opposition.players[8].originPOS[0], opposition.players[8].originPOS[1] - (matchDetails.pitchSize[1] / 6)];
			} else if (ballPosition[1] < (matchDetails.pitchSize[1] / 2) && ballPosition[1] > (matchDetails.pitchSize[1] / 3)) {
				//ball in own half and opposition is at the bottom of pitch
				if (ballPosition[0] > matchDetails.pitchSize[0] / 2) {
					matchDetails.ball.direction = "southwest";
				} else if (ballPosition[0] < matchDetails.pitchSize[0] / 2) {
					matchDetails.ball.direction = "southeast";
				} else {
					matchDetails.ball.direction = "south";
				}
				var level = Common.getRandomNumber(matchDetails.pitchSize[1] / 2, matchDetails.pitchSize[1] - 200);
				team.players[1].startPOS = [team.players[1].originPOS[0], team.players[5].startPOS[1] - (matchDetails.pitchSize[1] / 6)];
				team.players[2].startPOS = [team.players[2].originPOS[0], team.players[5].startPOS[1] - (matchDetails.pitchSize[1] / 6)];
				team.players[3].startPOS = [team.players[3].originPOS[0], team.players[5].startPOS[1] - (matchDetails.pitchSize[1] / 6)];
				team.players[4].startPOS = [team.players[4].originPOS[0], team.players[5].startPOS[1] - (matchDetails.pitchSize[1] / 6)];
				team.players[6].startPOS = [team.players[6].originPOS[0], level];
				team.players[7].startPOS = [team.players[7].originPOS[0], level];
				team.players[8].startPOS = [team.players[8].originPOS[0], level];
				team.players[9].startPOS = [team.players[9].originPOS[0], level + (matchDetails.pitchSize[1] / 6)];
				team.players[10].startPOS = [team.players[10].originPOS[0], level + (matchDetails.pitchSize[1] / 6)];
				opposition.players[1].startPOS = [opposition.players[1].originPOS[0], opposition.players[1].originPOS[1] - (matchDetails.pitchSize[1] / 7)];
				opposition.players[2].startPOS = [opposition.players[2].originPOS[0], opposition.players[2].originPOS[1] - (matchDetails.pitchSize[1] / 7)];
				opposition.players[3].startPOS = [opposition.players[3].originPOS[0], opposition.players[3].originPOS[1] - (matchDetails.pitchSize[1] / 7)];
				opposition.players[4].startPOS = [opposition.players[4].originPOS[0], opposition.players[4].originPOS[1] - (matchDetails.pitchSize[1] / 7)];
				opposition.players[5].startPOS = [opposition.players[5].originPOS[0], opposition.players[5].originPOS[1] - (matchDetails.pitchSize[1] / 6)];
				opposition.players[6].startPOS = [opposition.players[6].originPOS[0], opposition.players[6].originPOS[1] - (matchDetails.pitchSize[1] / 6)];
				opposition.players[7].startPOS = [opposition.players[7].originPOS[0], opposition.players[7].originPOS[1] - (matchDetails.pitchSize[1] / 6)];
				opposition.players[8].startPOS = [opposition.players[8].originPOS[0], opposition.players[8].originPOS[1] - (matchDetails.pitchSize[1] / 6)];
				opposition.players[9].startPOS = [opposition.players[9].originPOS[0], opposition.players[9].originPOS[1] - (matchDetails.pitchSize[1] / 6)];
				opposition.players[10].startPOS = [opposition.players[10].originPOS[0], opposition.players[10].originPOS[1] - (matchDetails.pitchSize[1] / 6)];
			} else if (ballPosition[1] > (matchDetails.pitchSize[1] / 2) && ballPosition[1] < (matchDetails.pitchSize[1] - (matchDetails.pitchSize[1] / 6))) {
				//between halfway and last sixth
				var level = Math.round(Common.getRandomNumber(ballPosition[1] + 15, (matchDetails.pitchSize[1] - matchDetails.pitchSize[1] / 9)));
				team.players[0].startPOS = [team.players[0].originPOS[0], team.players[5].startPOS[1] - (matchDetails.pitchSize[1] / 3)];
				team.players[1].startPOS = [team.players[1].originPOS[0], team.players[5].startPOS[1] - (matchDetails.pitchSize[1] / 6)];
				team.players[2].startPOS = [team.players[2].originPOS[0], team.players[5].startPOS[1] - (matchDetails.pitchSize[1] / 6)];
				team.players[3].startPOS = [team.players[3].originPOS[0], team.players[5].startPOS[1] - (matchDetails.pitchSize[1] / 6)];
				team.players[4].startPOS = [team.players[4].originPOS[0], team.players[5].startPOS[1] - (matchDetails.pitchSize[1] / 6)];
				team.players[6].startPOS = [team.players[6].originPOS[0], level];
				team.players[7].startPOS = [team.players[7].originPOS[0], level];
				team.players[8].startPOS = [team.players[8].originPOS[0], level];
				team.players[9].startPOS = [team.players[9].originPOS[0], level + (matchDetails.pitchSize[1] / 6)];
				team.players[10].startPOS = [team.players[10].originPOS[0], level + (matchDetails.pitchSize[1] / 6)];
				if (ballPosition[0] > matchDetails.pitchSize[0] / 2) {
					matchDetails.ball.direction = "southwest";
					var midGoal = matchDetails.pitchSize[0] / 2;
					opposition.players[5].startPOS = [(tempArray[0] + ((midGoal - tempArray[0]) / 2)), tempArray[1] + 60];
					opposition.players[6].startPOS = [tempArray[0] + ((midGoal - tempArray[0]) / 2), tempArray[1] + 30];
					opposition.players[7].startPOS = [tempArray[0], tempArray[1] + 30];
					opposition.players[8].startPOS = [team.players[10].startPOS[0] + 2, team.players[10].startPOS[0] + 2];
					opposition.players[9].startPOS = [(tempArray[0] + ((midGoal - tempArray[0]) / 2) + 2), tempArray[1] + 30];
					opposition.players[10].startPOS = [(tempArray[0] + ((midGoal - tempArray[0]) / 2) - 2), tempArray[1] + 30];
				} else if (ballPosition[0] < matchDetails.pitchSize[0] / 2) {
					matchDetails.ball.direction = "southeast";
					var midGoal = matchDetails.pitchSize[0] / 2;
					opposition.players[5].startPOS = [tempArray[0] + ((midGoal - tempArray[0]) / 2), tempArray[1] + 60];
					opposition.players[6].startPOS = [tempArray[0] + ((midGoal - tempArray[0]) / 2), tempArray[1] + 30];
					opposition.players[7].startPOS = [tempArray[0], tempArray[1] + 30];
					opposition.players[8].startPOS = [team.players[10].startPOS[0] + 2, team.players[10].startPOS[0] + 2];
					opposition.players[9].startPOS = [(tempArray[0] + ((midGoal - tempArray[0]) / 2) + 2), tempArray[1] + 30];
					opposition.players[10].startPOS = [(tempArray[0] + ((midGoal - tempArray[0]) / 2) - 2), tempArray[1] + 30];
				} else {
					matchDetails.ball.direction = "south";
					opposition.players[5].startPOS = [tempArray[0], tempArray[1] + 60];
					opposition.players[6].startPOS = [tempArray[0], tempArray[1] + 30];
					opposition.players[7].startPOS = [tempArray[0] + 20, tempArray[1] + 20];
					opposition.players[8].startPOS = [team.players[10].startPOS[0] + 2, team.players[10].startPOS[0] + 2];
					opposition.players[9].startPOS = [tempArray[0] - 2, tempArray[1] + 30];
					opposition.players[10].startPOS = [tempArray[0] + 2, tempArray[1] + 30];
				}
			} else {
				//in the last sixth
				team.players[0].startPOS = [team.players[0].originPOS[0], team.players[0].originPOS[1] + (matchDetails.pitchSize[1] / 3)];
				team.players[2].startPOS = [team.players[2].originPOS[0], team.players[2].originPOS[1] + (matchDetails.pitchSize[1] / 2)];
				team.players[3].startPOS = [team.players[3].originPOS[0], team.players[3].originPOS[1] + (matchDetails.pitchSize[1] / 2)];
				team.players[1].startPOS = [Common.getRandomNumber((matchDetails.pitchSize[0] / 4) - 5, (matchDetails.pitchSize[0] - (matchDetails.pitchSize[0] / 4) + 5)), Common.getRandomNumber(matchDetails.pitchSize[1] - (matchDetails.pitchSize[1] / 6) + 5, matchDetails.pitchSize[1])];
				team.players[4].startPOS = [Common.getRandomNumber((matchDetails.pitchSize[0] / 4) - 5, (matchDetails.pitchSize[0] - (matchDetails.pitchSize[0] / 4) + 5)), Common.getRandomNumber(matchDetails.pitchSize[1] - (matchDetails.pitchSize[1] / 6) + 5, matchDetails.pitchSize[1])];
				team.players[6].startPOS = [Common.getRandomNumber((matchDetails.pitchSize[0] / 4) - 5, (matchDetails.pitchSize[0] - (matchDetails.pitchSize[0] / 4) + 5)), Common.getRandomNumber(matchDetails.pitchSize[1] - (matchDetails.pitchSize[1] / 6) + 5, matchDetails.pitchSize[1])];
				team.players[7].startPOS = [Common.getRandomNumber((matchDetails.pitchSize[0] / 4) - 5, (matchDetails.pitchSize[0] - (matchDetails.pitchSize[0] / 4) + 5)), Common.getRandomNumber(matchDetails.pitchSize[1] - (matchDetails.pitchSize[1] / 6) + 5, matchDetails.pitchSize[1])];
				team.players[8].startPOS = [Common.getRandomNumber((matchDetails.pitchSize[0] / 4) - 5, (matchDetails.pitchSize[0] - (matchDetails.pitchSize[0] / 4) + 5)), Common.getRandomNumber(matchDetails.pitchSize[1] - (matchDetails.pitchSize[1] / 6) + 5, matchDetails.pitchSize[1])];
				team.players[9].startPOS = [Common.getRandomNumber((matchDetails.pitchSize[0] / 4) - 5, (matchDetails.pitchSize[0] - (matchDetails.pitchSize[0] / 4) + 5)), Common.getRandomNumber(matchDetails.pitchSize[1] - (matchDetails.pitchSize[1] / 6) + 5, matchDetails.pitchSize[1])];
				team.players[10].startPOS = [Common.getRandomNumber((matchDetails.pitchSize[0] / 4) - 5, (matchDetails.pitchSize[0] - (matchDetails.pitchSize[0] / 4) + 5)), Common.getRandomNumber(matchDetails.pitchSize[1] - (matchDetails.pitchSize[1] / 6) + 5, matchDetails.pitchSize[1])];
				opposition.players[1].startPOS = [(matchDetails.pitchSize[0] / 2) - 15, matchDetails.pitchSize[1] - 10];
				opposition.players[2].startPOS = [(matchDetails.pitchSize[0] / 2) - 5, matchDetails.pitchSize[1] - 10];
				opposition.players[3].startPOS = [(matchDetails.pitchSize[0] / 2) + 5, matchDetails.pitchSize[1] - 10];
				opposition.players[4].startPOS = [(matchDetails.pitchSize[0] / 2) + 15, matchDetails.pitchSize[1] - 10];
				if (ballPosition[0] > matchDetails.pitchSize[0] / 2) {
					var midGoal = matchDetails.pitchSize[0] / 2;
					matchDetails.ball.direction = "southwest";
					if (tempArray[1] > (matchDetails.pitchSize[1] - 15)) {
						opposition.players[5].startPOS = [tempArray[0] + ((midGoal - tempArray[0]) / 2), tempArray[1]];
						opposition.players[6].startPOS = [tempArray[0] + ((midGoal - tempArray[0]) / 2), tempArray[1] - 2];
						opposition.players[7].startPOS = [tempArray[0] + ((midGoal - tempArray[0]) / 2), tempArray[1] - 4];
					} else {
						opposition.players[5].startPOS = [tempArray[0] + ((midGoal - tempArray[0]) / 2), tempArray[1] + 10];
						opposition.players[6].startPOS = [tempArray[0] + ((midGoal - tempArray[0]) / 2), tempArray[1] + 12];
						opposition.players[7].startPOS = [tempArray[0] + ((midGoal - tempArray[0]) / 2), tempArray[1] + 14];
					}
					opposition.players[8].startPOS = [Common.getRandomNumber((matchDetails.pitchSize[0] / 4) - 5, (matchDetails.pitchSize[0] - (matchDetails.pitchSize[0] / 4) + 5)), Common.getRandomNumber(matchDetails.pitchSize[1] - (matchDetails.pitchSize[1] / 6) + 5, matchDetails.pitchSize[1])];
					opposition.players[9].startPOS = [Common.getRandomNumber((matchDetails.pitchSize[0] / 4) - 5, (matchDetails.pitchSize[0] - (matchDetails.pitchSize[0] / 4) + 5)), Common.getRandomNumber(matchDetails.pitchSize[1] - (matchDetails.pitchSize[1] / 6) + 5, matchDetails.pitchSize[1])];
					opposition.players[10].startPOS = [matchDetails.pitchSize[0] / 2, matchDetails.pitchSize[1] + 20];
				} else if (ballPosition[0] < matchDetails.pitchSize[0] / 2) {
					var midGoal = matchDetails.pitchSize[0] / 2;
					matchDetails.ball.direction = "southeast";
					if (tempArray[1] > (matchDetails.pitchSize[1] - 15)) {
						opposition.players[8].startPOS = [tempArray[0] + ((midGoal - tempArray[0]) / 2), tempArray[1]];
						opposition.players[6].startPOS = [tempArray[0] + ((midGoal - tempArray[0]) / 2), tempArray[1] - 2];
						opposition.players[7].startPOS = [tempArray[0] + ((midGoal - tempArray[0]) / 2), tempArray[1] - 4];
					} else {
						opposition.players[8].startPOS = [tempArray[0] + ((midGoal - tempArray[0]) / 2), tempArray[1] + 10];
						opposition.players[6].startPOS = [tempArray[0] + ((midGoal - tempArray[0]) / 2), tempArray[1] + 12];
						opposition.players[7].startPOS = [tempArray[0] + ((midGoal - tempArray[0]) / 2), tempArray[1] + 14];
					}
					opposition.players[5].startPOS = [Common.getRandomNumber((matchDetails.pitchSize[0] / 4) - 5, (matchDetails.pitchSize[0] - (matchDetails.pitchSize[0] / 4) + 5)), Common.getRandomNumber(matchDetails.pitchSize[1] - (matchDetails.pitchSize[1] / 6) + 5, matchDetails.pitchSize[1])];
					opposition.players[9].startPOS = [Common.getRandomNumber((matchDetails.pitchSize[0] / 4) - 5, (matchDetails.pitchSize[0] - (matchDetails.pitchSize[0] / 4) + 5)), Common.getRandomNumber(matchDetails.pitchSize[1] - (matchDetails.pitchSize[1] / 6) + 5, matchDetails.pitchSize[1])];
					opposition.players[10].startPOS = [matchDetails.pitchSize[0] / 2, matchDetails.pitchSize[1] + 20];
				} else {
					matchDetails.ball.direction = "south";
					opposition.players[5].startPOS = [(matchDetails.pitchSize[0] / 2) - 4, tempArray[1] + 40];
					opposition.players[6].startPOS = [(matchDetails.pitchSize[0] / 2) - 2, tempArray[1] + 40];
					opposition.players[7].startPOS = [(matchDetails.pitchSize[0] / 2), tempArray[1] + 40];
					opposition.players[8].startPOS = [(matchDetails.pitchSize[0] / 2) + 2, tempArray[1] + 40];
					opposition.players[9].startPOS = [(matchDetails.pitchSize[0] / 2) + 4, tempArray[1] + 40];
					opposition.players[10].startPOS = [(matchDetails.pitchSize[0] / 2), matchDetails.pitchSize[1] - 30];
				}
			}
		}
		resolve();
	});
}

function setGoalScored(scoringTeam, conceedingTeam, matchDetails) {
	return new Promise((resolve, reject) => {
		setVariables.resetPlayerPositions(scoringTeam).then(() => {
			setVariables.resetPlayerPositions(conceedingTeam).then(() => {
				var playerWithBall = Common.getRandomNumber(9, 10);
				var waitingPlayer;
				if (playerWithBall === 9) {
					waitingPlayer = 10;
				} else {
					waitingPlayer = 9;
				}
				matchDetails.ball.position = [matchDetails.pitchSize[0] / 2, matchDetails.pitchSize[1] / 2];
				conceedingTeam.players[playerWithBall].startPOS = matchDetails.ball.position.map(x => x);
				conceedingTeam.players[playerWithBall].hasBall = true;
				matchDetails.ball.withPlayer = true;
				matchDetails.ball.Player = conceedingTeam.players[playerWithBall].name;
				matchDetails.ball.withTeam = conceedingTeam.name;
				var tempPosition = [matchDetails.ball.position[0] + 20, matchDetails.ball.position[1]];
				conceedingTeam.players[waitingPlayer].startPOS = tempPosition.map(x => x);
				conceedingTeam.intent = "attack";
				scoringTeam.intent = "defend";
				resolve();
			}).catch((error) => {
				console.error("Error when resetting player positions: ", error);
				console.error(matchDetails.iterationLog);
			});
		}).catch((error) => {
			console.error("Error when resetting player positions: ", error);
			console.error(matchDetails.iterationLog);
		});
	});
}

function keepInBoundaries(ballIntended, kickersSide, matchDetails) {
	return new Promise((resolve, reject) => {
		if (ballIntended[0] < 0 || ballIntended[0] > matchDetails.pitchSize[0] || ballIntended[1] < 0 || ballIntended[1] > matchDetails.pitchSize[1]) {
			if (ballIntended[0] < 0) {
				if (kickersSide > matchDetails.pitchSize[1] / 2) {
					setThrowIn(kickOffTeam, secondTeam, "left", ballIntended[1], matchDetails).then((ballIntended) => {
						matchDetails.iterationLog.push("Throw in to - " + kickOffTeam.name);
						resolve(ballIntended);
					}).catch((error) => {
						console.error("Error when setting up for a throwin: ", error);
						console.error(matchDetails.iterationLog);
					});
				} else {
					setThrowIn(secondTeam, kickOffTeam, "left", ballIntended[1], matchDetails).then((ballIntended) => {
						matchDetails.iterationLog.push("Throw in to - " + secondTeam.name);
						resolve(ballIntended);
					}).catch((error) => {
						console.error("Error when setting up for a throwin: ", error);
						console.error(matchDetails.iterationLog);
					});
				}
			} else if (ballIntended[0] > matchDetails.pitchSize[0]) {
				if (kickersSide > matchDetails.pitchSize[1] / 2) {
					setThrowIn(kickOffTeam, secondTeam, "right", ballIntended[1], matchDetails).then((ballIntended) => {
						matchDetails.iterationLog.push("Throw in to - " + kickOffTeam.name);
						resolve(ballIntended);
					}).catch((error) => {
						console.error("Error when setting up for a throwin: ", error);
						console.error(matchDetails.iterationLog);
					});
				} else {
					setThrowIn(secondTeam, kickOffTeam, "right", ballIntended[1], matchDetails).then((ballIntended) => {
						matchDetails.iterationLog.push("Throw in to - " + secondTeam.name);
						resolve(ballIntended);
					}).catch((error) => {
						console.error("Error when setting up for a throwin: ", error);
						console.error(matchDetails.iterationLog);
					});
				}
			}
			if (ballIntended[1] < 0) {
				var side;
				if (ballIntended[0] > matchDetails.pitchSize[0] / 2) {
					side = "right";
				} else {
					side = "left";
				}
				if (kickersSide > matchDetails.pitchSize[1] / 2) {
					setGoalKick(kickOffTeam, secondTeam, matchDetails).then((ballIntended) => {
						matchDetails.iterationLog.push("Goal Kick to - " + kickOffTeam.name);
						resolve(ballIntended);
					}).catch((error) => {
						console.error("Error when setting the goal kick: ", error);
						console.error(matchDetails.iterationLog);
					});
				} else {
					setCornerPositions(secondTeam, kickOffTeam, side, matchDetails).then((ballIntended) => {
						matchDetails.iterationLog.push("Corner to - " + secondTeam.name);
						resolve(ballIntended);
					}).catch((error) => {
						console.error("Error when setting corner: ", error);
						console.error(matchDetails.iterationLog);
					});
				}
			} else if (ballIntended[1] > matchDetails.pitchSize[1]) {
				var side;
				if (ballIntended[0] > matchDetails.pitchSize[0] / 2) {
					side = "right";
				} else {
					side = "left";
				}
				if (kickersSide > matchDetails.pitchSize[1] / 2) {
					setCornerPositions(kickOffTeam, secondTeam, side, matchDetails).then((ballIntended) => {
						matchDetails.iterationLog.push("Corner to - " + kickOffTeam.name);
						resolve(ballIntended);
					}).catch((error) => {
						console.error("Error when setting corner: ", error);
						console.error(matchDetails.iterationLog);
					});
				} else {
					setGoalKick(secondTeam, kickOffTeam, matchDetails).then((ballIntended) => {
						matchDetails.iterationLog.push("Goal Kick to - " + secondTeam.name);
						resolve(ballIntended);
					}).catch((error) => {
						console.error("Error when setting the goal kick: ", error);
						console.error(matchDetails.iterationLog);
					});
				}
			}
		} else if (Common.isBetween(ballIntended[0], (matchDetails.pitchSize[0] / 2) - 20, (matchDetails.pitchSize[0] / 2) + 20)) {
			closestPlayerToPosition("none", kickOffTeam, ballIntended).then(function (playerInformationA) {
				closestPlayerToPosition("none", secondTeam, ballIntended).then(function (playerInformationB) {
					var teamAPlayer = playerInformationA.thePlayer;
					var teamBPlayer = playerInformationB.thePlayer;
					if (teamAPlayer && teamAPlayer[0] === ballIntended[0] && teamAPlayer[1] === ballIntended[1]) {
						teamAPlayer.hasBall = true;
						matchDetails.ball.Player = teamAPlayer.name;
						matchDetails.ball.withPlayer = true;
						matchDetails.ball.withTeam = kickOffTeam.name;
					} else if (teamBPlayer && teamBPlayer[0] === ballIntended[0] && teamBPlayer[1] === ballIntended[1]) {
						teamBPlayer.hasBall = true;
						matchDetails.ball.Player = teamBPlayer.name;
						matchDetails.ball.withPlayer = true;
						matchDetails.ball.withTeam = secondTeam.name;
					} else {
						if (ballIntended[1] > matchDetails.pitchSize[1]) {
							ballIntended = [matchDetails.pitchSize[0] / 2, matchDetails.pitchSize[1] / 2];
							if (matchDetails.half === 1) {
								setGoalScored(kickOffTeam, secondTeam, matchDetails).then(() => {
									matchDetails.kickOffTeamStatistics.goals++;
									resolve(ballIntended);
								}).catch((error) => {
									console.error("Error when processing the goal: ", error);
									console.error(matchDetails.iterationLog);
								});
							} else {
								setGoalScored(secondTeam, kickOffTeam, matchDetails).then(() => {
									matchDetails.secondTeamStatistics.goals++;
									resolve(ballIntended);
								}).catch((error) => {
									console.error("Error when processing the goal: ", error);
									console.error(matchDetails.iterationLog);
								});
							}
						} else if (ballIntended[1] < 0) {
							ballIntended = [matchDetails.pitchSize[0] / 2, matchDetails.pitchSize[1] / 2];
							if (matchDetails.half === 1) {
								setGoalScored(secondTeam, kickOffTeam, matchDetails).then(() => {
									matchDetails.secondTeamStatistics.goals++;
									resolve(ballIntended);
								}).catch((error) => {
									console.error("Error when processing the goal: ", error);
									console.error(matchDetails.iterationLog);
								});
							} else {
								setGoalScored(kickOffTeam, secondTeam, matchDetails).then(() => {
									matchDetails.kickOffTeamStatistics.goals++;
									resolve(ballIntended);
								}).catch((error) => {
									console.error("Error when processing the goal: ", error);
									console.error(matchDetails.iterationLog);
								});
							}
						} else {
							resolve(ballIntended);
						}
					}
				}).catch((error) => {
					console.error("Error when finding the closest player to ball for accidental goal ", error);
				})
			}).catch((error) => {
				console.error("Error when finding the closest player to ball for accidental goal ", error);
			})
		} else {
			resolve(ballIntended);
		}
	});
}

function setPlayerPositions(matchDetails, team, extra) {
	return new Promise((resolve, reject) => {
		async.eachSeries(team.players, function eachPlayer(thisPlayer, thisPlayerCallback) {
			var tempArray = thisPlayer.originPOS;
			thisPlayer.startPOS = tempArray.map(x => x);
			if ((parseInt(thisPlayer.startPOS[1]) + extra) > matchDetails.pitchSize[1] || (parseInt(thisPlayer.startPOS[1]) + extra) < 0) {
				//stay where they are
			} else {
				thisPlayer.startPOS[1] = parseInt(thisPlayer.startPOS[1]) + extra;
			}
			thisPlayer.relativePOS = tempArray.map(x => x);
			thisPlayer.relativePOS[1] = parseInt(thisPlayer.relativePOS[1]) + extra;
			thisPlayerCallback();
		}, function afterAllPlayers() {
			resolve();
		});
	});
}

function formationCheck(origin, current) {
	return new Promise((resolve, reject) => {
		var xPos = origin[0] - current[0];
		var yPos = origin[1] - current[1];
		var moveToFormation = [];
		moveToFormation.push(xPos);
		moveToFormation.push(yPos);
		resolve(moveToFormation);
	});
}

function switchSide(team, matchDetails) {
	return new Promise((resolve, reject) => {
		if (!team) {
			reject("No Team supplied to switch side");
		}
		async.eachSeries(team.players, function eachPlayer(thisPlayer, thisPlayerCallback) {
			thisPlayer.originPOS[1] = matchDetails.pitchSize[1] - thisPlayer.originPOS[1];
			var tempArray = thisPlayer.originPOS;
			thisPlayer.startPOS = tempArray.map(x => x);
			thisPlayer.relativePOS = tempArray.map(x => x);
			thisPlayerCallback();
		}, function afterAllPlayers() {
			resolve(team);
		});
	});
}

function setRelativePosition(player, team, matchDetails) {
	return new Promise((resolve, reject) => {
		var tempArray = parseInt(player.startPOS[1]) - parseInt(player.originPOS[1]);
		async.eachSeries(team.players, function eachPlayer(thisPlayer, thisPlayerCallback) {
			var originArray = thisPlayer.originPOS;
			var possibleMove = parseInt(thisPlayer.originPOS[1]) + tempArray;
			if (thisPlayer.name === player.name) {
				thisPlayer.relativePOS = thisPlayer.startPOS.map(x => x);
			} else {
				if (team.intent === "attack") {
					if (thisPlayer.position !== "GK" && thisPlayer.position !== "CB") {
						if (thisPlayer.originPOS[1] > matchDetails.pitchSize[1] / 2) {
							if (possibleMove > thisPlayer.originPOS) {
								thisPlayer.relativePOS = originArray.map(x => x);
							} else {
								thisPlayer.relativePOS[1] = possibleMove;
							}
						} else {
							if (possibleMove < thisPlayer.originPOS) {
								thisPlayer.relativePOS = originArray.map(x => x);
							} else {
								thisPlayer.relativePOS[1] = possibleMove;
							}
						}
					} else {
						thisPlayer.relativePOS = originArray.map(x => x);
					}
				} else {
					thisPlayer.relativePOS = originArray.map(x => x);
				}
			}
			thisPlayerCallback();
		}, function afterAllBlayers() {
			resolve();
		});
	});
}

module.exports = {
	setCornerPositions: setCornerPositions,
	setPlayerPositions: setPlayerPositions,
	keepInBoundaries: keepInBoundaries,
	setThrowIn: setThrowIn,
	setGoalKick: setGoalKick,
	closestPlayerToPosition: closestPlayerToPosition,
	setSetpiece: setSetpiece,
	setPenalty: setPenalty,
	setFreekick: setFreekick,
	setGoalScored: setGoalScored,
	formationCheck: formationCheck,
	switchSide: switchSide,
	setRelativePosition: setRelativePosition
};

 */