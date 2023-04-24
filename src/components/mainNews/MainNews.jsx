import React from "react";
import "./MainNews.css";
import CardNews from "./../cardNews/CardNews";

const MainNews = ({ arucals ,FakeActive}) => {
  const filteredArticles = arucals && arucals.length
    ? arucals.filter(
        item =>
          item.hasOwnProperty('title') &&
          item.hasOwnProperty('description') &&
          item.hasOwnProperty('urlToImage') &&
          item.hasOwnProperty('content') &&
          item.hasOwnProperty('author')
      )
    : [];

  return (
    <div className="MainNews">
      <span className={`Active ${
        FakeActive ? "ActiveTrue" : "ActiveFalse"
      }`}></span>
      {filteredArticles.map((item, index) => (
        <CardNews
          key={index}
          title={item.title}
          description={item.description}
          urlToImage={item.urlToImage}
          url={item.url}
          content={item.content}
          publishedAt={item.publishedAt}
          author={item.author}
        />
      ))}
    </div>
  );
};

export default MainNews;