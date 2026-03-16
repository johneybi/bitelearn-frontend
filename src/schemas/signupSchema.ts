import * as z from 'zod';

export const signupSchema = z
  .object({
    email: z
      .string()
      .trim()
      .min(1, '이메일은 필수 입력값입니다.')
      .email('올바른 이메일 형식이 아닙니다.'),

    password: z.string().min(1, '비밀번호는 필수 입력값입니다.'),

    nickname: z
      .string()
      .trim()
      .min(1, '닉네임은 필수 입력값입니다.')
      .regex(/^[a-zA-Z0-9가-힣]{2,10}$/, {
        message: '닉네임은 특수문자 제외 2~10자리여야 합니다.',
      }),

    passwordConfirm: z
      .string()
      .min(1, { message: '비밀번호 확인은 필수 입력값입니다.' }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    path: ['passwordConfirm'],
    message: '비밀번호가 일치하지 않습니다.',
  });

export type SignupFormValues = z.infer<typeof signupSchema>;
