import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Category} from '../../../shared/interfaces';

@Component({
  selector: 'app-history-filter',
  templateUrl: './history-filter.component.html',
  styleUrls: ['./history-filter.component.scss']
})
export class HistoryFilterComponent implements OnInit {

  @Output() onFilterCancel = new EventEmitter<any>()
  @Output() onFilterApply = new EventEmitter<any>()

  @Input() categories: Category[] = []

  selectedPeriod = 'd'
  selectedTypes = []
  selectedCategories = []

  constructor() { }

  timePeriods = [
    {type: 'd', label: 'День'},
    {type: 'w', label: 'Неделя'},
    {type: 'M', label: 'Месяц'}
  ]

  types = [
    {type: 'income', label: 'Доход'},
    {type: 'outcome', label: 'Расход'}
  ]

  ngOnInit() {
  }

  closeFilter() {
    this.selectedTypes = []
    this.selectedCategories = []
    this.selectedPeriod = 'd'
    this.onFilterCancel.emit()
  }

  private calculateInputParams(field: string, checked: boolean, value: string) {
    if (checked) {
      this[field].indexOf(value) === -1 ? this[field].push(value) : null
    } else {
      this[field] = this[field].filter(i => i !== value)
    }
  }

  handleChangeType(e) {
    console.log("e", e)
    this.calculateInputParams('selectedTypes', e.target.checked, e.target.value)
  }

  handleChangeCategory(e) {
    this.calculateInputParams('selectedCategories', e.target.checked, e.target.value)
  }

  applyFilter() {
    this.onFilterApply.emit({
      types: this.selectedTypes,
      categories: this.selectedCategories,
      period: this.selectedPeriod
    })
  }
}
