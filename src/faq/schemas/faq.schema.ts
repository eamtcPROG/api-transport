import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

import { AnyObject, Document, Schema as MongooseSchema } from 'mongoose';
import Ischema from "src/app/interfaces/ischema.interface";

export type FAQDocument = HydratedDocument<FAQ>;

@Schema()
export class FAQ extends Document implements Ischema {
    @Prop()
    id: string;

    @Prop()
    status: number;

    @Prop()
    ordercriteria: number;

    @Prop()
    type: number;

    @Prop()
    idobject: string;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Gallery' })
    idgallery: string;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Attachment' })
    idattachment: string;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Video' })
    idvideo: string;
}

export const FAQSchema = SchemaFactory.createForClass(FAQ);
