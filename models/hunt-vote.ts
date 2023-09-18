import { Model, models, model, Schema } from 'mongoose'

export interface IHuntVote {
	email: string
	candidate: Schema.Types.ObjectId | string
}

const schema = new Schema<IHuntVote>({
	email: { type: String, required: true, trim: true },
	candidate: { type: Schema.Types.ObjectId, ref: 'DJTrainee' },
}, { versionKey: false })

export default models?.HuntVote as Model<IHuntVote> || model<IHuntVote>('HuntVote', schema, 'huntvotes')
