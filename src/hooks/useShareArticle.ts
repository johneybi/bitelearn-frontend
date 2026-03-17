import { toast } from 'sonner';

type UseShareArticleParams = {
  title: string;
  url?: string;
};

export default function useShareArticle({
  title,
  url = window.location.href,
}: UseShareArticleParams) {
  const handleShare = async () => {
    try {
      // 모바일 공유
      if (navigator.share) {
        try {
          await navigator.share({
            title,
            url,
          });
          return;
        } catch {
          throw new Error('SHARE_FAILED');
        }
      }

      // 클립보드 복사
      if (navigator.clipboard?.writeText) {
        try {
          await navigator.clipboard.writeText(url);
          toast.success('링크가 복사되었습니다');
          return;
        } catch {
          throw new Error('CLIPBOARD_FAILED');
        }
      }

      // 둘 다 안 되는 경우
      throw new Error('UNSUPPORTED');
    } catch (error) {
      console.error('공유 처리 실패', error);

      if (error instanceof Error) {
        switch (error.message) {
          case 'UNSUPPORTED':
            toast.error('공유를 지원하지 않는 브라우저입니다');
            break;

          case 'CLIPBOARD_FAILED':
            toast.error('링크 복사에 실패했습니다');
            break;

          case 'SHARE_FAILED':
            toast.error('공유 중 문제가 발생했습니다');
            break;

          default:
            toast.error('공유에 실패했습니다. 잠시 후 다시 시도해주세요');
        }
      }
    }
  };

  return { handleShare };
}
