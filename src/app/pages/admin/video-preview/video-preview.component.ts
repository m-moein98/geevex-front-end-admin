import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-video-preview',
  templateUrl: './video-preview.component.html',
})
export class VideoPreviewComponent implements OnInit {
  rowData: string;

  constructor(protected ref: NbDialogRef<VideoPreviewComponent>) {}

  ngOnInit(): void {}

  close(): void {
    this.ref.close();
  }
}
