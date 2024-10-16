import { View, Text } from 'react-native';
import React from 'react';

const OperatorsScreen = () => {
  return (
    <View className="flex-1 justify-center items-center  p-10">
      <Text className="text-2xl font-bold mb-4 text-black">OperatorsScreen</Text>
    </View>
  );
};

export default OperatorsScreen;

// import React, { useEffect, useState } from 'react';
// import { View, Text, TextInput, FlatList, TouchableOpacity, Modal, Button, Alert } from 'react-native';
// import { Picker } from '@react-native-picker/picker';
// import axios from 'axios';
// import { styled } from 'nativewind';
// import { API_URL } from '@env';

// const StyledView = styled(View);
// const StyledTextInput = styled(TextInput);
// const StyledButton = styled(Button);
// //
// const OperatorsScreen = () => {
//   const [operators, setOperators] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [selectedOperator, setSelectedOperator] = useState(null);
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [selectedGasStation, setSelectedGasStation] = useState('');
//   const [gasStations, setGasStations] = useState([]);

//   // Fetch operators and gas stations from backend
//   useEffect(() => {
//     fetchOperators();
//     fetchGasStations();
//   }, []);

//   const fetchOperators = async () => {
//     try {
//       const response = await axios.get(`${API_URL}/api/stations"`);
//       setOperators(response.data);
//     } catch (error) {
//       console.error('Error fetching operators:', error);
//     }
//   };

//   const fetchGasStations = async () => {
//     try {
//       const response = await axios.get('https://your-api-endpoint.com/gas-stations');
//       setGasStations(response.data);
//     } catch (error) {
//       console.error('Error fetching gas stations:', error);
//     }
//   };

//   const addOperator = async () => {
//     if (!name || !email || !selectedGasStation) {
//       Alert.alert('Error', 'All fields are required.');
//       return;
//     }
//     try {
//       const newOperator = {
//         name,
//         email,
//         gasStation: selectedGasStation,
//       };
//       await axios.post('https://your-api-endpoint.com/operators', newOperator);
//       setIsModalVisible(false);
//       setName('');
//       setEmail('');
//       setSelectedGasStation('');
//       fetchOperators(); // Refresh the list
//       Alert.alert('Success', 'Operator successfully added!');
//     } catch (error) {
//       console.error('Error adding operator:', error);
//       Alert.alert('Error', 'Could not add operator. Please try again.');
//     }
//   };

//   const searchOperators = () => {
//     return operators.filter((operator) => operator.name.toLowerCase().includes(searchQuery.toLowerCase()));
//   };

//   const removeOperator = async (operatorId) => {
//     try {
//       await axios.delete(`https://your-api-endpoint.com/operators/${operatorId}`);
//       fetchOperators(); // Refresh the list after deletion
//       setSelectedOperator(null);
//       Alert.alert('Success', 'Operator successfully removed!');
//     } catch (error) {
//       console.error('Error removing operator:', error);
//       Alert.alert('Error', 'Could not remove operator. Please try again.');
//     }
//   };

//   return (
//     <StyledView className="flex-1 p-4">
//       <StyledTextInput className="border p-2 mb-4" placeholder="Search by name..." value={searchQuery} onChangeText={setSearchQuery} />
//       <StyledButton title="Add Operator" onPress={() => setIsModalVisible(true)} />
//       <FlatList
//         data={searchOperators()}
//         keyExtractor={(item) => item.id.toString()}
//         renderItem={({ item }) => (
//           <TouchableOpacity onPress={() => setSelectedOperator(item)} className="p-2 border-b">
//             <StyledView className="flex-row justify-between">
//               <Text>{item.name}</Text>
//               <Text>{item.gasStation}</Text>
//             </StyledView>
//           </TouchableOpacity>
//         )}
//       />

//       {/* Modal for adding a new operator */}
//       <Modal visible={isModalVisible} transparent>
//         <StyledView className="flex-1 justify-center items-center bg-black/50">
//           <StyledView className="bg-white p-4 rounded-lg w-3/4">
//             <StyledTextInput placeholder="Name" value={name} onChangeText={setName} className="border p-2 mb-2" />
//             <StyledTextInput placeholder="Email" value={email} onChangeText={setEmail} className="border p-2 mb-2" keyboardType="email-address" />
//             <Picker selectedValue={selectedGasStation} onValueChange={(itemValue) => setSelectedGasStation(itemValue)} className="border mb-2">
//               <Picker.Item label="Select Gas Station" value="" />
//               {gasStations.map((station) => (
//                 <Picker.Item key={station.id} label={station.name} value={station.name} />
//               ))}
//             </Picker>
//             <StyledButton title="Add" onPress={addOperator} />
//             <StyledButton title="Cancel" onPress={() => setIsModalVisible(false)} color="red" />
//           </StyledView>
//         </StyledView>
//       </Modal>

//       {/* Modal for viewing operator details */}
//       <Modal visible={!!selectedOperator} transparent>
//         <StyledView className="flex-1 justify-center items-center bg-black/50">
//           <StyledView className="bg-white p-4 rounded-lg w-3/4">
//             {selectedOperator && (
//               <>
//                 <Text>Name: {selectedOperator.name}</Text>
//                 <Text>Email: {selectedOperator.email}</Text>
//                 <Text>Gas Station: {selectedOperator.gasStation}</Text>
//                 <StyledButton title="Remove" onPress={() => removeOperator(selectedOperator.id)} color="red" />
//                 <StyledButton title="Close" onPress={() => setSelectedOperator(null)} />
//               </>
//             )}
//           </StyledView>
//         </StyledView>
//       </Modal>
//     </StyledView>
//   );
// };

// export default OperatorsScreen;
