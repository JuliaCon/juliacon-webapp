import * as React from "react";
import { VSpace } from "./layout";
import { css } from "emotion";

// Displays a sponsor on the sponsors page
// Currently not in use

export const Sponsor = (sponsor: {
  sponsor: {
    sponsorName: string;
    blurb: string;
    moreInfoURL: string;
    videoURL: string;
    chatChannelName: string;
    logoURL: string;
    tier: string;
  };
}) => {
  const sponsorObj = sponsor.sponsor;

  function youtube_parser(url: string) {
    var regExp = /.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#&?]*).*/;
    var match = url.match(regExp);
    return match && match[1].length === 11 ? match[1] : false;
  }

  const videoID = youtube_parser(sponsorObj.videoURL);
  return (
    <div
      className={css`
         {
          display: flex;
          align-items: center;
        }
      `}
    >
      <img
        src={sponsorObj.logoURL}
        alt={sponsorObj.sponsorName}
        className={css`
           {
            padding: 15px;
            width: 180px;
            height: 150px;
            object-fit: contain;
            border: 0;
          }
        `}
      />
      <div
        className={css`
           {
            flex: 1;
            margin: 10px 10px 10px 40px;
            padding-left: 45px;
          }
        `}
      >
        <h3
          className={css`
             {
              font-weight: bold;
            }
          `}
        >
          {sponsorObj.sponsorName}
        </h3>
        <p
          className={css`
             {
              font-size: 14px;
              letter-spacing: 0;
              line-height: 20px;
              margin: 6px 0 0;
            }
          `}
        >
          {sponsorObj.blurb}
        </p>
        <a href={sponsorObj.moreInfoURL}>More Info</a>
      </div>
      {videoID ? (
        <div>
          <h4> Sponsor video</h4>
          <VSpace />
          <iframe
            title={sponsorObj.sponsorName}
            width="267"
            height="150"
            src={
              "https://www.youtube.com/embed/" +
              youtube_parser(sponsorObj.videoURL)
            }
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
