import { IAuthor} from '@/types'
import request, { gql } from 'graphql-request'
import { cache } from 'react'

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT!


export const getDetaileddAuthor = cache(async (id: string) => {
	const query = gql`
		query MyQuery($id: ID) {
			author(where: { id: $id }) {
				bio
				image {
					url
				}
				name
				blogs {
					description
					author {
						name
						image {
							url
						}
						bio
					}
					content {
						html
					}
					createdAt
					image {
						url
					}
					slug
					tag {
						name
						slug
					}
					category {
						name
						slug
					}
					title
				}
			}
		}
	`

	const { author } = await request<{ author: IAuthor}>(graphqlAPI, query, { id })
	return author
})

export const getAuthors = async () => {
	const query = gql`
		query MyQuery {
			authors {
				bio
				id
				name
				image {
					url
				}
				blogs {
					id
				}
			}
				
		}
	`

	const { authors } = await request<{ authors: IAuthor[] }>(
		graphqlAPI,
		query
	)
	
	return authors
}