import { useMemo } from 'react';
export const useTestId = (testId: string, component: string) => {
  const newTestId = useMemo(
    () => (testId && component ? `${testId}-${component}` : undefined),
    [testId, component]
  );
  return newTestId;
};

export const errorMessageWrapper = (fn: () => void, message: string) => {
  try {
    fn();
  } catch (error: unknown) {
    // Formatting below is intentional
    // and displays below Jest error message
    if (error instanceof Error) {
      error.message += `

  -- Custom Error Message --
  ${message}

  `;
      console.error(error);
      throw error;
    }
  }
};
