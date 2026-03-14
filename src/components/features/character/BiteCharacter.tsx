import { useMemo } from 'react';
import { motion } from 'framer-motion';

import { CHARACTER_STATES } from './character.constants';

interface BiteCharacterProps {
  exp: number;
  messageOverride?: string;
}

export default function BiteCharacter({
  exp,
  messageOverride,
}: BiteCharacterProps) {
  const state = useMemo(() => {
    if (exp < CHARACTER_STATES.POOR.threshold) return CHARACTER_STATES.POOR;
    if (exp < CHARACTER_STATES.MIDDLE.threshold) return CHARACTER_STATES.MIDDLE;
    return CHARACTER_STATES.WEALTHY;
  }, [exp]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative mb-8 flex items-center gap-4 rounded-[32px] border pb-4 pl-4 pr-6 pt-4 shadow-sm transition-colors duration-500 ${state.bgColor} ${state.borderColor}`}
    >
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="h-24 w-24 shrink-0"
      >
        <img
          src={state.image}
          alt="Character Status"
          className="h-full w-full object-contain"
        />
      </motion.div>

      <div className="relative flex-1">
        <div className="relative rounded-2xl border border-slate-100 bg-white p-3 shadow-sm">
          <p className="whitespace-pre-line text-[13px] font-bold leading-tight text-slate-700">
            {messageOverride ?? state.message}
          </p>

          <div className="absolute -left-2 top-1/2 h-3 w-3 -translate-y-1/2 rotate-45 border-b border-l border-slate-100 bg-white" />
        </div>
      </div>
    </motion.div>
  );
}
