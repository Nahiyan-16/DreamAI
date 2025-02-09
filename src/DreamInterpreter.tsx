import React, { useState } from "react";
import { View, Text, TextInput, Button, ScrollView } from "react-native";
import { OpenAI } from "openai";
import dotenv from 'dotenv';

  const DreamInterpreter = () => {
  const [dreamText, setDreamText] = useState("");
  const [interpretation, setInterpretation] = useState("");
  const [loading, setLoading] = useState(false);

  const analyzeDream = async () => {
    if (!dreamText.trim()) return;
    setLoading(true);

    try {
      const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "system", content: "Analyze the following dream and provide an interpretation." }, { role: "user", content: dreamText }],
      });
      
      setInterpretation(response.choices[0]?.message?.content || "No interpretation available.");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error analyzing dream:", error.message);
        console.error(error.stack);
        setInterpretation("Failed to interpret the dream. Try again later.");
      } else {
        console.error("Unexpected error:", error);
        setInterpretation("An unexpected error occurred. Try again later.");
      }
    }

    setLoading(false);
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 10 }}>AI Dream Interpreter</Text>
      <TextInput
        placeholder="Describe your dream..."
        value={dreamText}
        onChangeText={setDreamText}
        multiline
        style={{ borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 }}
      />
      <Button title={loading ? "Analyzing..." : "Interpret Dream"} onPress={analyzeDream} disabled={loading} />
      {interpretation && (
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>Interpretation:</Text>
          <Text>{interpretation}</Text>
        </View>
      )}
    </ScrollView>
  );
};

export default DreamInterpreter;
