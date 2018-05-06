import {ISkills} from './skill.model';

export interface IPlayer {
    name? : string;
    position?: string;
    rating?: number;
    skill?: ISkills;
    startPOS?: [0,0];
    injured?: boolean;
}