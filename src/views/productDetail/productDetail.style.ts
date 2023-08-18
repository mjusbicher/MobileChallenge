import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  titleContainer: {
    display: "flex",
    flexDirection: "column",
  },
  detailContainer: { 
    flexGrow: 1, 
    paddingHorizontal: 10, 
    gap: 8 },
  image: {
    height: 400,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  icon: {
    width: 50,
  },
  button: {
    marginBottom: 10,
  },
});

export default styles;
