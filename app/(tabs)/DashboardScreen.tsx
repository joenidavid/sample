import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TaskContext } from '@/hooks/TaskContext';
import { Task } from '@/constants/types';

type RootStackParamList = {
  Dashboard: undefined;
  TaskForm: undefined;
  TaskDetail: { task: Task };
};

type Props = NativeStackScreenProps<RootStackParamList, 'Dashboard'>;

const DashboardScreen: React.FC<Props> = ({ navigation }) => {
  const { tasks } = useContext(TaskContext);
  const today = new Date().toISOString().split('T')[0];
  const userName = 'Joeni';

  const overdueTasks = tasks?.filter(
    (t: Task) => t.date < today && t.status !== 'Completed'
  ) || [];
  const todayTasks = tasks?.filter((t: Task) => t.date === today) || [];
  const inProgress = tasks?.filter((t: Task) => t.status === 'In Progress') || [];
  const completed = tasks?.filter((t: Task) => t.status === 'Completed') || [];

  const progress =
    tasks?.length === 0 ? 0 : Math.round((completed?.length / tasks?.length) * 100);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.greeting}>Good morning, {userName}</Text>
      <Text style={styles.date}>{today}</Text>

      <View style={styles.summaryCard}>
        <Text style={styles.sectionTitle}>Today’s Summary</Text>
        <View style={styles.statBox}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{todayTasks.length}</Text>
            <Text style={styles.statLabel}>New</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{inProgress.length}</Text>
            <Text style={styles.statLabel}>In Progress</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{completed.length}</Text>
            <Text style={styles.statLabel}>Completed</Text>
          </View>
        </View>
        <Text style={styles.progressText}>✅ Daily Progress: {progress}%</Text>
      </View>

      <Text style={styles.sectionTitle}>⚠️ Overdue</Text>
      <FlatList
        data={overdueTasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('TaskDetail', { task: item })}
          >
            <View style={styles.taskCard}>
              <Text style={styles.taskTitle}>{item.title}</Text>
              <Text style={styles.taskMeta}>Due: {item.date}</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('TaskForm')}
      >
        <Text style={styles.fabText}>＋</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#ffd8d8' },
    greeting: { fontSize: 24, fontWeight: '600', marginTop: 30 },
    date: { fontSize: 16, color: '#777', marginBottom: 20 },
    sectionTitle: { fontSize: 18, marginVertical: 10, fontWeight: '600' },
    summaryCard: {
        backgroundColor: '#f4ebd3',
        padding: 16,
        borderRadius: 12,
        marginBottom: 20,
        elevation: 2
    },
    statBox: { flexDirection: 'row', justifyContent: 'space-between' },
    statItem: { alignItems: 'center', flex: 1 },
    statNumber: { fontSize: 20, fontWeight: '700', color: '#fff' },
    statLabel: { fontSize: 14, color: '#444' },
    progressText: { marginTop: 8, color: '#4CAF50', fontSize: 15 },
    taskCard: {
        backgroundColor: '#fff',
        padding: 14,
        borderRadius: 10,
        marginBottom: 12,
        elevation: 1
    },
    taskTitle: { fontSize: 16, fontWeight: '500' },
    taskMeta: { fontSize: 13, color: '#666' },
    fab: {
        position: 'absolute',
        right: 20,
        bottom: 30,
        backgroundColor: '#2979FF',
        borderRadius: 30,
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4
    },
    fabText: { fontSize: 28, color: '#fff' }
});