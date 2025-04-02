module.exports = {
  extends: ["stylelint-config-standard-scss"],
  plugins: ["stylelint-scss"],
  rules: {
    "block-no-empty": true,
    "color-no-invalid-hex": true,
    "selector-class-pattern":
      "^[a-z]([a-z0-9]*)(-[a-z0-9]+)*(__[a-z0-9]+)?(--[a-z0-9]+)?$",
    "declaration-block-no-redundant-longhand-properties": null,
    "declaration-empty-line-before": [
      "always",
      {
        except: ["after-declaration", "first-nested"],
        ignore: ["after-comment", "inside-single-line-block"],
      },
    ],
  },
};
