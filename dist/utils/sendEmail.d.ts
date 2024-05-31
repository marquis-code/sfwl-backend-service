interface mailOptions {
    to: string;
    subject: string;
    html: string;
}
export declare const sendEmail: (options: mailOptions) => Promise<void>;
export {};
