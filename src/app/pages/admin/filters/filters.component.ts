import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Filter } from '../admin.model';

@Component({
  selector: 'ngx-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {
  @Input() filters: Filter[];
  @Output() filterChange = new EventEmitter();
  @Input() hasPagination = false;
  @Output() paginationChange = new EventEmitter();

  constructor(
    private fb: FormBuilder
  ) { }

  filterForm: FormGroup = this.fb.group({});
  paginationForm = new FormGroup(
    {
      page: new FormControl(1),
    }
  )
  ngOnInit(): void {
    this.filterForm.addControl("search", new FormControl());
    this.filters.forEach((filter: Filter) => {
      this.filterForm.addControl(filter.name, new FormControl());
    })
    this.filterForm.valueChanges.subscribe(
      (res) => {
        // remove empty fields
        Object.keys(res).forEach((key) => (res[key] == null || res[key] == '') && delete res[key]);
        this.filterChange.emit(res);
      }
    );
    setTimeout(() => {
      this.filters.forEach((filter: Filter) => {
        this.filterForm.get(filter.name).setValue(String(filter.defaultValue));
      })
    }, 200);
    this.paginationForm.valueChanges.subscribe(
      (res) => {
        this.paginationChange.emit(res);
      }
    )
  }
  nextPage() {
    this.paginationForm.get('page').setValue(this.paginationForm.get('page').value + 1);
  }
  previousPage() {
    this.paginationForm.get('page').setValue(this.paginationForm.get('page').value - 1);
  }
}
