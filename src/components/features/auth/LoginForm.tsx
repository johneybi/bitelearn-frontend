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
import { loginSchema, type LoginFormValues } from '@/schemas/loginSchema';

type SocialProvider = 'GOOGLE' | 'NAVER';

export type LoginFormSubmitHelpers = Pick<
  UseFormReturn<LoginFormValues>,
  'setError' | 'clearErrors'
>;

type LoginFormProps = {
  onSubmit: (
    data: LoginFormValues,
    helpers: LoginFormSubmitHelpers
  ) => Promise<void> | void;
  onSocialLogin?: (provider: SocialProvider) => void;
};

export default function LoginForm({ onSubmit, onSocialLogin }: LoginFormProps) {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return (
    <>
      <h2 className="mb-6 text-center text-2xl font-bold">로그인</h2>

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
                    autoComplete="current-password"
                    placeholder="********"
                    {...field}
                  />
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
            {form.formState.isSubmitting ? '로그인 중...' : '로그인'}
          </Button>
        </form>
      </Form>

      {/* 소셜 로그인 구분선 */}
      <div className="my-6 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-gray-300 after:mt-0.5 after:flex-1 after:border-t after:border-gray-300">
        <p className="mx-4 mb-0 text-center text-sm text-gray-500">또는</p>
      </div>

      {/* 소셜 로그인 버튼 영역 */}
      <div className="flex flex-col gap-2">
        <Button
          variant="outline"
          className="w-full text-gray-700"
          type="button"
          onClick={() => onSocialLogin?.('GOOGLE')}
        >
          구글로 시작하기
        </Button>
        <Button
          type="button"
          className="w-full bg-[#03C75A] text-white hover:bg-[#02b350]"
          onClick={() => onSocialLogin?.('NAVER')}
        >
          네이버로 시작하기
        </Button>
      </div>

      {/* 회원가입 페이지 이동 링크 */}
      <div className="mt-6 text-center text-sm text-gray-600">
        계정이 없으신가요?{' '}
        <Link
          to="/signup"
          className="font-semibold text-blue-600 hover:underline"
        >
          회원가입하기
        </Link>
      </div>
    </>
  );
}
