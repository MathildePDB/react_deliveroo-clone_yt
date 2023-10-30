import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux';
import { selectRestaurant } from '../features/restaurantSlice';
import { removeFromBasket, selectBasketItems, selectBasketTotal } from '../features/basketSlice';
import tw from 'twrnc';
import { XCircleIcon } from 'react-native-heroicons/solid';
import { SafeAreaView } from 'react-native-safe-area-context';
import { urlFor } from '../sanity';

const BasketScreen = () => {
    const navigation = useNavigation();
    const restaurant = useSelector(selectRestaurant);
    const items = useSelector(selectBasketItems);
    const [groupedItemsInBasket, setGroupedItemsInBasket] = useState([]);
    const dispatch = useDispatch();
    const basketTotal = useSelector(selectBasketTotal);

    useEffect(() => {
        const groupedItems = items.reduce((results, item) => {
            (results[item.id] = results[item.id] || []).push(item);
            return results;
        }, {});
        setGroupedItemsInBasket(groupedItems);
    }, [items]);

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
        <View style={tw`flex-1 bg-gray-100`}>
            <View style={tw`p-5 border-b border-[#00BBCC] bg-white shadow-sm`}>
                <View>
                    <Text style={tw`text-lg font-bold text-center`}>Basket</Text>
                    <Text style={tw`text-center text-gray-400`}>{restaurant.title}</Text>
                </View>
                <TouchableOpacity
                    onPress={navigation.goBack}
                    style={tw`rounded-full bg-gray-100 absolute top-3 right-5`}>
                    <XCircleIcon color="#00CCBB" height={50} width={50} />
                </TouchableOpacity>
            </View>
            <View style={tw`flex-row items-center px-4 py-3 bg-white my-5`}>
                <Image source={{
                    uri: "http://links.papareact.com/wru"
                }}
                    style={tw`h-7 w-7 bg-gray-300 p-4 rounded-full`}
                />
                <Text style={tw`flex-1 pl-4`}>Deliver in 50-75 min</Text>
                <TouchableOpacity>
                    <Text style={tw`text-[#00CCBB]`}>Change</Text>
                </TouchableOpacity>
            </View>
            <ScrollView>
                {Object.entries(groupedItemsInBasket).map(([key, items]) => (
                    <View key={key} style={tw`flex-row items-center bg-white py-2 px-5`}>
                        <Text style={tw`pr-3 text-[#00CCBB]`}>{items.length} x</Text>
                        <Image 
                            source={{ uri: urlFor(items[0]?.image).url() }}
                            style={tw`h-12 w-12 rounded-full`} 
                        />
                        <Text style={tw`flex-1 pl-3`}>{items[0]?.name}</Text>
                        <Text style={tw`text-gray-600`}>
                            {items[0]?.price.toFixed(2)} €
                        </Text>
                        <TouchableOpacity>
                            <Text 
                                style={tw`text-[#00CCBB] text-xs pl-3`} 
                                onPress={() => dispatch(removeFromBasket({id:key}))}
                            >
                                Remove
                            </Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>
            <View style={tw`p-5 bg-white mt-5`}>
                <View style={tw`flex-row justify-between py-2`}>
                    <Text style={tw`text-gray-400`}>Subtotal</Text>
                    <Text style={tw`text-gray-400`}>{basketTotal.toFixed(2)} €</Text>
                </View>
                <View style={tw`flex-row justify-between py-2`}>
                    <Text style={tw`text-gray-400`}>Delivery Fee</Text>
                    <Text style={tw`text-gray-400`}>{5.99} €</Text>
                </View>
                <View style={tw`flex-row justify-between py-2`}>
                    <Text>Order Total</Text>
                    <Text style={tw`font-extrabold`}>{(basketTotal + 5.99).toFixed(2)} €</Text>
                </View>
                <TouchableOpacity 
                    style={tw`rounded-lg bg-[#00CCBB] p-4 mt-3`}
                    onPress={() => navigation.navigate("PreparingOrderScreen")}
                >
                    <Text style={tw`text-center text-white font-bold text-lg`}>Place order</Text>
                </TouchableOpacity>
            </View>
        </View>
    </SafeAreaView>
  )
}

export default BasketScreen