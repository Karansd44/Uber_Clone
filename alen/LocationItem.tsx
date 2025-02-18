import {View , Text, TouchableOpacity} from "react-native";
import React , {FC} from "react";
import { locationStyles } from "./locationStyles";
import {commonStyles } from "@/styles/commonStyles";
import { Image } from "react-native-elements";
import CustomText from "@/components/shared/CustomText"
import {uiStyles } from "@/styles/uiStyles";
import { opacity } from "react-native-reanimated/lib/typescript/Colors";



const LocationItem: FC<{item:any , onPress: () => void }>=({item ,onPress})=>
{
    return (
        <TouchableOpacity style={[commonStyles.flexRowBetween ,locationStyles.container]}
        onPress={onPress}
        >
            <View style ={commonStyles.flexRow}>
            <Image source={require('@/assets/icons/map-pin2.png')} style ={uiStyles.mapPinIcon} />
                    <CustomText fontFamily='Medium' fontSize={12}>
                       {item?.title}
                    </CustomText>
                    <CustomText fontFamily='Regular' numberOfLines ={1} style={{opacity:0.7,marginTop :2}} fontSize={10}>
                        {item?.description}
                    </CustomText>
            </View>

            <Ionicons name ="heart-outline" size={20} color ="#ccc" />
            

        </TouchableOpacity>
    )
}

export default LocationItem