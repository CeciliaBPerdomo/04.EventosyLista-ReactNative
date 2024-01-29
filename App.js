import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView } from 'react-native';

export default function App() {
  const [newTask, setNewTask] = useState({
    title: "",
    description: ""
  })
  const [tasks, setTasks] = useState([])

  const addTask = () => {
    setTasks([...tasks, newTask])
    console.log(tasks)
    setNewTask({
      title: "",
      description: ""
    })
  }

  const onHandlerTitle = (t) => {
    setNewTask({ ...newTask, title: t })
  }

  const onHandlerDescription = (t) => {
    setNewTask({ ...newTask, description: t })
  }

  return (
    <View style={styles.container}>

      <View style={styles.inputContainer}>
        <TextInput value={newTask.title} placeholder='Ingresar titulo tarea' onChangeText={onHandlerTitle} style={styles.input} />
        <TextInput value={newTask.description} placeholder='Ingresar descripcion tarea' onChangeText={onHandlerDescription} style={styles.input} />
        <Button color="#3921F5" title='Agregar tarea' onPress={addTask} />
      </View>

      <ScrollView style={styles.tasksContainer}>
        {tasks.map((item, id) => (
          <View style={styles.taskCard} key={id}>
            <Text style={styles.text}>
              {item.title}
            </Text>
            <Button title='DEL' />
          </View>
        ))}
      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2E4F6',
    paddingTop: 30
  },

  inputContainer: {
    backgroundColor: "#872FF5",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    paddingBottom: 15
  },

  input: {
    width: 250,
    borderBottomWidth: 2,
    borderColor: "white",
    margin: 10,
    paddingVertical: 5,
    paddingHorizontal: 10
  },

  tasksContainer: {
    // alignItems: "center",
    gap: 25,
    padding: 10
  },

  taskCard: {
    flexDirection: "row",
    backgroundColor: "#872FF5",
    padding: 20,
    alignItems: "center",
    borderRadius: 5, 
    marginVertical: 10
  },

  text: {
    width: "70%",
    color: "white",
    fontSize: 16,
  },

});
