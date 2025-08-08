import gsap from 'gsap'
import { Ref } from 'vue'

interface FadeInOptions {
	duration: number
	y: number
	opacity: number
	delay?: number
}

export function useAnimations() {
	const fadeIn = (
		elemento: Ref<HTMLElement | null>,
		options: FadeInOptions = {
			duration: 0.5,
			y: 20,
			opacity: 0
		}
	) => {
		gsap.from(elemento.value, {
			...options
		})
	}

	return {
		fadeIn
	}
}
