import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

import { AnyObject, Document, Schema as MongooseSchema } from 'mongoose';
import Ischema from "src/app/interfaces/ischema.interface";

export type FileDocument = HydratedDocument<File>;

@Schema()
export class File extends Document implements Ischema{
  @Prop()
  id: string;

  @Prop()
  name: string;

  @Prop()
  type: string;

  @Prop()
  hash: string;
  
  @Prop({ type: MongooseSchema.Types.Array, ref: 'FilePermissions' })
  permissions: string[];

  @Prop()
  location: string;

  @Prop()
  storage: string;

  @Prop()
  size: number;

  @Prop()
  value: string;
}

export const FileSchema = SchemaFactory.createForClass(File);


