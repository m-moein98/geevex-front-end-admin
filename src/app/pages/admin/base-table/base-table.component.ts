import { Component, OnInit } from "@angular/core";
import { Pagination } from "../admin.model";
import { LocalDataSource } from 'ng2-smart-table';
import { CustomButtonComponent } from "../custom-button.component";

@Component({ template: '' })
export class BaseTableComponent implements OnInit {
    constructor() {
        this.updateObserver = {
            next: () => this.ngOnInit(),
            error: () => this.ngOnInit()
        }
    }

    updateObserver: {
        next: () => void,
        error: () => void
    }

    pagination: Pagination
    isLoading = true
    source: LocalDataSource = new LocalDataSource();

    defaultSettings = {
        actions: {
            add: true,
            edit: true,
            delete: false,
        },
        add: {
            addButtonContent: '<i class="nb-plus"></i>',
            createButtonContent: '<i class="nb-checkmark"></i>',
            cancelButtonContent: '<i class="nb-close"></i>',
        },
        edit: {
            editButtonContent: '<i class="nb-edit"></i>',
            saveButtonContent: '<i class="nb-checkmark"></i>',
            cancelButtonContent: '<i class="nb-close"></i>',
        },
    }

    defaultColumns = {
        id: {
            title: 'ID',
            type: 'number',
            editable: false,
            addable: false,
            width: '5%',
        },
    }

    boolColumnParams = {
        type: 'text',
        editor: {
            type: 'list',
            config: {
                selectText: 'Select',
                list: [
                    { value: 'true', title: 'Active' },
                    { value: 'false', title: 'Inactive' }
                ]
            }
        }
    }

    customColumnParams = {
        type: 'custom',
        editable: false,
        addable: false,
        filter: false,
        width: '5%',
        renderComponent: CustomButtonComponent,
    }

    settingsFactory = () => (
        {
            ...this.defaultSettings,
        }
    )
    settings = this.settingsFactory()

    ngOnInit() { }
}