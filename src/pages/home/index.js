import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setCollection,
  setSearchData,
} from "../../redux/actions/collection.action";

export default function Index() {
  const collection = useSelector((state) => state.collectionState.collection);
  const searchData = useSelector((state) => state.collectionState.searchData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchText, setSearchText] = useState(searchData.searchText);
  const [yearStart, setYearStart] = useState(searchData.yearStart);
  const [yearEnd, setYearEnd] = useState(searchData.yearEnd);

  const searchFuc = (curPage) => {
    if (searchText !== "") {
      let url =
        "https://images-api.nasa.gov/search?q=" +
        searchText +
        "&media_type=image&page=" +
        curPage;
      if (yearStart !== "") {
        url += "&year_start=" + yearStart;
      }
      if (yearEnd !== "") {
        url += "&year_end=" + yearEnd;
      }
      axios
        .get(url)
        .then((res) => {
          dispatch(
            setSearchData({ searchText, yearStart, yearEnd, page: curPage })
          );
          dispatch(setCollection(res.data.collection.items));
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("Please input search text.");
    }
  };

  return (
    <div className="max-w-[70%] min-w-[400px] border border-grey-600 m-auto mt-6 rounded-lg p-10 min-h-[95vh]">
      <div className="flex flex-wrap justify-center border-b-2 p-5">
        <div className="flex-wrap m-6 text-center">
          <input
            onChange={(e) => setSearchText(e.target.value)}
            value={searchText}
            className="border border-1 border-grey rounded-md h-10 p-5 my-3"
            placeholder="search"
          />
          <button
            onClick={() => searchFuc(searchData.page)}
            className="border border-1 rounded-md h-10 px-5 hover:bg-[darkgrey] hover:text-white mx-5 my-3"
          >
            Search
          </button>
        </div>
        <div className="flex-wrap md:flex w-full md:w-[max-content]">
          <div className="flex items-center w-full md:w-[220px] justify-around my-3">
            <label htmlFor="Start" className="mx-5">
              Year Start:{" "}
            </label>
            <input
              className="border border-1 border-grey rounded-md h-10 p-5 w-[100px]"
              type="number"
              min="0"
              onChange={(e) => setYearStart(e.target.value)}
              value={yearStart}
              placeholder="YYYY"
            />
          </div>
          <div className="flex items-center w-full md:w-[220px] justify-around my-3">
            <label htmlFor="End" className="mx-5">
              Year End:{" "}
            </label>
            <input
              className="border border-1 border-grey rounded-md h-10 p-5 w-[100px]"
              type="number"
              min="0"
              onChange={(e) => setYearEnd(e.target.value)}
              value={yearEnd}
              placeholder="YYYY"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-wrap justify-between">
        <p className="my-5 text-[20px]">Search Result:</p>
        <div className="flex flex-wrap w-full md:w-[max-content] justify-between">
          <button
            onClick={() =>
              searchFuc(searchData.page - 1 < 1 ? 1 : searchData.page - 1)
            }
            className="border border-1 rounded-md h-10 px-5 hover:bg-[darkgrey] hover:text-white mx-5 my-3"
          >
            Prev
          </button>
          <input
            className="border border-1 border-grey rounded-md h-10 p-1 my-3 w-[50px] text-center"
            value={searchData.page}
            disabled
          />
          <button
            onClick={() => searchFuc(searchData.page + 1)}
            className="border border-1 rounded-md h-10 px-5 hover:bg-[darkgrey] hover:text-white mx-5 my-3"
          >
            Next
          </button>
        </div>
      </div>
      <div className="border border-1 p-2 flex flex-wrap justify-around">
        {collection.length > 0
          ? collection?.map((item, i) => (
              <div
                key={i}
                className="w-[300px] justify-center bg-grey grid m-5"
              >
                <div
                  className="bg-black w-[300px] h-[300px] flex justify-center cursor-pointer"
                  onClick={() => {
                    navigate("/show", { state: { itemData: item } });
                  }}
                >
                  <img src={item.links[0].href} alt="" className="h-full" />
                </div>
                <p className="w-full text-center">{item.data[0].title}</p>
                <p className="w-full text-center">
                  location:{" "}
                  {item.data[0].location ? item.data[0].location : "N/A"}
                </p>
                <p className="w-full text-center">
                  photographer:{" "}
                  {item.data[0].photographer
                    ? item.data[0].photographer
                    : "N/A"}
                </p>
              </div>
            ))
          : "No data"}
      </div>
    </div>
  );
}
