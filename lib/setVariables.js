"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const async = require("async");
const cf = require("../lib/common");
class SetVariables {
    /**
     * Reset Player Positions
     * @param {ITeam} team
     * @returns {Promise<any>}
     */
    resetPlayerPositions(team) {
        console.log('Reseting Players Positions');
        return new Promise((resolve, reject) => {
            async.eachSeries(team.players, function eachPlayer(thisPlayer, thisPlayerCallback) {
                let tempArray = thisPlayer.originPOS;
                thisPlayer.startPOS = tempArray.map(x => x);
                thisPlayer.relativePOS = tempArray.map(x => x);
                thisPlayerCallback();
            }, function afterAllPlayers() {
                resolve();
            });
        });
    }
    /**
     * Set Game Variables
     * @param {ITeam} team
     * @returns {Promise<any>}
     */
    setGameVariables(team) {
        console.log('Setting Game Variables');
        return new Promise((resolve, reject) => {
            async.eachSeries(team.players, function eachPlayer(thisPlayer, thisPlayerCallback) {
                let tempArray = thisPlayer.startPOS;
                thisPlayer.originPOS = tempArray.map(x => x);
                thisPlayer.relativePOS = tempArray.map(x => x);
                thisPlayer.hasBall = false;
                team.intent = "";
                thisPlayerCallback();
            }, function afterAllPlayers() {
                resolve(team);
            });
        });
    }
    /**
     * Kick Off Decider
     * @param {ITeam} team1
     * @param matchDetails
     * @returns {Promise<any>}
     */
    koDecider(team1, matchDetails) {
        console.log('Handling Kickoff Decideder');
        return new Promise(function (resolve, reject) {
            let playerWithBall = cf.Common.getRandomNumber(9, 10);
            let waitingPlayer;
            if (playerWithBall === 9) {
                waitingPlayer = 10;
            }
            else {
                waitingPlayer = 9;
            }
            team1.players[playerWithBall].startPOS = matchDetails.ball.position.map(x => x);
            team1.players[playerWithBall].hasBall = true;
            matchDetails.ball.withPlayer = true;
            matchDetails.ball.Player = team1.players[playerWithBall].name;
            matchDetails.ball.withTeam = team1.name;
            let tempPosition = [matchDetails.ball.position[0] + 20, matchDetails.ball.position[1]];
            team1.players[waitingPlayer].startPOS = tempPosition.map(x => x);
            team1.intent = "attack";
            resolve(team1);
        });
    }
    /**
     * Reset Team Stats
     * @returns {ITeamStats}
     */
    static resetTeamStats() {
        let _stats = {};
        _stats.goals = 0;
        _stats.shots = 0;
        _stats.corners = 0;
        _stats.freekicks = 0;
        _stats.penalties = 0;
        _stats.fouls = 0;
        return _stats;
    }
    /**
     * Reset Game Ball
     * @param {IPitch} _pitchDetails
     * @returns {IBall}
     */
    static resetGameBall(_pitchDetails) {
        let _ball = {};
        _ball.position = [_pitchDetails.pitchWidth / 2, _pitchDetails.pitchHeight / 2];
        _ball.withPlayer = true;
        _ball.direction = 'south';
        return _ball;
    }
    /**
     * Populate Match Details
     * @param {ITeam} team1
     * @param {ITeam} team2
     * @param {IPitch} pitchDetails
     * @returns {Promise<any>}
     */
    populateMatchDetails(team1, team2, pitchDetails) {
        console.log('Populating Match Details');
        return new Promise((resolve, reject) => {
            let matchDetails = {};
            matchDetails.kickOffTeam = team1;
            matchDetails.secondTeam = team2;
            matchDetails.pitchSize = [pitchDetails.pitchWidth, pitchDetails.pitchHeight];
            matchDetails.ball = SetVariables.resetGameBall(pitchDetails);
            matchDetails.half = 1;
            matchDetails.kickOffTeamStatistics = SetVariables.resetTeamStats();
            matchDetails.secondTeamStatistics = SetVariables.resetTeamStats();
            matchDetails.iterationLog = [];
            resolve(matchDetails);
        });
    }
}
exports.SetVariables = SetVariables;
//# sourceMappingURL=setVariables.js.map