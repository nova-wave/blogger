/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";
import React from "react";

export default function MarkdownPreview({
  markdownContent,
}: {
  markdownContent: string;
}) {
  const transformedContent = markdownContent.replace(
    /^(#+)\s+(.*?)\s*$/gm,
    (match: string, hashes: string, title: string) => {
      const level = hashes.length;
      const id = title.toLowerCase().replace(/\s/g, "-");
      return `<h${level} id="${id}"><a href="#${id}">#</a> ${title}</h${level}>`;
    }
  );

  return (
    <div className="markdown-preview-custom">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            // match?.map((i) => console.log({ i }));
            return !inline && match ? (
              <div>
                <div className="language-code-head">
                  {match[1] === "js" ? "javascript" : match[1]}
                </div>
                {
                  <SyntaxHighlighter
                    className="language-code-body"
                    {...props}
                    // eslint-disable-next-line react/no-children-prop
                    children={String(children).replace(/\n$/, "")}
                    style={dark}
                    language={match[1]}
                    PreTag="div"
                  />
                }
              </div>
            ) : (
              <code {...props} className={className}>
                {children}
              </code>
            );
          },
          // Map `h1` (`# heading`) to use `h2`s.
          // Rewrite `em`s (`*like so*`) to `i` with a red foreground color.
          em: ({ node, ...props }) => <i style={{ color: "red" }} {...props} />,
          h1: HeadingComponent,
          h2: HeadingComponent,
          h3: HeadingComponent,
          h4: HeadingComponent,
          h5: HeadingComponent,
          h6: HeadingComponent,
        }}
      >
        {transformedContent}
      </ReactMarkdown>
    </div>
  );
}

interface CodeComponentProps {
  language: string;
  value: string;
}

interface HeadingComponentProps {
  level: number;
  children: React.ReactNode;
}

const HeadingComponent: React.FC<HeadingComponentProps> = ({
  level,
  children,
}) => {
  console.log(children);
  const id = children.toString().toLowerCase().replace(/\s/g, "-");
  console.log(id);
  const handleClick = () => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <React.Fragment>
      {React.createElement(`h${level}`, { id }, children)}
      <a href={`#${id}`} onClick={handleClick}>
        #
      </a>
    </React.Fragment>
  );
};