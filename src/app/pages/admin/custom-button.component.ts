import { Component, EventEmitter, Input } from "@angular/core";
import { ViewCell } from 'ng2-smart-table';

@Component({
    selector: 'ngx-custom-button',
    template: `
      <button nbButton (click)="buttonClick.emit(rowData)" fullWidth status="primary" style="display: flex; align-items: end">
      <nb-icon icon="file-text-outline"></nb-icon>
      </button>
    `,
})
export class CustomButtonComponent implements ViewCell {
    @Input() value: string | number;
    @Input() rowData: any;
    constructor(
    ) { }

    buttonClick = new EventEmitter<any>();
}