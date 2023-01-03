const sanityClient = require('@sanity/client')

const PROJECT_ID = '5jj83dpk'
const DATASET = 'production'

const client = sanityClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  apiVersion: '2021-03-25', // use current UTC date - see "specifying API version"!
  token: 'sanity-auth-token', // or leave blank for unauthenticated usage
  useCdn: true, // `false` if you want to ensure fresh data
})

export const createURL = (type) => {
  let QUERY = encodeURIComponent(`*[_type == "${type}"]`);
  return `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${QUERY}`;
}

export default client;