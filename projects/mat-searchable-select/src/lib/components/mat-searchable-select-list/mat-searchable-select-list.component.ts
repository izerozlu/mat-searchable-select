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
import { MatSearchableSelectOptionDirective } from '../../directives/mat-searchable-select-option.directive';

@Component({
	selector: 'mat-searchable-select-list',
	templateUrl: './mat-searchable-select-list.component.html',
	styleUrls: ['./mat-searchable-select-list.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class MatSearchableSelectListComponent implements OnChanges, AfterViewInit {
	@ContentChild(MatSearchableSelectOptionDirective, { static: false })
	private matSearchableSelectOptionDirective: MatSearchableSelectOptionDirective;

	@Input('options')
	set optionsSetter(options: any[]) {
		this.options = options;
		this.filteredOptions = [];
		setTimeout(() => this.filteredOptions = options);
	}
	@Input('option-keys') private optionKeys: string | string[];
	@Output('item-selected') public itemSelected = new EventEmitter<any>();


	public searchQuery: string;
	public filteredOptions: any[];
	public options: any[];
	public templateRef: TemplateRef<any>;
	public isHighlightEnabled: boolean;


	constructor(
		private hostElementRef: ElementRef
	) {
	}

	public ngOnChanges({ options, optionKeys }: SimpleChanges): void {
		if (optionKeys && optionKeys.currentValue && typeof optionKeys.currentValue === 'string') {
			this.optionKeys = [optionKeys.currentValue];
		}
		if (options && options.currentValue) {
			this.calculateListHeight();
		}
	}

	public ngAfterViewInit() {
		this.calculateListHeight();
		setTimeout(() => this.templateRef = this.matSearchableSelectOptionDirective.templateRef);
	}

	public handleItemSelection(selectedItem: any) {
		this.itemSelected.emit(selectedItem);
	}

	private calculateListHeight() {
		const hostElement: HTMLElement = this.hostElementRef.nativeElement;
		const matListElement: HTMLElement = hostElement.querySelector('.mat-searchable-select__list');
		const matListItemElement: HTMLElement = matListElement.querySelector('.mat-searchable-select__option');
		matListElement.style.maxHeight = `${(matListItemElement ? matListItemElement.clientHeight || 48 : 48) * 5}px`;
	}

}
