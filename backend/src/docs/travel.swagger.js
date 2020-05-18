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
                  $ref: '#/components/schemas/Travel',
               },
               example: {
                  status: 'АКТИВНАЯ',
                  users: [
                     {
                        _id: '5eb9a98ac82bd95234d9ccd4',
                        nickName: 'testNickName',
                     },
                     {
                        _id: '5eb9af4dc82bd95234d9ccd6',
                        nickName: 'testContactNickName',
                     },
                  ],
                  cards: [
                     {
                        description: '',
                        comment: 'комментарий',
                        cost: 26000,
                        isDone: false,
                        users: [
                           {
                              _id: '5eb9a98ac82bd95234d9ccd4',
                              nickName: 'testNickName',
                           },
                           {
                              _id: '5eb9af4dc82bd95234d9ccd6',
                              nickName: 'testContactNickName',
                           },
                        ],
                        payers: [
                           {
                              isPayer: false,
                              hasPayed: true,
                              _id: '5ebf24eac82bd95234d9ccde',
                              user: {
                                 _id: '5eb9af4dc82bd95234d9ccd6',
                                 nickName: 'testContactNickName',
                              },
                              cardId: '5ebb30dbdf7aba4f1516e8c4',
                           },
                           {
                              isPayer: false,
                              hasPayed: true,
                              _id: '5ebf2496c82bd95234d9ccdd',
                              user: {
                                 _id: '5eb9a98ac82bd95234d9ccd4',
                                 nickName: 'testNickName',
                              },
                              cardId: '5ebb30dbdf7aba4f1516e8c4',
                           },
                        ],
                        files: [
                           {
                              _id: '5ec195ded0a25023cc723e1b',
                              originalName: 'Icecat1-300x300.png',
                              uploadName: '15044af435c164217b482ebff24f844e.png',
                              __v: 0,
                           },
                           {
                              _id: '5ec1c4f5e7fe8900173b745a',
                              originalName: 'упражнение для глаз.png',
                              uploadName: 'a2ff74c208c76f5efd215e265924724f.png',
                              __v: 0,
                           },
                        ],
                        _id: '5ebb30dbdf7aba4f1516e8c4',
                        title: 'Перелет',
                        company: 'Аэрофлот',
                        beginPoint: 'Москва, Шереметьево',
                        beginDate: '2020-06-24T08:20:00.000Z',
                        endPoint: 'Прага',
                        endDate: '2020-06-24T10:30:00.000Z',
                        type: 'Транспорт',
                        category: {
                           _id: '5eb9a935c82bd95234d9ccd3',
                           title: 'Авто',
                        },
                        travelId: '5eb9a8ae468c2a28eb4220f0',
                        __v: 3,
                     },
                     {
                        description:
                           'Поля users, payers, files будут проигнорированы. Для них предусмотрены отдельные роуты в API',
                        comment: 'Свежий комментарий',
                        cost: 0,
                        isDone: false,
                        users: [
                           {
                              _id: '5eb9a98ac82bd95234d9ccd4',
                              nickName: 'testNickName',
                           },
                           {
                              _id: '5eb9af4dc82bd95234d9ccd6',
                              nickName: 'testContactNickName',
                           },
                        ],
                        payers: [
                           {
                              isPayer: false,
                              hasPayed: false,
                              _id: '5ec18065065afe20ec2587de',
                              user: {
                                 _id: '5eb9a98ac82bd95234d9ccd4',
                                 nickName: 'testNickName',
                              },
                              cardId: '5ec15e0815e6cb257867d880',
                              __v: 0,
                           },
                           {
                              isPayer: false,
                              hasPayed: false,
                              _id: '5ec244c280945b0c74de8e04',
                              user: {
                                 _id: '5eb9af4dc82bd95234d9ccd6',
                                 nickName: 'testContactNickName',
                              },
                              cardId: '5ec15e0815e6cb257867d880',
                              __v: 0,
                           },
                        ],
                        files: [
                           {
                              _id: '5ec238be13f9ca15342963ee',
                              originalName: 'task.txt',
                              uploadName: '51523c2a8de472766846e0b83b75be44.txt',
                              __v: 0,
                           },
                        ],
                        _id: '5ec15e0815e6cb257867d880',
                        travelId: '5eb9a8ae468c2a28eb4220f0',
                        title: 'Test card API(create)',
                        type: 'Проживание',
                        __v: 4,
                     },
                     {
                        description: '',
                        comment: '',
                        cost: 150000,
                        isDone: false,
                        users: [],
                        payers: [],
                        files: [
                           {
                              _id: '5ec1c132934ca30017c4a89e',
                              originalName: 'image-5479-1565031759-800x450.jpg',
                              uploadName: 'e69b3dff25552e1a3e9156765e9cfacf.jpg',
                              __v: 0,
                           },
                        ],
                        _id: '5ec1c059934ca30017c4a89d',
                        travelId: '5eb9a8ae468c2a28eb4220f0',
                        type: 'Транспорт',
                        title: 'Mustang',
                        company: 'Ford',
                        beginPoint: 'San-Francisco',
                        beginDate: '2020-08-01T10:51:06.000Z',
                        endPoint: 'Los Angeles',
                        endDate: '2020-08-01T22:51:06.000Z',
                        __v: 0,
                     },
                     {
                        description: '',
                        comment: '',
                        cost: 0,
                        isDone: false,
                        users: [],
                        payers: [],
                        files: [
                           {
                              _id: '5ec1c6b0e7fe8900173b745c',
                              originalName: 'view.pic',
                              uploadName: '42ceea525c8fbb3b5a71a3bb321e2ba3.pic',
                              __v: 0,
                           },
                        ],
                        _id: '5ec1c5c610d1dbe5af30bd81',
                        travelId: '5eb9a8ae468c2a28eb4220f0',
                        type: 'Проживание',
                        title: 'Кто удаляет мой шалаш? :(',
                        company: 'Under The Bridge',
                        beginPoint: 'Москва',
                        beginDate: '2020-05-17T17:16:09.000Z',
                        endPoint: '',
                        endDate: '2020-05-17T17:16:09.000Z',
                        __v: 0,
                     },
                     {
                        description: '',
                        comment: '',
                        cost: 0,
                        isDone: false,
                        users: [
                           {
                              _id: '5eb9a98ac82bd95234d9ccd4',
                              nickName: 'testNickName',
                           },
                        ],
                        payers: [
                           {
                              isPayer: false,
                              hasPayed: false,
                              _id: '5ec24732e5129d30d86200cd',
                              user: {
                                 _id: '5eb9a98ac82bd95234d9ccd4',
                                 nickName: 'testNickName',
                              },
                              cardId: '5ec24731e5129d30d86200cc',
                              __v: 0,
                           },
                        ],
                        files: [],
                        _id: '5ec24731e5129d30d86200cc',
                        travelId: '5eb9a8ae468c2a28eb4220f0',
                        title: 'Test card API(new card)',
                        type: 'Проживание',
                        __v: 0,
                     },
                  ],
                  _id: '5eb9a8ae468c2a28eb4220f0',
                  beginDate: '2020-05-15T12:00:00.000Z',
                  title: 'Евротур 2021',
                  endDate: '2020-05-20T12:00:00.000Z',
                  __v: 4,
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
            example: '5ec2653a853e953768af390f',
         },
         required: true,
      },
   ],
   responses: {
      '200': {
         description: 'Возвращается объект с полем message',
         content: {
            'application/json': {
               schema: {
                  type: 'object',
               },
               example: {
                  message: 'travel board deleted',
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

module.exports = {
   getTravel,
   createTravel,
   updateTravel,
   deleteTravel,
}
