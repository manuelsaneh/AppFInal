import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors} from '../../../styles/Colors';
import {Article} from '../../../utils/types/types';

interface IArticleCardProps {
  item: Article;
}

const ArticleCard = ({item}: IArticleCardProps) => {
  return (
    <View style={styles.articleContainer}>
      <View style={styles.articleCard}>
        {item.image_url && (
          <Image style={styles.articleImage} source={{uri: item.image_url}} />
        )}
        <View style={styles.contentContainer}>
          <Text style={styles.articleTitle}>{item.title}</Text>
          <Text style={styles.articleText}>
            {item.description?.replace(/nbsp;/g, '')}
          </Text>
        </View>

        <View style={styles.articleBottomContent}>
          <Text style={styles.articleBottomText}>{item.pubDate}</Text>
          <Text style={styles.articleBottomText}>{item.link}</Text>
        </View>
      </View>
    </View>
  );
};

export default ArticleCard;

const styles = StyleSheet.create({
  articleContainer: {
    alignItems: 'center',
    flexDirection: 'column',
  },
  articleCard: {
    justifyContent: 'space-between',
    borderRadius: 24,
    width: '90%',
    height: 600,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowOpacity: 0.5,
    shadowRadius: -10,
    elevation: 20,
    backgroundColor: Colors.primary,
    marginVertical: 10,
  },
  imageContainer: {},
  articleImage: {
    width: '100%',
    height: '60%',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    objectFit: 'cover',
    resizeMode: 'cover',
  },
  contentContainer: {
    marginHorizontal: 10,
  },
  articleTitle: {
    color: Colors.tertiary,
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
  },
  articleText: {
    color: Colors.tertiary,
    fontSize: 12,
    fontFamily: 'PoppinsLight',
  },
  articleBottomContent: {
    marginHorizontal: 10,
    marginVertical: 10,
  },
  articleBottomText: {
    color: Colors.tertiary,
    fontSize: 10,
    fontFamily: 'PoppinsLight',
  },
});
