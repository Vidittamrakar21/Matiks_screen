
import * as Haptics from 'expo-haptics';
import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';
import 'react-native-reanimated';
import Animated, {
  Easing,
  interpolate,
  runOnJS,
  useAnimatedProps,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');
const FINAL_SCORE = 2840;

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

export default function App() {
  const progress = useSharedValue(0);

  const comboScale = useSharedValue(0);
  const flame = useSharedValue(1);

  const rankY = useSharedValue(80);
  const rankOpacity = useSharedValue(0);

  const btnScale = useSharedValue(1);
  const shimmerX = useSharedValue(-200);

  const glow = useSharedValue(0);

  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    progress.value = withTiming(
      1,
      { duration: 1500, easing: Easing.out(Easing.cubic) },
      (finished) => {
        if (finished) {
          runOnJS(setShowConfetti)(true);

          runOnJS(Haptics.notificationAsync)(
            Haptics.NotificationFeedbackType.Success
          );

          comboScale.value = withSequence(
            withSpring(1.2, { damping: 6 }),
            withSpring(1)
          );

          flame.value = withRepeat(
            withSequence(
              withTiming(1.3, { duration: 500 }),
              withTiming(1, { duration: 500 })
            ),
            -1,
            true
          );

          rankY.value = withDelay(200, withSpring(0));
          rankOpacity.value = withDelay(200, withTiming(1));
        }
      }
    );

    glow.value = withRepeat(withTiming(1, { duration: 1200 }), -1, true);

  
    shimmerX.value = withRepeat(
      withTiming(width + 150, {
        duration: 1400,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      false
    );
  }, []);

  const animatedScore = useDerivedValue(() =>
    Math.floor(interpolate(progress.value, [0, 1], [0, FINAL_SCORE]))
  );

  const animatedProps = useAnimatedProps(() => ({
    text: `${animatedScore.value}`,
  }));

  const scoreStyle = useAnimatedStyle(() => ({
    transform: [{ scale: 1 + glow.value * 0.05 }],
    textShadowRadius: 10 + glow.value * 20,
  }));

  const comboStyle = useAnimatedStyle(() => ({
    transform: [{ scale: comboScale.value }],
  }));

  const flameStyle = useAnimatedStyle(() => ({
    transform: [{ scale: flame.value }],
    opacity: 0.7 + flame.value * 0.3,
  }));

  const rankStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: rankY.value }],
    opacity: rankOpacity.value,
  }));

  const btnStyle = useAnimatedStyle(() => ({
    transform: [{ scale: btnScale.value }],
  }));

  const shimmerStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: shimmerX.value }],
  }));

  const handlePress = () => {
    btnScale.value = withSequence(
      withTiming(0.9, { duration: 80 }),
      withSpring(1)
    );
  };

  return (
    <View style={styles.container}>
  
  
      {/* SCORE */}
      <Text style={styles.scoreLabel}>SCORE</Text>
      <View style={styles.scoreSection}>
        <AnimatedTextInput
          editable={false}
          style={[styles.score, scoreStyle]}
          //@ts-ignore
          animatedProps={animatedProps}
        />

        <Animated.View style={[styles.comboFloating, comboStyle]}>
          <Animated.Text style={[styles.comboText, flameStyle]}>
            <Image source={require('../../assets/images/fire.png')} style={{ width: 80, height: 80 }} />
            <View style={styles.topCard}>
        <Text style={styles.streakNumber}>07</Text>
        <Text style={styles.streakLabel}>COMBO STREAK</Text>
      </View>
          </Animated.Text>
        </Animated.View>
      </View>

      {/* RANK CARD */}
      <Animated.View style={[styles.rankCard, rankStyle]}>
        <Text style={styles.rankTitle}>Your Rank</Text>
        <Text style={styles.rankText}>#3 / 1,200</Text>
      </Animated.View>

      {/* STATS */}
      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>92%</Text>
          <Text style={styles.statLabel}>Accuracy</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>+120</Text>
          <Text style={styles.statLabel}>XP</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>1.2s</Text>
          <Text style={styles.statLabel}>Avg Time</Text>
        </View>
      </View>

      {/* BUTTON */}
      <Pressable onPress={handlePress} style={styles.bottomBtnWrapper}>
  <Animated.View style={[styles.button, btnStyle]}>
    
    <View style={styles.glow} />
    <View style={styles.highlight} />
    <Animated.View style={[styles.shimmer, shimmerStyle]} />

    <Text style={styles.btnText}>SHARE RESULT</Text>
  </Animated.View>
</Pressable>

      {showConfetti && <Confetti />}
    </View>
  );
}

