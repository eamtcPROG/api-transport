import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { AnyObject, Document, Schema as MongooseSchema } from 'mongoose';
import Ischema from "src/app/interfaces/ischema.interface";

export type RoleDocument = HydratedDocument<Role>;

@Schema()
export class Role extends Document implements Ischema{
  @Prop()
  id: string;

  @Prop()
  name: string;

  @Prop()
  fixed: boolean;
}

export const RoleSchema = SchemaFactory.createForClass(Role);