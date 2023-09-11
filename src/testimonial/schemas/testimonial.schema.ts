import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

import { AnyObject, Document, Schema as MongooseSchema } from 'mongoose';
import Ischema from "src/app/interfaces/ischema.interface";

export type TestimonialDocument = HydratedDocument<Testimonial>;

@Schema()
export class Testimonial extends Document implements Ischema{
    @Prop()
    id: string;
  
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
    iduser: string;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Teacher' })
    idteacher: string;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Course' })
    idcourse: string;

    @Prop()
    date: number;

    @Prop()
    rating: number;

    @Prop()
    status: number;

    @Prop()
    message: string;
}

export const TestimonialSchema = SchemaFactory.createForClass(Testimonial);
