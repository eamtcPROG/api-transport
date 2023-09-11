import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

import { AnyObject, Document, Schema as MongooseSchema } from 'mongoose';
import Ischema from "src/app/interfaces/ischema.interface";

export type CurrencyDocument = HydratedDocument<Currency>;

@Schema()
export class Currency extends Document implements Ischema {
    @Prop()
    id: string;

    @Prop()
    status: number;

    @Prop()
    ordercriteria: number;

    @Prop()
    numcode: string;

    @Prop()
    identifier: string;

}

export const CurrencySchema = SchemaFactory.createForClass(Currency);
