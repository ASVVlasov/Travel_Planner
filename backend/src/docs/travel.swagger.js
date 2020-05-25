const getTravel = {
   tags: ['travel'],
   summary: 'Get travel board',
   parameters: [
      {
         in: 'path',
         name: 'travelId',
         description: 'ID доски путешествий которую нужно получить',
         schema: {
            type: 'string',
            example: '5eca7e10fef55e253842a023',
         },
         required: true,
      },
   ],
   responses: {
      '200': {
         description: 'Возвращается доска путешествия',
         content: {
            'application/json': {
               schema: {
                  $ref: '#/components/schemas/Travel',
               },
               example: {
                  _id: '5eca7e10fef55e253842a023',
                  status: 'АКТИВНАЯ',
                  users: [
                     '5eb9af4dc82bd95234d9ccd6',
                     '5ec44464c82bd95234d9ccef',
                     '5ec44392c82bd95234d9ccee',
                     '5eb9a98ac82bd95234d9ccd4',
                  ],
                  cards: ['5eca7e5bfef55e253842a024'],
                  title: 'Полет на Марс',
                  beginDate: '2020-06-15T09:00:00.000Z',
                  endDate: '2020-06-24T09:00:00.000Z',
                  __v: 0,
               },
            },
         },
      },
      '500': {
         description: 'Произошла ошибка',
         content: {
            'applcation/json': {
               schema: {
                  type: 'object',
                  properties: {
                     ErrorMessage: {
                        type: 'string',
                        description: 'Описание ошибки',
                        example: "Unknown server error: can't read entry",
                     },
                  },
               },
            },
         },
      },
   },
}
const createTravel = {
   tags: ['travel'],
   summary: 'Create a travel board',
   requestBody: {
      required: true,
      content: {
         'application/json': {
            schema: {
               $ref: '#/components/schemas/Travel',
            },
            example: {
               title: "Russia Tour'2020",
               beginDate: '2020-06-11T10:00:00.000+00:00',
               endDate: '2020-06-30T20:00:00.000+00:00',
               status: 'АКТИВНАЯ',
               users: ['5eb9a98ac82bd95234d9ccd4'],
            },
         },
      },
   },
   responses: {
      '200': {
         description: 'Возвращается созданная карточка события',
         content: {
            'application/json': {
               schema: {
                  $ref: '#/components/schemas/Travel',
               },
               example: {
                  status: 'АКТИВНАЯ',
                  users: [
                     {
                        _id: '5eb9a98ac82bd95234d9ccd4',
                        nickName: 'testNickName',
                        avatar: '5ec83973231143d0263d84a6',
                     },
                  ],
                  cards: [],
                  _id: '5ec2628732d87634b0b0063b',
                  title: "Russia Tour'2020",
                  beginDate: '2020-06-11T10:00:00.000Z',
                  endDate: '2020-06-30T20:00:00.000Z',
                  __v: 0,
               },
            },
         },
      },
      '500': {
         description: 'Произошла ошибка',
         content: {
            'applcation/json': {
               schema: {
                  type: 'object',
                  properties: {
                     ErrorMessage: {
                        type: 'string',
                        description: 'Описание ошибки',
                        example: "Unknown server error: can't create entry",
                     },
                  },
               },
            },
         },
      },
   },
}
const updateTravel = {
   tags: ['travel'],
   summary: 'Update a travel board',
   requestBody: {
      required: true,
      content: {
         'application/json': {
            schema: {
               $ref: '#/components/schemas/Travel',
            },
            example: {
               status: 'АКТИВНАЯ',
               users: [
                  {
                     _id: '5eb9a98ac82bd95234d9ccd4',
                     nickName: 'testNickName',
                     avatar: '5ec83973231143d0263d84a6',
                  },
               ],
               cards: [],
               _id: '5ec2628732d87634b0b0063b',
               title: "Updated Russia Tour'2020",
               beginDate: '2020-06-11T10:00:00.000Z',
               endDate: '2020-06-30T20:00:00.000Z',
               __v: 0,
            },
         },
      },
   },
   responses: {
      '200': {
         description: 'Возвращается созданная карточка события',
         content: {
            'application/json': {
               schema: {
                  $ref: '#/components/schemas/Travel',
               },
               example: {
                  status: 'АКТИВНАЯ',
                  users: [
                     {
                        _id: '5eb9a98ac82bd95234d9ccd4',
                        nickName: 'testNickName',
                        avatar: '5ec83973231143d0263d84a6',
                     },
                  ],
                  cards: [],
                  _id: '5ec2628732d87634b0b0063b',
                  title: "Updated Russia Tour'2020",
                  beginDate: '2020-06-11T10:00:00.000Z',
                  endDate: '2020-06-30T20:00:00.000Z',
                  __v: 0,
               },
            },
         },
      },
      '500': {
         description: 'Произошла ошибка',
         content: {
            'applcation/json': {
               schema: {
                  type: 'object',
                  properties: {
                     ErrorMessage: {
                        type: 'string',
                        description: 'Описание ошибки',
                        example: "Unknown server error: can't update entry",
                     },
                  },
               },
            },
         },
      },
   },
}
const deleteTravel = {
   tags: ['travel'],
   summary: 'Delete travel board',
   parameters: [
      {
         in: 'path',
         name: 'travelId',
         description: 'ID доски путешествий которую удаляем',
         schema: {
            type: 'string',
            example: '5ec2628732d87634b0b0063b',
         },
         required: true,
      },
   ],
   responses: {
      '200': {
         description: 'Возвращается удаленная доска путешествий',
         content: {
            'application/json': {
               schema: {
                  $ref: '#/components/schemas/Travel',
               },
               example: {
                  status: 'АКТИВНАЯ',
                  users: [
                     {
                        _id: '5eb9a98ac82bd95234d9ccd4',
                        nickName: 'testNickName',
                        avatar: '5ec83973231143d0263d84a6',
                     },
                  ],
                  cards: [],
                  _id: '5ec2628732d87634b0b0063b',
                  title: "Updated Russia Tour'2020",
                  beginDate: '2020-06-11T10:00:00.000Z',
                  endDate: '2020-06-30T20:00:00.000Z',
                  __v: 0,
               },
            },
         },
      },
      '500': {
         description: 'Произошла ошибка',
         content: {
            'applcation/json': {
               schema: {
                  type: 'object',
                  properties: {
                     ErrorMessage: {
                        type: 'string',
                        description: 'Описание ошибки',
                        example: "Unknown server error: can't delete entry",
                     },
                  },
               },
            },
         },
      },
   },
}

