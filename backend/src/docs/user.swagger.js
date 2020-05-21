const createUser = {
   tags: ['user'],
   summary: 'Create new user',
   requestBody: {
      required: true,
      content: {
         'application/json': {
            schema: {
               $ref: '#/components/schemas/User',
            },
            example: {
               login: 'API test login',
               password: '12345',
               nickName: 'API test user',
            },
         },
      },
   },
   responses: {
      '200': {
         description: 'Возвращается созданный пользователь',
         content: {
            'application/json': {
               schema: {
                  $ref: '#/components/schemas/User',
               },
               example: {
                  contacts: [],
                  travels: [],
                  _id: '5ec6d47b2b889831c0c06715',
                  login: 'API test login',
                  password: '12345',
                  nickName: 'API test user',
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
const getSelf = {
   tags: ['user'],
   summary: 'Get user information about self',
   responses: {
      '200': {
         description: 'Возвращается сам пользователь',
         content: {
            'application/json': {
               schema: {
                  $ref: '#/components/schemas/User',
               },
               example: {
                  contacts: [
                     {
                        _id: '5eb9af4dc82bd95234d9ccd6',
                        nickName: 'testContactNickName',
                     },
                  ],
                  travels: [],
                  _id: '5eb9a98ac82bd95234d9ccd4',
                  login: 'testLogin',
                  password: 'testPassword',
                  nickName: 'testNickName',
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
const getUser = {
   tags: ['user'],
   summary: 'Get user information about user',
   parameters: [
      {
         in: 'path',
         name: 'userId',
         description: 'ID пользователя которого нужно получить',
         schema: {
            type: 'string',
            example: '5ec6d47b2b889831c0c06715',
         },
         required: true,
      },
   ],
   responses: {
      '200': {
         description: 'Возвращается пользователь',
         content: {
            'application/json': {
               schema: {
                  $ref: '#/components/schemas/User',
               },
               example: {
                  contacts: [
                     {
                        _id: '5ec4361dc82bd95234d9cceb',
                        nickName: 'Konstantin Buzuev',
                        avatar: '5ec4369047a2a7001734cfe3',
                     },
                  ],
                  travels: [],
                  _id: '5ec6d47b2b889831c0c06715',
                  login: 'API test login',
                  password: '12345',
                  nickName: 'API test user',
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
const updateUser = {
   tags: ['user'],
   summary: 'Update user(пока не введена авторизация требуется ID)',
   requestBody: {
      required: true,
      content: {
         'application/json': {
            schema: {
               $ref: '#/components/schemas/User',
            },
            example: {
               _id: '5ec6d47b2b889831c0c06715',
               email: 'example@mail.ru',
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
                  $ref: '#/components/schemas/User',
               },
               example: {
                  contacts: [],
                  travels: [],
                  _id: '5ec6d47b2b889831c0c06715',
                  login: 'API test login',
                  password: '12345',
                  nickName: 'API test user',
                  email: 'example@mail.ru',
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
const deleteUser = {
   tags: ['user'],
   summary: 'Delete user from service',
   requestBody: {
      required: true,
      content: {
         'application/json': {
            schema: {
               type: 'object',
               properties: {
                  selfId: {
                     type: 'string',
                     description: 'Пока не введена авторизация требуется ID пользователя',
                     example: '5ec6d47b2b889831c0c06715',
                  },
               },
            },
            example: {
               selfId: '5ec6d47b2b889831c0c06715',
            },
         },
      },
   },
   responses: {
      '200': {
         description: 'Возвращается удаляемый пользователь',
         content: {
            'application/json': {
               schema: {
                  $ref: '#/components/schemas/User',
               },
               example: {
                  contacts: [],
                  travels: [],
                  _id: '5ec6d47b2b889831c0c06715',
                  login: 'API test login',
                  password: '12345',
                  nickName: 'API test user',
                  email: 'example@mail.ru',
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

const getSelfContacts = {
   tags: ['user'],
   summary: 'Get user contacts (до введения авторизации - только testNickName, потом - сам пользователь)',
   responses: {
      '200': {
         description: 'Возвращаются контакты текущего пользователя',
         content: {
            'application/json': {
               schema: {
                  type: 'array',
                  items: {
                     type: 'object',
                     properties: {
                        _id: {
                           type: 'string',
                           description: 'ID пользователя в контактах',
                           example: '5ec4361dc82bd95234d9cceb',
                        },
                        nickName: {
                           type: 'string',
                           description: 'Никнейм пользователя в контактах',
                           example: 'Konstantin Buzuev',
                        },
                        avatar: {
                           $ref: '#/components/schemas/File',
                        },
                     },
                  },
               },
               example: [
                  {
                     _id: '5eb9af4dc82bd95234d9ccd6',
                     nickName: 'testContactNickName',
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
const addContact = {
   tags: ['user'],
   summary: 'Add contact to user',
   requestBody: {
      required: true,
      content: {
         'application/json': {
            schema: {
               type: 'object',
               properties: {
                  selfId: {
                     type: 'string',
                     description: 'Пока не введена авторизация требуется свой ID',
                     example: '5ec6d47b2b889831c0c06715',
                  },
                  userId: {
                     type: 'string',
                     description: 'ID пользователя, которого добавляем в свои контакты',
                     example: '5ec4361dc82bd95234d9cceb',
                  },
               },
            },
            example: {
               selfId: '5ec6d47b2b889831c0c06715',
               userId: '5ec4361dc82bd95234d9cceb',
            },
         },
      },
   },
   responses: {
      '200': {
         description: 'Возвращаются контакты текущего пользователя',
         content: {
            'application/json': {
               schema: {
                  $ref: '#/components/schemas/User',
               },
               example: {
                  contacts: ['5ec4361dc82bd95234d9cceb'],
                  travels: [],
                  _id: '5ec6d47b2b889831c0c06715',
                  login: 'API test login',
                  password: '12345',
                  nickName: 'API test user',
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
const removeContact = {
   tags: ['user'],
   summary: 'Remove contact from user',
   requestBody: {
      required: true,
      content: {
         'application/json': {
            schema: {
               type: 'object',
               properties: {
                  selfId: {
                     type: 'string',
                     description: 'Пока не введена авторизация требуется свой ID',
                     example: '5ec6d47b2b889831c0c06715',
                  },
                  userId: {
                     type: 'string',
                     description: 'ID пользователя, которого удаляем из своих контактов',
                     example: '5ec4361dc82bd95234d9cceb',
                  },
               },
            },
            example: {
               selfId: '5ec6d47b2b889831c0c06715',
               userId: '5ec4361dc82bd95234d9cceb',
            },
         },
      },
   },
   responses: {
      '200': {
         description: 'Возвращаются контакты текущего пользователя',
         content: {
            'application/json': {
               schema: {
                  $ref: '#/components/schemas/User',
               },
               example: {
                  contacts: [],
                  travels: [],
                  _id: '5ec6d47b2b889831c0c06715',
                  login: 'API test login',
                  password: '12345',
                  nickName: 'API test user',
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

module.exports = {
   createUser,
   getSelf,
   getUser,
   updateUser,
   deleteUser,
   getSelfContacts,
   addContact,
   removeContact,
}
