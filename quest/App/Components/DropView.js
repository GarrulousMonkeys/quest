import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
  TouchableHighlight,
	TextInput,
	TouchableWithoutFeedback,
	AlertIOS
} from 'react-native';

class DropView extends Component {
	constructor(props){
		super(props)
		this.state = {
			text: ''
		}
	}

  componentDidMount() {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          var initialPosition = position;
          this.setState({initialPosition: initialPosition});
        },
        (error) => alert(error.message),
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
      );
      navigator.geolocation.watchPosition((position) => {
        var lastPosition = position;
        this.setState({lastPosition: lastPosition});
      });
  }

	sendArtifact() {

		//the JSON object sent to Firebase below contains text, geolocation, username, and a timestamp
		this.props.dbRef.push({ message: this.state.text, user: "Test User", latitude: this.state.lastPosition.coords.latitude,longitude: this.state.lastPosition.coords.longitude, timestamp: Date.now()}, function() { AlertIOS.alert('New message posted!')});
		
		//image file upload code started here:
		/*
		var imageDestinationPath = this.props.storageRef.child('images/file.jpg');
		var localFile = //need reference to image file on iPhone disk here
		var metadata = {
			username: undefined,
			artifactID: undefined,
		};
		var uploadTask = imageDestinationPath.put(localFile, metadata)
		//Reference for photo uploading: 
		//https://github.com/firebase/quickstart-js/blob/master/storage/index.html
		*/
	
	}
	
	render() {
		return (
			<View style={styles.container}>
  				<TextInput multiline={true} style={styles.textInput}
  					onChangeText={(text) => this.setState({text})}
  					placeholder='Type artifact text here'
  					value={this.state.text}
  				/>
        <TouchableHighlight onPress={() => this.sendArtifact()}>
          <View style={styles.bottomNavButton}>
            <Text style={styles.buttonText}>SUBMIT ARTIFACT</Text>
          </View>
        </TouchableHighlight>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
    flex: 1,
		backgroundColor: 'white',
		justifyContent: 'flex-end',
	},
	textInput: {
		flex: 1,
    fontSize: 30,
    padding: 10,
    paddingTop: 200,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center'
	},
  bottomNavButton: {
    flex: 1,
    backgroundColor: "#24CE84",
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: 30,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 30
  }
});

export { DropView };