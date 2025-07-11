import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, RefreshControl } from 'react-native';

const RSS_FEED_URL = 'https://lorem-rss.herokuapp.com/feed?unit=second&interval=5&length=40'; // Replace with your RSS feed URL

function parseRSS(xml) {
  // Simple RSS parser: adapt as needed for your feed
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xml, 'text/xml');
  const items = Array.from(xmlDoc.getElementsByTagName('item')).map(item => ({
    title: item.getElementsByTagName('title')[0].textContent,
    link: item.getElementsByTagName('link')[0].textContent,
    description: item.getElementsByTagName('description')[0].textContent,
    pubDate: item.getElementsByTagName('pubDate')[0].textContent,
  }));
  return items;
}

export default function LiveFeedScreen() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFeed = async () => {
    try {
      const response = await fetch(RSS_FEED_URL);
      const text = await response.text();
      const items = parseRSS(text);
      setData(items);
    } catch (error) {
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeed();
    const interval = setInterval(fetchFeed, 5000); // Refresh every 5 seconds
    return () => clearInterval(interval);
  }, []);

  if (loading) return <ActivityIndicator size="large" style={{ flex: 1 }} />;

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
        <RefreshControl refreshing={loading} onRefresh={fetchFeed} />
      }
    />
  );
}
