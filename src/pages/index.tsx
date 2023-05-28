import { type NextPage } from "next";
import React, { useEffect, useState } from "react";
import Editor, { Monaco } from "@monaco-editor/react";
import { myCode } from "y/constants/constant";
import { KDDTest } from "y/constants/KDDTest+";
import axios from "axios";

const Home: NextPage = () => {
  const [initialCode, setInitialCode] = useState(myCode);

  const [csvData, setCsvData] = useState<string[][]>([]);

  const [selectedCheckboxes, setSelectedCheckboxes] = useState<{ i: any; item: any[]; }[]>([]);
  const [remainingElements, setRemainingElements] = useState<{}[]>([]);

  const [expectedResults, setExpectedResults] = useState<any[]>([]);
  const [response, setResponse] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [responseSuccess, setResponseSuccess] = useState(false);

  const handleCheckboxChange = (e: any, i: any, item: any[]) => {
    if (e.target.checked) {
      setSelectedCheckboxes((prevSelected) => [...prevSelected, { i, item }]);
    } else {
      setSelectedCheckboxes((prevSelected) =>
        prevSelected.filter((selected) => selected.i !== i)
      );
    }

    // Add 41st element from each selected item array to the selectedElements state as an array
    setExpectedResults((prevSelectedElements) => {
      const updatedElements = [...prevSelectedElements];
      const newItem = item[41];
      if (e.target.checked) {
        updatedElements.push(newItem);
      }
      return updatedElements;
    });

    const sumn = [
      "duration",
      "protocol_type",
      "service",
      "flag",
      "src_bytes",
      "dst_bytes",
      "land",
      "wrong_fragment",
      "urgent",
      "hot",
      "num_failed_logins",
      "logged_in",
      "num_compromised",
      "root_shell",
      "su_attempted",
      "num_root",
      "num_file_creations",
      "num_shells",
      "num_access_files",
      "num_outbound_cmds",
      "is_host_login",
      "is_guest_login",
      "count",
      "srv_count",
      "serror_rate",
      "srv_serror_rate",
      "rerror_rate",
      "srv_rerror_rate",
      "same_srv_rate",
      "diff_srv_rate",
      "srv_diff_host_rate",
      "dst_host_count",
      "dst_host_srv_count",
      "dst_host_same_srv_rate",
      "dst_host_diff_srv_rate",
      "dst_host_same_src_port_rate",
      "dst_host_srv_diff_host_rate",
      "dst_host_serror_rate",
      "dst_host_srv_serror_rate",
      "dst_host_rerror_rate",
      "dst_host_srv_rerror_rate",
      "last_flag",
    ];

    const remainingItems = item.filter((_: any, index: any) => index !== 41);
    const formattedObject = sumn.reduce((obj, key, index) => {
      obj[key] = remainingItems[index];
      return obj;
    }, {});

    setRemainingElements((prevRemainingElements) => [
      ...prevRemainingElements,
      formattedObject,
    ]);
  };

  useEffect(() => {
    const csvString = KDDTest;

    const rows = csvString.split("\n");

    const data = rows.slice().map((row) => {
      return row.split(",");
    });

    setCsvData(data);
  }, []);

  const predict = async () => {
    try {
      // Set isLoading to true when the prediction starts
      setIsLoading(true);

      const response = await axios.post(
        "https://8690-2605-a200-9201-542c-5c85-5a62-7d7-6d4.ngrok-free.app/mlp/predict/",
        remainingElements
      );
      setResponseSuccess(true);
      setResponse(response);
    } catch (error) {
      setError("You must select at least one element from the table.");
    } finally {
      setIsLoading(false); // Set isLoading to false when the prediction completes or encounters an error
    }
  };

  useEffect(() => {
    if (initialCode) {
      setInitialCode(initialCode);
    }
    if (expectedResults) {
      setExpectedResults(expectedResults);
    }
    if (error != "") {
      setTimeout(() => {
        setError("");
      }, 4000);
    }
    if (responseSuccess) {
      setTimeout(() => {
        setResponseSuccess(false);
      }, 4000);
    }
  }, [initialCode, expectedResults, error, responseSuccess]);

  const columns = [
    "duration",
    "protocol_type",
    "service",
    "flag",
    "src_bytes",
    "dst_bytes",
    "land",
    "wrong_fragment",
    "urgent",
    "hot",
    "num_failed_logins",
    "logged_in",
    "num_compromised",
    "root_shell",
    "su_attempted",
    "num_root",
    "num_file_creations",
    "num_shells",
    "num_access_files",
    "num_outbound_cmds",
    "is_host_login",
    "is_guest_login",
    "count",
    "srv_count",
    "serror_rate",
    "srv_serror_rate",
    "rerror_rate",
    "srv_rerror_rate",
    "same_srv_rate",
    "diff_srv_rate",
    "srv_diff_host_rate",
    "dst_host_count",
    "dst_host_srv_count",
    "dst_host_same_srv_rate",
    "dst_host_diff_srv_rate",
    "dst_host_same_src_port_rate",
    "dst_host_srv_diff_host_rate",
    "dst_host_serror_rate",
    "dst_host_srv_serror_rate",
    "dst_host_rerror_rate",
    "dst_host_srv_rerror_rate",
    "attack",
    "last_flag",
  ];

  return (
    <>
      <div className=" h-full items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] pl-6 pr-6 md:flex-col">
        {responseSuccess ? (
          <div
            className="fixed z-20 mb-4 mt-4 w-auto rounded-lg bg-green-50 p-4 text-sm text-green-800 dark:bg-gray-800 dark:text-green-400"
            role="alert"
          >
            <span className="font-medium">Success alert!</span> Prediction
            completed successfully !!!
          </div>
        ) : (
          ""
        )}

        {error ? (
          <div
            className="fixed z-20 mt-4 w-[550px] rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700"
            role="alert"
          >
            <strong className="font-bold">Please note! </strong>
            <span className="block sm:inline">{error}</span>
            <span className="absolute bottom-0 right-0 top-0 px-4 py-3">
              <svg
                className="h-6 w-6 fill-current text-red-500"
                role="button"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <title>Close</title>
                <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
              </svg>
            </span>
          </div>
        ) : (
          ""
        )}
        <div className=" items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-center text-[35px] font-extrabold tracking-tight text-white sm:text-5xl">
            <span className="text-[hsl(280,100%,70%)]">Trojan</span> Dectector
          </h1>
          <div>
            <h1 className="mb-6 text-[28px] font-semibold tracking-tight text-white sm:text-[2rem]">
              Project Code
            </h1>
            <div>
              <Editor
                className="rounded-lg"
                height="40vh"
                language="python"
                defaultLanguage="python"
                defaultValue={initialCode}
                theme="vs-dark"
              />
            </div>
            <div className="relative mt-6 h-[400px] overflow-auto shadow-md sm:rounded-lg">
              <table className="w-full table-auto text-left text-sm  text-gray-500 dark:text-gray-400">
                <thead className="bg-gray-50  text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="p-4">
                      <div className="flex items-center"></div>
                    </th>
                    {columns.map((item, i) => {
                      return (
                        <th key={i} scope="col" className="px-6 py-3">
                          {item}
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {csvData.map((item, i) => {
                    return (
                      <tr
                        key={i}
                        className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
                      >
                        <td className="w-4 p-4">
                          <div className="flex items-center">
                            <input
                              id={`checkbox-table-search-${i}`}
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800"
                              onChange={(e) => handleCheckboxChange(e, i, item)}
                              checked={selectedCheckboxes.some(
                                (selected) => selected.i === i
                              )}
                            ></input>
                            <label
                              htmlFor={`checkbox-table-search-${i}`}
                              className="sr-only"
                            >
                              checkbox
                            </label>
                          </div>
                        </td>
                        <th
                          scope="row"
                          className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                        >
                          {item[0]}
                        </th>
                        <td className="px-6 py-4">{item[1]}</td>
                        <td className="px-6 py-4">{item[2]}</td>
                        <td className="px-6 py-4">{item[3]}</td>
                        <td className="px-6 py-4">{item[4]}</td>
                        <td className="px-6 py-4">{item[5]}</td>
                        <td className="px-6 py-4">{item[6]}</td>
                        <td className="px-6 py-4">{item[7]}</td>
                        <td className="px-6 py-4">{item[8]}</td>
                        <td className="px-6 py-4">{item[9]}</td>
                        <td className="px-6 py-4">{item[10]}</td>
                        <td className="px-6 py-4">{item[11]}</td>
                        <td className="px-6 py-4">{item[12]}</td>
                        <td className="px-6 py-4">{item[13]}</td>
                        <td className="px-6 py-4">{item[14]}</td>
                        <td className="px-6 py-4">{item[15]}</td>
                        <td className="px-6 py-4">{item[16]}</td>
                        <td className="px-6 py-4">{item[17]}</td>
                        <td className="px-6 py-4">{item[18]}</td>
                        <td className="px-6 py-4">{item[19]}</td>
                        <td className="px-6 py-4">{item[20]}</td>
                        <td className="px-6 py-4">{item[21]}</td>
                        <td className="px-6 py-4">{item[22]}</td>
                        <td className="px-6 py-4">{item[23]}</td>
                        <td className="px-6 py-4">{item[24]}</td>
                        <td className="px-6 py-4">{item[25]}</td>
                        <td className="px-6 py-4">{item[25]}</td>
                        <td className="px-6 py-4">{item[27]}</td>
                        <td className="px-6 py-4">{item[28]}</td>
                        <td className="px-6 py-4">{item[29]}</td>
                        <td className="px-6 py-4">{item[30]}</td>
                        <td className="px-6 py-4">{item[31]}</td>
                        <td className="px-6 py-4">{item[32]}</td>
                        <td className="px-6 py-4">{item[33]}</td>
                        <td className="px-6 py-4">{item[34]}</td>
                        <td className="px-6 py-4">{item[35]}</td>
                        <td className="px-6 py-4">{item[36]}</td>
                        <td className="px-6 py-4">{item[37]}</td>
                        <td className="px-6 py-4">{item[38]}</td>
                        <td className="px-6 py-4">{item[39]}</td>
                        <td className="px-6 py-4">{item[40]}</td>
                        <td className="px-6 py-4">{item[41]}</td>
                        <td className="px-6 py-4">{item[42]}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={predict}
                className="mb-2 rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-purple-500 hover:bg-blue-800 hover:text-white focus:outline-none focus:ring-4 focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
              >
                {isLoading ? (
                  <>
                    <svg
                      aria-hidden="true"
                      role="status"
                      className="mr-3 inline h-4 w-4 animate-spin text-gray-200 dark:text-gray-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="#1C64F2"
                      />
                    </svg>
                    Loading...
                  </>
                ) : (
                  "Predict"
                )}
              </button>
            </div>
            <div className="grid grid-cols-2">
              <div className="mt-6">
                <h1 className="mb-6 mt-6 text-[28px] font-semibold tracking-tight text-white sm:text-[2rem]">
                  Expected Result
                </h1>
                <Editor
                  height="40vh"
                  language="python"
                  defaultLanguage="python"
                  value={JSON.stringify(expectedResults, null, 2)}
                  theme="vs-dark"
                />
              </div>
              <div className="ml-4 mt-6">
                <h1 className="mb-6 mt-6 text-[28px] font-semibold tracking-tight text-white sm:text-[2rem]">
                  Api Response
                </h1>
                <Editor
                  height="40vh"
                  language="python"
                  defaultLanguage="python"
                  value={JSON.stringify(response, null, 2)}
                  theme="vs-dark"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
