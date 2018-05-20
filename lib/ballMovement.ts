import async = require('async');
import {Common} from "./Common";
import {SetPositions} from "./setPositions";
import {IPlayer} from "../models/player.model";
import {IPlayerInformation} from "../models/playerInformation.model";

let setPositions : SetPositions = new SetPositions();

export class BallMovement {

     ballKicked(matchDetails, player) {
        return new Promise((resolve, reject) => {
            const position = matchDetails.ball.position;
            let direction = matchDetails.ball.direction;
            matchDetails.iterationLog.push("ball kicked by: " + player.name);
            let newPosition = [0, 0];
            const teamShootingToTop = ["wait", "north", "north", "north", "north", "east", "east", "west", "west", "northeast", "northeast", "northeast", "northwest", "northwest", "northwest"];
            const teamShootingToBottom = ["wait", "south", "south", "south", "south", "east", "east", "west", "west", "southeast", "southeast", "southeast", "southwest", "southwest", "southwest"];
            const power = Common.calculatePower(player.skill.strength);
            if (player.originPOS[1] > (matchDetails.pitchSize[1] / 2)) {
                direction = teamShootingToTop[Common.getRandomNumber(0, teamShootingToTop.length - 1)];
                if (direction === "wait") {
                    newPosition = [position[0] + Common.getRandomNumber(0, (power / 2)), position[1] + Common.getRandomNumber(0, (power / 2))];
                } else if (direction === "north") {
                    newPosition = [position[0] + Common.getRandomNumber(-20, 20), position[1] + Common.getRandomNumber(-power, -(power / 2))];
                } else if (direction === "east") {
                    newPosition = [position[0] + Common.getRandomNumber((power / 2), power), position[1] + Common.getRandomNumber(-20, 20)];
                } else if (direction === "west") {
                    newPosition = [position[0] + Common.getRandomNumber(-power, -(power / 2)), position[1] + Common.getRandomNumber(-20, 20)];
                } else if (direction === "northeast") {
                    newPosition = [position[0] + Common.getRandomNumber(0, (power / 2)), position[1] + Common.getRandomNumber(-power, -(power / 2))];
                } else if (direction === "northwest") {
                    newPosition = [position[0] + Common.getRandomNumber(-(power / 2), 0), position[1] + Common.getRandomNumber(-power, -(power / 2))];
                }
            } else {
                direction = teamShootingToBottom[Common.getRandomNumber(0, teamShootingToBottom.length - 1)];
                if (direction === "wait") {
                    newPosition = [position[0] + Common.getRandomNumber(0, (power / 2)), position[1] + Common.getRandomNumber(0, (power / 2))];
                } else if (direction === "east") {
                    newPosition = [position[0] + Common.getRandomNumber((power / 2), power), position[1] + Common.getRandomNumber(-20, 20)];
                } else if (direction === "west") {
                    newPosition = [Common.getRandomNumber(position[0] - 120, position[0]), Common.getRandomNumber(position[1] - 30, position[1] + 30)];
                } else if (direction === "south") {
                    newPosition = [position[0] + Common.getRandomNumber(-20, 20), position[1] + Common.getRandomNumber((power / 2), power)];
                } else if (direction === "southeast") {
                    newPosition = [position[0] + Common.getRandomNumber(0, (power / 2)), position[1] + Common.getRandomNumber((power / 2), power)];
                } else if (direction === "southwest") {
                    newPosition = [position[0] + Common.getRandomNumber(-(power / 2), 0), position[1] + Common.getRandomNumber((power / 2), power)];
                }
            }
            this.resolveBallMovement(player, position, newPosition, power, matchDetails.kickOffTeam, matchDetails.secondTeam, matchDetails).then((endPosition) =>{
                matchDetails.iterationLog.push("resolving ball movement");
                matchDetails.iterationLog.push("new ball position: " + endPosition);
                resolve(endPosition);
            }).catch((error) => {
                console.error("Error when resolving the ball movement: ", error);
                console.error(matchDetails.iterationLog);
            });
        });
    }

