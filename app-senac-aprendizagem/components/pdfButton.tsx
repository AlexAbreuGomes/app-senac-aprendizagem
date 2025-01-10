import React from 'react';
import { View, Button, Linking, StyleSheet, Pressable, Text } from 'react-native';
import { FontAwesome6, MaterialIcons } from '@expo/vector-icons';
import { PdfData } from '../types/pdfTypes';
import { PDF } from '../data/pdf';

interface PDFItemProps {
  item: PdfData;
}

const PDFItem: React.FC<PDFItemProps> = ({ item }) => {
  const handlePress = () => {
    Linking.openURL(item.url).catch((err) =>
      console.error('Erro ao abrir o link: ', err)
    );
  };

  return (
    <Pressable style={styles.container} onPress={handlePress}>
      <MaterialIcons name="picture-as-pdf" size={24} color="#D32F2F" />
      <Text style={styles.text}>PDF {item.id}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  text: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
});

export default PDFItem;

// const PDF = () => {
//   const handlePress = () => {
//     // URL do PDF hospedado online
//     const pdfUrl = 'https://drive.google.com/file/d/1Qz6v10-6LpyJwWyOE8RJUJycYA6EWvP9/view?usp=drive_link';
//     Linking.openURL(pdfUrl)
//       .catch((err) => console.error("Erro ao abrir o link: ", err));
//   };

//   return (
//     <View style={styles.container}>
//       <Button title="Baixar PDF" onPress={handlePress} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

// export default PDF;
