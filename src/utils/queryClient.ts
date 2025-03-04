import {QueryClient} from '@tanstack/react-query';

const DEFAULT_STALE_TIME = 10 * 60 * 1000;

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: DEFAULT_STALE_TIME,
        refetchOnWindowFocus: false,
        retry: 1,
      },
    },
  });
}

let customQueryClient: QueryClient | undefined = undefined;

export function getQueryClient() {
  if (!customQueryClient) {
    customQueryClient = makeQueryClient();
  }
  return customQueryClient;
}
