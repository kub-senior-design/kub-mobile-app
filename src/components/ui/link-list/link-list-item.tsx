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
  listItem: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  listItemWithBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.gray,
  },
  itemContent: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.white,
  },
  itemSubtitle: {
    fontSize: 14,
    color: colors.secondary,
    marginTop: 2,
  },
  chevron: {
    marginLeft: "auto",
  },
});
