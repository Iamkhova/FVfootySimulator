import async = require("async");
import cf = require("../lib/common");
import {BallMovement} from "./ballMovement";
import {SetPositions} from "./setPositions";
import {Action} from "./action";
import {ITeam} from "../models/team.model";
import {IMatchDetails} from "../models/matchDetails.model";
import {IPlayerInformation} from "../models/playerInformation.model";
import {IPlayer} from "../models/player.model";


const setPositions : SetPositions = new SetPositions();
const actions : Action = new Action()
const ballMovement : BallMovement = new BallMovement();

export class PlayerMovement {

    closestPlayerToBall(closestPlayer, team, matchDetails) {

        return new Promise( (resolve, reject) => {
            let closestPlayerDetails;
            let count = 0;
            async.eachSeries(team.players, function eachPlayer(thisPlayer: IPlayer, thisPlayerACallback) {
                count = count + 1;
                console.log(count);
                console.log('Checking if ' + thisPlayer.name + ' is closest to the ball');
                let ballToPlayerX = thisPlayer.startPOS[0] - matchDetails.ball.position[0];
                let ballToPlayerY = thisPlayer.startPOS[1] - matchDetails.ball.position[1];
                let proximityToBall = Math.abs(ballToPlayerX + ballToPlayerY);
                console.log('Ball is ' + proximityToBall + ' and Player is ' + ballToPlayerX + ' ' + ballToPlayerY);
                if (proximityToBall < closestPlayer.position) {
                    closestPlayer.name = thisPlayer.name;
                    closestPlayer.position = proximityToBall;
                    closestPlayerDetails = thisPlayer;
                    console.log('ran loop');
                }
                thisPlayerACallback();
            }, function afterAllAPlayers() {
                console.log('closetPlayeDetail', closestPlayerDetails);
                    setPositions.setRelativePosition(closestPlayerDetails, team, matchDetails).then( () => {
                    matchDetails.iterationLog.push("Closest Player to ball: " + closestPlayerDetails.name);
                    resolve();
                }).catch( (error) => {
                    console.error("Error when setting relative positions: ", error);
                    console.error(matchDetails.iterationLog);
                });
            });
        });
    }

