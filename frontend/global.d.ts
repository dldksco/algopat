declare module "*.css" {
  const content: { [className: string]: string };
  export = content;
}

declare module "*.png";
declare module "*.jpg";
