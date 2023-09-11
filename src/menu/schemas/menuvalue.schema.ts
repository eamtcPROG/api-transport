import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

import { AnyObject, Document, Schema as MongooseSchema } from 'mongoose';
import Ischema from "src/app/interfaces/ischema.interface";

export type MenuValueDocument = HydratedDocument<MenuValue>;

@Schema()
export class MenuValue extends Document implements Ischema{
    @Prop()
    id: string;
  
    @Prop()
    name: string;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Language' })
    idlanguage: string;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Menu' })
    idmenu: string;

}

export const MenuValueSchema = SchemaFactory.createForClass(MenuValue);