    decideMovement(closestPlayer, team: ITeam, opposition: ITeam, matchDetails: IMatchDetails) {
        return new Promise( (resolve, reject) => {
            async.eachSeries(team.players, function eachPlayer(thisPlayer, thisPlayerCallback) {
                    let ballToPlayerX = thisPlayer.startPOS[0] - matchDetails.ball.position[0];
                    let ballToPlayerY = thisPlayer.startPOS[1] - matchDetails.ball.position[1];
                    actions.findPossibleActions(thisPlayer, opposition, ballToPlayerX, ballToPlayerY, matchDetails)
                        .then((possibleActions) => {
                            actions.selectAction(possibleActions)
                                .then( (action) => {
                                        if (matchDetails.ball.withTeam !== team.name) {
                                            if (closestPlayer.name === thisPlayer.name) {
                                                if (action !== "tackle" && action !== "slide" && action !== "intercept") {
                                                    action = "sprint";
                                                }
                                                if (cf.Common.isBetween(ballToPlayerX, -30, 30) === false) {
                                                    if (ballToPlayerX > 29) {
                                                        ballToPlayerX = 29;
                                                    } else {
                                                        ballToPlayerX = -29;
                                                }
                                            }
                                            if (cf.Common.isBetween(ballToPlayerY, -30, 30) === false) {
                                                    if (ballToPlayerY > 29) {
                                                        ballToPlayerY = 29;
                                                    } else {
                                                    ballToPlayerY = -29;
                                                    }
                                            }
                                }
                            }
                            PlayerMovement.prototype.makeMovement(thisPlayer, action, opposition, ballToPlayerX, ballToPlayerY, matchDetails)
                                .then( (move) => {
                                    let output = "Player Name: " + thisPlayer.name + ", Origin Position: " + thisPlayer.originPOS + ", Ball Position: " + matchDetails.ball.position + ", Player to ball X: " + ballToPlayerX + ", Player to ball Y: " + ballToPlayerY + ", \n Player Has Ball: " + thisPlayer.hasBall + ", Action: " + action + ", Movement: " + move;
                                    const intendedMovementX = thisPlayer.startPOS[0] + move[0];
                                    const intendedMovementY = thisPlayer.startPOS[1] + move[1];
                                    if (intendedMovementX < matchDetails.pitchSize[0] + 1 && intendedMovementX > -1) {
                                        thisPlayer.startPOS[0] = thisPlayer.startPOS[0] + move[0];
                                    }
                                    if (intendedMovementY < matchDetails.pitchSize[1] + 1 && intendedMovementY > -1) {
                                        thisPlayer.startPOS[1] = thisPlayer.startPOS[1] + move[1];
                                    }
                                    if (cf.Common.isBetween(thisPlayer.startPOS[0], matchDetails.ball.position[0] - 3, matchDetails.ball.position[0] + 3) && cf.Common.isBetween(thisPlayer.startPOS[1], matchDetails.ball.position[1] - 3, matchDetails.ball.position[1] + 3) && matchDetails.ball.withTeam !== team.name) {
                                        if (thisPlayer.startPOS[0] === matchDetails.ball.position[0] && thisPlayer.startPOS[1] === matchDetails.ball.position[1]) {
                                            if (matchDetails.ball.withPlayer === true && thisPlayer.hasBall === false && matchDetails.ball.withTeam !== team.name) {
                                                if (action === "tackle") {
                                                    actions.resolveTackle(thisPlayer, team, opposition, matchDetails).then( (foul) => {
                                                        if (foul) {
                                                            setPositions.setSetpiece(matchDetails, opposition, team).then(() => {
                                                                // do nothing
                                                            }).catch(function (error) {
                                                                console.error("Error whilst setting up the set piece: ", error);
                                                                console.error(matchDetails.iterationLog);
                                                            });
                                                        }
                                                    }).catch(function (error) {
                                                        console.error("Error whilst resolving posession: ", error);
                                                        console.error(matchDetails.iterationLog);
                                                    });
                                                }
                                            } else {
                                                thisPlayer.hasBall = true;
                                                matchDetails.ball.Player = thisPlayer.name;
                                                matchDetails.ball.withPlayer = true;
                                                matchDetails.ball.withTeam = team.name;
                                                team.intent = "attack";
                                                opposition.intent = "defend";
                                            }
                                        } else {
                                            if (matchDetails.ball.withPlayer === true && thisPlayer.hasBall === false && matchDetails.ball.withTeam !== team.name) {
                                                if (action === "slide") {
                                                    actions.resolveSlide(thisPlayer, team, opposition, matchDetails).then((foul) => {
                                                        if (foul) {
                                                            setPositions.setSetpiece(matchDetails, opposition, team).then( () => {
                                                                // do nothing
                                                            }).catch( (error) => {
                                                                console.error("Error whilst setting up the set piece: ", error);
                                                                console.error(matchDetails.iterationLog);
                                                            });
                                                        }
                                                    }).catch((error) => {
                                                        console.error("Error whilst resolving posession during slide: ", error);
                                                        console.error(matchDetails.iterationLog);
                                                    });
                                                }
                                            } else {
                                                thisPlayer.hasBall = true;
                                                matchDetails.ball.Player = thisPlayer.name;
                                                matchDetails.ball.withPlayer = true;
                                                matchDetails.ball.withTeam = team.name;
                                                team.intent = "attack";
                                                opposition.intent = "defend";
                                            }
                                        }
                                    }
                                    if (thisPlayer.hasBall === true) {
                                        ballMovement.getBallDirection(matchDetails, thisPlayer.startPOS)
                                            .then( () => {
                                                let tempArray = thisPlayer.startPOS;
                                                matchDetails.ball.position = tempArray.map(x => x);
                                            }).catch( (error) => {
                                                console.error("Error getting the ball direction", error);
                                                console.error(matchDetails.iterationLog);
                                            });
                                    }
                                    if (action === "shoot" || action === "pass" || action === "cross" || action === "throughBall" || action === "cleared" || action === "boot") {
                                        thisPlayer.hasBall = false;
                                        matchDetails.ball.withPlayer = false;
                                        team.intent = "attack";
                                        opposition.intent = "attack";
                                        matchDetails.ball.Player = "";
                                        matchDetails.ball.withTeam = "";
                                        if (action === "cleared" || action === "boot") {
                                            ballMovement.ballKicked(matchDetails, thisPlayer)
                                                .then((newPosition : any) => {
                                                    let tempPosition = newPosition.map(x => x);
                                                    matchDetails.ball.position = tempPosition;
                                                }).catch( (error) => {
                                                    console.error("Error calling ball kicked:", error);
                                                    console.error(matchDetails.iterationLog);
                                                });
                                        } else if (action === "pass" || action === "cross") {
                                            ballMovement.ballPassed(matchDetails, team, thisPlayer)
                                                .then((newPosition : any) => {
                                                    matchDetails.iterationLog.push("passed to new position: " + newPosition);
                                                    const tempPosition = newPosition.map(x => x);
                                                    matchDetails.ball.position = tempPosition;
                                                }).catch((error) => {
                                                    console.error("Error calling ball passed: ", error);
                                                    console.error(matchDetails.iterationLog);
                                                });
                                        } else if (action === "throughBall") {
                                            ballMovement.throughBall(matchDetails, team, thisPlayer)
                                                .then((newPosition : any) => {
                                                   const tempPosition = newPosition.map(x => x);
                                                    matchDetails.ball.position = tempPosition;
                                                }).catch(function (error) {
                                                    console.error("Error calling through ball: ", error);
                                                    console.error(matchDetails.iterationLog);
                                                });
                                        } else if (action === "shoot") {
                                            ballMovement.shotMade(matchDetails, team, opposition, thisPlayer)
                                                .then( (newPosition : any) => {
                                                    const tempPosition = newPosition.map(x => x);
                                                    matchDetails.ball.position = tempPosition;
                                                }).catch(function (error) {
                                                    console.error("Error calling shot made: ", error);
                                                    console.error(matchDetails.iterationLog);
                                                });
                                        }
                                    }
                                    output += ", Injured?: " + thisPlayer.injured + ", Relative Position: " + thisPlayer.relativePOS + ", Final Position: " + thisPlayer.startPOS + ", Intent: " + team.intent;
                                    //iterationLog.push(output);
                                    // console.log(output);
                                    thisPlayerCallback();
                                }).catch(function (error) {
                                    console.error("Error calling make movement: ", error);
                                    console.error(matchDetails.iterationLog);
                                });
                        }).catch(function (error) {
                            console.error("Error calling select action: ", error);
                            console.error(matchDetails.iterationLog);
                        });
                    }).catch(function (error) {
                        console.error("Error finding possible actions: ", error);
                        console.error(matchDetails.iterationLog);
                    });
                },
                function afterAllPlayers() {
                    resolve(team);
                });
        });
    }

