import { getActorContext, SignInContext, translate } from '@aws-amplify/ui';

import { Heading } from '../../../primitives/Heading';
import { Button } from '../../../primitives/Button';
import { useAuthenticator } from '../hooks/useAuthenticator';
import { useCustomComponents } from '../hooks/useCustomComponents';
import { useFormHandlers } from '../hooks/useFormHandlers';
import { RemoteErrorMessage } from '../shared/RemoteErrorMessage';

export const MagicLink = (): JSX.Element => {
  const {
    components: {
      MagicLink: { Header = MagicLink.Header, Footer = MagicLink.Footer },
    },
  } = useCustomComponents();

  const { _state, isPending } = useAuthenticator((context) => [
    context.isPending,
  ]);
  const { handleChange, handleSubmit } = useFormHandlers();
  const context = getActorContext(_state) as SignInContext;
  console.log({ context });

  const footerSubmitText = isPending ? (
    <>Verifying&hellip;</>
  ) : (
    <>{translate('Verify')}</>
  );

  return (
    <form
      data-amplify-form=""
      data-amplify-authenticator-verifyuser=""
      method="post"
      onChange={handleChange}
      onSubmit={handleSubmit}
    >
      <fieldset
        style={{ display: 'flex', flexDirection: 'column' }}
        className="amplify-flex"
        disabled={isPending}
      >
        <Header />

        <RemoteErrorMessage />

        <Button
          isLoading={true}
          loadingText="Click the link to finish signing in"
          variation="primary"
        >
          Hello
        </Button>
        <Footer />
      </fieldset>
    </form>
  );
};

MagicLink.Header = () => {
  return (
    <>
      <Heading level={3}>{translate('its magiccccccc.... →')}</Heading>
    </>
  );
};

MagicLink.Footer = (): JSX.Element => null;
