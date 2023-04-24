import React, { useState, useEffect } from "react";
import "./CardNews.css";
import fallbackImage from "./../../Image/fallbackImage.png";
import { FaExpand } from "react-icons/fa";
import { FaRegTimesCircle } from "react-icons/fa";

const CardNews = ({
  title,
  author,
  description,
  urlToImage,
  url,
  content,
  publishedAt,
  key,
}) => {
  const [Visible, setVisible] = useState(false);
  const [imageSrc, setImageSrc] = useState(urlToImage);

  // التحقق من ان الصورة توجد علي الخادم و اذا لم تكن موجودة يتم استبدالها بصورة احتياطية
  useEffect(() => {
    const checkImage = async () => {
      try {
        const response = await fetch(urlToImage);
        if (response.ok) {
          setImageSrc(urlToImage);
        } else {
          setImageSrc(fallbackImage);
        }
      } catch (error) {
        setImageSrc(fallbackImage);
        console.clear();
      }
    };

    if (urlToImage) {
      checkImage();
    } else {
      setImageSrc(fallbackImage);
    }
  }, [urlToImage]);

  function getDaysBetweenDates(date1, date2) {
    const date1Seconds = date1.getTime() / 1000;
    const date2Seconds = date2.getTime() / 1000;

    const diffSeconds = Math.abs(date2Seconds - date1Seconds);
    const days = Math.floor(diffSeconds / (60 * 60 * 24));

    return days;
  }

  const date1 = new Date(publishedAt);
  const date2 = new Date();
  const daysSince = getDaysBetweenDates(date1, date2);
  let arrayColor = [
    "tag-blue",
    "tag-red",
    "tag-green",
    "tag-yellow",
    "tag-purple",
    "tag-orange",
    "tag-pink",
    "tag-brown",
    "tag-black",
  ];
  let arrayCategory = [
    "business",
    "entertainment",
    "general",
    "health",
    "science",
    "sports",
    "technology",
  ];

  return (
    <>
      <div className="container">
        <div className="card">
          <div className="card__header">
            <img
              src={imageSrc}
              alt="card__image"
              className="card__image"
              width={600}
              lazy="loading"
            />
                        <FaExpand
                  type="button"
                  className="btnEye"
                  onClick={() => setVisible(true)}
                />
          </div>
          <div className="card__body">
            <span
              className={`tag ${arrayColor[Math.floor(Math.random() * 9)]}`}
            >
              {arrayCategory[Math.floor(Math.random() * 7)]}
            </span>
            <h4>
              {title !== null && title !== undefined && title !== ""
                ? title
                : "عنوان الخبر غير متوفر"}
            </h4>
            <p className="Description">{description}</p>
          </div>
          <div className="card__footer">
            <div className="user">
              <img
                src={`https://i.pravatar.cc/40?img=${key}`}
                alt="user__image"
                className="user__image"
              />
              <div className="user__info">
                <h5 className="authorName">
                  {author !== null && author !== undefined && author !== ""
                    ? author
                    : "اسم المؤلف غير متوفر"}
                </h5>
                <small>
                  {isNaN(daysSince)
                    ? "تاريخ النشر غير متوفر"
                    : `${daysSince} days ago`}
                </small>
                
              </div>
            </div>

          </div>
        </div>
      </div>
      <dialog
        open={Visible}
        onHide={() => setVisible(false)}
        className="DialogContanet"
      >
        <div className="conImage">
          <img
            src={imageSrc}
            alt="card__image"
            className="DialogImage"
            lazy="loading"
          />
          <FaRegTimesCircle
                  type="button"
                  className="btnClose"
                  onClick={() => setVisible(false)}
                />
                <div className="card__footer card__footerDialog">
            <div className="user">
              <img
                src={`https://i.pravatar.cc/40?img=${key}`}
                alt="user__image"
                className="user__image"
              />
              <div className="user__info">
                <h5 className="authorName">
                  {author !== null && author !== undefined && author !== ""
                    ? author
                    : "اسم المؤلف غير متوفر"}
                </h5>
                <small>
                  {isNaN(daysSince)
                    ? "تاريخ النشر غير متوفر"
                    : `${daysSince} days ago`}
                </small>
              </div>
            </div>
            </div>

        </div>
        <div className="ContanetDialog">
              <h4>
                {title !== null && title !== undefined && title !== ""
                  ? title
                  : "عنوان الخبر غير متوفر"}
              </h4>
              <div><span>description</span><p>{description}</p></div>
              <div><span>content</span><p>{content}</p></div>

</div>
                    <a href={url} target="_blank" rel="noopener noreferrer">Go To Source</a>
      </dialog>
    </>
  );
};

export default CardNews;
