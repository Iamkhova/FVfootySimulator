import async = require('async');
import {Common} from "./Common";
import {SetPositions} from "./setPositions";
import {IAction} from "../models/action.model";
import {IPlayerInformation} from "../models/playerInformation.model";
import {IPlayer} from "../models/player.model";

let setPositions : SetPositions = new SetPositions();


export class Action {

    /**
     * 
     * @param possibleActions
     * @returns {Promise<any>}
     */
    selectAction(possibleActions) {
        return new Promise((resolve,reject) => {
            let goodActions = [];
            async.eachSeries(possibleActions, function eachPlayer(thisAction : IAction, thisActionCallback) {
                const tempArray = Array(thisAction.points).fill(thisAction.name);
                goodActions = goodActions.concat(tempArray);
                thisActionCallback();
            }, function afterAllActions() {
                let decision;
                if (goodActions[0] == null) {
                    decision = "wait";
                } else {
                    decision = goodActions[Common.getRandomNumber(0, goodActions.length - 1)];
                }
                resolve(decision);
            });
        });
    }
    
    findPossibleActions(player, opposition, ballX, ballY, matchDetails) {
        return new Promise((resolve,reject) => {
            let possibleActions = [{
                "name": "shoot",
                "points": 0
            },
                {
                    "name": "throughBall",
                    "points": 0
                },
                {
                    "name": "pass",
                    "points": 0
                },
                {
                    "name": "cross",
                    "points": 0
                },
                {
                    "name": "tackle",
                    "points": 0
                },
                {
                    "name": "intercept",
                    "points": 0
                },
                {
                    "name": "slide",
                    "points": 0
                },
                {
                    "name": "run",
                    "points": 0
                },
                {
                    "name": "sprint",
                    "points": 0
                },
                {
                    "name": "cleared",
                    "points": 0
                },
                {
                    "name": "boot",
                    "points": 0
                }
            ];
            setPositions.closestPlayerToPosition(player, opposition, player.startPOS).then( (playerInformation : IPlayerInformation) => {
                const playerProximity = [Math.abs(playerInformation.proximity[0]), Math.abs(playerInformation.proximity[1])];
                const closePlayerPosition = playerInformation.thePlayer;
                if (player.hasBall === false) {
                    if (player.position === "GK") {
                       possibleActions = this.populatePossibleActions(possibleActions, 0, 0, 0, 0, 0, 0, 0, 60, 40, 0, 0);
                        resolve(possibleActions);
                    } else {
                        //[0]shoot, [1]throughBall, [2]pass, [3]cross, [4]tackle, [5]intercept
                        //[6]slide, [7]run, [8]sprint //[9]cleared //[10]boot
                        if (Common.isBetween(ballX, -2, 2) && Common.isBetween(ballY, -2, 2)) {
                            if (player.originPOS[1] > (matchDetails.pitchSize[1] / 2)) {
                                if (Common.isBetween(player.startPOS[0], (matchDetails.pitchSize[0] / 4) - 5, matchDetails.pitchSize[0] - (matchDetails.pitchSize[0] / 4) + 5) && Common.isBetween(player.startPOS[1], matchDetails.pitchSize[1] - (matchDetails.pitchSize[1] / 6) + 5, matchDetails.pitchSize[1])) {
                                    if (matchDetails.ball.withPlayer === false) {
                                        possibleActions = this.populatePossibleActions(possibleActions, 0, 0, 0, 0, 0, 0, 0, 20, 80, 0, 0);
                                        resolve(possibleActions);
                                    } else {
                                        possibleActions = this.populatePossibleActions(possibleActions, 0, 0, 0, 0, 0, 0, 0, 70, 30, 0, 0);
                                        resolve(possibleActions);
                                    }
                                } else {
                                    if (matchDetails.ball.withPlayer === false) {
                                        possibleActions = this.populatePossibleActions(possibleActions, 0, 0, 0, 0, 0, 0, 0, 20, 80, 0, 0);
                                        resolve(possibleActions);
                                    } else {
                                        possibleActions = this.populatePossibleActions(possibleActions, 0, 0, 0, 0, 70, 10, 20, 0, 0, 0, 0);
                                        resolve(possibleActions);
                                    }
                                }
                            } else {
                                if (Common.isBetween(player.startPOS[0], (matchDetails.pitchSize[0] / 4) - 5, matchDetails.pitchSize[0] - (matchDetails.pitchSize[0] / 4) + 5) && Common.isBetween(player.startPOS[1], 0, (matchDetails.pitchSize[1] / 6) - 5)) {
                                    if (matchDetails.ball.withPlayer === false) {
                                        possibleActions = this.populatePossibleActions(possibleActions, 0, 0, 0, 0, 0, 0, 0, 20, 80, 0, 0);
                                        resolve(possibleActions);
                                    } else {
                                        possibleActions = this.populatePossibleActions(possibleActions, 0, 0, 0, 0, 0, 0, 0, 70, 30, 0, 0);
                                        resolve(possibleActions);
                                    }
                                } else {
                                    if (matchDetails.ball.withPlayer === false) {
                                        possibleActions = this.populatePossibleActions(possibleActions, 0, 0, 0, 0, 0, 0, 0, 20, 80, 0, 0);
                                        resolve(possibleActions);
                                    } else {
                                        possibleActions = this.populatePossibleActions(possibleActions, 0, 0, 0, 0, 70, 10, 20, 0, 0, 0, 0);
                                        resolve(possibleActions);
                                    }
                                }
                            }
                        } else if (Common.isBetween(ballX, -4, 4) && Common.isBetween(ballY, -4, 4)) {
                            //[0]shoot, [1]throughBall, [2]pass, [3]cross, [4]tackle, [5]intercept
                            //[6]slide, [7]run, [8]sprint //[9]cleared //[10]boot
                            if (player.originPOS[1] > (matchDetails.pitchSize[1] / 2)) {
                                if (Common.isBetween(player.startPOS[0], (matchDetails.pitchSize[0] / 4) - 5, matchDetails.pitchSize[0] - (matchDetails.pitchSize[0] / 4) + 5) && Common.isBetween(player.startPOS[1], matchDetails.pitchSize[1] - (matchDetails.pitchSize[1] / 6) + 5, matchDetails.pitchSize[1])) {
                                    if (matchDetails.ball.withPlayer === false) {
                                        possibleActions = this.populatePossibleActions(possibleActions, 0, 0, 0, 0, 0, 0, 0, 20, 80, 0, 0);
                                        resolve(possibleActions);
                                    } else {
                                        possibleActions = this.populatePossibleActions(possibleActions, 0, 0, 0, 0, 0, 0, 0, 70, 30, 0, 0);
                                        resolve(possibleActions);
                                    }
                                } else {
                                    if (matchDetails.ball.withPlayer === false) {
                                        possibleActions = this.populatePossibleActions(possibleActions, 0, 0, 0, 0, 0, 0, 0, 20, 80, 0, 0);
                                        resolve(possibleActions);
                                    } else {
                                        possibleActions = this.populatePossibleActions(possibleActions, 0, 0, 0, 0, 40, 20, 40, 0, 0, 0, 0);
                                        resolve(possibleActions);
                                    }
                                }
                            } else {
                                if (Common.isBetween(player.startPOS[0], (matchDetails.pitchSize[0] / 4) - 5, matchDetails.pitchSize[0] - (matchDetails.pitchSize[0] / 4) + 5) && Common.isBetween(player.startPOS[1], 0, (matchDetails.pitchSize[1] / 6) - 5)) {
                                    if (matchDetails.ball.withPlayer === false) {
                                        possibleActions = this.populatePossibleActions(possibleActions, 0, 0, 0, 0, 0, 0, 0, 20, 80, 0, 0);
                                        resolve(possibleActions);
                                    } else {
                                        possibleActions = this.populatePossibleActions(possibleActions, 0, 0, 0, 0, 0, 0, 0, 70, 30, 0, 0);
                                        resolve(possibleActions);
                                    }
                                } else {
                                    if (matchDetails.ball.withPlayer === false) {
                                        possibleActions = this.populatePossibleActions(possibleActions, 0, 0, 0, 0, 0, 0, 0, 20, 80, 0, 0);
                                        resolve(possibleActions);
                                    } else {
                                        possibleActions = this.populatePossibleActions(possibleActions, 0, 0, 0, 0, 40, 20, 40, 0, 0, 0, 0);
                                        resolve(possibleActions);
                                    }
                                }
                            }
                        } else if (Common.isBetween(ballX, -20, 20) && Common.isBetween(ballY, -20, 20)) {
                            //[0]shoot, [1]throughBall, [2]pass, [3]cross, [4]tackle, [5]intercept
                            //[6]slide, [7]run, [8]sprint //[9]cleared //[10]boot
                            if (matchDetails.ball.withPlayer === false) {
                                possibleActions = this.populatePossibleActions(possibleActions, 0, 0, 0, 0, 0, 0, 0, 60, 40, 0, 0);
                            } else {
                                possibleActions = this.populatePossibleActions(possibleActions, 0, 0, 0, 0, 0, 40, 0, 30, 30, 0, 0);
                            }
                            resolve(possibleActions);
                        } else {
                            //[0]shoot, [1]throughBall, [2]pass, [3]cross, [4]tackle, [5]intercept
                            //[6]slide, [7]run, [8]sprint //[9]cleared //[10]boot
                            possibleActions = this.populatePossibleActions(possibleActions, 0, 0, 0, 0, 0, 10, 0, 50, 30, 0, 0);
                            resolve(possibleActions);
                        }
                    }
                } else {
                    if (player.originPOS[1] > (matchDetails.pitchSize[1] / 2)) {
                        //[0]shoot, [1]throughBall, [2]pass, [3]cross, [4]tackle, [5]intercept
                        //[6]slide, [7]run, [8]sprint //[9]cleared //[10]boot
                        if (player.position === "GK") {
                            if (playerProximity[0] < 10 && playerProximity[1] < 25) {
                                possibleActions = this.populatePossibleActions(possibleActions, 0, 0, 10, 0, 0, 0, 0, 10, 0, 40, 40);
                                resolve(possibleActions);
                            } else {
                                possibleActions = this.populatePossibleActions(possibleActions, 0, 0, 50, 0, 0, 0, 0, 10, 0, 20, 20);
                                resolve(possibleActions);
                            }
                        } else {
                            if (Common.isBetween(player.startPOS[0], (matchDetails.pitchSize[0] / 4) - 5, matchDetails.pitchSize[0] - (matchDetails.pitchSize[0] / 4) + 5) && Common.isBetween(player.startPOS[1], 0, (matchDetails.pitchSize[1] / 6) - 5)) {
                                if (Common.isBetween(player.startPOS[0], (matchDetails.pitchSize[0] / 3) - 5, matchDetails.pitchSize[0] - (matchDetails.pitchSize[0] / 3) + 5) && Common.isBetween(player.startPOS[1], 0, (matchDetails.pitchSize[1] / 12) - 5)) {
                                    //[0]shoot, [1]throughBall, [2]pass, [3]cross, [4]tackle, [5]intercept
                                    //[6]slide, [7]run, [8]sprint //[9]cleared //[10]boot
                                    if (playerProximity[0] < 6 && playerProximity[1] < 6) {
                                        if (closePlayerPosition[1] < player.startPOS[1]) {
                                            possibleActions = this.populatePossibleActions(possibleActions, 20, 0, 70, 0, 0, 0, 0, 10, 0, 0, 0);
                                            resolve(possibleActions);
                                        } else {
                                            possibleActions = this.populatePossibleActions(possibleActions, 80, 0, 20, 0, 0, 0, 0, 0, 0, 0, 0);
                                            resolve(possibleActions);
                                        }
                                    } else {
                                        possibleActions = this.populatePossibleActions(possibleActions, 70, 10, 20, 0, 0, 0, 0, 0, 0, 0, 0);
                                        resolve(possibleActions);
                                    }
                                } else {
                                    if (playerProximity[0] < 6 && playerProximity[1] < 6) {
                                        possibleActions = this.populatePossibleActions(possibleActions, 10, 0, 70, 0, 0, 0, 0, 20, 0, 0, 0);
                                        resolve(possibleActions);
                                    } else {
                                        possibleActions = this.populatePossibleActions(possibleActions, 70, 0, 20, 0, 0, 0, 0, 10, 0, 0, 0);
                                        resolve(possibleActions);
                                    }
                                }
                            } else if (Common.isBetween(player.startPOS[1], (matchDetails.pitchSize[1] / 6) - 5, matchDetails.pitchSize[1] / 3)) {
                                //[0]shoot, [1]throughBall, [2]pass, [3]cross, [4]tackle, [5]intercept
                                //[6]slide, [7]run, [8]sprint, [9]cleared, [10]boot
                                if (playerProximity[0] < 10 && playerProximity[1] < 10) {
                                    possibleActions = this.populatePossibleActions(possibleActions, 30, 20, 20, 10, 0, 0, 0, 20, 0, 0, 0);
                                    resolve(possibleActions);
                                } else {
                                    possibleActions = this.populatePossibleActions(possibleActions, 70, 10, 10, 0, 0, 0, 0, 10, 0, 0, 0);
                                    resolve(possibleActions);
                                }
                            } else if (Common.isBetween(player.startPOS[1], (matchDetails.pitchSize[1] / 3), (2 * (matchDetails.pitchSize[1] / 3)))) {
                                //[0]shoot, [1]throughBall, [2]pass, [3]cross, [4]tackle, [5]intercept
                                //[6]slide, [7]run, [8]sprint //[9]cleared //[10]boot
                                if (playerProximity[0] < 10 && playerProximity[1] < 10) {
                                    possibleActions = this.populatePossibleActions(possibleActions, 0, 20, 30, 20, 0, 0, 20, 0, 0, 0, 10);
                                    resolve(possibleActions);
                                } else {
                                    if (player.skill.shooting > 85) {
                                        possibleActions = this.populatePossibleActions(possibleActions, 60, 10, 10, 0, 0, 0, 20, 0, 0, 0, 0);
                                        resolve(possibleActions);
                                    } else {
                                        if (player.position === "LM" || player.position === "CM" || player.position === "RM") {
                                            possibleActions = this.populatePossibleActions(possibleActions, 0, 10, 10, 10, 0, 0, 0, 30, 40, 0, 0);
                                            resolve(possibleActions);
                                        } else if (player.position === "ST") {
                                            possibleActions = this.populatePossibleActions(possibleActions, 0, 0, 0, 0, 0, 0, 0, 50, 50, 0, 0);
                                            resolve(possibleActions);
                                        } else {
                                            possibleActions = this.populatePossibleActions(possibleActions, 10, 10, 10, 10, 0, 0, 0, 30, 20, 0, 10);
                                            resolve(possibleActions);
                                        }
                                    }
                                }
                            } else {
                                //[0]shoot, [1]throughBall, [2]pass, [3]cross, [4]tackle, [5]intercept
                                //[6]slide, [7]run, [8]sprint //[9]cleared //[10]boot
                                if (playerProximity[0] < 10 && playerProximity[1] < 10) {
                                    possibleActions = this.populatePossibleActions(possibleActions, 0, 0, 0, 0, 0, 0, 0, 10, 0, 70, 20);
                                    resolve(possibleActions);
                                } else {
                                    if (player.position === "LM" || player.position === "CM" || player.position === "RM") {
                                        possibleActions = this.populatePossibleActions(possibleActions, 0, 0, 30, 0, 0, 0, 0, 30, 40, 0, 0);
                                        resolve(possibleActions);
                                    } else if (player.position === "ST") {
                                        possibleActions = this.populatePossibleActions(possibleActions, 0, 0, 0, 0, 0, 0, 0, 50, 50, 0, 0);
                                        resolve(possibleActions);
                                    } else {
                                        possibleActions = this.populatePossibleActions(possibleActions, 0, 0, 40, 0, 0, 0, 0, 30, 0, 20, 10);
                                        resolve(possibleActions);
                                    }
                                }
                            }
                        }
                    } else {
                        //[0]shoot, [1]throughBall, [2]pass, [3]cross, [4]tackle, [5]intercept
                        //[6]slide, [7]run, [8]sprint //[9]cleared //[10]boot
                        if (player.position === "GK") {
                            if (playerProximity[0] < 10 && playerProximity[1] < 25) {
                                possibleActions = this.populatePossibleActions(possibleActions, 0, 0, 10, 0, 0, 0, 0, 10, 0, 40, 40);
                                resolve(possibleActions);
                            } else {
                                possibleActions = this.populatePossibleActions(possibleActions, 0, 0, 50, 0, 0, 0, 0, 10, 0, 20, 20);
                                resolve(possibleActions);
                            }
                        } else {
                            if (Common.isBetween(player.startPOS[0], (matchDetails.pitchSize[0] / 4) - 5, matchDetails.pitchSize[0] - (matchDetails.pitchSize[0] / 4) + 5) && Common.isBetween(player.startPOS[1], (matchDetails.pitchSize[1] - (matchDetails.pitchSize[1] / 6) + 5), matchDetails.pitchSize[1])) {
                                if (Common.isBetween(player.startPOS[0], (matchDetails.pitchSize[0] / 3) - 5, matchDetails.pitchSize[0] - (matchDetails.pitchSize[0] / 3) + 5) && Common.isBetween(player.startPOS[1], (matchDetails.pitchSize[1] - (matchDetails.pitchSize[1] / 12) + 5), matchDetails.pitchSize[1])) {
                                    //[0]shoot, [1]throughBall, [2]pass, [3]cross, [4]tackle, [5]intercept
                                    //[6]slide, [7]run, [8]sprint //[9]cleared //[10]boot
                                    if (playerProximity[0] < 6 && playerProximity[1] < 6) {
                                        if (closePlayerPosition[1] > player.startPOS[1]) {
                                            possibleActions = this.populatePossibleActions(possibleActions, 20, 0, 70, 0, 0, 0, 0, 10, 0, 0, 0);
                                            resolve(possibleActions);
                                        } else {
                                            possibleActions = this.populatePossibleActions(possibleActions, 80, 0, 20, 0, 0, 0, 0, 0, 0, 0, 0);
                                            resolve(possibleActions);
                                        }
                                    } else {
                                        possibleActions = this.populatePossibleActions(possibleActions, 70, 10, 20, 0, 0, 0, 0, 0, 0, 0, 0);
                                        resolve(possibleActions);
                                    }
                                } else {
                                    if (playerProximity[0] < 6 && playerProximity[1] < 6) {
                                        possibleActions = this.populatePossibleActions(possibleActions, 10, 0, 70, 0, 0, 0, 0, 20, 0, 0, 0);
                                        resolve(possibleActions);
                                    } else {
                                        possibleActions = this.populatePossibleActions(possibleActions, 70, 0, 20, 0, 0, 0, 0, 10, 0, 0, 0);
                                        resolve(possibleActions);
                                    }
                                }
                            } else if (Common.isBetween(player.startPOS[1], (matchDetails.pitchSize[1] - (matchDetails.pitchSize[1] / 3)), (matchDetails.pitchSize[1] - (matchDetails.pitchSize[1] / 6) + 5))) {
                                //[0]shoot, [1]throughBall, [2]pass, [3]cross, [4]tackle, [5]intercept
                                //[6]slide, [7]run, [8]sprint, [9]cleared, [10]boot
                                if (playerProximity[0] < 10 && playerProximity[1] < 10) {
                                    possibleActions = this.populatePossibleActions(possibleActions, 30, 20, 20, 10, 0, 0, 0, 20, 0, 0, 0);
                                    resolve(possibleActions);
                                } else {
                                    possibleActions = this.populatePossibleActions(possibleActions, 70, 10, 10, 0, 0, 0, 0, 10, 0, 0, 0);
                                    resolve(possibleActions);
                                }
                            } else if (Common.isBetween(player.startPOS[1], (matchDetails.pitchSize[1] / 3), (matchDetails.pitchSize[1] - (matchDetails.pitchSize[1] / 3)))) {
                                //[0]shoot, [1]throughBall, [2]pass, [3]cross, [4]tackle, [5]intercept
                                //[6]slide, [7]run, [8]sprint //[9]cleared //[10]boot
                                if (playerProximity[0] < 10 && playerProximity[1] < 10) {
                                    possibleActions = this.populatePossibleActions(possibleActions, 0, 20, 30, 20, 0, 0, 20, 0, 0, 0, 10);
                                    resolve(possibleActions);
                                } else {
                                    if (player.skill.shooting > 85) {
                                        possibleActions = this.populatePossibleActions(possibleActions, 60, 10, 10, 0, 0, 0, 20, 0, 0, 0, 0);
                                        resolve(possibleActions);
                                    } else {
                                        if (player.position === "LM" || player.position === "CM" || player.position === "RM") {
                                            possibleActions = this.populatePossibleActions(possibleActions, 0, 10, 10, 10, 0, 0, 0, 30, 40, 0, 0);
                                            resolve(possibleActions);
                                        } else if (player.position === "ST") {
                                            possibleActions = this.populatePossibleActions(possibleActions, 0, 0, 0, 0, 0, 0, 0, 50, 50, 0, 0);
                                            resolve(possibleActions);
                                        } else {
                                            possibleActions = this.populatePossibleActions(possibleActions, 10, 10, 10, 10, 0, 0, 0, 30, 20, 0, 10);
                                            resolve(possibleActions);
                                        }
                                    }
                                }
                            } else {
                                //[0]shoot, [1]throughBall, [2]pass, [3]cross, [4]tackle, [5]intercept
                                //[6]slide, [7]run, [8]sprint //[9]cleared //[10]boot
                                if (playerProximity[0] < 10 && playerProximity[1] < 10) {
                                    possibleActions = this.populatePossibleActions(possibleActions, 0, 0, 0, 0, 0, 0, 0, 10, 0, 70, 20);
                                    resolve(possibleActions);
                                } else {
                                    if (player.position === "LM" || player.position === "CM" || player.position === "RM") {
                                        possibleActions = this.populatePossibleActions(possibleActions, 0, 0, 30, 0, 0, 0, 0, 30, 40, 0, 0);
                                        resolve(possibleActions);
                                    } else if (player.position === "ST") {
                                        possibleActions = this.populatePossibleActions(possibleActions, 0, 0, 0, 0, 0, 0, 0, 50, 50, 0, 0);
                                        resolve(possibleActions);
                                    } else {
                                        possibleActions = this.populatePossibleActions(possibleActions, 0, 0, 40, 0, 0, 0, 0, 30, 0, 20, 10);
                                        resolve(possibleActions);
                                    }
                                }
                            }
                        }
                    }
                }
            }).catch(function (error) {
                console.error("Error when finding the closest opposition player ", error);
            });
        });
    }
    
