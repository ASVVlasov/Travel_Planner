const uploadFile = {
   tags: ['card'],
   summary: 'Uploads file to server and attach it to a card',
   requestBody: {
      required: true,
      content: {
         'multipart/form-data': {
            schema: {
               type: 'object',
               properties: {
                  cardId: {
                     type: 'string',
                     description: 'ID карты, к которой прикрепляется файл',
                     example: '5ec15e0815e6cb257867d880',
                  },
                  file: {
                     type: 'string',
                     format: 'binary',
                     description: 'Прикрепляемый файл',
                  },
               },
            },
         },
      },
   },
   responses: {
      '200': {
         description: 'Файл успешно прикреплен. Возвращается обновленная карточка события',
         content: {
            'application/json': {
               schema: {
                  $ref: '#/components/schemas/Card',
               },
               example: {
                  description: '',
                  comment: 'Свежий комментарий',
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
                        _id: '5ec18065065afe20ec2587de',
                        user: {
                           _id: '5eb9a98ac82bd95234d9ccd4',
                           nickName: 'testNickName',
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
                        example: "Unknown server error: can't upload file",
                     },
                  },
               },
            },
         },
      },
   },
}
const downloadFile = {
   tags: ['card'],
   summary: 'Download file from server',
   parameters: [
      {
         in: 'path',
         name: 'fileName',
         description: 'Имя файла, которое используется на сервере(uploadName)',
         schema: {
            type: 'string',
            example: '51523c2a8de472766846e0b83b75be44.txt',
         },
         required: true,
      },
   ],
   responses: {
      '200': {
         description: 'Начинается загрузка файла',
         content: {
            '*/*': {
               type: 'string',
               format: 'base64',
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
                        example: "Unknown server error: can't upload file",
                     },
                  },
               },
            },
         },
      },
   },
}
const deleteFile = {
   tags: ['card'],
   summary: 'Drop file from server and deattach it from a card',
   requestBody: {
      required: true,
      content: {
         'application/json': {
            schema: {
               type: 'object',
               properties: {
                  cardId: {
                     type: 'string',
                     description: 'ID карты, к которой прикрепляется файл',
                     example: '5ec15e0815e6cb257867d880',
                  },
                  fileId: {
                     type: 'string',
                     description: 'ID файла, который собираемся удалить',
                     example: '5ec238be13f9ca15342963ee',
                  },
               },
            },
         },
      },
   },
   responses: {
      '200': {
         description: 'Файл успешно удален. Возвращается обновленная карточка события',
         content: {
            'application/json': {
               schema: {
                  $ref: '#/components/schemas/Card',
               },
               example: {
                  description: '',
                  comment: 'Свежий комментарий',
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
                        _id: '5ec18065065afe20ec2587de',
                        user: {
                           _id: '5eb9a98ac82bd95234d9ccd4',
                           nickName: 'testNickName',
                        },
                        cardId: '5ec15e0815e6cb257867d880',
                        __v: 0,
                     },
                  ],
                  files: [],
                  _id: '5ec15e0815e6cb257867d880',
                  travelId: '5eb9a8ae468c2a28eb4220f0',
                  title: 'Test card API(create)',
                  type: 'Проживание',
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
                        example: "Unknown server error: can't drop file",
                     },
                  },
               },
            },
         },
      },
   },
}
const addPayer = {
   tags: ['card'],
   summary: 'Add new payer to card',
   requestBody: {
      required: true,
      content: {
         'application/json': {
            schema: {
               type: 'object',
               properties: {
                  cardId: {
                     type: 'string',
                     description: 'ID карточки в которую добавляем пользователя',
                     example: '5ec15e0815e6cb257867d880',
                     required: true,
                  },
                  userId: {
                     type: 'string',
                     description: 'ID пользователя, которого добавляем на карточку',
                     example: '5eb9af4dc82bd95234d9ccd6',
                     required: true,
                  },
               },
            },
         },
      },
   },
   responses: {
      '200': {
         description: 'Возвращается обновленная карточка события',
         content: {
            'application/json': {
               schema: {
                  $ref: '#/components/schemas/Card',
               },
               example: {
                  description: '',
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
const removePayer = {
   tags: ['card'],
   summary: 'Remove payer from card',
   requestBody: {
      required: true,
      content: {
         'application/json': {
            schema: {
               type: 'object',
               properties: {
                  cardId: {
                     type: 'string',
                     description: 'ID карточки в которую добавляем пользователя',
                     example: '5ec15e0815e6cb257867d880',
                     required: true,
                  },
                  userId: {
                     type: 'string',
                     description: 'ID пользователя, которого добавляем на карточку',
                     example: '5eb9af4dc82bd95234d9ccd6',
                     required: true,
                  },
               },
            },
         },
      },
   },
   responses: {
      '200': {
         description: 'Возвращается обновленная карточка события',
         content: {
            'application/json': {
               schema: {
                  $ref: '#/components/schemas/Card',
               },
               example: {
                  description: '',
                  comment: 'Свежий комментарий',
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
                        _id: '5ec18065065afe20ec2587de',
                        user: {
                           _id: '5eb9a98ac82bd95234d9ccd4',
                           nickName: 'testNickName',
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
const createCard = {
   tags: ['card'],
   summary: 'Create card on travel board',
   requestBody: {
      required: true,
      content: {
         'application/json': {
            schema: {
               $ref: '#/components/schemas/Card',
            },
            example: {
               travelId: '5eb9a8ae468c2a28eb4220f0',
               users: ['5eb9a98ac82bd95234d9ccd4', '5eb9af4dc82bd95234d9ccd6'],
               title: 'Test card API(new card)',
               type: 'Проживание',
               description: 'Пользователей должно быть не меньше одного, а так - сколько угодно',
               comment: 'Остальные поля заполнять не обязательно, приведены для примера',
               cost: 300,
               category: '5eb9a90dc82bd95234d9ccd1',
               beginDate: '2020-05-15T10:00:00.000+00:00',
               endDate: '2020-05-15T10:00:00.000+00:00',
               beginPoint: 'Начальная точка',
               endPoint: 'Конечная точка',
               company: 'SIXT',
               isDone: false,
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
                  $ref: '#/components/schemas/Card',
               },
               example: {
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
const getCard = {
   tags: ['card'],
   summary: 'Get card from travel board',
   parameters: [
      {
         in: 'path',
         name: 'cardId',
         description: 'ID карточки которую нужно получить',
         schema: {
            type: 'string',
            example: '5ec15e0815e6cb257867d880',
         },
         required: true,
      },
   ],
   responses: {
      '200': {
         description: 'Возвращается карточка события',
         content: {
            'application/json': {
               schema: {
                  $ref: '#/components/schemas/Card',
               },
               example: {
                  description: '',
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
   tags: ['card'],
   summary: 'Get travel board with tabs of card categories',
   parameters: [
      {
         in: 'path',
         name: 'cardType',
         description: 'Тип карточек, которые возвращаются пользователю',
         schema: {
            type: 'string',
            example: 'TRANSPORT',
         },
         required: true,
      },
      {
         in: 'path',
         name: 'travelId',
         description: 'ID доски путешествий с которой нужно получить карточки',
         schema: {
            type: 'string',
            example: '5eb9a8ae468c2a28eb4220f0',
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
                  type: 'array',
                  items: {
                     type: 'object',
                     properties: {
                        _id: {
                           type: 'string',
                           description: 'ID категории карточек, для первого элемента - all',
                        },
                        title: {
                           type: 'string',
                           description: 'Описание категории карточки, для первого элемента - название типа карточек',
                        },
                        cards: {
                           type: 'array',
                           items: {
                              $ref: '#/components/schemas/Card',
                           },
                        },
                     },
                  },
               },
               example: [
                  {
                     _id: 'all',
                     title: 'Транспорт',
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
                           description: '',
                           comment: 'межконтинентальные переезды )',
                           cost: 60000,
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
                                 isPayer: true,
                                 hasPayed: false,
                                 _id: '5ebf96eec82bd95234d9cce3',
                                 user: {
                                    _id: '5eb9a98ac82bd95234d9ccd4',
                                    nickName: 'testNickName',
                                 },
                                 cardId: '5ebe888ba7084db6560f3d4a',
                              },
                              {
                                 isPayer: false,
                                 hasPayed: false,
                                 _id: '5ebf9722c82bd95234d9cce4',
                                 user: {
                                    _id: '5eb9af4dc82bd95234d9ccd6',
                                    nickName: 'testContactNickName',
                                 },
                                 cardId: '5ebe888ba7084db6560f3d4a',
                              },
                           ],
                           files: [
                              {
                                 _id: '5ec1657453a6cbaf66c8b9ef',
                                 originalName: 'pJU40pkypVw.jpg',
                                 uploadName: 'a38ffce0bc0ec00af98d6d512dd6b879.jpg',
                                 __v: 0,
                              },
                              {
                                 _id: '5ec1c07f10d1dbe5af30bd80',
                                 originalName: 'Ammd85InFwo.jpg',
                                 uploadName: '5eb8a24ec4e48f23d9a13992e8cd8984.jpg',
                                 __v: 0,
                              },
                           ],
                           _id: '5ebe888ba7084db6560f3d4a',
                           title: 'Chevrolet Camaro',
                           company: 'Sixt',
                           beginPoint: 'Прага',
                           beginDate: '2020-06-23T05:20:00.000Z',
                           endPoint: 'Нью-Йорк',
                           endDate: '2020-07-23T07:30:00.000Z',
                           type: 'Транспорт',
                           category: {
                              _id: '5eb9a935c82bd95234d9ccd3',
                              title: 'Авто',
                           },
                           travelId: '5eb9a8ae468c2a28eb4220f0',
                           __v: 2,
                        },
                        {
                           description: '',
                           comment: 'поездки с риском для жизни!',
                           cost: 1800,
                           isDone: false,
                           users: [],
                           payers: [],
                           files: [],
                           _id: '5ec03805101ad83979e1b8ec',
                           type: 'Транспорт',
                           title: 'ДжихадТакси',
                           company: 'Uber',
                           beginPoint: 'Аэропорт',
                           beginDate: '2020-05-16T15:58:08.000Z',
                           endPoint: 'Куда дорогу покажешь',
                           endDate: '2020-05-16T15:58:08.000Z',
                           travelId: '5eb9a8ae468c2a28eb4220f0',
                           __v: 0,
                        },
                        {
                           description: '',
                           comment: 'в полночь превратится в тыкву - иметь в виду!',
                           cost: 7,
                           isDone: false,
                           users: [],
                           payers: [],
                           files: [],
                           _id: '5ec0479c675b4344b9e3cc47',
                           type: 'Транспорт',
                           title: 'Карета v3',
                           company: 'Midnight miracle',
                           beginPoint: 'Дом злой мачехи',
                           beginDate: '2020-05-16T14:05:12.000Z',
                           endPoint: 'Бал',
                           endDate: '2020-05-16T14:05:12.000Z',
                           travelId: '5eb9a8ae468c2a28eb4220f0',
                           __v: 0,
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
                     ],
                  },
                  {
                     _id: '5eb9a935c82bd95234d9ccd3',
                     title: 'Авто',
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
                           description: '',
                           comment: 'межконтинентальные переезды )',
                           cost: 60000,
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
                                 isPayer: true,
                                 hasPayed: false,
                                 _id: '5ebf96eec82bd95234d9cce3',
                                 user: {
                                    _id: '5eb9a98ac82bd95234d9ccd4',
                                    nickName: 'testNickName',
                                 },
                                 cardId: '5ebe888ba7084db6560f3d4a',
                              },
                              {
                                 isPayer: false,
                                 hasPayed: false,
                                 _id: '5ebf9722c82bd95234d9cce4',
                                 user: {
                                    _id: '5eb9af4dc82bd95234d9ccd6',
                                    nickName: 'testContactNickName',
                                 },
                                 cardId: '5ebe888ba7084db6560f3d4a',
                              },
                           ],
                           files: [
                              {
                                 _id: '5ec1657453a6cbaf66c8b9ef',
                                 originalName: 'pJU40pkypVw.jpg',
                                 uploadName: 'a38ffce0bc0ec00af98d6d512dd6b879.jpg',
                                 __v: 0,
                              },
                              {
                                 _id: '5ec1c07f10d1dbe5af30bd80',
                                 originalName: 'Ammd85InFwo.jpg',
                                 uploadName: '5eb8a24ec4e48f23d9a13992e8cd8984.jpg',
                                 __v: 0,
                              },
                           ],
                           _id: '5ebe888ba7084db6560f3d4a',
                           title: 'Chevrolet Camaro',
                           company: 'Sixt',
                           beginPoint: 'Прага',
                           beginDate: '2020-06-23T05:20:00.000Z',
                           endPoint: 'Нью-Йорк',
                           endDate: '2020-07-23T07:30:00.000Z',
                           type: 'Транспорт',
                           category: {
                              _id: '5eb9a935c82bd95234d9ccd3',
                              title: 'Авто',
                           },
                           travelId: '5eb9a8ae468c2a28eb4220f0',
                           __v: 2,
                        },
                     ],
                  },
               ],
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

const updateCard = {
   tags: ['card'],
   summary: 'Update card on travel board',
   requestBody: {
      required: true,
      content: {
         'application/json': {
            schema: {
               type: 'object',
               properties: {
                  card: {
                     $ref: '#/components/schemas/Card',
                  },
               },
            },
            example: {
               _id: '5ec15e0815e6cb257867d880',
               description:
                  'Поля users, payers, files будут проигнорированы. Для них предусмотрены отдельные роуты в API',
               comment: 'Свежий комментарий',
               cost: 0,
               isDone: false,
               users: ['5eb9a98ac82bd95234d9ccd4'],
               payers: ['5ec18065065afe20ec2587de'],
               files: [],
               travelId: '5eb9a8ae468c2a28eb4220f0',
               title: 'Test card API(create)',
               type: 'Проживание',
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
                  $ref: '#/components/schemas/Card',
               },
               example: {
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
const deleteCard = {
   tags: ['card'],
   summary: 'Delete card from travel board',
   parameters: [
      {
         in: 'path',
         name: 'cardId',
         description: 'ID карточки которую нужно удалить',
         schema: {
            type: 'string',
            example: '5ec24731e5129d30d86200cc',
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
                  message: 'Card deleted!',
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
   uploadFile,
   downloadFile,
   deleteFile,
   addPayer,
   removePayer,
   createCard,
   getCard,
   getCategoryInTravel,
   updateCard,
   deleteCard,
}
