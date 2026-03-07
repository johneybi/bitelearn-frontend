import * as z from 'zod';

export const signupSchema = z
  .object({
    nickname: z
      .string()
      .trim()
      .min(2, { message: '닉네임은 2자 이상이어야 합니다.' }),
    email: z
      .string()
      .trim()
      .email({ message: '유효한 이메일 주소를 입력해 주세요.' }),
    password: z
      .string()
      .min(8, { message: '비밀번호는 최소 8자 이상이어야 합니다.' }),
    passwordConfirm: z
      .string()
      .min(1, { message: '비밀번호 확인을 입력해 주세요.' }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    path: ['passwordConfirm'],
    message: '비밀번호가 일치하지 않습니다.',
  });

export type SignupFormValues = z.infer<typeof signupSchema>;
