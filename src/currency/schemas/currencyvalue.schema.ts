import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

import { AnyObject, Document, Schema as MongooseSchema } from 'mongoose';
import Ischema from "src/app/interfaces/ischema.interface";

export type CurrencyValueDocument = HydratedDocument<CurrencyValue>;

@Schema()
export class CurrencyValue extends Document implements Ischema{
    @Prop()
    id: string;
  
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Language' })
    idlanguage: string;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Currency' })
    idcurrency: string;

    @Prop()
    name: string;

}

export const CurrencyValueSchema = SchemaFactory.createForClass(CurrencyValue);
