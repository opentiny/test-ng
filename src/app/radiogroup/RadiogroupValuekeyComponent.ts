import { Component } from '@angular/core';
import { TiRadioItem } from '@opentiny/ng';

@Component({
	templateUrl: './radiogroup-valuekey.html'
})

export class RadiogroupValuekeyComponent {
	radioList: Array<TiRadioItem> = [
		{
			id: '1',
			label: '中国',
			value: 'China',
		},
		{
			id: '2',
			label: '美国',
			value: 'America',
		},
		{
			id: '3',
			label: '英国',
			value: 'Britain'
		}
	];
	selected: string = 'China';
}
