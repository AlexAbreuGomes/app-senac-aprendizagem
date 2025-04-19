// Copyright (c) 2025 Alex de Abreu Gomes, Daniel Cruz, Jean Carlos, Rafael Bezerra, Wesllen D. B. Ferreira, Pedro Henrique, Tahlissa Vitoria.
// Licensed under Proprietary License - All rights reserved. Unauthorized usage or distribution is prohibited.

import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Dimensions
} from 'react-native';
import { HfInference } from '@huggingface/inference';
import { HUGGING_FACE_API_KEY } from '@env';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from "expo-status-bar";
import { useFonts, LuckiestGuy_400Regular } from "@expo-google-fonts/luckiest-guy";
import { useFonts as IBMPlexMono, IBMPlexMono_400Regular, IBMPlexMono_700Bold, IBMPlexMono_500Medium } from "@expo-google-fonts/ibm-plex-mono";

// Inicializar o cliente Hugging Face
const hf = new HfInference(HUGGING_FACE_API_KEY);

const screenWidth = Dimensions.get('window').width;

// Tipos para as mensagens
type Message = {
  id: string;
  text: string;
  isUser: boolean;
};

export const ChatBot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Olá! Sou o assistente virtual do Conecta Aprendiz. Como posso ajudar você hoje?',
      isUser: false,
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  useFonts({
    LuckiestGuy: LuckiestGuy_400Regular,
    IBMPlexMonoRegular: IBMPlexMono_400Regular,
    IBMPlexMonoBold: IBMPlexMono_700Bold,
    IBMPlexMonoMedium: IBMPlexMono_500Medium,
  });

  // Função para enviar mensagem para a API
  const sendMessage = async () => {
    if (inputText.trim() === '') return;
    
    // Adiciona mensagem do usuário
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
    };
    
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInputText('');
    setIsLoading(true);
    
    try {
      // Preparar contexto para o modelo
      const context = messages
        .map((msg) => `${msg.isUser ? 'Usuário' : 'Assistente'}: ${msg.text}`)
        .join('\n');
      
      const systemPrompt = 
        "Você é um assistente virtual amigável para jovens aprendizes. " +
        "Forneça respostas úteis, educacionais e motivadoras sobre o programa de aprendizagem, " +
        "primeiro emprego, comportamento profissional e desenvolvimento de carreira. " +
        "Mantenha suas respostas concisas (máximo 3 parágrafos) e adequadas para jovens de 14 a 24 anos.";
      
      // Fazer requisição ao modelo
      const response = await hf.textGeneration({
        model: 'mistralai/Mistral-7B-Instruct-v0.2',
        inputs: `${systemPrompt}\n\nHistórico da conversa:\n${context}\n\nUsuário: ${inputText}\n\nAssistente:`,
        parameters: {
          max_new_tokens: 250,
          temperature: 0.7,
          top_p: 0.95,
          repetition_penalty: 1.2
        }
      });
      
      // Limpar e adicionar resposta do assistente
      let botResponse = response.generated_text || "Desculpe, não consegui processar sua pergunta.";
      
      // Limpar prefixos que o modelo pode adicionar
      botResponse = botResponse.replace(/^Assistente: /, '').trim();
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        isUser: false,
      };
      
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Erro ao comunicar com o modelo:', error);
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Desculpe, tive um problema ao processar sua mensagem. Pode tentar novamente?',
        isUser: false,
      };
      
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Rolar para a última mensagem quando novas mensagens são adicionadas
  useEffect(() => {
    if (flatListRef.current && messages.length > 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  // Renderizar cada item de mensagem
  const renderItem = ({ item }: { item: Message }) => (
    <View
      style={[
        styles.messageBubble,
        item.isUser ? styles.userBubble : styles.botBubble,
      ]}
    >
      <Text style={[
        styles.messageText,
        item.isUser ? styles.userText : styles.botText
      ]}>
        {item.text}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Assistente Virtual</Text>
      </View>
      
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.messageList}
        contentContainerStyle={styles.messageListContent}
      />
      
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color="#F7941D" />
          <Text style={styles.loadingText}>Pensando...</Text>
        </View>
      )}
      
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={100}
      >
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Digite sua pergunta..."
            placeholderTextColor="#114c8099"
            multiline
            maxLength={500}
          />
          <TouchableOpacity
            style={[styles.sendButton, !inputText.trim() && styles.disabledButton]}
            onPress={sendMessage}
            disabled={!inputText.trim() || isLoading}
          >
            <Text style={styles.sendButtonText}>Enviar</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#044B8B',
    padding: 15,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 22,
    fontFamily: 'LuckiestGuy',
  },
  messageList: {
    flex: 1,
  },
  messageListContent: {
    padding: 10,
    paddingBottom: 20,
  },
  messageBubble: {
    padding: 12,
    borderRadius: 18,
    marginVertical: 5,
    maxWidth: '85%',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  userBubble: {
    backgroundColor: '#F7941D',
    alignSelf: 'flex-end',
    borderBottomRightRadius: 5,
  },
  botBubble: {
    backgroundColor: '#ffffff',
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 5,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
    fontFamily: 'IBMPlexMonoRegular',
  },
  userText: {
    color: '#ffffff',
  },
  botText: {
    color: '#333',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  loadingText: {
    marginLeft: 10,
    color: '#666',
    fontFamily: 'IBMPlexMonoRegular',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  textInput: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    maxHeight: 100,
    fontFamily: 'IBMPlexMonoRegular',
  },
  sendButton: {
    backgroundColor: '#044B8B',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    paddingHorizontal: 20,
  },
  disabledButton: {
    backgroundColor: '#A0A0A0',
  },
  sendButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'IBMPlexMonoBold',
  },
});
