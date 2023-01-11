export interface AlertMessage {
  id: string;
  title: string;
  content: string;
  type: AlertMessageType;
  footer?: string;
}

export enum AlertMessageType {
  SUCCESS = 'alert-success',
  WARNING = 'alert-warning',
  INFO = 'alert-info',
  DEFAULT = 'alert-secondary',
  ERROR = 'alert-danger',
  PRIMARY = 'alert-primary'
}
