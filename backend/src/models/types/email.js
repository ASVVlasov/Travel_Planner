module.exports = {
   inviteHTML: (linkId) =>
      `<b>Привет!</b><br/>
        Твой друг приглашает тебя планировать путешествия вместе с ним, мы Вас уже зарегистрировали<br/>
        Осталось только подтвердить почту по ссылке, присоединяйся - 
        <strong> http://localhost:3000/#/home/signup/${linkId}</strong>`,
   registrationHTML: (linkId) =>
      `<b>Привет!</b><br/>
        Мы рады приветствовать Вас на нашем сервисе планирования путешествий<br/>
        Осталось сделать всего один шаг - подтвердить почту по ссылке - 
        <strong> http://localhost:3000/#/home/signup/${linkId}</strong>`,
}
