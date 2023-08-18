import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  homeContainer: {
    paddingHorizontal: 16,
    flex: 1,
  },
  title: {
    fontSize: 32,
    color: "black",
    alignSelf: "center",
  },
  filterButton: {
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
  },
  inputFilter: {
    backgroundColor: "#D8D8D8",
  },
  radioButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  optionsContainer: {
    flexDirection: "row",
    marginVertical: 10,
    alignItems: "center",
  },
  searchBar: {
    width: "90%",
    backgroundColor: "#D8D8D8"
  },
  flexGrow: {
    flexGrow: 1
  }
});

export default styles;
