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
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewEncapsulation, QueryList, ViewChildren } from '@angular/core';

import { TiNoticeBasicConfig, TiNoticeData, TiNotificationRef } from './TiNotificationInterface'

import { TiNotificationComponent } from './TiNotificationComponent';

@Component({
  selector: 'ti-notification-container',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./notification.less'],
  templateUrl: './TiNotificationContainerComponent.html'
})

export class TiNotificationContainerComponent {
  @ViewChildren(TiNotificationComponent) noticeInstances : QueryList<TiNotificationComponent>;

  topRightNotices: Array<Required<TiNoticeData>> = [];
  topNotices: Array<Required<TiNoticeData>> = [];
  topLeftNotices: Array<Required<TiNoticeData>> = [];
  bottomLeftNotices: Array<Required<TiNoticeData>> = [];
  bottomNotices: Array<Required<TiNoticeData>> = [];
  bottomRightNotices: Array<Required<TiNoticeData>> = [];
  notices: Array<Required<TiNoticeData>> = [];

  static TI_NOTIFICATION_DEFAULT_CONFIG: TiNoticeBasicConfig = {
    animation: true,
    duration: 4500,
    hoverPause: true,
    position: 'top-right',
  };

  constructor(private cdr: ChangeDetectorRef) {}

  create(userConfig: TiNoticeData): TiNotificationRef {
    let targetNotice = this.fixConfig(userConfig);
    const existedNotice = this.notices.find(notice => notice.config.name === targetNotice.config.name);
    if (targetNotice.config.name && existedNotice) {
      targetNotice = this.updateNotice(targetNotice, existedNotice);
      this.markChildChanged(targetNotice.config.name)
    } else {
      this.bindApis(targetNotice);
      this.notices = [...this.notices, targetNotice];
    }
    this.reloadNotices();
    const { close } = targetNotice;
    return { close } as TiNotificationRef;
  }

  updateNotice(targetNotice: TiNoticeData, existedNotice: Required<TiNoticeData>): Required<TiNoticeData> {
    existedNotice.content = targetNotice.content;
    existedNotice.template = targetNotice.template;
    existedNotice.type = targetNotice.type;
    existedNotice.config = targetNotice.config;
    return existedNotice
  }

  private markChildChanged(name: string): void {
    const existedNotice = this.noticeInstances.find(notice => notice.instance.config.name === name);
    existedNotice && existedNotice.cdr.detectChanges();
  }

  private bindApis(targetNotice: Required<TiNoticeData>): void {
    targetNotice.close = () => this.close(targetNotice.noticeId);
  }

  private reloadNotices(): void {
    this.topRightNotices = [];
    this.topNotices = [];
    this.topLeftNotices = [];
    this.bottomLeftNotices = [];
    this.bottomNotices = [];
    this.bottomRightNotices = [];
    this.notices.forEach(notice => {
      const { position } = notice.config;
      switch (position) {
        case 'top-right':
          this.topRightNotices.push(notice);
          break;
        case 'top':
          this.topNotices.push(notice);
          break;
        case 'top-left':
          this.topLeftNotices.push(notice);
          break;
        case 'bottom-left':
          this.bottomLeftNotices.push(notice);
          break;
        case 'bottom':
          this.bottomNotices.push(notice);
          break;
        case 'bottom-right':
          this.bottomRightNotices.push(notice);
          break;
        default:
          this.topRightNotices.push(notice);
      }
    });
    this.cdr.detectChanges();
  }

  private fixConfig(noticeData: TiNoticeData): Required<TiNoticeData> {
    const { animation, duration, hoverPause, position } = TiNotificationContainerComponent.TI_NOTIFICATION_DEFAULT_CONFIG;
    noticeData.config = { animation, duration, hoverPause, position, ...noticeData.config };
    return noticeData as Required<TiNoticeData>;
  }

  close(id: string): void {
    for (let i = 0; i < this.notices.length; i++) {
      let target = this.notices[i]
      if (target.noticeId === id) {
        this.notices.splice(i, 1);
        this.closeHandle(target);
        this.reloadNotices();
        break;
      }
    }
  }

  closeAll(): void {
    this.notices.forEach(notice => this.closeHandle(notice));
    this.notices = [];
    this.reloadNotices();
  }

  private closeHandle(notice: Required<TiNoticeData>): void {
    notice.config!.onClose && notice.config.onClose()
  }
}