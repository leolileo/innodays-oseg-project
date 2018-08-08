import {Injectable} from '@angular/core';
import {Module} from './module';
import {Http, Response} from '@angular/http';

@Injectable()
export class ModuleService {
  private modulesUrl = '/api/modules';
  private moduleUrl = '/api/module';

  constructor(private http: Http) {
  }

  // get("/api/main")
  getModules(): Promise<void | Module[]> {
    return this.http.get(this.modulesUrl)
      .toPromise()
      .then(response => response.json() as Module[])
      .catch(this.handleError);
  }

  // post("/api/main")
  createModule(newModule: Module): Promise<void | Module> {
    return this.http.post(this.moduleUrl, newModule)
      .toPromise()
      .then(response => response.json() as Module)
      .catch(this.handleError);
  }

  // get("/api/main/:id") endpoint not used by Angular app

  // delete("/api/main/:id")
  deleteModule(delModuleId: String): Promise<void | String> {
    return this.http.delete(this.moduleUrl + '/' + delModuleId)
      .toPromise()
      .then(response => response.json() as String)
      .catch(this.handleError);
  }

  // put("/api/main/:id")
  updateModule(putModule: Module): Promise<void | Module> {
    const putUrl = this.moduleUrl + '/' + putModule._id;
    return this.http.put(putUrl, putModule)
      .toPromise()
      .then(response => response.json() as Module)
      .catch(this.handleError);
  }

  private handleError(error: any) {
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
  }
}
