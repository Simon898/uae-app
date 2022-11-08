export default {
    name: 'news',
    type: 'document',
      title: 'News',
      
    fields: [
      {
        name: 'title',
        type: 'string',
        title: 'New title'
      },
      {
        name: 'shorttext',
        type: 'string',
        title: 'Short description'
      },
      {
        name: 'picGroup',
        type: 'image',
        title: 'Picture of Group',
      },
      {
        name: 'objective',
        title: 'Group Description',
        type: 'simpleBlockContent',
        
      },
    ]
  }