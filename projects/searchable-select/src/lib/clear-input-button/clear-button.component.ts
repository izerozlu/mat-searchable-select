import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl, FormControl} from '@angular/forms';

@Component({
	selector: 'clear-button',
	templateUrl: './clear-button.component.html',
	styleUrls: ['./clear-button.component.scss']
})
export class ClearButtonComponent implements OnInit {

	/**
	 * Temizlenecek olan {@link FormControl}.
	 */
	@Input('control') private control: FormControl | AbstractControl;

	constructor() {
	}

	public ngOnInit() {
	}

	/**
	 * Bileşene geçirilmiş {@link control}'ü temizler.
	 */
	public clearControl() {
		this.control.setValue('');
		this.control.markAsPristine();
	}
}
