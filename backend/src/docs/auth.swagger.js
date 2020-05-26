const createUser = {
   tags: ['auth'],
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
const loginUser = {
   tags: ['auth'],
   summary: 'Login user',
   requestBody: {
      required: true,
      content: {
         'application/json': {
            schema: {
               $ref: '#/components/authParams',
            },
            example: {
               login: 'API test login',
               password: '12345',
               rememberMe: true,
            },
         },
      },
   },
   responses: {
      '200': {
         description: 'Аутентификация прошла успешно. Открыта сессия. При rememberMe = true возвращается token',
      },
   },
}
const logoutUser = {
   tags: ['auth'],
   summary: 'Logout user',
   responses: {
      '200': {
         description: 'Закрыта сессия. Если был token, то он удаляется',
      },
   },
}

module.exports = {
   createUser,
   loginUser,
   logoutUser,
}
