const Colors = {
  background: '#ffffff',
  signupBackground : '#EAF6FF',
  lightGray: '#f0f0f0',
  inputBorder: '#cccccc',
  darkText: '#333333', 
  mediumText: '#666666',
  lightText: '#aaaaaa',
  primaryButton: '#007bff',
  saveButton: '#28a745',
  dangerButton: '#dc3545', 
  cancelButton: '#6c757d', 
  deleteIconColor: '#900', 
  statusPending: '#ffcccc', 
  statusInProgress: '#fff3cd', 
  statusDone: '#d4edda', 
  modalOverlay: 'rgba(0,0,0,0.4)', 
  signupTitle : '#004466',
  signupInputBorder : '#A7C7E7',
  signupInputcolor : '#00334D',
  signupSwitchText : '#005B99',
  loginBackground : '#F2F2F2',
  loginSwitchtext : '#007AFF'
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
      return Colors.background;
  }
};

export default Colors;