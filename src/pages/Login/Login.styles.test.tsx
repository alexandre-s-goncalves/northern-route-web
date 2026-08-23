import { describe, expect, test } from 'vitest';
import { render } from '@testing-library/react';
import 'jest-styled-components';
import * as S from './Login.styles';

describe('Login.styles', () => {
  describe('ActionsRow SHOULD match snapshot', () => {
    test('standard flex container layout render', () => {
      const { container } = render(<S.ActionsRow />);
      expect(container).toMatchSnapshot();
    });
  });

  describe('ButtonLogin SHOULD match snapshot', () => {
    test('submit interaction and transition design layout render', () => {
      const { container } = render(<S.ButtonLogin>Login</S.ButtonLogin>);
      expect(container).toMatchSnapshot();
    });
  });

  describe('ErrorContainer SHOULD match snapshot', () => {
    test('feedback wrapper box structural dimensions render', () => {
      const { container } = render(<S.ErrorContainer />);
      expect(container).toMatchSnapshot();
    });
  });

  describe('FieldsContainer SHOULD match snapshot', () => {
    test('vertical stack forms configuration layout render', () => {
      const { container } = render(<S.FieldsContainer />);
      expect(container).toMatchSnapshot();
    });
  });

  describe('GlassCard SHOULD match snapshot', () => {
    test('glassmorphism translucent blur layer and shadow layout render', () => {
      const { container } = render(<S.GlassCard action={async () => {}} />);
      expect(container).toMatchSnapshot();
    });
  });

  describe('HeaderContainer SHOULD match snapshot', () => {
    test('centered typography anchor alignment layout render', () => {
      const { container } = render(<S.HeaderContainer />);
      expect(container).toMatchSnapshot();
    });
  });

  describe('InputEmail SHOULD match snapshot', () => {
    test('atomic username credentials element layout render', () => {
      const { container } = render(<S.InputEmail />);
      expect(container).toMatchSnapshot();
    });
  });

  describe('InputPassword SHOULD match snapshot', () => {
    test('atomic security password credentials element layout render', () => {
      const { container } = render(<S.InputPassword />);
      expect(container).toMatchSnapshot();
    });
  });

  describe('PageWrapper SHOULD match snapshot', () => {
    test('geometric radial ambient gradient background element layout render', () => {
      const { container } = render(<S.PageWrapper />);
      expect(container).toMatchSnapshot();
    });
  });

  describe('TextError SHOULD match snapshot', () => {
    test('validation error typography constraints layout render', () => {
      const { container } = render(<S.TextError>Error</S.TextError>);
      expect(container).toMatchSnapshot();
    });
  });

  describe('TextForgotPassword SHOULD match snapshot', () => {
    test('interactive hyperlink configuration and text properties layout render', () => {
      const { container } = render(
        <S.TextForgotPassword>Forgot Password?</S.TextForgotPassword>,
      );
      expect(container).toMatchSnapshot();
    });
  });

  describe('TextTitle SHOULD match snapshot', () => {
    test('uppercase headline layout with linear gradient pseudo element line divider render', () => {
      const { container } = render(<S.TextTitle>Welcome</S.TextTitle>);
      expect(container).toMatchSnapshot();
    });
  });
});
