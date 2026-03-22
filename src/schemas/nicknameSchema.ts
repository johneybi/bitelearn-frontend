import * as z from 'zod';
import { nicknameFieldSchema } from './signupSchema';

export const nicknameSchema = z.object({
  nickname: nicknameFieldSchema,
});

export type NicknameFormValues = z.infer<typeof nicknameSchema>;
