import {View ,Text, TouchableOpacity} from "react-native";
import React, { useEffect, useState } from 'react';
import { StatusBar } from "expo-status-bar";
import {homeStyles } from "@/styles/homeStyles"
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons"
import {Colors} from "@/utils/constants"
import {commonStyles } from "@/styles/commonStyles";
import {router } from "expo-router";
import CustomText from "@/components/shared/CustomText"
import {uiStyles } from "@/styles/uiStyles";
import LocationInput from "./LocationInput";
import {getPlacesSuggestions } from "@/utils/mapUtils"
import { FlatList } from "react-native-gesture-handler";
import { locationStyles } from "./locationStyles";
import { Image } from "react-native-elements";
import { useUserStore} from '@/store/useUserStore';
import LocationItem from "./LocationItem";

 const  Selectlocation = () => {
    const {Location} =useUserStore()

    const [pickup,setPickup] =useState("")
    const [pickupCoords , setPickupCoords]=useState<any>(null)
    const [dropCoords,setDropCoords]=useState<any>(null)
    const [drop ,setDrop]=useState("")
    const [locations,setLocations] =useState([])
    const [focusedInput ,setFocusedInput]=useState('drop')
    const [modalTitle,setModalTitle]=useState('drop')
    const [isMapModalVisible , setMapModalVisible]=useState(false);


    const fetchLocation = async(query :string) =>{
        if(query?.length >4){
            const data=await getPlacesSuggestions(query)
            setLocations(data)
        }
    }


    useEffect(()=>{
        if(location){
            setPickupCoords(location)
            setPickup(location?.address)
        }
    },[location])


    const addLocation=async (id: string) =>
    {

    }

    const renderLocations =({item}:any)=>{
        return(
           <LocationItem item={item} onPress={() =>addLocation(item?.place_id)}/>
        )
    }
    return (
        <View>
           
            <StatusBar style='light' backgroundColor ='orange' translucent ={false} />
            <SafeAreaView />
            <TouchableOpacity style={commonStyles.flexRow} onPress={()=>router.back()}>
                <Ionicons name ="chevron-black" size={24} color ={Colors.isoColor} />
                <CustomText fontFamily ='Regular' style={{color :Colors.isoColor}} > Back</CustomText>
            </TouchableOpacity>

            <View style={uiStyles.locationInputs}>
                <LocationInput 
                
                placeholder="Search Pickup Location"
                type="pickup"
                value={pickup}
                onChangeText={(text) => {
                    setPickup(text)
                    fetchLocation(text)

                }}

                onFocus={()=>setFocusedInput('pickup')}
                
                />

<LocationInput 
                
                placeholder="Search Drop Location"
                type="drop"
                value={drop}
                onChangeText={(text) => {
                    setDrop(text)
                    fetchLocation(text)

                }}

                onFocus={()=>setFocusedInput('drop')}
                />
                <CustomText fontFamily='Medium' fontSize={10} style ={uiStyles.suggestionText}>
                    {focusedInput} suggestions
                </CustomText>
            </View>
            <FlatList 
            data={locations}
            renderItem={renderLocations}
            keyExtractor={(item:any) =>item?.place_id}
            initialNumToRender={5}
            windowSize={5}
            ListFooterComponent={
                <TouchableOpacity style ={[commonStyles.flexRow , locationStyles.container]}
                onPress={()=>{
                    setModalTitle(focusedInput)
                    setMapModalVisible(true)

                }}
                >
                    <Image source={require('@/assets/icons/map-pin.png')} style ={uiStyles.mapPinIcon} />
                    <CustomText fontFamily='Medium' fontSize={12}>
                        Select from Map
                    
                    </CustomText>

                </TouchableOpacity>
            }

            />
        </View>
    )
 }