    populatePossibleActions(possibleActions, shoot, throughball, pass, cross, tackle, intercept, slide, run, sprint, cleared, boot) {
        possibleActions[0].points = shoot;
        possibleActions[1].points = throughball;
        possibleActions[2].points = pass;
        possibleActions[3].points = cross;
        possibleActions[4].points = tackle;
        possibleActions[5].points = intercept;
        possibleActions[6].points = slide;
        possibleActions[7].points = run;
        possibleActions[8].points = sprint;
        possibleActions[9].points = cleared;
        possibleActions[10].points = boot;
        return possibleActions;
    }

   resolveTackle(player, team, opposition, matchDetails) {
        return new Promise((resolve,reject) => {
            let foul = false;
            matchDetails.iterationLog.push("Tackle attempted by: " + player.name);
            async.eachSeries(opposition.players, function eachPlayer(thatPlayer : IPlayer, thatPlayerCallback) {
                    if (matchDetails.ball.Player === thatPlayer.name) {
                        let tackleScore = (parseInt(player.skill.tackling) + parseInt(player.skill.strength)) / 2;
                        tackleScore += Common.getRandomNumber(-5, 5);
                        let retentionScore = (thatPlayer.skill.agility + thatPlayer.skill.strength) / 2;
                        retentionScore += Common.getRandomNumber(-5, 5);
                        if (this.wasFoul(10, 10) === true) {
                            matchDetails.iterationLog.push("Foul against: ", thatPlayer.name);
                            foul = true;
                        } else {
                            if (tackleScore > retentionScore) {
                                matchDetails.iterationLog.push("Successful tackle by: ", player.name);
                                if (Common.isInjured(1000) === true) {
                                    thatPlayer.injured = true;
                                    matchDetails.iterationLog.push("Player Injured - " + thatPlayer.name);
                                }
                                if (Common.isInjured(1200) === true) {
                                    player.injured = true;
                                    matchDetails.iterationLog.push("Player Injured - " + thatPlayer.name);
                                }
                                player.hasBall = true;
                                matchDetails.ball.Player = player.name;
                                matchDetails.ball.withPlayer = true;
                                matchDetails.ball.withTeam = team.name;
                                team.intent = "attack";
                                opposition.intent = "defend";
                                if (player.originPOS[1] > matchDetails.pitchSize[1] / 2) {
                                    player.startPOS[1]--;
                                    matchDetails.ball.position[1]--;
                                    thatPlayer.startPOS[1]++;
                                } else {
                                    player.startPOS[1]++;
                                    matchDetails.ball.position[1]++;
                                    thatPlayer.startPOS[1]--;
                                }
                            } else {
                                matchDetails.iterationLog.push("Failed tackle by: ", player.name);
                                if (Common.isInjured(1200) === true) {
                                    thatPlayer.injured = true;
                                    matchDetails.iterationLog.push("Player Injured - " + thatPlayer.name);
                                }
                                if (Common.isInjured(1000) === true) {
                                    player.injured = true;
                                    matchDetails.iterationLog.push("Player Injured - " + thatPlayer.name);
                                }
                                if (thatPlayer.originPOS[1] > matchDetails.pitchSize[1] / 2) {
                                    thatPlayer.startPOS[1]--;
                                    matchDetails.ball.position[1]--;
                                    player.startPOS[1]++;
                                } else {
                                    thatPlayer.startPOS[1]++;
                                    matchDetails.ball.position[1]++;
                                    player.startPOS[1]--;
                                }
                            }
                        }
                    }
                    thatPlayerCallback();
                },
                function afterAllPlayers() {
                    resolve(foul);
                });
        });
    }

