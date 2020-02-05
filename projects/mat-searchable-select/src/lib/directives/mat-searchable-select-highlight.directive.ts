import {AfterViewInit, Directive, ElementRef, Input} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {filter} from "rxjs/operators";

@Directive({
	selector: '[mat-searchable-select-highlight]'
})
export class MatSearchableSelectHighlightDirective implements AfterViewInit {
	@Input('mat-searchable-select-highlight') private isEnabled: boolean;

	@Input('highlight-query')
	set searchQuerySetter(value: string) {
		this.searchQuery.next(value);
	};

	private defaultText: string;
	private element: HTMLElement;
	private searchQuery = new BehaviorSubject<string>('');

	constructor(
		private elementRef: ElementRef
	) {
		this.element = elementRef.nativeElement;
	}

	public ngAfterViewInit() {
		this.listenSearchQuery();
	}

	private listenSearchQuery() {
		this.searchQuery.pipe(
			filter(((searchQuery: string) => this.isEnabled && searchQuery && searchQuery.length > 0))
		).subscribe((searchQuery: string) => {
			const matListItemElement = this.element.childNodes[0];
			const childNodes = matListItemElement.childNodes;
			const textNode = Array.from(childNodes).filter((node: Node) => node.nodeType === Node.TEXT_NODE)[0];
			const textContent = textNode.textContent;
			if (!this.defaultText) {
				this.defaultText = textContent;
			} else if (this.element.querySelector('.mat-searchable-select-highlight')) {
				textNode.nextSibling.remove();
				textNode.nextSibling.remove();
			}
			if ((this.defaultText || textContent).includes(searchQuery)) {
				const highlightElement = this.generateHighlightElement();
				const splitNodes = (this.defaultText ? document.createTextNode(this.defaultText) : textNode).nodeValue.split(searchQuery);
				textNode.replaceWith(splitNodes[0], highlightElement, splitNodes[1]);
			}
		})
	}

	private generateHighlightElement() {
		const highlightElement: HTMLSpanElement = document.createElement('span');
		highlightElement.classList.add('mat-searchable-select-highlight');
		highlightElement.style.background = 'rgba(0, 0, 0, .06)';
		highlightElement.style.borderRadius = '4px';
		highlightElement.textContent = this.searchQuery.value;
		return highlightElement;
	}
}
