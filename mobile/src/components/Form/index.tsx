import { ArrowLeft } from 'phosphor-react-native';
import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native';
import { theme } from '../../theme';
import { FeedbackType } from '../../components/Widget';
import { styles } from './styles';
import { feedbackTypes } from '../../utils/feedbackTypes';
import { ScreenShotButton } from '../../components/ScreenShotButton';
import { Button } from '../../components/Button';
import { captureScreen } from 'react-native-view-shot';
import { api } from '../../libs/api';

interface Props {
    feedbackType: FeedbackType;
    onFeedbackCanceled: () => void;
    onFeedbackSent: () => void;
}

export function Form( { feedbackType, onFeedbackCanceled, onFeedbackSent }: Props) {
    const [isSendingFeedback, setIsSendingFeedback] = useState(false);
    const [screenshot, setScreenshot] = useState<string | null>(null);
    const [comment, setComment] = useState("");
    const feedbackTypeInfo = feedbackTypes[feedbackType];

    function handleScreenshot(){
        captureScreen({
            format: 'jpg',
            quality: 0.8
        })
        .then(uri => {
            // console.log(uri);
            setScreenshot(uri);
        })
        .catch(error => console.log(error));
    }

    function handleScreenshotRemove(){
        setScreenshot(null);
    }

    async function handleSendFeedback() {
        if(isSendingFeedback){
            return;
        }
        setIsSendingFeedback(true);

        try {
            await api.post('/feedbacks', {
                type: feedbackType,
                screenshot
            })
        } catch (error) {
            console.log(error);
            setIsSendingFeedback(false);
        }
    }

  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <TouchableOpacity onPress={onFeedbackCanceled}>
                <ArrowLeft 
                    size={24}
                    weight="bold"
                    color={theme.colors.text_secondary}
                />
            </TouchableOpacity>

            <View style={styles.titleContainer}>
                < Image 
                    source={feedbackTypeInfo.image}
                    style={styles.image}
                />
                <Text style={styles.titleText}>
                    {feedbackTypeInfo.title}
                </Text>
            </View>
        </View>

        <TextInput 
            multiline
            style={styles.input}
            placeholder="Algo não está funcionando bem? Queremos corrigir. Conte com detalhes o que está acontecendo"
            placeholderTextColor={theme.colors.text_secondary}
            autoCorrect={false}
        />

        <View style={styles.footer}>
            <ScreenShotButton 
                onTakeShot={handleScreenshot}
                onRemoveShot={handleScreenshotRemove}
                screenshot={screenshot}
            />
            <Button 
                onPress={handleSendFeedback}
                isLoading={isSendingFeedback}
            />
        </View>

    </View>
  );
}