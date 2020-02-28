import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { CatI } from './interfaces/cat.interface';
import { from, Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

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

    update(data): Observable<CatI[]> {
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
    delete(ids): Observable<object[]> {
        return from(
            this.catModel
                .find({ _id: { $in: ids } }, '_id')
                .lean()
                .exec(),
        ).pipe(
            mergeMap(foundCats =>
                from(this.catModel.deleteMany({ _id: { $in: foundCats } })).pipe(map(() => foundCats)),
            ),
        );
    }
    findOne(options): Observable<object> {
        return of(
            this.catModel
                .findOne(options)
                .lean()
                .exec(),
        );
    }
}
