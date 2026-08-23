import { Button } from 'components/button';
import * as S from './routeErrorBoundary.styles';

const handleReload = () => {
  window.location.reload();
};
export const RouteErrorBoundary = () => {
  return (
    <S.Container>
      <S.Headline>Something went wrong.</S.Headline>
      <S.ActionWrapper>
        <Button type="button" onClick={handleReload}>
          Reload Page
        </Button>
      </S.ActionWrapper>
    </S.Container>
  );
};
