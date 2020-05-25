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
const getUser = {
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
   summary: 'Delete user from service. Пока заблокирован во избежание',
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

const getContacts = {
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
const addAvatar = {
   tags: ['user'],
   summary: 'Uploads avatar file to server and attach it to a user',
   requestBody: {
      required: true,
      content: {
         'multipart/form-data': {
            schema: {
               type: 'object',
               properties: {
                  file: {
                     type: 'string',
                     format: 'binary',
                     description: 'Прикрепляемый файл аватара',
                  },
               },
            },
         },
      },
   },
   responses: {
      '200': {
         description: 'Файл аватара успешно прикреплен. Возвращается обновленный пользователь',
         content: {
            'application/json': {
               schema: {
                  $ref: '#/components/schemas/User',
               },
               example: {
                  _id: '5eb9a98ac82bd95234d9ccd4',
                  login: 'testLogin',
                  nickName: 'testNickName',
                  avatar: '5ec83973231143d0263d84a6',
                  travels: [
                     '5ec9b1fbca838f238060bc23',
                     '5eca7e10fef55e253842a023',
                     '5eca8729fef55e253842a027',
                     '5ecaaef6356d0c0017fb1e80',
                     '5ecad6ae1bdd8321301eb869',
                  ],
                  contacts: [
                     '5eb9af4dc82bd95234d9ccd6',
                     '5ec43054c82bd95234d9ccea',
                     '5ec42611c82bd95234d9cce9',
                     '5ec4361dc82bd95234d9cceb',
                     '5ec44289c82bd95234d9ccec',
                     '5ec442fec82bd95234d9cced',
                     '5ec44392c82bd95234d9ccee',
                     '5ec44464c82bd95234d9ccef',
                     '5ec6d47b2b889831c0c06715',
                     '5ec7d9978c712c00176610b9',
                     '5ec7d9fe8c712c00176610bb',
                  ],
                  email: 'fuck-you@mail.ru',
                  name: 'Ник',
               },
            },
         },
      },
      '403': {
         description: 'Попытка перейти на роут не пройдя авторизацию.',
         summary: 'Пока действует мидлвара userEmulator - аутентификация всегда будет успешна, возвращается testUser',
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
const getAvatar = {
   tags: ['user'],
   summary: 'Download user avatar file from server',
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
      '403': {
         description: 'Попытка перейти на роут не пройдя авторизацию.',
         summary: 'Пока действует мидлвара userEmulator - аутентификация всегда будет успешна, возвращается testUser',
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
const removeAvatar = {
   tags: ['user'],
   summary: 'Drop avatar file from server and deattach it from a user',
   responses: {
      '200': {
         description: 'Файл успешно удален. Возвращается обновленный пользователь',
         content: {
            'application/json': {
               schema: {
                  $ref: '#/components/schemas/User',
               },
               example: {
                  _id: '5eb9a98ac82bd95234d9ccd4',
                  login: 'testLogin',
                  nickName: 'testNickName',
                  avatar: '',
                  travels: [
                     '5ec9b1fbca838f238060bc23',
                     '5eca7e10fef55e253842a023',
                     '5eca8729fef55e253842a027',
                     '5ecaaef6356d0c0017fb1e80',
                     '5ecad6ae1bdd8321301eb869',
                  ],
                  contacts: [
                     '5eb9af4dc82bd95234d9ccd6',
                     '5ec43054c82bd95234d9ccea',
                     '5ec42611c82bd95234d9cce9',
                     '5ec4361dc82bd95234d9cceb',
                     '5ec44289c82bd95234d9ccec',
                     '5ec442fec82bd95234d9cced',
                     '5ec44392c82bd95234d9ccee',
                     '5ec44464c82bd95234d9ccef',
                     '5ec6d47b2b889831c0c06715',
                     '5ec7d9978c712c00176610b9',
                     '5ec7d9fe8c712c00176610bb',
                  ],
                  email: 'fuck-you@mail.ru',
                  name: 'Ник',
               },
            },
         },
      },
      '403': {
         description: 'Попытка перейти на роут не пройдя авторизацию.',
         summary: 'Пока действует мидлвара userEmulator - аутентификация всегда будет успешна, возвращается testUser',
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
module.exports = {
   createUser,
   getUser,
   updateUser,
   deleteUser,
   getContacts,
   addContact,
   removeContact,
   addAvatar,
   getAvatar,
   removeAvatar,
}
