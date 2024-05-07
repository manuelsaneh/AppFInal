import {ActivityIndicator, FlatList, StyleSheet, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useAppSelector} from '../../utils/redux/hooks/hooks';
import useLoading from '../../utils/customHooks/useLoading';
import ArticleCard from '../../components/organisms/ArticleCard/ArticleCard';
import useFetchPost from '../../api/postsApi';
import {Article} from '../../utils/types/types';

const NewsScreen = () => {
  const {loading, startLoading, stopLoading} = useLoading();
  const getPosts = useFetchPost(startLoading, stopLoading);
  const data = useAppSelector(state => state.posts.posts);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  const flatListRef = useRef<FlatList<Article>>(null);

  useEffect(() => {
    getPosts();
  }, []);

  const handleEndReached = () => {
    if (!isFetching) {
      setIsFetching(true);
      setCurrentPage(prevPage => prevPage + 1);
      getPosts();
    }
  };

  const handleRefresh = () => {
    setCurrentPage(1);
    getPosts();
  };

  const renderItem = ({item}: {item: Article}) => <ArticleCard item={item} />;

  return (
    <View style={styles.rootNews}>
      {loading ? (
        <ActivityIndicator size="large" color="#5ccad3" />
      ) : (
        <FlatList
          ref={flatListRef}
          data={data}
          renderItem={renderItem}
          keyExtractor={(item, index) => `${item.article_id}-${index}`}
          contentContainerStyle={styles.gap}
          onEndReachedThreshold={5}
          onEndReached={handleEndReached}
          ListFooterComponent={
            isFetching && currentPage !== 1 ? (
              <ActivityIndicator size="small" color="#5ccad3" />
            ) : null
          }
          refreshing={loading && currentPage === 1}
          onRefresh={handleRefresh}
        />
      )}
    </View>
  );
};

export default NewsScreen;

const styles = StyleSheet.create({
  rootNews: {
    flex: 1,
  },
  gap: {
    gap: 10,
  },
});
