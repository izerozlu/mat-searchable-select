import {AfterViewInit, Directive, ElementRef, Input} from '@angular/core';

@Directive({
	selector: '[mat-searchable-select-highlight]'
})
export class MatSearchableSelectHighlightDirective implements AfterViewInit {
	@Input('mat-searchable-select-highlight') private isEnabled: boolean;
	@Input('highlight-query') private searchQuery: string;

	private element: HTMLElement;

	constructor(
		private elementRef: ElementRef
	) {
		this.element = elementRef.nativeElement;
	}

	public ngAfterViewInit() {
		if (this.isEnabled) {
			this.highlightSearchQuery();
		}
	}

	private highlightSearchQuery() {
		const isSearchQueryPresent = this.element.innerText.includes(this.searchQuery);
		if (isSearchQueryPresent) {
			const matListItemElement = this.element.childNodes[0];
			const childNodes = matListItemElement.childNodes;
			for (const childNodeIndex in childNodes) {
				if (childNodes.hasOwnProperty(childNodeIndex)) {
					const childNode = childNodes[childNodeIndex];
					if (childNode.nodeType === Node.TEXT_NODE && childNode.textContent.includes(this.searchQuery)) {
						const highlightElement = this.generateHighlightElement();
						const splitNodeValues = childNode.nodeValue.split(this.searchQuery);
						childNode.replaceWith(splitNodeValues[0], (highlightElement as Node), splitNodeValues[1]);
					}
				}
			}
		}
	}

	private generateHighlightElement() {
		const highlightElement: HTMLSpanElement = document.createElement('span');
		highlightElement.classList.add('mat-searchable-select-highlight');
		highlightElement.style.background = 'rgba(0, 0, 0, .06)';
		highlightElement.style.borderRadius = '4px';
		highlightElement.textContent = this.searchQuery;
		return highlightElement;
	}
}
