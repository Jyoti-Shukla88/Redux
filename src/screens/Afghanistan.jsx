import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  withTiming,
  interpolate,
} from 'react-native-reanimated';

const { width,height } = Dimensions.get('window');

const BUTTON_WIDTH = 150;
const BUTTON_HEIGHT = 50;
const BUTTON_BOTTOM_OFFSET = 40;
const HORIZONTAL_MARGIN = 75;

const Afghanistan = () => {
  // Progress from 0 (bottom right) to 1 (bottom center)
  const progress = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler(event => {
    const offsetY = event.contentOffset.y;
    const contentHeight = event.contentSize.height;
    const layoutHeight = event.layoutMeasurement.height;
    const paddingToBottom = 20;

    const isScrolledToBottom =
      offsetY + layoutHeight >= contentHeight - paddingToBottom;

    if (isScrolledToBottom) {
      progress.value = withTiming(1, { duration: 500 });
    } else {
      progress.value = withTiming(0, { duration: 500 });
    }
  });

  // Animate only horizontal translation from bottom right to bottom center
  const animatedButtonStyle = useAnimatedStyle(() => {
    const translateX = interpolate(
      progress.value,
      [0, 1],
      [0, -(width / 2 - BUTTON_WIDTH / 2 + HORIZONTAL_MARGIN)],
    );

    return {
      transform: [{ translateX }],
    };
  });

  return (
    <View style={{ flex: 1, position: 'relative' }}>
      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        contentContainerStyle={{ padding: 40}}
      >
        <Text style={{ fontSize: width * 0.1, marginBottom:height *1}}>Afghanistan</Text>
        <Text style={{ fontSize: 16, lineHeight: 24 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Text>
      </Animated.ScrollView>

      <Animated.View
        style={[
          styles.exploreButton,
          {
            position: 'absolute',
            bottom: (BUTTON_BOTTOM_OFFSET*1.5), // fixed bottom
            right: -(BUTTON_WIDTH / 2), // fixed right start position
            
          },
          animatedButtonStyle,
        ]}
      >
        <TouchableOpacity onPress={() => alert('Explore Data pressed')}>
          <Text style={styles.exploreText}>Explore Data</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  exploreButton: {
    width: BUTTON_WIDTH,
    height: BUTTON_HEIGHT,
    backgroundColor: '#007AFF',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  exploreText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Afghanistan;