    shotMade(matchDetails, team, opposition, player) {
        return new Promise((resolve, reject) => {
            const position = matchDetails.ball.position;
            const direction = matchDetails.ball.direction;
            matchDetails.iterationLog.push("Shot Made by: " + player.name);
            const shotPosition = [0, 0];
            let distanceFromGoal;
            const shotPower = Common.calculatePower(player.skill.strength);
            if (player.originPOS[1] > matchDetails.pitchSize[1] / 2) {
                distanceFromGoal = player.startPOS[1] - 0;
                if (Common.isBetween(shotPower, distanceFromGoal, distanceFromGoal + 50)) {
                    if (player.skill.shooting > Common.getRandomNumber(0, 100)) {
                        matchDetails.iterationLog.push("Shot On Target");
                        shotPosition[0] = Common.getRandomNumber((matchDetails.pitchSize[0] / 2) - 20, (matchDetails.pitchSize[0] / 2) + 20);
                        shotPosition[1] = 0;
                        matchDetails.secondTeamStatistics.shots++;
                        this.resolveBallMovement(player, player.startPOS, shotPosition, shotPower, team, opposition, matchDetails).then( (endPosition) => {
                            matchDetails.iterationLog.push("resolving ball movement whilst making a shot");
                            if (shotPosition[0] !== endPosition[0] || shotPosition[1] !== endPosition[1]) {
                                matchDetails.iterationLog.push("Ball deflected to: " + endPosition);
                            }
                            if (Common.isBetween(opposition.players[0].startPOS[0], endPosition[0] - 15, endPosition[0] + 15) && Common.isBetween(opposition.players[0].startPOS[1], -1, 5)) {
                                if (opposition.players[0].skill.saving > Common.getRandomNumber(0, 100)) {
                                    matchDetails.iterationLog.push("Shot Saved by: " + opposition.players[0].name);
                                    opposition.players[0].hasBall = true;
                                    matchDetails.ball.Player = opposition.players[0].name;
                                    const tempArray = opposition.players[0].startPOS;
                                    matchDetails.ball.position = tempArray.map(x => x);
                                    opposition.intent = "attack";
                                    team.intent = "defend";
                                    resolve(endPosition);
                                } else {
                                    setPositions.setGoalScored(team, opposition, matchDetails).then(() =>{
                                        matchDetails.iterationLog.push("Goal Scored by: " + player.name);
                                        matchDetails.secondTeamStatistics.goals++;
                                        resolve(endPosition);
                                    }).catch((error) => {
                                        console.error("Error when processing the goal: ", error);
                                        console.error(matchDetails.iterationLog);
                                    });
                                }
                            } else {
                                setPositions.setGoalScored(team, opposition, matchDetails).then(() =>{
                                    matchDetails.iterationLog.push("Goal Scored by - " + player.name);
                                    matchDetails.secondTeamStatistics.goals++;
                                    resolve(endPosition);
                                }).catch((error) => {
                                    console.error("Error when processing the goal: ", error);
                                    console.error(matchDetails.iterationLog);
                                });
                            }
                        }).catch((error) => {
                            console.error("Error when resolving ball movement during the shot: ", error);
                            console.error(matchDetails.iterationLog);
                        });
                    } else {
                        shotPosition[0] = Common.getRandomNumber((matchDetails.pitchSize[0] / 2) - 30, (matchDetails.pitchSize[0] / 2) + 30);
                        shotPosition[1] = Common.getRandomNumber(1, 20);
                        this.resolveBallMovement(player, player.startPOS, shotPosition, shotPower, team, opposition, matchDetails).then(function (endPosition) {
                            matchDetails.iterationLog.push("Shot Off Target");
                            matchDetails.iterationLog.push("resolving ball movement");
                            if (shotPosition[0] !== endPosition[0] || shotPosition[1] !== endPosition[1]) {
                                matchDetails.iterationLog.push("Ball deflected to: " + endPosition);
                            }
                            resolve(endPosition);
                        }).catch((error) => {
                            console.error("Error when resolving ball movement after a failed shot: ", error);
                            console.error(error);
                        });
                    }
                } else if (shotPower > (distanceFromGoal + 49)) {
                    setPositions.setGoalKick(opposition, team, matchDetails).then(function (endPosition) {
                        matchDetails.iterationLog.push("Shot Missed the goal, Goal Kick to: " + opposition.name);
                        resolve(endPosition);
                    }).catch((error) => {
                        console.error("Error when setting a goal kick after a shot has been made: ", error);
                        console.error(matchDetails.iterationLog);
                    });
                } else {
                    matchDetails.iterationLog.push("Shot not hard enough by: " + opposition.name);
                    shotPosition[0] = matchDetails.ball.position[0];
                    shotPosition[1] = matchDetails.ball.position[1] - shotPower;
                    this.resolveBallMovement(player, player.startPOS, shotPosition, shotPower, team, opposition, matchDetails).then(function (endPosition) {
                        matchDetails.iterationLog.push("Shot Off Target");
                        matchDetails.iterationLog.push("resolving ball movement");
                        if (shotPosition[0] !== endPosition[0] || shotPosition[1] !== endPosition[1]) {
                            matchDetails.iterationLog.push("Ball deflected to: " + endPosition);
                        }
                        resolve(endPosition);
                    }).catch((error) => {
                        console.error("Error when resolving ball movement after a failed shot: ", error);
                        console.error(matchDetails.iterationLog);
                    });
                }
            } else {
                distanceFromGoal = matchDetails.pitchSize[1] - player.startPOS[1];
                if (Common.isBetween(shotPower, distanceFromGoal, distanceFromGoal + 50)) {
                    if (player.skill.shooting > Common.getRandomNumber(0, 100)) {
                        matchDetails.iterationLog.push("Shot On Target");
                        shotPosition[0] = Common.getRandomNumber((matchDetails.pitchSize[0] / 2) - 20, (matchDetails.pitchSize[0] / 2) + 20);
                        shotPosition[1] = matchDetails.pitchSize[1];
                        matchDetails.kickOffTeamStatistics.shots++;
                        this.resolveBallMovement(player, player.startPOS, shotPosition, shotPower, team, opposition, matchDetails).then(function (endPosition) {
                            matchDetails.iterationLog.push("resolving ball movement whilst making a shot");
                            if (shotPosition[0] !== endPosition[0] || shotPosition[1] !== endPosition[1]) {
                                matchDetails.iterationLog.push("Ball deflected to: " + endPosition);
                            }
                            if (Common.isBetween(opposition.players[0].startPOS[0], endPosition[0] - 5, endPosition[0] + 5) && Common.isBetween(opposition.players[0].startPOS[1], matchDetails.pitchSize[1] - 5, matchDetails.pitchSize[1] + 1)) {
                                if (opposition.players[0].skill.saving > Common.getRandomNumber(0, 100)) {
                                    matchDetails.iterationLog.push("Shot Saved by: " + opposition.players[0].name);
                                    opposition.players[0].hasBall = true;
                                    matchDetails.ball.Player = opposition.players[0].name;
                                    var tempArray = opposition.players[0].startPOS;
                                    matchDetails.ball.position = tempArray.map(x => x);
                                    opposition.intent = "attack";
                                    team.intent = "defend";
                                    resolve(endPosition);
                                } else {
                                    setPositions.setGoalScored(team, opposition, matchDetails).then(() =>{
                                        matchDetails.iterationLog.push("Goal Scored by: " + player.name);
                                        matchDetails.kickOffTeamStatistics.goals++;
                                        resolve(endPosition);
                                    }).catch((error) => {
                                        console.error("Error when processing the goal: ", error);
                                        console.error(matchDetails.iterationLog);
                                    });
                                }
                            } else {
                                setPositions.setGoalScored(team, opposition, matchDetails).then(() =>{
                                    matchDetails.iterationLog.push("Goal Scored by: " + player.name);
                                    matchDetails.kickOffTeamStatistics.goals++;
                                    resolve(endPosition);
                                }).catch((error) => {
                                    console.error("Error when processing the goal: ", error);
                                    console.error(matchDetails.iterationLog);
                                });
                            }
                        }).catch((error) => {
                            console.error("Error when resolving ball movement during the shot: ", error);
                            console.error(matchDetails.iterationLog);
                        });
                    } else {
                        shotPosition[0] = Common.getRandomNumber((matchDetails.pitchSize[0] / 2) - 30, (matchDetails.pitchSize[0] / 2) + 30);
                        shotPosition[1] = Common.getRandomNumber(matchDetails.pitchSize[1] - 1, matchDetails.pitchSize[1] - 20);
                        this.resolveBallMovement(player, player.startPOS, shotPosition, shotPower, team, opposition, matchDetails).then(function (endPosition) {
                            matchDetails.iterationLog.push("Shot Off Target");
                            if (shotPosition[0] !== endPosition[0] || shotPosition[1] !== endPosition[1]) {
                                matchDetails.iterationLog.push("Ball deflected to: " + endPosition);
                            }
                            resolve(endPosition);
                        }).catch((error) => {
                            console.error("Error when resolving ball movement after a failed shot: ", error);
                            console.error(matchDetails.iterationLog);
                        });
                    }
                } else if (shotPower > (distanceFromGoal + 49)) {
                    setPositions.setGoalKick(opposition, team, matchDetails).then(function (endPosition) {
                        matchDetails.iterationLog.push("Shot Missed, Goal Kick to: " + opposition.name);
                        resolve(endPosition);
                    }).catch((error) => {
                        console.error("Error when setting a goal kick after a shot has been made: ", error);
                        console.error(matchDetails.iterationLog);
                    });
                } else {
                    matchDetails.iterationLog.push("Shot not hard enough by: " + opposition.name);
                    shotPosition[0] = matchDetails.ball.position[0];
                    shotPosition[1] = matchDetails.ball.position[1] + shotPower;
                    matchDetails.iterationLog.push("resolving ball movement");
                    this.resolveBallMovement(player, player.startPOS, shotPosition, shotPower, team, opposition, matchDetails).then(function (endPosition) {
                        matchDetails.iterationLog.push("Shot Off Target");
                        if (shotPosition[0] !== endPosition[0] || shotPosition[1] !== endPosition[1]) {
                            matchDetails.iterationLog.push("Ball deflected to: " + endPosition);
                        }
                        resolve(endPosition);
                    }).catch((error) => {
                        console.error("Error when resolving ball movement after a failed shot: ", error);
                        console.error(matchDetails.iterationLog);
                    });
                }
            }
        });
    }

