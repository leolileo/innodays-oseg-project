import {Component, OnInit} from '@angular/core';
import {ModuleService} from '../services/modules/module.service';
import {Module} from '../services/modules/module';
import {Observable, ObservableInput} from 'rxjs';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-modulpage',
  templateUrl: './modulpage.component.html',
  styleUrls: ['./modulpage.component.css'],
  providers: [ModuleService]
})
export class ModulpageComponent implements OnInit {

  modules: Module[];
  selectedModule: Module;
  toolsFromSelected: Module [];
  materialsFromSelected: Module[];
  componentsFromSelected: Module[];
  id: string;


  constructor(private moduleService: ModuleService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      console.log(params['id']);
    });
    this.moduleService.getModules().then((modules: Module[]) => {
      Observable.create(this.modules = modules.map((module) => {
          if (this.id === module._id) {
            this.selectedModule = module;
          }
          return module;
        })
      ).subscribe(this.getCategorieFromModules());
    });
  }

  selectModule(module: Module) {
    this.selectedModule = module;
  }

  getModuleByID(id: string) {
    this.modules.forEach(function (module) {
      if (module._id === id) {
        return module;
      }
    });
  }

  getCategorieFromModules() {
    this.selectedModule.dependsOn.forEach(function (moduleId) {
      let module = this.getModuleByID(moduleId);
      if (module.category === 'component') {
        this.componentsFromSelected.push(module);
      }
      if (this.getModuleByID(moduleId).category === 'material') {
        this.materialsFromSelected.push(module);
      }
      if (this.getModuleByID(moduleId).category === 'tool') {
        this.toolsFromSelected.push(module);
      } else {
      }
    });
  }


}
