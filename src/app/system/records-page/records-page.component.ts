import { Component, OnInit } from '@angular/core';
import {Category} from "../../shared/interfaces";

@Component({
  selector: 'app-records-page',
  templateUrl: './records-page.component.html',
  styleUrls: ['./records-page.component.scss']
})
export class RecordsPageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  newCategoryAdded($event: Category) {
    //add to array
  }
}
