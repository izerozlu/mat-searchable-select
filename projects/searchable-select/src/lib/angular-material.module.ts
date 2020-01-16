import {NgModule} from '@angular/core';
import {
	MatButtonModule,
	MatButtonToggleModule,
	MatCardModule,
	MatCheckboxModule,
	MatDatepickerModule,
	MatDialogModule,
	MatDividerModule,
	MatFormFieldModule,
	MatGridListModule,
	MatIconModule,
	MatInputModule,
	MatListModule,
	MatMenuModule,
	MatNativeDateModule,
	MatPaginatorModule,
	MatSelectModule,
	MatSliderModule,
	MatSlideToggleModule,
	MatSnackBarModule,
	MatSortModule,
	MatStepperModule,
	MatTableModule,
	MatTabsModule,
	MatToolbarModule,
	MatTooltipModule
} from '@angular/material';
import {ScrollingModule} from '@angular/cdk/scrolling';

@NgModule({
	exports: [
		MatButtonToggleModule,
		MatSliderModule,
		MatToolbarModule,
		MatIconModule,
		MatButtonModule,
		MatMenuModule,
		MatFormFieldModule,
		MatInputModule,
		MatSelectModule,
		MatTableModule,
		MatTooltipModule,
		MatSortModule,
		MatPaginatorModule,
		MatSnackBarModule,
		MatDialogModule,
		MatDividerModule,
		MatGridListModule,
		ScrollingModule,
		MatTabsModule,
		MatCheckboxModule,
		MatNativeDateModule,
		MatDatepickerModule,
		MatListModule,
		MatCardModule,
		MatSlideToggleModule,
		MatStepperModule
	]
})
export class AngularMaterialModule {
}
