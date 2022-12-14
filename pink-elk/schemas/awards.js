export default {
    name: 'awards',
    type: 'document',
      title: 'Honors and Awards',
      
    fields: [
      {
        name: 'title',
        type: 'string',
        title: 'Title'
      },
      {
        name: 'link',
        title: 'Link',
        type: 'string',
        
      },
      {
        name: 'description',
        type: 'simpleBlockContent',
        title: 'Short description',
      },
      {
        title: 'Category Award',
        name: 'category',
        type: 'string',
        options: {
          list: [
            { "title": "Best Paper Awards", "value": "BPA"},
            { "title": "Faculty Awards", "value": "FA"},
            { "title": "Faculty Honors", "value": "FH"},
            { "title": "Student Awards", "value": "SH"},
          ],
          layout: 'dropdown'
        }
      }
    ]
  }