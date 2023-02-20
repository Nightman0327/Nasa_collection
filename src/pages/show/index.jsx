import React from "react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import BackImg from "../../assets/back.png";

export default function Index() {
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState({
    image: "",
    title: "",
    location: "",
    photographer: "",
    description: "",
    keywords: [],
    date: null,
  });

  useEffect(() => {
    if (location.state && location.state.itemData !== undefined) {
      setData({
        image: location.state.itemData.links[0].href,
        title: location.state.itemData.data[0].title,
        location: location.state.itemData.data[0].location,
        photographer: location.state.itemData.data[0].photographer,
        description:
          location.state.itemData.data[0].description ??
          location.state.itemData.data[0].description_508,
        keywords: location.state.itemData.data[0].keywords,
        date: location.state.itemData.data[0].date_created,
      });
    }
  }, [location]);

  return (
    <div className="max-w-[70%] min-w-[400px] border border-grey-600 m-auto mt-6 mb-6 rounded-lg min-h-[95vh] text-[20px] xl:text-[25px] ">
      <div
        className="cursor-pointer ml-[20px] mt-[20px]"
        onClick={() => {
          navigate(-1);
        }}
      >
        <img src={BackImg} alt="" />
      </div>
      <div className="flex flex-col lg:flex-row justify-between w-[full] px-10 pt-10 pb-[20px]">
        <div className="w-full lg:w-[50%] flex justify-center items-center">
          <div className="bg-black aspect-square flex justify-center w-[80%]">
            <img src={data.image} alt={data.title} className="h-full" />
          </div>
        </div>
        <div className="w-full lg:w-[50%] items-center flex justify-center">
          <div className="w-[80%] gap-[20px] items-stretch flex flex-col">
            <div className="flex justify-between mt-[5%] ">
              <div className="font-bold">Title:</div>
              <div>{data.title ?? "N/A"}</div>
            </div>
            <div className="flex justify-between">
              <div className="font-bold">Location:</div>
              <div>{data.location ?? "N/A"}</div>
            </div>
            <div className="flex justify-between">
              <div className="font-bold">Photographer:</div>
              <div>{data.photographer ?? "N/A"}</div>
            </div>
            <div className="flex justify-between">
              <div className="font-bold">Date:</div>
              <div>
                {new Date(data.date).toLocaleDateString("en-BR") ?? "N/A"}
              </div>
            </div>
            <div className="flex flex-col">
              <div className="font-bold">Keywords:</div>
              <div className="flex justify-center">
                <div className="w-[90%]">
                  <div>{data.keywords.join(", ") ?? "N/A"}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center px-10 pb-10 w-full">
        <div className="w-[80%]">
          <div className="font-bold">Description:</div>
          <div className="flex justify-center">
            <div className="w-[90%] text-[15px] xl:text-[20px] text-justify break-words">
              {data.description ?? "N/A"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
