export type MenuDetail = {
  text: string;
  path?: string;
};

export type MenuItem = {
  label: string;
  details: MenuDetail[];
};
