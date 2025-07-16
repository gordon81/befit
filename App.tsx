// App.tsx - Hauptkomponente der React Native App
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text, TouchableOpacity, Linking, Alert } from 'react-native';

// Importiere Komponenten und Services
import  TrainingPlanScreen  from '@components/TrainingPlanScreen';
import  ExerciseListScreen  from '@components/ExerciseListScreen';
import  RouteInfoModal  from '@components/RouteInfoModal';
import { fetchExercisesFromDb } from '@services/ExerciseService';
import { DailyPlan } from '@types/Index';

const App: React.FC = () => {
    const [currentDay, setCurrentDay] = useState<string>('Montag');
    const [suggestedExercises, setSuggestedExercises] = useState<any[]>([]); // Using any[] for now, will be Exercise[]
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [showRouteInfo, setShowRouteInfo] = useState<boolean>(false);
    const [currentView, setCurrentView] = useState<'plan' | 'exercises'>('plan'); // 'plan' or 'exercises'

    const plan: { [key: string]: DailyPlan } = {
        'Montag': {
            type: 'Montag',
            morning: {
                time: '08:30-10:00',
                activity: 'Englischkurs bei Gateway to English (Fahrrad: ca. 15-20 Min. pro Strecke)',
                type: 'Fahrradfahren'
            },
            lunch: null,
            afterWork: {
                time: '18:10-19:40',
                activity: 'Yoga (Schule Klecken)',
                type: 'Yoga'
            },
            evening: {
                time: '19:50-22:30',
                activity: 'Handballtraining (Nordheide Halle)',
                type: 'Handballtraining'
            },
            lateEvening: {
                time: 'Später Abend',
                activity: 'Regeneration/Dehnen (10-15 Min.)',
                type: 'Regeneration/Dehnen'
            }
        },
        'Dienstag': {
            type: 'Dienstag',
            morning: {
                time: 'Vormittag',
                activity: 'Kurzes Arbeits-Workout (ca. 10-15 Min.)',
                type: 'Arbeits-Workout'
            },
            lunch: {
                time: 'Mittagspause',
                activity: 'Kurzes Arbeits-Workout (ca. 10-15 Min.)',
                type: 'Arbeits-Workout'
            },
            afterWork: {
                time: 'Nach Feierabend',
                activity: 'Regeneration/Mobilität (ca. 20-30 Min.)',
                type: 'Regeneration'
            },
            evening: {
                time: '20:00-22:00',
                activity: 'Handballtraining (Nordheide Halle)',
                type: 'Handballtraining'
            },
            lateEvening: {
                time: 'Später Abend',
                activity: 'Regeneration/Dehnen (10-15 Min.)',
                type: 'Regeneration/Dehnen'
            }
        },
        'Mittwoch': {
            type: 'Mittwoch',
            morning: {
                time: 'Vormittag',
                activity: 'Kurzes Arbeits-Workout (ca. 10-15 Min.)',
                type: 'Arbeits-Workout'
            },
            lunch: {
                time: 'Mittagspause',
                activity: 'Kurzes Arbeits-Workout (ca. 10-15 Min.)',
                type: 'Arbeits-Workout'
            },
            afterWork: {
                time: '18:00-19:50',
                activity: 'Krafttraining (Ganzkörper, ca. 45-60 Min.)',
                type: 'Krafttraining'
            },
            evening: null,
            lateEvening: {
                time: 'Später Abend',
                activity: 'Regeneration/Dehnen (10-15 Min.)',
                type: 'Regeneration/Dehnen'
            }
        },
        'Donnerstag': {
            type: 'Donnerstag',
            morning: {
                time: 'Vormittag',
                activity: 'Kurzes Arbeits-Workout (ca. 10-15 Min.)',
                type: 'Arbeits-Workout'
            },
            lunch: {
                time: 'Mittagspause',
                activity: 'Kurzes Arbeits-Workout (ca. 10-15 Min.)',
                type: 'Arbeits-Workout'
            },
            afterWork: {
                time: 'Nach Feierabend',
                activity: 'Regeneration/Mobilität (ca. 20-30 Min.)',
                type: 'Regeneration'
            },
            evening: {
                time: '19:50-22:30',
                activity: 'Handballtraining (Nordheide Halle)',
                type: 'Handballtraining'
            },
            lateEvening: {
                time: 'Später Abend',
                activity: 'Regeneration/Dehnen (10-15 Min.)',
                type: 'Regeneration/Dehnen'
            }
        },
        'Freitag': {
            type: 'Freitag',
            morning: {
                time: 'Vormittag',
                activity: 'Kurzes Arbeits-Workout (ca. 10-15 Min.)',
                type: 'Arbeits-Workout'
            },
            lunch: {
                time: 'Mittagspause',
                activity: 'Kurzes Arbeits-Workout (ca. 10-15 Min.)',
                type: 'Arbeits-Workout'
            },
            afterWork: {
                time: '18:00-19:50',
                activity: 'HIIT/Schnellkraft (ca. 30-40 Min.)',
                type: 'HIIT/Schnellkraft'
            },
            evening: null,
            lateEvening: {
                time: 'Später Abend',
                activity: 'Regeneration/Dehnen (10-15 Min.)',
                type: 'Regeneration/Dehnen'
            }
        },
        'Samstag': {
            type: 'Samstag',
            morning: null,
            lunch: null,
            afterWork: {
                time: 'Ganztägig',
                activity: 'Option: Handballspiel oder intensives Workout',
                type: 'Handballspiel/Workout'
            },
            evening: null,
            lateEvening: null
        },
        'Sonntag': {
            type: 'Sonntag',
            morning: null,
            lunch: null,
            afterWork: {
                time: 'Ganztägig',
                activity: 'Option: Aktive Erholung oder Spiel',
                type: 'Aktive Erholung'
            },
            evening: null,
            lateEvening: null
        }
    };

    const handleSuggestExercises = async (workoutType: string) => {
        setLoading(true);
        setError(null);
        setSuggestedExercises([]);
        setCurrentView('exercises'); // Switch to exercises view
        try {
            const exercises = await fetchExercisesFromDb(workoutType);
            setSuggestedExercises(exercises);
        } catch (err: any) {
            console.error("Fehler beim Abrufen der Übungen:", err);
            setError('Fehler beim Abrufen der Übungen. Bitte versuchen Sie es später erneut: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleShowRouteInfo = () => {
        setShowRouteInfo(true);
    };

    const openGoogleMaps = () => {
        const destination = encodeURIComponent('Kirchenstraße 10, 21244 Buchholz in der Nordheide');
        const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${destination}&travelmode=bicycling`;
        Linking.openURL(googleMapsUrl).catch(err => Alert.alert("Fehler", "Konnte Google Maps nicht öffnen: " + err.message));
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>Dein Personalisiertes Trainingsprogramm</Text>

            {/* Day Navigation */}
            <View style={styles.dayNavigation}>
                {Object.keys(plan).map((day) => (
                    <TouchableOpacity
                        key={day}
                        style={[
                            styles.dayButton,
                            currentDay === day ? styles.dayButtonActive : styles.dayButtonInactive,
                        ]}
                        onPress={() => {
                            setCurrentDay(day);
                            setSuggestedExercises([]);
                            setError(null);
                            setShowRouteInfo(false);
                            setCurrentView('plan'); // Always go back to plan view on day change
                        }}
                    >
                        <Text style={currentDay === day ? styles.dayButtonTextActive : styles.dayButtonTextInactive}>
                            {day}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Main Content Area */}
            <View style={styles.contentArea}>
                {currentView === 'plan' ? (
                    <>
                        <Text style={styles.subHeader}>Plan für {currentDay}</Text>
                        <TrainingPlanScreen
                            planForDay={plan[currentDay]}
                            onSuggestExercises={handleSuggestExercises}
                            onShowRouteInfo={handleShowRouteInfo}
                            loading={loading}
                        />
                    </>
                ) : (
                    <>
                        <View style={styles.exerciseListHeader}>
                            <TouchableOpacity onPress={() => setCurrentView('plan')} style={styles.backButton}>
                                <Text style={styles.backButtonText}>{'< Zurück zum Plan'}</Text>
                            </TouchableOpacity>
                            <Text style={styles.subHeader}>Übungsvorschläge</Text>
                            <View style={{width: 100}}/> {/* Spacer for alignment */}
                        </View>
                        <ExerciseListScreen
                            exercises={suggestedExercises}
                            loading={loading}
                            error={error}
                        />
                    </>
                )}
            </View>

            {/* Route Info Modal */}
            <RouteInfoModal
                visible={showRouteInfo}
                onClose={() => setShowRouteInfo(false)}
                openGoogleMaps={openGoogleMaps}
            />
        </SafeAreaView>
    );
};

// --- Stylesheet für die React Native App ---
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e0f2f7', // Light blue background
        paddingTop: 20,
    },
    header: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#1e3a8a', // Dark blue
        textAlign: 'center',
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    dayNavigation: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    dayButton: {
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 20,
        margin: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    dayButtonActive: {
        backgroundColor: '#1e3a8a', // Dark blue
    },
    dayButtonInactive: {
        backgroundColor: '#d1d5db', // Light gray
    },
    dayButtonTextActive: {
        color: '#fff',
        fontWeight: 'bold',
    },
    dayButtonTextInactive: {
        color: '#4b5563', // Darker gray
    },
    contentArea: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingHorizontal: 15,
        paddingTop: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
    },
    subHeader: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#1e3a8a',
        textAlign: 'center',
        marginBottom: 15,
    },
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
    // Exercise List Specific Styles
    exerciseListHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    backButton: {
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    backButtonText: {
        color: '#2563eb',
        fontSize: 16,
        fontWeight: 'bold',
    },
    exerciseList: {
        marginTop: 10,
    },
    exerciseCard: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'flex-start',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
        borderWidth: 1,
        borderColor: '#e5e7eb',
    },
    exerciseImage: {
        width: 80,
        height: 80,
        borderRadius: 8,
        marginRight: 15,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    exerciseDetails: {
        flex: 1,
    },
    exerciseName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1e3a8a',
        marginBottom: 5,
    },
    exerciseDescription: {
        fontSize: 14,
        color: '#4b5563',
        marginBottom: 5,
    },
    exerciseRepsDuration: {
        fontSize: 13,
        color: '#6b7280',
    },
    loadingContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
    },
    loadingText: {
        marginLeft: 10,
        fontSize: 16,
        color: '#1e3a8a',
    },
    errorContainer: {
        backgroundColor: '#fee2e2', // Light red
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#ef4444', // Red
    },
    errorText: {
        color: '#dc2626', // Darker red
        fontSize: 15,
        textAlign: 'center',
    },
    noSuggestionsText: {
        fontSize: 15,
        color: '#6b7280',
        textAlign: 'center',
        paddingVertical: 20,
        fontStyle: 'italic',
    },
    noteText: {
        fontSize: 12,
        color: '#6b7280',
        textAlign: 'center',
        marginTop: 20,
        paddingBottom: 20,
    },
});

export default App;
