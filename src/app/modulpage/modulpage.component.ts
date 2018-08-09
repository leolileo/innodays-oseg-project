import {Component, OnInit} from '@angular/core';
import {ModuleService} from '../services/modules/module.service';
import {Module} from '../services/modules/module';
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
  toolsFromSelected: Array<Module> = [];
  materialsFromSelected: Array<Module> = [];
  componentsFromSelected: Array<Module> = [];
  id: string;


  constructor(private moduleService: ModuleService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    const getStuff =
      new Promise((resolve, reject) => {
        this.selectedModule.dependsOn.forEach(function (number) {
          this.modulService
            .getModuleById(number)
            .then((mold: Module) => {
              console.log('HALLLO' + mold.category);
              if (mold.category === 'Component') {
                this.componentsFromSelected.push(mold);
              }
              if (mold.category === 'Material') {
                this.materialsFromSelected.push(mold);
              }
              if (mold.category === 'Tool') {
                this.toolsFromSelected.push(mold);
              }
            });
        });
      });

    return new Promise((resolve, reject) => {
      this.moduleService
        .getModules()
        .then((modules: Module[]) => {
          this.modules = modules.map((module) => {
            if (this.id === module._id) {
              this.selectedModule = module;
              resolve(this.selectedModule);
            }
            return module;
          });
        });
    })
      .then(
        (data) => {
          return getStuff;
        },
        (err) => {
          console.log('FAIL');
          console.log(err);
        }
      );
  }

  selectModule(module: Module) {
    this.selectedModule = module;
  }


}