    throughBall(matchDetails, teammates, player) {
        return new Promise((resolve, reject) => {
            const position = matchDetails.ball.position;
            const direction = matchDetails.ball.direction;
            const closestPlayerPosition = [0, 0];
            const playersInDistance = [];
            async.eachSeries(teammates.players, function eachPlayer(teamPlayer : IPlayer, teamPlayerCallback) {
                if (teamPlayer.name === player.name) {
                    //do nothing
                    teamPlayerCallback();
                } else {
                    const playerToPlayerX = player.startPOS[0] - teamPlayer.startPOS[0];
                    const playerToPlayerY = player.startPOS[1] - teamPlayer.startPOS[1];
                    const proximityToBall = Math.abs(playerToPlayerX + playerToPlayerY);
                    playersInDistance.push({
                        "position": teamPlayer.startPOS,
                        "proximity": proximityToBall,
                        "name": teamPlayer.name
                    });
                    teamPlayerCallback();
                }
            }, function afterAllPlayers() {
                playersInDistance.sort(function (a, b) {
                    return a.proximity - b.proximity;
                });
                const targetPlayer = playersInDistance[Common.getRandomNumber(0, 9)];
                matchDetails.iterationLog.push("through ball passed by: " + player.name + " to: " + targetPlayer.name);
                if (player.skill.passing > Common.getRandomNumber(0, 100)) {
                    if (player.originPOS[1] > matchDetails.pitchSize[1] / 2) {
                        closestPlayerPosition[0] = targetPlayer.position[0];
                        closestPlayerPosition[1] = targetPlayer.position[1] - 10;
                    } else {
                        closestPlayerPosition[0] = targetPlayer.position[0];
                        closestPlayerPosition[1] = targetPlayer.position[1] + 10;
                    }
                } else {
                    if (player.originPOS[1] > (matchDetails.pitchSize[1] / 2)) {
                        if (position[1] > (matchDetails.pitchSize[1] - (matchDetails.pitchSize[1] / 3))) {
                            closestPlayerPosition[0] = targetPlayer.position[0] + Common.getRandomNumber(-10, 10);
                            closestPlayerPosition[1] = targetPlayer.position[1] + Common.getRandomNumber(-10, 10);
                        } else if (position[1] > (matchDetails.pitchSize[1] / 3) && position[1] < (matchDetails.pitchSize[1] - (matchDetails.pitchSize[1] / 3))) {
                            closestPlayerPosition[0] = targetPlayer.position[0] + Common.getRandomNumber(-20, 20);
                            closestPlayerPosition[1] = targetPlayer.position[1] + Common.getRandomNumber(-50, 50);
                        } else {
                            closestPlayerPosition[0] = targetPlayer.position[0] + Common.getRandomNumber(-30, 30);
                            closestPlayerPosition[1] = targetPlayer.position[1] + Common.getRandomNumber(-100, 100);
                        }
                    } else {
                        if (position[1] > (matchDetails.pitchSize[1] - (matchDetails.pitchSize[1] / 3))) {
                            closestPlayerPosition[0] = targetPlayer.position[0] + Common.getRandomNumber(-30, 30);
                            closestPlayerPosition[1] = targetPlayer.position[1] + Common.getRandomNumber(-100, 100);
                        } else if (position[1] > (matchDetails.pitchSize[1] / 3) && position[1] < (matchDetails.pitchSize[1] - (matchDetails.pitchSize[1] / 3))) {
                            closestPlayerPosition[0] = targetPlayer.position[0] + Common.getRandomNumber(-20, 20);
                            closestPlayerPosition[1] = targetPlayer.position[1] + Common.getRandomNumber(-50, 50);
                        } else {
                            closestPlayerPosition[0] = targetPlayer.position[0] + Common.getRandomNumber(-10, 10);
                            closestPlayerPosition[1] = targetPlayer.position[1] + Common.getRandomNumber(-10, 10);
                        }
                    }
                }
                const power = Common.calculatePower(player.skill.strength);
                BallMovement.prototype.resolveBallMovement(player, position, closestPlayerPosition, power, matchDetails.kickOffTeam, matchDetails.secondTeam, matchDetails).then( (endPosition) => {
                    matchDetails.iterationLog.push("resolving ball movement");
                    matchDetails.iterationLog.push("new ball position: " + endPosition);
                    resolve(endPosition);
                }).catch((error) => {
                    console.error("Error when resolving the ball movement: ", error);
                    console.error(matchDetails.iterationLog);
                });
            });
        });
    }

     resolveBallMovement(player, currentPOS, newPOS, power, team, opposition, matchDetails) {
        return new Promise((resolve, reject) => {
            let deflectionPlayer;
            let deflectionPosition;
            let deflectionTeam;
            Common.prototype.getBallTrajectory(currentPOS, newPOS, power).then(function (lineToEndPosition) {
                async.eachSeries(lineToEndPosition, function eachPos(thisPos, thisPosCallback) {
                        setPositions.closestPlayerToPosition(player, team, thisPos).then((playerInformation: IPlayerInformation) => {
                            let thisTeamPlayer = playerInformation.thePlayer;
                            if (thisTeamPlayer && thisTeamPlayer.startPOS[0] === thisPos[0] && thisTeamPlayer.startPOS[1] === thisPos[1]) {
                                if (!deflectionPlayer) {
                                    if (thisPos[2] < thisTeamPlayer.skill.jumping && thisPos[2] > 49) {
                                        deflectionPlayer = thisTeamPlayer;
                                        deflectionPosition = thisPos;
                                        deflectionTeam = team.name;
                                    }
                                }
                                thisPosCallback();
                            } else {
                                setPositions.closestPlayerToPosition(player, opposition, thisPos).then( (playerInformation: IPlayerInformation) => {
                                    var thatTeamPlayer = playerInformation.thePlayer;
                                    if (thatTeamPlayer) {
                                        if (thatTeamPlayer.startPOS[0] === thisPos[0] && thatTeamPlayer.startPOS[1] === thisPos[1]) {
                                            if (!deflectionPlayer) {
                                                if (thisPos[2] < thatTeamPlayer.skill.jumping && thisPos[2] < 49) {
                                                    deflectionPlayer = thatTeamPlayer;
                                                    deflectionPosition = thisPos;
                                                    deflectionTeam = opposition.name;
                                                }
                                            }
                                        }
                                    }
                                    thisPosCallback();
                                }).catch((error) => {
                                    console.error("Error when getting this teams closest player to that position: ", error);
                                    console.error(matchDetails.iterationLog);
                                });
                            }
                        }).catch((error) => {
                            console.error("Error when getting this teams closest player to this position: ", error);
                            console.error(matchDetails.iterationLog);
                        });
                    },
                    function afterAllPos() {
                        if (!deflectionPlayer) {
                            setPositions.keepInBoundaries(newPOS, player.originPOS[1], matchDetails, matchDetails.kickOffTeam, matchDetails.secondTeam).then(function (finalPosition) {
                                matchDetails.iterationLog.push("Ball reached its target");
                                resolve(finalPosition);
                            }).catch((error) => {
                                console.error("Error when keeping ball in boundaries: ", error);
                                console.error(matchDetails.iterationLog);
                            });
                        } else {
                            BallMovement.prototype.resolveDeflection(power, currentPOS, deflectionPosition, deflectionPlayer, deflectionTeam, matchDetails).then(function (newPosition) {
                                matchDetails.iterationLog.push("Ball deflected");
                                resolve(newPosition);
                            }).catch((error) => {
                                console.error("Error when resolving the deflection: ", error);
                                console.error(matchDetails.iterationLog);
                            });
                        }
                    });
            }).catch((error) => {
                console.error("Error when getting the ball trajectory: ", error);
                console.error(matchDetails.iterationLog);
            });
        });
    }

