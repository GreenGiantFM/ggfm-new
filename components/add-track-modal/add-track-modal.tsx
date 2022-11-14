import { LoadingButton } from '@components/loading-button'
import { Modal } from '@components/modal'
import { IModalProps } from '@components/modal/modal'
import { Dialog } from '@headlessui/react'
import { app } from '@lib/axios-config'
import { getAxiosError } from '@lib/utils'
import styles from '@styles/Modal.module.css'
import { useRouter } from 'next/router'
import { ChangeEventHandler, FormEventHandler, useState } from 'react'

export type AddTrackModalProps = Omit<IModalProps, 'close'> & {
	close: () => void
}

type Data = {
	start?: string
	end?: string
	tracks?: string
}

export function AddTrackModal({ ...props }: AddTrackModalProps) {
	const [isLoading, setIsLoading] = useState(false)
	let [errors, setErrors] = useState<Partial<Data>>({})
	const [message, setMessage] = useState('')
	const { reload } = useRouter()

	const onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = e => {
		setErrors(Object.assign(errors, { [e.target.name]: undefined }))
	}

	const handleSubmit: FormEventHandler<HTMLFormElement> = async e => {
		e.preventDefault()
		setIsLoading(true)
		setMessage('')
		const { tracks, start, end } = Object.fromEntries(new FormData(e.target as HTMLFormElement)) as Data

		try {
			errors = {}
			if (!tracks) errors.tracks = 'Cannot be empty'
			if (!start) errors.start = 'Cannot be empty'
			if (!end) errors.end = 'Cannot be empty'

			if (Object.keys(errors).length) return

			await app.post('/api/hitlists/tracks', {
				tracks,
				start,
				end
			})
			reload()
		} catch (e) {
			setMessage(getAxiosError(e))
		} finally {
			setErrors(errors)
			setIsLoading(false)
		}
	}

	return (
		<Modal {...props}>
			<div className={styles.panel}>
				<div className={styles.body}>
					<div>
						<Dialog.Title as="h1" className={styles.title}>
							Add tracks
						</Dialog.Title>
					</div>
					<form onSubmit={handleSubmit} className="grid children:children:block space-y-2">
						<div>
							<label htmlFor="start">Start Date</label>
							<input type="date" name="start" id="start" onChange={onChange} />
							<p className={styles.error}>{errors.start}</p>
						</div>
						<div>
							<label htmlFor="start">End Date</label>
							<input type="date" name="end" id="end" onChange={onChange} />
							<p className={styles.error}>{errors.end}</p>
						</div>
						<div>
							<label htmlFor="track-input" className="select-none">Tracks (ID&apos;s only and comma-separated)</label>
							<textarea name="tracks" id="track-input" rows={10} onChange={onChange}></textarea>
							<p className={styles.error}>{errors.tracks}</p>
						</div>
						<div>
							<LoadingButton type="submit" className="btn green py-2 rounded" isLoading={isLoading}>
								Update
							</LoadingButton>
							<p className={styles.error}>{message}</p>
						</div>
					</form>
				</div>
			</div>
		</Modal>
	)
}