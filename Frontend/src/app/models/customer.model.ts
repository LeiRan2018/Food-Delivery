export class Customer {
    _id: string;
    first_name: string;
    last_name: string;
    address: string;
    created_at: Date;
    modified_at: Date;
    constructor() {
        this.first_name = '';
        this.last_name = '';
        this.address = '';
        this.created_at = new Date();
        this.modified_at = new Date();
    }
}
