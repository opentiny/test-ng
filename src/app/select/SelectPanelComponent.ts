import { Component } from '@angular/core';

@Component({
  templateUrl: './select-panel.html',
})
export class SelectPanelComponent {
  options: Array<any> = [
    { label: '水调歌头' },
    { label: '苏轼' },
    { label: '明月几时有？把酒问青天' },
    { label: '不知天上宫阙，今夕是何年。' },
    { label: '我欲乘风归去，又恐琼楼玉宇，高处不胜寒。' },
    { label: '起舞弄清影，何似在人间？' },
    { label: '转朱阁，低绮户，照无眠。' },
    { label: '不应有恨，何事长向别时圆？' },
    { label: '人有悲欢离合，月有阴晴圆缺，此事古难全。' },
    { label: '但愿人长久，千里共婵娟。' },
  ];

  value: any;
}
