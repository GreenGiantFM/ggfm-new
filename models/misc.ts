import { Model, models, model, Schema } from 'mongoose'

export interface IMisc {
	name: string
	data: string
}

const schema = new Schema<IMisc>({
	name: { type: String, required: true, trim: true },
	data: { type: String, required: true, trim: true },
}, { versionKey: false })

export default models?.Misc as Model<IMisc> || model<IMisc>('Misc', schema, 'misc')
