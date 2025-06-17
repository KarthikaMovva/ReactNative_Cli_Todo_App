import Colors from "./Colors";

export enum TaskStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in progress',
  DONE = 'done',
}

export const getStatusColor = (isDarkTheme: boolean, status: string): string => {
  if (isDarkTheme) {
    switch (status) {
      case TaskStatus.PENDING:
        return Colors.darkTheme.pendingBackground;
      case TaskStatus.IN_PROGRESS:
        return Colors.darkTheme.progressBackground;
      case TaskStatus.DONE:
        return Colors.darkTheme.doneBackground;
      default:
        return '#555555';
    }
  } else {
    switch (status) {
      case TaskStatus.PENDING:
        return Colors.statusPending;
      case TaskStatus.IN_PROGRESS:
        return Colors.statusInProgress;
      case TaskStatus.DONE:
        return Colors.statusDone;
      default:
        return '#DDDDDD';
    }
};
};