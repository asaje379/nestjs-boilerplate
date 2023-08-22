import { AuthAction } from './auth.enum';

export const AuthMessages = {
  [AuthAction.DEFINE_PASSWORD]: 'Compte créé avec succès',
  [AuthAction.RESET_PASSWORD]: 'Réinitialiser votre mot de passe',
};

export const AuthViews = {
  definePassword: 'define-password',
  setPassword: 'set-password',
  resetPassword: 'reset-password',
};
