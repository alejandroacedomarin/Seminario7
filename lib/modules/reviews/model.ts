import * as mongoose from 'mongoose';

export interface IReview {
    _id?: String;
    titulo: String;
    contenido: String;
    numEstrellas: Number;
    autorRef: mongoose.Types.ObjectId; //id del autor
}