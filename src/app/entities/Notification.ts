/* eslint-disable prettier/prettier */
interface INotificationProps {
  content: string;
  category: string;
  readAt?: Date | null;
}

export class Notification {
  private props: INotificationProps;

  constructor(props: INotificationProps) {
    this.props = props;
  }

  public set content(content: string) {
    this.props.content = content;
  }

  public get content(): string {
    return this.props.content;
  }
}
