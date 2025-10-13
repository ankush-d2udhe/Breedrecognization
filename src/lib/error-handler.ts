/**
 * Centralized error handling utility
 * Provides consistent error handling across the application
 */

// Error types
export enum ErrorType {
  API = 'api_error',
  NETWORK = 'network_error',
  AUTH = 'auth_error',
  VALIDATION = 'validation_error',
  UNKNOWN = 'unknown_error'
}

// Error with additional context
export interface AppError {
  type: ErrorType;
  message: string;
  originalError?: unknown;
  code?: string;
  retry?: boolean;
}

// Map HTTP status codes to error types
const mapStatusToErrorType = (status: number): ErrorType => {
  if (status >= 400 && status < 500) {
    if (status === 401 || status === 403) {
      return ErrorType.AUTH;
    }
    return ErrorType.VALIDATION;
  }
  if (status >= 500) {
    return ErrorType.API;
  }
  return ErrorType.UNKNOWN;
};

// Get user-friendly message based on error type
export const getUserFriendlyMessage = (error: AppError): string => {
  switch (error.type) {
    case ErrorType.API:
      return 'The server encountered an error. Please try again later.';
    case ErrorType.NETWORK:
      return 'Network connection issue. Please check your internet connection.';
    case ErrorType.AUTH:
      return 'Authentication error. Please log in again.';
    case ErrorType.VALIDATION:
      return error.message || 'Please check your input and try again.';
    default:
      return 'An unexpected error occurred. Please try again.';
  }
};

// Process API response errors
export const handleApiError = async (response: Response): Promise<AppError> => {
  const errorType = mapStatusToErrorType(response.status);
  
  try {
    const data = await response.json();
    return {
      type: errorType,
      message: data.error?.message || `API Error: ${response.status} ${response.statusText}`,
      code: data.error?.code,
      retry: errorType === ErrorType.API || errorType === ErrorType.NETWORK
    };
  } catch (e) {
    return {
      type: errorType,
      message: `API Error: ${response.status} ${response.statusText}`,
      retry: errorType === ErrorType.API || errorType === ErrorType.NETWORK
    };
  }
};

// Process fetch errors (network issues, etc.)
export const handleFetchError = (error: unknown): AppError => {
  const isNetworkError = error instanceof Error && 
    (error.message.includes('network') || error.message.includes('fetch'));
  
  return {
    type: isNetworkError ? ErrorType.NETWORK : ErrorType.UNKNOWN,
    message: error instanceof Error ? error.message : 'Unknown error occurred',
    originalError: error,
    retry: true
  };
};

// Main error handler function
export const processError = async (error: unknown): Promise<AppError> => {
  if (error instanceof Response) {
    return handleApiError(error);
  }
  
  return handleFetchError(error);
};

export default {
  processError,
  getUserFriendlyMessage,
  ErrorType
};