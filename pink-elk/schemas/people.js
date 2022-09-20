export default {
    name: 'people',
    type: 'document',
      title: 'People',
      
    fields: [
      {
        name: 'name',
        type: 'string',
        title: 'Person name and titles'
      },
      {
        name: 'objective',
        title: 'Bio',
        type: 'simpleBlockContent',
        
      },
      {
        name: 'objective1',
        title: 'Short Bio',
        type: 'simpleBlockContent',
        
      },
      {
        name: 'professor',
        type: 'string',
        title: 'Professor'
      },
      {
        name: 'link',
        type: 'string',
        title: 'Webside link'
      },
      {
        name: 'picPerson',
        type: 'image',
        title: 'Photo',
      },
    ]
  }