import {Component, OnInit} from '@angular/core';
import {ModuleService} from '../services/modules/module.service';
import {Module} from '../services/modules/module';
import {ActivatedRoute} from '@angular/router';
import {callNgModuleLifecycle} from '@angular/core/src/view/ng_module';
import {MockLocationStrategy} from '@angular/common/testing';


@Component({
  selector: 'app-modulpage',
  templateUrl: './modulpage.component.html',
  styleUrls: ['./modulpage.component.css'],
  providers: [ModuleService]
})
export class ModulpageComponent implements OnInit {

  modules: Module[];
  selectedModule: Module;
  toolsFromSelected: Array<Module> = [];
  materialsFromSelected: Array<Module> = [];
  componentsFromSelected: Array<Module> = [];
  id: string;


  constructor(private moduleService: ModuleService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      console.log(params['id']);
    });

    this.moduleService
      .getModules()
      .then((modules: Module[]) => {
        this.modules = modules.map((module) => {
          if (this.id === module._id) {
            this.selectedModule = module;
          }
          if (module.category === 'Component') {
            console.log(module);
            this.componentsFromSelected.push(module);
          }
          if (module.category === 'Material') {
            this.materialsFromSelected.push(module);
          }
          if (module.category === 'Tool') {
            this.toolsFromSelected.push(module);
          }
          return module;
        });
      });
  }

  selectModule(module: Module) {
    this.selectedModule = module;
  }


}
