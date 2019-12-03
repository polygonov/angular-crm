import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Category, Message} from '../../../shared/interfaces';
import {CategoriesService} from '../../shared/services/categories.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {

  @Input() categories: Category[] = []
  @Output() onCategoryEdit = new EventEmitter<Category>()

  currentCategoryId = 1
  currentCategory: Category
  message: Message

  constructor(
    private categoriesService: CategoriesService
  ) { }

  ngOnInit() {
    this.message = {type: 'success', text: ''}
    this.onCategoryChange()
  }

  onSubmit(form: NgForm) {
    let {capacity, name} = form.value
    if(capacity < 0) {
      capacity *= -1
    }

    const category: Category = {name: name, capacity: capacity, id: +this.currentCategoryId}

    this.categoriesService.updateCategory(category)
      .subscribe((category: Category) => {
        this.onCategoryEdit.emit(category)
        this.message.text = 'Категория успешно отредактирована.'
        window.setTimeout(() => {
          this.message.text = ''
        }, 5000)
        //console.log(category)
      })
  }

  onCategoryChange() {
    this.currentCategory = this.categories.find(c => c.id === +this.currentCategoryId)
  }
}
