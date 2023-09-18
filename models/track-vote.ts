import { Model, models, model, Schema } from 'mongoose'

export interface ITrackVote {
	email: string
	track: string
}

const schema = new Schema<ITrackVote>({
	email: { type: String, required: true, trim: true },
	track: { type: String, ref: 'Track' },
}, { versionKey: false })

export default models?.TrackVote as Model<ITrackVote> || model<ITrackVote>('TrackVote', schema, 'trackvotes')
