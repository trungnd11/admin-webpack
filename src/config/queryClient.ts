import { QueryClient } from "react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      retryDelay: (attemptIndex: number) => attemptIndex * 1000,
      refetchOnWindowFocus: false,
      // onError: (error: any) => {
      //   notification.error({
      //     message: error.message
      //   });
      // },
    },
    mutations: {
      // onError: (error: any) => {
      //   notification.error({
      //     message: error.message
      //   });
      // },
    }
  },
});

export default queryClient;
