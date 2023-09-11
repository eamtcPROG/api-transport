import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

import { AnyObject, Document, Schema as MongooseSchema } from 'mongoose';
import Ischema from "src/app/interfaces/ischema.interface";

export type BlogCategoryDocument = HydratedDocument<BlogCategory>;

@Schema()
export class BlogCategory extends Document implements Ischema {
    @Prop()
    id: string;

    @Prop()
    status: number;

    @Prop()
    ordercriteria: number;

    @Prop()
    idparent: string;

    @Prop()
    level: number;
    
    @Prop()
    code: string;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'TypeBlogCategory' })
    idtypeblogcategory: string;

}

export const BlogCategorySchema = SchemaFactory.createForClass(BlogCategory);