const addUser = {
   tags: ['travel'],
   summary: 'add a new user to a travel board',
   requestBody: {
      required: true,
      content: {
         'application/json': {
            schema: {
               type: 'object',
               properties: {
                  travelId: {
                     type: 'string',
                     description: 'ID доски путешествия в которую добавляем пользователя',
                     example: '5ec9a738d516e519210bbf0a',
                     required: true,
                  },
                  userId: {
                     type: 'string',
                     description: 'ID пользователя, которого добавляем на доску путешествия',
                     example: '5eb9af4dc82bd95234d9ccd6',
                     required: true,
                  },
               },
            },
            example: {
               travelId: '5ec9a738d516e519210bbf0a',
               userId: '5eb9af4dc82bd95234d9ccd6',
            },
         },
      },
   },
   responses: {
      '200': {
         description: 'Возвращается обновленная доска путешествия',
         content: {
            'application/json': {
               schema: {
                  $ref: '#/components/schemas/Travel',
               },
               example: {
                  _id: '5ec9a738d516e519210bbf0a',
                  status: 'АКТИВНАЯ',
                  users: ['5eb9a98ac82bd95234d9ccd4', '5eb9af4dc82bd95234d9ccd6'],
                  cards: ['5eca94d2b8f7f53bf4179cb5'],
                  title: 'only for you',
                  beginDate: '2020-06-08T09:00:00.000Z',
                  endDate: '2020-06-16T09:00:00.000Z',
                  __v: 0,
               },
            },
         },
      },
      '500': {
         description: 'Произошла ошибка',
         content: {
            'applcation/json': {
               schema: {
                  type: 'object',
                  properties: {
                     ErrorMessage: {
                        type: 'string',
                        description: 'Описание ошибки',
                        example: "Unknown server error: can't create entry",
                     },
                  },
               },
            },
         },
      },
   },
}
const removeUser = {
   tags: ['travel'],
   summary: 'remove user from a travel board',
   requestBody: {
      required: true,
      content: {
         'application/json': {
            schema: {
               type: 'object',
               properties: {
                  travelId: {
                     type: 'string',
                     description: 'ID доски путешествия с которой удаляем пользователя',
                     example: '5ec9a738d516e519210bbf0a',
                     required: true,
                  },
                  userId: {
                     type: 'string',
                     description: 'ID пользователя, которого удаляем с доски путешествия',
                     example: '5eb9af4dc82bd95234d9ccd6',
                     required: true,
                  },
               },
            },
            example: {
               travelId: '5ec9a738d516e519210bbf0a',
               userId: '5eb9af4dc82bd95234d9ccd6',
            },
         },
      },
   },
   responses: {
      '200': {
         description: 'Возвращается обновленная доска путешествия',
         content: {
            'application/json': {
               schema: {
                  $ref: '#/components/schemas/Travel',
               },
               example: {
                  _id: '5ec9a738d516e519210bbf0a',
                  status: 'АКТИВНАЯ',
                  users: ['5eb9a98ac82bd95234d9ccd4'],
                  cards: ['5eca94d2b8f7f53bf4179cb5'],
                  title: 'only for you',
                  beginDate: '2020-06-08T09:00:00.000Z',
                  endDate: '2020-06-16T09:00:00.000Z',
                  __v: 0,
               },
            },
         },
      },
      '500': {
         description: 'Произошла ошибка',
         content: {
            'applcation/json': {
               schema: {
                  type: 'object',
                  properties: {
                     ErrorMessage: {
                        type: 'string',
                        description: 'Описание ошибки',
                        example: "Unknown server error: can't create entry",
                     },
                  },
               },
            },
         },
      },
   },
}

module.exports = {
   getTravel,
   createTravel,
   updateTravel,
   deleteTravel,
   addUser,
   removeUser,
}
