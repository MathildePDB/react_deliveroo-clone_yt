import { useNavigation } from '@react-navigation/native';
import React, { useLayoutEffect, useState, useEffect } from 'react';
import { View, Text, Image, TextInput, ScrollView} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc';
import { UserIcon, ChevronDownIcon, MagnifyingGlassIcon, AdjustmentsVerticalIcon} from "react-native-heroicons/outline";
import Categories from '../components/Categories';
import FeaturedRow from '../components/FeaturedRow';
import sanityClient from '../sanity';
// import category from '../sanity/schemas/category';

function HomeScreen() {
  const navigation = useNavigation();
  const [featuredCategories, setFeaturedCategories] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, [])

  useEffect(() => {
    sanityClient.fetch(`
      *[_type == "featured"] {
        ...,
        restaurants[]->{
          ...,
          dishes[]->

        },
      }
    `).then((data) => {
      setFeaturedCategories(data);
    });
  }, [])

  return (
    <SafeAreaView style={tw`bg-white pt-5`}>
        {/* Header */}
        <View style={tw`flex-row pb-3 items-center px-4`}>
          <Image 
            source={{
              uri: 'https://links.papareact.com/wru',
            }}
            style={tw`h-7 w-7 bg-gray-300 p-4 rounded-full`}
          />

          <View style={tw`flex-1`}>
            <Text style={tw`px-2 font-bold text-gray-400 text-xs`}>
              Deliver now!
            </Text>
            <Text style={tw`px-2 font-bold text-xl`}>
              Current location
              <ChevronDownIcon size={20} color="#00CCBB"/>
            </Text>
          </View>

          <UserIcon size={35} color="#00CCBB" />
        </View>

        {/* Search */}
        <View style={tw`flex-row items-center pb-4 px-4`}>
          <View style={tw`flex-1 flex-row items-center bg-gray-200 p-3 mr-2`}>
            <MagnifyingGlassIcon color="gray" size={20}/>
            <TextInput 
              placeholder="Restaurants and cuisines"
              keyboardType="default"
              style={tw`px-2 flex-1`}
            />
          </View>
          <AdjustmentsVerticalIcon color="#00CCBB" />
        </View>

        {/* Body */}
        <ScrollView style={tw`bg-gray-100 pb-100`}>
          <Categories />
          {/* Featured */}
          {featuredCategories?.map((category) => (
            <FeaturedRow
            key={category._id}
            id={category._id}
            title={category.name}
            description={category.short_description}
            />
          ))}
        </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen