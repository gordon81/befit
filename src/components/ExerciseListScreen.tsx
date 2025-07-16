// src/components/ExerciseListScreen.tsx
import React from 'react';
import { ScrollView, View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { ExerciseListScreenProps } from '@types/Index';

const ExerciseListScreen: React.FC<ExerciseListScreenProps> = ({ exercises, loading, error }) => {
    return (
        <ScrollView style={styles.scrollView}>
            <Text style={styles.sectionTitle}>Deine Übungsvorschläge</Text>
            {loading && (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#1e3a8a" />
                    <Text style={styles.loadingText}>Lade Übungen...</Text>
                </View>
            )}
            {error && (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>Fehler:</Text>
                    <Text style={styles.errorText}>{error}</Text>
                </View>
            )}
            {exercises.length > 0 && (
                <View style={styles.exerciseList}>
                    {exercises.map((exercise) => (
                        <View key={exercise.id} style={styles.exerciseCard}>
                            {exercise.image_url && (
                                <Image
                                    source={{ uri: exercise.image_url }}
                                    style={styles.exerciseImage}
                                    onError={() => console.log('Error loading image:', exercise.image_url)}
                                />
                            )}
                            <View style={styles.exerciseDetails}>
                                <Text style={styles.exerciseName}>{exercise.name}</Text>
                                <Text style={styles.exerciseDescription}>{exercise.description}</Text>
                                <Text style={styles.exerciseRepsDuration}>
                                    <Text style={{ fontWeight: 'bold' }}>Wiederholungen/Dauer:</Text> {exercise.reps_duration}
                                </Text>
                            </View>
                        </View>
                    ))}
                </View>
            )}
            {!loading && !error && exercises.length === 0 && (
                <Text style={styles.noSuggestionsText}>
                    Wähle einen Trainingstyp und tippe auf "Übungen vorschlagen", um Ideen zu erhalten.
                </Text>
            )}
            <Text style={styles.noteText}>
                Hinweis zu Bildern/Animationen: Die angezeigten Bilder sind Platzhalter, deren URLs direkt in den simulierten Übungsdaten hinterlegt sind. In einer vollwertigen App würden diese URLs aus deiner MySQL-Datenbank über ein Backend abgerufen. Echte Videos oder komplexe Animationen können in dieser Umgebung aus technischen Gründen nicht direkt eingebettet werden. Für Übungsfotos ist das JPG-Format in der Regel die bessere Wahl.
            </Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1e3a8a',
        marginBottom: 10,
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

export default ExerciseListScreen;