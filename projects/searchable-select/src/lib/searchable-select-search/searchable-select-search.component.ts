import {AfterViewInit, Component, EventEmitter, Input, Output} from '@angular/core';
import {AbstractControl, FormControl} from '@angular/forms';

@Component({
	selector: 'searchable-select-search',
	templateUrl: './searchable-select-search.component.html',
	styleUrls: ['./searchable-select-search.component.scss']
})
export class SearchableSelectSearchComponent implements AfterViewInit {

	/**
	 * İçerisinde bulunan <code>input</code>'un durumunu barındıran {@link FormControl}.
	 */
	@Input('search-control') public searchControl: FormControl | AbstractControl;
	/**
	 * Eğer asenkron bir işlem gerçekleşiyo ise bunu belirtmekte kullanılacak olan yüklenme ibaresi.
	 */
	@Input('is-loading') public isLoading: boolean;

	@Output('search-changed') public searchChanged = new EventEmitter<string>();

	constructor() {
	}

	public ngAfterViewInit() {
	}

}