    resolveSlide(player, team, opposition, matchDetails) {
        return new Promise((resolve,reject) => {
            let foul = false;
            matchDetails.iterationLog.push("Slide tackle attempted by: " + player.name);
            async.eachSeries(opposition.players, function eachPlayer(thatPlayer: IPlayer, thatPlayerCallback) {
                    if (matchDetails.ball.Player === thatPlayer.name) {
                        var tackleScore = (parseInt(player.skill.tackling) + parseInt(player.skill.strength)) / 2;
                        tackleScore += Common.getRandomNumber(-5, 5);
                        var retentionScore = (thatPlayer.skill.agility + thatPlayer.skill.strength) / 2;
                        retentionScore += Common.getRandomNumber(-5, 5);
                        if (this.wasFoul(20, 32) === true) {
                            matchDetails.iterationLog.push("Foul against: " + thatPlayer.name);
                            foul = true;
                        } else {
                            if (tackleScore > retentionScore) {
                                matchDetails.iterationLog.push("Successful tackle by: ", player.name);
                                if (Common.isInjured(600) === true) {
                                    thatPlayer.injured = true;
                                    matchDetails.iterationLog.push("Player Injured - " + thatPlayer.name);
                                }
                                if (Common.isInjured(800) === true) {
                                    player.injured = true;
                                    matchDetails.iterationLog.push("Player Injured - " + thatPlayer.name);
                                }
                                player.hasBall = true;
                                matchDetails.ball.Player = player.name;
                                matchDetails.ball.withPlayer = true;
                                matchDetails.ball.withTeam = team.name;
                                team.intent = "attack";
                                opposition.intent = "defend";
                                if (player.originPOS[1] > matchDetails.pitchSize[1] / 2) {
                                    player.startPOS[1] += -3;
                                    matchDetails.ball.position[1] += -3;
                                    thatPlayer.startPOS[1]++;
                                } else {
                                    player.startPOS[1] += 3;
                                    matchDetails.ball.position[1] += 3;
                                    thatPlayer.startPOS[1] += -3;
                                }
                            } else {
                                matchDetails.iterationLog.push("Failed tackle by: ", player.name);
                                if (Common.isInjured(800) === true) {
                                    thatPlayer.injured = true;
                                    matchDetails.iterationLog.push("Player Injured - " + thatPlayer.name);
                                }
                                if (Common.isInjured(600) === true) {
                                    player.injured = true;
                                    matchDetails.iterationLog.push("Player Injured - " + thatPlayer.name);
                                }
                                if (thatPlayer.originPOS[1] > matchDetails.pitchSize[1] / 2) {
                                    thatPlayer.startPOS[1] += -3;
                                    matchDetails.ball.position[1] += -3;
                                    player.startPOS[1] += 3;
                                } else {
                                    thatPlayer.startPOS[1] += 3;
                                    matchDetails.ball.position[1] += 3;
                                    player.startPOS[1] += -3;
                                }
                            }
                        }
                    }
                    thatPlayerCallback();
                },
                function afterAllPlayers() {
                    resolve(foul);
                });
        });
    }


