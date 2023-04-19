import { ImageBackground, StyleSheet, Text, View, Image, ToastAndroid, Alert, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { BtnPers, InputPers } from '../screens/Componentes'
import { useNavigation } from '@react-navigation/native'

const VerProducto = ({route}) => {

    const navigation = useNavigation()

    const {userId,producto} = route.params //datos que pasamos de la pantalla Productos

    const [nameProduct, setNameProduct] = useState('')
    const [descriptionProduct, setDescriptionProduct] = useState('')
    const [priceProduct, setPriceProduct] = useState()
    const [price, setPrice] = useState()
    const [stock, setStock] = useState()
    const [urlImage, setUrlImage] = useState('https://via.placeholder.com/200')
    const [loading, setLoading] = useState(true)

    const [cantidad, setCantidad] = useState(1);

    const showToast = (_msj) => {
        ToastAndroid.show(_msj, ToastAndroid.SHORT);
    };

    const incrementar=()=>{
        if(cantidad+1 > stock){
            showToast("No tenemos el stock suficiente.")
        }else{
            setCantidad(cantidad+1)
            setPriceProduct(priceProduct+price)
        }
    }
    const decrementar=()=>{
        if(cantidad != 1){
            setCantidad(cantidad-1)
            setPriceProduct(priceProduct-price)
        }
    }

    const navegarDatosEnvio = () =>{//navegamos a la pantalla de DatosEnvio pasandole los parametros que nesecita
        navigation.navigate('DatosEnvio', {
            userId: userId,
            producto: producto, //id del producto
            cantidad: cantidad, //cantidad a comprar
            total: priceProduct, //total de la compra dependiendo cuantos productos comprara
            newStock: stock-cantidad //al stock total del producto, le restamos la cantidad que se va a comprar
        })
    }

    const getProduct= async ()=>{//obtenemos el producto mediante el id proporcionado anteriormente
        try {
            const res = await globalThis.fetch(`https://api-rest-luis-r45f.vercel.app/products/${producto}`)
            const data = await res.json()
            setUrlImage(data.image.secure_url)
            setNameProduct(data.name)
            setDescriptionProduct(data.description)
            setPriceProduct(parseFloat(data.price))
            setPrice(parseFloat(data.price))
            setStock(parseFloat(data.stock))
            setLoading(false)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(()=>{
        getProduct()
        // setInterval(()=>{
        //     getProduct()
        // }, 10000)
    }, [])    

    return (
        <View style={styles.container}>
            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            ) : (
                <View>
                    <View style={styles.itemsSuperior}>
                        <View style={styles.txtNameimgLogo}>
                            <Text style={styles.txtName}>TopFoodye</Text>
                        </View>
                        <View style={styles.imgLogoArriba}>
                            <Image source={require('./images/logo.jpg')} style={styles.imgLogo}/>
                        </View>
                    </View>
                    <View style={styles.container2}>
                        <View style={styles.viewProducto}>
                            <View style={styles.viewImgProduct}>
                                <Image source={{ uri: urlImage}} style={styles.imgProduct}/>
                            </View>
                            <Text style={styles.txtNameProdut}>{nameProduct}</Text>
                            <Text style={styles.txtDescription}>{descriptionProduct}</Text>
                            <Text style={styles.txtPrice}>${priceProduct}</Text>
                            <View style={styles.cantidad}>
                                <BtnPers 
                                    tamaño='10%' 
                                    colorFondo = '#CC7FFF' 
                                    colorText = 'black' 
                                    radius={50}
                                    altura={30}
                                    onPress = {()=>decrementar()} 
                                    text="-"
                                />
                                <Text style={styles.txtCantidad}>{cantidad}</Text>
                                <BtnPers 
                                    tamaño='10%' 
                                    colorFondo = '#CC7FFF' 
                                    colorText = 'black' 
                                    radius={50}
                                    altura={30}
                                    onPress = {()=>incrementar()} 
                                    text="+"
                                />
                            </View>
                            
                            <BtnPers 
                                tamaño='50%' 
                                colorFondo = '#8500DC' 
                                colorText = 'white' 
                                radius={50}
                                altura={60}
                                onPress = {()=>navegarDatosEnvio()} 
                                text="Comprar"
                            />
                        </View>
                    </View>
                </View>
            )}
        </View>
    )   
}

export {VerProducto}

const styles = StyleSheet.create({
    container:{ 
        flex:1,
        width:'100%',
        paddingTop:10,
    },  
    container2:{
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
    txtDescription:{
        fontSize:15,
        marginBottom:10,
        textAlign:'center'
    },
    txtPrice:{
        fontSize:25,
        color:'red',
        fontWeight:'bold',
        textAlign:'center'
    },
    txtCantidad:{
        fontSize:15,
        color:'black',
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
        marginTop:150,
        marginBottom:20,
        width:'90%',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:20,
        backgroundColor:'#FFB96F',
        elevation: 5, 
    },
    viewImgProduct:{
        width:'100%',
        height:250,
        marginTop:-150,
        alignSelf:'center',
        marginBottom:10,
    },
    imgProduct:{
        width:'100%',
        height:'100%',
        borderRadius:20,
    },
    cantidad:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    }
})