import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AngularMaterialModule} from './angular-material.module';
import {SearchableSelectHighlightDirective} from './directives/searchable-select-highlight.directive';
import {SearchableSelectComponent} from './components/searchable-select/searchable-select.component';
import {SearchableSelectSearchComponent} from './components/searchable-select-search/searchable-select-search.component';
import {SearchableSelectListComponent} from './components/searchable-select-list/searchable-select-list.component';
import {ClearButtonComponent} from './utilities/clear-input-button/clear-button.component';
import {SearchableSelectLabelComponent} from './content-components/searchable-select-label/searchable-select-label.component';
// tslint:disable-next-line:max-line-length
import {SearchableSelectSearchLabelComponent} from './content-components/searchable-select-search-label/searchable-select-search-label.component';
import {SearchableSelectOptionDirective} from './directives/searchable-select-option.directive';

@NgModule({
	declarations: [
		SearchableSelectComponent,
		SearchableSelectSearchComponent,
		SearchableSelectListComponent,
		SearchableSelectLabelComponent,
		SearchableSelectSearchLabelComponent,
		SearchableSelectOptionDirective,
		SearchableSelectHighlightDirective,
		ClearButtonComponent
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
