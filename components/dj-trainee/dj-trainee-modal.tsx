import { IDJTrainee } from '@models/dj-trainee'
import { Modal } from '@components/modal'
import { IModalProps } from '@components/modal/modal'
import styles from '@styles/Modal.module.css'
import { Dialog } from '@headlessui/react'
import Image from 'next/future/image'

type DJTraineeModalProps = Partial<IDJTrainee> & IModalProps

export function DJTraineeModal({ isOpen, close, nickname, image, segue, challenges }: DJTraineeModalProps) {
	return (
		<Modal isOpen={isOpen} close={close}>
			<div className={styles.panel}>
				<div className={styles.body}>
					<div className="flex space-x-4">
						<figure className="h-48 aspect-square">
							<Image
								src={`https://drive.google.com/uc?export=view&id=${image}`}
								alt={`Image of DJ ${nickname}`}
								className="w-full h-full object-cover"
								width={200}
								height={200}
							/>
						</figure>
						<div>
							<Dialog.Title as="h1" className={styles.title}>
								DJ {nickname}
							</Dialog.Title>
							<p>{segue}</p>
						</div>
					</div>
					<div>
						<iframe
							src={`https://www.facebook.com/plugins/video.php?&href=${challenges}&show_text=false&t=0`}
							allowFullScreen allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
							className="aspect-video w-full"
						/>
					</div>
				</div>
			</div>
		</Modal>
	)
}
