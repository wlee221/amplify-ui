import * as UI from "@aws-amplify/ui-react";
import { MDXProvider } from "@mdx-js/react";
import { Amplify } from "aws-amplify";
import Highlight, { defaultProps, Language } from "prism-react-renderer";
import theme from "prism-react-renderer/themes/nightOwl";
import { Sandpack, SandpackPredefinedTemplate } from "react-smooshpack";

import "react-smooshpack/dist/index.css";
import "tailwindcss/tailwind.css";

import "@aws-amplify/ui-react/styles.css";

import awsmobile from "./aws-exports";
Amplify.configure(awsmobile);
const components = {
  code({ children, className = "template-jsx", sandbox, template = "react" }) {
    if (sandbox) {
      return (
        <Sandpack
          files={{ "/App.js": children }}
          template={template as SandpackPredefinedTemplate}
        />
      );
    }

    return (
      <Highlight
        {...defaultProps}
        code={children.trim()}
        language={className.split("-").pop() as Language}
        theme={theme}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className} style={style}>
            {tokens.map((line, i) => (
              <div {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    );
  },

  pre({ children }) {
    return <div>{children}</div>;
  },

  ...UI,

  UI
};

function MyApp({ Component, pageProps }) {
  return (
    <div className="antialiased text-gray-900 bg-gray-50">
      <div className="max-w-3xl px-4 py-10 mx-auto sm:px-6 sm:py-12 lg:max-w-4xl lg:py-16 lg:px-8 xl:max-w-6xl">
        <div className="mx-auto prose-sm prose sm:prose lg:prose-md xl:prose-2xl">
          <MDXProvider components={components}>
            <Component {...pageProps} />
          </MDXProvider>
        </div>
      </div>
    </div>
  );
}

export default MyApp;
