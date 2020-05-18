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
const addUser = {
   tags: ['card'],
   summary: 'Add new user to card',
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
const removeUser = {
   tags: ['card'],
   summary: 'Add new user to card',
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
   addUser,
   removeUser,
   createCard,
   getCard,
   updateCard,
   deleteCard,
}
