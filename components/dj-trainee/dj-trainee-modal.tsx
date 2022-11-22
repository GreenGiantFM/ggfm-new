import { IDJTrainee } from '@models/dj-trainee'
import { Modal } from '@components/modal'
import { IModalProps } from '@components/modal/modal'
import styles from '@styles/Modal.module.css'
import { Dialog } from '@headlessui/react'
import Image from 'next/future/image'
import { VideoItem } from './video-item'

type DJTraineeModalProps = Partial<IDJTrainee> & IModalProps

export function DJTraineeModal({ isOpen, close, nickname, image, segue, caption, soloVideoShoot, voiceover, stinger }: DJTraineeModalProps) {
	return (
		<Modal isOpen={isOpen} close={close}>
			<div className={styles.panel}>
				<div className={styles.body}>
					<div className="grid sm:grid-cols-[12rem_1fr] gap-4 pb-6">
						<figure className="h-48 aspect-square relative">
							<Image
								src={`https://lh3.googleusercontent.com/d/${image}`}
								alt={`Image of DJ ${nickname}`}
								className="w-full h-full object-cover"
								fill
								sizes="(max-width 768px) 100px, 200px"
								style={{ objectPosition: '0 -40px' }}
							/>
						</figure>
						<div>
							<Dialog.Title as="h1" className={styles.title}>
								DJ {nickname}
							</Dialog.Title>
							<p>{caption}</p>
							<audio className="w-full mt-4" src={`https://docs.google.com/uc?export=download&id=${stinger}`} controls />
						</div>
					</div>
					<div className="space-y-4 -mx-6 -mb-4 px-4 pb-4 pt-6 bg-[#3f3f3f] text-white grid sm:grid-cols-2 gap-x-4">
						<VideoItem title="Solo Videoshoot" src={soloVideoShoot} className="sm:col-span-2" />
						<VideoItem title="Segue" src={segue} />
						<VideoItem title="Voiceover Challenge" src={voiceover} />
					</div>
				</div>
			</div>
		</Modal>
	)
}
