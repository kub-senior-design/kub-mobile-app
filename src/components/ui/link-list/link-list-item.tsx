import { Ionicons } from "@expo/vector-icons";
import { JSX } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import colors from "@/styles/colors";

import { LinkOption } from ".";

type LinkListItemProps = {
  item: LinkOption;
  index: number;
  dataLength: number;
};

export default function LinkListItem({
  item,
  index,
  dataLength,
}: LinkListItemProps): JSX.Element {
  return (
    <TouchableOpacity
      style={[
        styles.listItem,
        index < dataLength - 1 && styles.listItemWithBorder,
      ]}
      onPress={item.onPress}
    >
      <View style={styles.itemContent}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.chevron}>
          <Ionicons name="chevron-forward" size={24} color={colors.secondary} />
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chevron: {
    marginLeft: "auto",
  },
  itemContent: {
    alignItems: "center",
    flexDirection: "row",
    flex: 1,
  },
  itemTitle: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "500",
  },
  listItem: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  listItemWithBorder: {
    borderBottomColor: colors.gray,
    borderBottomWidth: 1,
  },
});
