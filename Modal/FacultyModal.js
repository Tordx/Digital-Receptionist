import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View , Image } from "react-native";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { closeFacultyModal } from "../Redux/FacultySlice";



export default function FacultyModal() {

    const dispatch = useDispatch();
    const {isOpen} = useSelector((store) => store.facultymodal)
    const {facultyData} = useSelector((store) => store.facultymodal)
    
    // const [modalVisible, setModalVisible] = useState(false);

    return (

        <View style={styles.centeredView}>
          <Modal
            animationType="none"
            transparent={true}
            visible={isOpen}
            onRequestClose={() => {
                dispatch(closeFacultyModal())
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>{'Facultyname:  ' + facultyData.Facultyname}</Text>
                <Text style={styles.modalText}>{'FacultyBuilding:  ' + facultyData.FacultyBuilding}</Text>
                <Text style={styles.modalText}>{'FacultyPresident:  ' + facultyData.FacultyPresident}</Text>
                <Text style={styles.modalText}>{'FacultyVicePresident:  ' + facultyData.FacultyVicePresident}</Text>
                {/* <Image
                    resizeMode="contain" style={{width: 600, height: 500}} source={{uri:eventData.EventImage}}
                /> */}
                {/* <Pressable
                  style={[styles.button, styles.buttonClose]}
                //   onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyle}>Hide Modal</Text>
                </Pressable> */}
              </View>
            </View>
          </Modal>
          {/* <Pressable
            style={[styles.button, styles.buttonOpen]}
            // onPress={() => setModalVisible(true)}
          >
            <Text style={styles.textStyle}>Show Modal</Text>
          </Pressable> */}
        </View>
      );
    };
    
    const styles = StyleSheet.create({
      centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        // marginTop: 22
      },
      modalView: {
        margin: 20,
        width: 1100,
        height: 800,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
      },
      buttonOpen: {
        backgroundColor: "#F194FF",
      },
      buttonClose: {
        backgroundColor: "#2196F3",
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        fontSize: 35,
        marginBottom: 15,
        textAlign: "center"
      }
    });