import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { CatI } from './interfaces/cat.interface';
import { from, Observable } from 'rxjs';

@Injectable()
export class CatsRepository {
  constructor(
    @Inject('CAT_MODEL')
    private readonly  catModel: Model<CatI>
  ) {}
   findAll():Observable<CatI[]>{
    return from(this.catModel.find().lean().exec())
   }
   create(cat):Observable<object>{
    return from(this.catModel.create(cat))
   }
}
