import { Component, EventEmitter, Input } from "@angular/core";
import { ViewCell } from 'ng2-smart-table';

@Component({
  selector: 'ngx-table-row-image',
  template: `
    <div style="width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; overflow: hidden; border-radius: 10%;">
      <img [src]="valueString"
          [alt]="valueString"
          style="width: 100%; height: 100%; object-fit: contain; border-radius: inherit;">
    </div>
  `,
})
export class TableRowImageComponent implements ViewCell {
  @Input() value: string | number;
  @Input() rowData: any;


  get valueString(): string {
    return this.value?.toString() || '';
  }
}
