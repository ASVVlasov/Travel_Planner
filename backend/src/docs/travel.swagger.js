const getTravel = {
   tags: ['developers'],
   summary: 'Get travel board',
   parameters: [
      {
         in: 'path',
         name: 'travelId',
         description: 'ID доски путешествий которую нужно получить',
         schema: {
            type: 'string',
            example: '5eb7eb4651385a1e081ec3ab',
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
                  allOf: [
                     {
                        $ref: '#/components/schemas/Travel',
                     },
                     {
                        type: 'object',
                        properties: {
                           users: {
                              type: 'array',
                              items: {
                                 type: 'object',
                                 properties: {
                                    _id: {
                                       type: 'string',
                                    },
                                    nickname: {
                                       type: 'string',
                                    },
                                    avatar: {
                                       $ref: '#/components/schemas/File',
                                    },
                                 },
                              },
                           },
                        },
                     },
                  ],
               },
               example: {
                  _id: '11111b4651385a1e08000000',
                  title: 'Нужная доска путешествий',
                  beginDate: '2020-05-15T10:00:00.000+00:00',
                  endDate: '2020-05-25T10:00:00.000+00:00',
                  status: 'АКТИВНАЯ',
                  userIds: ['5eb56d8691de72f427b9e8bd'],
                  users: [
                     {
                        _id: '5eb56d8691de72f427b9e8bd',
                        nickName: 'Василий',
                        avatar: {
                           _id: '5eb56d8691de72f427b11111',
                           originalName: 'Лицо.jpg',
                           uploadName: 'ba35f0e9722a20993ccf034dfbebfc19.jpg',
                        },
                     },
                  ],
                  cards: [
                     {
                        _id: '11111b4651385a1e08111111',
                        title: 'Первая карта',
                        type: 'Проживание',
                        description: '',
                        comment: '',
                        cost: 0,
                        categoryId: '',
                        beginDate: '2020-05-15T10:00:00.000+00:00',
                        endDate: '2020-05-25T10:00:00.000+00:00',
                        beginPoint: 'Москва',
                        endPoint: '',
                        company: '',
                        userIds: ['5eb56d8691de72f427b9e8bd'],
                        payerId: '',
                        fileIds: [],
                     },
                     {
                        _id: '22222b4651385a1e08122222',
                        title: 'Еще одна карта',
                        type: 'Транспорт',
                        description: 'Тест',
                        comment: '',
                        cost: 1000,
                        categoryId: '',
                        beginDate: '2020-05-15T10:00:00.000+00:00',
                        endDate: '2020-05-18T10:00:00.000+00:00',
                        beginPoint: 'Москва',
                        endPoint: 'Санкт-Петербург',
                        company: 'SIXT',
                        userIds: ['5eb56d8691de72f427b9e8bd'],
                        payerId: '5eb56d8691de72f427b9e8bd',
                        fileIds: ['5eb56d8691de72f427b11111'],
                     },
                  ],
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
const getCategoryInTravel = {
   tags: ['developers'],
   summary: 'Get travel board with tabs of card categories',
   parameters: [
      {
         in: 'path',
         name: 'cardType',
         description: 'Тип карточек, которые возвращаются пользователю',
         schema: {
            type: 'string',
            example: 'ACCOMODATION',
         },
         required: true,
      },
      {
         in: 'path',
         name: 'travelId',
         description: 'ID доски путешествий с которой нужно получить карточки',
         schema: {
            type: 'string',
            example: '5eb7eb4651385a1e081ec3ab',
         },
         required: true,
      },
   ],
   responses: {
      '200': {
         description: 'Возвращается доска путешествия с карточками определенного типа и вкладками',
         content: {
            'application/json': {
               schema: {
                  allOf: [
                     {
                        $ref: '#/components/schemas/Travel',
                     },
                     {
                        type: 'object',
                        properties: {
                           users: {
                              type: 'array',
                              items: {
                                 type: 'object',
                                 properties: {
                                    _id: {
                                       type: 'string',
                                    },
                                    nickname: {
                                       type: 'string',
                                    },
                                    avatar: {
                                       $ref: '#/components/schemas/File',
                                    },
                                 },
                              },
                           },
                           tabs: {
                              type: 'array',
                              items: {
                                 type: 'object',
                                 properties: {
                                    _id: {
                                       type: 'string',
                                       description: 'Category ID. Для первого элемента - отсутствует',
                                    },
                                    title: {
                                       type: 'string',
                                       description: 'Category Title',
                                    },
                                    cards: {
                                       $ref: '#/components/schemas/Card',
                                    },
                                 },
                              },
                           },
                        },
                     },
                  ],
               },
               example: {
                  _id: '5eb56d4d771522c070eb3f6f',
                  title: 'Евротур 2021',
                  beginDate: '2020-05-15T10:00:00.000Z',
                  endDate: '2020-05-25T10:00:00.000Z',
                  userIds: ['5eb56d8691de72f427b9e8bd'],
                  users: [
                     {
                        _id: '5eb56d8691de72f427b9e8bd',
                        avatar: null,
                        nickName: 'testNick',
                     },
                  ],
                  tabs: [
                     {
                        _id: '5eb5b57bc148b72344978627',
                        title: 'Авто',
                        cards: [
                           {
                              description: '',
                              comment: 'комментарий',
                              cost: 0,
                              isDone: false,
                              userIds: ['5eb56d8691de72f427b9e8bd'],
                              fileIds: ['5eb677699e62010561d1ac20'],
                              beginDate: '2020-05-15T12:00:00.000Z',
                              endDate: '2020-05-25T12:00:00.000Z',
                              beginPoint: 'Прага',
                              endPoint: 'Дублин',
                              company: 'DXC tehnology',
                              payerId: '5eb56d8691de72f427b9e8bd',
                              _id: '5eb48cfe425253ab8f4f1186',
                              title: 'Машина',
                              type: 'Транспорт',
                              categoryId: '5eb5b57bc148b72344978627',
                              files: [
                                 {
                                    _id: '5eb677699e62010561d1ac20',
                                    originalName: 'Бронь.pdf',
                                    uploadName: 'ba35f0e9722a20993ccf034dfbebfc19.pdf',
                                    __v: '0',
                                 },
                              ],
                              users: [
                                 {
                                    _id: '5eb56d8691de72f427b9e8bd',
                                    avatar: null,
                                    nickName: 'testNick',
                                 },
                              ],
                              category: {
                                 _id: '5eb5b57bc148b72344978627',
                                 title: 'Авто',
                              },
                           },
                        ],
                     },
                     {
                        _id: '5eb5b587c148b72344978628',
                        title: 'Авиа',
                        cards: [
                           {
                              description: '',
                              comment: '',
                              cost: 0,
                              isDone: false,
                              userIds: [],
                              fileIds: [],
                              _id: '5eb48cfe425253ab8f4f1187',
                              title: 'Самолет',
                              type: 'Транспорт',
                              categoryId: '5eb5b587c148b72344978628',
                              files: [],
                              users: [],
                              category: {
                                 _id: '5eb5b587c148b72344978628',
                                 title: 'Авиа',
                              },
                           },
                        ],
                     },
                     {
                        _id: '5eb5b55cc148b72344978626',
                        title: 'Поезда',
                        cards: [
                           {
                              description: '',
                              comment: '',
                              cost: null,
                              isDone: false,
                              userIds: [],
                              fileIds: [],
                              _id: '5eb5b4c1c148b72344978625',
                              title: 'Поезд',
                              type: 'Транспорт',
                              categoryId: '5eb5b55cc148b72344978626',
                              files: [],
                              users: [],
                              category: {
                                 _id: '5eb5b55cc148b72344978626',
                                 title: 'Поезда',
                              },
                           },
                        ],
                     },
                     {
                        title: 'Транспорт',
                        cards: [
                           {
                              description: '',
                              comment: 'комментарий',
                              cost: 0,
                              isDone: false,
                              userIds: ['5eb56d8691de72f427b9e8bd'],
                              fileIds: ['5eb677699e62010561d1ac20'],
                              beginDate: '2020-05-15T12:00:00.000Z',
                              endDate: '2020-05-25T12:00:00.000Z',
                              beginPoint: 'Прага',
                              endPoint: 'Дублин',
                              company: 'DXC tehnology',
                              payerId: '5eb56d8691de72f427b9e8bd',
                              _id: '5eb48cfe425253ab8f4f1186',
                              title: 'Машина',
                              type: 'Транспорт',
                              categoryId: '5eb5b57bc148b72344978627',
                              files: [
                                 {
                                    _id: '5eb677699e62010561d1ac20',
                                    originalName: 'Бронь.pdf',
                                    uploadName: 'ba35f0e9722a20993ccf034dfbebfc19.pdf',
                                    __v: '0',
                                 },
                              ],
                              users: [
                                 {
                                    _id: '5eb56d8691de72f427b9e8bd',
                                    avatar: null,
                                    nickName: 'testNick',
                                 },
                              ],
                              category: {
                                 _id: '5eb5b57bc148b72344978627',
                                 title: 'Авто',
                              },
                           },
                           {
                              description: '',
                              comment: '',
                              cost: 0,
                              isDone: false,
                              userIds: [],
                              fileIds: [],
                              _id: '5eb48cfe425253ab8f4f1187',
                              title: 'Самолет',
                              type: 'Транспорт',
                              categoryId: '5eb5b587c148b72344978628',
                              files: [],
                              users: [],
                              category: {
                                 _id: '5eb5b587c148b72344978628',
                                 title: 'Авиа',
                              },
                           },
                           {
                              description: '',
                              comment: '',
                              cost: null,
                              isDone: false,
                              userIds: [],
                              fileIds: [],
                              _id: '5eb5b4c1c148b72344978625',
                              title: 'Поезд',
                              type: 'Транспорт',
                              categoryId: '5eb5b55cc148b72344978626',
                              files: [],
                              users: [],
                              category: {
                                 _id: '5eb5b55cc148b72344978626',
                                 title: 'Поезда',
                              },
                           },
                        ],
                     },
                  ],
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
   tags: ['developers'],
   summary: 'Create a travel board',
   requestBody: {
      required: true,
      content: {
         'application/json': {
            schema: {
               $ref: '#/components/schemas/Travel',
            },
            example: {
               title: 'Новая доска путешествий',
               beginDate: '2020-05-15T10:00:00.000+00:00',
               endDate: '2020-05-25T10:00:00.000+00:00',
               userIds: ['5eb56d8691de72f427b9e8bd'],
               cards: [],
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
                  _id: '5eb56d8691de72f427b22222',
                  title: 'Новая доска путешествий',
                  beginDate: '2020-05-15T10:00:00.000+00:00',
                  endDate: '2020-05-25T10:00:00.000+00:00',
                  userIds: ['5eb56d8691de72f427b9e8bd'],
                  cards: [],
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
   tags: ['developers'],
   summary: 'Update a travel board',
   requestBody: {
      required: true,
      content: {
         'application/json': {
            schema: {
               $ref: '#/components/schemas/Travel',
            },
            example: {
               _id: '5eb56d8691de72f427b22222',
               title: 'Новое название доскм',
               beginDate: '2020-05-15T10:00:00.000+00:00',
               endDate: '2020-05-25T10:00:00.000+00:00',
               userIds: ['5eb56d8691de72f427b9e8bd'],
               cards: [
                  {
                     _id: '11111b4651385a1e08111111',
                     title: 'Нужная карта',
                     type: 'Проживание',
                     description: '',
                     comment: '',
                     cost: 0,
                     categoryId: '',
                     beginDate: '2020-05-15T10:00:00.000+00:00',
                     endDate: '2020-05-25T10:00:00.000+00:00',
                     beginPoint: 'Москва',
                     endPoint: '',
                     company: '',
                     userIds: ['5eb56d8691de72f427b9e8bd'],
                     payerId: '',
                     fileIds: [],
                  },
               ],
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
                  _id: '5eb56d8691de72f427b22222',
                  title: 'Новое название доскм',
                  beginDate: '2020-05-15T10:00:00.000+00:00',
                  endDate: '2020-05-25T10:00:00.000+00:00',
                  userIds: ['5eb56d8691de72f427b9e8bd'],
                  cards: [
                     {
                        _id: '11111b4651385a1e08111111',
                        title: 'Нужная карта',
                        type: 'Проживание',
                        description: '',
                        comment: '',
                        cost: 0,
                        categoryId: '',
                        beginDate: '2020-05-15T10:00:00.000+00:00',
                        endDate: '2020-05-25T10:00:00.000+00:00',
                        beginPoint: 'Москва',
                        endPoint: '',
                        company: '',
                        userIds: ['5eb56d8691de72f427b9e8bd'],
                        payerId: '',
                        fileIds: [],
                     },
                  ],
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
   tags: ['developers'],
   summary: 'Delete travel board',
   parameters: [
      {
         in: 'path',
         name: 'travelId',
         description: 'ID доски путешествий которую удаляем',
         schema: {
            type: 'string',
            example: '5eb7eb4651385a1e081ec3ab',
         },
         required: true,
      },
   ],
   responses: {
      '200': {
         description: 'Возвращается объект Mongo',
         content: {
            'application/json': {
               schema: {
                  type: 'object',
               },
               example: {},
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

module.exports = {
   getTravel,
   getCategoryInTravel,
   createTravel,
   updateTravel,
   deleteTravel,
}
