import { Dimmer, Loader } from 'semantic-ui-react';

interface LoadingComponenetProps {
  inverted?: boolean;
  content?: string;
}

export default function LoadingComponenet({
  inverted = true,
  content = 'Loading...'
}: LoadingComponenetProps) {
  return (
    <Dimmer active={true} inverted={inverted}>
      <Loader content={content} />
    </Dimmer>
  );
}
