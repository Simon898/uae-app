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
        title: 'Cieľ a význam projektu',
        type: 'simpleBlockContent',
        
      },
      {
        name: 'picName',
        type: 'image',
        title: 'Obrázok aplikácie',
      },
    ]
  }