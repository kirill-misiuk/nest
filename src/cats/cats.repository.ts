import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { CatI } from './interfaces/cat.interface';
import { from, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Injectable()
export class CatsRepository {
    constructor(
        @Inject('CAT_MODEL')
        private readonly catModel: Model<CatI>,
    ) {}
    findAll(): Observable<CatI[]> {
        return from(
            this.catModel
                .find()
                .lean()
                .exec(),
        );
    }
    create(cat): Observable<object> {
        return from(this.catModel.create(cat));
    }
    update(data): Observable<any[]> {
        return from(
            this.catModel
                .findOne({ _id: data._id })
                .lean()
                .exec(),
        ).pipe(
            mergeMap(foundCat => {
                if (foundCat) {
                    return from(this.catModel.findByIdAndUpdate(data._id, { ...data }, { new: true }));
                }
                return of(foundCat);
            }),
        );
    }
}
