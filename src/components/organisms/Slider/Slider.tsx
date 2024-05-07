import {View, useWindowDimensions} from 'react-native';
import React from 'react';
import Item from '../../molecules/Item/Item';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import {Recipe} from '../../../utils/types/types';

interface ISliderProps {
  data: Recipe[];
}

const Slider = ({data}: ISliderProps) => {
  const {width} = useWindowDimensions();
  const x = useSharedValue(0);
  const itemWidth = 200;
  const itemHeight = 200;
  const marginHorizontal = 20;
  const itemFullWidth = itemWidth + marginHorizontal * 2;
  const spacer = (width - itemFullWidth) / 2;

  const onScroll = useAnimatedScrollHandler({
    onScroll: event => {
      x.value = event.contentOffset.x;
    },
  });

  return (
    <Animated.FlatList
      data={data}
      renderItem={({item, index}) => (
        <Item
          item={item}
          index={index}
          width={itemWidth}
          height={itemHeight}
          marginHorizontal={marginHorizontal}
          x={x}
          fullWidth={itemFullWidth}
        />
      )}
      onScroll={onScroll}
      horizontal
      showsHorizontalScrollIndicator={false}
      ListHeaderComponent={<View />}
      ListHeaderComponentStyle={{width: spacer}}
      ListFooterComponent={<View />}
      ListFooterComponentStyle={{width: spacer}}
      scrollEventThrottle={16}
      decelerationRate="fast"
      snapToInterval={itemFullWidth}
    />
  );
};

export default Slider;
