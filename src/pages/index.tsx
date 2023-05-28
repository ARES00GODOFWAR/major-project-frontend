import { type NextPage } from "next";
import React, { useEffect, useState } from "react";
import Editor, { Monaco } from "@monaco-editor/react";
import { myCode } from "y/constants/constant";
import { KDDTest } from "y/constants/KDDTest+";

const Home: NextPage = () => {
  const [initialCode, setInitialCode] = useState(myCode);
  

  const [csvData, setCsvData] = useState([]);

  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const [selectedElements, setSelectedElements] = useState([]);

  const handleCheckboxChange = (e, i, item) => {
    if (e.target.checked) {
      setSelectedCheckboxes((prevSelected) => [
        ...prevSelected,
        { i, item },
      ]);
    } else {
      setSelectedCheckboxes((prevSelected) =>
        prevSelected.filter((selected) => selected.i !== i)
      );
      setSelectedElements((prevSelectedElements) =>
        prevSelectedElements.filter((element) => element !== item[41])
      );
    }
  
    // Add 41st element from each selected item array to the selectedElements state as an array
    setSelectedElements((prevSelectedElements) => {
      const updatedElements = [...prevSelectedElements];
      const newItem = item[41];
      if (e.target.checked) {
        updatedElements.push(newItem);
      }
      return updatedElements;
    });
  };
  
  const [expectedResults, setExpectedResults] = useState(selectedElements);
  
  useEffect(() => {
    const csvString = KDDTest;

    const rows = csvString.split("\n");

    const data = rows.slice().map((row) => {
      return row.split(",");
    });

    setCsvData(data);
  }, []);

  useEffect(() => {
    if (initialCode) {
      setInitialCode(initialCode);
    }
    if (selectedElements) {
      setExpectedResults(selectedElements)
    }
  }, [initialCode, selectedElements]);  

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
      <div className=" h-full w-full items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] pl-6 pr-6 md:flex-col">
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
                      <div className="flex items-center">
                      </div>
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
                              onChange={(e) =>
                                handleCheckboxChange(e, i, item)
                              }
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
                className="mb-2 rounded-lg bg-purple-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
              >
                Predict
              </button>
            </div>
            <h1 className="mb-6 mt-6 text-[28px] font-semibold tracking-tight text-white sm:text-[2rem]">
              Expected Result
            </h1>
            <div className="mt-6">
              <Editor
                height="40vh"
                language="python"
                defaultLanguage="python"
                value={JSON.stringify(expectedResults, null, 2)}
                theme="vs-dark"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
