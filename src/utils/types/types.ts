export type Recipe = {
  id: string;
  image: string;
  title: string;
};

export type Info = {
  id: string;
  analyzedInstructions: [{steps: [{number: number; step: string}]}];
  extendedIngredients: [{id: number; original: string}];
  title: string;
  image: string;
  summary: string;
};

export type Article = {
  article_id: number | null;
  image_url: string;
  title: string;
  description: string;
  link: string;
  pubDate: string;
};
