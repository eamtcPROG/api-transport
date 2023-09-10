import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

import { AnyObject, Document, Schema as MongooseSchema } from 'mongoose';
import Ischema from "src/app/interfaces/ischema.interface";

export type TestInfoDocument = HydratedDocument<TestInfo>;

@Schema()
export class TestInfo extends Document implements Ischema{
  @Prop()
  id: string;

  @Prop()
  name: string;

  @Prop()
  info: string;
}

export const TestInfoSchema = SchemaFactory.createForClass(TestInfo);


