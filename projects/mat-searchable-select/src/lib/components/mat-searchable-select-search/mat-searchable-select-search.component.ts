import {
	AfterViewInit,
	Component,
	ElementRef,
	EventEmitter,
	Input,
	OnDestroy,
	OnInit,
	Output,
	ViewChild
} from '@angular/core';
import {AbstractControl, FormControl} from '@angular/forms';
import {fromEvent, Subscription} from "rxjs";

@Component({
	selector: 'mat-searchable-select-search',
	templateUrl: './mat-searchable-select-search.component.html',
	styleUrls: ['./mat-searchable-select-search.component.scss']
})
export class MatSearchableSelectSearchComponent implements OnInit, AfterViewInit, OnDestroy {

	@ViewChild('searchInput')
	private searchInput: ElementRef<HTMLInputElement>;

	@Input('search-control') public searchControl: FormControl | AbstractControl;
	@Input('is-loading') public isLoading: boolean;

	@Output('search-changed') public searchChanged = new EventEmitter<string>();

	public focusEventEmitter = new EventEmitter<void>();
	public matSearchableSelectListCloseEventEmitter = new EventEmitter<KeyboardEvent>();

	private subscriptions: Subscription[] = [];

	public ngOnInit() {
		this.listenFocusEventEmitter();
	}

	public ngAfterViewInit() {
		this.bindCloseShortcut();
	}

	public ngOnDestroy() {
		this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
	}

	private listenFocusEventEmitter() {
		const subscription = this.focusEventEmitter.subscribe(() =>
			(this.searchInput.nativeElement as HTMLInputElement).focus());
		this.subscriptions.push(subscription);
	}

	private bindCloseShortcut() {
		const subscription = fromEvent(this.searchInput.nativeElement, 'keydown').subscribe((keyboardEvent: KeyboardEvent) => {
			if (keyboardEvent.key.toLowerCase() === 'Escape'.toLowerCase()) {
				this.matSearchableSelectListCloseEventEmitter.emit(keyboardEvent);
			}
		});
		this.subscriptions.push(subscription);
	}
}
