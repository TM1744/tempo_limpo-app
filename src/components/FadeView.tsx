import React, { useState, useRef, useEffect } from 'react';
import { Animated } from 'react-native';
import { IFadeViewProps } from '../interfaces/props/IFadeViewProps';

export function FadeView({ visible, children, style, ...props }: IFadeViewProps) {
  // Define o estado se o componente deve estar montado no DOM/Árvore
  const [shouldRender, setShouldRender] = useState<boolean>(visible);
  
  // Valores animados para opacidade e escala
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    if (visible) {
      // 1. Quando fica visível, primeiro monta o componente
      setShouldRender(true);

      // 2. Executa a animação de entrada (Parallel executa juntas)
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true, // Executa na thread nativa (60 FPS)
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 6,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // 1. Executa a animação de saída
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.8,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start(() => {
        // 2. Só desmonta da árvore quando a animação terminar
        setShouldRender(false);
      });
    }
  }, [visible]);

  if (!shouldRender) return null;

  return (
    <Animated.View
      style={[
        {
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }],
        },
        style
      ]}
      {...props}
    >
      {children}
    </Animated.View>
  );
}