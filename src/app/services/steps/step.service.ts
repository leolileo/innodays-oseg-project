import { Injectable } from '@angular/core';
import { Step } from './step';
import { Http, Response } from '@angular/http';

@Injectable()
export class StepService {
  private stepsUrl = '/api/main';

  constructor (private http: Http) {}

  // get("/api/main")
  getSteps(): Promise<void | Step[]> {
    return this.http.get(this.stepsUrl)
      .toPromise()
      .then(response => response.json() as Step[])
      .catch(this.handleError);
  }

  // post("/api/main")
  createStep(newStep: Step): Promise<void | Step> {
    return this.http.post(this.stepsUrl, newStep)
      .toPromise()
      .then(response => response.json() as Step)
      .catch(this.handleError);
  }

  // get("/api/main/:id") endpoint not used by Angular app

  // delete("/api/main/:id")
  deleteStep(delStepId: String): Promise<void | String> {
    return this.http.delete(this.stepsUrl + '/' + delStepId)
      .toPromise()
      .then(response => response.json() as String)
      .catch(this.handleError);
  }

  // put("/api/main/:id")
  updateStep(putStep: Step): Promise<void | Step> {
    const putUrl = this.stepsUrl + '/' + putStep._id;
    return this.http.put(putUrl, putStep)
      .toPromise()
      .then(response => response.json() as Step)
      .catch(this.handleError);
  }

  private handleError (error: any) {
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
  }
}
