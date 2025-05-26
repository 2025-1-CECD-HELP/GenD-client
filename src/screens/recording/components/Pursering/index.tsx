import React, {useEffect, useRef} from 'react';
import {Animated} from 'react-native';
import {Ring} from './index.style';

interface PulseRingProps {
  isRecording: boolean;
  isPaused?: boolean;
  delay?: number;
  color?: string;
  size?: number;
}

export const PulseRing: React.FC<PulseRingProps> = ({
  isRecording,
  isPaused = false,
  delay = 0,
  color = '#A3A3FF',
  size = 120,
}) => {
  const scale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(0.8)).current;
  const loopRef = useRef<Animated.CompositeAnimation | null>(null);

  useEffect(() => {
    if (isRecording && !isPaused) {
      loopRef.current = Animated.loop(
        Animated.sequence([
          Animated.delay(delay * 1000),
          Animated.parallel([
            Animated.timing(scale, {
              toValue: 2.5,
              duration: 1800,
              useNativeDriver: true,
            }),
            Animated.timing(opacity, {
              toValue: 0,
              duration: 1800,
              useNativeDriver: true,
            }),
          ]),
          Animated.timing(scale, {
            toValue: 1,
            duration: 0,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 0.8,
            duration: 0,
            useNativeDriver: true,
          }),
        ]),
      );
      loopRef.current.start();
    } else {
      loopRef.current?.stop();
      scale.setValue(1);
      opacity.setValue(0.8);
    }
    return () => {
      loopRef.current?.stop();
    };
  }, [isRecording, isPaused, delay, scale, opacity]);

  if (!isRecording) return null;

  return (
    <Ring
      color={color}
      size={size}
      style={{
        transform: [{scale}],
        opacity,
      }}
    />
  );
};
