export default {
    name: 'katha',
    title: 'Katha',
    type: 'document',
    fields: [
      {
        name: 'title',
        title: 'Title',
        type: 'string',
      },
      {
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        options: {
          source: 'title',
          maxLength: 96,
        },
      },
      {
        name: 'vakta',
        title: 'vakta',
        type: 'reference',
        to: {type: 'vakta'},
      },
      {
        name: 'mainImage',
        title: 'Main image',
        type:'image',
        options: {
          hotspot: true,
        },
      },
      {
        name: 'media',
        title: 'Upload File',
        type: 'array',
        of: [{type: 'file', to: {type: 'category'}}]
  
        
      },
      {
        name: 'categories',
        title: 'Categories',
        type: 'array',
        of: [{type: 'reference', to: {type: 'category'}}],
      },
      {
        name: 'publishedAt',
        title: 'Published at',
        type: 'datetime',
      },
      {
        name: 'body',
        title: 'Body',
        type: 'blockContent',
      },
    ],
  
    preview: {
      select: {
        title: 'title',
        vakta: 'vakta.name',
        media: 'mainImage',
      },
      prepare(selection) {
        const {vakta} = selection
        return Object.assign({}, selection, {
          subtitle: vakta && `by ${vakta}`,
        })
      },
    },
  }
  