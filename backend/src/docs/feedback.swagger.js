const createFeedback = {
   tags: ['feedback'],
   summary: 'Create a feedback',
   requestBody: {
      required: true,
      content: {
         'application/json': {
            schema: {
               $ref: '#/components/schemas/Feedback',
            },
            example: {
               comment: 'Отличный проект ребята! Вы молодцы!',
            },
         },
      },
   },
   responses: {
      '200': {
         description: 'Возвращается созданный комментарий',
         content: {
            'application/json': {
               schema: {
                  $ref: '#/components/schemas/Feedback',
               },
               example: {
                  comment: 'Отличный проект ребята! Вы молодцы!',
                  user: {
                     _id: '5eb9a98ac82bd95234d9ccd4',
                  },
               },
            },
         },
      },
   },
}
module.exports = {
   createFeedback,
}
