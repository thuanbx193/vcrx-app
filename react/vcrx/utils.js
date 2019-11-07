import { Dimensions, Platform } from "react-native";
import DeviceInfo from "react-native-device-info";

export function isHuawei() {
    return ( DeviceInfo.getBrand() === "HUAWEI"  );
}

export function isIphoneX() {
    const dim = Dimensions.get("window");

    return (
        Platform.OS === "ios" &&
        (isIPhoneXSize(dim) || isIPhoneXrSize(dim))
    );
}

export function isIPhoneXSize(dim) {
    return dim.height == 812 || dim.width == 812;
}

export function isIPhoneXrSize(dim) {
    return dim.height == 896 || dim.width == 896;
}

export const sum = arr => arr.reduce((acc, n) => acc + n, 0);
