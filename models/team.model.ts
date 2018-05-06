import {IPlayer} from './player.model';

export interface ITeam {
    name?: string;
    players?: [IPlayer];
    manager?: string;
}