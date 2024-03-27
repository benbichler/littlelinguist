import {Language} from './language';
import {TranslatedWord} from './translateword';

export class Category {
    id : number;
    name : string;
    origin : Language = Language.English;
    target : Language = Language.Hebrew;
    lastModifiedDate: Date = new Date();
    words : TranslatedWord[] = [];
    updatedWithinLastWeek: boolean;

    constructor(id: number,
        name : string,
        lastModifiedDate: Date) {
        this.id = id;
        this.name = name;
        this.lastModifiedDate = lastModifiedDate;

        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

        this.updatedWithinLastWeek = this.lastModifiedDate > oneWeekAgo;

    }
    isUpdatedWithinLastWeek(): boolean {
        console.log(this.lastModifiedDate)
        const fixedDate = new Date(this.lastModifiedDate);
        const oneWeekInMilliseconds = 7 * 24 * 60 * 60 * 1000
        const currentDate = new Date();
        const diff = currentDate.getTime() - fixedDate.getTime();
        console.log(diff)
        return diff < oneWeekInMilliseconds;
    }
}

