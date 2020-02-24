import { Document } from 'mongoose';

export interface CatI extends Document {
    name: string;
    age: number;
    color: number;
}
