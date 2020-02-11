import {
	AfterViewInit,
	Component,
	ContentChild,
	EventEmitter,
	forwardRef,
	Input,
	OnChanges,
	OnInit,
	Output,
	SimpleChanges,
	TemplateRef,
	ViewChild
} from '@angular/core';
import {FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';
import {MatOption} from '@angular/material/core';
import {filter, first} from 'rxjs/operators';
import {MatSearchableSelectListComponent} from '../mat-searchable-select-list/mat-searchable-select-list.component';
import {MatSearchableSelectOptionDirective} from '../../directives/mat-searchable-select-option.directive';
import {BehaviorSubject} from 'rxjs';

@Component({
	selector: 'mat-searchable-select',
	templateUrl: './mat-searchable-select.component.html',
	styleUrls: ['./mat-searchable-select.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			multi: true,
			useExisting: forwardRef(() => MatSearchableSelectComponent)
		}
	]
})
export class MatSearchableSelectComponent implements OnInit, AfterViewInit, OnChanges {
	@ViewChild('hiddenOption')
	private hiddenOption: MatOption;
	@ContentChild(MatSearchableSelectListComponent)
	private matSearchableSelectList: MatSearchableSelectListComponent;
	@ContentChild(MatSearchableSelectOptionDirective)
	private matSearchableSelectOptionDirective: MatSearchableSelectOptionDirective;

	@Input('mat-searchable-select-highlight')
	set highlightSetter(value: boolean) {
		setTimeout(() => this.matSearchableSelectList.isHighlightEnabled = value !== false);
	}

	@Input('formControl') public formControl = new FormControl();
	@Input('value') public value: any;
	@Input('is-loading') public isLoading: boolean;

	@Output('changed') public changedEventEmitter = new EventEmitter<{ previousValue: any, nextValue: any }>();
	@Output('search-changed') public searchChangedEventEmitter = new EventEmitter<string>();

	get isSearchChangedRegistered(): boolean {
		return this.searchChangedEventEmitter.observers.length > 0;
	}

	public selectedItem: any;
	public optionTemplateRef: TemplateRef<any>;
	public searchFormControl = new FormControl(undefined);

	private itemSelecting = new BehaviorSubject(false);

	constructor() {
	}

	public ngOnInit() {
		this.listenSearchControl();
	}


	public ngAfterViewInit() {
		setTimeout(() => {
			if (this.matSearchableSelectList) {
				this.matSearchableSelectList.itemSelected.subscribe((selectedItem: any) => this.handleItemSelection(selectedItem));
				this.optionTemplateRef = this.matSearchableSelectOptionDirective.templateRef;
			}
			this.setSelectValue();
		});
	}

	// Needed for FormControl usage.
	public writeValue() {
	}

	// Needed for FormControl usage.
	public registerOnChange() {
	}

	// Needed for FormControl usage.
	public registerOnTouched() {
	}

	public ngOnChanges({value}: SimpleChanges): void {
		if (value && value.currentValue && value.currentValue !== this.formControl.value) {
			this.changedEventEmitter.emit({previousValue: this.formControl.value, nextValue: value.currentValue});
			if (this.itemSelecting.value === true) {
				this.itemSelecting.pipe(filter((itemSelectionStatus => itemSelectionStatus === false)), first()).subscribe(() => {
					this.formControl.setValue(value.currentValue);
					setTimeout(() => this.selectValue(value.currentValue));
				});
			} else {
				this.formControl.setValue(value.currentValue);
				setTimeout(() => this.selectValue(value.currentValue));
			}
		}
	}

	public handleMatSelectOpened() {
		const matSelectPanelElement = document.querySelector('.mat-select-panel') as HTMLElement;
		matSelectPanelElement.style.overflow = 'hidden';
		matSelectPanelElement.style.maxHeight = 'min-content';
	}

	public handleItemSelection(selectedItem: any, needsEmit: boolean = true) {
		const previousValue = this.formControl.value;
		this.itemSelecting.next(true);
		this.formControl.setValue(selectedItem);
		this.selectedItem = selectedItem;
		setTimeout(() => {
			this.selectValue(selectedItem);
			this.itemSelecting.next(false);
		});
		if (needsEmit) {
			this.changedEventEmitter.emit({previousValue, nextValue: selectedItem});
		}
	}

	private selectValue(value: any) {
		this.selectedItem = value;
		this.hiddenOption.value = value;
		this.hiddenOption._selectViaInteraction();
	}

	private listenSearchControl() {
		this.searchFormControl.valueChanges.subscribe((queryString: string) => {
			this.handleSearchChange();
			this.matSearchableSelectList.searchQuery = queryString;
		});
	}

	private handleSearchChange() {
		const queryString: string = this.searchFormControl.value;

		if (this.isSearchChangedRegistered) {
			this.searchChangedEventEmitter.emit(queryString);
		} else {
			this.matSearchableSelectList.filteredOptions = this.matSearchableSelectList.options.filter(
				(option: string) => option.toLowerCase().includes(queryString.toLowerCase()));
		}
	}

	private setSelectValue() {
		if (this.formControl && this.formControl.value) {
			const controlValue = this.formControl.value;
			this.selectedItem = controlValue;
			this.selectValue(controlValue);
		}
	}
}
