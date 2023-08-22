export enum AuthErrorStatus {
  EMAIL_ALREADY_EXISTS = 'EMAIL_ALREADY_EXISTS',
  USERNAME_ALREADY_EXISTS = 'USERNAME_ALREADY_EXISTS',
  USER_NOT_EXISTS = 'USER_NOT_EXISTS',
}

export enum AuthAction {
  DEFINE_PASSWORD = 'defineYourPassword',
  RESET_PASSWORD = 'resetYourPassword',
}

export enum AuthEmailTemplates {
  DEFINE_YOUR_PASSWORD = 'define-your-password',
  RESET_YOUR_PASSWORD = 'reset-your-password',
}
