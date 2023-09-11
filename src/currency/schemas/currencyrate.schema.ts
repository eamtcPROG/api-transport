import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

import { AnyObject, Document, Schema as MongooseSchema } from 'mongoose';
import Ischema from "src/app/interfaces/ischema.interface";

export type CurrencyRateDocument = HydratedDocument<CurrencyRate>;

@Schema()
export class CurrencyRate extends Document implements Ischema {
    @Prop()
    id: string;

    @Prop()
    date: Date;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Currency' })
    fromidcurrency: string;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Currency' })
    toidcurrency: string;
    
    @Prop()
    rate: number;
}

export const CurrencyRateSchema = SchemaFactory.createForClass(CurrencyRate);
