#  Animated Game Result Screen (React Native (Expo) + Reanimated)

A **production-level, visually rich game result / streak screen** built using **React Native (Expo) + Reanimated**, inspired by Matiks.

This project demonstrates **advanced UI/UX, animation orchestration, and interaction design** 

---

#  Features

##  Core Features

*  **Animated Score Counter**

  * Smooth interpolation from `0 → FINAL_SCORE`
  * Uses `useDerivedValue` + `interpolate`

*  **7-Combo Streak UI**

  * Large bold streak number
  * Animated fire icon (breathing + tilt effect)
  * Matches real-world product UI patterns


---

##  UI/UX Design

*  **Dark Theme (`#171717`)**
*  **Game-like layout hierarchy**
*  Mobile-first responsive design
*  **Glassmorphism + soft shadows**
*  Orange accent system for streak emphasis

---

##  Advanced Animations

### 1. Score Counter Animation

* Uses `useSharedValue` + `withTiming`
* Smooth easing curve for natural feel

### 2. Fire Animation 

* Continuous **scale pulse**
* Subtle **rotation oscillation**
* Creates “alive” feeling

### 3. Button Interaction

* Press feedback with `withSequence`
* Scale down → spring back

---

##  Premium CTA Button (Highlight Feature)

Custom-built **“App Store quality” button** with:

*  Glow layer (depth simulation)
*  Glass highlight (top reflection)
*  Animated shimmer sweep
*  Smooth press feedback

---

##  Confetti System

* Particle-based confetti using Reanimated
* Randomized:

  * Position
  * Color (HSL)
  * Rotation
  * Duration
* Fade-out + gravity fall effect

---

##  Haptics Feedback

* Uses `expo-haptics`
* Triggers **success vibration** when animation completes

---

#  Technical Concepts Used

* `react-native-reanimated v3`
* Shared values & derived values
* Interpolation
* Sequenced animations
* Repeating animations
* UI thread vs JS thread (`runOnJS`)
* Absolute positioning & layering
* Animation orchestration

---



#  Setup Instructions

## 1️. Clone Repository

```bash
git clone https://github.com/Vidittamrakar21/Matiks_screen.git
cd matiks
```

## 2️. Install Dependencies

```bash
npm install
```

---

## 3️. Configure Reanimated

### babel.config.js

```js
module.exports = {
  presets: ['babel-preset-expo'],
  plugins: ['react-native-reanimated/plugin'],
};
```

---

## 4️. Run the App

```bash
npx expo start
```

Scan QR with **Expo Go**

---

#  How It Works

1. App loads → `progress` animates from `0 → 1`
2. Score interpolates to final value
3. Fire animation runs continuously
4. On completion:

   *  Confetti triggers
   *  Haptic feedback fires
5. Button remains interactive with shimmer

---


#  UI Inspiration

* Matiks Game Screens




