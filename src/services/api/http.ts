import axios, { AxiosResponse } from 'axios'

// Configuração base do axios
const http = axios.create({
	baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/',
	timeout: 100000000,
	headers: {
		'Content-Type': 'application/json'
	}
})

// Funções simples para fazer requisições
export const api = {
	// GET
	get: async <T = any>(url: string, params?: any): Promise<T> => {
		const response: AxiosResponse<T> = await http.get(url, { params })
		return response.data
	},

	// POST
	post: async <T = any>(url: string, data?: any): Promise<T> => {
		const response: AxiosResponse<T> = await http.post(url, data)
		return response.data
	},

	// PUT
	put: async <T = any>(url: string, data?: any): Promise<T> => {
		const response: AxiosResponse<T> = await http.put(url, data)
		return response.data
	},

	// DELETE
	delete: async <T = any>(url: string): Promise<T> => {
		const response: AxiosResponse<T> = await http.delete(url)
		return response.data
	},

	// PATCH
	patch: async <T = any>(url: string, data?: any): Promise<T> => {
		const response: AxiosResponse<T> = await http.patch(url, data)
		return response.data
	}
}

export default api
