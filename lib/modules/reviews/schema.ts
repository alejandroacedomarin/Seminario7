import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const schema = new Schema({
    titulo: String,
    contenido: String,
    numEstrellas: Number,
    autorRef: [{type: Schema.Types.ObjectId, ref: 'users'}] //id del autor

});

export default mongoose.model('review', schema);
