export default {
    name: 'news',
    type: 'document',
      title: 'News',
      
    fields: [
      {
        name: 'title',
        type: 'string',
        title: 'News title'
      },
      {
        name: 'shorttext',
        type: 'string',
        title: 'News short description'
      },
      {
        name: 'picGroup',
        type: 'image',
        title: 'Picture of News',
      },
      {
        name: 'objective',
        title: 'News Description',
        type: 'simpleBlockContent',
        
      },
    ]
  }