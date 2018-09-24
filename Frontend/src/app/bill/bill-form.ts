import { BillFormBase } from './bill-form-base';

export class BillForm extends BillFormBase<string>{
    controlType = 'select';
    type: string;

    constructor(options: {} = {}) {
        super(options);
        this.type = options['type'] || [];
    }
}