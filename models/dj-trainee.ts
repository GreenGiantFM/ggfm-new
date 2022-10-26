import { Model, models, model, Schema, Types, ObjectId } from 'mongoose'

export interface IDJTrainee {
	_id: ObjectId | string
	name: string
	nickname: string
	video: string
	image: string
	stinger: string
	voiceOver: string
	segue: string
	challenges: string
}

const schema = new Schema<IDJTrainee>({
	name: { type: String, required: true, trim: true },
	nickname: { type: String, required: true, trim: true },
	video: { type: String, required: true, trim: true },
	image: { type: String, required: true, trim: true },
	stinger: { type: String, required: true, trim: true },
	voiceOver: { type: String, required: true, trim: true },
	segue: { type: String, require: true, trim: true },
	challenges: { type: String, require: true, trim: true },
}, { versionKey: false })

export default models?.DJTrainee as Model<IDJTrainee & Document> || model<IDJTrainee>('DJTrainee', schema, 'djtrainees')
