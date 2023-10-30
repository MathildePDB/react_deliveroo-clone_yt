import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import tw from 'twrnc';
import { StarIcon, MapPinIcon } from 'react-native-heroicons/solid';
import { urlFor } from '../sanity';
import { useNavigation } from '@react-navigation/native';

const RestaurantCard = ({
    id,
    imgUrl,
    title,
    rating,
    genre,
    address,
    short_description,
    dishes,
    long,
    lat,
}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity 
    onPress={() => {
      navigation.navigate('Restaurant', {
        id, imgUrl, title, rating, genre, address, short_description, dishes, long, lat,
      });
    }}
    style={tw`bg-white mr-3 shadow`}>
      <Image 
        source={{
            uri: urlFor(imgUrl).url(),
        }}
        style={tw`h-36 w-64 rounded-sm`}
      />
      <View style={tw`px-3 pb-4`}>
        <Text style={tw`font-bold text-lg pt-2`}>{title}</Text>
        <View style={tw`flex-row items-center`}>
            <StarIcon color="green" opacity={0.5} size={22} />
            <Text style={tw`text-xs text-gray-500`}>
                <Text style={tw`text-green-500`}>{rating}</Text> · {genre}</Text>
        </View>
        <View style={tw`flex-row items-center`}>
            <MapPinIcon color="gray" opacity={0.4} size={22} />
            <Text style={tw`text-xs text-gray-500`}>Nearby · {address}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default RestaurantCard