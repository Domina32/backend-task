import nodemailer from "nodemailer";

const env = process.env;

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: env.EMAIL_SENDER,
        pass: env.APP_PASSWORD,
    },
});

const sendEmail = async (
    email: { subject?: string; text: string },
    recipient: { emailAddress: string },
): Promise<void> => {
    const info = await transporter.sendMail({
        from: env.EMAIL_SENDER,
        to: recipient.emailAddress,
        subject: email.subject || "",
        text: email.text,
    });

    console.log("Message sent: %s", info.messageId);
};

export { sendEmail };
