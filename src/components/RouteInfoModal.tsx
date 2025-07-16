// src/components/RouteInfoModal.tsx
import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { RouteInfoModalProps } from '@types/Index';

const RouteInfoModal: React.FC<RouteInfoModalProps> = ({ visible, onClose, openGoogleMaps }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={modalStyles.centeredView}>
                <View style={modalStyles.modalView}>
                    <Text style={modalStyles.modalTitle}>Routenplanung für Fahrrad</Text>
                    <Text style={modalStyles.modalText}>
                        Für die detaillierte Routenplanung nutzen wir Google Maps. Die App kann keine Routen direkt generieren, aber sie hilft dir, Google Maps mit dem Ziel voreinzustellen.
                    </Text>
                    <Text style={modalStyles.modalListHeader}>Anleitung:</Text>
                    <Text style={modalStyles.modalListItem}>
                        • Tippe auf den Button "Google Maps öffnen", um die Karte mit dem Ziel "Gateway to English" zu öffnen.
                    </Text>
                    <Text style={modalStyles.modalListItem}>
                        • Dein Startpunkt: Gib in Google Maps deinen aktuellen Standort (dein Zuhause) als Startpunkt ein.
                    </Text>
                    <Text style={modalStyles.modalListItem}>
                        • Hinweg (unterschiedlich/zufällig): Google Maps bietet oft mehrere Fahrradrouten an. Wähle eine Route, die dir interessant erscheint oder die du noch nicht gefahren bist.
                    </Text>
                    <Text style={modalStyles.modalListItem}>
                        • Rückweg (schnellste Strecke): Für den Rückweg (Ziel: dein Zuhause, Start: Englischkurs) wähle in Google Maps die Option "schnellste Route" für Fahrräder.
                    </Text>
                    <View style={modalStyles.buttonContainer}>
                        <TouchableOpacity
                            style={[modalStyles.button, modalStyles.buttonGreen]}
                            onPress={openGoogleMaps}
                        >
                            <Text style={modalStyles.textStyle}>Google Maps öffnen</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[modalStyles.button, modalStyles.buttonClose]}
                            onPress={onClose}
                        >
                            <Text style={modalStyles.textStyle}>Schließen</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const modalStyles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '90%',
        maxWidth: 500,
    },
    modalTitle: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 22,
        fontWeight: 'bold',
        color: '#1e3a8a',
    },
    modalText: {
        marginBottom: 10,
        textAlign: 'center',
        fontSize: 16,
        color: '#333',
    },
    modalListHeader: {
        marginTop: 10,
        marginBottom: 5,
        fontSize: 16,
        fontWeight: 'bold',
        alignSelf: 'flex-start',
        color: '#333',
    },
    modalListItem: {
        fontSize: 14,
        marginBottom: 4,
        alignSelf: 'flex-start',
        color: '#555',
    },
    buttonContainer: {
        flexDirection: 'row',
        marginTop: 20,
        justifyContent: 'space-around',
        width: '100%',
    },
    button: {
        borderRadius: 10,
        padding: 12,
        elevation: 2,
        minWidth: 120,
        alignItems: 'center',
    },
    buttonGreen: {
        backgroundColor: '#16a34a',
    },
    buttonClose: {
        backgroundColor: '#6b7280',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 16,
    },
});

export default RouteInfoModal;