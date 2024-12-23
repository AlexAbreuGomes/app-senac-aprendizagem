import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

interface CourseCardProps {
  title: string;
  progress: number;
  onPress: () => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({ title, progress, onPress }) => {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.header}>
        <View style={styles.icon}>
          {/* Aqui pode adicionar um ícone SVG ou outro componente */}
        </View>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.progressContainer}>
        <View style={[styles.progressBar, { width: `${progress}%` }]} />
      </View>
      <View style={styles.footer}>
        <Text style={styles.progressText}>Progresso</Text>
        <Text style={styles.percentage}>{progress}%</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#0059B3",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 4,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  icon: {
    width: 40,
    height: 40,
    backgroundColor: "#084A9E",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFF",
    flex: 1,
  },
  progressContainer: {
    height: 8,
    backgroundColor: "#084A9E",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#FFF",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  progressText: {
    fontSize: 12,
    color: "#FFF",
  },
  percentage: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#FFF",
  },
});


