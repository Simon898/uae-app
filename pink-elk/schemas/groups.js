export default {
    name: 'group',
    type: 'document',
      title: 'Research Group',
      
    fields: [
      {
        name: 'title',
        type: 'string',
        title: 'Research Groups'
      },
      {
        name: 'objective',
        title: 'Group Description',
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
        name: 'picGroup',
        type: 'image',
        title: 'Picture of Group',
      },
    ]
  }