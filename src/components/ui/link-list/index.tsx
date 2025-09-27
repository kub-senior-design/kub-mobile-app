import { ReactNode } from "react";
import { FlatList, StyleSheet, View, ViewStyle } from "react-native";

import colors from "@/styles/colors";

import LinkListItem from "./link-list-item";

export type LinkOption = {
  title: string;
  onPress?: () => void;
};

type LinkListProps = {
  data: LinkOption[];
  style?: ViewStyle;
};

export default function LinkList({ data, style }: LinkListProps): ReactNode {
  return (
    <View style={[styles.listContainer, style]}>
      <FlatList
        data={data}
        renderItem={({ item, index }) => (
          <LinkListItem item={item} index={index} dataLength={data.length} />
        )}
        keyExtractor={(_, index) => index.toString()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    backgroundColor: colors.background,
    borderRadius: 12,
    overflow: "hidden",
  },
});
