
import React, { useState } from "react";
//import { Fragment } from "react";
import { Text, View, TextInput, TouchableOpacity, ScrollView, FlatList, Alert } from "react-native";
//import { styles } from "@/src/screens/Home/styles";
import { styles } from "./styles";

import { Participant } from "@/src/components/Participant";

export default function Home() {

    const [participants, setParticipants] = useState<string[]>([]);
    //const participants = ['Cammy'];
    const [participantName, setParticipantName] = useState('');
    
    function handleParticipantAdd() {

        console.log("Você clicou no botão de adicionar");

        if (participants.includes(participantName.trim() )) {
            return Alert.alert("Participante Existe", "Já existe um participante na lista com esse nome")
        }
        else if (participantName.trim() == '') {
            return Alert.alert("Participante Inválido", "Digite o nome")
        }

        else {
            //participants.push('Menat');
            setParticipants(prevState => [...prevState, participantName.trim() ]);
            console.log(participants);
            setParticipantName('');
        }
    }

    function handleParticipantRemove(name: string) {
        Alert.alert("Remover", `Remover o participante ${name}?`, [
            {
                text: 'Sim',
                //onPress: () => Alert.alert("Deletado!")
                onPress: () => setParticipants(prevState => prevState.filter(participant => participant !== name))
            },
            {
                text: 'Não',
                style: 'cancel'
            }
        ])
        console.log(`Você clicou em remover o participante ${name}`);
    }

    return (
        //Usar <View> do react-native, <Fragment> do react ou <></> para encapsular o retorno com várias linhas
        //<>
        //<Fragment>
        <View style={styles.container}>
            <Text style={styles.eventName}>
                Nome do Evento
            </Text>
            <Text style={styles.eventDate}>
                Terça, 04 de Junho de 2024
            </Text>

            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    placeholder="Nome do participante"
                    placeholderTextColor={"#6b6b6b"}
                    keyboardType="default"
                    //onChangeText={text => setParticipantName(text)}
                    onChangeText={setParticipantName}
                    value={participantName.trim()}
                />

                <TouchableOpacity style={styles.button} onPress={handleParticipantAdd}>
                    <Text style={styles.buttonText}>
                        +
                    </Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={participants}
                keyExtractor={item => item}
                renderItem={({ item }) => (
                    <Participant
                        key={item}
                        name={item}
                        onRemove={() => handleParticipantRemove(item)} />
                )}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={() => (
                    <Text style={styles.listEmptyText}>
                        Ninguém chegou no evento ainda? Adicionar participantes a sua lista de presença.
                    </Text>
                )}
            />

            {/*}
      <ScrollView showsVerticalScrollIndicator={false}>
        {
          participants.map(participant => (
            <Participant
              key={participant}
              name={participant}
              onRemove={() => handleParticipantRemove(participant)}/>
          ))
        }
      </ScrollView>
      */}

        </View>
        //</Fragment>
        //</>
    )
}