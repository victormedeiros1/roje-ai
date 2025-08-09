import gsap from 'gsap'
import { Ref } from 'vue'

interface FadeInOptions {
	duration: number
	x: number
	y: number
	opacity: number
	delay: number
}

export function useAnimations() {
	const fadeIn = (elemento: Ref<HTMLElement | null>, options?: FadeInOptions) => {
		const fadeInDefault: FadeInOptions = {
			duration: 0.5,
			x: 0,
			y: 20,
			opacity: 0,
			delay: 0
		}

		gsap.from(elemento.value, {
			...fadeInDefault,
			...options
		})
	}

	return {
		fadeIn
	}
}
