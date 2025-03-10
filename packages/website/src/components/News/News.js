import * as React from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

export function NewsSummary({ avatar, author, date }) {
  return (
    <div className="flex space-x-4">
      {avatar && <GatsbyImage image={getImage(avatar)} alt={author || "Skynet Labs"} className="rounded-full" />}
      <div className="flex flex-col text-xs justify-around h-10">
        <div className="text-palette-600">{author || "Skynet Labs"}</div>
        {date && <div className="text-palette-400">{date}</div>}
      </div>
    </div>
  );
}
