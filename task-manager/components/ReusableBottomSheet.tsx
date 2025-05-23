import React, { forwardRef, useMemo } from "react";
import { StyleSheet, ViewStyle } from "react-native";
import BottomSheet, { BottomSheetFlatList, BottomSheetView } from "@gorhom/bottom-sheet";
import { ThemedText } from "@/components/ThemedText";

interface ReusableBottomSheetProps {
    data: string[];
    onChange: (index: number) => void;
    snapPoints?: (string | number)[];
    containerStyle?: ViewStyle;
}

const ReusableBottomSheet = forwardRef<BottomSheet, ReusableBottomSheetProps>(
    ({ data, onChange, containerStyle, snapPoints }, ref) => {
        const defaultSnapPoints = useMemo(() => ["25%", "50%", "90%"], []);
        const sheetSnapPoints = snapPoints || defaultSnapPoints;
        return (
            <BottomSheet
                ref={ref}
                onChange={onChange}
                snapPoints={sheetSnapPoints}
                enableDynamicSizing={false}
                enablePanDownToClose={true}
            >
                <BottomSheetFlatList
                    contentContainerStyle={[styles.contentContainer, containerStyle]}
                    data={data}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => <ThemedText>{item}</ThemedText>}
                />
            </BottomSheet>
        );
    }
);

export default ReusableBottomSheet;

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        padding: 36,
        alignItems: "center",
    },
});