    resolveDeflection(power, currentPOS, deflectionPosition, deflectionPlayer, deflectionTeam, matchDetails) {
        return new Promise((resolve, reject) => {
            const xMovement = Math.pow((currentPOS[0] - deflectionPosition[0]), 2);
            const yMovement = Math.pow((currentPOS[1] - deflectionPosition[1]), 2);
            const movementDistance = Math.sqrt(xMovement + yMovement);
            const newPower = power - movementDistance;
            let tempPosition =[0,0];
            if (newPower < 75) {
                deflectionPlayer.hasBall = true;
                matchDetails.ball.Player = deflectionPlayer.name;
                matchDetails.ball.withPlayer = true;
                matchDetails.ball.withTeam = deflectionTeam;
            } else {
                if (matchDetails.ball.direction === "east" || matchDetails.ball.direction === "northeast" || matchDetails.ball.direction === "southeast") {
                    if (matchDetails.ball.direction === "east") {
                        tempPosition[1] = Common.getRandomNumber(deflectionPosition[1] - 3, deflectionPosition[1] + 3);
                    }
                    tempPosition[0] = deflectionPosition[0] - (newPower / 2);
                } else if (matchDetails.ball.direction === "west" || matchDetails.ball.direction === "northwest" || matchDetails.ball.direction === "southwest") {
                    if (matchDetails.ball.direction === "west") {
                        tempPosition[1] = Common.getRandomNumber(deflectionPosition[1] - 3, deflectionPosition[1] + 3);
                    }
                    tempPosition[0] = deflectionPosition[0] + (newPower / 2);
                }
                if (matchDetails.ball.direction === "north" || matchDetails.ball.direction === "northeast" || matchDetails.ball.direction === "northwest") {
                    if (matchDetails.ball.direction === "north") {
                        tempPosition[0] = Common.getRandomNumber(deflectionPosition[0] - 3, deflectionPosition[0] + 3);
                    }
                    tempPosition[1] = deflectionPosition[1] + (newPower / 2);
                } else if (matchDetails.ball.direction === "south" || matchDetails.ball.direction === "southeast" || matchDetails.ball.direction === "southwest") {
                    if (matchDetails.ball.direction === "south") {
                        tempPosition[0] = Common.getRandomNumber(deflectionPosition[0] - 3, deflectionPosition[0] + 3);
                    }
                    tempPosition[1] = deflectionPosition[1] - (newPower / 2);
                }
                if (matchDetails.ball.direction === "wait") {
                    tempPosition[0] = Common.getRandomNumber(-newPower / 2, newPower / 2);
                    tempPosition[1] = Common.getRandomNumber(-newPower / 2, newPower / 2);
                }
                setPositions.keepInBoundaries(tempPosition, deflectionPlayer.originPOS[1], matchDetails, matchDetails.kickOffTeam, matchDetails.secondTeam).then(function (finalPosition) {
                    resolve(finalPosition);
                }).catch((error) => {
                    console.error("Error when keeping ball in boundaries: ", error);
                    console.error(matchDetails.iterationLog);
                });
            }
        });
    }

    getBallDirection(matchDetails, nextPOS) {
        return new Promise((resolve, reject) => {
            const currentPOS = matchDetails.ball.position;
            // - - is south east
            // - + is north east
            // + - is south west
            // ++ is north west
            const movementX = currentPOS[0] - nextPOS[0];
            const movementY = currentPOS[1] - nextPOS[1];
            if (movementX === 0) {
                if (movementY === 0) {
                    matchDetails.ball.direction = "wait";
                } else if (movementY < 0) {
                    matchDetails.ball.direction = "south";
                } else if (movementY > 0) {
                    matchDetails.ball.direction = "north";
                }
            } else if (movementY === 0) {
                if (movementX < 0) {
                    matchDetails.ball.direction = "east";
                } else if (movementX > 0) {
                    matchDetails.ball.direction = "west";
                }
            } else if (movementX < 0 && movementY < 0) {
                matchDetails.ball.direction = "southeast";
            } else if (movementX > 0 && movementY > 0) {
                matchDetails.ball.direction = "northwest";
            } else if (movementX > 0 && movementY < 0) {
                matchDetails.ball.direction = "southwest";
            } else if (movementX < 0 && movementY > 0) {
                matchDetails.ball.direction = "northeast";
            }
            resolve();
        });
    }

    ballPassed(matchDetails, teammates, player) {
        return new Promise((resolve, reject) => {
            const position = matchDetails.ball.position;
            const direction = matchDetails.ball.direction;
            let closestPlayerPosition = [0, 0];
            const playersInDistance = [];
            async.eachSeries(teammates.players, function eachPlayer(teamPlayer : IPlayer, teamPlayerCallback) {
                if (teamPlayer.name === player.name) {
                    //do nothing
                    teamPlayerCallback();
                } else {
                    const playerToPlayerX = player.startPOS[0] - teamPlayer.startPOS[0];
                    const playerToPlayerY = player.startPOS[1] - teamPlayer.startPOS[1];
                    const proximityToBall = Math.abs(playerToPlayerX + playerToPlayerY);
                    playersInDistance.push({
                        "position": teamPlayer.startPOS,
                        "proximity": proximityToBall,
                        "name": teamPlayer.name
                    });
                    teamPlayerCallback();
                }
            }, function afterAllPlayers() {
                playersInDistance.sort(function (a, b) {
                    return a.proximity - b.proximity
                });
                const targetPlayer = playersInDistance[Common.getRandomNumber(0, 9)];
                if (player.skill.passing > Common.getRandomNumber(0, 100)) {
                    closestPlayerPosition = targetPlayer.position;
                } else {
                    if (player.originPOS[1] > (matchDetails.pitchSize[1] / 2)) {
                        if (position[1] > (matchDetails.pitchSize[1] - (matchDetails.pitchSize[1] / 3))) {
                            closestPlayerPosition[0] = targetPlayer.position[0] + Common.getRandomNumber(-10, 10);
                            closestPlayerPosition[1] = targetPlayer.position[1] + Common.getRandomNumber(-10, 10);
                        } else if (position[1] > (matchDetails.pitchSize[1] / 3) && position[1] < (matchDetails.pitchSize[1] - (matchDetails.pitchSize[1] / 3))) {
                            closestPlayerPosition[0] = targetPlayer.position[0] + Common.getRandomNumber(-50, 50);
                            closestPlayerPosition[1] = targetPlayer.position[1] + Common.getRandomNumber(-50, 50);
                        } else {
                            closestPlayerPosition[0] = targetPlayer.position[0] + Common.getRandomNumber(-100, 100);
                            closestPlayerPosition[1] = targetPlayer.position[1] + Common.getRandomNumber(-100, 100);
                        }
                    } else {
                        if (position[1] > (matchDetails.pitchSize[1] - (matchDetails.pitchSize[1] / 3))) {
                            closestPlayerPosition[0] = targetPlayer.position[0] + Common.getRandomNumber(-100, 100);
                            closestPlayerPosition[1] = targetPlayer.position[1] + Common.getRandomNumber(-100, 100);
                        } else if (position[1] > (matchDetails.pitchSize[1] / 3) && position[1] < (matchDetails.pitchSize[1] - (matchDetails.pitchSize[1] / 3))) {
                            closestPlayerPosition[0] = targetPlayer.position[0] + Common.getRandomNumber(-50, 50);
                            closestPlayerPosition[1] = targetPlayer.position[1] + Common.getRandomNumber(-50, 50);
                        } else {
                            closestPlayerPosition[0] = targetPlayer.position[0] + Common.getRandomNumber(-10, 10);
                            closestPlayerPosition[1] = targetPlayer.position[1] + Common.getRandomNumber(-10, 10);
                        }
                    }
                }
                matchDetails.iterationLog.push("ball passed by: " + player.name + " to: " + targetPlayer.name);
                const power = Common.calculatePower(player.skill.strength);
                BallMovement.prototype.resolveBallMovement(player, position, closestPlayerPosition, power, matchDetails.kickOffTeam, matchDetails.secondTeam, matchDetails).then((endPosition) => {
                    resolve(endPosition);
                }).catch((error) => {
                    console.error("Error when resolving the ball movement: ", error);
                    console.error(matchDetails.iterationLog);
                });
            });
        });
    }
}


