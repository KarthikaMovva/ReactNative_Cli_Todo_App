const Colors = {
  background: '#ffffff',
  lightGray: '#f0f0f0',
  inputBorder: '#cccccc',
  darkText: '#333333', 
  mediumText: '#666666',
  lightText: '#aaaaaa',
  primaryButton: '#007bff',
  primaryButtonText: '#ffffff', 
  saveButton: '#28a745',
  dangerButton: '#dc3545', 
  cancelButton: '#6c757d', 
  deleteIconColor: '#900', 
  statusPending: '#ffcccc', 
  statusInProgress: '#fff3cd', 
  statusDone: '#d4edda', 
  statusDefault: '#ffffff',
  modalOverlay: 'rgba(0,0,0,0.4)', 
};

export const getStatusColor = (status: string): string => {
  switch (status.toLowerCase()) {
    case 'pending':
      return Colors.statusPending;
    case 'in progress':
      return Colors.statusInProgress;
    case 'done':
      return Colors.statusDone;
    default:
      return Colors.statusDefault;
  }
};

export default Colors;