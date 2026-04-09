declare module '@calcom/embed-react' {
  import type {HTMLAttributes, ReactElement} from 'react';

  export type CalProps = HTMLAttributes<HTMLDivElement> & {
    calLink: string;
    calOrigin?: string;
    namespace?: string;
    config?: Record<string, unknown>;
    initConfig?: Record<string, unknown>;
    embedJsUrl?: string;
  };

  export default function Cal(props: CalProps): ReactElement | null;

  export function getCalApi(
    options?: string | {namespace?: string; embedJsUrl?: string}
  ): Promise<(...args: unknown[]) => void>;
}
