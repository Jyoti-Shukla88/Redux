import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  TextInput,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { runOnJS } from 'react-native-worklets';

const alphabetSegments = [
  { label: 'A...C' },
  { label: 'D...J' },
  { label: 'K...Q' },
  { label: 'R...Z' },
];

export default function FilterSearchToggle() {
  const [selectedSegment, setSelectedSegment] = useState(0);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchText, setSearchText] = useState('');

  const filterFlex = useSharedValue(1);
  const filterOpacity = useSharedValue(1);
  const buttonWidth = useSharedValue(38);
  const searchTranslateX = useSharedValue(250);
  const searchFadeOpacity = useSharedValue(0);

  const toggleSearchFilter = () => {
    if (!isSearchActive) {
      filterFlex.value = withTiming(0.01, { duration: 400 });
      filterOpacity.value = withTiming(0, { duration: 300 });
      buttonWidth.value = withTiming(300, { duration: 400 });
      searchTranslateX.value = withTiming(0, { duration: 400 });
      searchFadeOpacity.value = withTiming(1, { duration: 300 });
      runOnJS(setIsSearchActive)(true);
    } else {
      searchTranslateX.value = withTiming(250, { duration: 400 });
      searchFadeOpacity.value = withTiming(0, { duration: 300 });
      buttonWidth.value = withTiming(38, { duration: 400 });
      filterFlex.value = withTiming(1, { duration: 400 });
      filterOpacity.value = withTiming(1, { duration: 300 });
      runOnJS(setIsSearchActive)(false);
    }
  };

  const animatedFilterStyle = useAnimatedStyle(() => ({
    flex: filterFlex.value,
    opacity: filterOpacity.value,
  }));

  const animatedButtonStyle = useAnimatedStyle(() => ({
    width: buttonWidth.value,
  }));

  const animatedSearchStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: searchTranslateX.value }],
    opacity: searchFadeOpacity.value,
  }));

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.segmentRow}>
        <Animated.View style={[styles.segments, animatedFilterStyle]}>
          {alphabetSegments.map((segment, index) => (
            <TouchableOpacity
              key={segment.label}
              style={[
                styles.segment,
                index === selectedSegment ? styles.segmentSelected : null,
              ]}
              onPress={() => !isSearchActive && setSelectedSegment(index)}
              disabled={isSearchActive}
              activeOpacity={isSearchActive ? 1 : 0.7}
            >
              <Text
                style={[
                  styles.segmentText,
                  index === selectedSegment ? styles.segmentTextSelected : null,
                ]}
              >
                {segment.label}
              </Text>
            </TouchableOpacity>
          ))}
        </Animated.View>

        {isSearchActive && (
          <TouchableOpacity
              style={styles.filterPill}
              onPress={toggleSearchFilter}
              activeOpacity={0.7}
            >
            <Text style={styles.filterPillText}>
              {alphabetSegments[selectedSegment].label}
            </Text>
            </TouchableOpacity>
        )}

        <Animated.View style={[styles.expandingSearchContainer, animatedButtonStyle]}>
          <TouchableOpacity
            onPress={toggleSearchFilter}
            style={styles.searchButton}
            activeOpacity={0.7}
          >
            {!isSearchActive && (
              <Text style={styles.searchIcon}>{'\u2315'}</Text>
            )}
          </TouchableOpacity>

          {isSearchActive && (
            <Animated.View style={[styles.searchBar, animatedSearchStyle]}>
              <View style={styles.searchBarContent}>
                <Text style={styles.searchIcon}>{'\u2315'}</Text>
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search..."
                  placeholderTextColor="#888"
                  autoFocus={true}
                  editable={true}
                  value={searchText}
                  onChangeText={setSearchText}
                />
                {searchText.length > 0 && (
                  <TouchableOpacity onPress={() => setSearchText('')}>
                    <Text style={styles.clearIcon}>✕</Text>
                  </TouchableOpacity>
                )}
                
              </View>
            </Animated.View>
          )}
        </Animated.View>
      </View>

      <View style={styles.noCountriesContainer}>
        <Text style={styles.noCountriesText}>No countries found !!</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f7fafd' },

  segmentRow: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 10,
    alignItems: 'center',
  },
  segments: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    borderRadius: 30,
    overflow: 'hidden',
    height: 40,
    flex: 1,
  },
  segment: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  segmentSelected: {
    backgroundColor: '#007AFF',
  },
  segmentText: {
    color: '#555',
    fontWeight: 'bold',
    fontSize: 15,
  },
  segmentTextSelected: {
    color: '#fff',
  },
  filterPill: {
    backgroundColor: '#fff',
    borderRadius:40,
    paddingHorizontal: 0,
    paddingVertical: 7,
    marginRight: 6,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#007AFF',
    borderWidth: 1.5,
    marginLeft: 10,
  },
  filterPillText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  expandingSearchContainer: {
    flexDirection: 'row',
    height: 40,
    borderRadius: 20,
    borderColor: '#007AFF',
    borderWidth: 1.5,
    backgroundColor: '#fff',
    overflow: 'hidden',
    alignItems: 'center',
    paddingHorizontal: 6,
    marginLeft: 10,
  },
  searchButton: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    //paddingHorizontal: 8,
    marginLeft: 3,
  },
  searchIcon: {
    fontSize: 22,
    color: '#007AFF',
    //marginTop: 0,
    marginRight: 8,
  },
  searchBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  searchBarContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  clearIcon: {
    fontSize: 18,
    color: '#007AFF',
    marginLeft: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  noCountriesContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noCountriesText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
});
