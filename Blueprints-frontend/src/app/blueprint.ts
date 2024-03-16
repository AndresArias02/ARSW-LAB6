export class Blueprint {

    name : string;
    author : string;
    amountOfPoints : number;
    points: { x: number, y: number }[];

    constructor() {
        this.name = '';
        this.author = '';
        this.amountOfPoints = 0;
        this.points = [];
    }
}

