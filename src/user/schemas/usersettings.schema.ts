import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

import { AnyObject, Document, Schema as MongooseSchema } from 'mongoose';
import Ischema from "src/app/interfaces/ischema.interface";

export type UserSettingsDocument = HydratedDocument<UserSettings>;

@Schema()
export class UserSettings extends Document implements Ischema {
    @Prop()
    id: string;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
    iduser: string;

    @Prop()
    name: string;

    @Prop()
    surname: string;

    @Prop()
    birthday: Date;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'TypeGender' })
    idtypegender: string;

    // @Prop({ type: MongooseSchema.Types.Array, ref: 'Phone' })
    // idsphone: string[];

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Language' })
    idlanguage: string;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Gallery' })
    idavatar: string;

    // @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Address' })
    // idphysicaladdress: string;
}

export const UserSettingsSchema = SchemaFactory.createForClass(UserSettings);


