import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

import { AnyObject, Document, Schema as MongooseSchema } from 'mongoose';
import Ischema from "src/app/interfaces/ischema.interface";

export type UrlRelationDocument = HydratedDocument<UrlRelation>;

@Schema()
export class UrlRelation extends Document implements Ischema{
    @Prop()
    id: string;
  
    @Prop()
    url: string;
  
    @Prop()
    identifier: string;

    @Prop()
    idobject: string;
}

export const UrlRelationSchema = SchemaFactory.createForClass(UrlRelation);
