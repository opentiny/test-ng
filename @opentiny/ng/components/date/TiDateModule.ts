/**
 * Copyright (c) 2022 - present TinyUI Authors.
 * Copyright (c) 2022 - present Huawei Cloud Computing Technologies Co., Ltd.
 *
 * Use of this source code is governed by an MIT-style license.
 *
 * THE OPEN SOURCE SOFTWARE IN THIS PRODUCT IS DISTRIBUTED IN THE HOPE THAT IT WILL BE USEFUL,
 * BUT WITHOUT ANY WARRANTY, WITHOUT EVEN THE IMPLIED WARRANTY OF MERCHANTABILITY OR FITNESS FOR
 * A PARTICULAR PURPOSE. SEE THE APPLICABLE LICENSES FOR MORE DETAILS.
 *
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TiDropModule } from '../drop/TiDropModule';
import { TiDatePanelModule } from '../datepanel/TiDatePanelModule';
import { TiButtonModule } from '../button/TiButtonModule';
import { TiDateDominatorModule } from '../datedominator/TiDateDominatorModule';
import { TiDateComponent } from './TiDateComponent';
import { TiLocaleModule } from '../../locale/TiLocaleModule';
import { TiDateEditModule } from '../dateedit/TiDateEditModule';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TiDropModule,
    TiButtonModule,
    TiDateEditModule,
    TiDatePanelModule,
    TiDateDominatorModule,
    TiLocaleModule
  ],
  exports: [TiDateComponent],
  declarations: [TiDateComponent]
})
export class TiDateModule {

}
export { TiDateComponent } from './TiDateComponent';
