import React, { useEffect, useRef } from 'react';
import { View, Text, FlatList, ActivityIndicator, RefreshControl, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
// If liveFeedActions.js is in a redux folder one level up:
import { fetchFeedRequest } from '../redux/liveFeedActions';


export default function LiveFeedScreen() {
  const dispatch = useDispatch();
  const { data=[], loading, error } = useSelector(state => state.liveFeed);

  const intervalRef = useRef();

  useEffect(() => {
    dispatch(fetchFeedRequest());
    intervalRef.current = setInterval(() => {
      dispatch(fetchFeedRequest());
    }, 5000);
    return () => clearInterval(intervalRef.current);
  }, [dispatch]);

  useEffect(() => {
    if (error) Alert.alert('Error', error);
  }, [error]);
  
  const filteredData = data;

  if (loading && (!Array.isArray(data) || data.length === 0)) return <ActivityIndicator size="large" style={{ flex: 1 }} />;


  return (
    <FlatList
      data={filteredData}
      keyExtractor={item => item.link || item.id || Math.random().toString()}
      renderItem={({ item }) => (
        <View style={{ padding: 16, borderBottomWidth: 1, borderColor: '#ccc' }}>
          <Text style={{ fontWeight: 'bold' }}>{item.title}</Text>
          <Text>{item.description}</Text>
          <Text style={{ color: 'gray', fontSize: 12 }}>{item.pubDate}</Text>
        </View>
      )}
      refreshControl={
        <RefreshControl
          refreshing={loading}
          onRefresh={() => dispatch(fetchFeedRequest())}
        />
      }
    />
  );
}
