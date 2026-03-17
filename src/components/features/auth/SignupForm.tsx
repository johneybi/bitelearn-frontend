import { useForm, type UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { signupSchema, type SignupFormValues } from '@/schemas/signupSchema';

export type SignupFormSubmitHelpers = Pick<
  UseFormReturn<SignupFormValues>,
  'setError' | 'clearErrors'
>;

type SignupFormProps = {
  onSubmit: (
    data: SignupFormValues,
    helpers: SignupFormSubmitHelpers
  ) => Promise<void> | void;
};

export default function SignupForm({ onSubmit }: SignupFormProps) {
  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      nickname: '',
      email: '',
      password: '',
      passwordConfirm: '',
    },
  });

  return (
    <>
      <h2 className="mb-6 text-center text-2xl font-bold">회원가입</h2>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) =>
            onSubmit(data, {
              setError: form.setError,
              clearErrors: form.clearErrors,
            })
          )}
          className="space-y-4"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>이메일</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    autoComplete="email"
                    placeholder="example@mail.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>비밀번호</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    autoComplete="new-password"
                    placeholder="********"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="passwordConfirm"
            render={({ field }) => (
              <FormItem>
                <FormLabel>비밀번호 확인</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    autoComplete="new-password"
                    placeholder="********"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="nickname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>닉네임</FormLabel>
                <FormControl>
                  <Input placeholder="멋진개발자" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="mt-6 w-full"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? '가입 처리 중...' : '가입하기'}
          </Button>
        </form>
      </Form>

      {/* 로그인 페이지 이동 링크 */}
      <div className="mt-6 text-center text-sm text-gray-600">
        이미 계정이 있으신가요?{' '}
        <Link
          to="/login"
          className="font-semibold text-blue-600 hover:underline"
        >
          로그인하기
        </Link>
      </div>
    </>
  );
}