    wasFoul(x, y) {
        const foul = Common.getRandomNumber(0, x);
        if (Common.isBetween(foul, 0, (y / 2) - 1)) {
            return true;
        } else {
            return false;
        }
    }



}
/*

var async = require("async");
var common = require("../lib/common");
var setPositions = require("../lib/setPositions");

function selectAction(possibleActions) {
    return new Promise((resolve,reject) => {
        goodActions = [];
        async.eachSeries(possibleActions, function eachPlayer(thisAction, thisActionCallback) {
            var tempArray = Array(thisAction.points).fill(thisAction.name);
            goodActions = goodActions.concat(tempArray);
            thisActionCallback();
        }, function afterAllActions() {
            var decision;
            if (goodActions[0] == null) {
                decision = "wait";
            } else {
                decision = goodActions[Common.getRandomNumber(0, goodActions.length - 1)];
            }
            resolve(decision);
        });
    });
}

function findPossibleActions(player, opposition, ballX, ballY, matchDetails) {
    return new Promise((resolve,reject) => {
        var possibleActions = [{
            "name": "shoot",
            "points": 0
        },
            {
                "name": "throughBall",
                "points": 0
            },
            {
                "name": "pass",
                "points": 0
            },
            {
                "name": "cross",
                "points": 0
            },
            {
                "name": "tackle",
                "points": 0
            },
            {
                "name": "intercept",
                "points": 0
            },
            {
                "name": "slide",
                "points": 0
            },
            {
                "name": "run",
                "points": 0
            },
            {
                "name": "sprint",
                "points": 0
            },
            {
                "name": "cleared",
                "points": 0
            },
            {
                "name": "boot",
                "points": 0
            }
        ];
        setPositions.closestPlayerToPosition(player, opposition, player.startPOS).then(function (playerInformation) {
            var playerProximity = [Math.abs(playerInformation.proximity[0]), Math.abs(playerInformation.proximity[1])];
            var closePlayerPosition = playerInformation.thePlayer;
            if (player.hasBall === false) {
                if (player.position === "GK") {
                    possibleActions = this.populatePossibleActions(possibleActions, 0, 0, 0, 0, 0, 0, 0, 60, 40, 0, 0);
                    resolve(possibleActions);
                } else {
                    //[0]shoot, [1]throughBall, [2]pass, [3]cross, [4]tackle, [5]intercept
                    //[6]slide, [7]run, [8]sprint //[9]cleared //[10]boot
                    if (Common.isBetween(ballX, -2, 2) && Common.isBetween(ballY, -2, 2)) {
                        if (player.originPOS[1] > (matchDetails.pitchSize[1] / 2)) {
                            if (Common.isBetween(player.startPOS[0], (matchDetails.pitchSize[0] / 4) - 5, matchDetails.pitchSize[0] - (matchDetails.pitchSize[0] / 4) + 5) && Common.isBetween(player.startPOS[1], matchDetails.pitchSize[1] - (matchDetails.pitchSize[1] / 6) + 5, matchDetails.pitchSize[1])) {
                                if (matchDetails.ball.withPlayer === false) {
                                    possibleActions = this.populatePossibleActions(possibleActions, 0, 0, 0, 0, 0, 0, 0, 20, 80, 0, 0);
                                    resolve(possibleActions);
                                } else {
                                    possibleActions = this.populatePossibleActions(possibleActions, 0, 0, 0, 0, 0, 0, 0, 70, 30, 0, 0);
                                    resolve(possibleActions);
                                }
                            } else {
                                if (matchDetails.ball.withPlayer === false) {
                                    possibleActions = this.populatePossibleActions(possibleActions, 0, 0, 0, 0, 0, 0, 0, 20, 80, 0, 0);
                                    resolve(possibleActions);
                                } else {
                                    possibleActions = this.populatePossibleActions(possibleActions, 0, 0, 0, 0, 70, 10, 20, 0, 0, 0, 0);
                                    resolve(possibleActions);
                                }
                            }
                        } else {
                            if (Common.isBetween(player.startPOS[0], (matchDetails.pitchSize[0] / 4) - 5, matchDetails.pitchSize[0] - (matchDetails.pitchSize[0] / 4) + 5) && Common.isBetween(player.startPOS[1], 0, (matchDetails.pitchSize[1] / 6) - 5)) {
                                if (matchDetails.ball.withPlayer === false) {
                                    possibleActions = this.populatePossibleActions(possibleActions, 0, 0, 0, 0, 0, 0, 0, 20, 80, 0, 0);
                                    resolve(possibleActions);
                                } else {
                                    possibleActions = this.populatePossibleActions(possibleActions, 0, 0, 0, 0, 0, 0, 0, 70, 30, 0, 0);
                                    resolve(possibleActions);
                                }
                            } else {
                                if (matchDetails.ball.withPlayer === false) {
                                    possibleActions = this.populatePossibleActions(possibleActions, 0, 0, 0, 0, 0, 0, 0, 20, 80, 0, 0);
                                    resolve(possibleActions);
                                } else {
                                    possibleActions = this.populatePossibleActions(possibleActions, 0, 0, 0, 0, 70, 10, 20, 0, 0, 0, 0);
                                    resolve(possibleActions);
                                }
                            }
                        }
                    } else if (Common.isBetween(ballX, -4, 4) && Common.isBetween(ballY, -4, 4)) {
                        //[0]shoot, [1]throughBall, [2]pass, [3]cross, [4]tackle, [5]intercept
                        //[6]slide, [7]run, [8]sprint //[9]cleared //[10]boot
                        if (player.originPOS[1] > (matchDetails.pitchSize[1] / 2)) {
                            if (Common.isBetween(player.startPOS[0], (matchDetails.pitchSize[0] / 4) - 5, matchDetails.pitchSize[0] - (matchDetails.pitchSize[0] / 4) + 5) && Common.isBetween(player.startPOS[1], matchDetails.pitchSize[1] - (matchDetails.pitchSize[1] / 6) + 5, matchDetails.pitchSize[1])) {
                                if (matchDetails.ball.withPlayer === false) {
                                    possibleActions = this.populatePossibleActions(possibleActions, 0, 0, 0, 0, 0, 0, 0, 20, 80, 0, 0);
                                    resolve(possibleActions);
                                } else {
                                    possibleActions = this.populatePossibleActions(possibleActions, 0, 0, 0, 0, 0, 0, 0, 70, 30, 0, 0);
                                    resolve(possibleActions);
                                }
                            } else {
                                if (matchDetails.ball.withPlayer === false) {
                                    possibleActions = this.populatePossibleActions(possibleActions, 0, 0, 0, 0, 0, 0, 0, 20, 80, 0, 0);
                                    resolve(possibleActions);
                                } else {
                                    possibleActions = this.populatePossibleActions(possibleActions, 0, 0, 0, 0, 40, 20, 40, 0, 0, 0, 0);
                                    resolve(possibleActions);
                                }
                            }
                        } else {
                            if (Common.isBetween(player.startPOS[0], (matchDetails.pitchSize[0] / 4) - 5, matchDetails.pitchSize[0] - (matchDetails.pitchSize[0] / 4) + 5) && Common.isBetween(player.startPOS[1], 0, (matchDetails.pitchSize[1] / 6) - 5)) {
                                if (matchDetails.ball.withPlayer === false) {
                                    possibleActions = this.populatePossibleActions(possibleActions, 0, 0, 0, 0, 0, 0, 0, 20, 80, 0, 0);
                                    resolve(possibleActions);
                                } else {
                                    possibleActions = this.populatePossibleActions(possibleActions, 0, 0, 0, 0, 0, 0, 0, 70, 30, 0, 0);
                                    resolve(possibleActions);
                                }
                            } else {
                                if (matchDetails.ball.withPlayer === false) {
                                    possibleActions = this.populatePossibleActions(possibleActions, 0, 0, 0, 0, 0, 0, 0, 20, 80, 0, 0);
                                    resolve(possibleActions);
                                } else {
                                    possibleActions = this.populatePossibleActions(possibleActions, 0, 0, 0, 0, 40, 20, 40, 0, 0, 0, 0);
                                    resolve(possibleActions);
                                }
                            }
                        }
                    } else if (Common.isBetween(ballX, -20, 20) && Common.isBetween(ballY, -20, 20)) {
                        //[0]shoot, [1]throughBall, [2]pass, [3]cross, [4]tackle, [5]intercept
                        //[6]slide, [7]run, [8]sprint //[9]cleared //[10]boot
                        if (matchDetails.ball.withPlayer === false) {
                            possibleActions = this.populatePossibleActions(possibleActions, 0, 0, 0, 0, 0, 0, 0, 60, 40, 0, 0);
                        } else {
                            possibleActions = this.populatePossibleActions(possibleActions, 0, 0, 0, 0, 0, 40, 0, 30, 30, 0, 0);
                        }
                        resolve(possibleActions);
                    } else {
                        //[0]shoot, [1]throughBall, [2]pass, [3]cross, [4]tackle, [5]intercept
                        //[6]slide, [7]run, [8]sprint //[9]cleared //[10]boot
                        possibleActions = this.populatePossibleActions(possibleActions, 0, 0, 0, 0, 0, 10, 0, 50, 30, 0, 0);
                        resolve(possibleActions);
                    }
                }
            } else {
                if (player.originPOS[1] > (matchDetails.pitchSize[1] / 2)) {
                    //[0]shoot, [1]throughBall, [2]pass, [3]cross, [4]tackle, [5]intercept
                    //[6]slide, [7]run, [8]sprint //[9]cleared //[10]boot
                    if (player.position === "GK") {
                        if (playerProximity[0] < 10 && playerProximity[1] < 25) {
                            possibleActions = this.populatePossibleActions(possibleActions, 0, 0, 10, 0, 0, 0, 0, 10, 0, 40, 40);
                            resolve(possibleActions);
                        } else {
                            possibleActions = this.populatePossibleActions(possibleActions, 0, 0, 50, 0, 0, 0, 0, 10, 0, 20, 20);
                            resolve(possibleActions);
                        }
                    } else {
                        if (Common.isBetween(player.startPOS[0], (matchDetails.pitchSize[0] / 4) - 5, matchDetails.pitchSize[0] - (matchDetails.pitchSize[0] / 4) + 5) && Common.isBetween(player.startPOS[1], 0, (matchDetails.pitchSize[1] / 6) - 5)) {
                            if (Common.isBetween(player.startPOS[0], (matchDetails.pitchSize[0] / 3) - 5, matchDetails.pitchSize[0] - (matchDetails.pitchSize[0] / 3) + 5) && Common.isBetween(player.startPOS[1], 0, (matchDetails.pitchSize[1] / 12) - 5)) {
                                //[0]shoot, [1]throughBall, [2]pass, [3]cross, [4]tackle, [5]intercept
                                //[6]slide, [7]run, [8]sprint //[9]cleared //[10]boot
                                if (playerProximity[0] < 6 && playerProximity[1] < 6) {
                                    if (closePlayerPosition[1] < player.startPOS[1]) {
                                        possibleActions = this.populatePossibleActions(possibleActions, 20, 0, 70, 0, 0, 0, 0, 10, 0, 0, 0);
                                        resolve(possibleActions);
                                    } else {
                                        possibleActions = this.populatePossibleActions(possibleActions, 80, 0, 20, 0, 0, 0, 0, 0, 0, 0, 0);
                                        resolve(possibleActions);
                                    }
                                } else {
                                    possibleActions = this.populatePossibleActions(possibleActions, 70, 10, 20, 0, 0, 0, 0, 0, 0, 0, 0);
                                    resolve(possibleActions);
                                }
                            } else {
                                if (playerProximity[0] < 6 && playerProximity[1] < 6) {
                                    possibleActions = this.populatePossibleActions(possibleActions, 10, 0, 70, 0, 0, 0, 0, 20, 0, 0, 0);
                                    resolve(possibleActions);
                                } else {
                                    possibleActions = this.populatePossibleActions(possibleActions, 70, 0, 20, 0, 0, 0, 0, 10, 0, 0, 0);
                                    resolve(possibleActions);
                                }
                            }
                        } else if (Common.isBetween(player.startPOS[1], (matchDetails.pitchSize[1] / 6) - 5, matchDetails.pitchSize[1] / 3)) {
                            //[0]shoot, [1]throughBall, [2]pass, [3]cross, [4]tackle, [5]intercept
                            //[6]slide, [7]run, [8]sprint, [9]cleared, [10]boot
                            if (playerProximity[0] < 10 && playerProximity[1] < 10) {
                                possibleActions = this.populatePossibleActions(possibleActions, 30, 20, 20, 10, 0, 0, 0, 20, 0, 0, 0);
                                resolve(possibleActions);
                            } else {
                                possibleActions = this.populatePossibleActions(possibleActions, 70, 10, 10, 0, 0, 0, 0, 10, 0, 0, 0);
                                resolve(possibleActions);
                            }
                        } else if (Common.isBetween(player.startPOS[1], (matchDetails.pitchSize[1] / 3), (2 * (matchDetails.pitchSize[1] / 3)))) {
                            //[0]shoot, [1]throughBall, [2]pass, [3]cross, [4]tackle, [5]intercept
                            //[6]slide, [7]run, [8]sprint //[9]cleared //[10]boot
                            if (playerProximity[0] < 10 && playerProximity[1] < 10) {
                                possibleActions = this.populatePossibleActions(possibleActions, 0, 20, 30, 20, 0, 0, 20, 0, 0, 0, 10);
                                resolve(possibleActions);
                            } else {
                                if (player.skill.shooting > 85) {
                                    possibleActions = this.populatePossibleActions(possibleActions, 60, 10, 10, 0, 0, 0, 20, 0, 0, 0, 0);
                                    resolve(possibleActions);
                                } else {
                                    if (player.position === "LM" || player.position === "CM" || player.position === "RM") {
                                        possibleActions = this.populatePossibleActions(possibleActions, 0, 10, 10, 10, 0, 0, 0, 30, 40, 0, 0);
                                        resolve(possibleActions);
                                    } else if (player.position === "ST") {
                                        possibleActions = this.populatePossibleActions(possibleActions, 0, 0, 0, 0, 0, 0, 0, 50, 50, 0, 0);
                                        resolve(possibleActions);
                                    } else {
                                        possibleActions = this.populatePossibleActions(possibleActions, 10, 10, 10, 10, 0, 0, 0, 30, 20, 0, 10);
                                        resolve(possibleActions);
                                    }
                                }
                            }
                        } else {
                            //[0]shoot, [1]throughBall, [2]pass, [3]cross, [4]tackle, [5]intercept
                            //[6]slide, [7]run, [8]sprint //[9]cleared //[10]boot
                            if (playerProximity[0] < 10 && playerProximity[1] < 10) {
                                possibleActions = this.populatePossibleActions(possibleActions, 0, 0, 0, 0, 0, 0, 0, 10, 0, 70, 20);
                                resolve(possibleActions);
                            } else {
                                if (player.position === "LM" || player.position === "CM" || player.position === "RM") {
                                    possibleActions = this.populatePossibleActions(possibleActions, 0, 0, 30, 0, 0, 0, 0, 30, 40, 0, 0);
                                    resolve(possibleActions);
                                } else if (player.position === "ST") {
                                    possibleActions = this.populatePossibleActions(possibleActions, 0, 0, 0, 0, 0, 0, 0, 50, 50, 0, 0);
                                    resolve(possibleActions);
                                } else {
                                    possibleActions = this.populatePossibleActions(possibleActions, 0, 0, 40, 0, 0, 0, 0, 30, 0, 20, 10);
                                    resolve(possibleActions);
                                }
                            }
                        }
                    }
                } else {
                    //[0]shoot, [1]throughBall, [2]pass, [3]cross, [4]tackle, [5]intercept
                    //[6]slide, [7]run, [8]sprint //[9]cleared //[10]boot
                    if (player.position === "GK") {
                        if (playerProximity[0] < 10 && playerProximity[1] < 25) {
                            possibleActions = this.populatePossibleActions(possibleActions, 0, 0, 10, 0, 0, 0, 0, 10, 0, 40, 40);
                            resolve(possibleActions);
                        } else {
                            possibleActions = this.populatePossibleActions(possibleActions, 0, 0, 50, 0, 0, 0, 0, 10, 0, 20, 20);
                            resolve(possibleActions);
                        }
                    } else {
                        if (Common.isBetween(player.startPOS[0], (matchDetails.pitchSize[0] / 4) - 5, matchDetails.pitchSize[0] - (matchDetails.pitchSize[0] / 4) + 5) && Common.isBetween(player.startPOS[1], (matchDetails.pitchSize[1] - (matchDetails.pitchSize[1] / 6) + 5), matchDetails.pitchSize[1])) {
                            if (Common.isBetween(player.startPOS[0], (matchDetails.pitchSize[0] / 3) - 5, matchDetails.pitchSize[0] - (matchDetails.pitchSize[0] / 3) + 5) && Common.isBetween(player.startPOS[1], (matchDetails.pitchSize[1] - (matchDetails.pitchSize[1] / 12) + 5), matchDetails.pitchSize[1])) {
                                //[0]shoot, [1]throughBall, [2]pass, [3]cross, [4]tackle, [5]intercept
                                //[6]slide, [7]run, [8]sprint //[9]cleared //[10]boot
                                if (playerProximity[0] < 6 && playerProximity[1] < 6) {
                                    if (closePlayerPosition[1] > player.startPOS[1]) {
                                        possibleActions = this.populatePossibleActions(possibleActions, 20, 0, 70, 0, 0, 0, 0, 10, 0, 0, 0);
                                        resolve(possibleActions);
                                    } else {
                                        possibleActions = this.populatePossibleActions(possibleActions, 80, 0, 20, 0, 0, 0, 0, 0, 0, 0, 0);
                                        resolve(possibleActions);
                                    }
                                } else {
                                    possibleActions = this.populatePossibleActions(possibleActions, 70, 10, 20, 0, 0, 0, 0, 0, 0, 0, 0);
                                    resolve(possibleActions);
                                }
                            } else {
                                if (playerProximity[0] < 6 && playerProximity[1] < 6) {
                                    possibleActions = this.populatePossibleActions(possibleActions, 10, 0, 70, 0, 0, 0, 0, 20, 0, 0, 0);
                                    resolve(possibleActions);
                                } else {
                                    possibleActions = this.populatePossibleActions(possibleActions, 70, 0, 20, 0, 0, 0, 0, 10, 0, 0, 0);
                                    resolve(possibleActions);
                                }
                            }
                        } else if (Common.isBetween(player.startPOS[1], (matchDetails.pitchSize[1] - (matchDetails.pitchSize[1] / 3)), (matchDetails.pitchSize[1] - (matchDetails.pitchSize[1] / 6) + 5))) {
                            //[0]shoot, [1]throughBall, [2]pass, [3]cross, [4]tackle, [5]intercept
                            //[6]slide, [7]run, [8]sprint, [9]cleared, [10]boot
                            if (playerProximity[0] < 10 && playerProximity[1] < 10) {
                                possibleActions = this.populatePossibleActions(possibleActions, 30, 20, 20, 10, 0, 0, 0, 20, 0, 0, 0);
                                resolve(possibleActions);
                            } else {
                                possibleActions = this.populatePossibleActions(possibleActions, 70, 10, 10, 0, 0, 0, 0, 10, 0, 0, 0);
                                resolve(possibleActions);
                            }
                        } else if (Common.isBetween(player.startPOS[1], (matchDetails.pitchSize[1] / 3), (matchDetails.pitchSize[1] - (matchDetails.pitchSize[1] / 3)))) {
                            //[0]shoot, [1]throughBall, [2]pass, [3]cross, [4]tackle, [5]intercept
                            //[6]slide, [7]run, [8]sprint //[9]cleared //[10]boot
                            if (playerProximity[0] < 10 && playerProximity[1] < 10) {
                                possibleActions = this.populatePossibleActions(possibleActions, 0, 20, 30, 20, 0, 0, 20, 0, 0, 0, 10);
                                resolve(possibleActions);
                            } else {
                                if (player.skill.shooting > 85) {
                                    possibleActions = this.populatePossibleActions(possibleActions, 60, 10, 10, 0, 0, 0, 20, 0, 0, 0, 0);
                                    resolve(possibleActions);
                                } else {
                                    if (player.position === "LM" || player.position === "CM" || player.position === "RM") {
                                        possibleActions = this.populatePossibleActions(possibleActions, 0, 10, 10, 10, 0, 0, 0, 30, 40, 0, 0);
                                        resolve(possibleActions);
                                    } else if (player.position === "ST") {
                                        possibleActions = this.populatePossibleActions(possibleActions, 0, 0, 0, 0, 0, 0, 0, 50, 50, 0, 0);
                                        resolve(possibleActions);
                                    } else {
                                        possibleActions = this.populatePossibleActions(possibleActions, 10, 10, 10, 10, 0, 0, 0, 30, 20, 0, 10);
                                        resolve(possibleActions);
                                    }
                                }
                            }
                        } else {
                            //[0]shoot, [1]throughBall, [2]pass, [3]cross, [4]tackle, [5]intercept
                            //[6]slide, [7]run, [8]sprint //[9]cleared //[10]boot
                            if (playerProximity[0] < 10 && playerProximity[1] < 10) {
                                possibleActions = this.populatePossibleActions(possibleActions, 0, 0, 0, 0, 0, 0, 0, 10, 0, 70, 20);
                                resolve(possibleActions);
                            } else {
                                if (player.position === "LM" || player.position === "CM" || player.position === "RM") {
                                    possibleActions = this.populatePossibleActions(possibleActions, 0, 0, 30, 0, 0, 0, 0, 30, 40, 0, 0);
                                    resolve(possibleActions);
                                } else if (player.position === "ST") {
                                    possibleActions = this.populatePossibleActions(possibleActions, 0, 0, 0, 0, 0, 0, 0, 50, 50, 0, 0);
                                    resolve(possibleActions);
                                } else {
                                    possibleActions = this.populatePossibleActions(possibleActions, 0, 0, 40, 0, 0, 0, 0, 30, 0, 20, 10);
                                    resolve(possibleActions);
                                }
                            }
                        }
                    }
                }
            }
        }).catch(function (error) {
            console.error("Error when finding the closest opposition player ", error);
        });
    });
}

function populatePossibleActions(possibleActions, shoot, throughball, pass, cross, tackle, intercept, slide, run, sprint, cleared, boot) {
    possibleActions[0].points = shoot;
    possibleActions[1].points = throughball;
    possibleActions[2].points = pass;
    possibleActions[3].points = cross;
    possibleActions[4].points = tackle;
    possibleActions[5].points = intercept;
    possibleActions[6].points = slide;
    possibleActions[7].points = run;
    possibleActions[8].points = sprint;
    possibleActions[9].points = cleared;
    possibleActions[10].points = boot;
    return possibleActions;
}

function resolveTackle(player, team, opposition, matchDetails) {
    return new Promise((resolve,reject) => {
        var foul = false;
        matchDetails.iterationLog.push("Tackle attempted by: " + player.name);
        async.eachSeries(opposition.players, function eachPlayer(thatPlayer, thatPlayerCallback) {
                if (matchDetails.ball.Player === thatPlayer.name) {
                    var tackleScore = (parseInt(player.skill.tackling) + parseInt(player.skill.strength)) / 2;
                    tackleScore += Common.getRandomNumber(-5, 5);
                    var retentionScore = (parseInt(thatPlayer.skill.agility) + parseInt(thatPlayer.skill.strength)) / 2;
                    retentionScore += Common.getRandomNumber(-5, 5);
                    if (wasFoul(10, 10) === true) {
                        matchDetails.iterationLog.push("Foul against: ", thatPlayer.name);
                        foul = true;
                    } else {
                        if (tackleScore > retentionScore) {
                            matchDetails.iterationLog.push("Successful tackle by: ", player.name);
                            if (Common.isInjured(1000) === true) {
                                thatPlayer.injured = true;
                                matchDetails.iterationLog.push("Player Injured - " + thatPlayer.name);
                            }
                            if (Common.isInjured(1200) === true) {
                                player.injured = true;
                                matchDetails.iterationLog.push("Player Injured - " + thatPlayer.name);
                            }
                            player.hasBall = true;
                            matchDetails.ball.Player = player.name;
                            matchDetails.ball.withPlayer = true;
                            matchDetails.ball.withTeam = team.name;
                            team.intent = "attack";
                            opposition.intent = "defend";
                            if (player.originPOS[1] > matchDetails.pitchSize[1] / 2) {
                                player.startPOS[1]--;
                                matchDetails.ball.position[1]--;
                                thatPlayer.startPOS[1]++;
                            } else {
                                player.startPOS[1]++;
                                matchDetails.ball.position[1]++;
                                thatPlayer.startPOS[1]--;
                            }
                        } else {
                            matchDetails.iterationLog.push("Failed tackle by: ", player.name);
                            if (Common.isInjured(1200) === true) {
                                thatPlayer.injured = true;
                                matchDetails.iterationLog.push("Player Injured - " + thatPlayer.name);
                            }
                            if (Common.isInjured(1000) === true) {
                                player.injured = true;
                                matchDetails.iterationLog.push("Player Injured - " + thatPlayer.name);
                            }
                            if (thatPlayer.originPOS[1] > matchDetails.pitchSize[1] / 2) {
                                thatPlayer.startPOS[1]--;
                                matchDetails.ball.position[1]--;
                                player.startPOS[1]++;
                            } else {
                                thatPlayer.startPOS[1]++;
                                matchDetails.ball.position[1]++;
                                player.startPOS[1]--;
                            }
                        }
                    }
                }
                thatPlayerCallback();
            },
            function afterAllPlayers() {
                resolve(foul);
            });
    });
}

function resolveSlide(player, team, opposition, matchDetails) {
    return new Promise((resolve,reject) => {
        var foul = false;
        matchDetails.iterationLog.push("Slide tackle attempted by: " + player.name);
        async.eachSeries(opposition.players, function eachPlayer(thatPlayer, thatPlayerCallback) {
                if (matchDetails.ball.Player === thatPlayer.name) {
                    var tackleScore = (parseInt(player.skill.tackling) + parseInt(player.skill.strength)) / 2;
                    tackleScore += Common.getRandomNumber(-5, 5);
                    var retentionScore = (parseInt(thatPlayer.skill.agility) + parseInt(thatPlayer.skill.strength)) / 2;
                    retentionScore += Common.getRandomNumber(-5, 5);
                    if (wasFoul(20, 32) === true) {
                        matchDetails.iterationLog.push("Foul against: " + thatPlayer.name);
                        foul = true;
                    } else {
                        if (tackleScore > retentionScore) {
                            matchDetails.iterationLog.push("Successful tackle by: ", player.name);
                            if (Common.isInjured(600) === true) {
                                thatPlayer.injured = true;
                                matchDetails.iterationLog.push("Player Injured - " + thatPlayer.name);
                            }
                            if (Common.isInjured(800) === true) {
                                player.injured = true;
                                matchDetails.iterationLog.push("Player Injured - " + thatPlayer.name);
                            }
                            player.hasBall = true;
                            matchDetails.ball.Player = player.name;
                            matchDetails.ball.withPlayer = true;
                            matchDetails.ball.withTeam = team.name;
                            team.intent = "attack";
                            opposition.intent = "defend";
                            if (player.originPOS[1] > matchDetails.pitchSize[1] / 2) {
                                player.startPOS[1] += -3;
                                matchDetails.ball.position[1] += -3;
                                thatPlayer.startPOS[1]++;
                            } else {
                                player.startPOS[1] += 3;
                                matchDetails.ball.position[1] += 3;
                                thatPlayer.startPOS[1] += -3;
                            }
                        } else {
                            matchDetails.iterationLog.push("Failed tackle by: ", player.name);
                            if (Common.isInjured(800) === true) {
                                thatPlayer.injured = true;
                                matchDetails.iterationLog.push("Player Injured - " + thatPlayer.name);
                            }
                            if (Common.isInjured(600) === true) {
                                player.injured = true;
                                matchDetails.iterationLog.push("Player Injured - " + thatPlayer.name);
                            }
                            if (thatPlayer.originPOS[1] > matchDetails.pitchSize[1] / 2) {
                                thatPlayer.startPOS[1] += -3;
                                matchDetails.ball.position[1] += -3;
                                player.startPOS[1] += 3;
                            } else {
                                thatPlayer.startPOS[1] += 3;
                                matchDetails.ball.position[1] += 3;
                                player.startPOS[1] += -3;
                            }
                        }
                    }
                }
                thatPlayerCallback();
            },
            function afterAllPlayers() {
                resolve(foul);
            });
    });
}

function wasFoul(x, y) {
    var foul = Common.getRandomNumber(0, x);
    if (Common.isBetween(foul, 0, (y / 2) - 1)) {
        return true;
    } else {
        return false;
    }
}

module.exports = {
    selectAction: selectAction,
    findPossibleActions: findPossibleActions,
    populatePossibleActions: populatePossibleActions,
    resolveTackle: resolveTackle,
    resolveSlide: resolveSlide,
    wasFoul: wasFoul
};
*/