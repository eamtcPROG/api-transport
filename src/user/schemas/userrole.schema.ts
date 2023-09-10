import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

import { AnyObject, Document, Schema as MongooseSchema } from 'mongoose';
import Ischema from "src/app/interfaces/ischema.interface";

export type UserRoleDocument = HydratedDocument<UserRole>;

@Schema()
export class UserRole extends Document implements Ischema{
  @Prop()
  id: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  iduser: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Role' })
  idrole: string;
}

export const UserRoleSchema = SchemaFactory.createForClass(UserRole);


