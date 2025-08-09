// Configurações de ambiente
export const config = {
	// API
	apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',

	// App
	appTitle: import.meta.env.VITE_APP_TITLE || 'Roje AI',
	appVersion: import.meta.env.VITE_APP_VERSION || '1.0.0',

	// Debug
	debugMode: import.meta.env.VITE_DEBUG_MODE === 'true',

	// Timeouts
	apiTimeout: 10000,

	// Paginação
	defaultPageSize: 20,
	maxPageSize: 100
}

// Função para validar configurações obrigatórias
export const validateConfig = () => {
	const required = ['apiBaseUrl']

	for (const key of required) {
		if (!config[key as keyof typeof config]) {
			throw new Error(`Configuração obrigatória não encontrada: ${key}`)
		}
	}

	console.log('✅ Configurações carregadas:', config)
}
