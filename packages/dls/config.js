const sdToFigma = require("@divriots/style-dictionary-to-figma");
const { transform } = require("@divriots/style-dictionary-to-figma");

const coreAndSemanticTokens = ["color", "size"];
const componentsTokens = ["button"];

const tokenFiler = (cat) => (token) => {
  const { category, type } = token.attributes;
  return ["core", "semantic"].includes(category)
    ? type === cat
    : category === cat;
};

const generateFilesArr = (tokensCategories, ext, format) => {
  return tokensCategories.map((category) => {
    return {
      filter: tokenFiler(category),
      destination: `${category}.tokens.${ext}`,
      format,
    };
  });
};

module.exports = {
  source: ["**/*.tokens.json"],
  format: {
    figmaTokensPlugin: ({ dictionary }) => {
      const transformedTokens = transform(dictionary.tokens);
      return JSON.stringify(transformedTokens, null, 2);
    },
  },
  platforms: {
    css: {
      transformGroup: "css",
      buildPath: "build/css/",
      files: generateFilesArr(
        [...coreAndSemanticTokens, ...componentsTokens],
        "css",
        "css/variables"
      ),
    },
    scss: {
      transformGroup: "scss",
      buildPath: "build/scss/",
      files: generateFilesArr(coreAndSemanticTokens, "scss", "scss/variables"),
    },
    js: {
      transformGroup: "js",
      buildPath: "build/js/",
      files: generateFilesArr(coreAndSemanticTokens, "js", "javascript/es6"),
    },
    json: {
      transformGroup: "js",
      buildPath: "build/",
      files: [
        {
          destination: "figma-tokens.json",
          format: "figmaTokensPlugin",
        },
      ],
    },


  },
};
