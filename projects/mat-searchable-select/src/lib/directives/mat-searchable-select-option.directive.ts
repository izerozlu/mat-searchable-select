import {Directive, TemplateRef} from '@angular/core';

@Directive({
	selector: '[mat-searchable-select-option],[searchableSelectOption]'
})
export class MatSearchableSelectOptionDirective {

	constructor(
		public templateRef: TemplateRef<any>
	) {
	}

}
