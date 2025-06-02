export const getStatusColor = (status: string): string => {
  switch (status.toLowerCase()) {
    case 'pending':
      return '#ffcccc';
    case 'in progress':
      return '#fff3cd';
    case 'done':
      return '#d4edda';
    default:
      return '#ffffff';
  }
};
