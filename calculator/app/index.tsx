import {SafeAreaView, View, Text, StyleSheet, TouchableOpacity} from "react-native";
import { evaluate } from "mathjs";
import {useState} from "react";
const buttons = [
    "C", "+/-", "%", "/",
    "7", "8", "9", "*",
    "4", "5", "6", "-",
    "1", "2", "3", "+",
    "0", ".", "X", "="
];
const Calculator = () => {

    const [value, setValue] = useState<string>('');
    const [answer, setAnswer] = useState<string>('');


    const handleValueChange = (button: string) => {
        if (button === "C") {
            setValue("");
            setAnswer("");
        } else if (button === "=") {
            try {
                setAnswer(evaluate(value).toString());
            } catch (error) {
                setAnswer("Error");
            }
        } else if (button === "X") {
            setValue((prev) => prev.slice(0, -1));
            setAnswer("");
        } else {
            setValue((prev) => prev + button);
        }
    };
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.answer}>
                <Text style={{color: 'white', fontSize: 24, fontWeight: 'bold'}}>{answer || 0}</Text>
                <Text style={{color: '#bcc1c6', fontSize: 16}}>{value || 0}</Text>
            </View>
            <View style={styles.calc}>
                {buttons.map((button, index) => (
                    <TouchableOpacity key={index} onPress={() => handleValueChange(button)} style={styles.btn}>
                        <Text style={styles.btnText}>{button}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </SafeAreaView>
    )
}
export default Calculator;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: '#213344',
        height: '100%',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',

    },
    answer: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        gap: 10,
        alignItems: 'flex-end',
        width: '100%',
        marginVertical: 50,
        height: '15%',
    },
    calc: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 20
    },
    btn:{
        width: 70,
        height: 70,
        borderRadius: 15,
        backgroundColor: '#213344',
        shadowColor: "#bebebe",
        shadowOffset: {
            width: -3,
            height: 0,
        },
        shadowOpacity: 0.6,
        shadowRadius: 5,
        elevation: 3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnText:{
        fontSize: 20,
        fontWeight: 500,
        color: 'white',
    }
})