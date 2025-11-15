import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-image-preview',
  templateUrl: './image-preview.component.html',
})
export class ImagePreviewComponent implements OnInit {
  rowData: string;

  constructor(protected ref: NbDialogRef<ImagePreviewComponent>) {}

  ngOnInit(): void {}

  close(): void {
    this.ref.close();
  }
}
