import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

import { AnyObject, Document, Schema as MongooseSchema } from 'mongoose';
import Ischema from "src/app/interfaces/ischema.interface";

export type BlogDocument = HydratedDocument<Blog>;

@Schema()
export class Blog extends Document implements Ischema{
    @Prop()
    id: string;
  
    @Prop()
    type: number;
  
    @Prop()
    status: number;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Gallery' })
    idgallery: string;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Attachment' })
    idattachment: string;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Video' })
    idvideo: string;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'BlogCategory' })
    idblogcategory:string;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);
