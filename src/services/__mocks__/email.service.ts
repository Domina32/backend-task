const sendEmail = async (
    email: { subject?: string; text: string },
    recipient: { emailAddress: string },
): Promise<void> => {};

export { sendEmail };
