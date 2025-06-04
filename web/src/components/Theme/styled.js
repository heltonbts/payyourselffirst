const theme = (prop) => (value) => (props) => props.theme[prop][value];

export const th = {
  space: theme("spaces"),
  size: theme("fontSize"),
  color: theme("color"),
};

export const flexbox = (props) => {
  const direction =
    typeof props.flexbox === Boolean ? props.flexDirection : props.flexbox;

  const justifyContent = props.justifyContent || (props.center && "center");
  const alignItems = props.alignItems || (props.center && "center");

  return `
  ${(props.flexbox && "display: flex;") || ""}
  ${(direction && `flex-direction: ${direction};`) || ""}
  ${(props.flex && `flex: ${props.flex};`) || ""};
  ${(justifyContent && `justify-content: ${justifyContent};`) || ""}
  ${(alignItems && `align-items: ${alignItems};`) || ""}
`;
};

export const display = (props) => props.display && `display: ${props.display};`;

export const background = (props) => {
  if (!props.bg) return "";

  const color = props.theme?.colors?.[props.bg] || props.bg;
  return `background: ${color};`;
};

export const color = (props) =>
  props.color && `color: ${props.theme.colors[props.color] || props.color};`;

export const fontSize = (props) =>
  props.fontSize && `font-size: ${props.theme.fontSizes[props.fontSize]};`;

export const margin = (props) => {
  const mb = props.mb || props.my || props.m;
  const mt = props.mt || props.my || props.m;
  const ml = props.ml || props.mx || props.m;
  const mr = props.mr || props.mx || props.m;

  return `
${mb && `margin-bottom: ${props.theme.spaces[mb]}px;`}
${mt && `margin-top: ${props.theme.spaces[mt]}`}
${ml && `margin-left: ${props.theme.spaces[ml]}`}
${mr && `margin-right: ${props.theme.spaces[mr]}`}
`;
};

export const padding = (props) => {
  const pb = props.pb ?? props.py ?? props.p;
  const pt = props.pt ?? props.py ?? props.p;
  const pl = props.pl ?? props.px ?? props.p;
  const pr = props.pr ?? props.px ?? props.p;

  return `
${pb && `padding-bottom: ${props.theme.spaces[pb]}px;`}
${pt && `padding-top: ${props.theme.spaces[pt]}`}
${pl && `padding-left: ${props.theme.spaces[pl]}`}
${pr && `padding-right: ${props.theme.spaces[pr]}`}`;
};
