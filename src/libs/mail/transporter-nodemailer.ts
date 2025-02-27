import nodemailer, {Transporter} from 'nodemailer';

export let transporter: Transporter;

export const dataSourceMail = async (
  host: string,
  port: number,
  secure: boolean,
  auth: {
    user: string,
    pass: string,
  }
): Promise<Transporter> => {
  transporter = nodemailer.createTransport({
    host: host,
    port: port,
    secure: secure,
    auth: auth
  });

  return transporter;
};

