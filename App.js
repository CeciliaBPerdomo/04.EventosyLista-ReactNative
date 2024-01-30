import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView, FlatList, Modal } from 'react-native';
import uuid from 'react-native-uuid' //Generador de ids 

export default function App() {
  const [newTask, setNewTask] = useState({
    id: "",
    title: "",
    description: ""
  })
  const [tasks, setTasks] = useState([])
  const [modalVisible, setModalVisible] = useState(false)
  const [idSelected, setIdSelected] = useState(0)
 
  const addTask = () => {
    setTasks([...tasks, newTask])
    setNewTask({
      id: "",
      title: "",
      description: ""
    })
  }

  const onHandlerTitle = (t) => {
    const id = uuid.v4()
    setNewTask({ ...newTask, title: t, id })
  }

  const onHandlerDescription = (t) => {
    setNewTask({ ...newTask, description: t })
  }

  const handlerModal = (id) => {
    setIdSelected(id)
    setModalVisible(true)
  }
  
  const deleteTask = () => {
    console.log("Eliminado: " + idSelected)
    setTasks(tasks.filter(task => task != idSelected))
    setModalVisible(false)
  }



  return (
    <View style={styles.container}>

      <View style={styles.inputContainer}>
        <TextInput value={newTask.title} placeholder='Ingresar titulo tarea' onChangeText={onHandlerTitle} style={styles.input} />
        <TextInput value={newTask.description} placeholder='Ingresar descripcion tarea' onChangeText={onHandlerDescription} style={styles.input} />
        <Button color="#3921F5" title='Agregar tarea' onPress={addTask} />
      </View>

      {/* <ScrollView style={styles.tasksContainer}>
        {tasks.map((item, id) => (
          <View style={styles.taskCard} key={id}>
            <Text style={styles.text}>
              {item.title}
            </Text>
            <Button title='DEL' />
          </View>
        ))}
      </ScrollView> */}

      <View style={styles.tasksContainer}>
        <FlatList
          data={tasks}
          keyExtractor={tasks => tasks.id}
          renderItem={({ item }) => (
            <View style={styles.taskCard} key={item.id}>
              <Text style={styles.text}>
                {item.title}
              </Text>
              <Button title='DEL' onPress={() => handlerModal(item.id)} />
            </View>
          )}
        />
        <Modal visible={modalVisible} >
          <View>
            <Text>Estas seguro que quieres borrar?</Text>
            <Button title='si' onPress={deleteTask}/>
            <Button title='no' onPress={() => setModalVisible(false)} />
          </View>
        </Modal>
      </View>

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
