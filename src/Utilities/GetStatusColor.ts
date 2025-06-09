import { TaskStatus } from "./Constants";
import Colors from "./Colors";

export const getStatusColor = (status: string): string => {
  switch (status) {
    case TaskStatus.PENDING:
      return Colors.statusPending;
    case TaskStatus.IN_PROGRESS:
      return Colors.statusInProgress;
    case TaskStatus.DONE:
      return Colors.statusDone;
    default:
      return Colors.background;
  }
};