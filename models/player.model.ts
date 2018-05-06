import {ISkills} from './skill.model';

export interface IPlayer {
    name? : string;
    position?: string;
    rating?: number;
    skill?: ISkills;
    startPOS?: any;
    injured?: boolean;
    hasBall?: boolean;
    originPOS?: any;
    relativePOS?: any;
}