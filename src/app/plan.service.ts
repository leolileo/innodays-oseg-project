import { Injectable } from '@angular/core';
import { Plan } from './plan';
import { Http, Response } from '@angular/http';

@Injectable()
export class PlanService {
  private plansUrl = '/api/main';

  constructor (private http: Http) {}

  // get("/api/main")
  getPlans(): Promise<void | Plan[]> {
    return this.http.get(this.plansUrl)
      .toPromise()
      .then(response => response.json() as Plan[])
      .catch(this.handleError);
  }

  // post("/api/main")
  createPlan(newPlan: Plan): Promise<void | Plan> {
    return this.http.post(this.plansUrl, newPlan)
      .toPromise()
      .then(response => response.json() as Plan)
      .catch(this.handleError);
  }

  // get("/api/main/:id") endpoint not used by Angular app

  // delete("/api/main/:id")
  deletePlan(delPlanId: String): Promise<void | String> {
    return this.http.delete(this.plansUrl + '/' + delPlanId)
      .toPromise()
      .then(response => response.json() as String)
      .catch(this.handleError);
  }

  // put("/api/main/:id")
  updatePlan(putPlan: Plan): Promise<void | Plan> {
    const putUrl = this.plansUrl + '/' + putPlan._id;
    return this.http.put(putUrl, putPlan)
      .toPromise()
      .then(response => response.json() as Plan)
      .catch(this.handleError);
  }

  private handleError (error: any) {
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
  }
}
