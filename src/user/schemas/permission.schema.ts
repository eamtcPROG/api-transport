import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

import { AnyObject, Document, Schema as MongooseSchema } from 'mongoose';
import Ischema from "src/app/interfaces/ischema.interface";

export type PermissionDocument = HydratedDocument<Permission>;

@Schema()
export class Permission extends Document implements Ischema{
  @Prop()
  id: string;

  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop({ type: MongooseSchema.Types.Array, ref: 'Role'})
  acceptedroles: string[];

  @Prop()
  updatedate: number;

}

export const PermissionSchema = SchemaFactory.createForClass(Permission);


