import {
  Flex,
  Image,
  View,
  Rating,
  Heading,
  Divider,
  Badge,
} from '@aws-amplify/ui-react';
import { HomePrimitivePreview } from 'src/pages/HomePrimitivePreview';

export const MyApp = () => {
  return (
    <Flex>
      <Image
        src="/road-to-milford-new-zealand-800w.jpg"
        alt="View from road to Milford Sound, New Zealand.
  Glittering stream with old log, snowy mountain peaks
  tower over a green field."
      />
      <View>
        <Divider orientation="horizontal" />
        <Rating value={4.5} />
        <Badge variation="info">Friendly</Badge>
      </View>
    </Flex>
  );
};
