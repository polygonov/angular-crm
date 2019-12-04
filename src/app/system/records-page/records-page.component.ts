import { Component, OnInit } from '@angular/core';
import {Category} from "../../shared/interfaces";
import {CategoriesService} from '../shared/services/categories.service';
import {ChartDataSets, ChartOptions} from 'chart.js';
import {Label, Color} from 'ng2-charts';

@Component({
  selector: 'app-records-page',
  templateUrl: './records-page.component.html',
  styleUrls: ['./records-page.component.scss']
})
export class RecordsPageComponent implements OnInit {

  categories: Category[] = []
  isLoaded = false

  //chart parameters
  public lineChartData: ChartDataSets[]
  public lineChartLabels: Label[]
  public lineChartOptions
  public lineChartColors: Color[]
  public lineChartLegend
  public lineChartType
  public lineChartPlugins

  constructor(
    private categoriesService: CategoriesService
  ) { }

  ngOnInit() {
    this.loadChart()

    this.categoriesService.getCategories()
      .subscribe((categories: Category[]) => {
        this.categories = categories
        this.isLoaded = true
      })
  }

  newCategoryAdded(category: Category) {
    this.categories.push(category)
  }

  categoryWasEdited(category: Category) {
    const idx = this.categories.findIndex(c => c.id === category.id)
    this.categories[idx] = category
  }

  loadChart() {
    // line Chart
    this.lineChartData = [
        { data: [65, 59, 80, 81, 56, 55, 40], label: 'Легенда I' },
      ]
    this.lineChartLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July']
    this.lineChartOptions = {
      responsive: true,
    }
    this.lineChartColors = [
      {
        borderColor: 'black',
        backgroundColor: 'rgba(0,0,0,0.3)',
      },
    ]
    this.lineChartLegend = true
    this.lineChartType = 'line'
    this.lineChartPlugins = []
  }
}
