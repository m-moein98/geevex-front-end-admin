import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { BaseTableComponent } from '../base-table/base-table.component';
import { AdminService } from '../admin-service';
import {
  FAQ,
  FAQCreate,
  FAQUpdate,
  FAQCategory
} from '../admin.model';
import { concatMap, tap } from 'rxjs/operators';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FAQComponent extends BaseTableComponent implements OnInit {

  faqs: FAQ[] = [];
  source: LocalDataSource = new LocalDataSource();
  selectedCategory: FAQCategory = 'all';
  faqCategories: FAQCategory[] = ['all', 'auth', 'trading', 'gives', 'registration_kyc', 'withdrawal', 'digital_currency', 'bug_report', 'system_error', 'service', 'operational', 'other'];
  categoryOptions = [
    { value: 'all', title: 'All' },
    { value: 'auth', title: 'Authentication' },
    { value: 'trading', title: 'Trading' },
    { value: 'gives', title: 'Gives' },
    { value: 'registration_kyc', title: 'Registration & KYC' },
    { value: 'withdrawal', title: 'Withdrawal' },
    { value: 'digital_currency', title: 'Digital Currency' },
    { value: 'bug_report', title: 'Bug Report' },
    { value: 'system_error', title: 'System Error' },
    { value: 'service', title: 'Service' },
    { value: 'operational', title: 'Operational' },
    { value: 'other', title: 'Other' }
  ];

  constructor(
    protected service: AdminService,
      private toastrService: NbToastrService
  ) {
    super();
    this.source.onAdded().pipe(
      tap(() => { }),
      concatMap(payload => this.service.createFAQ(payload)),
    ).subscribe(this.updateObserver)
    this.source.onUpdated().pipe(
      tap(() => this.isLoading = true),
      concatMap((payload: FAQ) => this.service.updateFAQ(payload.id, payload)),
    ).subscribe(this.updateObserver)
  }

  getSettings() {
    return {
      ...this.defaultSettings,
      mode: 'inline',
      actions: {
        add: true,
        edit: true,
        delete: true
      },
      columns: {
        ...this.defaultColumns,
        question: {
          title: 'Question',
          width: '40%'
        },
        answer: {
          title: 'Answer',
          width: '40%'
        },
        category: {
          title: 'Category',
          width: '15%',
          valuePrepareFunction: (value) => {
            const category = this.categoryOptions.find(opt => opt.value === value);
            return category ? category.title : value;
          },
          editor: {
            type: 'list',
            config: {
              selectText: 'Select',
              list: this.categoryOptions.map(category => ({ value: category.value, title: category.title }))
            }
          }
        }
      }
    };
  }

  ngOnInit() {
    this.getFAQs();
  }

  getFAQs() {
    this.service.getFAQs(this.selectedCategory).subscribe(
      (res: any) => {
        this.faqs = res.results || res;
        this.isLoading = false;
        this.source.load(this.faqs);
        this.settings = this.getSettings();
      }
    );
  }

  onCategoryChange(category: FAQCategory) {
    this.selectedCategory = category;
    this.getFAQs();
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete this FAQ?')) {
      this.service.deleteFAQ(event.data.id).subscribe(
        () => {
          event.confirm.resolve();
          this.getFAQs();
        },
        (error) => {
          event.confirm.reject();
          console.error('Error deleting FAQ:', error);
        }
      );
    } else {
      event.confirm.reject();
    }
  }
  onEdit(event: any) {
    const faq = event.newData;
    this.service.updateFAQ(faq.id, { question: faq.question, answer: faq.answer, category: faq.category }).subscribe(
      (result) => {
        this.toastrService.success('FAQ updated successfully', 'Success');
        this.getFAQs();
      },
      (error) => {
        this.toastrService.danger('Failed to update FAQ', 'Error');
        this.isLoading = false;
      }
    );
  }
}