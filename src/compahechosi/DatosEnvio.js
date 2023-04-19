import { ImageBackground, StyleSheet, Text, View, Image, Alert, ActivityIndicator, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import { BtnPers, InputPers } from '../screens/Componentes'
import { useNavigation } from '@react-navigation/native'
import { ScrollView } from 'react-native'

const DatosEnvio = ({route}) => {
    //recuperamos los datos que se pasaron de la pantalla ver rproducto
    const {userId, producto, cantidad, total, newStock} = route.params

    const navigation = useNavigation()

    const [colonia, setColonia] = useState('')
    const [calle, setCalle] = useState('')
    const [noCasa, setNoCasa] = useState('')
    const [nombre, setNombre] = useState('')
    const [telefono, setTelefono] = useState('')
    const [referencias, setReferencias] = useState('')

    const showToast = (_msj) => {
        ToastAndroid.show(_msj, ToastAndroid.SHORT);
    };

    const venta = async () =>{
        if(colonia=='' || calle=='' || noCasa=='' || nombre=='' || telefono=='' || referencias==''){
            showToast('Debe rellenar todos los campos')
        }else{
            try {
                //insertamos el producto comprado en la coleccion de ventas
                const res = await fetch('https://api-rest-luis-r45f.vercel.app/ventas', {
                    method: 'POST',
                    headers:{
                        'Content-Type' : 'application/json'
                    },
                    body: JSON.stringify({
                        user: userId,
                        products: [//array con el producto y cantidad comprada
                            {
                                product: producto,//id del producto seleccionado
                                quantity: cantidad
                            }
                        ],
                        totalPrice:total
                    })
                })
                const data = await res.json()
                
                //actualizamos el stock del producto comprado pasandole el id del producto
                const actProducto = await fetch(`https://api-rest-luis-r45f.vercel.app/updateProducts/${producto}`,{
                    method: 'PUT',
                    headers: {
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify({
                        stock: newStock //stock que se recupero de la pantalla VerProducto
                    })
                })
                
                //insertamos en la coleccion envios los datos ingresados
                const res2 = await fetch('https://api-rest-luis-r45f.vercel.app/envios', {
                    method: 'POST',
                    headers: {
                        'Content-Type' : 'application/json'
                    },
                    body: JSON.stringify({//json con los datos a insertar en la coleccion envios
                        colonia: colonia,
                        calle: calle,
                        noCasa: noCasa,
                        recibe: nombre,
                        telefono: telefono,
                        referencias: referencias,
                        venta: data._id//id que se obtuvo del json regresado anteriormente al realizar la venta
                    })
                })
                
                showToast('Compra realizada correctamente')
                navigation.navigate('Tabs', {
                    userId: userId //navegamos nuevamente a tabs pasandole el id del usuario
                })
            } catch (error) {
                console.error(error)
            }
        }
    }
    
    return (
        <ScrollView style={styles.container}>
            <View style={styles.itemsSuperior}>
                <View style={styles.txtNameimgLogo}>
                    <Text style={styles.txtName}>TopFoodye</Text>
                </View>
                <View style={styles.imgLogoArriba}>
                    <Image source={require('./images/logo.jpg')} style={styles.imgLogo}/>
                </View>
            </View>
            <View style={styles.formLog}>
                <Text style={styles.txtLogin}>Ingresa tus Datos</Text>

                <View style={styles.boxInputs}>
                    <Text style={styles.txtInputs}>Colonia*</Text>
                </View>
                <InputPers
                    tipoDeCaja='text'
                    tamaño='100%' 
                    colorFondo='white' 
                    colorText='black' 
                    text='Aviacion' 
                    colorBorde='#EEEEEE'
                    tamBorde={2}
                    radius={50}
                    altura={45}
                    textIngresado={setColonia}
                    valorText={colonia}
                />

                <View style={styles.boxInputs}>
                    <Text style={styles.txtInputs}>Calle*</Text>
                </View>
                <InputPers
                    tipoDeCaja='text'
                    tamaño='100%' 
                    colorFondo='white' 
                    colorText='black' 
                    text='Adolfo Lopez' 
                    colorBorde='#EEEEEE'
                    tamBorde={2}
                    radius={50}
                    altura={45}
                    textIngresado={setCalle}
                    valorText={calle}
                />

                <View style={styles.boxInputs}>
                    <Text style={styles.txtInputs}>Numero de Casa*</Text>
                </View>
                <InputPers
                    tipoDeCaja='text'
                    tamaño='100%' 
                    colorFondo='white' 
                    colorText='black' 
                    text='2340 o S/N' 
                    colorBorde='#EEEEEE'
                    tamBorde={2}
                    radius={50}
                    altura={45}
                    textIngresado={setNoCasa}
                    valorText={noCasa}
                />

                <View style={styles.boxInputs}>
                    <Text style={styles.txtInputs}>Nombre de quien Recibe*</Text>
                </View>
                <InputPers
                    tipoDeCaja='text'
                    tamaño='100%' 
                    colorFondo='white' 
                    colorText='black' 
                    text='Juan Hernandez' 
                    colorBorde='#EEEEEE'
                    tamBorde={2}
                    radius={50}
                    altura={45}
                    textIngresado={setNombre}
                    valorText={nombre}
                />

                <View style={styles.boxInputs}>
                    <Text style={styles.txtInputs}>Telefono*</Text>
                </View>
                <InputPers
                    tipoDeCaja='phone-pad'
                    tamaño='100%' 
                    colorFondo='white' 
                    colorText='black' 
                    text='1234567890' 
                    colorBorde='#EEEEEE'
                    tamBorde={2}
                    radius={50}
                    altura={45}
                    textIngresado={setTelefono}
                    valorText={telefono}
                />

                <View style={styles.boxInputs}>
                    <Text style={styles.txtInputs}>Referencias*</Text>
                </View>
                <InputPers
                    tipoDeCaja='text'
                    tamaño='100%' 
                    colorFondo='white' 
                    colorText='black' 
                    text='Al lado de miscelanea xxxx' 
                    colorBorde='#EEEEEE'
                    tamBorde={2}
                    radius={50}
                    altura={45}
                    textIngresado={setReferencias}
                    valorText={referencias}
                />
                    
                <BtnPers 
                    tamaño='100%' 
                    colorFondo = '#8500DC' 
                    colorText = 'white' 
                    radius={50}
                    altura={60}
                    onPress = {()=>venta()} 
                    text="Comprar"
                />
            </View>
        </ScrollView>
    )
}

export {DatosEnvio}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white'
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
    txtLogin:{
        fontSize:30,
        fontWeight:'bold',
        marginTop:15,
        marginBottom:20,
    },
    boxInputs:{
        alignSelf:'flex-start',
    },
    txtInputs:{
        fontSize:15,
        fontWeight: '700',
        textAlign:'left',
    },
    txtRegister:{
        paddingVertical:20,
        fontWeight:'900'
    }, 
    reg:{
        flexDirection:'row',
        alignSelf:'flex-start',
    },
    formLog:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        paddingTop:30,
        width:'90%',
        alignSelf:'center'
    }
})