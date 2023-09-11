import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

import { AnyObject, Document, Schema as MongooseSchema } from 'mongoose';
import Ischema from "src/app/interfaces/ischema.interface";

export type PageValueDocument = HydratedDocument<PageValue>;

@Schema()
export class PageValue extends Document implements Ischema{
    @Prop()
    id: string;
  
    @Prop()
    name: string;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Language' })
    idlanguage: string;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Page' })
    idpage: string;

    @Prop()
    url: string;

    @Prop()
    title: string;

    @Prop()
    keymeta: string;

    @Prop()
    descriptionmeta: string;

    @Prop()
    content: string;

}

export const PageValueSchema = SchemaFactory.createForClass(PageValue);
