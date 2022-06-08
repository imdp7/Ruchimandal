export default {
  name: 'parayan',
  title: 'Parayan',
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
      title: 'Vakta',
      type: 'array',
      of: [{type: 'reference', to: {type: 'vakta'}}],
      options: {
        layout: 'vakta'
      }
    },
    {
      name: 'mainImage',
      title: 'Main Poster image',
      type:'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'images',
      title: 'Parayan Images',
      type: 'array',
      of: [{type: 'image', to: {type: 'category'}}]
 
    },
    {
      name: 'media',
      title: 'Upload File',
      type: 'array',
      of: [
        {type: 'file', to: {type: 'category'}}
      ]
      
    },

  //   {
  //     title: 'Upload File',
  //     name: 'media',
  //     type: 'object',
  //     of:[{type:'array',
  //     to:[
  //       {
  //       name:'fileUpload',
  //       type:'file',
  //       },
  //       { 
  //         name:'categories',
  //         type:'reference',
  //         to: {type: 'category'},
  //       },
  //   ]},
  // ]},

    {
      name: 'referenceList',
      title: 'Youtube Link',
      type: 'array',
      of: [{type: 'string'}],
      
    },
    {
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{type: 'reference', to: {type: 'category'}}],
      options: {
        layout: 'categories'
      }
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
    {
      name: 'gallery',
      type: 'object',
      title: 'Gallery',
      fields: [
        {
          name: 'images',
          type: 'array',
          title: 'Images',
          of: [
            {
              name: 'image',
              type: 'image',
              title: 'Image',
              options: {
                hotspot: true,
              },
              fields: [
                {
                  name: 'alt',
                  type: 'string',
                  title: 'Alternative text',
                },
              ],
            },
          ],
          options: {
            layout: 'grid',
          },
        },
        {
          name: 'display',
      type: 'string',
      title: 'Display as',
      description: 'How should we display these images?',
      options: {
        list: [
          { title: 'Stacked on top of eachother', value: 'stacked' },
          { title: 'In-line', value: 'inline' },
          { title: 'Carousel', value: 'carousel' },
        ],
        layout: 'radio', // <-- defaults to 'dropdown'
        },
        },
        {
          name: 'zoom',
          type: 'boolean',
          title: 'Zoom enabled',
          description: 'Should we enable zooming of images?',
        },
      ],
    }
  ],

  preview: {
    select: {
      title: 'title',
      vakta: 'vakta.name',
      media: 'mainImage',
      images: 'images',
      image: 'images.0',
    },
    prepare(selection) {
      const {vakta} = selection
      return Object.assign({}, selection, {
        subtitle: vakta && `by ${vakta}`,
      })
    },
  },
}
