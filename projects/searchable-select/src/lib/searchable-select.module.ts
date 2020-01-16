import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AngularMaterialModule} from './angular-material.module';
import {ClearButtonComponent} from './clear-input-button/clear-button.component';
import {SearchableSelectLabelComponent} from './searchable-select-label/searchable-select-label.component';
import {SearchableSelectListComponent} from './searchable-select-list/searchable-select-list.component';
import {SearchableSelectOptionDirective} from './searchable-select-option.directive';
import {SearchableSelectSearchLabelComponent} from './searchable-select-search-label/searchable-select-search-label.component';
import {SearchableSelectSearchComponent} from './searchable-select-search/searchable-select-search.component';
import {SearchableSelectComponent} from './searchable-select/searchable-select.component';

@NgModule({
	declarations: [
		SearchableSelectComponent,
		SearchableSelectSearchComponent,
		SearchableSelectListComponent,
		ClearButtonComponent,
		SearchableSelectLabelComponent,
		SearchableSelectSearchLabelComponent,
		SearchableSelectOptionDirective
	],
	imports: [
		FormsModule,
		ReactiveFormsModule,
		BrowserAnimationsModule,
		CommonModule,
		AngularMaterialModule
	],
	exports: [
		SearchableSelectComponent,
		SearchableSelectListComponent,
		SearchableSelectLabelComponent,
		SearchableSelectSearchLabelComponent,
		SearchableSelectOptionDirective
	]
})
export class SearchableSelectModule {
}
