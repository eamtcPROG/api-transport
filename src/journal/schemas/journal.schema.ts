import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

import { AnyObject, Document, Schema as MongooseSchema } from 'mongoose';
import Ischema from "src/app/interfaces/ischema.interface";

export type JournalDocument = HydratedDocument<Journal>;

@Schema()
export class Journal extends Document implements Ischema {
    @Prop()
    id: string;

    @Prop()
    date: number;

    @Prop()
    type: number;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
    iduser: string;

    @Prop()
    info: string;

}

export const JournalSchema = SchemaFactory.createForClass(Journal);
