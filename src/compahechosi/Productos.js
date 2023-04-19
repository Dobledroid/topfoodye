import { Image, SafeAreaView, ToastAndroid, ScrollView, StyleSheet, Text, View, ActivityIndicator, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { FlatList } from 'react-native'
import { TouchableOpacity } from 'react-native'
import {Picker} from '@react-native-picker/picker';

const Productos = (props) => {
    
    const userId = props.userId
    const navigation = useNavigation();
    const [products, setProducts] = useState('Todos')
    const [loading, setLoading] = useState(true)

    const [selectedValue, setSelectedValue] = useState('');


    const viewProduct=(productId)=>{//navegacion para mostrar el producto que se ha dado clic pasandole el id
        navigation.navigate('VerProducto',{
            userId: userId,
            producto: productId
        })
    }

    useEffect(()=>{
        actualizarProductos('Todos')//llamamos la funcion actualizar pasandole que nos muestre todos los productos
        // setInterval(()=>{
            
        // }, 1000)
    }, [])

    const actualizarProductos=(selected)=>{//funcion para cargar los productos mediante la catgeoria seleccionada
        setSelectedValue(selected)
        setLoading(true)
        getAllProducts(selected)//llamamos la funcion para obtener los productos pasandole la categoria seleccionada
    }

    const getAllProducts = async (selected)=>{//obtenemos los productos por categoria
        if(selected=='Todos'){
            try {
                //obtenemos todos los productos registrados en la base de datos
                const res = await globalThis.fetch('https://api-rest-luis-r45f.vercel.app/products')
                const data = await res.json()
                setProducts(data)
                setLoading(false)
            } catch (error) {
                console.error(error)
            }
        }else{
            try {
                //obtenemos los productos que pertenezcan a la categoria seleccionada
                const res = await fetch(`https://api-rest-luis-r45f.vercel.app/getProductsCategorie/${selected}`)
                const data = await res.json()
                setProducts(data)
                setLoading(false)
            } catch (error) {
                console.error(error)
            }
        }
    }

    const productos = ({item}) =>(//funcion para renderizar los productos
        <ScrollView>
            <SafeAreaView style={styles.container2}>
                <TouchableOpacity style={styles.viewProducto} onPress={()=>viewProduct(item._id)}>
                    <View style={styles.viewImgProduct}>
                        <Image source={{ uri: item.image.secure_url}} style={styles.imgProduct}/>
                    </View>

                    <Text style={styles.txtNameProdut}>{item.name}</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </ScrollView>
    )

    return (
        <SafeAreaView style={styles.container}>
            {loading ?(
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            ) : (
                <View style={styles.container}>
                    <View style={styles.itemsSuperior}>
                        <View style={styles.txtNameimgLogo}>
                            <Text style={styles.txtName}>TopFoodye</Text>
                        </View>
                        <View style={styles.imgLogoArriba}>
                            <Image source={require('./images/logo.jpg')} style={styles.imgLogo}/>
                        </View>
                    </View>
                    
                    <Picker
                        selectedValue={selectedValue}
                        onValueChange={(itemValue, itemIndex) => {
                            setSelectedValue(itemValue);
                            actualizarProductos(itemValue)
                        }}
                    >
                        <Picker.Item label="Todos los productos" value="Todos" />
                        <Picker.Item label="Desayunos" value="641f6a66e60485c0d8ddd433" />
                        <Picker.Item label="Comidas" value="641f6a5de60485c0d8ddd431" />
                        <Picker.Item label="Bebidas" value="641f6a6be60485c0d8ddd435" />
                    </Picker>

                    <FlatList
                        data = {products}
                        renderItem = {productos}
                    />
                </View>
            )}   
        </SafeAreaView>
        
    )
}

export { Productos }
const styles = StyleSheet.create({
    container:{ 
        flex:1,
    },  
    container2:{
        flex:1,
        alignItems:'center'
    },
    loadingContainer:{
        flex:1,
        justifyContent:'center',
    },
    itemsSuperior:{
        flexDirection:'row',
        marginTop:20,
    },
    txtNameimgLogo:{
        flex:1,
        alignContent:'flex-start',
        justifyContent:'center'
    },
    txtName:{
        fontSize:20,
        fontWeight:'900',
        marginLeft:20,
    },
    txtNameProdut:{
        fontSize:20,
        fontWeight:'bold',
        marginBottom:10,
        textAlign:'center'
    },
    imgLogoArriba:{
        alignContent:'flex-end',
    },
    imgLogo:{
        width:50,
        height:50,
        borderRadius:10,
        marginRight:20,
    },
    viewProducto:{
        marginTop:70,
        marginBottom:10,
        width:'90%',
        alignItems:'center',
        // borderBottomLeftRadius:20,
        // borderTopRightRadius:20,
        borderRadius:20,
        backgroundColor:'#FFB96F',
        elevation: 5,
    },
    viewImgProduct:{
        width:'100%',
        height:250,
        marginTop:-70,
        alignSelf:'center',
        marginBottom:10,
    },
    imgProduct:{
        width:'100%',
        height:'100%',
        borderTopRightRadius:20,
        borderTopLeftRadius:20,
    },
})