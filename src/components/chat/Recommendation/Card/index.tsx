import type { Recommendation } from "../../../../types";

export interface RecommendationCardProps {
  recommendation: Recommendation;
  topMatch?: number;
}

export default function RecommendationCard({
  recommendation,
  topMatch = 7,
}: RecommendationCardProps) {
  const isTopMatch = recommendation.matchLevel >= topMatch;
  return (
    <>
      <div>
        <div className="flex justify-between items-start gap-2 mb-2">
          <h5 className="font-semibold text-zinc-100 text-sm leading-snug group-hover:text-white transition-colors">
            {recommendation.roleTitle}
          </h5>
          <span
            className={`text-[11px] px-2.5 py-0.5 rounded-full font-extrabold tracking-wide shrink-0 ${
              isTopMatch
                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                : "bg-zinc-800 text-zinc-300 border border-zinc-700"
            }`}
          >
            {recommendation.matchLevel}/10
          </span>
        </div>
        <p className="text-xs text-zinc-400 leading-relaxed line-clamp-4">
          {recommendation.reason}
        </p>
      </div>
      <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-[11px] text-zinc-400">
        <span className="px-2 py-0.5 rounded-md bg-zinc-900/80 text-zinc-300 border border-zinc-800">
          {recommendation.modality}
        </span>
        <span className="px-2 py-0.5 rounded-md bg-zinc-900/80 text-zinc-300 border border-zinc-800">
          {recommendation.availability}
        </span>
      </div>
    </>
  );
}
