import { IDJTrainee } from '@models/dj-trainee'
import { Modal } from '@components/modal'
import { IModalProps } from '@components/modal/modal'
import styles from '@styles/Modal.module.css'
import { Dialog } from '@headlessui/react'
import Image from 'next/future/image'
import { VideoItem } from './video-item'

type DJTraineeModalProps = Partial<IDJTrainee> & IModalProps

export function DJTraineeModal({ isOpen, close, nickname, image, segue, caption, soloVideoShoot, voiceover }: DJTraineeModalProps) {
	return (
		<Modal isOpen={isOpen} close={close}>
			<div className={styles.panel}>
				<div className={styles.body}>
					<div className="flex flex-wrap">
						<figure className="h-48 aspect-square relative mr-4 mb-4">
							<Image
								src={`https://lh3.googleusercontent.com/d/${image}`}
								alt={`Image of DJ ${nickname}`}
								className="w-full h-full object-cover"
								fill
								sizes="(max-width 768px) 100px, 200px"
							/>
						</figure>
						<div className="mb-4">
							<Dialog.Title as="h1" className={styles.title}>
								DJ {nickname}
							</Dialog.Title>
							<p>{caption}</p>
						</div>
					</div>
					<div className="space-y-4 -mx-6 -mb-4 px-4 pb-4 pt-6 bg-[#3f3f3f] text-white">
						<VideoItem title="Solo Videoshoot" src={soloVideoShoot} />
						<VideoItem title="Segue" src={segue} />
						<VideoItem title="Voiceover Challenge" src={voiceover} />
					</div>
				</div>
			</div>
		</Modal>
	)
}
