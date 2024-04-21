import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../category.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category-update',
  templateUrl: './category-update.component.html',
  styleUrls: ['./category-update.component.css']
})

export class CategoryUpdateComponent implements OnInit {

  category={
  	id: '',
  	name: '',
  	description: ''
  }

  //variable for the selected category ID
  curId;

  constructor(private categoryService: CategoryService, private router: Router, private route: ActivatedRoute) {
  	const selectedId = +this.route.snapshot.paramMap.get('id')
  	this.curId = {
  		id: selectedId
  	}

  	//get category from DB
  	this.categoryService.getCategory(this.curId, result => {
  		this.category.id = result.id,
  		this.category.name = result.name,
  		this.category.description = result.description
  		console.log("selectedCategory", result)
  	});
  }

  updateCategory(category){
		console.log("THIS CATEGORY",this.category)
  	if(this.category.name != '' && this.category.description != ''){
  		this.categoryService.updateCategory(this.category, result => {
				this.router.navigate(['/categories'])
  		})
  	}else{
  		alert("Missing input value, please input value first!");
      console.log("Error! missing value")
  	}
  }

  ngOnInit() {
  }

}
