import { request, gql } from "graphql-request";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export const fetchPosts = async () => {
	const query = gql`
		query MyQuery {
			postsConnection {
				edges {
					node {
						author {
							bio
							id
							name
							photo {
								url
							}
						}
						createdAt
						slug
						title
						excerpt
						featured
						featuredImage {
							url
						}
						categories {
							name
							slug
						}
					}
				}
			}
		}
	`;

	const data = await request(graphqlAPI, query);

	return data.postsConnection.edges;
};

export const fetchPostDetails = async (slug) => {
	const query = gql`
		query GetPostDetails($slug: String!) {
			post(where: { slug: $slug }) {
				author {
					bio
					id
					name
					photo {
						url
					}
				}
				createdAt
				slug
				title
				excerpt
				featured
				featuredImage {
					url
				}
				categories {
					name
					slug
				}
				content {
					raw
				}
			}
		}
	`;

	const data = await request(graphqlAPI, query, { slug });

	return data.post;
};

export const fetchRecentPosts = async () => {
	const query = gql`
		query GetPostDetails() {
			posts(
				orderBy: createdAt_ASC
				last: 3
			) {
				title
				featuredImage {
					url
				}
				createdAt
				slug
				id
			}
		}
	`;

	const data = await request(graphqlAPI, query);

	return data.posts;
};

export const fetchSimilarPosts = async (categories, slug) => {
	const query = gql`
		query GetPostDetails($slug: String!, $categories: [String!]) {
			posts(where: { slug_not: $slug, AND: { categories_some: { slug_in: $categories } } }, last: 3) {
				title
				featuredImage {
					url
				}
				createdAt
				slug
				id
			}
		}
	`;

	const data = await request(graphqlAPI, query, { categories, slug });

	return data.posts;
};

export const fetchCategories = async () => {
	const query = gql`
		query GetCategories {
			categories {
				name
				slug
			}
		}
	`;

	const data = await request(graphqlAPI, query);

	return data.categories;
};

export const submitComment = async (obj) => {
	const data = await fetch(`/api/comments`, {
		method: "POST",
		body: JSON.stringify(obj),
	});

	return data.json();
};
