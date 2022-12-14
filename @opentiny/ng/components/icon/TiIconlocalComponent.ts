import {
  ChangeDetectionStrategy,
  Component,
  Input,
  SimpleChange,
  SimpleChanges,
  ViewEncapsulation,
  ElementRef,
  Renderer2,
} from '@angular/core';
import { TiBaseComponent } from '../base/TiBaseModule';

/**
 * @ignore Icon组件，本地Icon
 *
 *  Icon组件可以设置显示Icon。
 *
 * <example-url>../tinyplus3demo/#/icon/icon-all</example-url>
 */
@Component({
  selector: 'ti-icon[local]',
  template: '<ng-content></ng-content>',
  styleUrls: ['./iconlocal.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None, // 样式是加在标签上的，不是内部，所以非胶囊
  host: {
    '[class.ti3-icon]': "true"
},
})
export class TiIconlocalComponent extends TiBaseComponent {
  /**
   * icon名称
   */
  @Input() name: string;

  constructor(protected hostRef: ElementRef, protected renderer: Renderer2) {
    super(hostRef, renderer);
  }

  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);
    const nameChange: SimpleChange = changes['name'];
    if (nameChange) {
      this.renderer.removeClass(
        this.nativeElement,
        `ti3-icon-${nameChange.previousValue}`
      );
      this.renderer.addClass(
        this.nativeElement,
        `ti3-icon-${nameChange.currentValue}`
      );
    }
  }
}
/* ti-icon组件，为了防止多个组件重复使用字体图标文件，导致最终用户打包文件成倍增大。
因此封装该组件，确保最终打包只引用一份字体图标样式及文件 */
