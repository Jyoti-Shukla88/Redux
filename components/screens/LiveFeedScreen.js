import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, ActivityIndicator, RefreshControl, Alert } from 'react-native';
import { XMLParser } from 'fast-xml-parser';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RSS_FEED_URL = 'https://lorem-rss.herokuapp.com/feed?unit=second&interval=5&length=40';

function parseRSS(xml) {
  const parser = new XMLParser();
  const json = parser.parse(xml);
  // Adjust path based on actual RSS structure
  const items = json.rss?.channel?.item || [];
  // Ensure array
  return Array.isArray(items) ? items : [items];
}

export default function LiveFeedScreen() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchFeed = useCallback(async () => {
    try {
      if (!refreshing) setLoading(true);
      const response = await fetch(RSS_FEED_URL);
      const text = await response.text();
      const items = parseRSS(text);
       await AsyncStorage.setItem('liveFeed', JSON.stringify(items));
      setData(items);
    } catch (error) {
      setData([]);
      Alert.alert('Error', 'Failed to load feed.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [refreshing]);

  useEffect(() => {
    fetchFeed();
    const interval = setInterval(fetchFeed, 5000);
    return () => clearInterval(interval);
  }, [fetchFeed]);

  if (loading && !refreshing) return <ActivityIndicator size="large" style={{ flex: 1 }} />;

  return (
    <FlatList
      data={data}
      keyExtractor={item => item.link}
      renderItem={({ item }) => (
        <View style={{ padding: 16, borderBottomWidth: 1, borderColor: '#ccc' }}>
          <Text style={{ fontWeight: 'bold' }}>{item.title}</Text>
          <Text>{item.description}</Text>
          <Text style={{ color: 'gray', fontSize: 12 }}>{item.pubDate}</Text>
        </View>
      )}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() => {
            setRefreshing(true);
            fetchFeed();
          }}
        />
      }
    />
  );
}
