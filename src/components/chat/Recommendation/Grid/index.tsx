import type { Message } from "../../../../types";
import RecommendationCard from "../Card";
import type { RecommendationCardProps } from "../Card";

export interface RecommendationGridProps {
  message: Message;
}

export default function RecommendationGrid({
  message,
}: RecommendationGridProps) {
  return message.recommendations && message.recommendations.length > 0 ? (
    <div className="mt-5 p-5 bg-[#18181b]/85 backdrop-blur-md rounded-2xl border border-zinc-800 shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-200 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-zinc-400 animate-pulse"></span>
          Roles recomendados para ti ({message.recommendations.length})
        </h4>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {message.recommendations.map((recommendation, index) => {
          const recommendationCardProps: RecommendationCardProps = {
            recommendation,
          };
          return (
            <div
              key={index}
              className="group relative bg-[#222225] hover:bg-[#27272a] p-4 rounded-xl border border-zinc-800 hover:border-zinc-600 transition-all duration-300 flex flex-col justify-between shadow-sm"
            >
              <RecommendationCard {...recommendationCardProps} />
            </div>
          );
        })}
      </div>
    </div>
  ) : null;
}
