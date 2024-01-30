//import contentful from "contentful"
const contentful = require('contentful')

export const client = contentful.createClient({
  space: 'bm9m78u8retd',
  environment: 'master', // defaults to 'master' if not set
  accessToken: 'pyLOBG2KmUFlz6ZqGa-EbNkBUBJ7dFEduCuserb-Uew'
})

