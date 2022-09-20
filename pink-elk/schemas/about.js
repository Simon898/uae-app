export default {
    name: 'about',
    type: 'document',
      title: 'About',
      
    fields: [
      {
        name: 'title',
        type: 'string',
        title: 'About'
      },
      {
        name: 'objective',
        title: 'About Content',
        type: 'simpleBlockContent',
        
      },
      {
        name: 'picAbout',
        type: 'image',
        title: 'Picture of About',
      },
    ]
  }