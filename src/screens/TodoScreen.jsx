import {useEffect, useState} from 'react';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Alert,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  AddCircle,
  CloseCircle,
  Edit2,
  TickCircle,
  Trash,
} from 'iconsax-react-native';

const TodoScreen = () => {
  // inputtan değeri alır
  const [todo, setTodo] = useState('');

  // eklediğimiz todo ları alır
  const [todos, setTodos] = useState([]);

  // async-storage ekleme yaparken setItem metodu ile ekleme yaparız.
  const saveTodos = async saveTodo => {
    try {
      await AsyncStorage.setItem('todos', JSON.stringify(saveTodo));
    } catch (error) {
      console.log(error);
    }
  };

  const loadTodos = async () => {
    try {
      const storedData = await AsyncStorage.getItem('todos');
      if (storedData) {
        setTodos(JSON.parse(storedData));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const completeTodo = async id => {
    const updatedTodos = todos.map(item =>
      item.id === id ? {...item, completed: !item.completed} : item,
    );
    setTodos(updatedTodos);
    saveTodos(updatedTodos);
  };

  // silme işlemi
  const deleteTodo = async id => {
    const updatedTodos = todos.filter(item => item.id !== id);
    setTodos(updatedTodos);
    saveTodos(updatedTodos);
  };

  // güncelleme işlemi

  const updatedTodos = id => {
    // id sini bildiğimiz elemanı todos dizisi içerisinde bulmak için find methodunu kullandık
    const exitingTodo = todos?.find(item => item.id === id);
    // eleman dizide yoksa fonksiyonu durdur.
    if (!exitingTodo) return;

    Alert.prompt(
      'Edit Todo', //kullanıcıya gösterilecek başlık
      'Updated', // kullanıcı yönlendirme alt başlık

      newUpdateText => {
        if (newUpdateText) {
          const updateTodos = todos.map(item =>
            item?.id === id ? {...item, text: newUpdateText} : item,
          );
          setTodos(updateTodos);
          saveTodos(updateTodos);
        }
      },

      'plain-text',
      exitingTodo.text,
    );
  };

  useEffect(() => {
    // App açıldığında asyncStorage daki todos ı yüklüyoruz
    loadTodos();
  }, []);

  // add butonuna basılınca  çalışacak fonksiyon
  const addTodo = () => {
    // yeni todo dizisi oluştur ve todos state ine aktar
    const updatedTodos = [{id: uuid.v4(), text: todo}, ...todos];
    setTodos(updatedTodos);
    saveTodos(updatedTodos);

    // Input'u temizle
    setTodo('');
  };

  return (
    <LinearGradient style={styles.container} colors={['#fef3c7', '#a78bfa']}>
      <SafeAreaView>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.headerText}>To-Do List</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
          value={todo}
            placeholder="Type a Todo"
            style={styles.input}
            onChangeText={text => setTodo(text)}
          />
          <TouchableOpacity style={styles.button} onPress={addTodo}>
            <AddCircle size="32" color="#FF8A65" variant="Broken" />
          </TouchableOpacity>
        </View>

        <FlatList
          data={todos}
          keyExtractor={item => item?.id?.toString()}
          renderItem={({item}) => (
            <View style={styles.todoItem}>
              <Text
                style={[
                  styles.todoText,
                  item.completed && styles.completedText,
                ]}>
                {item?.text}
              </Text>
              <View style={{flexDirection: 'row'}}>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    onPress={() => completeTodo(item?.id)}
                    style={[styles.button, styles.completeButton]}>
                    <Text style={styles.buttonText}>
                      {item.completed ? (
                        <CloseCircle
                          size="28"
                          color="#FF8A65"
                          variant="Broken"
                        />
                      ) : (
                        <TickCircle
                          size="28"
                          color="#90EE90"
                          variant="Broken"
                        />
                      )}
                    </Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    onPress={() => updatedTodos(item?.id)}
                    style={[styles.button, styles.updateButton]}>
                    <Text style={styles.buttonText}>
                      <Edit2 size="28" color="#FF8A65" variant="Broken" />
                    </Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    onPress={() => deleteTodo(item?.id)}
                    style={[styles.button, styles.deleteButton]}>
                    <Text style={styles.buttonText}>
                      <Trash size="27" color="#FF8A65" variant="Broken" />
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}></FlatList>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default TodoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  headerText: {
    marginTop: 50,
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 30,
    marginLeft: 1,
    width: '95%',
    justifyContent: 'flex-start',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    color: '#000',
    fontWeight: 'bold',
    borderColor: '#ccc',
  },
  button: {
    padding: 10,
    backgroundColor: 'lightgreen',
    borderRadius: 10,
    color: '#fff',
    marginLeft: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  buttonContainer: {},
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  todoText: {
    marginTop: 16,
    color: '#000',
    fontSize: 18,
    marginLeft: 8,
    fontWeight: 'bold',
  },

  deleteButton: {
    padding: 10,
    backgroundColor: 'red',
    borderRadius: 10,
    color: '#fff',
    marginLeft: 10,
    marginTop: 10,
  },

  updateButton: {
    padding: 10,
    backgroundColor: 'lightblue',
    borderRadius: 10,
    color: '#fff',
    marginLeft: 10,
    marginTop: 10,
  },
  completeButton: {
    padding: 10,
    backgroundColor: 'yellow',
    borderRadius: 10,
    color: '#fff',
    marginLeft: 10,
    marginTop: 10,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: 'gray',
    fontSize: 16,
  },
});
