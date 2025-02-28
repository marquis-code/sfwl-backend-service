// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { Document, Types } from 'mongoose';

// export type ActivityDocument = Activity & Document;

// @Schema()
// export class Activity {
//   @Prop({ required: true })
//   date: string;

//   @Prop([
//     {
//       name: { type: String, required: true },
//       image: { type: String, required: true },
//     },
//   ])
//   activity: { name: string; image: string }[];

//   @Prop([
//     {
//       name: { type: String, required: true },
//       image: { type: String, required: true },
//     },
//   ])
//   meals: { name: string; image: string }[];

//   @Prop({ type: Types.ObjectId, ref: 'User', required: true }) // Reference to the User model
//   user: Types.ObjectId;
// }

// export const ActivitySchema = SchemaFactory.createForClass(Activity);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ActivityDocument = Activity & Document;

@Schema()
export class Activity {
  @Prop({ required: true })
  date: string;

  @Prop([
    {
      name: { type: String, required: true },
      image: { type: String, required: true },
    },
  ])
  activity: { name: string; image: string }[];

  @Prop([
    {
      name: { type: String, required: true },
      image: { type: String, required: true },
    },
  ])
  meals: { name: string; image: string }[];

  @Prop({ type: Types.ObjectId, ref: 'User', required: true }) // Reference to the User model
  user: Types.ObjectId;

  @Prop([
    {
      admin: { type: String, required: true }, // Name or ID of the admin commenting
      comment: { type: String, required: true }, // The comment text
      date: { type: Date, default: Date.now }, // Timestamp for the comment
    },
  ])
  comments?: { admin: string; comment: string; date: Date }[]; // Array of comments
}

export const ActivitySchema = SchemaFactory.createForClass(Activity);
