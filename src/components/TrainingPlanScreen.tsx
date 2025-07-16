// src/components/TrainingPlanScreen.tsx
import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { TrainingPlanScreenProps, PlanSlot } from '@types/Index';

const TrainingPlanScreen: React.FC<TrainingPlanScreenProps> = ({ planForDay, onSuggestExercises, onShowRouteInfo, loading }) => {
    const renderTimeSlot = (slot: PlanSlot | null, slotName: string) => {
        if (!slot) return null;

        const showSuggestButton = ['Arbeits-Workout', 'Krafttraining', 'HIIT/Schnellkraft', 'Regeneration/Dehnen'].includes(slot.type);
        const showRouteButton = slot.type === 'Fahrradfahren';

        return (
            <View key={slotName} style={styles.timeSlotCard}>
                <View style={styles.timeSlotContent}>
                    <Text style={styles.timeSlotTime}>{slot.time}</Text>
                    <Text style={styles.timeSlotActivity}>{slot.activity}</Text>
                </View>
                <View style={styles.timeSlotButtons}>
                    {showSuggestButton && (
                        <TouchableOpacity
                            style={styles.suggestButton}
                            onPress={() => onSuggestExercises(slot.type)}
                            disabled={loading}
                        >
                            <Text style={styles.buttonText}>{loading ? 'Lädt...' : 'Übungen vorschlagen'}</Text>
                        </TouchableOpacity>
                    )}
                    {showRouteButton && (
                        <TouchableOpacity
                            style={styles.routeButton}
                            onPress={onShowRouteInfo}
                        >
                            <Text style={styles.buttonText}>Routen-Info</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        );
    };

    return (
        <ScrollView style={styles.scrollView}>
            <View style={styles.sectionCard}>
                <Text style={styles.sectionTitle}>Arbeitszeit (08:00-18:00)</Text>
                {renderTimeSlot(planForDay.morning, 'morning')}
                {renderTimeSlot(planForDay.lunch, 'lunch')}
                {(!planForDay.morning && !planForDay.lunch) && (planForDay.type !== 'Samstag' && planForDay.type !== 'Sonntag') && (
                    <Text style={styles.noActivityText}>Keine spezifischen Workouts in der Arbeitszeit geplant.</Text>
                )}
                {(planForDay.type === 'Samstag' || planForDay.type === 'Sonntag') && (
                    <Text style={styles.noActivityText}>Keine Arbeitszeit an diesem Tag.</Text>
                )}
            </View>

            <View style={[styles.sectionCard, styles.greenBg]}>
                <Text style={styles.sectionTitle}>Nach Feierabend</Text>
                {renderTimeSlot(planForDay.afterWork, 'afterWork')}
                {!planForDay.afterWork && (
                    <Text style={styles.noActivityText}>Keine spezifischen Workouts nach Feierabend geplant.</Text>
                )}
            </View>

            <View style={[styles.sectionCard, styles.purpleBg]}>
                <Text style={styles.sectionTitle}>Abend</Text>
                {renderTimeSlot(planForDay.evening, 'evening')}
                {!planForDay.evening && (
                    <Text style={styles.noActivityText}>Keine spezifischen Workouts am Abend geplant.</Text>
                )}
            </View>

            {planForDay.lateEvening && (
                <View style={[styles.sectionCard, styles.yellowBg]}>
                    <Text style={styles.sectionTitle}>Später Abend</Text>
                    {renderTimeSlot(planForDay.lateEvening, 'lateEvening')}
                </View>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
    },
    sectionCard: {
        backgroundColor: '#f0f9ff', // Very light blue
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
    },
    greenBg: {
        backgroundColor: '#ecfdf5', // Very light green
    },
    purpleBg: {
        backgroundColor: '#f3e8ff', // Very light purple
    },
    yellowBg: {
        backgroundColor: '#fffbeb', // Very light yellow
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1e3a8a',
        marginBottom: 10,
    },
    timeSlotCard: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 12,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 1,
        elevation: 1,
    },
    timeSlotContent: {
        flex: 1,
        marginRight: 10,
    },
    timeSlotTime: {
        fontSize: 13,
        fontWeight: '600',
        color: '#6b7280', // Medium gray
    },
    timeSlotActivity: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
    },
    timeSlotButtons: {
        flexDirection: 'column',
        alignItems: 'flex-end',
    },
    suggestButton: {
        backgroundColor: '#2563eb', // Blue
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
        marginBottom: 5,
    },
    routeButton: {
        backgroundColor: '#8b5cf6', // Purple
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
    },
    buttonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    noActivityText: {
        fontSize: 14,
        color: '#6b7280',
        fontStyle: 'italic',
        textAlign: 'center',
        paddingVertical: 10,
    },
});

export default TrainingPlanScreen;