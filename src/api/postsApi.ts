import {useAppDispatch, useAppSelector} from '../utils/redux/hooks/hooks';
import axios from 'axios';
import {setPosts} from '../utils/redux/slices/postsSlice';
import {Alert} from 'react-native';
import {useState} from 'react';
import {Article} from '../utils/types/types';

const useFetchPost = (startLoading: () => void, stopLoading: () => void) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [allPosts, setAllPosts] = useState<Article[]>([]);
  const token = useAppSelector(state => state.auth.token);
  const accessToken = token?.replace(/^"|"$/g, '');
  console.log(accessToken);

  const authPosts = axios.create({
    baseURL: 'http://192.30.129.113:5837',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });
  const dispatch = useAppDispatch();

  return async () => {
    try {
      startLoading();
      const res = await authPosts.get(`/posts?page=${currentPage}&pageSize=10`);
      const newData = res.data.results;
      setAllPosts(prev => [...prev, ...newData]);
      setCurrentPage(prev => prev + 1);
      dispatch(setPosts(allPosts));
    } catch (err) {
      Alert.alert('Server Error.', 'Try again.', [
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ]);
    } finally {
      stopLoading();
    }
  };
};

export default useFetchPost;
