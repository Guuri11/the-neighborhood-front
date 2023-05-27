import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import Heading from "./Heading";
import { GRAY_COLOR, PRIMARY_COLOR } from "../../../assets/colors";

const GamesTable = () => {
  const [active, setActive] = useState(true);
  return (
    <View style={styles.tableBox}>
      <View style={styles.headsBox}>
        <Heading style={active ? styles.headStyleActive : styles.headStyle} size={3}>
          Park
        </Heading>
        <Heading style={active ? styles.headStyleActive : styles.headStyle} size={3}>
          Against
        </Heading>
        <Heading style={active ? styles.headStyleActive : styles.headStyle} size={3}>
          Date
        </Heading>
        <Heading style={active ? styles.headStyleActive : styles.headStyle} size={3}>
          Result
        </Heading>
      </View>
      <View style={styles.rowsBox}>
        <Heading style={{marginTop: 0}} size={3}>Lorem</Heading>
        <Heading style={{marginTop: 0}} size={3}>User 2</Heading>
        <Heading style={{marginTop: 0}} size={3}>2023/04/15</Heading>
        <Heading style={{marginTop: 0}} size={3}>11-07</Heading>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tableBox: {
    marginLeft: "5%",
    maxWidth: "90%",
  },
  headsBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
    maxWidth: "100%",
    borderBottomColor: GRAY_COLOR,
    borderBottomWidth: 3,
  },
  headStyleActive: {
    fontWeight: "bold",
    borderBottomColor: PRIMARY_COLOR,
    borderBottomWidth: 3,
  },
  headStyle: {
    fontWeight: "bold",
  },
  rowsBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 15,
    maxWidth: "100%",
    borderBottomColor: GRAY_COLOR,
    borderBottomWidth: 3,
  },
});

export default GamesTable;
