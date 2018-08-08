import {Plan} from './plan';
import {Comment} from './comment/comment';

export class Module {
  _id?: string;
  name: string;
  description: string;
  category: string;
  version: number;
  rating: number;
  // TODO pictures
  plan: Plan;
  comments: Comment[];
}
