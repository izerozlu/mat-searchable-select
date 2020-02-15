import {Component, Input} from '@angular/core';
import {AbstractControl, FormControl} from '@angular/forms';

@Component({
	selector: 'clear-button',
	templateUrl: './clear-button.component.html',
	styleUrls: ['./clear-button.component.scss']
})
export class ClearButtonComponent {

	@Input('control') private control: FormControl | AbstractControl;

	public clearControl() {
		this.control.setValue('');
		this.control.markAsPristine();
	}
}
