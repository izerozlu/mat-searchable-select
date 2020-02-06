import {AfterViewInit, Directive, ElementRef, Input, OnDestroy} from '@angular/core';
import {BehaviorSubject, Subscription} from "rxjs";
import {filter} from "rxjs/operators";

@Directive({
	selector: '[mat-searchable-select-highlight]'
})
export class MatSearchableSelectHighlightDirective implements AfterViewInit, OnDestroy {
	@Input('mat-searchable-select-highlight') private isEnabled: boolean;

	@Input('highlight-query')
	set searchQuerySetter(value: string) {
		this.searchQuery.next(value);
	};

	private defaultText: string;
	private element: HTMLElement;
	private searchQuery = new BehaviorSubject<string>('');
	private subscriptions: Subscription[] = [];
	private listItemContent: HTMLSpanElement;

	constructor(
		private elementRef: ElementRef
	) {
		this.element = elementRef.nativeElement;
	}

	public ngAfterViewInit() {
		this.listItemContent = this.element.querySelector('.mat-searchable-select__list-item-content');
		this.listenSearchQuery();
	}

	public ngOnDestroy() {
		this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
	}

	private listenSearchQuery() {
		const subscription = this.searchQuery.pipe(
			filter(((searchQuery: string) => this.isEnabled && searchQuery !== undefined))
		).subscribe((searchQuery: string) => {
			this.checkForDefaultText();
			let listItemInnerHtml: string;
			if (searchQuery && this.defaultText.includes(searchQuery)) {
				const highlightElement: HTMLSpanElement = this.generateHighlightElement();
				listItemInnerHtml = this.defaultText.replace(new RegExp(searchQuery, 'g'), highlightElement.outerHTML);
			} else {
				listItemInnerHtml = this.defaultText;
			}
			this.listItemContent.innerHTML = listItemInnerHtml;
		});
		this.subscriptions.push(subscription);
	}

	private checkForDefaultText() {
		if (!this.defaultText) {
			this.defaultText = this.listItemContent.textContent.trim();
		}
	}

	private generateHighlightElement() {
		const highlightElement: HTMLSpanElement = document.createElement('span');
		highlightElement.classList.add('mat-searchable-select-highlight');
		highlightElement.style.background = 'rgba(0, 0, 0, .12)';
		highlightElement.style.borderRadius = '4px';
		highlightElement.textContent = this.searchQuery.value;
		return highlightElement;
	}
}
