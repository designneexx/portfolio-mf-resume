import { z } from 'zod';

const message = 'Поле не может быть пустым';

export const schema = z.object({
    fullName: z.string({ message }).min(1, message),
    senderEmail: z.string({ message }).email('Не валидный email'),
    subject: z.string({ message }).min(1, message),
    text: z.string({ message }).min(1, message)
});
