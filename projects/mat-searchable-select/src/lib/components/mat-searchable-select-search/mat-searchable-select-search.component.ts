import {Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {AbstractControl, FormControl} from '@angular/forms';
import {Subscription} from "rxjs";

@Component({
	selector: 'mat-searchable-select-search',
	templateUrl: './mat-searchable-select-search.component.html',
	styleUrls: ['./mat-searchable-select-search.component.scss']
})
export class MatSearchableSelectSearchComponent implements OnInit, OnDestroy {

	@ViewChild('searchInput')
	private searchInput: ElementRef<HTMLInputElement>;

	@Input('search-control') public searchControl: FormControl | AbstractControl;
	@Input('is-loading') public isLoading: boolean;

	@Output('search-changed') public searchChanged = new EventEmitter<string>();

	public focusEventEmitter = new EventEmitter<void>();

	private subscriptions: Subscription[] = [];

	public ngOnInit() {
		this.listenFocusEventEmitter();
	}

	public ngOnDestroy() {
		this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
	}

	private listenFocusEventEmitter() {
		const subscription = this.focusEventEmitter.subscribe(() =>
			(this.searchInput.nativeElement as HTMLInputElement).focus());
		this.subscriptions.push(subscription);
	}
}
