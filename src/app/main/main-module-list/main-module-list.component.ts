import { Component, OnInit } from '@angular/core';
import { Module } from '../../module';
import { ModuleService } from '../../module.service';
import {Plan} from '../../plan';
import {Comment} from '../../comment/comment';

@Component({
  selector: 'app-main-module-list',
  templateUrl: './main-module-list.component.html',
  styleUrls: ['./main-module-list.component.css'],
  providers: [ModuleService]
})

export class ModuleListComponent implements OnInit {

  modules: Module[]
  selectedModule: Module

  constructor(private moduleService: ModuleService) { }

  ngOnInit() {
    this.moduleService
      .getModules()
      .then((modules: Module[]) => {
        this.modules = modules.map((module) => {
          return module;
        });
      });
  }

  private getIndexOfModule = (moduleId: String) => {
    return this.modules.findIndex((module) => {
      return module._id === moduleId;
    });
  }

  selectModule(module: Module) {
    this.selectedModule = module;
  }

  createNewModule() {
    const module: Module = {
      name: '',
      description: '',
      category: 'Component',
      version: 1,
      rating: 3,
      plan: new Plan(),
      comment: new Comment()
    };

    // By default, a newly-created module will have the selected state.
    this.selectModule(module);
  }

  deleteModule = (moduleId: String) => {
    const idx = this.getIndexOfModule(moduleId);
    if (idx !== -1) {
      this.modules.splice(idx, 1);
      this.selectModule(null);
    }
    return this.modules;
  }

  addModule = (module: Module) => {
    this.modules.push(module);
    this.selectModule(module);
    return this.modules;
  }

  updateModule = (module: Module) => {
    const idx = this.getIndexOfModule(module._id);
    if (idx !== -1) {
      this.modules[idx] = module;
      this.selectModule(module);
    }
    return this.modules;
  }
}
