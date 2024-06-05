// 'use client'

// import '../styles/TableStyles.css'
// import { useEffect, useState } from 'react'
// import { createClient } from '../utils/supabase/client'
// import { Table, DataType, SortingMode } from 'ka-table'

// // ! change search bar to match resources page
// // ! add website column
// // ! add severity column

// export default function IssueTable() {
// 	const [data, setData] = useState<any>([])
// 	const [loading, setLoading] = useState(true)
// 	const [error, setError] = useState(null)
// 	const [searchText, setSearchText] = useState('')

// 	const supabase = createClient()

// 	useEffect(() => {
// 		const fetchData = async () => {
// 			const { data: fetchedData, error: any } = await supabase
// 				.from('pins')
// 				.select(
// 					`id, issue_type_id, severity, street_name, town_name, zipcode, municipality_name,
//                     government (municipality_name, department_name, phone_number),
//                     issues (*)`
// 				)

// 			if (error) {
// 				setError(error)
// 				setLoading(false)
// 			} else {
// 				if (fetchedData) {
// 					setData(fetchedData)
// 				}
// 				setLoading(false)
// 			}
// 		}

// 		fetchData()
// 	}, [])

// 	const tableProps = {
// 		columns: [
// 			{
// 				key: 'issueName',
// 				title: 'Issue Name',
// 				dataType: DataType.String,
// 				isSortable: true,
// 			},
// 			// TODO: add more columns
// 			// {
// 			// 	key: 'severity',
// 			// 	title: 'Severity',
// 			// 	dataType: DataType.String,
// 			// 	isSortable: false,
// 			//  TODO: add custom sorting
// 			// },
// 			{
// 				key: 'location',
// 				title: 'Location',
// 				dataType: DataType.String,
// 				isSortable: false,
// 			},
// 			{
// 				key: 'departmentInfo',
// 				title: 'Department Info',
// 				dataType: DataType.String,
// 				isSortable: true,
// 			},
// 			{
// 				key: 'phoneNumber',
// 				title: 'Phone Number',
// 				dataType: DataType.String,
// 				isSortable: false,
// 			},
// 		],
// 		data: data.map((pin: any) => ({
// 			id: pin.id,
// 			issueName: pin.issues?.issue_name,
// 			// TODO: add more columns
// 			// severity: pin.severity.replace(/\b\w/g, (letter: string) =>
// 			// 	letter.toUpperCase()
// 			// ),
// 			location: `${pin.street_name}, ${pin.town_name}, ${pin.zipcode}`,
// 			departmentInfo: `${pin.government?.municipality_name} ${pin.government.department_name}`,
// 			phoneNumber: pin.government.phone_number,
// 		})),
// 		rowKeyField: 'id',
// 		sortingMode: SortingMode.Single,
// 		searchText: searchText,
// 		onSearch: (searchText: string) => {
// 			setSearchText(searchText)
// 		},
// 	}

// 	if (loading) return <p>Loading...</p>
// 	if (error) return <p>Error loading data!</p>

// 	return (
// 		<div className='main-container'>
// 			<input
// 				type='search'
// 				value={searchText}
// 				onChange={(event) => {
// 					setSearchText(event.currentTarget.value)
// 				}}
// 				className='top-element rounded-2xl'
// 				placeholder='Search'
// 			/>
// 			<Table {...tableProps} />
// 		</div>
// 	)
// }

"use client";

import { useEffect, useState } from "react";
import { createClient } from "../utils/supabase/client";

import { HiOutlineHome } from "react-icons/hi";
import { IoIosSearch } from "react-icons/io";
import { CgDatabase } from "react-icons/cg";
import { BiTachometer } from "react-icons/bi";
import { MdOutlineLocationOn, MdOutlinePhoneInTalk } from "react-icons/md";

import Underline from "@/app/assets/images/underline.png";

