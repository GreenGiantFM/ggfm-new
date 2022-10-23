import { Model, models, model, Schema } from 'mongoose'

export interface IRadioTalent {
	name: string
	nickname: string
	image: string
	writeup: string
	isTrainee: boolean
}

const schema = new Schema<IRadioTalent>({
	name: { type: String, required: true, trim: true },
	nickname: { type: String, required: true, trim: true },
	image: { type: String, required: true, trim: true },
	writeup: { type: String, required: true, trim: true, default: '' },
	isTrainee: { type: Boolean, required: true, default: true },
}, { versionKey: false })

export default models?.RadioTalent as Model<IRadioTalent & Document> || model<IRadioTalent>('RadioTalent', schema, 'radiotalents')
