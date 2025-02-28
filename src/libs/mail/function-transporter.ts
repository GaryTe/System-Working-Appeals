import {transporter} from './transporter-nodemailer.js';
import {DataAppeal} from '../type/index.js';
import {SENDER, SUBJECT} from '../const/index.js';

export const sendMail = async (dto: DataAppeal, textMail: string): Promise<string> => {
  const result = await transporter.sendMail({
    from: `${SENDER}`,
    to: `${dto.email}`,
    subject: `${SUBJECT}`,
    text: `${dto.client}.
           ${textMail}
            Телефон Call Centra: +7(000)000-00-00`
  })
    .then((response) => response)
    .catch(() => null);

  const statusResponse = result ?
    `Ответ по обращению под номером ${dto.id}, направлено на email: ${dto.email}, получатель ${dto.client}.` :
    `Ответ по обращению под номером ${dto.id}, не направлен на email: ${dto.email}, получатель: ${dto.client}.`;

  return statusResponse;
};
