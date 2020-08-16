const mjml2html = require('mjml')

const LOGO_URL = 'https://travel-planer-files.s3.eu-west-2.amazonaws.com/images/Logo.png'
const INVITE_PICTURE_URL = 'https://travel-planer-files.s3.eu-west-2.amazonaws.com/e-mails/Invite.png'
const REG_PICTURE_URL = 'https://travel-planer-files.s3.eu-west-2.amazonaws.com/e-mails/Register.png'
const PASSWORD_PICTURE_URL = 'https://travel-planer-files.s3.eu-west-2.amazonaws.com/e-mails/Password.png'

const registrationEmail = (linkId, host) =>
   mjml2html(
      `
      <mjml>
      <mj-body>
        <!-- Comapany logo & theme picture -->
        <mj-section>
          <mj-column width="480px">
            <mj-image width="104px" src=${LOGO_URL}></mj-image>
                <mj-image width="344px" src=${REG_PICTURE_URL}></mj-image>
          </mj-column>
        </mj-section>

        <!-- Main text, action button and additional text-->
         <mj-section>
          <mj-column width="480px">
            <mj-text font-size="14px" color="#0A3268" font-family="Montserrat" align="center">Привет!</mj-text>
            <mj-text font-size="14px" line-height="20px" color="#0A3268" font-family="Montserrat" align="center">Спасибо за выбор нашего сервиса для планирования путешествий. Остался один шаг – подтвердите почту, нажав на кнопку ниже, чтобы потом создавать поездки
    и звать в них друзей 😎</mj-text>
          <mj-button background-color="#2F80ED" font-size="18px" line-height="22px" font-family="Montserrat" font-weight="600" href="${host}#/home/signin/${linkId}" border-radius="10px
          " target="_blank" inner-padding="9px 33px" padding-top="30px" padding-bottom="40px" >
            Подтвердить
          </mj-button>

            <mj-text font-size="12px" line-height="16px" color="#91AED4" font-family="Montserrat" align="center">Не работает кнопка? <br/>
    Скопируйте этот адрес в адресную строку браузера и перейдите: ${host}#/home/signin/${linkId} </mj-text>
          </mj-column>
        </mj-section>

      </mj-body>
    </mjml>
   `
   )

module.exports = {
   inviteHTML: (linkId, host) =>
      `<b>Привет!</b><br/>
        Твой друг приглашает тебя планировать путешествия вместе с ним, мы Вас уже зарегистрировали<br/>
        Осталось только подтвердить почту по ссылке, присоединяйся - 
        <a href="${host}#/home/signup/${linkId}"> ${host}#/home/signup/${linkId}</a>`,
   registrationHTML: (linkId, host) => registrationEmail(linkId, host).html,
   forgotHTML: (linkId, host) =>
      `<b>Привет!</b><br/>
      Это письмо пришло вам потому, что вы забыли пароль<br/>
      Если вы его не забывали или уже вспомнили - просто проигнорируйте это письмо!<br/>
      А для восстановления пароля пройдите по ссылке -
      <a href="${host}#/restore/${linkId}"> ${host}#/restore/${linkId}</a>`,
}
