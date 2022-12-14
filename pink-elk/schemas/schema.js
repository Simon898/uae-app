// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'
import simpleBlockContent from './simpleBlockContent'
import home from './home'
import group from './groups'
import about from './about'
import people from './people'
import news from './news'
import awards from './awards'

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  name: 'default',
  types: schemaTypes.concat([home, simpleBlockContent, group, about, people, news, awards]),
})