/*

var async = require("async");
var common = require("../lib/common");
var setPositions = require("../lib/setPositions");

function ballKicked(matchDetails, player) {
    return new Promise((resolve, reject) => {
        var position = matchDetails.ball.position;
        var direction = matchDetails.ball.direction;
        matchDetails.iterationLog.push("ball kicked by: " + player.name);
        var newPosition = [0, 0];
        var teamShootingToTop = ["wait", "north", "north", "north", "north", "east", "east", "west", "west", "northeast", "northeast", "northeast", "northwest", "northwest", "northwest"];
        var teamShootingToBottom = ["wait", "south", "south", "south", "south", "east", "east", "west", "west", "southeast", "southeast", "southeast", "southwest", "southwest", "southwest"];
        var power = Common.calculatePower(player.skill.strength);
        if (player.originPOS[1] > (matchDetails.pitchSize[1] / 2)) {
            direction = teamShootingToTop[Common.getRandomNumber(0, teamShootingToTop.length - 1)];
            if (direction === "wait") {
                newPosition = [position[0] + Common.getRandomNumber(0, (power / 2)), position[1] + Common.getRandomNumber(0, (power / 2))];
            } else if (direction === "north") {
                newPosition = [position[0] + Common.getRandomNumber(-20, 20), position[1] + Common.getRandomNumber(-power, -(power / 2))];
            } else if (direction === "east") {
                newPosition = [position[0] + Common.getRandomNumber((power / 2), power), position[1] + Common.getRandomNumber(-20, 20)];
            } else if (direction === "west") {
                newPosition = [position[0] + Common.getRandomNumber(-power, -(power / 2)), position[1] + Common.getRandomNumber(-20, 20)];
            } else if (direction === "northeast") {
                newPosition = [position[0] + Common.getRandomNumber(0, (power / 2)), position[1] + Common.getRandomNumber(-power, -(power / 2))];
            } else if (direction === "northwest") {
                newPosition = [position[0] + Common.getRandomNumber(-(power / 2), 0), position[1] + Common.getRandomNumber(-power, -(power / 2))];
            }
        } else {
            direction = teamShootingToBottom[Common.getRandomNumber(0, teamShootingToBottom.length - 1)];
            if (direction === "wait") {
                newPosition = [position[0] + Common.getRandomNumber(0, (power / 2)), position[1] + Common.getRandomNumber(0, (power / 2))];
            } else if (direction === "east") {
                newPosition = [position[0] + Common.getRandomNumber((power / 2), power), position[1] + Common.getRandomNumber(-20, 20)];
            } else if (direction === "west") {
                newPosition = [Common.getRandomNumber(position[0] - 120, position[0]), Common.getRandomNumber(position[1] - 30, position[1] + 30)];
            } else if (direction === "south") {
                newPosition = [position[0] + Common.getRandomNumber(-20, 20), position[1] + Common.getRandomNumber((power / 2), power)];
            } else if (direction === "southeast") {
                newPosition = [position[0] + Common.getRandomNumber(0, (power / 2)), position[1] + Common.getRandomNumber((power / 2), power)];
            } else if (direction === "southwest") {
                newPosition = [position[0] + Common.getRandomNumber(-(power / 2), 0), position[1] + Common.getRandomNumber((power / 2), power)];
            }
        }
        resolveBallMovement(player, position, newPosition, power, kickOffTeam, secondTeam, matchDetails).then(function (endPosition) {
            matchDetails.iterationLog.push("resolving ball movement");
            matchDetails.iterationLog.push("new ball position: " + endPosition);
            resolve(endPosition);
        }).catch((error) => {
            console.error("Error when resolving the ball movement: ", error);
            console.error(matchDetails.iterationLog);
        });
    });
}

function shotMade(matchDetails, team, opposition, player) {
    return new Promise((resolve, reject) => {
        var position = matchDetails.ball.position;
        var direction = matchDetails.ball.direction;
        matchDetails.iterationLog.push("Shot Made by: " + player.name);
        var shotPosition = [0, 0];
        var distanceFromGoal;
        var shotPower = Common.calculatePower(player.skill.strength);
        if (player.originPOS[1] > matchDetails.pitchSize[1] / 2) {
            distanceFromGoal = player.startPOS[1] - 0;
            if (Common.isBetween(shotPower, distanceFromGoal, distanceFromGoal + 50)) {
                if (player.skill.shooting > Common.getRandomNumber(0, 100)) {
                    matchDetails.iterationLog.push("Shot On Target");
                    shotPosition[0] = Common.getRandomNumber((matchDetails.pitchSize[0] / 2) - 20, (matchDetails.pitchSize[0] / 2) + 20);
                    shotPosition[1] = 0;
                    matchDetails.secondTeamStatistics.shots++;
                    resolveBallMovement(player, player.startPOS, shotPosition, shotPower, team, opposition, matchDetails).then(function (endPosition) {
                        matchDetails.iterationLog.push("resolving ball movement whilst making a shot");
                        if (shotPosition[0] !== endPosition[0] || shotPosition[1] !== endPosition[1]) {
                            matchDetails.iterationLog.push("Ball deflected to: " + endPosition);
                        }
                        if (Common.isBetween(opposition.players[0].startPOS[0], endPosition[0] - 15, endPosition[0] + 15) && Common.isBetween(opposition.players[0].startPOS[1], -1, 5)) {
                            if (opposition.players[0].skill.saving > Common.getRandomNumber(0, 100)) {
                                matchDetails.iterationLog.push("Shot Saved by: " + opposition.players[0].name);
                                opposition.players[0].hasBall = true;
                                matchDetails.ball.Player = opposition.players[0].name;
                                var tempArray = opposition.players[0].startPOS;
                                matchDetails.ball.position = tempArray.map(x => x);
                                opposition.intent = "attack";
                                team.intent = "defend";
                                resolve(endPosition);
                            } else {
                                setPositions.setGoalScored(team, opposition, matchDetails).then(() =>{
                                    matchDetails.iterationLog.push("Goal Scored by: " + player.name);
                                    matchDetails.secondTeamStatistics.goals++;
                                    resolve(endPosition);
                                }).catch((error) => {
                                    console.error("Error when processing the goal: ", error);
                                    console.error(matchDetails.iterationLog);
                                });
                            }
                        } else {
                            setPositions.setGoalScored(team, opposition, matchDetails).then(() =>{
                                matchDetails.iterationLog.push("Goal Scored by - " + player.name);
                                matchDetails.secondTeamStatistics.goals++;
                                resolve(endPosition);
                            }).catch((error) => {
                                console.error("Error when processing the goal: ", error);
                                console.error(matchDetails.iterationLog);
                            });
                        }
                    }).catch((error) => {
                        console.error("Error when resolving ball movement during the shot: ", error);
                        console.error(matchDetails.iterationLog);
                    });
                } else {
                    shotPosition[0] = Common.getRandomNumber((matchDetails.pitchSize[0] / 2) - 30, (matchDetails.pitchSize[0] / 2) + 30);
                    shotPosition[1] = Common.getRandomNumber(1, 20);
                    resolveBallMovement(player, player.startPOS, shotPosition, shotPower, team, opposition, matchDetails).then(function (endPosition) {
                        matchDetails.iterationLog.push("Shot Off Target");
                        matchDetails.iterationLog.push("resolving ball movement");
                        if (shotPosition[0] !== endPosition[0] || shotPosition[1] !== endPosition[1]) {
                            matchDetails.iterationLog.push("Ball deflected to: " + endPosition);
                        }
                        resolve(endPosition);
                    }).catch((error) => {
                        console.error("Error when resolving ball movement after a failed shot: ", error);
                        console.error(iterationLog);
                    });
                }
            } else if (shotPower > (distanceFromGoal + 49)) {
                setPositions.setGoalKick(opposition, team, matchDetails).then(function (endPosition) {
                    matchDetails.iterationLog.push("Shot Missed the goal, Goal Kick to: " + opposition.name);
                    resolve(endPosition);
                }).catch((error) => {
                    console.error("Error when setting a goal kick after a shot has been made: ", error);
                    console.error(matchDetails.iterationLog);
                });
            } else {
                matchDetails.iterationLog.push("Shot not hard enough by: " + opposition.name);
                shotPosition[0] = matchDetails.ball.position[0];
                shotPosition[1] = matchDetails.ball.position[1] - shotPower;
                resolveBallMovement(player, player.startPOS, shotPosition, shotPower, team, opposition, matchDetails).then(function (endPosition) {
                    matchDetails.iterationLog.push("Shot Off Target");
                    matchDetails.iterationLog.push("resolving ball movement");
                    if (shotPosition[0] !== endPosition[0] || shotPosition[1] !== endPosition[1]) {
                        matchDetails.iterationLog.push("Ball deflected to: " + endPosition);
                    }
                    resolve(endPosition);
                }).catch((error) => {
                    console.error("Error when resolving ball movement after a failed shot: ", error);
                    console.error(matchDetails.iterationLog);
                });
            }
        } else {
            distanceFromGoal = matchDetails.pitchSize[1] - player.startPOS[1];
            if (Common.isBetween(shotPower, distanceFromGoal, distanceFromGoal + 50)) {
                if (player.skill.shooting > Common.getRandomNumber(0, 100)) {
                    matchDetails.iterationLog.push("Shot On Target");
                    shotPosition[0] = Common.getRandomNumber((matchDetails.pitchSize[0] / 2) - 20, (matchDetails.pitchSize[0] / 2) + 20);
                    shotPosition[1] = matchDetails.pitchSize[1];
                    matchDetails.kickOffTeamStatistics.shots++;
                    resolveBallMovement(player, player.startPOS, shotPosition, shotPower, team, opposition, matchDetails).then(function (endPosition) {
                        matchDetails.iterationLog.push("resolving ball movement whilst making a shot");
                        if (shotPosition[0] !== endPosition[0] || shotPosition[1] !== endPosition[1]) {
                            matchDetails.iterationLog.push("Ball deflected to: " + endPosition);
                        }
                        if (Common.isBetween(opposition.players[0].startPOS[0], endPosition[0] - 5, endPosition[0] + 5) && Common.isBetween(opposition.players[0].startPOS[1], matchDetails.pitchSize[1] - 5, matchDetails.pitchSize[1] + 1)) {
                            if (opposition.players[0].skill.saving > Common.getRandomNumber(0, 100)) {
                                matchDetails.iterationLog.push("Shot Saved by: " + opposition.players[0].name);
                                opposition.players[0].hasBall = true;
                                matchDetails.ball.Player = opposition.players[0].name;
                                var tempArray = opposition.players[0].startPOS;
                                matchDetails.ball.position = tempArray.map(x => x);
                                opposition.intent = "attack";
                                team.intent = "defend";
                                resolve(endPosition);
                            } else {
                                setPositions.setGoalScored(team, opposition, matchDetails).then(() =>{
                                    matchDetails.iterationLog.push("Goal Scored by: " + player.name);
                                    matchDetails.kickOffTeamStatistics.goals++;
                                    resolve(endPosition);
                                }).catch((error) => {
                                    console.error("Error when processing the goal: ", error);
                                    console.error(matchDetails.iterationLog);
                                });
                            }
                        } else {
                            setPositions.setGoalScored(team, opposition, matchDetails).then(() =>{
                                matchDetails.iterationLog.push("Goal Scored by: " + player.name);
                                matchDetails.kickOffTeamStatistics.goals++;
                                resolve(endPosition);
                            }).catch((error) => {
                                console.error("Error when processing the goal: ", error);
                                console.error(matchDetails.iterationLog);
                            });
                        }
                    }).catch((error) => {
                        console.error("Error when resolving ball movement during the shot: ", error);
                        console.error(matchDetails.iterationLog);
                    });
                } else {
                    shotPosition[0] = Common.getRandomNumber((matchDetails.pitchSize[0] / 2) - 30, (matchDetails.pitchSize[0] / 2) + 30);
                    shotPosition[1] = Common.getRandomNumber(matchDetails.pitchSize[1] - 1, matchDetails.pitchSize[1] - 20);
                    resolveBallMovement(player, player.startPOS, shotPosition, shotPower, team, opposition, matchDetails).then(function (endPosition) {
                        matchDetails.iterationLog.push("Shot Off Target");
                        if (shotPosition[0] !== endPosition[0] || shotPosition[1] !== endPosition[1]) {
                            matchDetails.iterationLog.push("Ball deflected to: " + endPosition);
                        }
                        resolve(endPosition);
                    }).catch((error) => {
                        console.error("Error when resolving ball movement after a failed shot: ", error);
                        console.error(matchDetails.iterationLog);
                    });
                }
            } else if (shotPower > (distanceFromGoal + 49)) {
                setPositions.setGoalKick(opposition, team, matchDetails).then(function (endPosition) {
                    matchDetails.iterationLog.push("Shot Missed, Goal Kick to: " + opposition.name);
                    resolve(endPosition);
                }).catch((error) => {
                    console.error("Error when setting a goal kick after a shot has been made: ", error);
                    console.error(matchDetails.iterationLog);
                });
            } else {
                matchDetails.iterationLog.push("Shot not hard enough by: " + opposition.name);
                shotPosition[0] = matchDetails.ball.position[0];
                shotPosition[1] = matchDetails.ball.position[1] + shotPower;
                matchDetails.iterationLog.push("resolving ball movement");
                resolveBallMovement(player, player.startPOS, shotPosition, shotPower, team, opposition, matchDetails).then(function (endPosition) {
                    matchDetails.iterationLog.push("Shot Off Target");
                    if (shotPosition[0] !== endPosition[0] || shotPosition[1] !== endPosition[1]) {
                        matchDetails.iterationLog.push("Ball deflected to: " + endPosition);
                    }
                    resolve(endPosition);
                }).catch((error) => {
                    console.error("Error when resolving ball movement after a failed shot: ", error);
                    console.error(matchDetails.iterationLog);
                });
            }
        }
    });
}

function throughBall(matchDetails, teammates, player) {
    return new Promise((resolve, reject) => {
        var position = matchDetails.ball.position;
        var direction = matchDetails.ball.direction;
        var closestPlayerPosition = [0, 0];
        var playersInDistance = [];
        async.eachSeries(teammates.players, function eachPlayer(teamPlayer, teamPlayerCallback) {
            if (teamPlayer.name === player.name) {
                //do nothing
                teamPlayerCallback();
            } else {
                var playerToPlayerX = player.startPOS[0] - teamPlayer.startPOS[0];
                var playerToPlayerY = player.startPOS[1] - teamPlayer.startPOS[1];
                var proximityToBall = Math.abs(playerToPlayerX + playerToPlayerY);
                playersInDistance.push({
                    "position": teamPlayer.startPOS,
                    "proximity": proximityToBall,
                    "name": teamPlayer.name
                });
                teamPlayerCallback();
            }
        }, function afterAllPlayers() {
            playersInDistance.sort(function (a, b) {
                return a.proximity - b.proximity;
            });
            var targetPlayer = playersInDistance[Common.getRandomNumber(0, 9)];
            matchDetails.iterationLog.push("through ball passed by: " + player.name + " to: " + targetPlayer.name);
            if (player.skill.passing > Common.getRandomNumber(0, 100)) {
                if (player.originPOS[1] > matchDetails.pitchSize[1] / 2) {
                    closestPlayerPosition[0] = targetPlayer.position[0];
                    closestPlayerPosition[1] = targetPlayer.position[1] - 10;
                } else {
                    closestPlayerPosition[0] = targetPlayer.position[0];
                    closestPlayerPosition[1] = targetPlayer.position[1] + 10;
                }
            } else {
                if (player.originPOS[1] > (matchDetails.pitchSize[1] / 2)) {
                    if (position[1] > (matchDetails.pitchSize[1] - (matchDetails.pitchSize[1] / 3))) {
                        closestPlayerPosition[0] = targetPlayer.position[0] + Common.getRandomNumber(-10, 10);
                        closestPlayerPosition[1] = targetPlayer.position[1] + Common.getRandomNumber(-10, 10);
                    } else if (position[1] > (matchDetails.pitchSize[1] / 3) && position[1] < (matchDetails.pitchSize[1] - (matchDetails.pitchSize[1] / 3))) {
                        closestPlayerPosition[0] = targetPlayer.position[0] + Common.getRandomNumber(-20, 20);
                        closestPlayerPosition[1] = targetPlayer.position[1] + Common.getRandomNumber(-50, 50);
                    } else {
                        closestPlayerPosition[0] = targetPlayer.position[0] + Common.getRandomNumber(-30, 30);
                        closestPlayerPosition[1] = targetPlayer.position[1] + Common.getRandomNumber(-100, 100);
                    }
                } else {
                    if (position[1] > (matchDetails.pitchSize[1] - (matchDetails.pitchSize[1] / 3))) {
                        closestPlayerPosition[0] = targetPlayer.position[0] + Common.getRandomNumber(-30, 30);
                        closestPlayerPosition[1] = targetPlayer.position[1] + Common.getRandomNumber(-100, 100);
                    } else if (position[1] > (matchDetails.pitchSize[1] / 3) && position[1] < (matchDetails.pitchSize[1] - (matchDetails.pitchSize[1] / 3))) {
                        closestPlayerPosition[0] = targetPlayer.position[0] + Common.getRandomNumber(-20, 20);
                        closestPlayerPosition[1] = targetPlayer.position[1] + Common.getRandomNumber(-50, 50);
                    } else {
                        closestPlayerPosition[0] = targetPlayer.position[0] + Common.getRandomNumber(-10, 10);
                        closestPlayerPosition[1] = targetPlayer.position[1] + Common.getRandomNumber(-10, 10);
                    }
                }
            }
            var power = Common.calculatePower(player.skill.strength);
            resolveBallMovement(player, position, closestPlayerPosition, power, kickOffTeam, secondTeam, matchDetails).then(function (endPosition) {
                matchDetails.iterationLog.push("resolving ball movement");
                matchDetails.iterationLog.push("new ball position: " + endPosition);
                resolve(endPosition);
            }).catch((error) => {
                console.error("Error when resolving the ball movement: ", error);
                console.error(matchDetails.iterationLog);
            });
        });
    });
}

function resolveBallMovement(player, currentPOS, newPOS, power, team, opposition, matchDetails) {
    return new Promise((resolve, reject) => {
        var deflectionPlayer;
        var deflectionPosition;
        var deflectionTeam;
        Common.getBallTrajectory(currentPOS, newPOS, power).then(function (lineToEndPosition) {
            async.eachSeries(lineToEndPosition, function eachPos(thisPos, thisPosCallback) {
                    setPositions.closestPlayerToPosition(player, team, thisPos).then(function (playerInformation) {
                        var thisTeamPlayer = playerInformation.thePlayer;
                        if (thisTeamPlayer && thisTeamPlayer.startPOS[0] === thisPos[0] && thisTeamPlayer.startPOS[1] === thisPos[1]) {
                            if (!deflectionPlayer) {
                                if (thisPos[2] < thisTeamPlayer.skill.jumping && thisPos[2] > 49) {
                                    deflectionPlayer = thisTeamPlayer;
                                    deflectionPosition = thisPos;
                                    deflectionTeam = team.name;
                                }
                            }
                            thisPosCallback();
                        } else {
                            setPositions.closestPlayerToPosition(player, opposition, thisPos).then(function (playerInformation) {
                                var thatTeamPlayer = playerInformation.thePlayer;
                                if (thatTeamPlayer) {
                                    if (thatTeamPlayer.startPOS[0] === thisPos[0] && thatTeamPlayer.startPOS[1] === thisPos[1]) {
                                        if (!deflectionPlayer) {
                                            if (thisPos[2] < thatTeamPlayer.skill.jumping && thisPos[2] < 49) {
                                                deflectionPlayer = thatTeamPlayer;
                                                deflectionPosition = thisPos;
                                                deflectionTeam = opposition.name;
                                            }
                                        }
                                    }
                                }
                                thisPosCallback();
                            }).catch((error) => {
                                console.error("Error when getting this teams closest player to that position: ", error);
                                console.error(matchDetails.iterationLog);
                            });
                        }
                    }).catch((error) => {
                        console.error("Error when getting this teams closest player to this position: ", error);
                        console.error(matchDetails.iterationLog);
                    });
                },
                function afterAllPos() {
                    if (!deflectionPlayer) {
                        setPositions.keepInBoundaries(newPOS, player.originPOS[1], matchDetails).then(function (finalPosition) {
                            matchDetails.iterationLog.push("Ball reached its target");
                            resolve(finalPosition);
                        }).catch((error) => {
                            console.error("Error when keeping ball in boundaries: ", error);
                            console.error(matchDetails.iterationLog);
                        });
                    } else {
                        resolveDeflection(power, currentPOS, deflectionPosition, deflectionPlayer, deflectionTeam, matchDetails).then(function (newPosition) {
                            matchDetails.iterationLog.push("Ball deflected");
                            resolve(newPosition);
                        }).catch((error) => {
                            console.error("Error when resolving the deflection: ", error);
                            console.error(matchDetails.iterationLog);
                        });
                    }
                });
        }).catch((error) => {
            console.error("Error when getting the ball trajectory: ", error);
            console.error(matchDetails.iterationLog);
        });
    });
}

function resolveDeflection(power, currentPOS, deflectionPosition, deflectionPlayer, deflectionTeam, matchDetails) {
    return new Promise((resolve, reject) => {
        var xMovement = Math.pow((currentPOS[0] - deflectionPosition[0]), 2);
        var yMovement = Math.pow((currentPOS[1] - deflectionPosition[1]), 2);
        var movementDistance = Math.sqrt(xMovement + yMovement);
        var newPower = power - movementDistance;
        var tempPosition = ["", ""];
        if (newPower < 75) {
            deflectionPlayer.hasBall = true;
            matchDetails.ball.Player = deflectionPlayer.name;
            matchDetails.ball.withPlayer = true;
            matchDetails.ball.withTeam = deflectionTeam;
        } else {
            if (matchDetails.ball.direction === "east" || matchDetails.ball.direction === "northeast" || matchDetails.ball.direction === "southeast") {
                if (matchDetails.ball.direction === "east") {
                    tempPosition[1] = Common.getRandomNumber(deflectionPosition[1] - 3, deflectionPosition[1] + 3);
                }
                tempPosition[0] = deflectionPosition[0] - (newPower / 2);
            } else if (matchDetails.ball.direction === "west" || matchDetails.ball.direction === "northwest" || matchDetails.ball.direction === "southwest") {
                if (matchDetails.ball.direction === "west") {
                    tempPosition[1] = Common.getRandomNumber(deflectionPosition[1] - 3, deflectionPosition[1] + 3);
                }
                tempPosition[0] = deflectionPosition[0] + (newPower / 2);
            }
            if (matchDetails.ball.direction === "north" || matchDetails.ball.direction === "northeast" || matchDetails.ball.direction === "northwest") {
                if (matchDetails.ball.direction === "north") {
                    tempPosition[0] = Common.getRandomNumber(deflectionPosition[0] - 3, deflectionPosition[0] + 3);
                }
                tempPosition[1] = deflectionPosition[1] + (newPower / 2);
            } else if (matchDetails.ball.direction === "south" || matchDetails.ball.direction === "southeast" || matchDetails.ball.direction === "southwest") {
                if (matchDetails.ball.direction === "south") {
                    tempPosition[0] = Common.getRandomNumber(deflectionPosition[0] - 3, deflectionPosition[0] + 3);
                }
                tempPosition[1] = deflectionPosition[1] - (newPower / 2);
            }
            if (matchDetails.ball.direction === "wait") {
                tempPosition[0] = Common.getRandomNumber(-newPower / 2, newPower / 2);
                tempPosition[1] = Common.getRandomNumber(-newPower / 2, newPower / 2);
            }
            setPositions.keepInBoundaries(tempPosition, deflectionPlayer.originPOS[1], matchDetails).then(function (finalPosition) {
                resolve(finalPosition);
            }).catch((error) => {
                console.error("Error when keeping ball in boundaries: ", error);
                console.error(matchDetails.iterationLog);
            });
        }
    });
}

function getBallDirection(matchDetails, nextPOS) {
    return new Promise((resolve, reject) => {
        var currentPOS = matchDetails.ball.position;
        // - - is south east
        // - + is north east
        // + - is south west
        // ++ is north west
        var movementX = currentPOS[0] - nextPOS[0];
        var movementY = currentPOS[1] - nextPOS[1];
        if (movementX === 0) {
            if (movementY === 0) {
                matchDetails.ball.direction = "wait";
            } else if (movementY < 0) {
                matchDetails.ball.direction = "south";
            } else if (movementY > 0) {
                matchDetails.ball.direction = "north";
            }
        } else if (movementY === 0) {
            if (movementX < 0) {
                matchDetails.ball.direction = "east";
            } else if (movementX > 0) {
                matchDetails.ball.direction = "west";
            }
        } else if (movementX < 0 && movementY < 0) {
            matchDetails.ball.direction = "southeast";
        } else if (movementX > 0 && movementY > 0) {
            matchDetails.ball.direction = "northwest";
        } else if (movementX > 0 && movementY < 0) {
            matchDetails.ball.direction = "southwest";
        } else if (movementX < 0 && movementY > 0) {
            matchDetails.ball.direction = "northeast";
        }
        resolve();
    });
}

function ballPassed(matchDetails, teammates, player) {
    return new Promise((resolve, reject) => {
        var position = matchDetails.ball.position;
        var direction = matchDetails.ball.direction;
        var closestPlayerPosition = [0, 0];
        var playersInDistance = [];
        async.eachSeries(teammates.players, function eachPlayer(teamPlayer, teamPlayerCallback) {
            if (teamPlayer.name === player.name) {
                //do nothing
                teamPlayerCallback();
            } else {
                var playerToPlayerX = player.startPOS[0] - teamPlayer.startPOS[0];
                var playerToPlayerY = player.startPOS[1] - teamPlayer.startPOS[1];
                var proximityToBall = Math.abs(playerToPlayerX + playerToPlayerY);
                playersInDistance.push({
                    "position": teamPlayer.startPOS,
                    "proximity": proximityToBall,
                    "name": teamPlayer.name
                });
                teamPlayerCallback();
            }
        }, function afterAllPlayers() {
            playersInDistance.sort(function (a, b) {
                return a.proximity - b.proximity
            });
            var targetPlayer = playersInDistance[Common.getRandomNumber(0, 9)];
            if (player.skill.passing > Common.getRandomNumber(0, 100)) {
                closestPlayerPosition = targetPlayer.position;
            } else {
                if (player.originPOS[1] > (matchDetails.pitchSize[1] / 2)) {
                    if (position[1] > (matchDetails.pitchSize[1] - (matchDetails.pitchSize[1] / 3))) {
                        closestPlayerPosition[0] = targetPlayer.position[0] + Common.getRandomNumber(-10, 10);
                        closestPlayerPosition[1] = targetPlayer.position[1] + Common.getRandomNumber(-10, 10);
                    } else if (position[1] > (matchDetails.pitchSize[1] / 3) && position[1] < (matchDetails.pitchSize[1] - (matchDetails.pitchSize[1] / 3))) {
                        closestPlayerPosition[0] = targetPlayer.position[0] + Common.getRandomNumber(-50, 50);
                        closestPlayerPosition[1] = targetPlayer.position[1] + Common.getRandomNumber(-50, 50);
                    } else {
                        closestPlayerPosition[0] = targetPlayer.position[0] + Common.getRandomNumber(-100, 100);
                        closestPlayerPosition[1] = targetPlayer.position[1] + Common.getRandomNumber(-100, 100);
                    }
                } else {
                    if (position[1] > (matchDetails.pitchSize[1] - (matchDetails.pitchSize[1] / 3))) {
                        closestPlayerPosition[0] = targetPlayer.position[0] + Common.getRandomNumber(-100, 100);
                        closestPlayerPosition[1] = targetPlayer.position[1] + Common.getRandomNumber(-100, 100);
                    } else if (position[1] > (matchDetails.pitchSize[1] / 3) && position[1] < (matchDetails.pitchSize[1] - (matchDetails.pitchSize[1] / 3))) {
                        closestPlayerPosition[0] = targetPlayer.position[0] + Common.getRandomNumber(-50, 50);
                        closestPlayerPosition[1] = targetPlayer.position[1] + Common.getRandomNumber(-50, 50);
                    } else {
                        closestPlayerPosition[0] = targetPlayer.position[0] + Common.getRandomNumber(-10, 10);
                        closestPlayerPosition[1] = targetPlayer.position[1] + Common.getRandomNumber(-10, 10);
                    }
                }
            }
            matchDetails.iterationLog.push("ball passed by: " + player.name + " to: " + targetPlayer.name);
            var power = Common.calculatePower(player.skill.strength);
            resolveBallMovement(player, position, closestPlayerPosition, power, kickOffTeam, secondTeam, matchDetails).then(function (endPosition) {
                resolve(endPosition);
            }).catch((error) => {
                console.error("Error when resolving the ball movement: ", error);
                console.error(matchDetails.iterationLog);
            });
        });
    });
}

module.exports = {
    ballKicked: ballKicked,
    shotMade: shotMade,
    throughBall: throughBall,
    resolveBallMovement: resolveBallMovement,
    resolveDeflection: resolveDeflection,
    getBallDirection: getBallDirection,
    ballPassed: ballPassed
};

*/