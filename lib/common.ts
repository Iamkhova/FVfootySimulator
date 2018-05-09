import async = require("async");

export class Common {

    /**
     * Get Random Number
     * @param {number} min
     * @param {number} max
     * @returns {number}
     */
    static getRandomNumber(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /**
     * Round Number
     * @param {number} value
     * @param {number} precision
     * @returns {number}
     */
    static round(value:number , precision:number) {
        const multiplier = Math.pow(10, precision || 0);
        return Math.round(value * multiplier) / multiplier;
    }

    /**
     * Is Between
     * @param {number} num
     * @param {number} low
     * @param {number} high
     * @returns {boolean}
     */
    static isBetween(num: number, low: number, high: number) {
        if (num > low && num < high) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Get Ball Trajectory
     * @param {number} currentPOS
     * @param {number} newPOS
     * @param {number} power
     * @returns {Promise<any>}
     */
    getBallTrajectory(currentPOS: number, newPOS: number, power: number){
        return new Promise(function (resolve, reject) {
            const xMovement = Math.pow((currentPOS[0] - newPOS[0]), 2);
            const yMovement = Math.pow((parseInt(currentPOS[1]) - parseInt(newPOS[1])), 2);
            const movementDistance = Math.round(Math.sqrt(xMovement + yMovement));
            let arraySize = Math.round(currentPOS[1] - newPOS[1]);
            if (movementDistance >= power) {
                power = power + movementDistance;
            }
            const height = Math.sqrt(Math.abs(Math.pow(movementDistance / 2, 2) - Math.pow(power / 2, 2)));
            if (arraySize < 1) {
                arraySize = 1;
            }
            const yPlaces = Array.apply(null, Array(Math.abs(arraySize))).map(function (x, i) {
                return i;
            });
            const trajectory = [];
            trajectory.push([currentPOS[0], currentPOS[1], 0]);
            const changeInX = (newPOS[0] - currentPOS[0]) / Math.abs(currentPOS[1] - newPOS[1]);
            const changeInY = (currentPOS[1] - newPOS[1]) / (newPOS[1] - currentPOS[1]);
            const changeInH = height / (yPlaces.length / 2);
            let elevation = 1;
            async.eachSeries(yPlaces, function eachPos(thisYPos, thisYPosCallback) {
                const lastX = trajectory[trajectory.length - 1][0];
                const lastY = trajectory[trajectory.length - 1][1];
                const lastH = trajectory[trajectory.length - 1][2];
                const  xPos = Common.round(lastX + changeInX, 5);
                let yPos : number;
                if (newPOS[1] > currentPOS[1]) {
                    yPos = lastY - changeInY;
                } else {
                    yPos = lastY + changeInY;
                }
                let hPos;
                if (elevation === 1) {
                    hPos = Common.round(lastH + changeInH, 5);
                    if (hPos >= height) {
                        elevation = 0;
                        hPos = height;
                    }
                } else {
                    hPos = Common.round(lastH - changeInH, 5);
                }
                trajectory.push([xPos, yPos, hPos]);
                thisYPosCallback();
            }, function afterAllYPos() {
                resolve(trajectory);
            });
        });
    }

    /**
     * Calculate Power
     * @param {number} strength
     * @returns {number}
     */
    static calculatePower(strength: number) {
        const hit = Common.getRandomNumber(1, 5);
        return (strength * hit);
    }


}