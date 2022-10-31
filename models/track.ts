import { Model, models, model, Schema } from 'mongoose'

export interface ITrack {
	_id: string
	name: string
	preview_url: string
	artists: string[]
	image: string
}

const schema = new Schema<ITrack>({
	_id: { type: String, required: true, trim: true },
	name: { type: String, required: true, trim: true },
	preview_url: { type: String, required: true, trim: true },
	artists: { type: [String], required: true, minlength: 1 },
	image: { type: String, required: true, trim: true },
}, { versionKey: false })

export default models?.Track as Model<ITrack & Document> || model<ITrack>('Track', schema, 'tracks')
