import russianFlag from '@/assets/images/global/russian-flag.png'
import { ISelectItem } from '@/components/ui/selects/custom-select/interface/custom-select.interface'

export const LANGUAGE_DATA: ISelectItem[] = [
	{
		icon: {
			link: russianFlag,
			width: 20,
			height: 20,
			alt: '',
		},
		key: 'ru',
		label: 'RU',
	},
	{
		icon: {
			link: russianFlag,
			width: 20,
			height: 20,
			alt: '',
		},
		key: 'eng',
		label: 'ENG',
	},
]
