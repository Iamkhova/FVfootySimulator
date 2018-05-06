import {ITeam} from "./team.model";
import {IBall} from "./ball.model";
import {ITeamStats} from "./teamStats.model";

export interface IMatchDetails {
    kickOffTeam?: ITeam;
    secondTeam?: ITeam;
    pitchSize? : [number,number];
    ball?  : IBall;
    half?: number;
    kickOffTeamStatistics?: ITeamStats;
    secondTeamStatistics?: ITeamStats;
    iterationLog?: any;
}