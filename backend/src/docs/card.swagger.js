const uploadFile = {
   post: {
      tags: ['developers'],
      summary: 'Uploads file to server and attach it to a card',
      requestBody: {
         required: true,
         content: {
            'multipart/form-data': {
               schema: {
                  type: 'object',
                  properties: {
                     travelId: {
                        type: 'string',
                        description: 'ID доски путешествий, на которой находится карта',
                        example: '5eb56d4d771522c070eb3f6f',
                     },
                     cardId: {
                        type: 'string',
                        description: 'ID карты, к которой прикрепляется файл',
                        example: '5eb7eb4651385a1e081ec3ab',
                     },
                     fileName: {
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
                     _id: '11111b4651385a1e08111111',
                     title: 'Тест',
                     type: 'Транспорт',
                     description: 'Описание карточки события',
                     comment: 'Комментарий путешественников',
                     cost: 100,
                     categoryId: '5eb5b55cc148b72344978626',
                     beginDate: '2020-05-15T10:00:00.000+00:00',
                     endDate: '2020-05-25T10:00:00.000+00:00',
                     beginPoint: 'Москва',
                     endPoint: 'Санкт-Петербург',
                     company: 'Home Travel',
                     userIds: ['5eb56d8691de72f427b9e8bd', '5eb56d8691de72f427b9e8be'],
                     payerId: '5eb56d8691de72f427b9e8bd',
                     fileIds: ['11111d8691de72f427b9e8bd', '11111d8691de72f427b11111'],
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
   },
}
const dropFile = {
   post: {
      tags: ['developers'],
      summary: 'Drop file from server and deattach it from a card',
      requestBody: {
         required: true,
         content: {
            'multipart/form-data': {
               schema: {
                  type: 'object',
                  properties: {
                     travelId: {
                        type: 'string',
                        description: 'ID доски путешествий, на которой находится карта',
                        example: '5eb56d4d771522c070eb3f6f',
                     },
                     cardId: {
                        type: 'string',
                        description: 'ID карты, к которой прикрепляется файл',
                        example: '5eb7eb4651385a1e081ec3ab',
                     },
                     fileId: {
                        type: 'string',
                        description: 'ID файла, который собираемся удалить',
                        example: '6ac7eb4651385a1e081ec8ee',
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
                     _id: '11111b4651385a1e08111111',
                     title: 'Тест',
                     type: 'Транспорт',
                     description: 'Описание карточки события',
                     comment: 'Комментарий путешественников',
                     cost: 100,
                     categoryId: '5eb5b55cc148b72344978626',
                     beginDate: '2020-05-15T10:00:00.000+00:00',
                     endDate: '2020-05-25T10:00:00.000+00:00',
                     beginPoint: 'Москва',
                     endPoint: 'Санкт-Петербург',
                     company: 'Home Travel',
                     userIds: ['5eb56d8691de72f427b9e8bd', '5eb56d8691de72f427b9e8be'],
                     payerId: '5eb56d8691de72f427b9e8bd',
                     fileIds: ['11111d8691de72f427b9e8bd'],
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
   },
}
const createCard = {
   post: {
      tags: ['developers'],
      summary: 'Create card on travel board',
      parameters: [
         {
            in: 'path',
            name: 'travelId',
            description: 'ID доски путешествий к которой прикрепляем карточку',
            schema: {
               type: 'string',
               example: '5eb7eb4651385a1e081ec3ab',
            },
            required: true,
         },
      ],
      requestBody: {
         required: true,
         content: {
            'application/json': {
               schema: {
                  $ref: '#/components/schemas/Card',
               },
               example: {
                  title: 'Новая карта',
                  type: 'Проживание',
                  description: 'Можно без этого параметра',
                  comment: 'Можно без этого параметра',
                  cost: 0,
                  categoryId: 'Можно без этого параметра',
                  beginDate: '2020-05-15T10:00:00.000+00:00',
                  endDate: '2020-05-25T10:00:00.000+00:00',
                  beginPoint: 'Москва',
                  endPoint: 'Можно без этого параметра',
                  company: 'Можно без этого параметра',
                  userIds: ['5eb56d8691de72f427b9e8bd'],
                  payerId: 'Можно без этого параметра',
                  fileIds: ['Можно без этого параметра'],
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
                     _id: '11111b4651385a1e08111111',
                     title: 'Новая карта',
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
   },
}
const getAllCards = {
   get: {
      tags: ['developers'],
      summary: 'Get all cards from travel board',
      parameters: [
         {
            in: 'path',
            name: 'travelId',
            description: 'ID доски путешествий карточки которой нужно получить',
            schema: {
               type: 'string',
               example: '5eb7eb4651385a1e081ec3ab',
            },
            required: true,
         },
      ],
      responses: {
         '200': {
            description: 'Возвращается массив карточек событий',
            content: {
               'application/json': {
                  schema: {
                     type: 'array',
                     items: {
                        $ref: '#/components/schemas/Card',
                     },
                  },
                  example: [
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
   },
}
const getCard = {
   get: {
      tags: ['developers'],
      summary: 'Get one card from travel board',
      parameters: [
         {
            in: 'path',
            name: 'travelId',
            description: 'ID доски путешествий карточки которой нужно получить',
            schema: {
               type: 'string',
               example: '5eb7eb4651385a1e081ec3ab',
            },
            required: true,
         },
         {
            in: 'path',
            name: 'cardId',
            description: 'ID карточки которую нужно получить',
            schema: {
               type: 'string',
               example: '5eb7eb4651385a1e081ecccc',
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
   },
}
const updateCard = {
   put: {
      tags: ['developers'],
      summary: 'Update card on travel board',
      requestBody: {
         required: true,
         content: {
            'application/json': {
               schema: {
                  type: 'object',
                  properties: {
                     travelId: {
                        type: 'string',
                        description: 'ID доски путешествий на которой обновляем карточку',
                        example: '5eb7eb4651385a1e081ec3ab',
                     },
                     card: {
                        $ref: '#/components/schemas/Card',
                     },
                  },
               },
               example: {
                  travelId: '5eb7eb4651385a1e081ec3ab',
                  card: {
                     _id: '11111b4651385a1e08111111',
                     title: 'Существующая карта',
                     type: 'Проживание',
                     description: 'Новое значение',
                     comment: 'Новое значение',
                     cost: 0,
                     categoryId: '5eb56d8691de72f427b9e777',
                     beginDate: '2020-05-15T10:00:00.000+00:00',
                     endDate: '2020-05-25T10:00:00.000+00:00',
                     beginPoint: 'Москва',
                     endPoint: 'Новое значение',
                     company: 'Новое значение',
                     userIds: ['5eb56d8691de72f427b9e8bd'],
                     payerId: '5eb56d8691de72f427b9e555',
                     fileIds: ['Старое значение'],
                  },
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
                     _id: '11111b4651385a1e08111111',
                     title: 'Существующая карта',
                     type: 'Проживание',
                     description: 'Новое значение',
                     comment: 'Новое значение',
                     cost: 0,
                     categoryId: '5eb56d8691de72f427b9e777',
                     beginDate: '2020-05-15T10:00:00.000+00:00',
                     endDate: '2020-05-25T10:00:00.000+00:00',
                     beginPoint: 'Москва',
                     endPoint: 'Новое значение',
                     company: 'Новое значение',
                     userIds: ['5eb56d8691de72f427b9e8bd'],
                     payerId: '5eb56d8691de72f427b9e555',
                     fileIds: ['Старое значение'],
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
   },
}
const deleteCard = {
   delete: {
      tags: ['developers'],
      summary: 'Delete card from travel board',
      parameters: [
         {
            in: 'path',
            name: 'travelId',
            description: 'ID доски путешествий с которой удаляем карточку',
            schema: {
               type: 'string',
               example: '5eb7eb4651385a1e081ec3ab',
            },
            required: true,
         },
         {
            in: 'path',
            name: 'cardId',
            description: 'ID карточки которую нужно удалить',
            schema: {
               type: 'string',
               example: '5eb7eb4651385a1e081ecccc',
            },
            required: true,
         },
      ],
      responses: {
         '200': {
            description: 'Возвращается пустой объект',
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
   },
}

module.exports = {
   uploadFile,
   dropFile,
   createCard,
   getAllCards,
   getCard,
   updateCard,
   deleteCard,
}
