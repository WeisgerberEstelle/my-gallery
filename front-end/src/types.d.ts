export interface Artwork {
	id: number
	title: string
	artist_name: string
	description?: string
	categories: string[]
	image_url?: string | null
}