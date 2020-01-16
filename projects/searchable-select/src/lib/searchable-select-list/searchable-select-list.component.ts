import {
	AfterViewInit,
	Component,
	ContentChild,
	ElementRef,
	EventEmitter,
	Input,
	OnChanges,
	Output,
	SimpleChanges,
	TemplateRef,
	ViewEncapsulation
} from '@angular/core';
import {SearchableSelectOptionDirective} from '../searchable-select-option.directive';

@Component({
	selector: 'searchable-select-list',
	templateUrl: './searchable-select-list.component.html',
	styleUrls: ['./searchable-select-list.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class SearchableSelectListComponent implements OnChanges, AfterViewInit {
	@ContentChild(SearchableSelectOptionDirective, {static: false}) private searchableSelectOptionDirective: SearchableSelectOptionDirective;

	@Input('options') public options: any[];
	@Input('option-keys') public optionKeys: string | string[];
	@Input('option-separator') public optionSeparator = ' ';

	@Output('item-selected') public itemSelected = new EventEmitter<any>();

	public templateRef: TemplateRef<any>;

	constructor(
		private hostElementRef: ElementRef
	) {
	}

	public ngOnChanges({options, optionKeys}: SimpleChanges): void {
		if (optionKeys && optionKeys.currentValue && typeof optionKeys.currentValue === 'string') {
			this.optionKeys = [optionKeys.currentValue];
		}
		if (options && options.currentValue) {
			this.calculateListHeight();
		}
	}

	public ngAfterViewInit() {
		this.calculateListHeight();
		setTimeout(() => this.templateRef = this.searchableSelectOptionDirective.templateRef);
	}

	public handleItemSelection(selectedItem: any) {
		this.itemSelected.emit(selectedItem);
	}

	private calculateListHeight() {
		const hostElement: HTMLElement = this.hostElementRef.nativeElement;
		const matListElement: HTMLElement = hostElement.querySelector('.searchable-select__list');
		const matListItemElement: HTMLElement = matListElement.querySelector('.searchable-select__option');
		matListElement.style.maxHeight = `${(matListItemElement ? matListItemElement.clientHeight || 48 : 48) * 5}px`;
	}

}
