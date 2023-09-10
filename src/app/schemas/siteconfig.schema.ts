import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

import { AnyObject, Document, Schema as MongooseSchema } from 'mongoose';
import Ischema from "src/app/interfaces/ischema.interface";

export type SiteConfigDocument = HydratedDocument<SiteConfig>;

@Schema()
export class SiteConfig extends Document implements Ischema {
    @Prop()
    id: string;

    @Prop()
    identifier: string;

    @Prop()
    value: string;

    @Prop()
    updatedate: number;
}

export const SiteConfigSchema = SchemaFactory.createForClass(SiteConfig);
