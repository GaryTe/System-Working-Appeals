export const ValidationMessageForAppealDto = {
  client: {
    string: 'ValidationError: Type of field "client" string.',
    length: 'ValidationError: Min length of field "client" from 1.',
    typeData: 'ValidationError: Valid data should have the following view: "Surname Name Patronymic", field "client"'
  },
  email: 'ValidationError: Email introduced in the "email" field is not valid.',
  topicAppeal: {
    string: 'ValidationError: Type of field "topicAppeal" string.',
    length: 'ValidationError: Min length of field "topicAppeal" from 1.'
  },
  appeal: {
    string: 'ValidationError: Type of field "appeal" string.',
    length: 'ValidationError: Min length of field "appeal" from 1.'
  }
};

export const ValidationMessageForAnswerDto = {
  id: {
    string: 'ValidationError: Type of field "id" string.',
    length: 'ValidationError: Min length of field "id" from 1.'
  },

  answer: {
    string: 'ValidationError: Type of field "answer" string.',
    length: 'ValidationError: Min length of field "answer" from 1.'
  },
};

export const ValidationMessageForGeneralAnswerDto = {
  answer: {
    string: 'ValidationError: Type of field "answer" string.',
    length: 'ValidationError: Min length of field "answer" from 1.'
  },
};

export const ValidationMessageForQueryParamsDto = {
  from: {
    string: 'ValidationError: Type of field "from" string.',
    typeData: 'ValidationError: Valid data should have the following view: "dd.mm.yyyy"'
  },

  to: {
    string: 'ValidationError: Type of field "to" string.',
    typeData: 'ValidationError: Valid data should have the following view: "dd.mm.yyyy"'
  },
};
