import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AbstractControl, FormControl} from '@angular/forms';

@Component({
	selector: 'mat-searchable-select-search',
	templateUrl: './mat-searchable-select-search.component.html',
	styleUrls: ['./mat-searchable-select-search.component.scss']
})
export class MatSearchableSelectSearchComponent {

	@Input('search-control') public searchControl: FormControl | AbstractControl;
	@Input('is-loading') public isLoading: boolean;

	@Output('search-changed') public searchChanged = new EventEmitter<string>();

}
