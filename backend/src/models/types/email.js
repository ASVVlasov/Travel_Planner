const mjml2html = require('mjml')

const LOGO_URL =
   'data:image/png;base64,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'
const IMAGES_URL = 'https://travel-planer-files.s3.eu-west-2.amazonaws.com/images'
const INVITE_PICTURE_URL = IMAGES_URL + '/Invite.png'
const REG_PICTURE_URL = IMAGES_URL + '/Register.png'
const PASSWORD_PICTURE_URL = IMAGES_URL + '/Password.png'

const createEmail = (host, pictureUrl, link, mainText, btnText) =>
   mjml2html(
      `<mjml>
         <mj-head>
            <mj-font name="Montserrat" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap" />
            <mj-style>
               .mainText div {
                  font-family: "Montserrat" !important;
                  font-size: 14px !important;
                  line-height: 20px !important;
                  color: #0A3268 !important;
                  text-align: center !important;
               }
               .actionBtn td {
                  box-shadow: 1px 4px 20px rgba(47, 128, 237, 0.4) !important;
                  border-radius: 10px !important;
               }
               .actionBtn a {
                  font-family: "Montserrat" !important;
                  font-size: 18px !important;
                  font-weight: 600 !important;
                  line-height: 22px !important;
                  background-color: #2F80ED !important;
                  border-radius: 10px !important;
                  padding: 10px 33px !important;
               }
               .secondaryText div {
                  font-family: "Montserrat" !important;
                  font-size: 12px !important;
                  line-height: 16px !important;
                  color: #91AED4 !important;
                  text-align: center !important;
               }
            </mj-style>
         </mj-head>
         
         <mj-body>
            <!-- Company logo & theme picture -->
            <mj-section>
               <mj-column>
                  <mj-image width="105px"
                           padding-bottom="35px"
                           src=${LOGO_URL}
                           href=${host}>
                  </mj-image>
                  <mj-image width="350px"
                           padding="0"
                           src=${pictureUrl}>
                  </mj-image>
               </mj-column>
            </mj-section>
            
            <!-- Main text -->
            <mj-section padding-top="5px">
               <mj-column width="420px" 
                        css-class="mainText">
                  <mj-text>Привет!</mj-text>
                  <mj-text padding="0">${mainText}</mj-text>
               </mj-column>
            </mj-section>
            
            <!-- Action button -->
            <mj-section padding="0px">
               <mj-column width="480px">
                  <mj-button css-class="actionBtn"
                           href="${link}" 
                           target="_blank">
                     ${btnText}
                  </mj-button>
               </mj-column>
            </mj-section>
            
            <!-- Additional text -->
            <mj-section>
               <mj-column width="470px" 
                        css-class="secondaryText">
                  <mj-text>
                     Не работает кнопка?<br/>
                     Скопируйте этот адрес в адресную строку браузера и перейдите: ${link}
                  </mj-text>
                  <mj-text>
                     Если письмо попало к вам по ошибке, просто проигнорируйте его
                  </mj-text>
               </mj-column>
            </mj-section>
         </mj-body>
      </mjml>`
   ).html

module.exports = {
   inviteHTML: (linkId, host, userName) =>
      createEmail(
         host,
         INVITE_PICTURE_URL,
         `${host}#/home/signup/${linkId}`,
         `Ваш друг ${userName} приглашает вас в сервис по планированию путешествий. Завершите регистрацию, нажав на кнопку ниже, и присоединяйтесь к поездке 😎`,
         'Зарегистрироваться'
      ),
   registrationHTML: (linkId, host) =>
      createEmail(
         host,
         REG_PICTURE_URL,
         `${host}#/home/signin/${linkId}`,
         'Спасибо за выбор нашего сервиса для планирования путешествий. Остался один шаг – подтвердите почту, нажав на кнопку ниже, чтобы потом создавать поездки и звать в них друзей 🥳',
         'Подтвердить'
      ),
   forgotHTML: (linkId, host) =>
      createEmail(
         host,
         PASSWORD_PICTURE_URL,
         `${host}#/restore/${linkId}`,
         'Вы отправили запрос на смену пароля – для завершения нажмите на кнопку ниже и придумайте новый пароль 🔑',
         'Сменить пароль'
      ),
}
