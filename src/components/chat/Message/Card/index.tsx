import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import RecommendationGrid from "../../Recommendation/Grid";
import type { RecommendationGridProps } from "../../Recommendation/Grid";
import { Bot } from "lucide-react";

export interface MessageCardProps extends RecommendationGridProps {}

export default function MessageCard({ message }: MessageCardProps) {
  const recommendationGridProps: RecommendationGridProps = {
    message,
  };
  return (
    <>
      {message.role === "assistant" && (
        <div className="w-8 h-8 bg-white text-black rounded-full flex-shrink-0 flex items-center justify-center font-bold text-xs mt-1 shadow-sm">
          <Bot />
        </div>
      )}
      <div
        className={
          message.role === "user"
            ? "bg-[#2f2f2f] px-5 py-3 rounded-3xl max-w-[85%] md:max-w-2xl text-sm text-gray-100"
            : "flex flex-col gap-1 w-full text-gray-200"
        }
      >
        {message.role === "assistant" && (
          <div className="text-xs text-gray-400 font-semibold mb-1">
            {message.model || "Asistente"}
          </div>
        )}
        <div className="text-sm leading-relaxed overflow-hidden">
          {message.role === "assistant" ? (
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                p: ({ children }) => (
                  <p className="mb-2 last:mb-0">{children}</p>
                ),
                code({ node, inline, className, children, ...props }: any) {
                  const match = /language-(\w+)/.exec(className || "");
                  return !inline ? (
                    <div className="my-3 rounded-lg overflow-hidden bg-slate-950 border border-slate-800 text-xs">
                      {match && (
                        <div className="bg-slate-900 px-3 py-1 text-gray-400 border-b border-slate-800 font-mono text-[10px]">
                          {match[1]}
                        </div>
                      )}
                      <pre className="p-3 overflow-x-auto font-mono text-gray-200">
                        <code className={className} {...props}>
                          {children}
                        </code>
                      </pre>
                    </div>
                  ) : (
                    <code
                      className="px-1.5 py-0.5 rounded bg-slate-800 font-mono text-xs text-sky-300"
                      {...props}
                    >
                      {children}
                    </code>
                  );
                },
                ul: ({ children }) => (
                  <ul className="list-disc pl-5 mb-2 space-y-1">{children}</ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal pl-5 mb-2 space-y-1">
                    {children}
                  </ol>
                ),
                strong: ({ children }) => (
                  <strong className="font-semibold text-white">
                    {children}
                  </strong>
                ),
                a: ({ children, href }) => (
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sky-400 underline hover:text-sky-300"
                  >
                    {children}
                  </a>
                ),
              }}
            >
              {message.content}
            </ReactMarkdown>
          ) : (
            <div className="whitespace-pre-wrap">{message.content}</div>
          )}
        </div>
        <RecommendationGrid {...recommendationGridProps} />
      </div>
    </>
  );
}
