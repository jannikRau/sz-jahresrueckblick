export enum ErrorCode {
  EmptyQueryResult,
}

export class CustomApplicationError extends Error {
  readonly status: number;

  constructor(readonly code: ErrorCode) {
    super(getMessageForErrorCode(code));
    this.status = getStatusForCode(code);
    this.code = code;
  }
}

function getStatusForCode(code: ErrorCode): number {
  switch (code) {
    case ErrorCode.EmptyQueryResult:
      return 404;
  }
}

function getMessageForErrorCode(code: ErrorCode): string {
  switch (code) {
    case ErrorCode.EmptyQueryResult:
      return 'Data not found';
  }
}
