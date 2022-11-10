import { LoadingButton } from '@components/loading-button'
import { Modal } from '@components/modal'
import { IModalProps } from '@components/modal/modal'
import { Dialog } from '@headlessui/react'
import { app } from '@lib/axios-config'
import { getAxiosError } from '@lib/utils'
import styles from '@styles/Modal.module.css'
import { useRouter } from 'next/router'
import { FormEventHandler, useState } from 'react'

export type AddTrackModalProps = Omit<IModalProps, 'close'> & {
	close: () => void
}

export function AddTrackModal({ ...props }: AddTrackModalProps) {
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState('')
	const { reload } = useRouter()

	const handleSubmit: FormEventHandler<HTMLFormElement> = async e => {
		e.preventDefault()
		setIsLoading(true)
		const { tracks } = Object.fromEntries(new FormData(e.target as HTMLFormElement)) as { tracks: string }

		try {
			if (!tracks) return setError('Cannot be empty!')

			await app.post('/api/hitlists/tracks', {
				tracks: tracks
			})
			reload()
		} catch (e) {
			console.error(getAxiosError(e))
		} finally {
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
					<form onSubmit={handleSubmit}>
						<label htmlFor="track-input" className="select-none">Tracks (ID&apos;s only and comma-separated)</label>
						<textarea name="tracks" id="track-input" className="w-full p-1 border-2 rounded font-sans" rows={10} onChange={() => setError('')}></textarea>
						<p className="min-h-5 mb-4 text-sm text-red-600">{error}</p>
						<LoadingButton type="submit" className="btn green py-2 rounded" isLoading={isLoading}>
							Update
						</LoadingButton>
					</form>
				</div>
			</div>
		</Modal>
	)
}