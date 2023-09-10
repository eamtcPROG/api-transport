import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
// import Ischema from "src/app/interfaces/ischema.interface";

import { AnyObject, Document, Schema as MongooseSchema } from 'mongoose';
import Ischema from "src/app/interfaces/ischema.interface";

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User extends Document implements Ischema {
  @Prop()
  id: string;

  @Prop()
  status: number;

  @Prop()
  registerdate: number;

  @Prop()
  email: string;

  @Prop()
  statusemail: number;

  @Prop()
  password: string;

  @Prop()
  statuspassword: number;

  @Prop()
  hash: string;
}

export const UserSchema = SchemaFactory.createForClass(User);


