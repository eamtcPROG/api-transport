import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

import { AnyObject, Document, Schema as MongooseSchema } from 'mongoose';
import Ischema from "src/app/interfaces/ischema.interface";

export type FAQValueDocument = HydratedDocument<FAQValue>;

@Schema()
export class FAQValue extends Document implements Ischema{
    @Prop()
    id: string;
  
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Language' })
    idlanguage: string;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'FAQ' })
    idfaq: string;

    @Prop()
    question: string;

    @Prop()
    answer: string;

}

export const FAQValueSchema = SchemaFactory.createForClass(FAQValue);