export default function IssueTable() {
  const [data, setData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  const supabase = createClient();

  useEffect(() => {
    const fetchData = async () => {
      const { data: fetchedData, error: any } = await supabase.from("pins").select(
        `id, issue_type_id, severity, street_name, town_name, zipcode, municipality_name,
                    government (municipality_name, department_name, phone_number),
                    issues (*)`
      );

      if (error) {
        setError(error);
        setLoading(false);
      } else {
        if (fetchedData) {
          setData(fetchedData);
          setFilteredData(fetchedData);
        }
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const onSearch = (e: any) => {
    e.preventDefault();
    let filtered = searchValue
      ? data.filter((obj) =>
          obj.issues.issue_name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
        )
      : data;
    setFilteredData(filtered);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data!</p>;

  return (
    <div className="my-[100px] container">
      <form className="mt-8 relative lg:mx-20" onSubmit={onSearch}>
        <input
          type="text"
          placeholder="Search"
          className="h-[48px] w-full bg-transparent border border-[#E6E6E6] pl-[50px] pr-[130px] rounded-full flex items-center text-[20px] text-[#3a3a3a] outline-0"
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button
          className="w-[115px] h-[46px] flex justify-center items-center bg-[#AADD66] rounded-full absolute top-[1px] right-[1px]"
          type="submit"
        >
          SEARCH
        </button>
        <IoIosSearch className="text-2xl text-[#747474] absolute left-3 top-3" />
      </form>

      <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-3">
        {filteredData.length ? (
          filteredData.map((item, index) => (
            <div
              key={index}
              className="bg-[white] border border-[#E6E6E6] rounded overflow-hidden"
              style={{ boxShadow: "9px -9px 16px -5px rgba(102, 115, 121, 0.08)" }}
            >
              <div className="border-b border-[#E6E6E6] flex">
                <div className="w-[75px] h-[75px] bg-[#125B49] rounded flex justify-center items-center">
                  <HiOutlineHome className="text-white text-3xl" />
                </div>
                <div className="p-4 flex flex-col justify-center">
                  <h4 className="font-semibold">Issue Tracker</h4>
                  <p className="mt-[6px]">{item.issues.issue_name}</p>
                </div>
              </div>

              {/* Department */}
              <div className="mx-3 h-[63px] grid grid-cols-2 border-b border-[#E6E6E6]">
                <div className="flex items-center gap-2">
                  <MdOutlineLocationOn className="text-2xl" />
                  <h4 className="font-semibold">Location</h4>
                </div>
                <div className="flex items-center">
                  <p>{`${item.street_name}, ${item.town_name}, ${item.zipcode}`}</p>
                </div>
              </div>
              {/* Opening Time */}
              <div className="mx-3 h-[63px] grid grid-cols-2 border-b border-[#E6E6E6]">
                <div className="flex items-center gap-2">
                  <BiTachometer className="text-2xl" />
                  <h4 className="font-semibold">Severity</h4>
                </div>
                <div className="flex items-center">
                  <p>{item.severity.toUpperCase()}</p>
                </div>
              </div>
              {/* Closing Time */}
              <div className="mx-3 h-[63px] grid grid-cols-2 border-b border-[#E6E6E6]">
                <div className="flex items-center gap-2">
                  <CgDatabase className="text-2xl" />
                  <h4 className="font-semibold">Department</h4>
                </div>
                <div className="flex items-center">
                  <p>{`${item.government?.municipality_name}, ${item.government.department_name}`}</p>
                </div>
              </div>
              {/* Phone Number */}
              <div className="mx-3 h-[63px] grid grid-cols-2 border-b border-[#E6E6E6]">
                <div className="flex items-center gap-2">
                  <MdOutlinePhoneInTalk className="text-2xl" />
                  <h4 className="font-semibold">Phone Number</h4>
                </div>
                <div className="flex items-center">
                  <p>{item.government.phone_number}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="h-[60vh] flex justify-center items-center text-2xl font-semibold">
            Empty Results
          </div>
        )}
      </div>
    </div>
  );
}
