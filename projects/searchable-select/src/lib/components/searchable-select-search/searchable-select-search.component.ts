import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AbstractControl, FormControl} from '@angular/forms';

@Component({
	selector: 'searchable-select-search',
	templateUrl: './searchable-select-search.component.html',
	styleUrls: ['./searchable-select-search.component.scss']
})
export class SearchableSelectSearchComponent {

	@Input('search-control') public searchControl: FormControl | AbstractControl;
	@Input('is-loading') public isLoading: boolean;

	@Output('search-changed') public searchChanged = new EventEmitter<string>();

	constructor() {
	}

}
