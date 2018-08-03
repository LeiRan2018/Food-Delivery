export class Genre {
    _id: string;
    name: string;
    created_at: Date;
    modified_at: Date;
    constructor() {
        this.name = '';
        this.created_at = new Date();
        this.modified_at = new Date();
    }
}