/* CONFETTI */
function Confetti() {
  const particles = new Array(60).fill(0);

  return (
    <View style={StyleSheet.absoluteFill}>
      {particles.map((_, i) => {
        const y = useSharedValue(-20);
        const x = useSharedValue(Math.random() * width);
        const rotate = useSharedValue(0);
        const opacity = useSharedValue(1);

        const drift = (Math.random() - 0.5) * 2;

        useEffect(() => {
          y.value = withTiming(height + 50, {
            duration: 2000 + Math.random() * 1000,
          });

          x.value = withRepeat(
            withTiming(x.value + drift * 50, { duration: 500 }),
            -1,
            true
          );

          rotate.value = withRepeat(
            withTiming(360, { duration: 800 }),
            -1
          );

          opacity.value = withTiming(0, {
            duration: 2000,
          });
        }, []);

        const style = useAnimatedStyle(() => ({
          position: 'absolute',
          width: 6,
          height: 6,
          backgroundColor: `hsl(${Math.random() * 360},100%,50%)`,
          transform: [
            { translateX: x.value },
            { translateY: y.value },
            { rotate: `${rotate.value}deg` },
          ],
          opacity: opacity.value,
          borderRadius: 2,
        }));

        return <Animated.View key={i} style={style} />;
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#171717',
    alignItems: 'center',
    justifyContent: 'center',
  },

  topCard: {
    position: 'absolute',
    top: 100,
    alignItems: 'center',
  },
  streakNumber: {
    color: '#f97316',
    fontSize: 60,
    fontWeight: '900',
  },
  streakLabel: {
    color: '#f97316',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 2,
  },
  scoreLabel:{
    color: '#B0FA62',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 2,
    marginBottom: 80,
  },

  scoreSection: {
    alignItems: 'center',
    marginTop: -70,
    
  },
  score: {
    fontSize: 60,
    color: '#B0FA62',
    fontWeight: '900',
    textShadowColor: '#22c55e',
  },

  comboFloating: {
    marginTop: 60,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  comboText: {
    display: 'flex',
    flexDirection: 'column',
    color: '#f97316',
    fontSize: 16,
    fontWeight: '600',
  },

  rankCard: {
    marginTop: 90,
    padding: 20,
    width: width * 0.85,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
  },
  rankTitle: {
    color: '#94a3b8',
  },
  rankText: {
    color: '#38bdf8',
    fontSize: 20,
    fontWeight: '700',
  },

  statsRow: {
    flexDirection: 'row',
    marginTop: 25,
    gap: 12,
  },
  statBox: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    width: 90,
  },
  statValue: {
    color: '#B0FA62',
    fontWeight: '700',
  },
  statLabel: {
    color: '#B0FA62',
    fontSize: 12,
  },

  bottomBtnWrapper: {
    position: 'absolute',
    bottom: 40,
    width: '90%',
  },
  button: {
    backgroundColor: '#f97316',
    paddingVertical: 16,
    borderRadius: 20,
    alignItems: 'center',
    overflow: 'hidden',
  },

  glow: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#f97316',
    opacity: 0.25,
    borderRadius: 22,
    transform: [{ scale: 1.2 }],
  },
  

  highlight: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '50%',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
  },
  

  shimmer: {
    position: 'absolute',
    width: 120,
    height: '100%',
    backgroundColor: 'rgba(255,255,255,0.35)',
    transform: [{ rotate: '25deg' }],
    opacity: 0.6,
  },
  
  btnText: {
    color: '#000',
    fontWeight: '900',
    fontSize: 16,
    letterSpacing: 1,
  },
});