import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NgForm} from "@angular/forms";
import {CategoriesService} from "../../shared/services/categories.service";
import {Category} from "../../../shared/interfaces";

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {

  @Output() onCategoryAdd = new EventEmitter<Category>()

  constructor(
    private categoriesService: CategoriesService
  ) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    let { name, capacity } = form.value
    if(capacity < 0) {
      capacity *= -1
    }

    const category = {name: name, capacity: capacity}

    this.categoriesService.addCategory(category)
      .subscribe((category: Category) => {
        form.reset()
        form.form.patchValue({capacity: 1})
        //console.log('category', category)
        this.onCategoryAdd.emit(category)
      })
  }
}
