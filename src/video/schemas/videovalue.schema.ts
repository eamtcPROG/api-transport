import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

import { AnyObject, Document, Schema as MongooseSchema } from 'mongoose';
import Ischema from "src/app/interfaces/ischema.interface";

export type VideoValueDocument = HydratedDocument<VideoValue>;

@Schema()
export class VideoValue extends Document implements Ischema{
    @Prop()
    id: string;
  
    @Prop()
    name: string;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Language' })
    idlanguage: string;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Video' })
    idvideo: string;

}

export const VideoValueSchema = SchemaFactory.createForClass(VideoValue);
