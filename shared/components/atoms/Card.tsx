import React from "react";
type CardProps = {
  children: React.ReactNode;
  className?: string;
}
function Card({ children }: CardProps) {
  return <article>{children}</article>;
}

function Thumbnail({ children }: CardProps) {
  return <div>{children}</div>;
}

function Description({  children }: CardProps) {
  return <div>{children}</div>;
}

Card.Thumbnail = Thumbnail;
Card.Description = Description;

export default Card;
