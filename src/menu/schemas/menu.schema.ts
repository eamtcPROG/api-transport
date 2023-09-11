import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

import { AnyObject, Document, Schema as MongooseSchema } from 'mongoose';
import Ischema from "src/app/interfaces/ischema.interface";

export type MenuDocument = HydratedDocument<Menu>;

@Schema()
export class Menu extends Document implements Ischema {
    @Prop()
    id: string;

    @Prop()
    section: number;

    @Prop()
    status: number;

    @Prop()
    ordercriteria: number;

    @Prop()
    hasurl: boolean;

    @Prop()
    url: string;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Page' })
    idpage: string;

    @Prop()
    idparent: string;

}

export const MenuSchema = SchemaFactory.createForClass(Menu);
