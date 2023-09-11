import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

import { AnyObject, Document, Schema as MongooseSchema } from 'mongoose';
import Ischema from "src/app/interfaces/ischema.interface";

export type AttachmentValueDocument = HydratedDocument<AttachmentValue>;

@Schema()
export class AttachmentValue extends Document implements Ischema{
    @Prop()
    id: string;
  
    @Prop()
    name: string;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Language' })
    idlanguage: string;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Attachment' })
    idattachment: string;

}

export const AttachmentValueSchema = SchemaFactory.createForClass(AttachmentValue);
