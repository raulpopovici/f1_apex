import * as React from "react";

export function ChatBubbleLeftIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 12c0 2.357 1.134 4.49 3 5.889V21l3.177-1.59a9.045 9.045 0 0 0 3.573.726c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25-9 3.694-9 8.25Z"
      />
    </svg>
  );
}
