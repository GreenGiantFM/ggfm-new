import { Model, models, model, Schema } from 'mongoose'

export interface IDate {
	name: string
	start: Date
	end: Date
}

const schema = new Schema<IDate>({
	name: { type: String, required: true, trim: true },
	start: { type: Date, required: true },
	end: { type: Date, required: true }
}, { versionKey: false })

export default models?.Dates as Model<IDate> || model<IDate>('Dates', schema, 'dates')
