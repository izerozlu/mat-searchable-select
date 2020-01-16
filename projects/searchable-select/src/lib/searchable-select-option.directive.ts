import {Directive, TemplateRef} from '@angular/core';

@Directive({
	selector: '[searchable-select-option]'
})
export class SearchableSelectOptionDirective {

	constructor(
		public templateRef: TemplateRef<any>
	) {
	}

}
