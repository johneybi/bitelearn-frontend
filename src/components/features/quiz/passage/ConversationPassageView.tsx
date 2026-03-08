import { useEffect, useRef, useState } from 'react';

import QuizFooter from '@/components/common/QuizFooter';
import QuizPassage from '../shared/QuizPassage';
import type { ChoiceQuestionItem } from '@/mock/choiceQuestion';

type ConversationPassageViewProps = {
  question: ChoiceQuestionItem;
  onSolve: () => void;
  /** true면 말풍선 애니메이션 없이 전체 대화를 바로 표시 */
  skipAnimation?: boolean;
};

export default function ConversationPassageView({
  question,
  onSolve,
  skipAnimation = false,
}: ConversationPassageViewProps) {
  const conversations = question.conversations || [];
  const conversationSpeakers = question.conversationSpeakers || [];
  const conversationInfoBox = question.conversationInfoBox;

  const [visibleCount, setVisibleCount] = useState(() =>
    skipAnimation ? conversations.length : 0
  );
  const [showTyping, setShowTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const totalBubbles = conversations.length;
  const allVisible = visibleCount >= totalBubbles;

  useEffect(() => {
    setVisibleCount(skipAnimation ? conversations.length : 0);
    setShowTyping(false);
  }, [question, skipAnimation, conversations.length]);

  useEffect(() => {
    if (visibleCount >= totalBubbles) return;

    const prevMessage =
      visibleCount > 0 ? (conversations[visibleCount - 1]?.message ?? '') : '';

    const readingDelay =
      visibleCount === 0
        ? 400
        : Math.min(2000, Math.max(700, prevMessage.length * 30));

    if (visibleCount === 0) {
      const timer = window.setTimeout(() => {
        setVisibleCount(1);
      }, readingDelay);

      return () => window.clearTimeout(timer);
    }

    const typingTimer = window.setTimeout(() => {
      setShowTyping(true);
    }, readingDelay);

    const bubbleTimer = window.setTimeout(() => {
      setShowTyping(false);
      setVisibleCount((prev) => prev + 1);
    }, readingDelay + 900);

    return () => {
      window.clearTimeout(typingTimer);
      window.clearTimeout(bubbleTimer);
    };
  }, [visibleCount, totalBubbles, conversations]);

  useEffect(() => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [visibleCount, showTyping]);

  const nextConversation = conversations[visibleCount];
  const nextSpeaker = conversationSpeakers.find(
    (speaker) => speaker.id === nextConversation?.speakerId
  );
  const nextIsLeft = nextSpeaker?.position === 'left';

  return (
    <>
      <section
        ref={scrollRef}
        className="flex-1 overflow-y-auto bg-slate-50 px-6 py-4"
        data-mode="conversation"
      >
        <QuizPassage
          passage={question.passage}
          flavorText={question.flavorText}
        >
          <div className="flex flex-col gap-3 py-5">
            {conversations.slice(0, visibleCount).map((conversation) => {
              const speaker = conversationSpeakers.find(
                (item) => item.id === conversation.speakerId
              );
              const isLeft = speaker?.position === 'left';

              const alignClass = isLeft ? 'justify-start' : 'justify-end';
              const bubbleClass = isLeft
                ? 'rounded-bl-none border border-slate-200 bg-white text-slate-800 shadow-sm'
                : 'rounded-br-none bg-slate-700 text-white shadow-sm';

              return (
                <div
                  key={conversation.id}
                  className={`flex w-full items-end gap-2 ${alignClass} animate-bubble-in`}
                >
                  {isLeft && (
                    <div className="mb-1 shrink-0">
                      {speaker?.profileImageUrl ? (
                        <img
                          src={speaker.profileImageUrl}
                          alt={speaker.name || 'profile'}
                          className="h-9 w-9 rounded-full border-2 border-white object-cover shadow-sm"
                        />
                      ) : (
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-300 text-xs font-bold text-white">
                          {speaker?.name?.[0] ?? '?'}
                        </div>
                      )}
                    </div>
                  )}

                  <div
                    className={`max-w-[72%] rounded-2xl px-4 py-2.5 text-[14.5px] leading-relaxed ${bubbleClass}`}
                  >
                    {conversation.message
                      .split('\n')
                      .map((line, index, array) => (
                        <span key={index}>
                          {line}
                          {index < array.length - 1 && <br />}
                        </span>
                      ))}
                  </div>

                  {!isLeft && (
                    <div className="mb-1 shrink-0">
                      {speaker?.profileImageUrl ? (
                        <img
                          src={speaker.profileImageUrl}
                          alt={speaker.name || '나'}
                          className="h-9 w-9 rounded-full border-2 border-white object-cover shadow-sm"
                        />
                      ) : (
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-400 text-xs font-bold text-white">
                          나
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}

            {showTyping && nextConversation && (
              <div
                className={`animate-bubble-in flex items-end gap-2 ${
                  nextIsLeft ? 'justify-start' : 'justify-end'
                }`}
              >
                {nextIsLeft && (
                  <div className="mb-1 shrink-0">
                    {nextSpeaker?.profileImageUrl ? (
                      <img
                        src={nextSpeaker.profileImageUrl}
                        alt=""
                        className="h-9 w-9 rounded-full border-2 border-white object-cover shadow-sm"
                      />
                    ) : (
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-300 text-xs font-bold text-white">
                        {nextSpeaker?.name?.[0] ?? '?'}
                      </div>
                    )}
                  </div>
                )}

                <div
                  className={`flex gap-1.5 rounded-2xl px-4 py-3.5 shadow-sm ${
                    nextIsLeft
                      ? 'rounded-bl-none border border-slate-200 bg-white'
                      : 'rounded-br-none bg-slate-700/80'
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 animate-bounce rounded-full [animation-delay:0ms] ${
                      nextIsLeft ? 'bg-slate-400' : 'bg-white/70'
                    }`}
                  />
                  <span
                    className={`h-1.5 w-1.5 animate-bounce rounded-full [animation-delay:150ms] ${
                      nextIsLeft ? 'bg-slate-400' : 'bg-white/70'
                    }`}
                  />
                  <span
                    className={`h-1.5 w-1.5 animate-bounce rounded-full [animation-delay:300ms] ${
                      nextIsLeft ? 'bg-slate-400' : 'bg-white/70'
                    }`}
                  />
                </div>

                {!nextIsLeft && (
                  <div className="mb-1 shrink-0">
                    {nextSpeaker?.profileImageUrl ? (
                      <img
                        src={nextSpeaker.profileImageUrl}
                        alt=""
                        className="h-9 w-9 rounded-full border-2 border-white object-cover shadow-sm"
                      />
                    ) : (
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-400 text-xs font-bold text-white">
                        나
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {allVisible && conversationInfoBox && (
              <div className="animate-bubble-in mt-4 rounded-2xl border border-amber-100 bg-amber-50 p-5 shadow-sm">
                <h4 className="mb-2 flex items-center gap-2 text-sm font-bold text-amber-900">
                  <span className="text-lg">💡</span>
                  {conversationInfoBox.title}
                </h4>
                <p className="text-sm leading-relaxed text-amber-800 opacity-90">
                  {conversationInfoBox.content}
                </p>
              </div>
            )}
          </div>
        </QuizPassage>
      </section>

      <style>{`
        @keyframes bubbleIn {
          from { opacity: 0; transform: translateY(8px) scale(0.92); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-bubble-in {
          animation: bubbleIn 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) both;
        }
      `}</style>

      <QuizFooter onClick={onSolve} disabled={!allVisible}>
        문제 풀기
      </QuizFooter>
    </>
  );
}