    makeMovement(player, action, opposition, ballX, ballY, matchDetails) {
        return new Promise(function (resolve, reject) {
            const move = [];
            if (action === "wait") {
                move[0] = 0;
                move[1] = 0;
                resolve(move);
            } else if (action === "shoot" || action === "pass" || action === "cross" || action === "throughBall" || action === "cleared" || action === "boot") {
                move[0] = 0;
                move[1] = 0;
                resolve(move);
            } else if (action === "tackle" || action === "slide") {
                if (ballX > 0) {
                    move[0] = -1;
                } else if (ballX === 0) {
                    move[0] = 0;
                } else if (ballX < 0) {
                    move[0] = 1;
                }
                if (ballY > 0) {
                    move[1] = -1;
                } else if (ballY === 0) {
                    move[1] = 0;
                } else if (ballY < 0) {
                    move[1] = 1;
                }
                resolve(move);
            } else if (action === "intercept") {
                setPositions.closestPlayerToPosition("name", opposition, matchDetails.ball.position).then( (playerInformation) => {
                    const pi : IPlayerInformation = playerInformation;
                    const interceptPlayer = pi.thePlayer;
                    const interceptionPosition = [];
                    let interceptPlayerToBallX = interceptPlayer.startPOS[0] - matchDetails.ball.position[0];
                    let interceptPlayerToBallY = interceptPlayer.startPOS[1] - matchDetails.ball.position[1];
                    if (interceptPlayerToBallX === 0) {
                        if (interceptPlayerToBallY === 0) {
                            move[0] = 0;
                            move[1] = 0;
                        } else if (interceptPlayerToBallY < 0) {
                            interceptionPosition[0] = interceptPlayer.startPOS[0];
                            interceptionPosition[1] = interceptPlayer.startPOS[1] + 1;
                        } else if (interceptPlayerToBallY > 0) {
                            interceptionPosition[0] = interceptPlayer.startPOS[0];
                            interceptionPosition[1] = interceptPlayer.startPOS[1] - 1;
                        }
                    } else if (interceptPlayerToBallY === 0) {
                        if (interceptPlayerToBallX < 0) {
                            interceptionPosition[0] = interceptPlayer.startPOS[0] + 1;
                            interceptionPosition[1] = interceptPlayer.startPOS[1];
                        } else if (interceptPlayerToBallX > 0) {
                            interceptionPosition[0] = interceptPlayer.startPOS[0] - 1;
                            interceptionPosition[1] = interceptPlayer.startPOS[1];
                        }
                    } else if (interceptPlayerToBallX < 0 && interceptPlayerToBallY < 0) {
                        interceptionPosition[0] = interceptPlayer.startPOS[0] + 1;
                        interceptionPosition[1] = interceptPlayer.startPOS[1] + 1;
                    } else if (interceptPlayerToBallX > 0 && interceptPlayerToBallY > 0) {
                        interceptionPosition[0] = interceptPlayer.startPOS[0] - 1;
                        interceptionPosition[1] = interceptPlayer.startPOS[1] - 1;
                    } else if (interceptPlayerToBallX > 0 && interceptPlayerToBallY < 0) {
                        interceptionPosition[0] = interceptPlayer.startPOS[0] - 1;
                        interceptionPosition[1] = interceptPlayer.startPOS[1] + 1;
                    } else if (interceptPlayerToBallX < 0 && interceptPlayerToBallY > 0) {
                        interceptionPosition[0] = interceptPlayer.startPOS[0] + 1;
                        interceptionPosition[1] = interceptPlayer.startPOS[1] - 1;
                    }
                    //set movement to the new interception position
                    let interceptPositionX = player.startPOS[0] - interceptionPosition[0];
                    let interceptPositionY = player.startPOS[1] - interceptionPosition[1];
                    if (interceptPositionX === 0) {
                        if (interceptPositionY === 0) {
                            move[0] = 0;
                            move[1] = 0;
                        } else if (interceptPositionY < 0) {
                            move[0] = 0;
                            move[1] = 1;
                        } else if (interceptPositionY > 0) {
                            move[0] = 0;
                            move[1] = -1;
                        }
                    } else if (interceptPositionY === 0) {
                        if (interceptPositionX < 0) {
                            move[0] = 1;
                            move[1] = 0;
                        } else if (interceptPositionX > 0) {
                            move[0] = -1;
                            move[1] = 0;
                        }
                    } else if (interceptPositionX < 0 && interceptPositionY < 0) {
                        move[0] = 1;
                        move[1] = 1;
                    } else if (interceptPositionX > 0 && interceptPositionY > 0) {
                        move[0] = -1;
                        move[1] = -1;
                    } else if (interceptPositionX > 0 && interceptPositionY < 0) {
                        move[0] = -1;
                        move[1] = 1;
                    } else if (interceptPositionX < 0 && interceptPositionY > 0) {
                        move[0] = 1;
                        move[1] = -1;
                    }
                    resolve(move);
                }).catch( (error) => {
                    console.error("Error when getting the closest opposition player: ", error);
                    console.error(matchDetails.iterationLog);
                })
            } else if (action === "run") {
                if (player.hasBall) {
                    if (player.originPOS[1] > matchDetails.pitchSize[1] / 2) {
                        move[0] = cf.Common.getRandomNumber(0, 2);
                        move[1] = cf.Common.getRandomNumber(0, 2);
                    } else {
                        move[0] = cf.Common.getRandomNumber(-2, 0);
                        move[1] = cf.Common.getRandomNumber(-2, 0);
                    }
                    resolve(move);
                } else {
                    let movementRun = [-1, 0, 1];
                    if (cf.Common.isBetween(ballX, -30, 30) && cf.Common.isBetween(ballY, -30, 30)) {
                        if (cf.Common.isBetween(ballX, -30, 1)) {
                            move[0] = movementRun[cf.Common.getRandomNumber(1, 2)];
                        } else if (cf.Common.isBetween(ballX, -1, 30)) {
                            move[0] = movementRun[cf.Common.getRandomNumber(0, 1)];
                        } else {
                            move[0] = movementRun[cf.Common.getRandomNumber(1, 1)];
                        }
                        if (cf.Common.isBetween(ballY, -30, 1)) {
                            move[1] = movementRun[cf.Common.getRandomNumber(1, 2)];
                        } else if (cf.Common.isBetween(ballY, -1, 30)) {
                            move[1] = movementRun[cf.Common.getRandomNumber(0, 1)];
                        } else {
                            move[1] = movementRun[cf.Common.getRandomNumber(1, 1)];
                        }
                        resolve(move);
                    } else {
                        setPositions.formationCheck(player.relativePOS, player.startPOS).then(function (formationDirection) {
                            if (formationDirection[0] === 0) {
                                move[0] = movementRun[cf.Common.getRandomNumber(1, 1)];
                            } else if (formationDirection[0] < 0) {
                                move[0] = movementRun[cf.Common.getRandomNumber(0, 1)];
                            } else if (formationDirection[0] > 0) {
                                move[0] = movementRun[cf.Common.getRandomNumber(1, 2)];
                            }
                            if (formationDirection[1] === 0) {
                                move[1] = movementRun[cf.Common.getRandomNumber(1, 1)];
                            } else if (formationDirection[1] < 0) {
                                move[1] = movementRun[cf.Common.getRandomNumber(0, 1)];
                            } else if (formationDirection[1] > 0) {
                                move[1] = movementRun[cf.Common.getRandomNumber(1, 2)];
                            }
                            resolve(move);
                        }).catch(function (error) {
                            console.error("couldn't check formation when running", error);
                            console.error(matchDetails.iterationLog);
                        });
                    }
                }
            } else if (action === "sprint") {
                let movementSprint = [-2, -1, 0, 1, 2];
                if (cf.Common.isBetween(ballX, -30, 30) && cf.Common.isBetween(ballY, -30, 30)) {
                    if (cf.Common.isBetween(ballX, -30, 1)) {
                        move[0] = movementSprint[cf.Common.getRandomNumber(2, 4)];
                    } else if (cf.Common.isBetween(ballX, -1, 30)) {
                        move[0] = movementSprint[cf.Common.getRandomNumber(0, 2)];
                    } else {
                        move[0] = movementSprint[cf.Common.getRandomNumber(2, 2)];
                    }
                    if (cf.Common.isBetween(ballY, -30, 1)) {
                        move[1] = movementSprint[cf.Common.getRandomNumber(2, 4)];
                    } else if (cf.Common.isBetween(ballY, -1, 30)) {
                        move[1] = movementSprint[cf.Common.getRandomNumber(0, 2)];
                    } else {
                        move[1] = movementSprint[cf.Common.getRandomNumber(2, 2)];
                    }
                    resolve(move);
                } else {
                    setPositions.formationCheck(player.relativePOS, player.startPOS).then(function (formationDirection) {
                        if (formationDirection[0] === 0) {
                            move[0] = movementSprint[cf.Common.getRandomNumber(2, 2)];
                        } else if (formationDirection[0] < 0) {
                            move[0] = movementSprint[cf.Common.getRandomNumber(0, 2)];
                        } else if (formationDirection[0] > 0) {
                            move[0] = movementSprint[cf.Common.getRandomNumber(2, 4)];
                        }
                        if (formationDirection[1] === 0) {
                            move[1] = movementSprint[cf.Common.getRandomNumber(2, 2)];
                        } else if (formationDirection[1] < 0) {
                            move[1] = movementSprint[cf.Common.getRandomNumber(0, 2)];
                        } else if (formationDirection[1] > 0) {
                            move[1] = movementSprint[cf.Common.getRandomNumber(2, 4)];
                        }
                        resolve(move);
                    }).catch(function (error) {
                        console.error("error calling formation check when sprinting", error);
                        console.error(matchDetails.iterationLog);
                    });
                }
            }
        });
    }
}

