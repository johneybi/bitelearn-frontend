import * as z from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, '이메일은 필수 입력값입니다.')
    .email('올바른 이메일 형식이 아닙니다.'),

  password: z.string().min(1, '비밀번호는 필수 입력값입니다.'),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
