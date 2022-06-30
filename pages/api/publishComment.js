// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { GraphQLClient, gql } from "graphql-request";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export default async function publishCommment(req, res) {
	const graphqlClient = new GraphQLClient(graphqlAPI, {
		headers: {
			authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`,
		},
	});
	console.log(req.body);
	const query = gql`
		mutation PublishComment($id: ID!) {
			publishComment(where: { id: $id }, to: PUBLISHED) {
				id
			}
		}
	`;

	const data = await graphqlClient.request(query, req.body);

	return res.status(200).send(data);
}
