import { Card as Fcard, Button } from "flowbite-react";

const Card = ({ id, name, image, description, location }) => {
  return (
    <>
      <Fcard
        className="max-w-sm"
        imgAlt="Meaningful alt text for an image that is not purely decorative"
        imgSrc="https://i.pinimg.com/originals/51/82/ac/5182ac536727d576c78a9320ac62de30.jpg"
      >
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {name || "Noteworthy technology acquisitions 2021"}
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          {description ||
            "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order."}
        </p>
        <div className="flex flex-col gap-2">
          <div className="flex gap-6">
            <div className=" gap-2">
              <span className=" text-base text-gray-800 font-semibold">
                Start Date:
              </span>
              <span> 2000-02-02</span>
            </div>
            <div className=" gap-2">
              <span className="text-base text-gray-800 font-semibold">
                Time Span:
              </span>
              <span> 12 Days</span>
            </div>
          </div>
          <div className="flex gap-4">
            <span className=" text-base text-gray-800 font-semibold">
              Registration From:
            </span>
            <span> 2000-02-02</span>
          </div>
          <span className="text-base text-gray-800 font-semibold">
            Location: {location || "kathmandu"}
          </span>
        </div>
        <Button>
          Register Now!!
          <svg
            className="-mr-1 ml-2 h-4 w-4"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </Button>
      </Fcard>
    </>
  );
};
export default Card;
