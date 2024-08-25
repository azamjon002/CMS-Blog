export interface ChildProps {
	children: React.ReactNode
}

export interface IBlog {
	title: string
	createdAt:string
	description: string
	author:IAuthor
	category:ICategoryAndTag
	tag:ICategoryAndTag
	image: {url:string}
	content: {html:string}
	slug:string
}

export interface IAuthor {
	name: string
	image: { url:string }
	bio:string
}

export interface ICategoryAndTag {
	name:string
	slug:string
}