import {Plan} from '../plans/plan';
import {Comment} from '../../comment/comment';

export class Module {
  _id?: string;
  name: string;
  description: string;
  author: string;
  category: string;
  version: number;
  rating: number;
  plan: Plan;
  dependsOn: number[];
  comments: Comment[];
  image: string;
}
