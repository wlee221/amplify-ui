import * as React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import StackBlitzSDK from '@stackblitz/sdk';

import { Card, Button, Flex, useTheme, Icon } from '@aws-amplify/ui-react';

interface ExampleProps {
  children: React.ReactNode;
  className?: string;
}

const stackBlitzIndex = `
import React from 'react';
import ReactDOM from 'react-dom/client';
import * as Example from './Example';
import { AmplifyProvider } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css'; // default theme
import '@fontsource/inter/variable.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AmplifyProvider>
      {Object.keys(Example).map(key => {
        const Component = Example[key];
        return <Component />
      })}
    </AmplifyProvider>
  </React.StrictMode>
);`;

const openStackBlitz = (text: string, title: string, description: string) => {
  StackBlitzSDK.openProject(
    // Payload:
    {
      files: {
        'public/index.html': `<div id="root"></div>`,
        'src/Example.js': text,
        'src/index.js': stackBlitzIndex,
      },
      template: 'create-react-app',
      title,
      description,
      dependencies: {
        // '@aws-amplify/ui-react': '^2.17.0',
        // 'aws-amplify': '^4.3.21',
        react: '^18.1.0',
        'react-dom': '^18.1.0',
        'react-scripts': '5.0.1',
      },
    },

    // Options
    {
      newWindow: true,
      openFile: 'src/Example.js',
    }
  );
};

export function Example({ children, className = '' }: ExampleProps) {
  const { tokens } = useTheme();

  return (
    <Card
      variation="outlined"
      className={`example ${className}`}
      style={{ marginBottom: `${tokens.space.large}` }}
    >
      <Flex direction="column">{children}</Flex>
    </Card>
  );
}

export function ExampleCode({ children, title = 'Example', description = '' }) {
  const [copied, setCopied] = React.useState(false);
  const [text, setText] = React.useState('');
  const ref = React.useRef(null);

  React.useLayoutEffect(() => {
    setText(ref.current.innerText);
    return () => {};
  }, [children]);

  const copy = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <>
      <div className="example-code">
        <div ref={ref}>{children}</div>
      </div>
      <Flex direction="row" justifyContent="flex-end">
        <CopyToClipboard text={text} onCopy={copy}>
          <Button
            size="small"
            isLoading={copied}
            className="example-copy-button"
          >
            {copied ? 'Copied!' : 'Copy'}
          </Button>
        </CopyToClipboard>
        <Button
          size="small"
          onClick={() => openStackBlitz(text, title, description)}
        >
          <Icon
            ariaLabel=""
            pathData="M8.13378 16.1087H0L14.8696 0L10.8662 11.1522L19 11.1522L4.13043 27.2609L8.13378 16.1087Z"
          />
          Open in StackBlitz
        </Button>
      </Flex>
    </>
  );
}
