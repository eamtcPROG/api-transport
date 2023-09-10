import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

import { AnyObject, Document, Schema as MongooseSchema } from 'mongoose';
import Ischema from "src/app/interfaces/ischema.interface";

export type UserSocialDocument = HydratedDocument<UserSocial>;

@Schema()
export class UserSocial extends Document implements Ischema {
  @Prop()
  id: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  iduser: string;

  @Prop()
  socialidentifier: number;

  @Prop()
  socialid: string;

  @Prop()
  socialuseridentifier: string;
}

export const UserSocialSchema = SchemaFactory.createForClass(UserSocial);


