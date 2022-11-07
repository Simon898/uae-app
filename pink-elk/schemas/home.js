export default {
    name: 'home',
    type: 'document',
      title: 'Home',
      
    fields: [
      {
        name: 'title',
        type: 'string',
        title: 'Home'
      },
      {
        name: 'objective',
        title: 'Home page text',
        type: 'simpleBlockContent',
        
      },
      {
        name: 'picName',
        type: 'image',
        title: 'Picture of application',
      },
    ]
  }