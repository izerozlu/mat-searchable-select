import {
	AfterViewInit,
	Component,
	ContentChild,
	EventEmitter,
	Input,
	OnChanges,
	OnInit,
	Output,
	SimpleChanges,
	TemplateRef,
	ViewChild
} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatOption} from '@angular/material';
import {filter, first} from 'rxjs/operators';
import {MatSearchableSelectListComponent} from '../mat-searchable-select-list/mat-searchable-select-list.component';
import {MatSearchableSelectOptionDirective} from '../../directives/mat-searchable-select-option.directive';
import {BehaviorSubject} from 'rxjs';

@Component({
	selector: 'mat-searchable-select',
	templateUrl: './mat-searchable-select.component.html',
	styleUrls: ['./mat-searchable-select.component.scss']
})
export class MatSearchableSelectComponent implements OnInit, AfterViewInit, OnChanges {

	@ViewChild('hiddenOption', {static: false})
	private hiddenOption: MatOption;
	@ContentChild(MatSearchableSelectListComponent, {static: false})
	private searchableSelectList: MatSearchableSelectListComponent;
	@ContentChild(MatSearchableSelectOptionDirective, {static: false})
	private searchableSelectOptionDirective: MatSearchableSelectOptionDirective;

	@Input('highlight')
	set highlightSetter(value: boolean) {
		setTimeout(() => this.searchableSelectList.isHighlightEnabled = value !== false);
	}

	@Input('control') public control: FormControl;
	@Input('value') public value: any;
	@Input('is-loading') public isLoading: boolean;

	@Output('changed') public changedEventEmitter = new EventEmitter<{ previousValue: any, nextValue: any }>();
	@Output('search-changed') public searchChangedEventEmitter = new EventEmitter<string>();

	public selectedItem: any;
	public optionTemplateRef: TemplateRef<any>;
	public searchFormControl = new FormControl(undefined);

	private itemSelecting = new BehaviorSubject(false);

	constructor() {
	}

	public ngOnInit() {
		this.searchFormControl.valueChanges.pipe(filter((query: string) => query === '' || (query && query.length >= 3)))
			.subscribe((queryString: string) => {
				this.searchChangedEventEmitter.emit(queryString);
				this.searchableSelectList.searchQuery = queryString;
			});
	}

	public ngAfterViewInit() {
		setTimeout(() => {
			if (this.searchableSelectList) {
				this.searchableSelectList.itemSelected.subscribe((selectedItem: any) => this.handleItemSelection(selectedItem));
				this.optionTemplateRef = this.searchableSelectOptionDirective.templateRef;
			}
			this.setSelectValue();
		});
	}

	public ngOnChanges({value}: SimpleChanges): void {
		if (value && value.currentValue && value.currentValue !== this.control.value) {
			if (this.itemSelecting.value === true) {
				this.itemSelecting.pipe(filter((itemSelectionStatus => itemSelectionStatus === false)), first()).subscribe(() => {
					this.control.setValue(value.currentValue);
					setTimeout(() => {
						this.hiddenOption.value = value.currentValue;
						this.hiddenOption._selectViaInteraction();
					});
				});
			} else {
				this.control.setValue(value.currentValue);
				setTimeout(() => {
					this.hiddenOption.value = value.currentValue;
					this.hiddenOption._selectViaInteraction();
				});
			}
		}
	}

	private setSelectValue() {
		if (this.control && this.control.value) {
			const controlValue = this.control.value;
			this.selectedItem = controlValue;
			this.hiddenOption.value = controlValue;
			this.hiddenOption._selectViaInteraction();
		}
	}

	public handleMatSelectOpened() {
		const matSelectPanelElement = document.querySelector('.mat-select-panel') as HTMLElement;
		matSelectPanelElement.style.overflow = 'hidden';
		matSelectPanelElement.style.maxHeight = 'min-content';
	}

	public handleItemSelection(selectedItem: any, needsEmit: boolean = true) {
		const previousValue = this.control.value;
		this.itemSelecting.next(true);
		this.control.setValue(selectedItem);
		this.selectedItem = selectedItem;
		setTimeout(() => {
			this.hiddenOption.value = selectedItem;
			this.hiddenOption._selectViaInteraction();
			this.itemSelecting.next(false);
		});
		if (needsEmit) {
			this.changedEventEmitter.emit({previousValue, nextValue: selectedItem});
		}
	}
}
