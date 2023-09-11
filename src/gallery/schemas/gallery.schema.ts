import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

import { AnyObject, Document, Schema as MongooseSchema } from 'mongoose';
import Ischema from "src/app/interfaces/ischema.interface";

export type GalleryDocument = HydratedDocument<Gallery>;

@Schema()
export class Gallery extends Document implements Ischema {
    @Prop()
    id: string;

    @Prop()
    status: number;

    @Prop()
    ordercriteria: number;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'File' })
    idfile: string;

    @Prop()
    idparent: string;

    @Prop()
    parent: string;

    @Prop()
    isdefault: boolean;

}

export const GallerySchema = SchemaFactory.createForClass(Gallery);
