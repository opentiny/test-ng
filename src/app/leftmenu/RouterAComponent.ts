import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
    template:  `
      <h1>��ӭ����������ѯҳ��</h1>
    `
})
export class RouterAComponent implements OnInit {
   constructor(private activeRoute: ActivatedRoute) {}

  ngOnInit(): void {
    console.log('RouterAComponent Init', this.activeRoute.routeConfig.path);
  }
}
