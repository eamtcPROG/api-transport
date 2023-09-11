import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

import { AnyObject, Document, Schema as MongooseSchema } from 'mongoose';
import Ischema from "src/app/interfaces/ischema.interface";

export type BlogCategoryValueDocument = HydratedDocument<BlogCategoryValue>;

@Schema()
export class BlogCategoryValue extends Document implements Ischema{
    @Prop()
    id: string;
  
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Language' })
    idlanguage: string;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'BlogCategory' })
    idblogcategory: string;

    @Prop()
    name: string;

}

export const BlogCategoryValueSchema = SchemaFactory.createForClass(BlogCategoryValue);
