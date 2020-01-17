import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AngularMaterialModule} from './angular-material.module';
import {MatSearchableSelectHighlightDirective} from './directives/mat-searchable-select-highlight.directive';
import {ClearButtonComponent} from './utilities/clear-input-button/clear-button.component';
import {MatSearchableSelectOptionDirective} from './directives/mat-searchable-select-option.directive';
import {MatSearchableSelectComponent} from './components/mat-searchable-select/mat-searchable-select.component';
import {MatSearchableSelectSearchComponent} from './components/mat-searchable-select-search/mat-searchable-select-search.component';
import {MatSearchableSelectListComponent} from './components/mat-searchable-select-list/mat-searchable-select-list.component';
import {MatSearchableSelectLabelComponent} from './content-components/mat-searchable-select-label/mat-searchable-select-label.component';
// tslint:disable-next-line:max-line-length
import {MatSearchableSelectSearchLabelComponent} from './content-components/mat-searchable-select-search-label/mat-searchable-select-search-label.component';

@NgModule({
	declarations: [
		MatSearchableSelectComponent,
		MatSearchableSelectSearchComponent,
		MatSearchableSelectListComponent,
		MatSearchableSelectLabelComponent,
		MatSearchableSelectSearchLabelComponent,
		MatSearchableSelectOptionDirective,
		MatSearchableSelectHighlightDirective,
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
		MatSearchableSelectComponent,
		MatSearchableSelectListComponent,
		MatSearchableSelectLabelComponent,
		MatSearchableSelectSearchLabelComponent,
		MatSearchableSelectOptionDirective
	]
})
export class MatSearchableSelectModule {
}
