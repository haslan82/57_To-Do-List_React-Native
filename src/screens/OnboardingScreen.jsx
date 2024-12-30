import { Dimensions, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import Onboarding from 'react-native-onboarding-swiper';
import Lottie from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
import { TickSquare } from 'iconsax-react-native';
import { setItem } from '../utils/AsyncStorage';



const {width, height} = Dimensions.get('window')

const OnboardingScreen = () => {

const navigation = useNavigation();

const handleDone = () => {
  navigation.navigate('Home');
  setItem('onboarded', '1');
}

const doneButton = ({...props}) => {
return(
  <TouchableOpacity style={styles.doneButton} {...props}>
  <Text style={styles.doneButton}>
  
 Done
 {/* <TickSquare size="32" color="#FF8A65" variant="Broken"/> */}
  </Text>
  </TouchableOpacity>
)

}
  return (
    <View style={styles.container}>
      <Onboarding
      DoneButtonComponent={doneButton}
      onDone={handleDone}
      onSkip={handleDone}
      containerStyles={{paddingHorizontal:14}}
  pages={[
    {
      backgroundColor: '#a7f3d0',
      image: 
      (
        <View style={styles.lottie}>
          <Lottie style={{flex:1}} source={require('../assets/animations/boost.json')} autoPlay loop/>
        </View>
      ),
      title: 'Boost Your Productivity',
      subtitle: 'Join Udemig courses to change your skills!',
    },
    {
      backgroundColor: '#fef3ce',
      image: 
      (
        <View style={styles.lottie}>
           <Lottie style={{flex:1}} source={require('../assets/animations/work.json')} autoPlay loop/>
        </View>
      ),
      title: 'Work without Interruptions',
      subtitle: 'Complete your tasks smootly with your productivity tips!',
    },
    {
      backgroundColor: '#a78bfa',
      image: 
      (
        <View style={styles.lottie}>
           <Lottie style={{flex:1}} source={require('../assets/animations/achieve.json')} autoPlay loop/>
        </View>
      ),
      title: 'Reach Higher Goals',
      subtitle: 'Utilize our platform to achieve your professinal aspirations.',
    },
  
  ]}
/>
    </View>
  )
}

export default OnboardingScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"white",
   
  },
  lottie:{
width:width*0.9,
height:width,
  },
  doneButton:{
    backgroundColor:'#A78BFA',
    padding:5,
    borderRadius:10
   
    
  }
})