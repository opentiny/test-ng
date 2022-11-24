import { Component, OnInit } from '@angular/core';
import { TiTableColumns, TiTableRowData, TiTableSrcData } from '@opentiny/ng';

@Component({
  styleUrls: ['./tableTest.less'],
  templateUrl: './table-cols-toggle-test.html',
})
export class TableColsToggleTestComponent implements OnInit {
  disabled: boolean = false;
  selectAll: boolean = true;
  panelWidth: string = '250px';
  searchable: boolean = true; // 可切换测试
  tipContent: string = '控制列隐藏/显示'; // 默认提示文本为'自定义列表项'
  tipPosition: string = 'left'; // 默认提示文本方向为'top'
  noDataText: string = '无数据';
  displayed: Array<TiTableRowData> = []; // 表示表格实际呈现的数据（开发者默认设置为[]即可）
  srcData: TiTableSrcData;
  private data: Array<TiTableRowData> = [];
  columns: Array<TiTableColumns> = [
    {
      title: 'first name 我需要出省略号和tip提示aaaa ',
      show: false,
    },
    {
      title: 'last name',
      show: true,
    },
    {
      title: 'birth date',
      show: true,
    },
    {
      title: 'balance',
      show: undefined, // undefined表示该列不参与动态显示/隐藏
    },
    {
      title: 'email',
      show: true,
    },
  ];

  ngOnInit(): void {
    for (let j: number = 0; j < 10; j++) {
      // 生成10条数据
      this.data.push(this.createRandomItem(j));
    }
    this.srcData = {
      // 表格源数据，开发者对表格的数据设置请在这里进行
      data: this.data, // 源数据
      // 用来标识传进来的源数据是否已经进行过排序、搜索、分页操作，
      // 已经做过的，tiny就不再做了
      // 如果没做，tiny会对传入的源数据做进一步处理（前提是开发者设置了相关特性，比如分页），然后作为displayedData显示出来
      // 本示例中，开发者没有设置分页、搜索和排序这些特性，因此tiny不会对数据进行进一步的处理
      state: {
        searched: false, // 源数据未进行搜索处理
        sorted: false, // 源数据未进行排序处理
        paginated: false, // 源数据未进行分页处理
      },
    };
  }
  //
  onClick(): void {
    this.disabled = !this.disabled;
    this.tipContent = this.disabled ? '禁用状态说明' : '控制列隐藏/显示';
  }
  onClick2(): void {
    this.selectAll = !this.selectAll;
  }
  onClick3(): void {
    this.searchable = !this.searchable;
  }

  onBlur(): void {
    console.log('blur', this.columns);
  }

  onSelect(item: TiTableColumns): void {
    console.log('select', item);
    const selectedColumns: Array<TiTableColumns> = this.columns.filter(
      (column: { show?: boolean }) => {
        return column.show === true || column.show === undefined;
      }
    );
    console.log('显示的列', selectedColumns);
  }

  private createRandomItem(id: number): TiTableRowData {
    const nameList: Array<string> = [
      'Pierre',
      'Pol',
      'Jacques',
      'Robert',
      'Elisa',
    ];
    const familyName: Array<string> = [
      'Dupont',
      'Germain',
      'Delcourt',
      'bjip',
      'Menez',
    ];
    const firstName: string = nameList[((id + 3) * 19) % 4];
    const lastName: string = familyName[((id + 3) * 29) % 4];
    const age: number = ((id + 3) * 13) % 100;
    const email: string = `${firstName}${lastName}@whatever.com`;
    const balance: number = ((id + 3) * 761) % 10000;

    return {
      firstName,
      lastName,
      age,
      email,
      balance,
      id,
    };
  }
}
