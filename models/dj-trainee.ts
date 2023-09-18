import { Model, models, model, Schema, ObjectId } from 'mongoose'

export interface IDJTrainee {
	_id: ObjectId | string
	name: string
	nickname: string
	image: string
	caption: string
	stinger: string
	voiceover: string
	segue: string
	soloVideoShoot: string
}

const schema = new Schema<IDJTrainee>({
	name: { type: String, required: true, trim: true },
	nickname: { type: String, required: true, trim: true },
	image: { type: String, required: true, trim: true },
	caption: { type: String, required: true, trim: true },
	stinger: { type: String, required: true, trim: true },
	soloVideoShoot: { type: String, require: true, trim: true },
	voiceover: { type: String, required: true, trim: true },
	segue: { type: String, require: true, trim: true },
}, { versionKey: false })

export default models?.DJTrainee as Model<IDJTrainee> || model<IDJTrainee>('DJTrainee', schema, 'djtrainees')
