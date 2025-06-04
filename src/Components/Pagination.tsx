import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Colors from '../Utilities/Colors';

interface Props {
  currentPage: number;
  totalPages: number;
  goToPage: (page: number) => void;
}

const Pagination: React.FC<Props> = ({ currentPage, totalPages, goToPage }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        style={[styles.button, currentPage === 1 && styles.disabled]}
      >
        <Text style={styles.text}>Prev</Text>
      </TouchableOpacity>

      <Text style={styles.page}>Page {currentPage} of {totalPages}</Text>

      <TouchableOpacity
        onPress={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        style={[styles.button, currentPage === totalPages && styles.disabled]}
      >
        <Text style={styles.text}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 70,
    marginTop: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  button: {
    backgroundColor: Colors.primaryButton,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
  },
  disabled: {
    backgroundColor: Colors.mediumText,
  },
  text: {
    color: Colors.background,
    fontWeight: 'bold',
  },
  page: {
    color: Colors.darkText,
    fontWeight: '600',
  },
});

export default Pagination;
