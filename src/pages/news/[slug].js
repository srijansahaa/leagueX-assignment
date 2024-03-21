import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import "../../app/globals.css";
import Link from "next/link";
import Head from "next/head";

const Page = () => {
  const router = useRouter();
  const [articles, setArticles] = useState([]);
  const [openSort, setOpenSort] = useState(false);
  const [openFromDate, setOpenFromDate] = useState(false);
  const [openToDate, setOpenToDate] = useState(false);

  const sortOptions = [
    { label: "Most Relevant", option: "relevancy" },
    { label: "Most Popular", option: "popularity" },
    { label: "Newest", option: "publishedAt" },
  ];

  const dateOptions = [
    { label: "March 21st, 2024", option: "2024-03-21" },
    { label: "March 10th, 2023", option: "2024-03-10" },
    { label: "March 1st, 2023", option: "2024-03-01" },
    { label: "February 21st, 2022", option: "2024-02-21" },
  ];

  const [selectedFilters, setselectedFilters] = useState([]);

  const getNews = () => {
    let queryParams = `?q=${encodeURIComponent(router.query.slug)}`;
    selectedFilters.forEach((filter) => {
      queryParams += `&${filter.type}=${encodeURIComponent(filter.value)}`;
    });

    axios
      .get(
        `https://newsapi.org/v2/everything${queryParams}&apiKey=4a415886915946b1b2b6cf7763d54e47`
      )
      .then((res) => {
        if (res.data.status === "ok") {
          setArticles(
            res.data.articles.filter((art) => art.content !== "[Removed]")
          );
        }
      })
      .catch((err) => console.log(err));
  };

  const updateFilters = (filterObj) => {
    const existingFilterIndex = selectedFilters.findIndex(
      (filter) => filter.type === filterObj.type
    );

    if (existingFilterIndex !== -1) {
      const updatedFilters = [...selectedFilters];
      updatedFilters[existingFilterIndex] = filterObj;
      setselectedFilters(updatedFilters);
    } else {
      setselectedFilters((prevFilters) => [...prevFilters, filterObj]);
    }
  };

  const getSelectedFilterLabel = (type, options) => {
    const filter = selectedFilters.find((filter) => filter.type === type);
    if (filter) {
      const label = options.find(
        (option) => option.option === filter.value
      )?.label;
      return label || "";
    }
    return "";
  };

  useEffect(() => {
    if (router.query.slug) {
      getNews();
    }
  }, [router.query.slug, selectedFilters]);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then((registration) => console.log("scope is: ", registration.scope));
    }
  }, []);

  return (
    <>
      <Head>
        <title>Get the latest news</title>
        <meta
          name="description"
          content="This is Srijan's submission for LeagueX"
        />
      </Head>
      <div className="xl:container mx-auto py-8 font-mono px-4 xl:px-0">
        <div className="flex gap-4 items-center mb-8">
          <Link href="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M9.53 2.47a.75.75 0 0 1 0 1.06L4.81 8.25H15a6.75 6.75 0 0 1 0 13.5h-3a.75.75 0 0 1 0-1.5h3a5.25 5.25 0 1 0 0-10.5H4.81l4.72 4.72a.75.75 0 1 1-1.06 1.06l-6-6a.75.75 0 0 1 0-1.06l6-6a.75.75 0 0 1 1.06 0Z"
                clipRule="evenodd"
              />
            </svg>
          </Link>

          <h2 className="text-4xl font-bold">
            Everything releated to {router.query.slug}
          </h2>
        </div>

        {articles.length > 0 ? (
          <div className="columns-2 flex gap-4 flex-col lg:flex-row">
            <div className="w-full lg:max-w-96 border rounded-lg p-6 h-fit">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                Filters
              </h5>

              <div className="flex flex-col gap-2">
                <button
                  className="w-full text-black bg-slate-200 hover:bg-slate-400 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center flex items-center justify-between"
                  type="button"
                  onClick={() => setOpenSort(!openSort)}
                >
                  Sort: {getSelectedFilterLabel("sortBy", sortOptions)}
                  <svg
                    className="w-2.5 h-2.5 ms-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>

                {openSort && (
                  <div className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-full">
                    <ul
                      className="py-2 text-sm text-gray-700"
                      aria-labelledby="dropdownDefaultButton"
                    >
                      {sortOptions.map((sort, index) => (
                        <li key={index}>
                          <button
                            className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
                            onClick={() => {
                              updateFilters({
                                type: "sortBy",
                                value: sort.option,
                              });
                              setOpenSort(false);
                            }}
                          >
                            {sort.label}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <button
                  className="w-full text-black bg-slate-200 hover:bg-slate-400 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center flex items-center justify-between"
                  type="button"
                  onClick={() => setOpenFromDate(!openFromDate)}
                >
                  From Date: {getSelectedFilterLabel("from", dateOptions)}
                  <svg
                    className="w-2.5 h-2.5 ms-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>

                {openFromDate && (
                  <div className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-full">
                    <ul
                      className="py-2 text-sm text-gray-700"
                      aria-labelledby="dropdownDefaultButton"
                    >
                      {dateOptions.map((date, index) => (
                        <li key={index}>
                          <button
                            className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
                            onClick={() => {
                              updateFilters({
                                type: "from",
                                value: date.option,
                              });
                              setOpenFromDate(false);
                            }}
                          >
                            {date.label}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <button
                  className="w-full text-black bg-slate-200 hover:bg-slate-400 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center flex items-center justify-between"
                  type="button"
                  onClick={() => setOpenToDate(!openToDate)}
                >
                  To Date {getSelectedFilterLabel("to", dateOptions)}
                  <svg
                    className="w-2.5 h-2.5 ms-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>

                {openToDate && (
                  <div className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-full">
                    <ul
                      className="py-2 text-sm text-gray-700"
                      aria-labelledby="dropdownDefaultButton"
                    >
                      {dateOptions.map((date, index) => (
                        <li key={index}>
                          <button
                            className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
                            onClick={() => {
                              updateFilters({
                                type: "to",
                                value: date.option,
                              });
                              setOpenToDate(false);
                            }}
                          >
                            {date.label}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-wrap justify-around gap-8 w-full">
              {articles.map((art, index) => (
                <div
                  key={index.toString()}
                  className="lg:max-w-lg p-6 bg-white border border-gray-200 rounded-lg shadow"
                >
                  <a href={art.url}>
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                      {art.title}
                    </h5>
                  </a>
                  <p className="mb-3 font-normal text-gray-700 ">
                    {art.description}
                  </p>
                  <a
                    href={art.url}
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                  >
                    Read more
                    <svg
                      className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                      />
                    </svg>
                  </a>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center py-6">
            <h6 className="text-3xl font-semibold">No news for you!</h6>{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-24 h-24"
            >
              <path
                fillRule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-2.625 6c-.54 0-.828.419-.936.634a1.96 1.96 0 0 0-.189.866c0 .298.059.605.189.866.108.215.395.634.936.634.54 0 .828-.419.936-.634.13-.26.189-.568.189-.866 0-.298-.059-.605-.189-.866-.108-.215-.395-.634-.936-.634Zm4.314.634c.108-.215.395-.634.936-.634.54 0 .828.419.936.634.13.26.189.568.189.866 0 .298-.059.605-.189.866-.108.215-.395.634-.936.634-.54 0-.828-.419-.936-.634a1.96 1.96 0 0 1-.189-.866c0-.298.059-.605.189-.866Zm-4.34 7.964a.75.75 0 0 1-1.061-1.06 5.236 5.236 0 0 1 3.73-1.538 5.236 5.236 0 0 1 3.695 1.538.75.75 0 1 1-1.061 1.06 3.736 3.736 0 0 0-2.639-1.098 3.736 3.736 0 0 0-2.664 1.098Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        )}
      </div>
    </>
  );
};

export default Page;
